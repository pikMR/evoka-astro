import fs from "node:fs";
import path from "node:path";
import process from "node:process";

const command = process.argv[2] || "help";
const options = parseOptions(process.argv.slice(3));
const projectRoot = path.resolve(options.root || process.cwd());

try {
  if (command === "audit") {
    const result = auditProject(projectRoot);
    outputAudit(result, options.json);
    if (result.issues.some((issue) => issue.level === "error")) {
      process.exitCode = 1;
    }
  } else if (command === "compare") {
    const exportPath = options.positionals[0];
    if (!exportPath) fail("compare requires a CSV path");
    const result = compareExport(
      projectRoot,
      path.resolve(exportPath),
      options.delimiter,
    );
    outputComparison(result, options.json);
  } else {
    printHelp();
    if (command !== "help" && command !== "--help" && command !== "-h") {
      process.exitCode = 1;
    }
  }
} catch (error) {
  console.error("catalog-tool: " + error.message);
  process.exitCode = 1;
}

function parseOptions(args) {
  const parsed = {
    root: "",
    delimiter: "",
    json: false,
    positionals: [],
  };
  for (let index = 0; index < args.length; index += 1) {
    const arg = args[index];
    if (arg === "--json") {
      parsed.json = true;
    } else if (arg === "--root" || arg === "--delimiter") {
      const value = args[index + 1];
      if (!value) fail(arg + " requires a value");
      parsed[arg.slice(2)] = value;
      index += 1;
    } else if (arg.startsWith("--")) {
      fail("unknown option " + arg);
    } else {
      parsed.positionals.push(arg);
    }
  }
  return parsed;
}

function fail(message) {
  throw new Error(message);
}

function printHelp() {
  console.log(
    [
      "Usage:",
      "  node catalog-tool.mjs audit [--root <project>] [--json]",
      "  node catalog-tool.mjs compare <export.csv> [--root <project>]",
      "       [--delimiter comma|semicolon|tab|<char>] [--json]",
      "",
      "The compare command is read-only. See references/normalized-export.md",
      "for the expected Adminer CSV columns.",
    ].join("\n"),
  );
}

function readProject(root) {
  const catalogPath = path.join(root, "src", "data", "catalog.ts");
  const uiPath = path.join(root, "src", "i18n", "ui.ts");
  if (!fs.existsSync(catalogPath)) fail("catalog not found: " + catalogPath);
  if (!fs.existsSync(uiPath)) fail("UI translations not found: " + uiPath);

  const catalogSource = fs.readFileSync(catalogPath, "utf8");
  const uiSource = fs.readFileSync(uiPath, "utf8");
  return {
    products: evaluateAssignedLiteral(
      catalogSource,
      "export const products",
      "[",
      "]",
    ),
    publicCategories: evaluateAssignedLiteral(
      catalogSource,
      "export const categories",
      "[",
      "]",
    ),
    categoryTranslations: evaluateAssignedLiteral(
      uiSource,
      "export const categoryTranslations",
      "{",
      "}",
    ),
    productTranslations: evaluateAssignedLiteral(
      uiSource,
      "export const productTranslations",
      "{",
      "}",
    ),
    productTranslationsExtra: evaluateAssignedLiteral(
      uiSource,
      "export const productTranslationsExtra",
      "{",
      "}",
    ),
  };
}

function evaluateAssignedLiteral(source, marker, opener, closer) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) fail("source marker not found: " + marker);
  const equalsIndex = source.indexOf("=", markerIndex + marker.length);
  const start = source.indexOf(opener, equalsIndex + 1);
  if (equalsIndex < 0 || start < 0) fail("literal not found after " + marker);

  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) {
        escaped = false;
      } else if (char === "\\") {
        escaped = true;
      } else if (char === quote) {
        quote = "";
      }
      continue;
    }
    if (char === "'" || char === '"' || char === String.fromCharCode(96)) {
      quote = char;
    } else if (char === opener) {
      depth += 1;
    } else if (char === closer) {
      depth -= 1;
      if (depth === 0) {
        const literal = resolveCatalogConstants(source, source.slice(start, index + 1));
        return Function('"use strict"; return (' + literal + ");")();
      }
    }
  }
  fail("unterminated literal after " + marker);
}

function resolveCatalogConstants(source, literal) {
  const declaration = source.match(
    /export const CATALOG_CATEGORIES\s*=\s*\{([\s\S]*?)\}\s*as const/,
  );
  if (!declaration || !literal.includes("CATALOG_CATEGORIES.")) return literal;

  const values = Object.fromEntries(
    [...declaration[1].matchAll(/^\s*([A-Z_]+):\s*"([^"]*)"\s*,?\s*$/gm)].map(
      ([, key, value]) => [key, value],
    ),
  );
  return literal.replace(/CATALOG_CATEGORIES\.([A-Z_]+)/g, (_, key) => {
    if (!(key in values)) fail("unknown CATALOG_CATEGORIES constant: " + key);
    return JSON.stringify(values[key]);
  });
}

function auditProject(root) {
  const project = readProject(root);
  const { products, publicCategories } = project;
  const issues = [];
  const imageDirectory = path.join(root, "public", "images", "products");
  const imageFiles = fs.existsSync(imageDirectory)
    ? fs
        .readdirSync(imageDirectory)
        .filter((file) => file.toLowerCase().endsWith(".jpg"))
    : [];
  const localImageIds = new Set(
    imageFiles
      .map((file) => Number(file.slice(0, -4)))
      .filter(Number.isInteger),
  );
  const referencedImageIds = new Set();

  addDuplicateIssue(
    issues,
    "error",
    "duplicate-product-id",
    products,
    (product) => String(product.id),
  );
  addDuplicateIssue(
    issues,
    "warning",
    "duplicate-reference",
    products.filter((product) => String(product.reference)),
    (product) => String(product.reference),
  );
  addDuplicateIssue(
    issues,
    "warning",
    "duplicate-slug",
    products.filter((product) => String(product.slug)),
    (product) => String(product.slug),
  );

  const publicCategorySet = new Set(publicCategories);
  const unknownCategories = new Set();
  const missingImages = new Set();
  const invalidProducts = [];
  const unsafeDescriptions = [];
  const zeroPrice = [];
  const nonPositiveStock = [];

  for (const product of products) {
    const id = String(product.id);
    if (
      !id ||
      !Array.isArray(product.categories) ||
      product.categories.length === 0 ||
      !Array.isArray(product.imageIds) ||
      product.imageIds.length === 0 ||
      !Number.isFinite(product.price) ||
      !Number.isFinite(product.stock)
    ) {
      invalidProducts.push(id || "(empty)");
    }
    for (const category of product.categories || []) {
      if (category !== "Inicio" && !publicCategorySet.has(category)) {
        unknownCategories.add(category);
      }
    }
    for (const imageId of product.imageIds || []) {
      referencedImageIds.add(Number(imageId));
      if (!localImageIds.has(Number(imageId))) missingImages.add(Number(imageId));
    }
    if (Number(product.price) === 0) zeroPrice.push(id);
    if (Number(product.stock) <= 0) nonPositiveStock.push(id);
    if (containsUnsafeHtml(String(product.description || ""))) {
      unsafeDescriptions.push(id);
    }
  }

  addListIssue(issues, "error", "invalid-product-shape", invalidProducts);
  addListIssue(issues, "error", "missing-image", [...missingImages]);
  addListIssue(issues, "error", "unsafe-description-html", unsafeDescriptions);
  addListIssue(
    issues,
    "warning",
    "unknown-public-category",
    [...unknownCategories],
  );

  const missingCategoryTranslations = publicCategories.filter(
    (category) => !project.categoryTranslations[category],
  );
  addListIssue(
    issues,
    "warning",
    "missing-category-translation",
    missingCategoryTranslations,
  );
  addListIssue(issues, "warning", "non-positive-stock", nonPositiveStock);
  addListIssue(issues, "info", "zero-price-consult", zeroPrice);

  const orphanImages = [...localImageIds]
    .filter((id) => !referencedImageIds.has(id))
    .sort((left, right) => left - right);
  addListIssue(issues, "info", "orphan-image", orphanImages);

  const translatedIds = new Set([
    ...Object.keys(project.productTranslations),
    ...Object.keys(project.productTranslationsExtra),
  ]);
  const untranslatedIds = products
    .map((product) => String(product.id))
    .filter((id) => !translatedIds.has(id));
  if (untranslatedIds.length) {
    issues.push({
      level: "info",
      code: "product-translation-fallback",
      message:
        untranslatedIds.length +
        " products use Spanish fallback; explicit coverage is " +
        translatedIds.size +
        "/" +
        products.length,
      values: untranslatedIds,
    });
  }

  return {
    root,
    summary: {
      products: products.length,
      publicCategories: publicCategories.length,
      imageFiles: localImageIds.size,
      referencedImages: referencedImageIds.size,
      translatedProducts: translatedIds.size,
      errors: issues.filter((issue) => issue.level === "error").length,
      warnings: issues.filter((issue) => issue.level === "warning").length,
      info: issues.filter((issue) => issue.level === "info").length,
    },
    issues,
  };
}

function addDuplicateIssue(issues, level, code, items, keyFor) {
  const groups = new Map();
  for (const item of items) {
    const key = keyFor(item);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(String(item.id));
  }
  const duplicates = [...groups.entries()].filter((entry) => entry[1].length > 1);
  if (!duplicates.length) return;
  issues.push({
    level,
    code,
    message: duplicates.length + " duplicated values",
    values: duplicates.map(
      ([value, ids]) => value + " (product IDs " + ids.join(", ") + ")",
    ),
  });
}

function addListIssue(issues, level, code, values) {
  if (!values.length) return;
  issues.push({
    level,
    code,
    message: values.length + " item(s)",
    values: values.map(String),
  });
}

function containsUnsafeHtml(html) {
  return (
    /<\s*(script|iframe|object|embed)\b/i.test(html) ||
    /\son[a-z]+\s*=/i.test(html) ||
    /javascript\s*:/i.test(html)
  );
}

function outputAudit(result, asJson) {
  if (asJson) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  const summary = result.summary;
  console.log("Catalog audit");
  console.log("- Products: " + summary.products);
  console.log("- Public categories: " + summary.publicCategories);
  console.log(
    "- Images: " +
      summary.referencedImages +
      " referenced / " +
      summary.imageFiles +
      " files",
  );
  console.log(
    "- Explicit product translations: " +
      summary.translatedProducts +
      "/" +
      summary.products,
  );
  console.log(
    "- Findings: " +
      summary.errors +
      " error(s), " +
      summary.warnings +
      " warning(s), " +
      summary.info +
      " info",
  );
  for (const issue of result.issues) {
    const preview = issue.values.slice(0, 12).join("; ");
    const omitted =
      issue.values.length > 12
        ? "; +" + (issue.values.length - 12) + " more"
        : "";
    console.log(
      "[" +
        issue.level.toUpperCase() +
        "] " +
        issue.code +
        ": " +
        issue.message +
        (preview ? " — " + preview + omitted : ""),
    );
  }
}

function compareExport(root, csvPath, delimiterOption) {
  if (!fs.existsSync(csvPath)) fail("CSV not found: " + csvPath);
  const project = readProject(root);
  const csv = fs.readFileSync(csvPath, "utf8");
  const delimiter = resolveDelimiter(csv, delimiterOption);
  const rows = parseCsv(csv, delimiter);
  if (rows.length < 2) fail("CSV has no product rows");

  const headers = rows[0].map((header) => header.replace(/^\uFEFF/, "").trim());
  const requiredHeaders = [
    ["product_id", "id"],
    ["reference"],
    ["name"],
    ["slug"],
    ["price"],
    ["stock"],
    ["categories"],
    ["image_ids", "imageids"],
    ["description"],
  ];
  const lowerHeaders = new Set(headers.map((header) => header.toLowerCase()));
  const missingHeaders = requiredHeaders
    .filter((aliases) => !aliases.some((alias) => lowerHeaders.has(alias)))
    .map((aliases) => aliases[0]);
  if (missingHeaders.length) {
    fail("CSV is missing columns: " + missingHeaders.join(", "));
  }

  const sourceProducts = rows
    .slice(1)
    .filter((row) => row.some((field) => field.trim()))
    .map((row, index) => {
      const record = {};
      headers.forEach((header, column) => {
        record[header.toLowerCase()] = row[column] || "";
      });
      return normalizeSourceProduct(record, index + 2);
    });

  const duplicateIds = duplicateValues(sourceProducts.map((product) => product.id));
  if (duplicateIds.length) {
    fail("CSV contains duplicate product IDs: " + duplicateIds.join(", "));
  }

  const localById = new Map(
    project.products.map((product) => [String(product.id), product]),
  );
  const comparisons = sourceProducts.map((source) => {
    const local = localById.get(source.id);
    const changedFields = local ? compareProductFields(local, source) : [];
    let status = local
      ? changedFields.length
        ? "changed"
        : "unchanged"
      : "new";
    if (!source.active) status = "inactive";
    return {
      catalog: source.catalog,
      id: source.id,
      reference: source.reference,
      name: source.name,
      categories: source.categories,
      price: source.price,
      stock: source.stock,
      status,
      changedFields,
    };
  });

  const counts = {};
  for (const item of comparisons) counts[item.status] = (counts[item.status] || 0) + 1;
  return {
    root,
    csvPath,
    delimiter:
      delimiter === "\t" ? "tab" : delimiter === ";" ? "semicolon" : "comma",
    summary: {
      sourceProducts: comparisons.length,
      localProducts: project.products.length,
      ...counts,
    },
    products: comparisons,
  };
}

function resolveDelimiter(csv, option) {
  if (option) {
    const known = { comma: ",", semicolon: ";", tab: "\t" };
    return known[option] || option;
  }
  const firstLine = csv.split(/\r?\n/, 1)[0];
  const candidates = [",", ";", "\t"];
  return candidates.sort(
    (left, right) =>
      firstLine.split(right).length - firstLine.split(left).length,
  )[0];
}

function parseCsv(text, delimiter) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (inQuotes) {
      if (char === '"' && text[index + 1] === '"') {
        field += '"';
        index += 1;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        field += char;
      }
    } else if (char === '"') {
      inQuotes = true;
    } else if (char === delimiter) {
      row.push(field);
      field = "";
    } else if (char === "\n") {
      row.push(field.replace(/\r$/, ""));
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += char;
    }
  }
  if (inQuotes) fail("CSV contains an unterminated quoted field");
  if (field || row.length) {
    row.push(field.replace(/\r$/, ""));
    rows.push(row);
  }
  return rows;
}

function normalizeSourceProduct(record, rowNumber) {
  const value = (...aliases) => {
    for (const alias of aliases) {
      if (Object.hasOwn(record, alias)) return record[alias].trim();
    }
    return "";
  };
  const id = value("product_id", "id");
  if (!id) fail("CSV row " + rowNumber + " has no product_id");
  const price = parseNumber(value("price"));
  const stock = parseNumber(value("stock"));
  if (!Number.isFinite(price)) fail("invalid price at CSV row " + rowNumber);
  if (!Number.isFinite(stock)) fail("invalid stock at CSV row " + rowNumber);

  return {
    catalog: value("catalog_key", "catalog") || "principal",
    id,
    reference: value("reference"),
    name: value("name"),
    slug: value("slug"),
    price,
    stock,
    categories: parseList(value("categories"), "|||"),
    imageIds: parseIntegerList(value("image_ids", "imageids")),
    description: value("description"),
    active: parseBoolean(value("active"), true),
  };
}

function parseNumber(value) {
  const normalized =
    value.includes(",") && !value.includes(".") ? value.replace(",", ".") : value;
  return Number(normalized);
}

function parseList(value, separator) {
  if (!value) return [];
  if (value.trim().startsWith("[")) {
    const parsed = JSON.parse(value);
    if (!Array.isArray(parsed)) fail("expected a JSON array");
    return parsed.map(String).map((item) => item.trim()).filter(Boolean);
  }
  return value
    .split(separator)
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseIntegerList(value) {
  const items = value.trim().startsWith("[")
    ? JSON.parse(value)
    : value.split(",");
  if (!Array.isArray(items)) fail("image_ids must be a list");
  const integers = items
    .map((item) => Number(String(item).trim()))
    .filter((item) => Number.isFinite(item));
  if (integers.length !== items.filter((item) => String(item).trim()).length) {
    fail("image_ids contains a non-numeric value");
  }
  return integers;
}

function parseBoolean(value, fallback) {
  if (!value) return fallback;
  return !["0", "false", "no", "inactive"].includes(value.toLowerCase());
}

function compareProductFields(local, source) {
  const changed = [];
  if (String(local.reference) !== source.reference) changed.push("reference");
  if (String(local.name) !== source.name) changed.push("name");
  if (String(local.slug) !== source.slug) changed.push("slug");
  if (Math.abs(Number(local.price) - source.price) > 0.0000001) {
    changed.push("price");
  }
  if (Number(local.stock) !== source.stock) changed.push("stock");
  if (!sameStringSet(local.categories, source.categories)) {
    changed.push("categories");
  }
  if (!sameArray(local.imageIds.map(Number), source.imageIds)) {
    changed.push("imageIds");
  }
  if (normalizeText(local.description) !== normalizeText(source.description)) {
    changed.push("description");
  }
  return changed;
}

function sameStringSet(left, right) {
  return sameArray(
    [...left].map(String).sort(),
    [...right].map(String).sort(),
  );
}

function sameArray(left, right) {
  return (
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function normalizeText(value) {
  return String(value).replace(/\r\n/g, "\n").trim();
}

function duplicateValues(values) {
  const seen = new Set();
  const duplicates = new Set();
  for (const value of values) {
    if (seen.has(value)) duplicates.add(value);
    seen.add(value);
  }
  return [...duplicates];
}

function outputComparison(result, asJson) {
  if (asJson) {
    console.log(JSON.stringify(result, null, 2));
    return;
  }
  const summary = result.summary;
  console.log("Adminer catalog comparison");
  console.log(
    "- Source: " +
      summary.sourceProducts +
      " product(s); local: " +
      summary.localProducts,
  );
  console.log(
    "- Status: " +
      (summary.new || 0) +
      " new, " +
      (summary.changed || 0) +
      " changed, " +
      (summary.unchanged || 0) +
      " unchanged, " +
      (summary.inactive || 0) +
      " inactive",
  );

  const groups = new Map();
  for (const product of result.products) {
    if (!groups.has(product.catalog)) groups.set(product.catalog, []);
    groups.get(product.catalog).push(product);
  }
  for (const [catalog, products] of groups) {
    console.log("\n## Catalog: " + catalog + " (" + products.length + ")");
    console.log("| Token | ID | Reference | Name | Categories | Stock | Base price | Status | Changes |");
    console.log("| --- | --- | --- | --- | --- | ---: | ---: | --- | --- |");
    for (const product of products) {
      console.log(
        "| " +
          escapeCell(catalog + ":" + product.id) +
          " | " +
          escapeCell(product.id) +
          " | " +
          escapeCell(product.reference || "—") +
          " | " +
          escapeCell(product.name) +
          " | " +
          escapeCell(product.categories.join(", ") || "—") +
          " | " +
          product.stock +
          " | " +
          product.price +
          " | " +
          product.status +
          " | " +
          escapeCell(product.changedFields.join(", ") || "—") +
          " |",
      );
    }
  }
}

function escapeCell(value) {
  return String(value).replace(/\|/g, "\\|").replace(/\r?\n/g, " ").trim();
}

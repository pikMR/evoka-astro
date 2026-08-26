import { createHash, randomUUID } from "node:crypto";
import { execFile } from "node:child_process";
import { promises as fs } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);
const EDITOR_ROOT = path.dirname(fileURLToPath(import.meta.url));
const PROJECT_ROOT = path.resolve(EDITOR_ROOT, "..");
const CATALOG_PATH = path.join(PROJECT_ROOT, "src", "data", "catalog.ts");
const IMAGE_DIRECTORY = path.join(PROJECT_ROOT, "public", "images", "products");
const MAX_BODY_BYTES = 45 * 1024 * 1024;
const MAX_IMAGE_BYTES = 10 * 1024 * 1024;
const MAX_IMAGES = 8;
const PREVIEW_TTL_MS = 15 * 60 * 1000;
const previews = new Map();
let commitQueue = Promise.resolve();

export function slugify(value) {
  return String(value)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " y ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

export function sanitizeDescription(input) {
  const html = String(input || "").trim();
  if (!html) throw new ValidationError("La descripción es obligatoria.");
  if (html.length > 100_000) {
    throw new ValidationError("La descripción supera los 100.000 caracteres.");
  }
  if (
    /<\s*\/?\s*(script|style|iframe|object|embed|svg|math|form|input|button|textarea|select|option|link|meta|base)\b/i.test(
      html,
    )
  ) {
    throw new ValidationError("La descripción contiene elementos HTML no permitidos.");
  }

  const allowedTags = new Set([
    "p",
    "br",
    "strong",
    "b",
    "em",
    "i",
    "u",
    "s",
    "ul",
    "ol",
    "li",
    "h2",
    "h3",
    "blockquote",
    "a",
  ]);
  let output = "";
  let cursor = 0;
  const tokenPattern = /<!--[^]*?-->|<![^>]*>|<[^>]*>/g;

  for (const match of html.matchAll(tokenPattern)) {
    output += escapeLooseAngles(html.slice(cursor, match.index));
    cursor = match.index + match[0].length;
    const token = match[0];
    if (token.startsWith("<!--") || token.startsWith("<!")) continue;
    const parsed = token.match(/^<\s*(\/?)\s*([a-z0-9]+)\b([^>]*)>$/i);
    if (!parsed) continue;
    const closing = Boolean(parsed[1]);
    const tag = parsed[2].toLowerCase();
    if (!allowedTags.has(tag)) continue;
    if (closing) {
      if (tag !== "br") output += `</${tag}>`;
      continue;
    }
    if (tag === "br") {
      output += "<br>";
      continue;
    }
    if (tag === "a") {
      const hrefMatch = parsed[3].match(
        /\bhref\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i,
      );
      const href = hrefMatch ? hrefMatch[1] || hrefMatch[2] || hrefMatch[3] : "";
      if (/^(https?:\/\/|mailto:|tel:)/i.test(href)) {
        output += `<a href="${escapeAttribute(href)}" rel="noopener noreferrer">`;
      } else {
        output += "<a>";
      }
      continue;
    }
    output += `<${tag}>`;
  }
  output += escapeLooseAngles(html.slice(cursor));
  output = output.trim();
  const readable = output
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;|&#160;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!readable) throw new ValidationError("La descripción no puede estar vacía.");
  return output;
}

function escapeLooseAngles(value) {
  return value.replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function escapeAttribute(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function hash(value) {
  return createHash("sha256").update(value).digest("hex");
}

function parseLiteral(source, marker, opener, closer) {
  const markerIndex = source.indexOf(marker);
  if (markerIndex < 0) throw new Error(`No se encontró ${marker}.`);
  const equalsIndex = source.indexOf("=", markerIndex + marker.length);
  const start = source.indexOf(opener, equalsIndex + 1);
  if (equalsIndex < 0 || start < 0) throw new Error(`No se encontró el literal de ${marker}.`);
  let depth = 0;
  let quote = "";
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (quote) {
      if (escaped) escaped = false;
      else if (char === "\\") escaped = true;
      else if (char === quote) quote = "";
      continue;
    }
    if (char === '"' || char === "'" || char === "`") quote = char;
    else if (char === opener) depth += 1;
    else if (char === closer) {
      depth -= 1;
      if (depth === 0) return { start, end: index, literal: source.slice(start, index + 1) };
    }
  }
  throw new Error(`Literal sin cerrar en ${marker}.`);
}

export function readCatalogModel(source) {
  const declaration = source.match(
    /export const CATALOG_CATEGORIES\s*=\s*\{([^]*?)\}\s*as const/,
  );
  if (!declaration) throw new Error("No se encontró CATALOG_CATEGORIES.");
  const categoryEntries = [...declaration[1].matchAll(/^\s*([A-Z0-9_]+):\s*"([^"]*)"\s*,?\s*$/gm)].map(
    ([, key, label]) => ({ key, label }),
  );
  const constants = Object.fromEntries(categoryEntries.map(({ key, label }) => [key, label]));
  const resolveConstants = (literal) =>
    literal.replace(/CATALOG_CATEGORIES\.([A-Z0-9_]+)/g, (_, key) => {
      if (!(key in constants)) throw new Error(`Categoría desconocida: ${key}.`);
      return JSON.stringify(constants[key]);
    });
  const categoriesLiteral = parseLiteral(source, "export const categories", "[", "]");
  const productsLiteral = parseLiteral(source, "export const products", "[", "]");
  const evaluate = (literal) => Function(`"use strict"; return (${resolveConstants(literal)});`)();
  return {
    categoryEntries,
    publicCategories: evaluate(categoriesLiteral.literal),
    products: evaluate(productsLiteral.literal),
  };
}

function categoryKeyFor(label, entries) {
  const existingKeys = new Set(entries.map(({ key }) => key));
  const base =
    String(label)
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/&/g, " AND ")
      .replace(/[^A-Z0-9]+/g, "_")
      .replace(/^_+|_+$/g, "") || "CATEGORY";
  let candidate = base;
  let suffix = 2;
  while (existingKeys.has(candidate)) candidate = `${base}_${suffix++}`;
  return candidate;
}

function generatedReference(productId, products) {
  const used = new Set(products.map((product) => String(product.reference)));
  const numericCandidate = `1205${Math.max(0, Number(productId) - 1)}`;
  if (!used.has(numericCandidate)) return numericCandidate;
  let suffix = 0;
  let candidate = `EVK-${productId}`;
  while (used.has(candidate)) candidate = `EVK-${productId}-${++suffix}`;
  return candidate;
}

function parseNumber(value, label, { integer = false, min = 0 } = {}) {
  if (value === "" || value === null || value === undefined) {
    throw new ValidationError(`${label} es obligatorio.`);
  }
  const number = typeof value === "string" ? Number(value.replace(",", ".")) : Number(value);
  if (!Number.isFinite(number) || number < min || (integer && !Number.isInteger(number))) {
    throw new ValidationError(`${label} no tiene un valor válido.`);
  }
  return number;
}

function decodeImages(images) {
  if (!Array.isArray(images) || images.length === 0) {
    throw new ValidationError("Añade al menos una imagen.");
  }
  if (images.length > MAX_IMAGES) {
    throw new ValidationError(`Puedes añadir un máximo de ${MAX_IMAGES} imágenes.`);
  }
  return images.map((image, index) => {
    const match = String(image?.dataUrl || "").match(/^data:image\/jpeg;base64,([A-Za-z0-9+/=]+)$/);
    if (!match) throw new ValidationError(`La imagen ${index + 1} no es un JPG válido.`);
    const buffer = Buffer.from(match[1], "base64");
    if (buffer.length === 0 || buffer.length > MAX_IMAGE_BYTES) {
      throw new ValidationError(`La imagen ${index + 1} supera el límite de 10 MB.`);
    }
    if (buffer[0] !== 0xff || buffer[1] !== 0xd8 || buffer.at(-2) !== 0xff || buffer.at(-1) !== 0xd9) {
      throw new ValidationError(`La imagen ${index + 1} no contiene datos JPEG válidos.`);
    }
    return { originalName: cleanFilename(image.name, index), buffer };
  });
}

function cleanFilename(value, index) {
  return path.basename(String(value || `imagen-${index + 1}`)).slice(0, 160);
}

async function nextImageIds(count, model) {
  const files = await fs.readdir(IMAGE_DIRECTORY);
  const ids = [
    ...files.map((file) => Number(path.basename(file, path.extname(file)))),
    ...model.products.flatMap((product) => product.imageIds || []).map(Number),
  ].filter(Number.isInteger);
  const first = (ids.length ? Math.max(...ids) : 0) + 1;
  return Array.from({ length: count }, (_, index) => first + index);
}

export async function preparePreview(payload, source = null) {
  const catalogSource = source ?? (await fs.readFile(CATALOG_PATH, "utf8"));
  const model = readCatalogModel(catalogSource);
  const name = String(payload?.name || "").trim();
  if (!name || name.length > 180) throw new ValidationError("Indica un nombre de hasta 180 caracteres.");
  const price = parseNumber(payload?.price, "El precio", { min: 0 });
  const stock = parseNumber(payload?.stock ?? 0, "El stock", { integer: true, min: 0 });
  const description = sanitizeDescription(payload?.description);
  const images = decodeImages(payload?.images);
  const requestedNewCategory = String(payload?.newCategory || "").trim();
  const requestedExistingCategory = String(payload?.category || "").trim();
  let categoryLabel;
  let categoryKey;
  let isNewCategory = false;

  if (requestedNewCategory) {
    if (requestedNewCategory.length > 100 || requestedNewCategory.toLocaleLowerCase("es") === "inicio") {
      throw new ValidationError("La categoría nueva no es válida.");
    }
    const sameCategory = model.publicCategories.find(
      (category) => category.toLocaleLowerCase("es") === requestedNewCategory.toLocaleLowerCase("es"),
    );
    if (sameCategory) {
      categoryLabel = sameCategory;
      categoryKey = model.categoryEntries.find(({ label }) => label === sameCategory)?.key;
    } else {
      categoryLabel = requestedNewCategory;
      categoryKey = categoryKeyFor(categoryLabel, model.categoryEntries);
      isNewCategory = true;
    }
  } else {
    if (!model.publicCategories.includes(requestedExistingCategory)) {
      throw new ValidationError("Selecciona una categoría existente o escribe una nueva.");
    }
    categoryLabel = requestedExistingCategory;
    categoryKey = model.categoryEntries.find(({ label }) => label === categoryLabel)?.key;
  }
  if (!categoryKey) throw new Error("No se pudo resolver la constante de categoría.");

  const numericIds = model.products.map(({ id }) => Number(id)).filter(Number.isInteger);
  const productId = String((numericIds.length ? Math.max(...numericIds) : 0) + 1);
  const reference = String(payload?.reference || "").trim() || generatedReference(productId, model.products);
  if (reference.length > 100) throw new ValidationError("La referencia supera los 100 caracteres.");
  if (model.products.some((product) => String(product.reference) === reference)) {
    throw new ValidationError("La referencia ya existe. Déjala vacía para generar otra automáticamente.");
  }
  const slug = slugify(name);
  if (!slug) throw new ValidationError("El nombre no permite generar un slug válido.");
  const imageIds = await nextImageIds(images.length, model);
  return {
    catalogHash: hash(catalogSource),
    product: {
      id: productId,
      reference,
      name,
      slug,
      price,
      stock,
      categories: [categoryLabel, "Inicio"],
      imageIds,
      description,
    },
    category: { key: categoryKey, label: categoryLabel, isNew: isNewCategory },
    images: images.map((image, index) => ({ ...image, id: imageIds[index] })),
    files: [
      "src/data/catalog.ts",
      ...imageIds.map((id) => `public/images/products/${id}.jpg`),
    ],
    warnings: isNewCategory
      ? ["La categoría será pública. Inglés y francés mostrarán su nombre en español hasta añadir traducciones."]
      : [],
  };
}

export function applyPreviewToCatalog(source, preview) {
  const newline = source.includes("\r\n") ? "\r\n" : "\n";
  let updated = source;
  if (preview.category.isNew) {
    const internalLine = /^(\s*)INTERNAL:\s*"Inicio",\s*$/m;
    if (!internalLine.test(updated)) throw new Error("No se encontró la categoría INTERNAL.");
    updated = updated.replace(
      internalLine,
      (_, indent) => `${indent}${preview.category.key}: ${JSON.stringify(preview.category.label)},${newline}${indent}INTERNAL: "Inicio",`,
    );
    const categories = parseLiteral(updated, "export const categories", "[", "]");
    const beforeClose = updated.slice(0, categories.end);
    const needsNewline = !beforeClose.endsWith(newline);
    updated = `${beforeClose}${needsNewline ? newline : ""}  CATALOG_CATEGORIES.${preview.category.key},${newline}${updated.slice(categories.end)}`;
  }

  const productLiteral = parseLiteral(updated, "export const products", "[", "]");
  const serializable = {
    ...preview.product,
    categories: ["__CATALOG_EDITOR_CATEGORY__", "__CATALOG_EDITOR_INTERNAL__"],
  };
  let productSource = JSON.stringify(serializable, null, 2);
  productSource = productSource
    .replace('"__CATALOG_EDITOR_CATEGORY__"', `CATALOG_CATEGORIES.${preview.category.key}`)
    .replace('"__CATALOG_EDITOR_INTERNAL__"', "CATALOG_CATEGORIES.INTERNAL")
    .split("\n")
    .map((line) => `  ${line}`)
    .join(newline);
  const arrayBody = updated.slice(productLiteral.start + 1, productLiteral.end).trim();
  const separator = arrayBody ? `,${newline}` : newline;
  return `${updated.slice(0, productLiteral.end)}${separator}${productSource}${newline}${updated.slice(productLiteral.end)}`;
}

async function atomicWrite(filePath, content) {
  const temporary = `${filePath}.${process.pid}.${randomUUID()}.tmp`;
  await fs.writeFile(temporary, content);
  try {
    await fs.rename(temporary, filePath);
  } catch (error) {
    await fs.rm(temporary, { force: true });
    throw error;
  }
}

async function runValidation() {
  const audit = await execFileAsync(
    process.execPath,
    [path.join(PROJECT_ROOT, ".agents", "skills", "adminer-catalog-import", "scripts", "catalog-tool.mjs"), "audit"],
    { cwd: PROJECT_ROOT, windowsHide: true, maxBuffer: 10 * 1024 * 1024 },
  );
  const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";
  const build = await execFileAsync(npmCommand, ["run", "build"], {
    cwd: PROJECT_ROOT,
    windowsHide: true,
    maxBuffer: 10 * 1024 * 1024,
  });
  return { audit: audit.stdout.trim(), build: build.stdout.trim() };
}

async function commitPreview(preview) {
  const currentSource = await fs.readFile(CATALOG_PATH, "utf8");
  if (hash(currentSource) !== preview.catalogHash) {
    throw new ValidationError("El catálogo ha cambiado desde la vista previa. Revísala de nuevo.");
  }
  const model = readCatalogModel(currentSource);
  if (model.products.some(({ id }) => String(id) === preview.product.id)) {
    throw new ValidationError("El ID calculado ya está ocupado. Revise de nuevo la vista previa.");
  }
  for (const image of preview.images) {
    try {
      await fs.access(path.join(IMAGE_DIRECTORY, `${image.id}.jpg`));
      throw new ValidationError(`La imagen ${image.id}.jpg ya existe. Revise de nuevo la vista previa.`);
    } catch (error) {
      if (error instanceof ValidationError) throw error;
      if (error.code !== "ENOENT") throw error;
    }
  }

  const updatedSource = applyPreviewToCatalog(currentSource, preview);
  const writtenImages = [];
  try {
    for (const image of preview.images) {
      const destination = path.join(IMAGE_DIRECTORY, `${image.id}.jpg`);
      await fs.writeFile(destination, image.buffer, { flag: "wx" });
      writtenImages.push(destination);
    }
    await atomicWrite(CATALOG_PATH, updatedSource);
    const validation = await runValidation();
    return validation;
  } catch (error) {
    await atomicWrite(CATALOG_PATH, currentSource).catch(() => {});
    await Promise.all(writtenImages.map((file) => fs.rm(file, { force: true }).catch(() => {})));
    throw error;
  }
}

function enqueueCommit(operation) {
  const result = commitQueue.then(operation, operation);
  commitQueue = result.catch(() => {});
  return result;
}

function publicPreview(preview) {
  return {
    product: preview.product,
    category: preview.category,
    images: preview.images.map(({ id, originalName, buffer }) => ({ id, originalName, bytes: buffer.length })),
    files: preview.files,
    warnings: preview.warnings,
  };
}

function json(response, status, body) {
  response.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Cache-Control": "no-store",
    "X-Content-Type-Options": "nosniff",
  });
  response.end(JSON.stringify(body));
}

async function readJson(request) {
  let size = 0;
  const chunks = [];
  for await (const chunk of request) {
    size += chunk.length;
    if (size > MAX_BODY_BYTES) throw new ValidationError("La solicitud supera el límite de 45 MB.", 413);
    chunks.push(chunk);
  }
  try {
    return JSON.parse(Buffer.concat(chunks).toString("utf8"));
  } catch {
    throw new ValidationError("La solicitud JSON no es válida.");
  }
}

function isLocalRequest(request) {
  const address = request.socket.remoteAddress || "";
  const host = String(request.headers.host || "").split(":")[0].replace(/^\[|\]$/g, "");
  const localAddress = address === "127.0.0.1" || address === "::1" || address === "::ffff:127.0.0.1";
  return localAddress && (host === "127.0.0.1" || host === "localhost" || host === "[::1]");
}

async function serveAsset(response, filename, contentType) {
  const body = await fs.readFile(path.join(EDITOR_ROOT, filename));
  response.writeHead(200, {
    "Content-Type": contentType,
    "Cache-Control": "no-store",
    "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self' data: blob:; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'",
    "X-Content-Type-Options": "nosniff",
    "X-Frame-Options": "DENY",
    "Referrer-Policy": "no-referrer",
  });
  response.end(body);
}

async function handleRequest(request, response) {
  if (!isLocalRequest(request)) return json(response, 403, { error: "Acceso exclusivamente local." });
  const url = new URL(request.url, "http://localhost");
  try {
    if (request.method === "GET" && url.pathname === "/") {
      return await serveAsset(response, "index.html", "text/html; charset=utf-8");
    }
    if (request.method === "GET" && url.pathname === "/app.js") {
      return await serveAsset(response, "app.js", "text/javascript; charset=utf-8");
    }
    if (request.method === "GET" && url.pathname === "/styles.css") {
      return await serveAsset(response, "styles.css", "text/css; charset=utf-8");
    }
    if (request.method === "GET" && url.pathname === "/api/catalog") {
      const source = await fs.readFile(CATALOG_PATH, "utf8");
      const model = readCatalogModel(source);
      return json(response, 200, { categories: model.publicCategories, productCount: model.products.length });
    }
    if (request.method === "POST" && url.pathname === "/api/preview") {
      const preview = await preparePreview(await readJson(request));
      const token = randomUUID();
      previews.set(token, { preview, expiresAt: Date.now() + PREVIEW_TTL_MS });
      return json(response, 200, { token, ...publicPreview(preview) });
    }
    if (request.method === "POST" && url.pathname === "/api/commit") {
      const { token } = await readJson(request);
      const stored = previews.get(String(token || ""));
      previews.delete(String(token || ""));
      if (!stored || stored.expiresAt < Date.now()) {
        throw new ValidationError("La vista previa ha caducado. Genérala de nuevo.");
      }
      const validation = await enqueueCommit(() => commitPreview(stored.preview));
      return json(response, 200, {
        message: `Producto ${stored.preview.product.id} añadido correctamente.`,
        product: stored.preview.product,
        files: stored.preview.files,
        validation,
      });
    }
    return json(response, 404, { error: "Ruta no encontrada." });
  } catch (error) {
    const status = error instanceof ValidationError ? error.status : 500;
    if (!(error instanceof ValidationError)) console.error(error);
    return json(response, status, { error: error.message || "Error interno." });
  }
}

class ValidationError extends Error {
  constructor(message, status = 400) {
    super(message);
    this.name = "ValidationError";
    this.status = status;
  }
}

export function startServer(port = 4311) {
  const server = createServer(handleRequest);
  server.listen(port, "127.0.0.1", () => {
    console.log(`Editor local de catálogo: http://127.0.0.1:${port}`);
    console.log("Pulsa Ctrl+C para cerrarlo.");
  });
  return server;
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const portArgument = process.argv.find((argument) => argument.startsWith("--port="));
  const port = portArgument ? Number(portArgument.slice("--port=".length)) : 4311;
  if (!Number.isInteger(port) || port < 1024 || port > 65535) {
    console.error("Usa un puerto entre 1024 y 65535, por ejemplo --port=4311.");
    process.exit(1);
  }
  startServer(port);
}

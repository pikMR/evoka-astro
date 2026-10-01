import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";
import test from "node:test";
import ts from "typescript";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const transpile = (source) => ts.transpileModule(source, {
  compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 },
}).outputText;
const dataModule = (path) => {
  const exports = {};
  runInNewContext(transpile(read(path)), { exports });
  return exports;
};
const { products, categories, CATALOG_CATEGORIES } = dataModule("src/data/catalog.ts");
const { productTranslations, productTranslationsExtra, catalogProductNames } = dataModule("src/i18n/ui.ts");
const { CATALOG_PAGE_SIZE } = dataModule("src/config/site.ts");
const source = read("src/components/CatalogSection.astro").match(/<script>([\s\S]*?)<\/script>/)[1];

// A small DOM adapter runs the actual Astro controller, including deferred cards.
function element(dataset = {}) {
  const classes = new Set();
  const attributes = new Map();
  const listeners = new Map();
  return {
    dataset, hidden: false, value: "", textContent: "", focused: false,
    scroll: { behavior: "" },
    offsetLeft: 100, offsetWidth: 40, clientWidth: 200, scrollWidth: 800,
    classList: {
      contains: (name) => classes.has(name),
      toggle: (name, enabled) => enabled ? classes.add(name) : classes.delete(name),
    },
    setAttribute: (name, value) => attributes.set(name, value),
    getAttribute: (name) => attributes.get(name),
    addEventListener: (name, listener) => listeners.set(name, listener),
    click() { listeners.get("click")?.(); },
    input(value) { this.value = value; listeners.get("input")?.(); },
    focus() { this.focused = true; },
    scrollTo(options) { this.scroll = options; },
    scrollIntoView(options) { this.scroll = options; },
  };
}

function mount(locale, withChips = true) {
  const localized = (product) => productTranslations[product.id]?.[locale]
    ?? productTranslationsExtra[product.id]?.[locale] ?? product;
  const ordered = [...products].sort((a, b) => a.name.localeCompare(b.name, "es", { sensitivity: "base" }));
  const cards = ordered.map((product, index) => {
    const copy = localized(product);
    return element({
      id: product.id,
      catalogIndex: String(index),
      categories: product.categories.join("|"),
      name: `${catalogProductNames[product.id]?.[locale] ?? copy.name} ${copy.name} ${product.categories.join(" ")}`.toLowerCase(),
    });
  });
  const live = new Set(cards.filter((card) => card.dataset.categories.split("|").includes(CATALOG_CATEGORIES.SNOOPY_COLLECTION)));
  const templates = cards.filter((card) => !live.has(card)).map((card) => ({
    content: { querySelector: () => card, cloneNode: () => card },
    replaceWith(clone) { live.add(clone); this.replaced = true; },
  }));
  const chips = withChips ? categories.map((category) => element({ filter: category })) : [];
  const rows = categories.map((category) => element({ filterLink: category }));
  const nodes = Object.fromEntries([
    "product-search", "empty-state", "catalog-pagination", "catalog-view-all-action",
    "catalog-view-all", "catalog-load-more", "catalog-progress", "catalogo",
  ].map((id) => [`#${id}`, element()]));
  nodes["#catalog-load-more"].dataset.pageSize = String(CATALOG_PAGE_SIZE);
  nodes["#catalog-progress"].dataset = { total: String(products.length), showing: "Showing", of: "of" };
  const filterList = withChips ? element() : null;
  const document = {
    fonts: { ready: Promise.resolve(), addEventListener() {} },
    querySelector: (selector) => selector === ".filter-list" ? filterList : nodes[selector],
    querySelectorAll: (selector) => ({
      "[data-filter]": chips, "[data-filter-link]": rows,
      ".catalog-card": cards.filter((card) => live.has(card)),
      "[data-deferred-card]": templates.filter((template) => !template.replaced),
      '.featured-image[href^="#product-"]': [],
    })[selector] ?? [],
  };
  // Selection tests have no rendered labels or layout events. Keep browser
  // subscriptions inert and flush scheduled layout work deterministically.
  const frames = new Map();
  let nextFrame = 0;
  runInNewContext(transpile(source), {
    document,
    window: { addEventListener() {} },
    ResizeObserver: class { observe() {} },
    requestAnimationFrame(callback) {
      frames.set(++nextFrame, callback);
      return nextFrame;
    },
    cancelAnimationFrame(id) { frames.delete(id); },
    exports: {},
    require: () => ({ CATALOG_CATEGORIES }),
  });
  for (const [id, callback] of frames) {
    frames.delete(id);
    callback(0);
  }
  return {
    nodes, chips, rows,
    visible: () => cards.filter((card) => live.has(card) && !card.hidden),
    row: (category) => rows.find((row) => row.dataset.filterLink === category),
    chip: (category) => chips.find((chip) => chip.dataset.filter === category),
  };
}

const babies = CATALOG_CATEGORIES.BABIES_BIRTHS;
const wellness = CATALOG_CATEGORIES.WELLNESS_SPA;
function expectCategory(app, category) {
  const expected = Array.from(products).filter((product) => product.categories.includes(category)).map((product) => product.id).sort();
  assert.deepEqual(app.visible().map((card) => card.dataset.id).sort(), expected);
  for (const chip of app.chips) {
    const selected = chip.dataset.filter === category;
    assert.equal(chip.classList.contains("is-active"), selected);
    assert.equal(chip.getAttribute("aria-pressed"), String(selected));
  }
  assert.equal(app.nodes["#empty-state"].hidden, expected.length > 0);
  assert.equal(app.nodes["#catalog-pagination"].hidden, true);
}

for (const locale of ["es", "fr", "en"]) {
  test(`${locale}: initial Snoopy, all products and incremental pagination`, () => {
    const app = mount(locale);
    assert.equal(app.visible().length, 7);
    assert.ok(app.visible().every((card) => card.dataset.categories.includes(CATALOG_CATEGORIES.SNOOPY_COLLECTION)));
    assert.ok(app.chips.every((chip) => !chip.classList.contains("is-active")));
    assert.equal(app.nodes["#catalog-view-all-action"].hidden, false);
    app.nodes["#catalog-view-all"].click();
    assert.equal(app.visible().length, 20);
    assert.equal(app.nodes["#catalog-pagination"].hidden, false);
    assert.equal(app.nodes["#catalog-load-more"].focused, true);
    for (const count of [40, 60, 78]) {
      app.nodes["#catalog-load-more"].click();
      assert.equal(app.visible().length, count);
    }
    assert.equal(app.nodes["#catalog-load-more"].hidden, true);
  });

  test(`${locale}: Explore clears search and repeated selection stays active`, () => {
    const app = mount(locale);
    app.row(babies).click();
    expectCategory(app, babies);
    app.row(babies).click();
    expectCategory(app, babies);
    app.nodes["#product-search"].input("no-matching-product-xyz");
    assert.equal(app.visible().length, 0);
    assert.equal(app.nodes["#empty-state"].hidden, false);
    app.row(wellness).click();
    assert.equal(app.nodes["#product-search"].value, "");
    expectCategory(app, wellness);
    assert.equal(app.nodes["#catalogo"].scroll.behavior, "smooth");
    app.chip(wellness).click();
    assert.equal(app.visible().length, 20);
    app.chip(babies).click();
    expectCategory(app, babies);
    app.nodes["#product-search"].input("snoopy");
    assert.ok(app.visible().length > 0);
    assert.ok(app.visible().every((card) => card.dataset.name.includes("snoopy")));
    assert.ok(app.chips.every((chip) => !chip.classList.contains("is-active")));
    app.chip(wellness).click();
    assert.equal(app.nodes["#product-search"].value, "snoopy");
    assert.ok(app.visible().every((card) => card.dataset.name.includes("snoopy") && card.dataset.categories.includes(wellness)));
  });

  test(`${locale}: every Explore category works without chips or their container`, () => {
    const app = mount(locale, false);
    for (const category of categories) {
      app.nodes["#product-search"].input("no-matching-product-xyz");
      app.row(category).click();
      expectCategory(app, category);
      assert.equal(app.nodes["#product-search"].value, "");
      assert.equal(app.nodes["#catalog-view-all-action"].hidden, true);
      app.row(category).click();
      expectCategory(app, category);
    }
  });
}

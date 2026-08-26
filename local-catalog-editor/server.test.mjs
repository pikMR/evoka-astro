import assert from "node:assert/strict";
import test from "node:test";
import {
  applyPreviewToCatalog,
  readCatalogModel,
  sanitizeDescription,
  slugify,
} from "./server.mjs";

const source = `export const CATALOG_CATEGORIES = {
  EXISTING: "Existente",
  INTERNAL: "Inicio",
} as const;

export const categories = [
  CATALOG_CATEGORIES.EXISTING,
] as const;

export const products = [
  {
    "id": "1",
    "reference": "12050",
    "name": "Anterior",
    "slug": "anterior",
    "price": 1,
    "stock": 1,
    "categories": [CATALOG_CATEGORIES.EXISTING, CATALOG_CATEGORIES.INTERNAL],
    "imageIds": [1],
    "description": "<p>Anterior</p>"
  }
];
`;

function preview(overrides = {}) {
  return {
    category: { key: "EXISTING", label: "Existente", isNew: false },
    product: {
      id: "2",
      reference: "12051",
      name: "Té & Magia",
      slug: "te-y-magia",
      price: 2.5,
      stock: 0,
      categories: ["Existente", "Inicio"],
      imageIds: [2],
      description: "<p>Nuevo <strong>producto</strong></p>",
    },
    ...overrides,
  };
}

test("slugify separa palabras, elimina acentos y normaliza ampersands", () => {
  assert.equal(slugify("  Té & Magia — edición 2  "), "te-y-magia-edicion-2");
});

test("sanitizeDescription conserva formato permitido y elimina atributos activos", () => {
  assert.equal(
    sanitizeDescription('<p class="lead" onclick="bad()">Hola <strong style="x">mundo</strong></p>'),
    "<p>Hola <strong>mundo</strong></p>",
  );
  assert.equal(
    sanitizeDescription('<p><a href="https://evoka.local" target="_blank">Evoka</a></p>'),
    '<p><a href="https://evoka.local" rel="noopener noreferrer">Evoka</a></p>',
  );
});

test("sanitizeDescription rechaza contenido HTML peligroso", () => {
  assert.throws(() => sanitizeDescription("<script>alert(1)</script>"), /no permitidos/);
  assert.throws(() => sanitizeDescription('<iframe src="https://example.com"></iframe>'), /no permitidos/);
});

test("applyPreviewToCatalog añade un producto usando constantes", () => {
  const updated = applyPreviewToCatalog(source, preview());
  const model = readCatalogModel(updated);
  assert.equal(model.products.length, 2);
  assert.deepEqual(model.products[1], preview().product);
  assert.match(updated, /CATALOG_CATEGORIES\.EXISTING/);
  assert.match(updated, /CATALOG_CATEGORIES\.INTERNAL/);
});

test("applyPreviewToCatalog no confunde el nombre con una categoría", () => {
  const candidate = preview();
  candidate.product.name = "Existente";
  const updated = applyPreviewToCatalog(source, candidate);
  const model = readCatalogModel(updated);
  assert.equal(model.products[1].name, "Existente");
  assert.deepEqual(model.products[1].categories, ["Existente", "Inicio"]);
});

test("applyPreviewToCatalog crea y publica una categoría nueva", () => {
  const candidate = preview({
    category: { key: "CELEBRACIONES", label: "Celebraciones", isNew: true },
  });
  candidate.product.categories[0] = "Celebraciones";
  const updated = applyPreviewToCatalog(source, candidate);
  const model = readCatalogModel(updated);
  assert.deepEqual(model.publicCategories, ["Existente", "Celebraciones"]);
  assert.equal(model.products[1].categories[0], "Celebraciones");
  assert.match(updated, /CELEBRACIONES: "Celebraciones"/);
});

# Destino Evoka Astro

Leer esta referencia antes de comparar o importar.

## Archivos

- `src/data/catalog.ts`: tipo `Product`, categorías públicas y productos.
- `src/i18n/ui.ts`: copy, traducciones de categorías/productos y catálogos de WhatsApp.
- `src/components/CatalogPage.astro`: localización, IVA, selección destacada y asignación a WhatsApp.
- `public/images/products/<imageId>.jpg`: imágenes planas por ID de imagen.

## Mapeo

| Export normalizado | Destino |
| --- | --- |
| `product_id` | `Product.id` como string |
| `reference` | `Product.reference` como string |
| `name` | `Product.name` |
| `slug` | `Product.slug` |
| `price` | `Product.price`, base sin IVA |
| `stock` | `Product.stock` |
| `categories` | `Product.categories` |
| `image_ids` | `Product.imageIds` como números |
| `description` | `Product.description`, HTML revisado |
| `catalog_key` | Regla en `catalogForProduct`, sólo si deja de ser `principal` |

## Estado de referencia (25-08-2026)

- 76 productos y 10 categorías públicas.
- 18 productos con traducciones EN/FR explícitas.
- 130 IDs de imagen usados y ninguna imagen usada ausente.
- `148.jpg` y `149.jpg` no están referenciadas.
- Referencias duplicadas: `120557`, `120563`, `120571`.
- Productos con precio cero: 30, 79, 100.
- Destino WhatsApp implementado: `principal`; España/inglés usan `+34 631 736 031` y francés `+33 6 27 54 98 00` mediante URLs de catálogo.

No tratar la instantánea como eterna: ejecutar `catalog-tool.mjs audit` y usar sus valores actuales.

## Semántica importante

- `CatalogPage.astro` multiplica precios positivos por 1,21 al renderizar.
- Precio cero muestra “Consultar”.
- El stock no controla actualmente la etiqueta “Disponible”.
- Los destacados son las posiciones 3, 4 y 5 del array.
- Categorías y contenido no traducidos hacen fallback al texto español.
- Descripciones entran en el DOM como HTML; sanear antes de importar.

# Evoka Astro Catalog

## Project context

- Read `docs/knowledge-base/README.md` before making architectural, catalog, localization, or release changes.
- Treat `src/data/catalog.ts` as the local product source of truth and `public/images/products/<imageId>.jpg` as its image store.
- The site is a static Astro catalog in Spanish, English, and French. Spanish is the default locale.
- Use `$adminer-catalog-import` for requests to inspect Adminer, compare remote catalogs, select products, or import product data.

## Catalog rules

- Keep Adminer/database access read-only. Never store credentials, session cookies, SQL dumps, or customer data in the repository.
- Before importing, show the exact selected products and a file-level preview. Do not update existing products unless the user authorizes it.
- Preserve source product IDs as strings and image IDs as numbers. Match existing products by ID; references and slugs are not unique in the current data.
- Store base prices without VAT. `CatalogPage.astro` currently adds 21% only when rendering a positive price; zero means “Consultar”.
- Keep `Inicio` as an internal product category. Only values in the exported `categories` array are public filters.
- Product descriptions are rendered as HTML. Reject or clean scripts, event-handler attributes, `javascript:` URLs, iframes, and object/embed markup before importing.
- English and French product copy falls back to Spanish when no explicit translation exists. Record that fallback in the import preview.
- Download only images belonging to the approved selection and verify every referenced image exists locally.

## Verification

- Run `node .agents/skills/adminer-catalog-import/scripts/catalog-tool.mjs audit` after catalog or image changes.
- Run `npm run build` after source changes.
- Update the knowledge base when architecture, data contracts, import rules, external catalogs, or release procedures change.

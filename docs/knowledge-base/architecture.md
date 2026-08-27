# Arquitectura

## Resumen

El repositorio contiene un catálogo estático de Evoka construido con Astro, TypeScript y CSS sin framework de UI ni backend propio. Los datos están incorporados al bundle durante el build; el navegador sólo ejecuta búsqueda, filtros, carrusel, navegación y modal de detalle.

## Entradas y rutas

- `src/pages/index.astro` renderiza español en `/`.
- `src/pages/[lang].astro` genera `/es/`, `/en/` y `/fr/` mediante `getStaticPaths`.
- `astro.config.mjs` declara español como locale por defecto, sin prefijo obligatorio, y usa `site: https://pikmr.github.io` con `base: /evoka-astro` en producción. En desarrollo cambia automáticamente a `http://localhost:4321` y `/`.
- `src/components/CatalogPage.astro` compone la página y recibe `locale` (`es`, `en` o `fr`). Las secciones visuales, los modales y sus scripts viven en componentes independientes dentro de `src/components/`.

Existe deliberadamente tanto `/` como `/es/`. No hay redirecciones, canonical URLs ni sitemap configurados en el repositorio.

## Flujo de datos

1. `src/data/catalog.ts` exporta el contrato `Product`, las categorías públicas y el array de productos. Los nombres canónicos, incluida la categoría interna `Inicio`, se declaran una sola vez en `CATALOG_CATEGORIES` y se reutilizan en todo el dataset.
2. `src/i18n/ui.ts` aporta textos de interfaz, nombres de categorías, traducciones parciales de productos y enlaces de catálogo de WhatsApp.
3. `src/lib/catalog-view.ts` centraliza la localización de categorías y productos, el formato de precios, extractos, destacados y enlaces de WhatsApp.
4. Los componentes Astro generan el HTML y enlazan imágenes desde `public/images/products` y `public/images/hero`.
5. Los scripts cliente están junto al componente que controlan: cabecera, carrusel, catálogo y modales. Filtran tarjetas ya renderizadas y no consultan ninguna API ni base de datos.

## Comportamiento de la página

- Los productos destacados son actualmente `products[3]`, `products[4]` y `products[6]`: IDs 19, 20 y 22. Su orden depende directamente del array.
- El catálogo visible se ordena alfabéticamente por nombre español en `catalog-view.ts`; la fuente `products` conserva su orden de origen.
- `CatalogSection.astro` muestra inicialmente 20 productos y amplía la ventana en bloques de 20 mediante el botón de carga; búsqueda y filtros muestran todos sus resultados y ocultan la paginación.
- La búsqueda compara nombre localizado más categorías en minúsculas.
- Los filtros utilizan las categorías canónicas en español, aunque su etiqueta visible pueda estar traducida.
- El modal usa la descripción HTML y reutiliza el enlace de WhatsApp de la tarjeta.
- `catalogForProduct()` devuelve siempre `principal`; todavía no hay asignación real por producto a varios catálogos externos.
- La compra directa no existe. Los CTA remiten a WhatsApp; el copy también menciona Vinted.

## Presentación

- `src/styles/global.css` contiene las variables, primitivas compartidas, portada, selección y reglas responsive generales.
- `src/styles/header.css`, `catalog.css`, `footer.css` y `modals.css` separan los estilos por responsabilidad y se importan de forma explícita desde `CatalogPage.astro`.
- `SiteFooter.astro` ofrece los modales de pago seguro y de información/FAQ mediante `SecurePaymentModal.astro` y `AboutModal.astro`.
- Los logos están en `public/images/brand/`.
- No hay pipeline de optimización de imágenes; los JPG se sirven como archivos estáticos.

## Límites actuales

- No hay tests, lint ni formatter configurados como scripts npm.
- No hay API, autenticación, CMS, runtime PHP ni conexión a Adminer dentro del repositorio.
- `dist/`, `.astro/` y `node_modules/` son artefactos locales ignorados por Git.
- `.github/workflows/astro.yml` codifica el despliegue estático a GitHub Pages mediante GitHub Actions.

## Editor local de catálogo

`local-catalog-editor/` es una aplicación Node independiente de Astro y versionada con el repositorio. Se inicia bajo demanda mediante `npm run catalog:editor`, escucha exclusivamente en `127.0.0.1` y no genera rutas ni archivos dentro de `dist/`.

El navegador aporta el formulario, un editor WYSIWYG sin dependencias externas y la conversión de imágenes a JPG. El servidor vuelve a validar y sanear los datos, genera identidades, presenta una vista previa de un solo uso y aplica una alta focalizada a `src/data/catalog.ts` y `public/images/products/`. No permite editar productos existentes ni consulta Adminer.

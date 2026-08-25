# Arquitectura

## Resumen

El repositorio contiene un catálogo estático de Evoka construido con Astro, TypeScript y CSS sin framework de UI ni backend propio. Los datos están incorporados al bundle durante el build; el navegador sólo ejecuta búsqueda, filtros, carrusel, navegación y modal de detalle.

## Entradas y rutas

- `src/pages/index.astro` renderiza español en `/`.
- `src/pages/[lang].astro` genera `/es/`, `/en/` y `/fr/` mediante `getStaticPaths`.
- `astro.config.mjs` declara español como locale por defecto, sin prefijo obligatorio, y `https://catalogo.evoka.local` como `site` provisional.
- `src/components/CatalogPage.astro` contiene la página completa y recibe `locale` (`es`, `en` o `fr`).

Existe deliberadamente tanto `/` como `/es/`. No hay redirecciones, canonical URLs ni sitemap configurados en el repositorio.

## Flujo de datos

1. `src/data/catalog.ts` exporta el contrato `Product`, las categorías públicas y el array de productos.
2. `src/i18n/ui.ts` aporta textos de interfaz, nombres de categorías, traducciones parciales de productos y enlaces de catálogo de WhatsApp.
3. `CatalogPage.astro` localiza los datos, calcula el precio visible, genera todo el HTML y enlaza imágenes desde `public/images/products`.
4. El script cliente filtra tarjetas ya renderizadas; no consulta ninguna API ni base de datos.

## Comportamiento de la página

- Los productos destacados son actualmente `products.slice(3, 6)`: IDs 19, 20 y 21. Su orden depende directamente del array.
- La búsqueda compara nombre localizado más categorías en minúsculas.
- Los filtros utilizan las categorías canónicas en español, aunque su etiqueta visible pueda estar traducida.
- El modal usa la descripción HTML y reutiliza el enlace de WhatsApp de la tarjeta.
- `catalogForProduct()` devuelve siempre `principal`; todavía no hay asignación real por producto a varios catálogos externos.
- La compra directa no existe. Los CTA remiten a WhatsApp; el copy también menciona Vinted.

## Presentación

- `src/styles/global.css` concentra casi todo el diseño, responsive incluido.
- `src/styles/catalog.css` contiene reglas menores del catálogo.
- Los logos están en `public/images/brand/`.
- No hay pipeline de optimización de imágenes; los JPG se sirven como archivos estáticos.

## Límites actuales

- No hay tests, lint ni formatter configurados como scripts npm.
- No hay API, autenticación, CMS, runtime PHP ni conexión a Adminer dentro del repositorio.
- `dist/`, `.astro/` y `node_modules/` son artefactos locales ignorados por Git.
- El procedimiento de despliegue no está documentado ni codificado.

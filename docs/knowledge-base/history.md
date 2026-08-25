# Historia y decisiones

## Línea temporal observada

- `dea6fe4` — 23-08-2026: crea la aplicación Astro, el primer catálogo y el conjunto inicial de imágenes.
- `5120278` — 23-08-2026: mejora productos destacados y filtrado.
- `575acfb` — 23-08-2026: incorpora rutas y copy en español, inglés y francés; extrae `CatalogPage.astro`.
- `9f6d7bd` — 23-08-2026: consolida el diseño visual y añade logos de marca.
- `5c5d553` — 24-08-2026: reorganiza categorías, incluyendo BOX Personalizables y Packaging y Empresarial.
- `1598bde` — 24-08-2026: amplía el catálogo y sus imágenes.
- `7f52e8e` — 24-08-2026: añade más productos/imágenes y refactoriza datos y traducciones.

## Decisiones consolidadas por el código

- Catálogo estático, sin dependencia de la base de datos en runtime.
- Español como contenido canónico y fallback.
- IDs de origen conservados tanto para productos como para imágenes.
- Precio almacenado sin IVA y cálculo del 21% en presentación.
- Navegación comercial mediante WhatsApp; un único catálogo `principal` implementado.
- Todos los productos se renderizan y el filtrado ocurre en cliente.

## Cuestiones abiertas

- URL exacta de Adminer, base de datos, prefijo de tablas, `id_shop` e `id_lang` de producción.
- Significado comercial definitivo de “catálogo”: tienda PrestaShop, familia/categoría, país o destino externo de WhatsApp.
- Origen HTTP o ruta de filesystem para descargar imágenes de PrestaShop.
- Reglas de actualización: qué campos remotos pueden sobrescribir ediciones locales y con qué frecuencia.
- Política de productos inactivos o sin stock.
- Destino y procedimiento de despliegue.

La skill descubre los cuatro primeros datos durante cada operación y detiene la importación si siguen siendo ambiguos.

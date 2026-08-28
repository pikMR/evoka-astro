# Dominio del catálogo

## Contrato local

Cada producto de `src/data/catalog.ts` usa:

| Campo | Tipo | Regla actual |
| --- | --- | --- |
| `id` | `string` | Identidad estable procedente del origen. Es la clave de comparación. |
| `reference` | `string` | Referencia comercial; no es única en el dataset actual. |
| `name` | `string` | Nombre base en español. |
| `slug` | `string` | Slug del origen; no se usa para rutas y no es único actualmente. |
| `price` | `number` | Precio base sin IVA. Cero representa precio a consultar. |
| `stock` | `number` | Cantidad informativa mostrada indirectamente como disponibilidad. |
| `categories` | `string[]` | Nombres canónicos en español. `Inicio` es una categoría interna. |
| `imageIds` | `number[]` | IDs que resuelven a `/images/products/<id>.jpg`. |
| `description` | `string` | Fragmento HTML confiable tras revisión/saneado. |

La forma del modelo coincide con una extracción típica de PrestaShop (`id_product`, `reference`, `link_rewrite`, precio, stock, categorías, `id_image` y descripción). Esto es una inferencia fuerte del contrato, no una conexión declarada en el repositorio; la skill debe confirmar tablas, prefijo, tienda e idioma en Adminer antes de consultar.

## Categorías públicas

El orden de los filtros es contractual porque procede del array exportado:

1. Amistad y amor
2. Bebés y nacimientos
3. Bienestar y spa
4. Colección Snoopy
5. Box personalizables
6. Entre amigos y despedidas
7. Mascotas
8. Packaging y empresarial
9. Termos y tazas
10. Papelería creativa

`Inicio` aparece en 75 productos, pero no en los filtros públicos. Añadir una categoría a un producto no la hace visible: también hay que decidir si entra en el array `categories` y aportar traducciones.

## Precio, stock y disponibilidad

- Un precio positivo se multiplica por `1.21` en la vista y se formatea en EUR según el locale.
- Un precio igual a cero muestra “Consultar” (o su traducción).
- La vista muestra “Disponible” sin evaluar el número de stock. Importar stock cero no ocultaría ni marcaría agotado el producto con el código actual.
- Cambiar IVA, moneda o semántica de stock es una decisión funcional y requiere actualizar código, documentación y validaciones juntas.

## Idiomas

- La interfaz completa existe en español, inglés y francés.
- Los nombres de categoría usan `categoryTranslations`; si falta una clave, se conserva el nombre español.
- Las traducciones de producto están separadas entre `productTranslations` y `productTranslationsExtra`, y el fallback final es el producto español.
- Estado medido el 26-08-2026: los 78 productos tienen traducción explícita en inglés y francés; el español continúa siendo la fuente base.

## Instantánea reproducible

- 78 productos.
- 132 JPG locales, 130 referenciados.
- Ninguna imagen referenciada falta.
- Imágenes huérfanas: `148.jpg` y `149.jpg`.
- IDs de producto sin duplicados.
- Referencias duplicadas: `120557`, `120563` y `120571` (dos productos cada una).
- Slugs repetidos de forma extensa; no utilizarlos como identidad.
- Tres productos con precio cero: IDs 30, 79 y 100.
- Todos los productos tienen stock positivo en la instantánea; total agregado 713.

Recalcular esta sección con `catalog-tool.mjs audit` después de una importación relevante.

## Invariantes de importación

- Comparar por `id`; señalar, pero no fusionar automáticamente, referencias o slugs duplicados.
- Mantener precios sin IVA y números finitos; no redondear el origen sin una decisión comercial.
- Mantener al menos una categoría y una imagen válida por producto salvo excepción aprobada.
- Descargar y versionar únicamente imágenes de productos seleccionados.
- Rechazar HTML activo o peligroso en descripciones.
- No crear un catálogo externo nuevo sin definir su clave, destino de WhatsApp y regla de asignación de productos.

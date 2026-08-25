# Export normalizado, selección e importación

## CSV de intercambio

Crear un CSV UTF-8 con cabecera. Usar comillas CSV estándar cuando haya comas, comillas o saltos de línea.

| Columna | Obligatoria | Formato |
| --- | --- | --- |
| `catalog_key` | No | Clave estable; por defecto `principal`. |
| `product_id` | Sí | ID de origen como texto. |
| `reference` | Sí | Texto; puede repetirse. |
| `name` | Sí | Nombre canónico. |
| `slug` | Sí | Slug de origen. |
| `price` | Sí | Decimal sin IVA, con punto decimal. |
| `stock` | Sí | Entero. |
| `categories` | Sí | Nombres unidos por `|||`. |
| `image_ids` | Sí | IDs enteros unidos por coma. |
| `description` | Sí | HTML del idioma canónico. |
| `active` | No | `1/0`, `true/false`; por defecto activo. |
| `image_base_url` | No | Base o plantilla comprobada para descargar imágenes. |

No guardar este export en Git. El comparador también acepta `id` como alias de `product_id`, `catalog` como alias de `catalog_key` e `imageIds` como alias de `image_ids`.

## Comparación

- Identificar local y remoto por `product_id`.
- Estado `new`: el ID no existe localmente.
- Estado `changed`: el ID existe y difiere algún campo del contrato.
- Estado `unchanged`: todos los campos comparables coinciden.
- Estado `inactive`: el origen marca el producto como inactivo; no borrar automáticamente.
- Marcar como conflicto cualquier ID duplicado en el export o referencia que resuelva a varios productos.

## Selección

Convertir las indicaciones del usuario en un conjunto reproducible:

```text
include.catalogs = [principal, fr]
include.categories = [Mascotas]
include.ids = [102]
where.stock = > 0
where.status = [new, changed]
exclude.ids = [110]
existing_policy = preview-only
```

Las exclusiones ganan. Mostrar siempre el resultado final con IDs; no ejecutar una intención abstracta como “los nuevos” sin fijarla contra una instantánea concreta.

## Importación

- Descargar sólo `image_ids` de la selección aprobada.
- Validar que cada descarga sea una imagen y asignarla al ID esperado.
- Comparar contenido antes de sustituir una imagen existente.
- No dar por hecho que la portada es el primer ID si la consulta no ordenó por `position`.
- No borrar productos locales por ausencia en el export.
- No cambiar traducciones, categorías públicas, destacados ni rutas de WhatsApp como efecto lateral silencioso.

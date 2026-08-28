---
name: adminer-catalog-import
description: Inspeccionar en modo lectura productos, categorías, tiendas y catálogos mediante Adminer; comparar una exportación con el catálogo Astro de Evoka; resolver selecciones por catálogo, categoría, ID, referencia, stock o estado; y preparar o ejecutar importaciones revisables. Usar ante peticiones sobre Adminer, PrestaShop, sincronización del catálogo, altas o actualizaciones selectivas de productos e imágenes. No usar para administrar la base de datos, modificar pedidos/clientes ni sincronizar automáticamente sin revisión.
---

# Importar catálogo desde Adminer

Aplicar un workflow de descubrimiento, comparación, selección y validación. Mantener la base de datos como origen consultado de solo lectura y el repositorio como destino versionado.

## Elegir el modo

- **Inspeccionar**: listar catálogos y productos sin cambiar archivos.
- **Comparar**: clasificar productos remotos como nuevos, modificados, iguales o conflictivos.
- **Preparar**: resolver la selección y entregar un plan por archivo, sin importar.
- **Importar**: modificar el repositorio sólo después de que el usuario apruebe la selección y el plan.

Si la petición no autoriza cambios, permanecer en inspección, comparación o preparación.

## 1. Cargar el contexto del destino

Leer `AGENTS.md`, `docs/knowledge-base/catalog-domain.md` y [references/project-target.md](references/project-target.md). Ejecutar:

```powershell
node .agents/skills/adminer-catalog-import/scripts/catalog-tool.mjs audit
```

Registrar el estado previo y preservar cambios locales ajenos.

## 2. Descubrir Adminer sin escribir

Preferir el navegador del usuario cuando ya contenga una sesión iniciada. No pedir que copie contraseñas al chat, no revelar cookies y no guardar credenciales ni exports sensibles en Git.

Usar únicamente consultas `SELECT`, `SHOW`, `DESCRIBE` o `EXPLAIN`. No ejecutar `INSERT`, `UPDATE`, `DELETE`, `REPLACE`, `ALTER`, `DROP`, `TRUNCATE`, `CREATE`, importaciones SQL ni acciones de edición de Adminer.

Confirmar antes de consultar productos:

1. Motor y base de datos.
2. Prefijo real de tablas.
3. Tiendas/catálogos disponibles y su significado comercial.
4. Idioma canónico y `id_lang`.
5. `id_shop` y comportamiento de stock.
6. Origen descargable de las imágenes.

Si las tablas son de PrestaShop, leer [references/prestashop-adminer.md](references/prestashop-adminer.md) y adaptar sus consultas después de comprobar las columnas. No asumir que una categoría equivale a un catálogo: usar tienda, categoría, país o destino externo sólo cuando el esquema o el usuario lo confirmen.

## 3. Crear y comparar el inventario

Exportar únicamente campos de producto necesarios, preferiblemente a un CSV temporal UTF-8 con el contrato de [references/normalized-export.md](references/normalized-export.md). No incluir clientes, pedidos, direcciones, credenciales ni tablas completas.

Comparar el export con:

```powershell
node .agents/skills/adminer-catalog-import/scripts/catalog-tool.mjs compare <export.csv>
```

Usar `--delimiter semicolon` o `--delimiter tab` cuando corresponda, y `--json` si se necesita procesar el resultado. Guardar exports sólo en una ruta temporal o ignorada; eliminarlos al finalizar si contienen datos no destinados al repositorio.

Presentar el inventario agrupado por catálogo con, como mínimo: token seleccionable, ID, referencia, nombre, categorías, stock, precio base y estado local. Paginar o resumir grupos grandes sin ocultar el número total.

## 4. Resolver indicaciones de selección

Aceptar combinaciones como:

- “Del catálogo Francia, todo lo nuevo con stock, salvo los IDs 120 y 124”.
- “Mascotas y Termos y tazas del principal; sólo referencias que empiecen por 1205”.
- “Importa 102, 103 y 110; actualiza el 102 pero no toques los existentes restantes”.

Aplicar esta precedencia:

1. IDs y referencias explícitos.
2. Catálogos y categorías incluidos.
3. Condiciones de estado, stock o precio.
4. Exclusiones explícitas, que siempre ganan.

Devolver la selección resuelta con IDs exactos, conteo por catálogo y exclusiones. Preguntar sólo cuando dos interpretaciones cambien materialmente la selección. Nunca identificar por slug o referencia duplicada sin mostrar el conflicto.

## 5. Entregar la vista previa

Antes de editar, mostrar:

- altas, actualizaciones y elementos omitidos;
- campos que cambiarían en productos existentes;
- categorías públicas nuevas o desconocidas;
- imágenes por descargar, sustituir o reutilizar;
- cobertura/fallback de inglés y francés;
- asignación de catálogo y destino de WhatsApp;
- anomalías: IDs, referencias o slugs duplicados, precio cero, stock cero y HTML inseguro;
- archivos exactos que se modificarían.

Solicitar aprobación explícita si la petición previa no aprobó ya esa selección concreta y sus actualizaciones.

## 6. Importar en el repositorio

Leer [references/normalized-export.md](references/normalized-export.md) para el mapeo. Aplicar estas reglas:

- Comparar y fusionar por ID de producto, nunca por posición, slug o referencia.
- Añadir productos nuevos; actualizar existentes sólo con autorización explícita y sólo en los campos previstos.
- Mantener el precio base sin IVA y conservar precisión razonable del origen.
- Conservar `Inicio` como categoría interna; no publicar filtros nuevos implícitamente.
- Aplanar imágenes seleccionadas a `public/images/products/<imageId>.jpg` y verificar contenido, extensión e ID.
- Revisar descripciones y detenerse ante `script`, atributos `on*`, URLs `javascript:`, `iframe`, `object` o `embed`.
- Añadir traducciones sólo desde filas verificadas del idioma correspondiente. Si faltan, declarar el fallback español.
- Ampliar `whatsappCatalogs` y `catalogForProduct()` únicamente si el usuario define un catálogo nuevo y su destino.
- Usar ediciones focalizadas; no regenerar todo `catalog.ts` si eso sobrescribe formato o cambios locales.

No escribir nunca en Adminer como parte de la importación.

## 7. Verificar y entregar

Ejecutar:

```powershell
node .agents/skills/adminer-catalog-import/scripts/catalog-tool.mjs audit
npm run build
```

Inspeccionar el diff y reportar selección importada, campos actualizados, imágenes, advertencias, fallback de traducción y resultados de ambas validaciones. Actualizar la base de conocimiento si cambió el contrato, fiscalidad, catálogo externo o workflow.

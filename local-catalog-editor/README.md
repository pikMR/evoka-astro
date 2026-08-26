# Editor local de catálogo

Herramienta editorial independiente para añadir productos a `src/data/catalog.ts` y guardar sus imágenes en `public/images/products/`. No es una ruta Astro ni forma parte de `npm run build`.

## Uso

Desde la raíz del repositorio:

```powershell
npm run catalog:editor
```

Abrir `http://127.0.0.1:4311` y mantener la terminal abierta. Para usar otro puerto:

```powershell
npm run catalog:editor -- --port=4312
```

El servidor sólo escucha en `127.0.0.1`, rechaza peticiones cuyo origen de red o cabecera `Host` no sean locales y no utiliza servicios externos.

## Flujo de alta

1. Completar categoría, nombre, precio base sin IVA, stock, descripción e imágenes. Referencia y stock son opcionales; el stock vacío equivale a 0.
2. Pulsar **Revisar producto**. La herramienta calcula el siguiente ID de producto, una referencia cuando falta, el slug, los IDs de imagen y la lista exacta de archivos.
3. Revisar la vista previa y confirmar expresamente.
4. La herramienta vuelve a comprobar que el catálogo y los IDs no hayan cambiado, escribe los archivos y ejecuta la auditoría y `npm run build`.
5. Si alguna validación falla, restaura el catálogo anterior y elimina las imágenes de esa alta.

La referencia automática mantiene el patrón observado `1205 + (id - 1)` mientras sea única; si ya existe, usa una referencia `EVK-<id>`. Las imágenes se redimensionan en el navegador a un máximo de 2400 px por lado y se convierten a JPG.

Una categoría nueva se declara en `CATALOG_CATEGORIES` y se añade a los filtros públicos. La categoría interna `Inicio` se incorpora siempre al producto. Hasta añadir traducciones en `src/i18n/ui.ts`, el nombre nuevo hace fallback al español en inglés y francés, y la vista previa lo advierte.

## Seguridad y límites

- La descripción se sanea de nuevo en el servidor y sólo admite formato editorial básico.
- Se rechazan scripts, iframes, objetos, formularios y otros elementos activos; todos los atributos salvo enlaces seguros se eliminan.
- Se aceptan hasta 8 imágenes y un máximo de 10 MB por JPG ya convertido.
- La vista previa caduca a los 15 minutos y su confirmación sólo se puede usar una vez.
- No se actualizan productos existentes ni se conecta con Adminer.

## Pruebas

```powershell
npm run test:catalog-editor
```

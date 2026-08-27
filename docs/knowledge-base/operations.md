# Operaciones

## Desarrollo local

```powershell
npm install
npm run dev
```

El proyecto usa `package-lock.json`; mantener npm como gestor salvo migración explícita.

## Validación

```powershell
node .agents/skills/adminer-catalog-import/scripts/catalog-tool.mjs audit
npm run build
```

La auditoría comprueba identidad, duplicados, categorías, precios, stock, cobertura de traducciones y correspondencia entre `imageIds` y JPG locales. El build verifica que Astro pueda generar todas las rutas.

## Cambio manual de producto

1. Editar `src/data/catalog.ts` preservando el contrato y la identidad.
2. Añadir o sustituir JPG en `public/images/products/` con el ID de imagen, no el ID de producto.
3. Actualizar categorías públicas o traducciones sólo cuando proceda.
4. Revisar el impacto sobre los destacados si cambia el orden del array.
5. Ejecutar auditoría y build.

## Alta mediante el editor local

Ejecutar `npm run catalog:editor` y abrir `http://127.0.0.1:4311`. La herramienta queda fuera del build y sólo acepta conexiones locales. Antes de confirmar muestra el producto resuelto, categoría, IDs de imagen y archivos exactos.

Al confirmar, comprueba que la vista previa siga vigente, escribe catálogo e imágenes y ejecuta automáticamente la auditoría y el build. Un fallo restaura el catálogo anterior y elimina las imágenes de esa operación. Las categorías nuevas se hacen públicas y recurren al nombre español en EN/FR hasta que se añadan traducciones explícitas. Ver `local-catalog-editor/README.md` para límites y reglas de generación.

## Importación desde Adminer

Invocar `$adminer-catalog-import`. El flujo esperado es:

1. Abrir la sesión de Adminer que ya tenga el usuario y descubrir esquema, prefijo, tiendas e idiomas mediante consultas de lectura.
2. Obtener un inventario normalizado agrupado por el concepto de catálogo confirmado.
3. Compararlo con el catálogo local y presentar altas, cambios, coincidencias y conflictos.
4. Resolver las indicaciones del usuario a IDs exactos y devolver la selección para revisión.
5. Mostrar el plan por archivo, incluidas imágenes, categorías, idiomas y enrutado de WhatsApp.
6. Importar únicamente después de aprobación explícita; Adminer continúa siendo de solo lectura.
7. Auditar, construir y resumir lo aplicado y lo pendiente.

No introducir credenciales ni exports brutos en Git. Usar archivos temporales ignorados y eliminar datos sensibles cuando terminen de ser necesarios.

## Publicación

El despliegue de producción se realiza mediante GitHub Pages y GitHub Actions. El workflow está en `.github/workflows/astro.yml` y se ejecuta automáticamente con cada push a `main`; también se puede lanzar manualmente desde la pestaña Actions. Usa Node.js `22.12.0` porque la versión actual de Astro requiere Node.js 22.12.0 o superior. El build genera `dist/`, que se publica usando el entorno `github-pages`.

La configuración está preparada para la URL de proyecto `https://pikmr.github.io/evoka-astro/`: `astro.config.mjs` define `site` y `base`, mientras que `configure-pages` proporciona esos valores al build del workflow. En el repositorio de GitHub, Pages debe tener seleccionado `GitHub Actions` como fuente de publicación.

Para publicar:

```powershell
git add .
git commit -m "Configurar despliegue en GitHub Pages"
git push github-evoka main
```

El remoto `github-evoka` apunta a `https://github.com/pikMR/evoka-astro.git`; `origin` continúa apuntando al remoto privado local.

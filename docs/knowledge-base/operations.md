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

No existe una configuración de despliegue en el repositorio. `npm run build` genera `dist/`, pero copiar o publicar ese directorio requiere conocer el destino real y obtener autorización. El remote Git apunta a una instancia privada en red local; hacer push no forma parte de una petición de edición salvo solicitud expresa.

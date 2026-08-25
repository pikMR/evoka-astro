# Base de conocimiento de Evoka

Esta base ofrece a futuras sesiones una visión estable y verificable del proyecto. Resume el árbol de trabajo y los siete commits existentes hasta el 25 de agosto de 2026; cuando una afirmación es una deducción y no una configuración explícita, se marca como tal.

## Mapa

- [architecture.md](architecture.md): estructura, rutas, renderizado y flujo de datos.
- [catalog-domain.md](catalog-domain.md): contrato de producto, precios, categorías, imágenes, idiomas y estado actual de los datos.
- [operations.md](operations.md): desarrollo, validaciones y procedimiento seguro de importación.
- [history.md](history.md): evolución observada, decisiones consolidadas y cuestiones aún no resueltas.
- [../../.agents/skills/adminer-catalog-import/SKILL.md](../../.agents/skills/adminer-catalog-import/SKILL.md): workflow reutilizable para Adminer y las importaciones selectivas.

## Fuentes de verdad

1. Código y configuración actuales del repositorio.
2. Historial Git de `main` y sus diffs.
3. Resultados reproducibles de build y auditoría del catálogo.
4. Esta documentación, únicamente como explicación de las fuentes anteriores.

Si la documentación contradice al código, verificar el cambio, corregir la documentación y dejar la nueva regla explícita en `AGENTS.md` cuando deba condicionar trabajos futuros.

## Cómo mantenerla

Actualizar la página afectada en el mismo cambio cuando se modifiquen el modelo de producto, idiomas, fiscalidad, categorías visibles, asignación a catálogos externos, integración con Adminer, estructura de rutas o proceso de publicación. Mantener aquí contexto duradero; evitar diarios de sesión y detalles temporales.

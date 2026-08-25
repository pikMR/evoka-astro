# Consultas de lectura para PrestaShop en Adminer

Usar sólo después de confirmar que el esquema es PrestaShop. Sustituir cada `{{placeholder}}` por un valor observado; Adminer/MySQL no interpreta esa sintaxis por sí mismo.

## 1. Descubrir el esquema

```sql
SHOW TABLES;
SHOW TABLES LIKE '%product_lang';
SHOW TABLES LIKE '%category_product';
SHOW TABLES LIKE '%stock_available';
```

Derivar el prefijo de la tabla que termina en `product_lang`. Después inspeccionar, sin asumir versión:

```sql
DESCRIBE {{prefix}}product;
DESCRIBE {{prefix}}product_shop;
DESCRIBE {{prefix}}product_lang;
DESCRIBE {{prefix}}stock_available;
DESCRIBE {{prefix}}category_product;
DESCRIBE {{prefix}}category_lang;
DESCRIBE {{prefix}}image;
```

## 2. Idiomas y tiendas

```sql
SELECT id_lang, name, iso_code, active
FROM {{prefix}}lang
ORDER BY id_lang;

SELECT id_shop, name, active
FROM {{prefix}}shop
ORDER BY id_shop;
```

Confirmar con el usuario qué tienda o agrupación representa cada catálogo comercial. No exponer dominios internos ni datos de otras tiendas si quedan fuera de alcance.

## 3. Inventario normalizado de una tienda

Adaptar joins si las columnas descubiertas difieren. Mantener el separador literal `|||` para categorías.

```sql
SELECT
  '{{catalog_key}}' AS catalog_key,
  CAST(p.id_product AS CHAR) AS product_id,
  COALESCE(p.reference, '') AS reference,
  pl.name AS name,
  pl.link_rewrite AS slug,
  ps.price AS price,
  COALESCE(MAX(sa.quantity), 0) AS stock,
  GROUP_CONCAT(DISTINCT cl.name ORDER BY cl.name SEPARATOR '|||') AS categories,
  GROUP_CONCAT(DISTINCT i.id_image ORDER BY i.position SEPARATOR ',') AS image_ids,
  pl.description AS description,
  ps.active AS active
FROM {{prefix}}product p
JOIN {{prefix}}product_shop ps
  ON ps.id_product = p.id_product
 AND ps.id_shop = {{shop_id}}
JOIN {{prefix}}product_lang pl
  ON pl.id_product = p.id_product
 AND pl.id_shop = {{shop_id}}
 AND pl.id_lang = {{lang_id}}
LEFT JOIN {{prefix}}stock_available sa
  ON sa.id_product = p.id_product
 AND sa.id_product_attribute = 0
 AND sa.id_shop = {{shop_id}}
LEFT JOIN {{prefix}}category_product cp
  ON cp.id_product = p.id_product
LEFT JOIN {{prefix}}category_lang cl
  ON cl.id_category = cp.id_category
 AND cl.id_shop = {{shop_id}}
 AND cl.id_lang = {{lang_id}}
LEFT JOIN {{prefix}}image i
  ON i.id_product = p.id_product
GROUP BY
  p.id_product,
  p.reference,
  pl.name,
  pl.link_rewrite,
  ps.price,
  pl.description,
  ps.active
ORDER BY p.id_product;
```

Si `stock_available.id_shop` usa cero o grupos de tiendas, descubrirlo con una consulta acotada antes de cambiar el join. Si `product_lang` o `category_lang` no tiene `id_shop`, retirar sólo esa condición después de verificar columnas.

## 4. Comprobar categorías e imágenes

```sql
SELECT c.id_category, cl.name, c.active
FROM {{prefix}}category c
JOIN {{prefix}}category_lang cl
  ON cl.id_category = c.id_category
 AND cl.id_shop = {{shop_id}}
 AND cl.id_lang = {{lang_id}}
ORDER BY c.level_depth, cl.name;

SELECT id_image, id_product, position, cover
FROM {{prefix}}image
WHERE id_product IN ({{approved_product_ids}})
ORDER BY id_product, position;
```

Ejecutar la segunda consulta sólo después de resolver una selección; sustituir `{{approved_product_ids}}` por una lista numérica exacta.

## 5. Localizar archivos de imagen

PrestaShop suele almacenar el ID 242 bajo `img/p/2/4/2/242.jpg`, separando los dígitos en directorios. Confirmar la versión y el host real antes de descargar: instalaciones, formatos WebP, tiendas y CDNs pueden cambiar la ruta. No descargar el árbol completo; obtener únicamente los IDs aprobados.

## Controles

- Verificar que `GROUP_CONCAT` no esté truncado cuando un producto tenga muchas categorías o imágenes.
- Exportar como CSV UTF-8 con cabecera.
- No usar una consulta sin `id_shop`/`id_lang` confirmado en una instalación multitienda.
- No consultar tablas de clientes, pedidos, empleados, sesiones ni configuración secreta.

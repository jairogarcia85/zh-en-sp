# 🐾 Mochi Pet — e-commerce de productos para mascotas (VI / EN)

Tienda sencilla, **sin método de pago**: catálogo + carrito. Está en **vietnamita** (por defecto
si el navegador está en vietnamita) y en **inglés**. Se cambia con el botón VI / EN.

## Cómo abrirla

Abre `petshop/index.html` en el navegador. No hace falta servidor ni instalar nada.

Con GitHub Pages activo, la tienda queda en `https://jairogarcia85.github.io/zh-en-sp/petshop/`
(cuando esta rama se fusione a la rama que publica Pages).

## Qué hace

- 21 productos de ejemplo para perros, gatos, mascotas pequeñas, peces y aves.
- Filtros por mascota y por tipo de producto, buscador y orden por precio, popularidad o calificación.
- Ficha rápida de producto con selector de cantidad.
- Carrito lateral: sumar y restar cantidades, quitar productos, subtotal y barra de envío gratis (desde 500.000 ₫).
- El carrito y el idioma se guardan en el navegador (`localStorage`).
- Diseño adaptable a celular.
- El botón de pago está desactivado y muestra "próximamente".

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura de la página |
| `css/styles.css` | Estilos |
| `js/i18n.js` | **Textos de la interfaz** en `vi` y `en` |
| `js/products.js` | **Catálogo**: nombre, descripción, precio (VND), foto y categoría |
| `js/app.js` | Lógica: filtros, carrito e idioma |
| `img/` | Fotos (Unsplash, licencia libre) |
| `INVESTIGACION.md` | Las 5 tiendas de referencia y qué copiamos de ellas |

### Agregar un producto

Copia un bloque en `js/products.js`, cambia el `id` (que no se repita) y pon la foto en `img/`:

```js
{ id: "p22", pet: "cat", type: "food", img: "img/mi-foto.jpg", brand: "Marca",
  price: 150000, old: 180000, rating: 4.5, reviews: 10, badge: "sale",
  name: { vi: "Tên sản phẩm", en: "Product name" },
  desc: { vi: "Mô tả…", en: "Description…" } }
```

`badge` puede ser `"sale"`, `"best"` o `"new"`, o se omite. `old` (precio tachado) también es opcional.

## Notas

- Las marcas, los precios y las reseñas son **datos de ejemplo**.
- Las fotos vienen de Unsplash. Su licencia permite el uso comercial sin atribución, aunque se agradece.
  Algunas son fotos de estilo de vida, no del producto exacto. Cuando haya catálogo real, conviene
  reemplazarlas por fotos del producto.
- Los textos en vietnamita conviene que los revise un hablante nativo antes de publicar.

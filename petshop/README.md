# 🐾 Amy's Pets — e-commerce de productos para mascotas (VI / EN)

Tienda sencilla: catálogo, carrito y **pedido por Zalo / WhatsApp con pago contra entrega**. Sin pasarela de pago. Está en **vietnamita** (por defecto
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
- **Pedido por Zalo o WhatsApp con pago contra entrega (COD)** — ver abajo.
- El carrito, el idioma y los datos del cliente se guardan en el navegador (`localStorage`).
- Diseño adaptable a celular.

## ⚠️ Antes de publicar: pon tus números

Edita **`js/config.js`**:

```js
zaloPhone: "0900000000",        // tu número de Zalo, formato local (0 + 9 dígitos)
whatsappPhone: "84900000000",   // tu WhatsApp con código de país, sin "+" (84 = Vietnam)
freeShipFrom: 500000,           // envío gratis desde este subtotal (₫)
shipFee: 30000                  // costo de envío si no llega al mínimo (₫)
```

Los números que vienen son de ejemplo y no funcionan.

## Cómo funciona el pedido

1. El cliente llena el carrito y toca **"Đặt hàng / Place order"**.
2. Llena nombre, teléfono vietnamita (se valida), dirección, provincia/ciudad y una nota opcional.
   El único método de pago es **contra entrega**.
3. Elige cómo enviar el pedido:
   - **WhatsApp** abre el chat con tu número y el pedido **ya escrito**. El cliente solo toca Enviar.
   - **Zalo** abre el chat con tu número y **copia el pedido** al portapapeles. Zalo no permite
     llevar el texto ya escrito, así que el cliente lo pega y lo envía. Si el navegador no deja
     copiar, la pantalla se lo indica y tiene un botón "Copiar".
4. El cliente ve un número de pedido (ej. `AP261108-CKRJ`) y el texto completo, por si necesita
   reenviarlo. Al tocar "Ya lo envié" se vacía el carrito.

El mensaje que te llega incluye el número de pedido, los productos con su código (`[P03]`), las
cantidades, el subtotal, el envío, el total, "pago contra entrega" y los datos de entrega.

**Importante:** el sitio no guarda los pedidos en ningún servidor. El registro está en tu chat
de Zalo o WhatsApp.

## Archivos

| Archivo | Qué contiene |
|---|---|
| `index.html` | Estructura de la página |
| `css/styles.css` | Estilos |
| `js/i18n.js` | **Textos de la interfaz** en `vi` y `en` |
| `js/products.js` | **Catálogo**: nombre, descripción, precio (VND), foto y categoría |
| `js/config.js` | **Números de Zalo/WhatsApp** y reglas de envío |
| `js/app.js` | Lógica: filtros, carrito, pedido e idioma |
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

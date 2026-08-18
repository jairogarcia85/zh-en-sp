# 三语 · ZH-EN-SP — Tutor trilingüe con mnemotecnia

Herramienta local (un solo HTML, sin instalación, sin internet obligatorio) para aprender
**chino, inglés y español al mismo tiempo**, usando el chino como ancla y la mnemotecnia
como puente entre los tres idiomas.

## Cómo abrirla

```bash
open /Users/jairogarcia/ZH-EN-SP/index.html
```

Eso es todo. Funciona en Safari/Chrome sin servidor. El progreso se guarda solo.

## Qué hace

| Pestaña | Para qué sirve |
|---|---|
| **📚 Aprender** | Tarjetas del nivel actual: carácter → pinyin → inglés → español → **mnemotecnia** → frase de ejemplo en los 3 idiomas, con audio. |
| **🔁 Repasar** | Repetición espaciada. El sistema te regresa cada tarjeta justo antes de que la olvides (1, 2, 4, 8, 16 y 35 días). |
| **🎯 Quiz** | 10 preguntas mezcladas (ZH→ES, ES→ZH, EN→ES, pinyin, ZH→EN). Con **80%** desbloqueas el siguiente nivel. |
| **📖 Recursos** | Lecturas, videos, apps y temas de gramática/cultura seleccionados para ese nivel exacto. |
| **📊 Progreso** | XP, racha, dominio por nivel, historial de quizzes y **exportar/importar** tu avance. |

## Los 6 niveles

| | Nivel | CEFR | Contenido |
|---|---|---|---|
| N1 | Fundamentos | A1 | Saludos, pronombres, preguntas, números |
| N2 | Vida diaria | A2 | Comida, tiempo, transporte, dinero |
| N3 | Conversación | B1 | Opiniones, causa-efecto, resolver situaciones |
| N4 | Oficina y trabajo | B2 | Reuniones, correos, plazos, responsabilidades |
| N5 | Negocios | B2+/C1 | Ventas, costos, cotizaciones, negociación, riesgo |
| N6 | Negocios avanzado | C1+ | Consejo, M&A, due diligence, legal, comercio exterior |

120 tarjetas en total, cada una con mnemotecnia propia.

## El método (por qué está armado así)

1. **Una imagen, tres idiomas.** Cada mnemotecnia ataca simultáneamente la forma del carácter,
   el sonido del pinyin y el significado en inglés y español.
   Ej. 现金流 = *cash **flow*** = *flujo de efectivo* → los tres usan la metáfora del agua (氵).
2. **Componentes, no palabras sueltas.** 率 (tasa) te regala 效率, 汇率 y 利率 de un solo golpe.
3. **Trampas señaladas.** 打八折 no es 8% de descuento sino que pagas el 80%.
   «Competencia» ≠ *competence*. 发票 ≠ *receipt*. Ahí es donde se pierde dinero real.
4. **Repetición espaciada, no maratones.** 20 minutos diarios > 3 horas el domingo.

## Idioma base — cambia TODA la aplicación

El selector de arriba a la derecha (Español / English / 中文) reescribe el sistema completo
al instante, sin recargar y sin perder tu progreso:

| Qué cambia | Ejemplo |
|---|---|
| Interfaz completa | pestañas, botones, mensajes, confirmaciones, pie de página |
| Nombres y metas de nivel | *Negocios avanzado* → *Advanced business* → *高级商务* |
| Etiquetas de las tarjetas | *saludos* → *greetings* → *问候* |
| Textos de recursos | los 27 recursos tienen su explicación en los 3 idiomas |
| **Dirección de los quizzes** | se adapta al idioma que ya dominas (ver abajo) |
| Cara visible de la tarjeta | base ES/EN → ves 你好 · base 中文 → ves *hola* |
| Formato de hora y `lang` del HTML | `es-MX` / `en-US` / `zh-CN` |

**Los quizzes se reorientan solos.** Preguntar «¿qué significa 你好?» a alguien
que ya habla chino no evalúa nada, así que la dirección de cada pregunta depende del idioma base:

| Base | Direcciones que se preguntan |
|---|---|
| Español | ZH→ES · ES→ZH · EN→ES · pinyin · ZH→EN |
| English | ZH→EN · EN→ZH · ES→EN · pinyin · ZH→ES |
| 中文 | ZH→ES · ES→ZH · EN→ES · pinyin · ES→EN |

Las tarjetas siempre muestran los tres idiomas al revelarse, sin importar la base.

### Lo único que sigue en español: las 120 mnemotecnias

Es deliberado, no un pendiente olvidado. Una mnemotecnia como
«贵 suena *gwei* → *¡güey, qué caro!*» **solo funciona** para quien piensa en español;
traducida al inglés o al chino deja de ser una mnemotecnia y se vuelve una nota al pie.

Si quieres versiones nativas, el formato ya lo admite: cambia `mn:"..."` por
`mn:{ es:"...", en:"...", zh:"..." }` y ajusta `resWhy()` en `js/app.js` (misma lógica
que ya usan los recursos). Pídemelo y las redacto.

## Subirla a internet

Primero compila la versión de un solo archivo (inlinea CSS y JS, queda sin dependencias):

```bash
python3 build.py
```

Genera `dist/index.html` (documento completo, para cualquier hosting) y
`dist/artifact.html` (el mismo contenido sin `<html>/<head>/<body>`, que es lo que
pide el visor de Artifacts de claude.ai).

### Opción A — Artifact de claude.ai (ya publicada)

https://claude.ai/code/artifact/2762267f-18c4-433b-8e9d-afdb94366319

Privada hasta que uses *Compartir* en la propia página. Para actualizarla:
`python3 build.py` y vuelve a publicar `dist/artifact.html` con esa misma URL.

### Opción B — Netlify Drop (sin cuenta, 30 segundos)

1. Abre https://app.netlify.com/drop
2. Arrastra la carpeta `dist/`
3. Te da una URL pública al instante (`nombre-random.netlify.app`)

### Opción C — GitHub Pages (gratis y permanente)

```bash
git init -b main
git add .
git commit -m "Tutor trilingüe ZH-EN-SP"
gh repo create zh-en-sp --public --source=. --push
```

Luego en GitHub: **Settings → Pages → Source: main / (root)**.
Queda en `https://TU-USUARIO.github.io/zh-en-sp/` en un par de minutos.
Como todo es relativo, funciona sin tocar nada; cada `git push` actualiza el sitio.

### Ojo con el progreso al cambiar de dirección

El avance vive en el `localStorage` de **cada dominio**. Tu progreso local
(`file://`) y el de la versión web son dos memorias distintas, y no se sincronizan.
Para llevártelo: **Progreso → Exportar** en un lado, **Importar** en el otro.

### Nota sobre el audio

La pronunciación usa la voz del sistema (`speechSynthesis`). En iPhone y Android
funciona si tienes instalada la voz de chino; si no la tienes, los botones 🔊
simplemente no suenan — no rompe nada.

## Atajos de teclado (en Aprender)

- `Espacio` — revelar respuesta
- `1` — no la sé · `2` — casi · `3` — la sé

## Dónde vive tu progreso

En el `localStorage` de este navegador, bajo la llave `zhensp.progress.v1`.
Si cambias de equipo o de navegador: **Progreso → Exportar** genera un `.json`
que puedes volver a importar.

## Traducir o agregar texto de interfaz

Todas las cadenas viven en [`js/i18n.js`](js/i18n.js), en tres bloques paralelos
(`ui.es`, `ui.en`, `ui.zh`) con las mismas 77 llaves. Para agregar una:
añádela en los tres y úsala con `t("mi.llave")` o `data-i18n="mi.llave"` en el HTML.
Las variables van entre llaves: `t("learn.pos", {i:1, n:20})`.

## Agregar tu propio vocabulario

Edita `js/data-a.js` (niveles 1-3) o `js/data-b.js` (niveles 4-6) y añade un objeto al arreglo `items`:

```js
{ id:"l5-21", zh:"押金", py:"yājīn", en:"deposit", es:"depósito / anticipo", tag:"finanzas",
  mn:"押 = empeñar/retener + 金 = oro/dinero → «el dinero retenido» = DEPÓSITO en garantía.",
  ex:{ zh:"押金什么时候退？", py:"Yājīn shénme shíhou tuì?",
       en:"When is the deposit refunded?", es:"¿Cuándo se devuelve el depósito?" } }
```

Regla única: **el `id` nunca se cambia** — es lo que ata tu memoria de repaso a la tarjeta.

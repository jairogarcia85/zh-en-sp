#!/usr/bin/env python3
"""
Compila la app a UN SOLO archivo autocontenido: dist/index.html
Sirve para subirla a cualquier hosting estático (o mandarla por correo).
Uso:  python3 build.py
"""
import re, pathlib, sys

root = pathlib.Path(__file__).parent
html = (root / "index.html").read_text(encoding="utf-8")

def read(rel):
    p = root / rel
    if not p.exists():
        sys.exit("Falta el archivo: " + rel)
    return p.read_text(encoding="utf-8")

# --- CSS: <link rel=stylesheet href=...> -> <style>...</style>
def inline_css(m):
    css = read(m.group(1))
    return "<style>\n" + css + "\n</style>"
html = re.sub(r'<link rel="stylesheet" href="([^"]+)">', inline_css, html)

# --- JS: <script src=...></script> -> <script>...</script>
def inline_js(m):
    js = read(m.group(1))
    # un "</script>" dentro del código cerraría la etiqueta antes de tiempo
    js = js.replace("</script>", "<\\/script>")
    return "<script>\n" + js + "\n</script>"
html = re.sub(r'<script src="([^"]+)"></script>', inline_js, html)

sobran = re.findall(r'(?:href|src)="(?!https?:|#|data:)([^"]+)"', html)
if sobran:
    sys.exit("Quedaron referencias externas sin inlinear: " + ", ".join(sobran))

out = root / "dist"
out.mkdir(exist_ok=True)

# 1) index.html — documento completo, para cualquier hosting estático
(out / "index.html").write_text(html, encoding="utf-8")

# 2) artifact.html — mismo contenido SIN <!doctype>/<html>/<head>/<body>,
#    porque el visor de Artifacts añade ese esqueleto por su cuenta.
inner = html
inner = re.sub(r"(?is)^.*?<head[^>]*>", "", inner)          # fuera doctype/html/head-apertura
inner = re.sub(r"(?is)</head>\s*<body[^>]*>", "\n", inner)  # une head y body
inner = re.sub(r"(?is)</body>\s*</html>\s*$", "", inner)
for tag in ("<meta charset=\"utf-8\">", '<meta name="viewport" content="width=device-width, initial-scale=1">'):
    inner = inner.replace(tag, "")
inner = inner.strip() + "\n"
(out / "artifact.html").write_text(inner, encoding="utf-8")

for f in ("index.html", "artifact.html"):
    kb = (out / f).stat().st_size / 1024
    print("dist/%-14s %6.0f KB" % (f, kb))
print("0 archivos externos · abre sin servidor")

/* ============================================================
   ZH-EN-SP · Tutor trilingüe con mnemotecnia
   - Interfaz completa en español / inglés / 中文 (selector "idioma base")
   - Repaso espaciado (cajas de Leitner)
   - Quizzes que se adaptan al idioma base, con desbloqueo de nivel (80%)
   - Progreso persistente en localStorage
   ============================================================ */
(function () {
"use strict";

/* ---------- datos ---------- */
var LEVELS = (window.LEVELS_A || []).concat(window.LEVELS_B || []);
var RES = window.RESOURCES || {};
var I = window.I18N;
var ALL = [];
LEVELS.forEach(function (lv) { lv.items.forEach(function (it) { it.level = lv.id; ALL.push(it); }); });

/* ---------- constantes ---------- */
var KEY = "zhensp.progress.v1";
var INTERVALS = [0, 1, 2, 4, 8, 16, 35];   // días por caja de Leitner
var MAX_BOX = INTERVALS.length - 1;
var PASS = 0.8;                             // 80% para desbloquear el siguiente nivel
var QUIZ_LEN = 10;
var LOCALE = { es: "es-MX", en: "en-US", zh: "zh-CN" };
var SPEECH = { zh: "zh-CN", en: "en-US", es: "es-MX" };

/* Direcciones de pregunta según el idioma base (el idioma que ya dominas) */
var DIRS = {
  es: [["zh","es"],["es","zh"],["en","es"],["zh","py"],["zh","en"]],
  en: [["zh","en"],["en","zh"],["es","en"],["zh","py"],["zh","es"]],
  zh: [["zh","es"],["es","zh"],["en","es"],["zh","py"],["es","en"]]
};

/* ---------- i18n ---------- */
function t(key, vars) {
  var dict = I.ui[S && S.base ? S.base : "es"] || I.ui.es;
  var s = dict[key] != null ? dict[key] : (I.ui.es[key] != null ? I.ui.es[key] : key);
  if (vars) s = s.replace(/\{(\w+)\}/g, function (m, k) { return vars[k] != null ? vars[k] : m; });
  return s;
}
function langName(code) { return (I.lang[S.base] || I.lang.es)[code] || code; }
function tagName(tag) {
  if (S.base === "es") return tag;
  var map = I.tags[S.base] || {};
  return map[tag] || tag;
}
function resType(type) {
  if (S.base === "es") return type;
  return (I.restype[S.base] || {})[type] || type;
}
function lvName(lv) { return lv.name[S.base] || lv.name.es; }
function lvGoal(lv) { return lv.goal[S.base] || lv.goal.es; }
function resWhy(r) { return (r.why && (r.why[S.base] || r.why.es)) || ""; }

/* ---------- utilidades ---------- */
function $(s) { return document.querySelector(s); }
function all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
function ymd(d) {                    // fecha LOCAL (no UTC): el día no debe cambiar a media tarde
  var m = d.getMonth() + 1, day = d.getDate();
  return d.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (day < 10 ? "0" : "") + day;
}
function today() { return ymd(new Date()); }
function addDays(n) { var d = new Date(); d.setDate(d.getDate() + n); return ymd(d); }
function esc(s) {
  return String(s == null ? "" : s).replace(/[&<>"]/g, function (c) {
    return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
  });
}
function shuffle(a) {
  a = a.slice();
  for (var i = a.length - 1; i > 0; i--) { var j = Math.floor(Math.random() * (i + 1)); var x = a[i]; a[i] = a[j]; a[j] = x; }
  return a;
}
function pick(a, n) { return shuffle(a).slice(0, n); }
function level(id) { for (var i = 0; i < LEVELS.length; i++) if (LEVELS[i].id === id) return LEVELS[i]; return LEVELS[0]; }

/* ---------- estado ---------- */
var S;
function fresh() {
  return { v: 1, base: "es", level: 1, unlocked: 1, xp: 0,
           streak: { count: 0, last: null }, cards: {}, quizzes: [] };
}
function load() {
  try { var raw = localStorage.getItem(KEY); S = raw ? JSON.parse(raw) : fresh(); }
  catch (e) { S = fresh(); }
  var f = fresh();
  for (var k in f) if (!(k in S)) S[k] = f[k];
  if (!I.ui[S.base]) S.base = "es";
}
function save() {
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
    $("#savedAt").textContent = t("foot.saved", {
      t: new Date().toLocaleTimeString(LOCALE[S.base] || "es-MX", { hour: "2-digit", minute: "2-digit" })
    });
  } catch (e) { $("#savedAt").textContent = t("foot.saveFail"); }
}
function markStudiedToday() {
  var td = today();
  if (S.streak.last !== td) {
    S.streak.count = (S.streak.last === addDays(-1) || S.streak.last === null) ? (S.streak.count || 0) + 1 : 1;
    S.streak.last = td;
  }
}
function card(id) {                 // escritura: crea la ficha si no existe
  if (!S.cards[id]) S.cards[id] = { box: 0, due: today(), seen: 0, ok: 0, bad: 0 };
  return S.cards[id];
}
function peek(id) {                 // lectura: NO crea nada (ver una tarjeta no la agenda)
  return S.cards[id] || { box: 0, due: null, seen: 0, ok: 0, bad: 0 };
}
function grade(id, g) {             // g: 0 = no la sé · 1 = casi · 2 = la sé
  var c = card(id);
  c.seen++;
  if (g === 2) { c.box = Math.min(MAX_BOX, c.box + 1); c.ok++; S.xp += 10; }
  else if (g === 1) { c.box = Math.max(1, c.box); S.xp += 5; }
  else { c.box = 0; c.bad++; S.xp += 2; }
  c.due = addDays(INTERVALS[c.box]);
  markStudiedToday();
  save(); paintHeader();
}
function dueList() {
  var td = today();
  return ALL.filter(function (it) {
    if (it.level > S.unlocked) return false;
    var c = S.cards[it.id];
    return c && c.due <= td;
  });
}
function mastery(lvId) {
  var items = level(lvId).items, sum = 0;
  items.forEach(function (it) { sum += peek(it.id).box / MAX_BOX; });
  return items.length ? sum / items.length : 0;
}

/* ---------- audio ---------- */
function speak(text, lang) {
  if (!("speechSynthesis" in window)) return;
  try {
    window.speechSynthesis.cancel();
    var u = new SpeechSynthesisUtterance(text);
    u.lang = SPEECH[lang] || "zh-CN";
    u.rate = lang === "zh" ? 0.85 : 0.95;
    window.speechSynthesis.speak(u);
  } catch (e) {}
}
function wireSpeak(root) {
  all(".spk", root).forEach(function (b) {
    b.onclick = function (e) { e.stopPropagation(); speak(b.dataset.say, b.dataset.lang); };
  });
}
function spkBtn(text, lang, label) {
  return "<button class='spk' data-say='" + esc(text) + "' data-lang='" + lang + "'>🔊" +
         (label ? " " + esc(label) : "") + "</button>";
}
function mnemoBox(text, marginTop) {
  return "<div class='mnemo'" + (marginTop ? " style='margin-top:12px'" : "") + "><h4>" +
         t("ui.mnemo") + "</h4><p>" + esc(text) + "</p></div>";
}

/* ---------- cromo estático (etiquetas fijas de la página) ---------- */
function applyChrome() {
  document.documentElement.lang = S.base;
  all("[data-i18n]").forEach(function (el) { el.textContent = t(el.dataset.i18n); });
  $("#baseLang").value = S.base;
}
function paintHeader() {
  $("#xpVal").textContent = S.xp;
  $("#streakVal").textContent = S.streak.count || 0;
  var d = dueList().length;
  $("#dueBadge").textContent = d ? d : "";
}
function paintLevels() {
  var box = $("#levelPicker"); box.innerHTML = "";
  LEVELS.forEach(function (lv) {
    var locked = lv.id > S.unlocked;
    var b = document.createElement("button");
    b.className = "lvbtn" + (lv.id === S.level ? " on" : "") + (locked ? " locked" : "");
    b.innerHTML = "<b>" + lv.code + "</b> " + esc(lvName(lv)) +
                  " <span class='cefr'>" + lv.cefr + "</span>" +
                  (locked ? " 🔒" : " <span class='cefr'>" + Math.round(mastery(lv.id) * 100) + "%</span>");
    if (locked) { b.title = t("ui.lockedHint"); b.disabled = true; }
    else b.onclick = function () { S.level = lv.id; deckPos = 0; revealed = false; quiz = null; save(); paintLevels(); render(); };
    box.appendChild(b);
  });
  $("#levelGoal").textContent = "🎯 " + lvGoal(level(S.level));
}

/* ---------- vista: APRENDER ---------- */
var deckPos = 0, revealed = false;
function deck() { return level(S.level).items; }

function renderLearn() {
  var items = deck();
  if (deckPos >= items.length) deckPos = 0;
  var it = items[deckPos];
  var showPinyin = $("#optPinyin").checked;
  var frontLang = S.base === "zh" ? "es" : "zh";   // si tu base es el chino, la cara visible es el español

  $("#deckPos").textContent = t("learn.pos", { i: deckPos + 1, n: items.length, b: peek(it.id).box, m: MAX_BOX });

  var h = "<div class='tagrow'><span class='tag'>" + esc(tagName(it.tag)) + "</span>" +
          spkBtn(it.zh, "zh", "中文") + spkBtn(it.en, "en", "EN") + spkBtn(it.es, "es", "ES") + "</div>";
  h += "<p class='hanzi'>" + esc(it[frontLang]) + "</p>";
  if (frontLang === "zh" && showPinyin) h += "<p class='pinyin'>" + esc(it.py) + "</p>";

  if (!revealed) {
    h += "<p class='sub' style='margin-top:22px'>" + t("learn.front") + "</p>";
  } else {
    h += "<div class='tri'>";
    h += "<div class='row'><span class='flag'>中文</span><span class='val'>" + esc(it.zh) +
         " <em style='font-style:normal;color:var(--accent2);font-size:15px'>" + esc(it.py) + "</em></span></div>";
    h += "<div class='row'><span class='flag'>EN</span><span class='val'>" + esc(it.en) + "</span></div>";
    h += "<div class='row'><span class='flag'>ES</span><span class='val'>" + esc(it.es) + "</span></div>";
    h += "</div>";
    h += mnemoBox(it.mn);
    h += "<div class='example'>";
    h += "<div class='ez'>" + esc(it.ex.zh) + " " + spkBtn(it.ex.zh, "zh") + "</div>";
    h += "<div class='ep'>" + esc(it.ex.py) + "</div>";
    h += "<div class='ee'>EN · " + esc(it.ex.en) + "</div>";
    h += "<div class='es'>ES · " + esc(it.ex.es) + "</div>";
    h += "</div>";
  }
  $("#card").innerHTML = h;

  $("#cardActions").innerHTML = revealed
    ? "<button class='btn bad' data-g='0'>" + t("learn.g0") + "</button>" +
      "<button class='btn mid' data-g='1'>" + t("learn.g1") + "</button>" +
      "<button class='btn ok'  data-g='2'>" + t("learn.g2") + "</button>"
    : "<button class='btn primary' id='bReveal'>" + t("learn.show") + "</button>" +
      "<button class='btn ghost' id='bSkip'>" + t("learn.skip") + "</button>";

  if ($("#optAudio").checked) speak(it[frontLang], frontLang);

  wireSpeak();
  if ($("#bReveal")) $("#bReveal").onclick = function () { revealed = true; renderLearn(); };
  if ($("#bSkip")) $("#bSkip").onclick = function () { deckPos++; revealed = false; renderLearn(); };
  all("#cardActions [data-g]").forEach(function (b) {
    b.onclick = function () { grade(it.id, +b.dataset.g); deckPos++; revealed = false; renderLearn(); paintLevels(); };
  });
}

/* ---------- vista: REPASAR ---------- */
var revQueue = null, revRevealed = false;
function renderReview() {
  var body = $("#reviewBody");
  if (revQueue === null) revQueue = shuffle(dueList());
  revQueue = revQueue.filter(function (it) { var c = S.cards[it.id]; return c && c.due <= today(); });

  if (!revQueue.length) {
    var seen = Object.keys(S.cards).length;
    body.innerHTML = "<div class='panel'><div class='empty'><span class='big'>✅</span>" +
      (seen ? "<b>" + t("rev.doneTitle") + "</b><p class='sub' style='margin-top:8px'>" + t("rev.doneBody", { n: seen }) + "</p>"
            : "<b>" + t("rev.newTitle") + "</b><p class='sub' style='margin-top:8px'>" + t("rev.newBody") + "</p>") +
      "</div></div>";
    return;
  }
  var it = revQueue[0];
  var h = "<div class='panel'><p class='sub'>" + t("rev.pending", { n: revQueue.length, l: it.level }) + "</p>";
  h += "<p class='hanzi'>" + esc(it.zh) + "</p>";
  if (revRevealed) {
    h += "<p class='pinyin'>" + esc(it.py) + "</p>";
    h += "<div class='tri'><div class='row'><span class='flag'>EN</span><span class='val'>" + esc(it.en) + "</span></div>" +
         "<div class='row'><span class='flag'>ES</span><span class='val'>" + esc(it.es) + "</span></div></div>";
    h += mnemoBox(it.mn);
    h += "<div class='actions'><button class='btn bad' data-rg='0'>" + t("learn.g0") + "</button>" +
         "<button class='btn mid' data-rg='1'>" + t("learn.g1") + "</button>" +
         "<button class='btn ok' data-rg='2'>" + t("learn.g2") + "</button></div>";
  } else {
    h += "<div class='actions'><button class='btn primary' id='rReveal'>" + t("rev.show") + "</button>" +
         "<button class='btn ghost spk' data-say='" + esc(it.zh) + "' data-lang='zh'>" + t("rev.listen") + "</button></div>";
  }
  body.innerHTML = h + "</div>";

  wireSpeak(body);
  if ($("#rReveal")) $("#rReveal").onclick = function () { revRevealed = true; renderReview(); };
  all("[data-rg]", body).forEach(function (b) {
    b.onclick = function () { grade(it.id, +b.dataset.rg); revQueue.shift(); revRevealed = false; renderReview(); paintLevels(); };
  });
}

/* ---------- vista: QUIZ ---------- */
var quiz = null;
function buildQuiz(lvId) {
  var pool = level(lvId).items;
  var chosen = pick(pool, Math.min(QUIZ_LEN, pool.length));
  var dirs = DIRS[S.base] || DIRS.es;
  var distract = ALL.filter(function (x) { return x.level <= Math.max(lvId, S.unlocked); });
  if (distract.length < 6) distract = ALL;

  var qs = chosen.map(function (it, i) {
    var d = dirs[i % dirs.length], from = d[0], to = d[1];
    var wrong = shuffle(distract.filter(function (x) { return x.id !== it.id && x[to] !== it[to]; })).slice(0, 3);
    return {
      id: it.id, item: it, from: from, to: to,
      stem: to === "py" ? t("quiz.pinyinQ") : t("quiz.translate") + ": " + langName(from) + " → " + langName(to),
      big: it[from],
      small: (from === "zh" && to !== "py") ? it.py : "",
      answer: it[to],
      opts: shuffle([it[to]].concat(wrong.map(function (w) { return w[to]; })))
    };
  });
  return { lv: lvId, qs: shuffle(qs), i: 0, right: 0, answered: false, wrongList: [] };
}

function renderQuiz() {
  var body = $("#quizBody");
  var lv = level(S.level);

  if (!quiz) {
    var last = S.quizzes.filter(function (q) { return q.level === S.level; }).slice(-1)[0];
    body.innerHTML =
      "<div class='panel'><h2>" + t("quiz.title", { code: lv.code, name: esc(lvName(lv)) }) + "</h2>" +
      "<p class='sub'>" + t("quiz.intro", { n: QUIZ_LEN, p: PASS * 100 }) + "</p>" +
      (last ? "<p class='sub'>" + t("quiz.last", { p: last.pct, d: last.date }) + "</p>" : "") +
      "<button class='btn primary' id='qStart'>" + t("quiz.start") + "</button></div>";
    $("#qStart").onclick = function () { quiz = buildQuiz(S.level); renderQuiz(); };
    return;
  }

  if (quiz.i >= quiz.qs.length) {
    var pct = Math.round(quiz.right / quiz.qs.length * 100);
    var passed = pct >= PASS * 100;
    S.quizzes.push({ level: quiz.lv, score: quiz.right, total: quiz.qs.length, pct: pct, date: today() });
    S.xp += quiz.right * 15;
    if (passed && quiz.lv === S.unlocked && S.unlocked < LEVELS.length) S.unlocked = quiz.lv + 1;
    markStudiedToday(); save(); paintHeader(); paintLevels();

    var h = "<div class='panel'><div class='scorewrap'><div class='score'>" + pct + "%</div>" +
      "<p class='sub'>" + t("quiz.results", { r: quiz.right, n: quiz.qs.length }) + "</p>" +
      "<span class='pill " + (passed ? "pass'>" + t("quiz.pass") : "fail'>" + t("quiz.fail")) + "</span></div>";
    if (passed && quiz.lv < LEVELS.length) {
      var nx = level(quiz.lv + 1);
      h += "<p class='sub' style='text-align:center'>" + t("quiz.unlocked", { code: nx.code, name: esc(lvName(nx)) }) + "</p>";
    }
    if (quiz.wrongList.length) {
      h += "<h3>" + t("quiz.toReview") + "</h3>";
      quiz.wrongList.forEach(function (it) {
        h += "<div class='res'><div class='rh'><span class='rt'>" + esc(it.zh) + " · " + esc(it.py) + "</span>" +
             "<span class='lang'>" + esc(it.es) + " / " + esc(it.en) + "</span></div><p>" + esc(it.mn) + "</p></div>";
      });
    }
    h += "<div class='actions'><button class='btn primary' id='qAgain'>" + t("quiz.again") + "</button>" +
         "<button class='btn ghost' id='qClose'>" + t("quiz.close") + "</button></div></div>";
    body.innerHTML = h;
    $("#qAgain").onclick = function () { quiz = buildQuiz(S.level); renderQuiz(); };
    $("#qClose").onclick = function () { quiz = null; renderQuiz(); };
    return;
  }

  var q = quiz.qs[quiz.i];
  var bar = quiz.i / quiz.qs.length * 100;
  var big = "<div class='panel'><div class='qprog'><i style='width:" + bar + "%'></i></div>";
  big += "<p class='qstem'>" + t("quiz.qnum", { i: quiz.i + 1, n: quiz.qs.length }) + " · " + q.stem + "</p>";
  big += "<p class='" + (q.from === "zh" ? "qbig" : "qmid") + "'>" + esc(q.big) + " " + spkBtn(q.big, q.from) + "</p>";
  if (q.small) big += "<p class='pinyin'>" + esc(q.small) + "</p>";
  big += "<div class='opts'>";
  q.opts.forEach(function (o) { big += "<button class='opt' data-o=\"" + esc(o) + "\">" + esc(o) + "</button>"; });
  big += "</div><div id='qFeed'></div></div>";
  body.innerHTML = big;

  wireSpeak(body);
  all(".opt", body).forEach(function (b) {
    b.onclick = function () {
      if (quiz.answered) return;
      quiz.answered = true;
      var good = b.dataset.o === q.answer;
      all(".opt", body).forEach(function (x) {
        x.disabled = true;
        if (x.dataset.o === q.answer) x.classList.add("right");
        else if (x === b) x.classList.add("wrong");
      });
      var c = card(q.id); c.seen++;
      if (good) { quiz.right++; c.ok++; c.box = Math.min(MAX_BOX, c.box + 1); }
      else { c.bad++; c.box = 0; quiz.wrongList.push(q.item); }
      c.due = addDays(INTERVALS[c.box]);
      save();
      $("#qFeed").innerHTML = "<div class='feedback'>" +
        (good ? t("quiz.correct") : t("quiz.wrong") + esc(q.answer)) + mnemoBox(q.item.mn, true) +
        "<div class='actions'><button class='btn primary' id='qNext'>" + t("quiz.next") + "</button></div></div>";
      $("#qNext").onclick = function () { quiz.i++; quiz.answered = false; renderQuiz(); };
    };
  });
}

/* ---------- vista: RECURSOS ---------- */
function renderRes() {
  var lv = level(S.level);
  var list = RES[S.level] || [];
  var h = "<div class='panel'><h2>" + t("res.title", { code: lv.code, name: esc(lvName(lv)) }) + "</h2>" +
          "<p class='sub'>" + t("res.sub") + "</p>";
  list.forEach(function (r) {
    h += "<div class='res'><div class='rh'><span class='kind " + esc(r.type) + "'>" + esc(resType(r.type)) + "</span>" +
         "<span class='rt'>" + esc(r.title) + "</span><span class='lang'>" + esc(r.lang) + "</span></div>" +
         "<p>" + esc(resWhy(r)) + "</p>" +
         "<a href='" + esc(r.url) + "' target='_blank' rel='noopener noreferrer'>" + t("res.open") + "</a></div>";
  });
  h += "</div><div class='panel'><h2>" + t("res.howTitle") + "</h2><p class='sub'>" + t("res.howSub") + "</p>" +
       "<ol style='margin:0;padding-left:20px;font-size:14px;line-height:1.9'>" +
       "<li>" + t("res.step1") + "</li><li>" + t("res.step2") + "</li>" +
       "<li>" + t("res.step3") + "</li><li>" + t("res.step4") + "</li></ol></div>";
  $("#resBody").innerHTML = h;
}

/* ---------- vista: PROGRESO ---------- */
function renderProg() {
  var seen = Object.keys(S.cards).length;
  var learned = Object.keys(S.cards).filter(function (k) { return S.cards[k].box >= 4; }).length;

  var h = "<div class='panel'><h2>" + t("prog.title") + "</h2><div class='kpis'>" +
    "<div class='kpi'><b>" + seen + "</b><span>" + t("prog.seen") + "</span></div>" +
    "<div class='kpi'><b>" + learned + "</b><span>" + t("prog.mastered") + "</span></div>" +
    "<div class='kpi'><b>" + ALL.length + "</b><span>" + t("prog.total") + "</span></div>" +
    "<div class='kpi'><b>" + dueList().length + "</b><span>" + t("prog.due") + "</span></div>" +
    "<div class='kpi'><b>" + S.xp + "</b><span>" + t("prog.xp") + "</span></div>" +
    "<div class='kpi'><b>" + (S.streak.count || 0) + "</b><span>" + t("prog.streak") + "</span></div></div>";

  h += "<h3>" + t("prog.byLevel") + "</h3><div class='bars'>";
  LEVELS.forEach(function (lv) {
    var m = Math.round(mastery(lv.id) * 100);
    h += "<div class='barrow'><span>" + lv.code + " " + esc(lvName(lv)) + "</span>" +
         "<span class='bar'><i style='width:" + m + "%'></i></span>" +
         "<span class='barnum'>" + (lv.id > S.unlocked ? "🔒" : m + "%") + "</span></div>";
  });
  h += "</div></div>";

  if (S.quizzes.length) {
    h += "<div class='panel'><h2>" + t("prog.history") + "</h2><table class='hist'><tr><th>" +
         t("prog.thDate") + "</th><th>" + t("prog.thLevel") + "</th><th>" + t("prog.thResult") + "</th><th></th></tr>";
    S.quizzes.slice().reverse().slice(0, 15).forEach(function (q) {
      h += "<tr><td>" + q.date + "</td><td>" + level(q.level).code + "</td><td>" + q.score + "/" + q.total + "</td>" +
           "<td><span class='pill " + (q.pct >= PASS * 100 ? "pass'>" : "fail'>") + q.pct + "%</span></td></tr>";
    });
    h += "</table></div>";
  }

  h += "<div class='panel'><h2>" + t("prog.backup") + "</h2><p class='sub'>" + t("prog.backupSub") + "</p>" +
    "<div class='actions'><button class='btn' id='pExport'>" + t("prog.export") + "</button>" +
    "<button class='btn' id='pImport'>" + t("prog.import") + "</button>" +
    "<button class='btn bad ghost' id='pReset'>" + t("prog.reset") + "</button></div>" +
    "<input type='file' id='pFile' accept='.json' style='display:none'></div>";

  $("#progBody").innerHTML = h;

  $("#pExport").onclick = function () {
    var json = JSON.stringify(S, null, 2);
    var name = "zh-en-sp-" + today() + ".json";

    // Publicada en claude.ai el visor media las descargas; en local (file:// o
    // cualquier hosting estático) no existe window.claude y se usa un enlace normal.
    function fallback() {
      var a = document.createElement("a");
      a.href = URL.createObjectURL(new Blob([json], { type: "application/json" }));
      a.download = name;
      a.click();
    }
    if (!(window.claude && typeof window.claude.use === "function")) return fallback();

    window.claude.use("downloads").then(function (dl) {
      if (!dl) return fallback();
      return dl.save({ filename: name, data: json })["catch"](function (err) {
        if (!err || err.code !== "declined") alert(t("prog.exportFail"));
      });
    })["catch"](fallback);
  };
  $("#pImport").onclick = function () { $("#pFile").click(); };
  $("#pFile").onchange = function (e) {
    var f = e.target.files[0]; if (!f) return;
    var r = new FileReader();
    r.onload = function () {
      try {
        var d = JSON.parse(r.result);
        if (!d || typeof d !== "object" || !("cards" in d)) throw 0;
        S = d; var fr = fresh(); for (var k in fr) if (!(k in S)) S[k] = fr[k];
        if (!I.ui[S.base]) S.base = "es";
        save(); boot(); alert(t("prog.imported"));
      } catch (err) { alert(t("prog.badFile")); }
    };
    r.readAsText(f);
  };
  $("#pReset").onclick = function () {
    if (confirm(t("prog.confirmReset"))) { var b = S.base; S = fresh(); S.base = b; save(); boot(); }
  };
}

/* ---------- router ---------- */
var view = "learn";
function render() {
  if (view === "learn") renderLearn();
  else if (view === "review") renderReview();
  else if (view === "quiz") renderQuiz();
  else if (view === "res") renderRes();
  else renderProg();
  paintHeader();
}
function renderAll() {               // redibuja las 5 vistas, no solo la activa
  renderLearn(); renderReview(); renderQuiz(); renderRes(); renderProg(); paintHeader();
}
function boot() { applyChrome(); paintLevels(); renderAll(); }

document.addEventListener("DOMContentLoaded", function () {
  load();

  all(".tab").forEach(function (tb) {
    tb.onclick = function () {
      all(".tab").forEach(function (x) { x.classList.remove("active"); });
      all(".view").forEach(function (x) { x.classList.remove("active"); });
      tb.classList.add("active");
      view = tb.dataset.view;
      $("#view-" + view).classList.add("active");
      if (view === "review") { revQueue = null; revRevealed = false; }
      if (view === "quiz") quiz = null;
      render();
    };
  });

  /* cambiar el idioma base recarga TODA la interfaz, no solo las tarjetas */
  $("#baseLang").onchange = function () {
    S.base = this.value;
    revealed = false; revQueue = null; revRevealed = false; quiz = null;
    save(); boot();                 // boot() -> applyChrome + renderAll: toda la app cambia de idioma
  };
  $("#optPinyin").onchange = renderLearn;

  document.addEventListener("keydown", function (e) {
    if (view !== "learn") return;
    if (e.code === "Space") { e.preventDefault(); if (!revealed) { revealed = true; renderLearn(); } }
    if (revealed && ["1", "2", "3"].indexOf(e.key) >= 0) {
      grade(deck()[deckPos].id, +e.key - 1);
      deckPos++; revealed = false; renderLearn(); paintLevels();
    }
  });

  boot();
  save();
});

})();

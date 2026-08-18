/* ============================================================
   i18n · toda la interfaz en español / inglés / 中文
   Uso:  t("quiz.start")            → cadena
         t("learn.pos",{i:1,n:20})  → con variables {llave}
   ============================================================ */
window.I18N = {

  /* ---------- nombres de idioma ---------- */
  lang: {
    es: { zh:"chino",   en:"inglés",  es:"español"  },
    en: { zh:"Chinese", en:"English", es:"Spanish"  },
    zh: { zh:"中文",     en:"英语",     es:"西班牙语"  }
  },

  /* ---------- etiquetas temáticas de las tarjetas ---------- */
  tags: {
    en: { acciones:"actions", adjetivos:"adjectives", cadena:"supply chain", comercial:"commercial",
      comercio:"trade", comida:"food", "comunicación":"communication", conectores:"connectors",
      corporativo:"corporate", "cortesía":"courtesy", dinero:"money", documentos:"documents",
      finanzas:"finance", "gestión":"management", "gramática":"grammar", identidad:"identity",
      legal:"legal", modales:"modals", movimiento:"movement", "negociación":"negotiation",
      "números":"numbers", "opinión":"opinion", "organización":"organization", preguntas:"questions",
      pronombres:"pronouns", reuniones:"meetings", saludos:"greetings", social:"social",
      tiempo:"time", trabajo:"work", vida:"daily life" },
    zh: { acciones:"动作", adjetivos:"形容词", cadena:"供应链", comercial:"商务",
      comercio:"贸易", comida:"饮食", "comunicación":"沟通", conectores:"连词",
      corporativo:"公司治理", "cortesía":"礼貌用语", dinero:"金钱", documentos:"文书",
      finanzas:"财务", "gestión":"管理", "gramática":"语法", identidad:"身份",
      legal:"法务", modales:"能愿动词", movimiento:"移动", "negociación":"谈判",
      "números":"数字", "opinión":"观点", "organización":"组织", preguntas:"疑问",
      pronombres:"代词", reuniones:"会议", saludos:"问候", social:"社交",
      tiempo:"时间", trabajo:"工作", vida:"日常" }
  },

  /* ---------- tipos de recurso ---------- */
  restype: {
    en: { app:"app", video:"video", lectura:"reading", tema:"topic" },
    zh: { app:"应用", video:"视频", lectura:"阅读", tema:"专题" }
  },

  /* ---------- interfaz ---------- */
  ui: {
    es: {
      "app.tagline":"Chino → Inglés → Español · con mnemotecnia",
      "ui.baseLang":"Idioma base", "ui.xp":"XP", "ui.streak":"racha",
      "ui.level":"Nivel", "ui.mnemo":"🧠 Mnemotecnia",
      "ui.lockedHint":"Aprueba el quiz del nivel anterior con 80% para desbloquearlo",
      "tab.learn":"📚 Aprender", "tab.review":"🔁 Repasar", "tab.quiz":"🎯 Quiz",
      "tab.res":"📖 Recursos", "tab.prog":"📊 Progreso",

      "learn.pos":"Tarjeta {i} de {n} · caja {b}/{m}",
      "learn.pinyin":"pinyin", "learn.autoAudio":"audio auto",
      "learn.front":"¿Qué significa?", "learn.show":"Mostrar respuesta", "learn.skip":"Saltar →",
      "learn.g0":"😖 No la sé", "learn.g1":"🤔 Casi", "learn.g2":"😎 La sé",

      "rev.pending":"Pendientes hoy: <b>{n}</b> · nivel {l}",
      "rev.show":"Mostrar respuesta", "rev.listen":"🔊 Escuchar",
      "rev.doneTitle":"Nada pendiente por hoy.",
      "rev.doneBody":"Has visto {n} tarjetas. El sistema te las regresa justo antes de que las olvides (1, 2, 4, 8, 16 y 35 días).",
      "rev.newTitle":"Aún no hay repasos.",
      "rev.newBody":"Estudia tarjetas en <b>Aprender</b> y aparecerán aquí en su momento.",

      "quiz.title":"Quiz · {code} {name}",
      "quiz.intro":"{n} preguntas mezcladas de traducción y pinyin. Necesitas <b>{p}%</b> para desbloquear el siguiente nivel.",
      "quiz.last":"Último intento: <b>{p}%</b> ({d})",
      "quiz.start":"Empezar quiz", "quiz.qnum":"Pregunta {i}/{n}",
      "quiz.translate":"Traduce", "quiz.pinyinQ":"¿Cuál es el pinyin correcto?",
      "quiz.correct":"✅ <b>Correcto.</b>", "quiz.wrong":"❌ <b>Era:</b> ",
      "quiz.next":"Siguiente →", "quiz.results":"{r} de {n} correctas",
      "quiz.pass":"✅ Aprobado", "quiz.fail":"Aún no — repasa y vuelve",
      "quiz.unlocked":"🔓 Nivel <b>{code} {name}</b> disponible.",
      "quiz.toReview":"Para repasar", "quiz.again":"Repetir quiz", "quiz.close":"Volver",

      "res.title":"Recursos · {code} {name}",
      "res.sub":"Material externo alineado a este nivel. Regla práctica: <b>una</b> fuente de escucha y <b>una</b> de lectura por semana, no cinco.",
      "res.open":"Abrir ↗", "res.howTitle":"Cómo estudiar este nivel",
      "res.howSub":"Ciclo de 25 minutos que sí funciona:",
      "res.step1":"<b>5 min</b> — Repasar (lo que el sistema te marque como pendiente).",
      "res.step2":"<b>10 min</b> — Aprender 5 tarjetas nuevas leyendo la mnemotecnia <b>en voz alta</b>.",
      "res.step3":"<b>5 min</b> — Un recurso externo de arriba (escucha o lectura).",
      "res.step4":"<b>5 min</b> — Quiz. Si sacas 80% dos veces seguidas, sube de nivel.",

      "prog.title":"Tu progreso",
      "prog.seen":"tarjetas vistas", "prog.mastered":"dominadas", "prog.total":"total del curso",
      "prog.due":"pendientes hoy", "prog.xp":"XP", "prog.streak":"días de racha",
      "prog.byLevel":"Dominio por nivel", "prog.history":"Historial de quizzes",
      "prog.thDate":"Fecha", "prog.thLevel":"Nivel", "prog.thResult":"Resultado",
      "prog.backup":"Respaldo",
      "prog.backupSub":"El progreso vive en este navegador. Exporta un archivo si cambias de equipo.",
      "prog.export":"⬇︎ Exportar progreso", "prog.import":"⬆︎ Importar", "prog.reset":"Borrar todo",
      "prog.exportFail":"No se pudo guardar el archivo.", "prog.imported":"Progreso importado.", "prog.badFile":"Ese archivo no es un respaldo válido.",
      "prog.confirmReset":"Esto borra XP, racha, niveles desbloqueados y memoria de tarjetas. ¿Seguro?",

      "foot.note":"Tu progreso se guarda solo, en este navegador.",
      "foot.saved":"Guardado {t}", "foot.saveFail":"⚠︎ no se pudo guardar"
    },

    en: {
      "app.tagline":"Chinese → English → Spanish · with mnemonics",
      "ui.baseLang":"Base language", "ui.xp":"XP", "ui.streak":"streak",
      "ui.level":"Level", "ui.mnemo":"🧠 Mnemonic",
      "ui.lockedHint":"Score 80% on the previous level's quiz to unlock this one",
      "tab.learn":"📚 Learn", "tab.review":"🔁 Review", "tab.quiz":"🎯 Quiz",
      "tab.res":"📖 Resources", "tab.prog":"📊 Progress",

      "learn.pos":"Card {i} of {n} · box {b}/{m}",
      "learn.pinyin":"pinyin", "learn.autoAudio":"auto audio",
      "learn.front":"What does it mean?", "learn.show":"Show answer", "learn.skip":"Skip →",
      "learn.g0":"😖 No idea", "learn.g1":"🤔 Almost", "learn.g2":"😎 Got it",

      "rev.pending":"Due today: <b>{n}</b> · level {l}",
      "rev.show":"Show answer", "rev.listen":"🔊 Listen",
      "rev.doneTitle":"Nothing due today.",
      "rev.doneBody":"You've seen {n} cards. They come back right before you'd forget them (1, 2, 4, 8, 16 and 35 days).",
      "rev.newTitle":"No reviews yet.",
      "rev.newBody":"Study cards in <b>Learn</b> and they'll show up here when they're due.",

      "quiz.title":"Quiz · {code} {name}",
      "quiz.intro":"{n} mixed translation and pinyin questions. You need <b>{p}%</b> to unlock the next level.",
      "quiz.last":"Last attempt: <b>{p}%</b> ({d})",
      "quiz.start":"Start quiz", "quiz.qnum":"Question {i}/{n}",
      "quiz.translate":"Translate", "quiz.pinyinQ":"Which pinyin is correct?",
      "quiz.correct":"✅ <b>Correct.</b>", "quiz.wrong":"❌ <b>It was:</b> ",
      "quiz.next":"Next →", "quiz.results":"{r} of {n} correct",
      "quiz.pass":"✅ Passed", "quiz.fail":"Not yet — review and come back",
      "quiz.unlocked":"🔓 Level <b>{code} {name}</b> unlocked.",
      "quiz.toReview":"Worth reviewing", "quiz.again":"Retake quiz", "quiz.close":"Back",

      "res.title":"Resources · {code} {name}",
      "res.sub":"External material matched to this level. Rule of thumb: <b>one</b> listening source and <b>one</b> reading source per week, not five.",
      "res.open":"Open ↗", "res.howTitle":"How to study this level",
      "res.howSub":"A 25-minute cycle that actually works:",
      "res.step1":"<b>5 min</b> — Review whatever the system marks as due.",
      "res.step2":"<b>10 min</b> — Learn 5 new cards, reading the mnemonic <b>out loud</b>.",
      "res.step3":"<b>5 min</b> — One external resource above (listening or reading).",
      "res.step4":"<b>5 min</b> — Quiz. Two 80% scores in a row and you move up.",

      "prog.title":"Your progress",
      "prog.seen":"cards seen", "prog.mastered":"mastered", "prog.total":"course total",
      "prog.due":"due today", "prog.xp":"XP", "prog.streak":"day streak",
      "prog.byLevel":"Mastery by level", "prog.history":"Quiz history",
      "prog.thDate":"Date", "prog.thLevel":"Level", "prog.thResult":"Result",
      "prog.backup":"Backup",
      "prog.backupSub":"Progress lives in this browser. Export a file if you switch machines.",
      "prog.export":"⬇︎ Export progress", "prog.import":"⬆︎ Import", "prog.reset":"Erase everything",
      "prog.exportFail":"Could not save the file.", "prog.imported":"Progress imported.", "prog.badFile":"That file isn't a valid backup.",
      "prog.confirmReset":"This erases XP, streak, unlocked levels and card memory. Are you sure?",

      "foot.note":"Your progress saves itself, in this browser.",
      "foot.saved":"Saved {t}", "foot.saveFail":"⚠︎ could not save"
    },

    zh: {
      "app.tagline":"中文 → 英语 → 西班牙语 · 助记法学习",
      "ui.baseLang":"母语 / 基准语言", "ui.xp":"经验值", "ui.streak":"连续天数",
      "ui.level":"级别", "ui.mnemo":"🧠 助记法",
      "ui.lockedHint":"上一级测验达到 80% 才能解锁本级",
      "tab.learn":"📚 学习", "tab.review":"🔁 复习", "tab.quiz":"🎯 测验",
      "tab.res":"📖 资源", "tab.prog":"📊 进度",

      "learn.pos":"第 {i} / {n} 张 · 记忆盒 {b}/{m}",
      "learn.pinyin":"拼音", "learn.autoAudio":"自动发音",
      "learn.front":"这是什么意思？", "learn.show":"显示答案", "learn.skip":"跳过 →",
      "learn.g0":"😖 不会", "learn.g1":"🤔 差不多", "learn.g2":"😎 会了",

      "rev.pending":"今日待复习：<b>{n}</b> · 第 {l} 级",
      "rev.show":"显示答案", "rev.listen":"🔊 朗读",
      "rev.doneTitle":"今天没有待复习的内容。",
      "rev.doneBody":"你已学过 {n} 张卡片。系统会在你快要遗忘时再次推送（1、2、4、8、16、35 天）。",
      "rev.newTitle":"还没有复习内容。",
      "rev.newBody":"先到 <b>学习</b> 页学几张卡片，到期后会出现在这里。",

      "quiz.title":"测验 · {code} {name}",
      "quiz.intro":"{n} 道翻译与拼音混合题。达到 <b>{p}%</b> 即可解锁下一级。",
      "quiz.last":"上次成绩：<b>{p}%</b>（{d}）",
      "quiz.start":"开始测验", "quiz.qnum":"第 {i}/{n} 题",
      "quiz.translate":"翻译", "quiz.pinyinQ":"哪个拼音是正确的？",
      "quiz.correct":"✅ <b>正确。</b>", "quiz.wrong":"❌ <b>正确答案：</b>",
      "quiz.next":"下一题 →", "quiz.results":"{n} 题中答对 {r} 题",
      "quiz.pass":"✅ 通过", "quiz.fail":"还没通过——复习后再来",
      "quiz.unlocked":"🔓 已解锁 <b>{code} {name}</b>。",
      "quiz.toReview":"需要复习", "quiz.again":"再测一次", "quiz.close":"返回",

      "res.title":"学习资源 · {code} {name}",
      "res.sub":"与本级配套的外部材料。实用原则：每周<b>一个</b>听力来源、<b>一个</b>阅读来源，不要贪多。",
      "res.open":"打开 ↗", "res.howTitle":"本级怎么学",
      "res.howSub":"真正有效的 25 分钟循环：",
      "res.step1":"<b>5 分钟</b> — 复习系统标记为到期的卡片。",
      "res.step2":"<b>10 分钟</b> — 学 5 张新卡片，<b>朗读</b>助记法。",
      "res.step3":"<b>5 分钟</b> — 上面的一个外部资源（听或读）。",
      "res.step4":"<b>5 分钟</b> — 测验。连续两次达到 80% 就升级。",

      "prog.title":"你的进度",
      "prog.seen":"已学卡片", "prog.mastered":"已掌握", "prog.total":"课程总数",
      "prog.due":"今日待复习", "prog.xp":"经验值", "prog.streak":"连续天数",
      "prog.byLevel":"各级掌握度", "prog.history":"测验记录",
      "prog.thDate":"日期", "prog.thLevel":"级别", "prog.thResult":"成绩",
      "prog.backup":"备份",
      "prog.backupSub":"进度保存在本浏览器。换设备前请导出文件。",
      "prog.export":"⬇︎ 导出进度", "prog.import":"⬆︎ 导入", "prog.reset":"清除全部",
      "prog.exportFail":"文件保存失败。", "prog.imported":"进度已导入。", "prog.badFile":"该文件不是有效的备份。",
      "prog.confirmReset":"这将清除经验值、连续天数、已解锁级别和卡片记忆。确定吗？",

      "foot.note":"进度会自动保存在本浏览器中。",
      "foot.saved":"已保存 {t}", "foot.saveFail":"⚠︎ 保存失败"
    }
  }
};

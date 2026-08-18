/* ============================================================
   RECURSOS DE APOYO POR NIVEL
   type: lectura | video | app | tema
   why: { es, en, zh }  → se muestra en el idioma base elegido
   Los enlaces "search" abren una búsqueda (nunca se rompen).
   ============================================================ */
window.RESOURCES = {
  1: [
    { type:"app", title:"HelloChinese", lang:"ZH", url:"https://www.hellochinese.cc/",
      why:{
        es:"La mejor app para los primeros 300 caracteres: tonos, trazos y audio nativo. Empieza aquí si el chino es tu punto de partida.",
        en:"The best app for your first 300 characters: tones, stroke order and native audio. Start here if Chinese is your anchor.",
        zh:"学习前 300 个汉字最好的应用：声调、笔顺、母语发音。若以中文为起点，从这里开始。"} },
    { type:"video", title:"Yoyo Chinese — Pinyin Chart interactiva", lang:"ZH",
      url:"https://www.yoyochinese.com/chinese-learning-tools/Mandarin-Chinese-pronunciation-lesson/pinyin-chart-table",
      why:{
        es:"Los 4 tonos explicados por sílaba con audio. Dedícale 3 sesiones ANTES de memorizar vocabulario: si el tono entra mal, entra mal para siempre.",
        en:"All four tones, syllable by syllable, with audio. Spend three sessions here BEFORE memorising vocabulary: a tone learned wrong stays wrong.",
        zh:"逐音节讲解四声，配母语音频。背单词之前先花三节课：声调一旦学错，很难改回来。"} },
    { type:"lectura", title:"BBC Learning English — Lower-intermediate", lang:"EN",
      url:"https://www.bbc.co.uk/learningenglish",
      why:{
        es:"Textos cortos con audio y transcripción. Lee en voz alta el mismo texto 3 veces: es el ejercicio con mejor retorno del nivel.",
        en:"Short texts with audio and transcript. Read the same text aloud three times — the highest-return exercise at this level.",
        zh:"配音频和文字稿的短篇课文。同一篇朗读三遍：本级性价比最高的练习。"} },
    { type:"tema", title:"Los 4 tonos y por qué el español ayuda", lang:"ZH",
      url:"https://www.youtube.com/results?search_query=mandarin+tones+explained+for+spanish+speakers",
      why:{
        es:"El español ya usa tono para distinguir sentido (papá/papa, ¿comió?/comió). Reutiliza ese oído: el 2º tono chino es tu entonación de pregunta y el 4º es tu tono de orden.",
        en:"Spanish already uses pitch to change meaning (papá/papa). Reuse that ear: Mandarin's 2nd tone is your question intonation, the 4th is your command tone.",
        zh:"西班牙语本来就用重音区分词义（papá / papa）。借用这个听感：汉语二声像疑问语调，四声像命令语气。"} }
  ],
  2: [
    { type:"lectura", title:"Du Chinese — historias graduadas", lang:"ZH", url:"https://www.duchinese.net/",
      why:{
        es:"Lecturas con pinyin y traducción tocando la palabra. Nivel Newbie/Elementary te calza exacto aquí. 10 minutos diarios > 1 hora el domingo.",
        en:"Graded readings with tap-for-pinyin and translation. Newbie/Elementary fits this level exactly. Ten minutes daily beats one hour on Sunday.",
        zh:"分级读物，点词即显拼音和翻译。Newbie/Elementary 正好对应本级。每天十分钟胜过周日一小时。"} },
    { type:"video", title:"Peppa Pig / 小猪佩奇 en chino", lang:"ZH",
      url:"https://www.youtube.com/results?search_query=小猪佩奇+中文+全集",
      why:{
        es:"Suena a broma y no lo es: vocabulario de casa, comida y familia con contexto visual. Es el nivel exacto de N2.",
        en:"It sounds like a joke and isn't: home, food and family vocabulary with visual context. Exactly the N2 register.",
        zh:"看似玩笑，其实很有效：家庭、饮食、亲属词汇配画面语境，难度正好是 N2。"} },
    { type:"lectura", title:"VOA Learning English — Level 1", lang:"EN", url:"https://learningenglish.voanews.com/",
      why:{
        es:"Inglés con vocabulario controlado (1500 palabras) y audio a velocidad reducida. Ideal para pasar del ZH al EN sin ahogarte.",
        en:"Controlled vocabulary (1,500 words) with slowed audio. The gentlest bridge from Chinese into English.",
        zh:"限定词汇（1500 词）＋慢速音频。从中文过渡到英语最平缓的桥梁。"} },
    { type:"tema", title:"Los clasificadores (量词)", lang:"ZH",
      url:"https://www.youtube.com/results?search_query=chinese+measure+words+measure+word+ge",
      why:{
        es:"En chino no dices «tres clientes», dices «tres [clasificador] clientes» (三个客户). El español tiene el mismo fenómeno escondido: «tres CABEZAS de ganado», «dos HOJAS de papel». No es raro, ya lo haces.",
        en:"Chinese needs a measure word: 三个客户, not «three clients». English hides the same thing: «three HEAD of cattle», «two SHEETS of paper». You already do this.",
        zh:"量词并不特殊：英语的 three HEAD of cattle、西班牙语的 tres CABEZAS de ganado 是同一个现象，只是使用范围更窄。"} }
  ],
  3: [
    { type:"video", title:"Mandarin Corner — diálogos con subtítulos ZH/PY/EN", lang:"ZH",
      url:"https://www.youtube.com/results?search_query=Mandarin+Corner+conversation+subtitles",
      why:{
        es:"Conversaciones reales a velocidad natural, con los tres niveles de subtítulo. Aquí es donde tu oído da el salto a B1.",
        en:"Real conversations at natural speed with three subtitle layers. This is where your listening jumps to B1.",
        zh:"自然语速的真实对话，三层字幕。听力在这里跨入 B1。"} },
    { type:"lectura", title:"The Chairman's Bao — noticias graduadas HSK 3-4", lang:"ZH",
      url:"https://www.thechairmansbao.com/",
      why:{
        es:"Noticias reales reescritas por nivel HSK. Empieza a leer sobre economía y empresas: te prepara el terreno para N4-N5.",
        en:"Real news rewritten by HSK level. Start reading business and economics here — it prepares the ground for N4-N5.",
        zh:"按 HSK 等级改写的真实新闻。从经济和企业类文章入手，为 N4-N5 打底。"} },
    { type:"lectura", title:"BBC Learning English — 6 Minute English", lang:"EN",
      url:"https://www.bbc.co.uk/learningenglish/english/features/6-minute-english",
      why:{
        es:"Seis minutos, dos hablantes, transcripción completa. Método: escucha sin texto → escucha con texto → resume en español en 3 líneas.",
        en:"Six minutes, two speakers, full transcript. Method: listen without the text → listen with it → summarise in three lines.",
        zh:"六分钟、两位说话人、全文稿。方法：先裸听 → 再对照文稿 → 用三句话复述。"} },
    { type:"tema", title:"La partícula 了 (le)", lang:"ZH",
      url:"https://www.youtube.com/results?search_query=chinese+particle+le+explained",
      why:{
        es:"El terror de todo hispanohablante. Clave mental: 了 NO es «pasado», es «cambio de estado». Piénsalo como el «ya» del español: «ya comí», «ya se puso caro». Con esa equivalencia aciertas el 80% de los casos.",
        en:"The classic stumbling block. Key idea: 了 is not «past tense», it marks a CHANGE OF STATE — closest to Spanish «ya» or English «now/already». That mapping gets you 80% of cases right.",
        zh:"学习者最容易混淆的一点：了 不等于过去时，而是标记「状态改变」，最接近西班牙语的 ya、英语的 already。掌握这一点可解决八成用例。"} }
  ],
  4: [
    { type:"lectura", title:"Business English Pod — email y reuniones", lang:"EN",
      url:"https://www.businessenglishpod.com/",
      why:{
        es:"Lecciones con audio de reuniones, llamadas y correos reales. Es el estándar de facto para inglés de oficina.",
        en:"Audio lessons built on real meetings, calls and emails. The de facto standard for office English.",
        zh:"以真实会议、电话和邮件为素材的音频课程。职场英语的事实标准。"} },
    { type:"video", title:"商务汉语 — chino de oficina", lang:"ZH",
      url:"https://www.youtube.com/results?search_query=商务汉语+办公室+会话+business+chinese",
      why:{
        es:"Diálogos de oficina: presentarte, pedir una junta, dar seguimiento. Copia frases completas, no palabras sueltas.",
        en:"Office dialogues: introducing yourself, requesting a meeting, following up. Copy whole phrases, not single words.",
        zh:"办公室对话：自我介绍、约会议、跟进事项。整句整句地背，不要只背词。"} },
    { type:"tema", title:"El correo formal en 3 idiomas", lang:"ALL",
      url:"https://www.bbc.co.uk/learningenglish/english/features/english-at-work",
      why:{
        es:"Estructuras fijas que debes memorizar como bloques: 尊敬的… ≈ «Dear…» ≈ «Estimado…»; 请确认 ≈ «Please confirm» ≈ «Favor de confirmar»; 期待您的回复 ≈ «Looking forward to your reply» ≈ «Quedo atento a su respuesta».",
        en:"Fixed blocks worth memorising whole: 尊敬的… ≈ «Dear…» ≈ «Estimado…»; 请确认 ≈ «Please confirm»; 期待您的回复 ≈ «Looking forward to your reply» ≈ «Quedo atento a su respuesta».",
        zh:"整块记忆的固定表达：尊敬的… ≈ Dear… ≈ Estimado…；请确认 ≈ Please confirm ≈ Favor de confirmar；期待您的回复 ≈ Looking forward to your reply。"} },
    { type:"tema", title:"Registro formal vs informal", lang:"ALL",
      url:"https://www.youtube.com/results?search_query=chinese+formal+vs+informal+nin+vs+ni",
      why:{
        es:"El chino marca respeto con 您 y con verbos como 请/敬请. El español con usted/tú. El inglés casi no marca y lo compensa con rodeos («would you mind…»). Traducir literal entre los tres te hace sonar grosero o servil.",
        en:"Chinese marks respect with 您 and verbs like 请/敬请; Spanish with usted/tú; English barely marks it and compensates with hedging («would you mind…»). Translating literally across the three makes you sound rude or servile.",
        zh:"中文用「您」和「请/敬请」表敬意，西班牙语用 usted/tú，英语几乎不标记而靠迂回句式（would you mind…）。三者若直译，不是显得无礼，就是显得过分谦卑。"} }
  ],
  5: [
    { type:"lectura", title:"Caixin Global / 财新", lang:"ZH/EN", url:"https://www.caixinglobal.com/",
      why:{
        es:"Periodismo financiero chino con edición en inglés. Lee la MISMA nota en chino y en inglés: es el ejercicio de traducción profesional más eficiente que existe.",
        en:"Chinese financial journalism with an English edition. Read the SAME story in both languages — the most efficient professional translation drill there is.",
        zh:"中英双版的财经报道。同一篇文章对照阅读，是最高效的专业翻译训练。"} },
    { type:"lectura", title:"El Economista / Expansión", lang:"ES", url:"https://www.eleconomista.com.mx/",
      why:{
        es:"Para fijar el vocabulario financiero en español de México (utilidad, flujo de efectivo, cotización) y no calcar del inglés.",
        en:"To lock in Mexican-Spanish finance vocabulary (utilidad, flujo de efectivo, cotización) instead of calquing from English.",
        zh:"用来固定墨西哥西班牙语的财经词汇（utilidad、flujo de efectivo、cotización），避免从英语硬译。"} },
    { type:"video", title:"商务谈判 — simulacros de negociación", lang:"ZH",
      url:"https://www.youtube.com/results?search_query=business+chinese+negotiation+商务谈判+对话",
      why:{
        es:"Simulacros de negociación: cotizar, pedir descuento, cerrar. Practica en voz alta las réplicas del comprador Y del vendedor.",
        en:"Negotiation role-plays: quoting, asking for a discount, closing. Practise both the buyer's AND the seller's lines out loud.",
        zh:"谈判情景演练：报价、要折扣、成交。买方和卖方的台词都要朗读练习。"} },
    { type:"tema", title:"关系 (guānxi) y cómo se negocia distinto", lang:"ALL",
      url:"https://www.youtube.com/results?search_query=guanxi+chinese+business+culture+negotiation",
      why:{
        es:"En China la relación precede al contrato; en México también más de lo que se admite; en EE.UU. el contrato precede a la relación. Entender esto vale más que 100 palabras nuevas.",
        en:"In China the relationship precedes the contract; in Mexico more than people admit; in the US the contract precedes the relationship. Understanding this is worth more than 100 new words.",
        zh:"在中国，关系先于合同；在墨西哥也比人们承认的更甚；在美国则是合同先于关系。理解这一点胜过一百个生词。"} },
    { type:"tema", title:"Porcentajes y el 折扣", lang:"ZH",
      url:"https://www.youtube.com/results?search_query=chinese+numbers+percentages+discount+zhe",
      why:{
        es:"打八折 = pagas el 80%, NO 8% de descuento. Y 百分之二十 = 20%. Practica leer cifras en voz alta hasta que salgan automáticas: en una negociación no hay tiempo de calcular.",
        en:"打八折 means you PAY 80% — not 8% off. And 百分之二十 = 20%. Drill numbers aloud until they're automatic: in a negotiation there's no time to compute.",
        zh:"打八折是「付原价的 80%」，不是「减 8%」；百分之二十 = 20%。数字要练到脱口而出——谈判现场没有时间换算。"} }
  ],
  6: [
    { type:"lectura", title:"Harvard Business Review", lang:"ES/EN", url:"https://hbr.org/",
      why:{
        es:"Lee el artículo en inglés y luego el mismo en español: te da el par exacto de terminología directiva sin inventarte traducciones.",
        en:"Read an article in English, then the same one in Spanish: it hands you the exact executive-terminology pairs instead of you inventing translations.",
        zh:"先读英文原文，再读西班牙语版：直接得到管理术语的对应词，不必自己臆造译法。"} },
    { type:"lectura", title:"第一财经 / 财新 — informes corporativos", lang:"ZH", url:"https://www.yicai.com/",
      why:{
        es:"Nivel real: comunicados de resultados, fusiones, salidas a bolsa. Empieza por los titulares y el primer párrafo, no intentes la nota completa.",
        en:"The real thing: earnings releases, mergers, IPOs. Start with headlines and first paragraphs — don't attempt whole articles yet.",
        zh:"真实材料：业绩公告、并购、上市。先读标题和首段，不要一上来就啃全文。"} },
    { type:"lectura", title:"Informes anuales bilingües (HKEX)", lang:"ZH/EN", url:"https://www.hkexnews.hk/",
      why:{
        es:"Las empresas listadas en Hong Kong publican el MISMO informe en chino e inglés, párrafo por párrafo. Es un corpus paralelo gratuito de nivel profesional — insuperable para 资产负债表, 损益表 y 合规.",
        en:"Hong Kong listed companies publish the SAME report in Chinese and English, paragraph by paragraph. A free professional-grade parallel corpus — unbeatable for 资产负债表, 损益表 and 合规.",
        zh:"港股上市公司逐段发布中英双语年报，是免费的专业级平行语料——练资产负债表、损益表、合规术语无出其右。"} },
    { type:"video", title:"CGTN / Bloomberg — entrevistas de negocios", lang:"ZH/EN",
      url:"https://www.youtube.com/results?search_query=CGTN+business+interview+CEO+中文",
      why:{
        es:"Escucha a ejecutivos reales. Objetivo del nivel: entender una entrevista de 5 minutos sin subtítulos y poder resumirla en los otros dos idiomas.",
        en:"Listen to real executives. Level goal: follow a five-minute interview without subtitles and summarise it in the other two languages.",
        zh:"听真实高管讲话。本级目标：无字幕听懂五分钟访谈，并用另外两种语言复述。"} },
    { type:"tema", title:"Traducción de cláusulas contractuales", lang:"ALL", url:"https://www.hkexnews.hk/",
      why:{
        es:"Toma un contrato tipo (NDA) y tradúcelo ZH→ES→EN→ZH. Cuando el texto vuelve al punto de partida y sigue significando lo mismo, dominas el nivel. Ojo con 违约金 (pena convencional ≠ «penalty» en todo contexto).",
        en:"Take a standard NDA and translate it ZH→ES→EN→ZH. When the text comes back around still meaning the same thing, you've mastered the level. Watch 违约金 — «pena convencional» is not «penalty» in every context.",
        zh:"拿一份标准保密协议做 中→西→英→中 的循环翻译。绕一圈回来意思不变，本级即算过关。注意 违约金 在不同法域并不总等于 penalty。"} },
    { type:"tema", title:"Presentar ante un consejo", lang:"ALL",
      url:"https://www.youtube.com/results?search_query=executive+presentation+board+SCQA+structure",
      why:{
        es:"Estructura universal: situación → complicación → pregunta → respuesta (SCQA). Practica el mismo pitch de 3 minutos en los tres idiomas. Lo que no puedes decir en 3 minutos, no lo entiendes.",
        en:"Universal structure: situation → complication → question → answer (SCQA). Practise the same three-minute pitch in all three languages. What you can't say in three minutes, you don't understand.",
        zh:"通用结构：情境 → 冲突 → 问题 → 答案（SCQA）。同一段三分钟陈述用三种语言各讲一遍。三分钟讲不清，说明还没想清。"} }
  ]
};

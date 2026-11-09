import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Compléments pour la filière Lettres : poésie et théâtre français, littérature
 * anglaise et éducation islamique.
 */
export const lettresComplementsLessons: LessonSeed[] = [
  {
    slug: "francais-poesie-lyrisme",
    subjectSlug: "francais",
    title: "La poésie et le lyrisme",
    chapter: "Littérature · Poésie",
    summary:
      "Reconnaître le lyrisme, analyser les procédés poétiques et commenter un poème en respectant l'oralité du texte.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 26,
    orderIndex: 7,
    objectives: [
      "Définir le lyrisme et ses marques",
      "Analyser versification et sonorités",
      "Identifier la figure du poète et sa fonction",
      "Commenter un poème de manière structurée",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Le lyrisme : dire l'intime en musique",
        text: "Le lyrisme désigne l'expression du sentiment personnel dans une forme travaillée. Ses marques : le « je », le champ lexical de l'émotion, les apostrophes, l'audace des images, la fusion avec la nature. Mais le lyrisme n'est pas seulement personnel : il cherche l'écho, l'émotion partagée par le lecteur.",
      },
      {
        type: "table",
        title: "Métrique et sonorités",
        head: ["Élément", "Définition", "Effet"],
        rows: [
          ["Alexandrin", "vers de 12 syllabes", "ampleur, solennité"],
          ["Octosyllabe", "8 syllabes", "légèreté, rapidité"],
          ["Rime plate / croisée / embrassée", "aabb / abab / abba", "structure et musicalité"],
          ["Allitération", "répétition de consonnes", "effet sonore, suggère un mouvement"],
          ["Assonance", "répétition de voyelles", "fluidité, douceur"],
          ["Enjambement", "phrase qui dépasse le vers", "accélération, débordement"],
        ],
      },
      {
        type: "steps",
        title: "Commenter un poème",
        items: [
          "Lire à voix haute pour entendre le rythme.",
          "Dégager le thème et le sentiment dominant.",
          "Étudier la forme : vers, strophes, rimes, mètres.",
          "Analyser les images et les sonorités en lien avec le sens.",
          "Conclure sur la fonction du poème et son effet sur le lecteur.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux erreurs classiques",
        text: "Compter les syllabes sans tenir compte des e muets et des diérèses, et analyser les figures sans les relier au sentiment exprimé. La versification n'est jamais une fin : elle sert le sens.",
      },
    ],
    keyPoints: [
      "Le lyrisme exprime l'intime dans une forme travaillée.",
      "La versification sert le sens, elle ne s'analyse pas seule.",
      "Les sonorités créent des impressions.",
      "La lecture à voix haute révèle le rythme.",
    ],
    pitfalls: [
      "Oublier les e muets dans le décompte.",
      "Séparer forme et sens.",
      "Résumer le poème au lieu de l'analyser.",
    ],
    flashcards: [
      {
        question: "Quelles sont les marques du lyrisme ?",
        answer: "Le « je », le champ lexical de l'émotion, les apostrophes, les images et la musicalité.",
      },
      {
        question: "Que produit une allitération ?",
        answer: "Un effet sonore qui suggère la sensation ou le mouvement évoqué.",
      },
      {
        question: "Pourquoi lire le poème à voix haute ?",
        answer: "Pour percevoir le rythme, les pauses et les sonorités, qui participent du sens.",
      },
    ],
    tags: ["français", "poésie", "lyrisme", "versification", "commentaire"],
  },
  {
    slug: "francais-theatre-representation",
    subjectSlug: "francais",
    title: "Le théâtre : texte et représentation",
    chapter: "Littérature · Théâtre",
    summary:
      "Analyser un texte théâtral comme un texte destiné à la scène : dialogue, didascalies, conflit et mise en scène.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 27,
    orderIndex: 8,
    objectives: [
      "Distinguer texte et représentation",
      "Analyser le dialogue et les didascalies",
      "Identifier le conflit dramatique",
      "Comprendre le rôle de la mise en scène",
    ],
    blocks: [
      {
        type: "table",
        title: "Les composantes du texte théâtral",
        head: ["Élément", "Fonction", "Exemple"],
        rows: [
          ["Dialogue", "faire avancer le conflit", "répliques des personnages"],
          ["Monologue", "révéler l'intériorité", "tirade, délibération"],
          ["Aparté", "complicité avec le public", "phrase dite à part"],
          ["Didascalies", "indications scéniques", "ton, geste, décor"],
          ["Double énonciation", "parler aux personnages et au public", "adresse indirecte"],
        ],
      },
      {
        type: "paragraph",
        title: "Le théâtre se joue autant qu'il s'écrit",
        text: "Un texte théâtral est incomplet sans la scène : le jeu des acteurs, la lumière, les silences et l'espace donnent au dialogue sa substance. La mise en scène n'est pas une décoration : elle interprète le texte, parfois contre lui. C'est pourquoi la même pièce peut avoir des sens très différents selon les choix du metteur en scène.",
      },
      {
        type: "steps",
        title: "Analyser un extrait",
        items: [
          "Repérer les personnages présents et les rapports de force.",
          "Identifier la nature du conflit (amour, pouvoir, vérité).",
          "Étudier le rythme des répliques (courtes, longues, interruptions).",
          "Relever les didascalies et leur apport.",
          "Proposer des choix de mise en scène justifiés.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "L'argument de la mise en scène",
        text: "Proposer une mise en scène n'est pas dire « je ferais un décor moderne » : c'est expliquer quel effet on veut produire et pourquoi le texte le permet. Un choix scénique doit toujours être relié à une intention de lecture.",
      },
    ],
    keyPoints: [
      "Le texte théâtral est destiné à la représentation.",
      "La double énonciation est propre au théâtre.",
      "Les didascalies orientent le jeu.",
      "La mise en scène interprète le texte.",
    ],
    pitfalls: [
      "Analyser le théâtre comme un roman.",
      "Oublier les didascalies.",
      "Proposer une mise en scène sans justification.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce que la double énonciation ?",
        answer: "Le fait qu'une réplique s'adresse à la fois aux personnages sur scène et au public.",
      },
      {
        question: "Que sont les didascalies ?",
        answer: "Les indications scéniques données par l'auteur : décors, gestes, tons, déplacements.",
      },
      {
        question: "Pourquoi la mise en scène est-elle une interprétation ?",
        answer: "Parce qu'elle choisit de mettre en avant certains sens du texte et d'en atténuer d'autres.",
      },
    ],
    tags: ["français", "théâtre", "représentation", "didascalies", "conflit"],
  },
  {
    slug: "francais-narrateur-point-de-vue",
    subjectSlug: "francais",
    title: "Narrateur, point de vue et construction du personnage",
    chapter: "Littérature · Narration",
    summary:
      "Maîtriser les notions de narrateur, focalisation et caractérisation du personnage pour analyser un récit.",
    level: "Bac · 4e Lettres (T1)",
    durationMin: 26,
    orderIndex: 9,
    objectives: [
      "Identifier le statut du narrateur",
      "Distinguer les focalisations",
      "Analyser la caractérisation du personnage",
      "Interpréter les choix narratifs",
    ],
    blocks: [
      {
        type: "table",
        title: "Focalisations",
        head: ["Focalisation", "Le lecteur sait", "Effet"],
        rows: [
          ["Interne", "ce que sait un personnage", "empathie, subjectivité"],
          ["Externe", "seulement ce qui est observable", "mystère, objectivité apparente"],
          ["Zéro", "tout, y compris les pensées de tous", "distance, ironie"],
        ],
      },
      {
        type: "steps",
        title: "Analyser un passage narratif",
        items: [
          "Repérer la personne grammaticale et le statut du narrateur (personnage ou non).",
          "Déterminer la focalisation et vérifier par des indices textuels.",
          "Observer la caractérisation : directe (portrait) ou indirecte (actes, paroles).",
          "Analyser le rythme : scène, sommaire, ellipse, pause descriptive.",
          "Interpréter : quel effet sur le lecteur ? quelle vision du monde ?",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne pas confondre",
        text: "L'auteur (personne réelle) n'est jamais le narrateur (instance du texte), même dans un récit autobiographique où les deux se ressemblent. Cette distinction est un attendu explicite.",
      },
    ],
    keyPoints: [
      "Auteur, narrateur et personnage sont trois instances.",
      "La focalisation détermine l'information du lecteur.",
      "La caractérisation peut être directe ou indirecte.",
      "Le rythme du récit produit des effets de sens.",
    ],
    pitfalls: [
      "Confondre auteur et narrateur.",
      "Annoncer une focalisation sans indice.",
      "Négliger le rythme du récit.",
    ],
    flashcards: [
      {
        question: "Quelles sont les trois focalisations ?",
        answer: "Interne, externe et zéro (omnisciente).",
      },
      {
        question: "Comment caractériser un personnage indirectement ?",
        answer: "Par ses actes, ses paroles, son environnement et le regard des autres.",
      },
      {
        question: "Que produit une focalisation externe ?",
        answer: "Un effet de mystère ou d'objectivité, car le lecteur n'accède pas aux pensées.",
      },
    ],
    tags: ["français", "narration", "focalisation", "personnage", "analyse"],
  },
  {
    slug: "english-literary-texts",
    subjectSlug: "anglais",
    title: "Literary texts: reading and commenting",
    chapter: "Literature · Analysis",
    summary:
      "Lire un extrait littéraire anglais, identifier le narrateur, le ton et les procédés, et rédiger un commentaire court.",
    level: "Bac · 4e Lettres (T3)",
    durationMin: 26,
    orderIndex: 6,
    objectives: [
      "Identify narrative voice and point of view",
      "Analyse tone, imagery and style",
      "Structure a short literary comment",
      "Use appropriate literary vocabulary",
    ],
    blocks: [
      {
        type: "table",
        title: "Key literary terms",
        head: ["Term", "Meaning", "Example"],
        rows: [
          ["First-person narrator", "narrator who is a character", "I walked into the room…"],
          ["Omniscient narrator", "knows everything", "He felt the weight of…"],
          ["Imagery", "descriptive language appealing to senses", "a bruised sky"],
          ["Metaphor", "comparison without like/as", "the city was a wound"],
          ["Irony", "saying the opposite of what is meant", "What a brilliant idea!"],
          ["Tone", "the writer's attitude", "nostalgic, bitter, hopeful"],
        ],
      },
      {
        type: "steps",
        title: "How to write the comment",
        items: [
          "Locate the passage: who speaks, where, when, what happens.",
          "Identify the narrative voice and its effect on the reader.",
          "Pick two or three stylistic features and quote them.",
          "Explain what each feature produces (tone, tension, sympathy).",
          "Conclude with the text's main idea and its purpose.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Useful comment phrases",
        text: "« The writer creates a sense of… », « The repetition of… emphasises… », « This image suggests… », « The tone shifts from… to… ». Use them systematically, always followed by a quotation.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Quotation rule",
        text: "A quotation must be short and explained. Long quotations without commentary score nothing: the examiner evaluates your analysis, not your transcription.",
      },
    ],
    keyPoints: [
      "Identify the narrative voice first.",
      "Each stylistic feature must be explained by its effect.",
      "Quote briefly and comment at length.",
      "The conclusion states the main idea and purpose.",
    ],
    pitfalls: [
      "Retelling the plot.",
      "Listing devices without effect.",
      "Quoting without explanation.",
    ],
    flashcards: [
      {
        question: "What is the effect of a first-person narrator?",
        answer: "It creates intimacy and limits the information to what the character knows.",
      },
      {
        question: "How do you comment on an image?",
        answer: "Identify it, quote it, and explain the impression it creates.",
      },
      {
        question: "What is tone?",
        answer: "The writer's attitude towards the subject, conveyed through word choice and rhythm.",
      },
    ],
    tags: ["anglais", "literature", "comment", "narrator", "imagery"],
  },
  {
    slug: "english-grammar-lettres",
    subjectSlug: "anglais",
    title: "Grammar and language in context",
    chapter: "Language · Grammar",
    summary:
      "Réviser les points de grammaire évalués dans l'épreuve de Lettres : temps, voix passive, discours rapporté et structures de concession.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 25,
    orderIndex: 7,
    objectives: [
      "Choose the correct tense in context",
      "Use the passive voice accurately",
      "Report speech correctly",
      "Express concession and contrast",
    ],
    blocks: [
      {
        type: "table",
        title: "Concession and contrast",
        head: ["Structure", "Use", "Example"],
        rows: [
          ["although + clause", "contrast", "Although it rained, we went out."],
          ["in spite of + noun/-ing", "contrast", "In spite of the rain, we went out."],
          ["however", "contrast between sentences", "It rained. However, we went out."],
          ["whereas", "comparison of two facts", "He likes tea, whereas she prefers coffee."],
          ["despite the fact that", "formal contrast", "Despite the fact that it rained…"],
        ],
      },
      {
        type: "table",
        title: "Passive and reported speech",
        head: ["Point", "Rule", "Example"],
        rows: [
          ["Passive", "be + past participle", "The letter was written by Ali."],
          ["Passive with modal", "modal + be + past participle", "It must be done today."],
          ["Reported statement", "tense shift back", "He said he was tired."],
          ["Reported question", "no auxiliary inversion", "She asked where I lived."],
          ["Reported order", "tell + object + to + verb", "He told me to wait."],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "The classic errors",
        text: "« Although…, but… » (never both), « despite of » (incorrect), and forgetting the tense shift in reported speech. These three mistakes appear in most bac papers.",
      },
    ],
    keyPoints: [
      "although + clause, in spite of + noun.",
      "Passive = be + past participle.",
      "Reported questions keep statement word order.",
      "Never use although and but together.",
    ],
    pitfalls: [
      "Using 'despite of'.",
      "Combining although and but.",
      "Keeping the present tense in reported speech.",
    ],
    flashcards: [
      {
        question: "Which structure follows 'in spite of'?",
        answer: "A noun or a gerund: in spite of the rain / in spite of being tired.",
      },
      {
        question: "How do you report a question?",
        answer: "With a reporting verb, no inversion and a tense shift: She asked where I lived.",
      },
      {
        question: "Give the passive form of 'They will publish the book'.",
        answer: "The book will be published.",
      },
    ],
    tags: ["anglais", "grammar", "passive", "reported speech", "concession"],
  },
  {
    slug: "islam-maqasid",
    subjectSlug: "education-islamique",
    title: "مقاصد الشريعة وضروراتها الخمس",
    chapter: "الفقه · المقاصد",
    summary:
      "التعرف على مقاصد الشريعة والضرورات الخمس، وفهم كيف تُستثمر في معالجة قضايا الحياة المعاصرة.",
    level: "Bac · 4e Lettres (T1)",
    durationMin: 26,
    orderIndex: 10,
    objectives: [
      "تعريف مقاصد الشريعة",
      "بيان الضرورات الخمس وترتيبها",
      "التمييز بين الضروري والحاجي والتحسيني",
      "تطبيق المقاصد على قضية معاصرة",
    ],
    blocks: [
      {
        type: "table",
        title: "الضرورات الخمس",
        head: ["الضرورة", "المعنى", "مثال تطبيقي"],
        rows: [
          ["الدين", "حفظ العقيدة والعبادة", "حرية المعتقد والعبادة"],
          ["النفس", "حفظ الحياة والسلامة", "تحريم القتل، السلامة المرورية"],
          ["العقل", "حفظ القدرة على التفكير", "تحريم المسكرات، تشجيع العلم"],
          ["النسل", "حفظ الأسرة والنسب", "الزواج، تحريم الزنا"],
          ["المال", "حفظ الملكية والكسب المشروع", "تحريم الربا والسرقة"],
        ],
      },
      {
        type: "paragraph",
        title: "المقاصد روح التشريع",
        text: "مقاصد الشريعة هي الغايات التي قصدها الشارع من التشريع: جلب المصالح ودرء المفاسد. وهي ليست قراءة تساهلية ولا تشددية، بل منهج لفهم النصوص في سياقها وتحقيق مقاصدها. ولذلك رُتّبت الضرورات: الدين والنفس والعقل والنسل والمال، بحسب ما يترتب على اختلالها من فساد.",
      },
      {
        type: "steps",
        title: "تطبيق المقاصد على قضية",
        items: [
          "حدد القضية بدقة (مثل: التلقيح، الذكاء الاصطناعي، البيئة).",
          "عين الضرورة أو الضرورات المتعلقة بها.",
          "وازن بين المصالح والمفاسد.",
          "استند إلى قاعدة «درء المفاسد مقدم على جلب المصالح» عند التعارض.",
          "اعرض الرأي مع احترام الاختلاف الفقهي.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "توازن الخطاب",
        text: "استعمال المقاصد لتبرير كل شيء أو لتحريم كل جديد كلاهما انحراف. المقاصد منهج اجتهاد، لا شعار. المطلوب في الإجابة عرض الحجة والدليل لا إصدار حكم جزافي.",
      },
    ],
    keyPoints: [
      "المقاصد: جلب المصالح ودرء المفاسد.",
      "الضرورات الخمس: الدين، النفس، العقل، النسل، المال.",
      "الترتيب يحدد الأولوية عند التعارض.",
      "الاجتهاد المقاصدي يوازن بين المصالح والمفاسد.",
    ],
    pitfalls: [
      "الخلط بين الضروري والحاجي.",
      "إصدار أحكام دون دليل.",
      "إهمال الاختلاف الفقهي المشروع.",
    ],
    flashcards: [
      {
        question: "ما هي الضرورات الخمس؟",
        answer: "حفظ الدين، والنفس، والعقل، والنسل، والمال.",
      },
      {
        question: "ما قاعدة التعارض بين المصلحة والمفسدة؟",
        answer: "درء المفاسد مقدم على جلب المصالح عند التعارض.",
      },
      {
        question: "لماذا رُتّبت الضرورات؟",
        answer: "لأن اختلالها لا يتساوى في الفساد، فيُقدَّم الأهم عند التعارض.",
      },
    ],
    tags: ["إسلامية", "مقاصد", "ضرورات", "اجتهاد", "فقه"],
  },
  {
    slug: "islam-hiwar-hadarat",
    subjectSlug: "education-islamique",
    title: "حوار الحضارات والتسامح",
    chapter: "القيم · الحوار",
    summary:
      "أسس الحوار الحضاري في الإسلام، وقيم التسامح، وأدب الاختلاف في المجتمع المتعدد.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 25,
    orderIndex: 11,
    objectives: [
      "بيان مفهوم الحوار الحضاري",
      "استخراج أسس التسامح من النصوص",
      "التمييز بين التسامح والتنازل عن الحق",
      "تطبيق أدب الاختلاف",
    ],
    blocks: [
      {
        type: "list",
        title: "أسس الحوار في الإسلام",
        items: [
          "الاعتراف بالاختلاف سنة إلهية: «ولو شاء ربك لجعل الناس أمة واحدة».",
          "الحوار بالتي هي أحسن: «وجادلهم بالتي هي أحسن».",
          "العدل مع المخالف: «ولا يجرمنكم شنآن قوم على ألا تعدلوا».",
          "حرية الاعتقاد: «لا إكراه في الدين».",
          "معرفة الآخر وتبادل المنافع: «وجعلناكم شعوباً وقبائل لتعارفوا».",
        ],
      },
      {
        type: "paragraph",
        title: "التسامح ليس تنازلاً",
        text: "التسامح هو احترام حق الآخر في الاختلاف مع التمسك بقناعتي. أما التنازل فهو التخلي عن الحق أو المبدأ. الخلط بينهما يُفقد المفهوم معناه: التسامح قوة أخلاقية، لا ضعف موقف. وأدب الاختلاف يقتضي الإصغاء، والدليل، وترك الطعن في النوايا.",
      },
      {
        type: "steps",
        title: "منهجية الإجابة",
        items: [
          "تعريف المفهوم في المقدمة.",
          "عرض الأسس النصية بالشواهد.",
          "تحليل الواقع: ما يعوق الحوار (التعصب، الإعلام، الجهل).",
          "تقديم الحلول العملية (التربية، الإعلام، المؤسسات).",
          "خاتمة تركيبة تجمع بين المبدأ والواقع.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "شواهد ترفع التنقيط",
        text: "«يا أيها الناس إنا خلقناكم من ذكر وأنثى وجعلناكم شعوباً وقبائل لتعارفوا» (الحجرات 13)؛ «لا إكراه في الدين» (البقرة 256)؛ «وجادلهم بالتي هي أحسن» (النحل 125).",
      },
    ],
    keyPoints: [
      "الاختلاف سنة إلهية لا عيب.",
      "الحوار يكون بالتي هي أحسن.",
      "التسامح غير التنازل.",
      "أدب الاختلاف: إصغاء، دليل، احترام.",
    ],
    pitfalls: [
      "الخلط بين التسامح والتنازل.",
      "إهمال الشواهد النصية.",
      "الخطاب الوعظي بلا تحليل.",
    ],
    flashcards: [
      {
        question: "ما الفرق بين التسامح والتنازل؟",
        answer: "التسامح احترام حق الآخر في الاختلاف مع التمسك بالقناعة، والتنازل التخلي عن الحق أو المبدأ.",
      },
      {
        question: "ما الآية التي تؤسس للتعارف بين الشعوب؟",
        answer: "«وجعلناكم شعوباً وقبائل لتعارفوا» (الحجرات 13).",
      },
      {
        question: "ما شرط الحوار الحضاري؟",
        answer: "الاعتراف بالاختلاف والالتزام بالعدل والأدب في الحجة.",
      },
    ],
    tags: ["إسلامية", "حوار", "تسامح", "حضارات", "قيم"],
  },
  {
    slug: "islam-qadaya-mujtama",
    subjectSlug: "education-islamique",
    title: "القضايا المجتمعية المعاصرة",
    chapter: "القيم · قضايا معاصرة",
    summary:
      "معالجة قضايا معاصرة (البيئة، التقنية، العنف، الفقر) من منظور إسلامي قيمي، بمنهجية توازن بين النص والواقع.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 26,
    orderIndex: 12,
    objectives: [
      "تحديد القضايا المجتمعية الكبرى",
      "استخراج التوجيه الإسلامي المتعلق بها",
      "تحليل الأسباب والآثار",
      "اقتراح حلول عملية",
    ],
    blocks: [
      {
        type: "table",
        title: "قضايا وتوجيهات",
        head: ["القضية", "التوجيه الإسلامي", "الأثر المرجو"],
        rows: [
          ["البيئة", "الإحسان، عدم الإفساد في الأرض", "تنمية مستدامة وأمانة في الأرض"],
          ["الفقر", "الزكاة، التكافل، الصدقة", "تكافل اجتماعي وعدالة"],
          ["العنف", "العدل، العفو عند المقدرة", "سلم اجتماعي"],
          ["التقنية", "طلب العلم، حفظ الضرورات", "استخدام مسؤول للنعم"],
          ["التمييز", "المساواة والتقوى معياراً", "كرامة إنسانية"],
        ],
      },
      {
        type: "steps", 
        title: "منهجية معالجة قضية",
        items: [
          "وصف القضية بالمعطيات والأرقام.",
          "ذكر التوجيه الإسلامي بالشواهد والأدلة.",
          "تحليل الأسباب (اجتماعية، اقتصادية، تربوية).",
          "اقتراح الحلول على ثلاثة مستويات: الفرد، الأسرة، المجتمع.",
          "خاتمة تركيبة تربط الحل بالمسؤولية المشتركة.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "تجنب الوعظية",
        text: "الخطاب الذي يكتفي بالمواعظ دون تحليل أسباب المشكلة أو اقتراح حلول يخسر أغلب النقاط. النموذج المطلوب: نص + واقع + حل.",
      },
    ],
    keyPoints: [
      "المنهج: نص + واقع + حل.",
      "المعالجة تكون على مستويات الفرد والأسرة والمجتمع.",
      "الاستشهاد بالنصوص ضروري.",
      "الحلول يجب أن تكون عملية.",
    ],
    pitfalls: [
      "الخطاب الوعظي الخالي من التحليل.",
      "الاكتفاء بذكر الشواهد دون تفسير.",
      "غياب الحلول العملية.",
    ],
    flashcards: [
      {
        question: "ما منهج معالجة قضية مجتمعية في الإسلام؟",
        answer: "وصف الواقع، ثم التوجيه النصي، ثم تحليل الأسباب، ثم اقتراح الحلول.",
      },
      {
        question: "ما التوجيه الإسلامي في شأن البيئة؟",
        answer: "الأمانة والإحسان والنهي عن الإفساد في الأرض، بما يقتضي تنمية مستدامة.",
      },
      {
        question: "لماذا تُعرض الحلول على مستويات متعددة؟",
        answer: "لأن المسؤولية مشتركة بين الفرد والأسرة والمؤسسات.",
      },
    ],
    tags: ["إسلامية", "قضايا معاصرة", "بيئة", "تكافل", "حلول"],
  },
  {
    slug: "islam-aqida",
    subjectSlug: "education-islamique",
    title: "العقيدة الإسلامية وأثرها في السلوك",
    chapter: "العقيدة · الشمول",
    summary:
      "بيان أثر العقيدة في بناء السلوك الفردي والاجتماعي، وعلاقة الإيمان بالعمل والمسؤولية.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 25,
    orderIndex: 13,
    objectives: [
      "تعريف العقيدة الإسلامية",
      "بيان أثرها على السلوك",
      "التمييز بين العقيدة والسلوك الملتزم",
      "تحليل العلاقة بين الإيمان والعمل",
    ],
    blocks: [
      {
        type: "list",
        title: "أثر العقيدة في السلوك",
        items: [
          "مراقبة الله: تدفع إلى الأمانة والإخلاص.",
          "الإيمان بالجزاء: يشجع على الخير ويردع عن الشر.",
          "الرضا والتوكل: حالة استقرار نفسي.",
          "الكرامة والمسؤولية: حرية الإرادة مع تحمل النتائج.",
          "الوسطية والاعتدال: اجتناب الغلو والتسيب.",
        ],
      },
      {
        type: "paragraph",
        title: "الإيمان ليس مجرد تصور",
        text: "العقيدة في الفهم الإسلامي اعتقاد قلبي يصدقه عمل، فالإيمان تصديق وثمرته السلوك. هذا يفسر لماذا يربط القرآن الإيمان دائماً بالعمل الصالح: «آمنوا وعملوا الصالحات». العقيدة إذاً ليست فكرة مجردة في الذهن بل قوة موجِّهة في الحياة.",
      },
      {
        type: "steps",
        title: "بناء الإجابة",
        items: [
          "تعريف العقيدة في المقدمة.",
          "بيان المصادر (القرآن والسنة والعقل).",
          "بحث نتائجها السلوكية بالشواهد.",
          "التمييز بين من يعتقد ومن يلتزم سلوكياً (الفارق بين العقيدة والممارسة).",
          "خاتمة: العلاقة تكاملية بين الإيمان والعمل.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "دقة الألفاظ",
        text: "لا تجعل العقيدة ضماناً آلياً للسلوك، بل عاملاً موجهاً. الاحترام والمنطق في تناول موضوع العقيدة أساسيان.",
      },
    ],
    keyPoints: [
      "العقيدة تصديق قلبي ثمرته العمل.",
      "الإيمان والعمل مترابطان.",
      "العقيدة توجّه السلوك وترسّخ القيم.",
      "تجنب الغلو والتبسيط.",
    ],
    pitfalls: [
      "اختزال العقيدة في الفكر.",
      "الخطاب الدفاعي بلا تحليل.",
      "الاكتفاء بالآيات دون شرح.",
    ],
    flashcards: [
      {
        question: "ما العلاقة بين العقيدة والسلوك؟",
        answer: "العقيدة موجّه للسلوك؛ تصديق قلبي يكون أثره عمل ظاهر.",
      },
      {
        question: "ما أشهر آية تربط الإيمان بالعمل؟",
        answer: "«إن الذين آمنوا وعملوا الصالحات» — يربط القرآن الإيمان الدائم بالعمل الصالح.",
      },
      {
        question: "ما هو أثر مراقبة الله في السلوك؟",
        answer: "تدفع إلى الأمانة والإخلاص وضبط النفس في السر والعلن.",
      },
    ],
    tags: ["إسلامية", "عقيدة", "سلوك", "إيمان", "قيم"],
  },
  {
    slug: "islam-akhlaq-muwatana",
    subjectSlug: "education-islamique",
    title: "الأخلاق الإسلامية وقيم المواطنة",
    chapter: "القيم · المواطنة",
    summary:
      "ربط الأخلاق الإسلامية بقيم المواطنة: المسؤولية، التضامن، احترام القانون، والعمل العام.",
    level: "Bac · 4e Lettres (T3)",
    durationMin: 26,
    orderIndex: 14,
    objectives: [
      "تعریف الأخلاق الإسلامية",
      "ربط الأخلاق بالمواطنة",
      "استخراج قيم المسؤولية والتضامن",
      "اقتراح سلوكيات مدنية",
    ],
    blocks: [
      {
        type: "table",
        title: "قيم مشتركة بين الأخلاق والمواطنة",
        head: ["القيمة", "في الأخلاق الإسلامية", "في المواطنة"],
        rows: [
          ["المسؤولية", "الأمانة والتحمل", "احترام القانون والواجب"],
          ["التضامن", "الزكاة والصدقة", "التكافل الاجتماعي والضمان"],
          ["العدالة", "العدل مع الجميع", "المساواة أمام القانون"],
          ["الصدق", "الصدق في القول والعمل", "شفافية ومصداقية"],
          ["الإتقان", "إتقان العمل", "العمل الجيد والعام"],
        ],
      },
      {
        type: "paragraph",
        title: "المواطنة بعد أخلاقي ووطني",
        text: "المواطنة ليست مجرد علاقة قانونية بالدولة، بل هي أخلاقية أيضاً: المسؤولية عن المصلحة العامة، احترام القانون، التضامن مع الضعيف، والالتزام بالنظافة والتطوع والمناصرة. الأخلاق الإسلامية تدعم هذه القيم وتؤصلها في وجدان الفرد.",
      },
      {
        type: "steps",
        title: "طريقة المعالجة",
        items: [
          "تعريف المواطنة والأخلاق في المقدمة.",
          "إبراز القيم المشتركة بالشواهد.",
          "تحليل الواقع: مظاهر نقص المواطنة وأسبابها.",
          "اقتراح إجراءات: المدرسة، الأسرة، المجتمع، الدولة.",
          "خاتمة: المواطنة مسار تربوي مستمر.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "الربط بالقيمة الكبرى",
        text: "المواطنة ليست بديلاً عن الأخلاق ولا التزاماً دينياً فقط: التكامل بينهما بدءاً من «حب الوطن من الإيمان» إلى «من غشنا فليس منا» يمثل روح الموضوع.",
      },
    ],
    keyPoints: [
      "المواطنة فعل أخلاقي ووطني، لا مجرد علاقة قانونية.",
      "المسؤولية والتضامن والصدق قيم مشتركة.",
      "التربية هي مسار تجذير المواطنة.",
      "الدليل من القرآن والسنة يخدم الحجة.",
    ],
    pitfalls: [
      "فصل الدين عن المواطنة.",
      "الخطاب الوعظي دون تحليل.",
      "غياب الأمثلة الواقعية.",
    ],
    flashcards: [
      {
        question: "كيف ترتبط الأخلاق الإسلامية بالمواطنة؟",
        answer: "تتجاذب القيمتُن حول المسؤولية والعدالة والتضامن والصدق، بنصوص قرآنية وآثار عملية.",
      },
      {
        question: "ما دور التربية في المواطنة؟",
        answer: "غرس القيم والممارسة اليومية المسؤولة في الأسرة والمدرسة والمحيط.",
      },
      {
        question: "ما علاقة الإخلاص في العمل بالمواطنة؟",
        answer: "الإتقان والأمانة في العمل خدمة للصالح العام وتعبير عن المسؤولية.",
      },
    ],
    tags: ["إسلامية", "أخلاق", "مواطنة", "مسؤولية", "قيم"],
  },
  {
    slug: "memento-education-islamique",
    subjectSlug: "education-islamique",
    title: "خلاصة مراجعة التربية الإسلامية: مفاهيم ونصوص",
    chapter: "المراجعة العامة",
    summary:
      "أهم المفاهيم والآيات والأحاديث والقيم في التربية الإسلامية، ومنهجية الإجابة في الامتحان.",
    level: "Bac · 4e Lettres (REV)",
    durationMin: 24,
    orderIndex: 15,
    objectives: [
      "استحضار المفاهيم الأساسية",
      "حفظ الشواهد المناسبة",
      "التمييز بين المفاهيم المتشابهة",
      "الالتزام بالمنهجية",
    ],
    blocks: [
      {
        type: "table",
        title: "المفاهيم الأساسية",
        head: ["المفهوم", "التعريف", "الخطر"],
        rows: [
          ["المقاصد", "جلب المصالح ودرء المفاسد", "استعمالها تبريراً لكل شيء"],
          ["التسامح", "احترام الآخر مع التمسك بالقناعة", "الخلط مع التنازل"],
          ["الوسطية", "الاعتدال بين الغلو والتسيب", "الخلط بين الوسطية والتمييع"],
          ["المواطنة", "انتماء مسؤول وواجبات فعالة", "الاختزال إلى أوراق رسمية"],
          ["العقيدة", "تصديق يصدقه العمل", "اختزالها في الفكر"],
        ],
      },
      {
        type: "list",
        title: "شواهد لا تنسى",
        items: [
          "«إن الله يأمر بالعدل والإحسان».",
          "«وجعلناكم شعوباً وقبائل لتعارفوا».",
          "«لا إكراه في الدين».",
          "«وجادلهم بالتي هي أحسن».",
          "«من غشنا فليس منا».",
          "«إن الله يحب إذا عمل أحدكم عملاً أن يتقنه».",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "منهج الإجابة",
        text: "مقدمة تعرّف المفاهيم ثم عرض الشواهد والأدلة ثم تحليل الواقع واقتراح الحلول ثم خاتمة تركيبية. الإجابة الانفعالية أو الوعظية دون أدلة تُفقد العلامة.",
      },
    ],
    keyPoints: [
      "المقاصد منهج اجتهاد لا شعار.",
      "التسامح غير التنازل.",
      "الوسطية اعتدال لا تمييع.",
      "الشاهد + التحليل + اقتراح حل.",
    ],
    pitfalls: [
      "إهمال الشواهد.",
      "الوعظ بدون تحليل.",
      "الخلط بين المفاهيم المتشابهة.",
    ],
    flashcards: [
      {
        question: "ما معنى الوسطية؟",
        answer: "الاعتدال بين الغلو والتسيب، واختيار المنهج القويم في الفهم والسلوك.",
      },
      {
        question: "لماذا وُصفت المقاصد بروح التشريع؟",
        answer: "لأنها الغايات التي يُبتغى تحقيقها من الأحكام: جلب المصالح ودرء المفاسد.",
      },
      {
        question: "ما الشاهد على إتقان العمل؟",
        answer: "«إن الله يحب إذا عمل أحدكم عملاً أن يتقنه».",
      },
    ],
    tags: ["إسلامية", "خلاصة", "مراجعة", "شواهد", "منهجية"],
  },
];

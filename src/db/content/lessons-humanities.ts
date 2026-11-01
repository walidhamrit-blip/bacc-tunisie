import { scienceLessons, type LessonSeed } from "@/db/content/lessons-sciences";

const philoLiberte: LessonSeed = {
  slug: "la-liberte",
  subjectSlug: "philosophie",
  title: "La liberté : définitions, problématiques et plan",
  chapter: "Notion · La liberté",
  summary:
    "Distinguer liberté d'indifférence, liberté de choix et liberté politique, formuler une problématique et bâtir un plan de dissertation en trois temps.",
  level: "Bac · Toutes sections",
  durationMin: 30,
  orderIndex: 1,
  objectives: [
    "Définir les sens principaux du mot liberté",
    "Formuler une problématique à partir d'un sujet donné",
    "Construire un plan dialectique argumenté",
    "Mobiliser des références philosophiques à bon escient",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Partir d'un constat simple",
      text: "Je me sens libre quand rien ne m'empêche d'agir. Mais cette absence d'obstacle suffit-elle ? Un homme sans contrainte extérieure peut être esclave de ses désirs, de ses habitudes, de son inconscient. La liberté n'est donc pas d'abord une absence, c'est une capacité : celle de se déterminer soi-même.",
    },
    {
      type: "table",
      title: "Trois sens à distinguer",
      head: ["Sens", "Définition", "Question critique"],
      rows: [
        ["Liberté d'indifférence", "Pouvoir de choisir sans raison déterminante", "Choisir au hasard est-ce être libre ou être soumis au caprice ?"],
        ["Liberté de choix (libre arbitre)", "Pouvoir de se déterminer par la raison", "Suis-je responsable si mon choix est déterminé ?"],
        ["Liberté politique", "Pouvoir de participer aux lois et d'agir sans domination", "L'obéissance à la loi peut-elle être libératrice ?"],
      ],
    },
    {
      type: "list",
      title: "Références utiles (et ce qu'elles apportent)",
      items: [
        "Descartes : la liberté est d'abord l'évidence de la volonté, mais la vraie liberté est de bien juger.",
        "Spinoza : le sentiment de liberté est une illusion née de l'ignorance des causes ; libérer, c'est comprendre.",
        "Kant : autonomie = obéir à la loi que la raison se donne elle-même ; hétéronomie = obéir à une loi extérieure.",
        "Sartre : l'homme est condamné à être libre ; l'existence précède l'essence, d'où la responsabilité totale.",
        "Montesquieu / Rousseau : la liberté politique suppose des lois et un contrat, non l'absence de règles.",
      ],
    },
    {
      type: "steps",
      title: "Méthode — plan type sur « Suis-je libre ? »",
      items: [
        "Introduction : partir d'une expérience concrète (choisir sa filière), dégager le paradoxe, annoncer la problématique et le plan.",
        "Thèse : je suis libre quand je fais ce que je veux — liberté négative, absence de contrainte, spontanéité.",
        "Antithèse : cette liberté est illusoire — déterminismes sociaux, inconscient, ignorance des causes, loi comme condition de la liberté.",
        "Synthèse : la liberté comme conquête — autonomie, lucidité, responsabilité ; la liberté se construit par l'effort de compréhension.",
        "Conclusion : répondre clairement à la question posée, sans introduction nouvelle.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Ce qui fait perdre des points",
      text: "Réciter des citations sans les expliquer, raconter sa vie dans l'introduction, confondre « libre » et « heureux », oublier de répondre à la question dans la conclusion. Une citation doit toujours être suivie d'un « c'est-à-dire ».",
    },
    {
      type: "callout",
      tone: "tip",
      title: "Sujet d'entraînement",
      text: "« Être libre, est-ce faire ce que l'on veut ? » Construis en 15 minutes un plan en trois parties, chacune avec un exemple concret et une référence philosophique expliquée.",
    },
  ],
  keyPoints: [
    "Liberté ≠ absence de règles : la loi peut être libératrice (Kant, Rousseau).",
    "Le sentiment de liberté peut masquer un déterminisme ignoré (Spinoza).",
    "Autonomie : se donner soi-même sa loi ; hétéronomie : recevoir sa loi d'un autre.",
    "Une dissertation répond à une question, elle ne la contourne pas.",
  ],
  pitfalls: [
    "Confondre liberté et toute-puissance du désir.",
    "Utiliser une citation sans explication ni lien avec l'argument.",
    "Plans du type oui / non / peut-être sans contenu réel dans la troisième partie.",
  ],
  flashcards: [
    {
      question: "Que signifie autonomie chez Kant ?",
      answer: "La volonté se donne à elle-même la loi morale : obéir à la raison universelle, c'est être libre et non contraint de l'extérieur.",
    },
    {
      question: "Pourquoi Spinoza critique-t-il l'illusion de liberté ?",
      answer: "Nous nous croyons libres car nous ignorons les causes qui nous déterminent ; la connaissance des causes est la voie de la libération.",
    },
    {
      question: "Quelle est la fonction de la conclusion ?",
      answer: "Répondre explicitement au problème posé, en rappelant le parcours du raisonnement, sans apporter d'idée nouvelle.",
    },
  ],
  tags: ["liberté", "autonomie", "déterminisme", "dissertation", "responsabilité"],
};

const philoVerite: LessonSeed = {
  slug: "la-verite",
  subjectSlug: "philosophie",
  title: "La vérité : vérité-correspondance et vérité-vérification",
  chapter: "Notion · La vérité",
  summary:
    "Comprendre les théories de la vérité, le rôle du doute et de l'expérience, et préparer un plan solide sur « Peut-on tout démontrer ? ».",
  level: "Bac · Toutes sections",
  durationMin: 26,
  orderIndex: 2,
  objectives: [
    "Définir vérité, opinion, croyance et certitude",
    "Distinguer démarche scientifique et croyance",
    "Analyser le rôle du doute méthodique",
    "Construire un plan sur la valeur de la vérité",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "La vérité n'est pas la certitude",
      text: "Une croyance peut être certaine sans être vraie. La vérité est une propriété du jugement : un énoncé est vrai s'il dit ce qui est. Encore faut-il pouvoir le vérifier — et c'est là que la raison et l'expérience entrent en jeu.",
    },
    {
      type: "table",
      title: "Trois approches",
      head: ["Approche", "Thèse", "Auteur"],
      rows: [
        ["Correspondance", "Vrai = adéquation entre l'idée et la chose", "Aristote, Thomas d'Aquin"],
        ["Cohérence", "Vrai = compatible avec un ensemble de propositions démontrables", "Rationalisme (Descartes, Leibniz)"],
        ["Vérification utilitaire", "Vrai = ce qui réussit pratiquement", "Pragmatisme (James, Dewey)"],
      ],
    },
    {
      type: "list",
      title: "Le doute, un outil et non une fin",
      items: [
        "Doute sceptique : on suspend tout jugement, on ne peut plus rien affirmer.",
        "Doute méthodique (Descartes) : on rejette provisoirement tout ce qui est douteux pour trouver un fondement indubitable.",
        "Le cogito : « je pense donc je suis » résiste au doute le plus radical.",
        "Bacon : les « idoles » (préjugés) doivent être combattues pour atteindre la connaissance.",
      ],
    },
    {
      type: "steps",
      title: "Plan possible — « Peut-on tout démontrer ? »",
      items: [
        "Introduction : partir d'un théorème de maths / d'une croyance, montrer le paradoxe, poser la problématique.",
        "I. Ce qui se démontre : démonstration logique et mathématique, nécessité des conclusions.",
        "II. Ce qui se vérifie sans se démontrer : sciences expérimentales, hypothèse, expérience, induction provisoire.",
        "III. Ce qui n'est ni démontrable ni vérifiable : croyances, valeurs, sens de l'existence ; la démonstration a des limites.",
        "Conclusion : toute vérité ne se démontre pas, mais exiger des raisons reste une exigence de la raison.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "Exemples à réutiliser",
      text: "Théorème de Pythagore (démonstration), rotondité de la Terre (vérification), existence de Dieu (ni démontrable ni vérifiable expérimentalement), goût personnel (relatif, ce n'est pas une vérité).",
    },
  ],
  keyPoints: [
    "Vérité ≠ opinion : l'opinion est vraie par hasard, la vérité exige des raisons.",
    "Le doute méthodique fonde la connaissance ; le doute sceptique la détruit.",
    "Les sciences expérimentales prouvent par vérification, pas par démonstration absolue.",
    "La vérité a une valeur éthique : elle engage la confiance et la responsabilité.",
  ],
  pitfalls: [
    "Confondre croire et savoir.",
    "Dire qu'une expérience prouve définitivement une théorie.",
    "Réduire la philosophie à des citations sans argumentation.",
  ],
  flashcards: [
    {
      question: "Qu'est-ce que le cogito cartésien ?",
      answer: "« Je pense donc je suis » : même en doutant de tout, la pensée prouve l'existence du sujet pensant.",
    },
    {
      question: "Différence entre démontrer et vérifier ?",
      answer: "Démontrer déduit une conclusion de prémisses par la logique ; vérifier confronte une hypothèse à l'expérience, toujours de façon provisoire.",
    },
    {
      question: "Pourquoi la vérité est-elle une exigence morale ?",
      answer: "Mentir c'est traiter autrui comme un moyen ; la vérité rend la confiance et la vie commune possibles.",
    },
  ],
  tags: ["vérité", "doute", "science", "opinion", "dissertation"],
};

const francaisRoman: LessonSeed = {
  slug: "roman-personnages",
  subjectSlug: "francais",
  title: "Le roman et ses personnages : lire et commenter",
  chapter: "Littérature · Le roman",
  summary:
    "Repérer point de vue, caractérisation et fonction du personnage, puis construire un commentaire composé en trois axes avec des citations courtes.",
  level: "Bac · Toutes sections",
  durationMin: 24,
  orderIndex: 1,
  objectives: [
    "Identifier le point de vue narratif et le statut du narrateur",
    "Analyser la caractérisation d'un personnage",
    "Construire un plan de commentaire en trois axes",
    "Insérer et analyser une citation sans la paraphraser",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Ce qu'on attend de toi",
      text: "Un commentaire n'est ni un résumé ni une impression de lecture : c'est une démonstration, appuyée sur des procédés repérés dans le texte, qui explique comment le texte produit un sens et un effet sur le lecteur.",
    },
    {
      type: "table",
      title: "Grille de repérage",
      head: ["Entrée", "Questions à se poser"],
      rows: [
        ["Narrateur / point de vue", "Qui parle ? Interne, externe, omniscient ? Le narrateur est-il personnage ?"],
        ["Personnage", "Nom, portrait physique et moral, actions, paroles, évolution, fonction (héros, adjuvant, opposant)."],
        ["Temps et rythme", "Imparfait d'habitude, passé simple d'action, ellipse, scène, sommaire ?"],
        ["Champs lexicaux et figures", "Quel réseau de mots ? Quelle figure dominante et quel effet ?"],
        ["Énonciation", "Présence de marques du locuteur, modalisation, ironie ?"],
      ],
    },
    {
      type: "formula",
      title: "Un paragraphe de commentaire qui fonctionne",
      expression: "Idée → procédé cité → analyse → effet sur le lecteur",
      note: "Exemple : « L'hyperbole “immense chagrin” (l. 4) grossit la douleur du personnage et installe d'emblée le registre pathétique. » Une seule idée par paragraphe.",
    },
    {
      type: "steps",
      title: "Méthode en 6 étapes",
      items: [
        "Lecture attentive : noter le genre, le siècle, le thème et le ton.",
        "Repérage au brouillon : procédés classés par domaine (lexique, syntaxe, énonciation, figures).",
        "Regroupement en trois axes, avec un titre qui annonce une idée et pas un procédé.",
        "Rédaction de chaque paragraphe selon le schéma idée → citation → analyse → effet.",
        "Transition entre les axes : une phrase qui montre le lien logique.",
        "Introduction et conclusion rédigées en dernier : présentation, projet de lecture, bilan et ouverture.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Péché mignon des copies",
      text: "Paraphraser (« l'auteur dit que le personnage est triste ») au lieu d'analyser (« l'imparfait d'habitude installe une tristesse durable »). Les citations doivent être courtes, entre guillemets, avec la ligne entre parenthèses.",
    },
  ],
  keyPoints: [
    "Un commentaire démontre un projet de lecture, il ne raconte pas l'histoire.",
    "Chaque axe = une idée + deux ou trois procédés analysés.",
    "Le personnage se construit par le portrait, les actes et les paroles.",
    "Toujours relier un procédé à un effet produit sur le lecteur.",
  ],
  pitfalls: [
    "Oublier d'annoncer le plan dans l'introduction.",
    "Faire des citations trop longues non analysées.",
    "Confondre auteur, narrateur et personnage.",
  ],
  flashcards: [
    {
      question: "Trois types de point de vue narratif ?",
      answer: "Interne (le narrateur sait ce que pense un personnage), externe (il observe sans savoir), omniscient (il sait tout de tous).",
    },
    {
      question: "Que doit contenir une introduction de commentaire ?",
      answer: "Présentation du texte, projet de lecture (problématique) et annonce du plan.",
    },
    {
      question: "Quelle est la différence entre un résumé et un commentaire ?",
      answer: "Le résumé raconte ce qui se passe ; le commentaire explique comment le texte le dit et quel effet cela produit.",
    },
  ],
  tags: ["roman", "commentaire composé", "point de vue", "citation", "personnage"],
};

const anglaisTenses: LessonSeed = {
  slug: "english-tenses-writing",
  subjectSlug: "anglais",
  title: "English essentials: tenses, linkers and exam writing",
  chapter: "Language · Grammar & writing",
  summary:
    "Maîtriser les temps qui font gagner des points, utiliser les connecteurs logiques et structurer une réponse écrite au bac en 120 mots.",
  level: "Bac · Toutes sections",
  durationMin: 22,
  orderIndex: 1,
  objectives: [
    "Choisir entre present perfect, past simple et past perfect",
    "Employer les linkers de cause, conséquence et concession",
    "Structurer un paragraphe argumentatif en anglais",
    "Éviter les erreurs de traduction les plus pénalisées",
  ],
  blocks: [
    {
      type: "table",
      title: "The tenses that matter",
      head: ["Tense", "Use it for", "Example"],
      rows: [
        ["Present simple", "habits, facts, timetable", "She studies in Tunis."],
        ["Present continuous", "action happening now / trend", "More students are choosing coding."],
        ["Past simple", "finished action with a date", "Tunisia became independent in 1956."],
        ["Past perfect", "earlier past action", "He had finished the exam before the bell rang."],
        ["Present perfect", "experience / result now, no clear date", "I have never visited Sousse."],
        ["Future with will / going to", "prediction / plan", "I will revise tonight. I am going to apply for a scholarship."],
      ],
    },
    {
      type: "list",
      title: "Linkers to use in an essay",
      items: [
        "Addition: moreover, in addition, not only ... but also.",
        "Cause: because, since, due to + noun, as a result of.",
        "Consequence: therefore, thus, consequently, which leads to.",
        "Contrast: however, whereas, although (never « although » + but), on the one hand.",
        "Conclusion: to sum up, overall, in conclusion (avoid « finally » alone).",
      ],
    },
    {
      type: "formula",
      title: "Paragraph formula (about 80 words)",
      expression: "Topic sentence + reason + example + link + mini-conclusion.",
      note: "Exemple : « Technology has changed the way students learn. Thanks to online platforms, pupils from Kasserine can attend free courses. For instance, educational videos can be replayed as often as necessary. As a result, revision becomes more personal and efficient. »",
    },
    {
      type: "callout",
      tone: "warn",
      title: "Typical French-speaker mistakes",
      text: "« I have been to Paris last year » → « I went to Paris last year ». « I will can » → « I will be able to ». « Informations » → « information » (uncountable). « I am agree » → « I agree ». « He said me » → « He told me ».",
    },
    {
      type: "steps",
      title: "How to write the exam answer",
      items: [
        "Read the question twice and underline the key words and the required format (letter, report, opinion).",
        "Plan two main ideas with one example each: five minutes of planning save ten minutes of rewriting.",
        "Write in the required register and avoid literal translation from French or Arabic.",
        "Use at least four linkers and two tenses accurately.",
        "Check verbs, subject-verb agreement, articles and spelling in the last five minutes.",
      ],
    },
  ],
  keyPoints: [
    "Present perfect = no specific date; past simple = finished moment in the past.",
    "Although tells a contrast: never add « but » in the same clause.",
    "A good paragraph starts with a topic sentence, not a list of ideas.",
    "Accuracy of verbs earns more marks than rare vocabulary.",
  ],
  pitfalls: [
    "Mixing past simple and present perfect in one sentence without reason.",
    "Forgetting the third-person « s » in the present simple.",
    "Writing one long block paragraph without any linker.",
  ],
  flashcards: [
    {
      question: "Past simple or present perfect: « I ___ this film yesterday »?",
      answer: "I saw this film yesterday. With a finished date, use the past simple.",
    },
    {
      question: "What does « however » introduce?",
      answer: "A contrast between two ideas, and it is followed by a comma.",
    },
    {
      question: "Correct: « He told me that he ... »?",
      answer: "He told me that he had passed his exam. Reported speech shifts the tense back one step.",
    },
  ],
  tags: ["grammar", "tenses", "writing", "linkers", "bac english"],
};

const arabeBalagha: LessonSeed = {
  slug: "balagha-image-poetique",
  subjectSlug: "arabe",
  title: "الصورة الشعرية بين التشبيه والاستعارة",
  chapter: "البلاغة · الصورة الشعرية",
  summary:
    "تعلم كيف تحلل الصورة الشعرية: تحديد نوعها، شرحها بأسلوبك، واستخراج أثرها في المعنى الشعوري قبل إصدار الحكم على الشاعر أو النص.",
  level: "باك · جميع الشعب",
  durationMin: 26,
  orderIndex: 1,
  objectives: [
    "التمييز بين التشبيه والاستعارة والكناية",
    "شرح الصورة بأسلوبك دون الاكتفاء بتسمية أداة البلاغة",
    "بيان أثر الصورة في المعنى وباعث الشاعر",
    "توظيف التحليل البلاغي في إجابة موضوع الإنشاء",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "القاعدة الذهبية",
      text: "لا قيمة لقولك: «توظيف الاستعارة في البيت» دون أن تشرح الصورة وتعيّن مضمونها وتكشف القرينة التي جعلت اللفظ مستعاراً او مشبهاً به.",
    },
    {
      type: "table",
      title: "أنواع الصورة وطرق تحديدها",
      head: ["البلاغة", "التعريف", "المثال"],
      rows: [
        ["التشبيه", "عقد مشابهة بين طرفين بأداة (كـ، مثل، كأن) أو ضمنياً", "العلمُ كالنورِ يهدي صاحبه"],
        ["الاستعارة", "تشبيه حُذف أحد طرفيه أو أداته ونقل اللفظ إلى معناه المجازي", "غَرَبتِ الشمسُ عن دنياي (حذف أدوات التشبيه)"],
        ["الكناية", "تعبير يُطلق ويُراد لازم معناه", "فلانٌ طويلُ اليد ⇒ السطو والسرقة"],
      ],
    },
    {
      type: "steps",
      title: "منهجية تحليل صورة شعرية",
      items: [
        "استخرج العبارة التي تحمل الصورة الشعرية بلفظها الحرفي.",
        "حدّد النوع (تشبيه / استعارة / كناية) وبيّن الأركان والقرينة.",
        "اشرح الصورة: ماذا شبّه الشاعر بماذا؟ ما القيمة المشتركة بينهما؟",
        "استخرج الأثر النفسي: هل أضافت الكلمة قوة؟ حزناً؟ إصراراً؟",
        "اربط الصورة بالفكرة العامة للنص وبموقف الشاعر من الحياة.",
        "اختم بحكم أدبي متواضع لا مبالغ فيه: «وظّف الشاعر الصورة ليجعل المعنى المجرّد ملموساً».",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "عبارات جاهزة للاستعمال",
      text: "«وظّف الشاعر الاستعارة ليجعل المعنى المجرد ملموساً»، «أضافت الصورة إيقاعاً موحياً وإيحاءً نفسياً»، «دلالات الصورة تتجاوز المعنى الحرفي إلى الإيحاء بالتجربة الشعورية».",
    },
  ],
  keyPoints: [
    "الصورة الشعرية لا تُفسَّر وحدها، بل تُربط بالفكرة العامة للنص.",
    "الاستعارة المكنية: حُذف المشبه به؛ التصريحية: حُذف المشبه.",
    "الكناية تُفهم من السياق، فلا تُحرَّف إلى تشبيه.",
    "التقليدية مَقتل الإنشاء: اربط التحليل بحساسية النص وتجربته الخاصة.",
  ],
  pitfalls: [
    "تسمية الصورة دون شرحها.",
    "الخلط بين الكناية والاستعارة.",
    "الانزلاق إلى التلخيص بدل التحليل.",
  ],
  flashcards: [
    {
      question: "ما الفرق بين الاستعارة المكنية والتصريحية؟",
      answer: "المكنية: حُذف المشبه به وبقيت إحدى صفاته. التصريحية: حُذف المشبه وصُرّح بالمشبه به.",
    },
    {
      question: "ما خطوات شرح الصورة؟",
      answer: "التحديد، ثم الشرح، ثم بيان الأثر النفسي والدلالي، ثم ربط الصورة بالفكرة العامة.",
    },
    {
      question: "مثال على الكناية؟",
      answer: "«فلانٌ كثير الرماد» كناية عن الكرم، و«طويل اليد» كناية عن السطو.",
    },
  ],
  tags: ["بلاغة", "استعارة", "تشبيه", "تحليل النص", "إنشاء"],
};

const histoireTunisie: LessonSeed = {
  slug: "tunisie-mouvement-national",
  subjectSlug: "histoire-geographie",
  title: "La Tunisie de 1881 à 1956 : la construction du mouvement national",
  chapter: "Histoire · La Tunisie contemporaine",
  summary:
    "Comprendre les étapes de la lutte nationale, distinguer les courants et les acteurs, et savoir organiser une réponse historique chronologique et argumentée.",
  level: "Bac · Toutes sections",
  durationMin: 28,
  orderIndex: 1,
  objectives: [
    "Situer les grandes étapes de 1881 au 20 mars 1956",
    "Distinguer le courant réformiste du courant de la lutte directe",
    "Expliquer le rôle de la Deuxième Guerre mondiale dans l'évolution du mouvement",
    "Rédiger une réponse structurée avec dates et acteurs précis",
  ],
  blocks: [
    {
      type: "table",
      title: "Chronologie à maîtriser",
      head: ["Date", "Événement", "Portée"],
      rows: [
        ["12 mai 1881", "Traité du Bardo", "Établissement du protectorat français en Tunisie"],
        ["1881-1883", "Conventions de La Marsa", "Institutions françaises imposées"],
        ["1907-1920", "Mouvement réformiste (Jeunes Tunisiens)", "Journal Le Tunisien, revendications culturelles et politiques"],
        ["1920", "Création du parti Destour", "Premier programme de libération nationale"],
        ["2 mars 1934", "Congrès de Ksar Hellal, création du Néo-Destour", "Lutte de masse, action directe"],
        ["1938 et 1952", "Grandes manifestations et grèves", "Répression, emprisonnements, radicalisation"],
        ["1946", "Congrès de la SFIO et de l'UGTT", "Plan de réformes, union syndicale"],
        ["1950-1954", "Gouvernements de négociation", "Autonomie interne, crise franco-tunisienne"],
        ["18 juin 1955", "Conventions d'autonomie interne", "Reconnaissance du pouvoir tunisien"],
        ["20 mars 1956", "Indépendance", "Fin du protectorat, souveraineté nationale"],
      ],
    },
    {
      type: "paragraph",
      title: "Trois idées pour structurer un sujet",
      text: "Le mouvement national est d'abord culturel et réformiste, puis politique et organisé, enfin populaire et massif. Chaque phase correspond à un contexte international (Première Guerre mondiale, Front populaire, Seconde Guerre mondiale, guerre froide) qui ouvre ou ferme les marges d'action.",
    },
    {
      type: "steps",
      title: "Méthode — répondre à une question d'histoire",
      items: [
        "Délimiter la période et le thème : lire les bornes chronologiques et le type de question (causes, bilan, rôle).",
        "Annoncer les trois idées du développement.",
        "Développer chaque idée avec : idée + date + acteur + fait + portée.",
        "Utiliser le vocabulaire historique exact : protectorat, autonomie interne, souveraineté, syndicat.",
        "Conclure sur le sens historique de l'étape étudiée.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Confusions fréquentes",
      text: "Protectorat (1881) n'est pas colonisation directe : le bey reste mais la politique réelle est française. Destour (1920) n'est pas Néo-Destour (1934). L'autonomie interne (1955) n'est pas l'indépendance (1956).",
    },
  ],
  keyPoints: [
    "1881 : protectorat ; 1934 : Néo-Destour ; 1955 : autonomie interne ; 1956 : indépendance.",
    "Deux courants complémentaires : réforme négociée et mobilisation populaire.",
    "Le contexte international (après-guerre, décolonisation) accélère le processus.",
    "Chaque fait historique doit être accompagné de sa date, de son acteur et de sa portée.",
  ],
  pitfalls: [
    "Mélanger les dates de 1955 et 1956.",
    "Oublier le rôle des syndicats et du mouvement de masse.",
    "Raconter sans répondre à la question posée.",
  ],
  flashcards: [
    {
      question: "Date de l'indépendance tunisienne ?",
      answer: "20 mars 1956, après l'autonomie interne obtenue en 1955.",
    },
    {
      question: "Qu'est-ce que le Néo-Destour ?",
      answer: "Parti créé le 2 mars 1934 à Ksar Hellal, favorable à la lutte de masse pour l'indépendance.",
    },
    {
      question: "Quelle est la différence entre protectorat et colonie ?",
      answer: "Formellement le protectorat conserve l'État tunisien et le bey, mais la souveraineté effective passe à la France.",
    },
  ],
  tags: ["Tunisie", "protectorat", "Néo-Destour", "indépendance", "chronologie"],
};

const educationIslamique: LessonSeed = {
  slug: "wasatiyya-valeurs",
  subjectSlug: "education-islamique",
  title: "الوسطية والاعتدال: قيم الدين في حياة الفرد والمجتمع",
  chapter: "تربية إسلامية · القيم والمقاصد",
  summary:
    "فهم مفهوم الوسطية انطلاقاً من النصوص القرآنية والحديثية، وبيان أثرها في العلاقات الاجتماعية، مع منهجية تحليل نص شرعي.",
  level: "باك · جميع الشعب",
  durationMin: 24,
  orderIndex: 1,
  objectives: [
    "تعريف الوسطية وتمييزها عن الغلو والتسيب",
    "تحليل نص قرآني أو حديثي واستخراج قيمه",
    "ربط النص بالواقع المعاصر للشباب",
    "تنظيم إجابة تحليلية بمقدمة وجوهر وخاتمة",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "المفهوم",
      text: "الوسطية هي الاعتدال بين الطرفين، تجمع بين الروح والجسد، وبين الحق والواجب، وبين الأصالة والتجديد. ليست وسطية تنازل، بل عدل وتوازن وتيسير، ومنها قوله تعالى: «وكذلك جعلناكم أمة وسطاً».",
    },
    {
      type: "list",
      title: "مظاهر الوسطية في حياة المسلم",
      items: [
        "في العبادة: التزام الفريضة مع الاعتدال وعدم إرهاق النفس.",
        "في المال: العمل والإنفاق دون إسراف ولا تقتير.",
        "في الكلمة: الصدق مع مراعاة الحكمة واللين.",
        "في العلاقات: العفو والمحبة مع الأخذ بالحق دون عدوان.",
        "في المعرفة: الجمع بين النقل والعقل والانفتاح على العلوم.",
      ],
    },
    {
      type: "steps",
      title: "منهجية تحليل نص شرعي",
      items: [
        "تحديد نوع النص: آية، حديث، أثر، أو نص لكاتب.",
        "ذكر مصدر النص (السورة ورقم الآية أو راوي الحديث) إن أمكن.",
        "شرح المفردات الغامضة بأسلوب واضح.",
        "استخراج الدلالات: الأحكام، والقيم، والمقاصد.",
        "ربط القيم بالواقع: كيف أطبق هذه القيمة في المحيط المدرسي والاجتماعي؟",
        "الخاتمة: تقويم النص وبيان صلاحيته للتطبيق.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "قيم مفيدة للمواضيع",
      text: "العدل، الرحمة، الأمانة، الصدق، التضامن، احترام الآخر، المسؤولية، العمل، التيسير، العفة، الاجتهاد. اربط كل قيمة بسبب انحرافها المقابل: الغلو ← التسيب، التضامن ← الأنانية.",
    },
  ],
  keyPoints: [
    "الوسطية عدل وتوازن، لا استسلام ولا تفريط.",
    "كل قيمة شرعية لها بعد فردي وبعد اجتماعي.",
    "الربط بالواقع المعاصر هو ما يميز إجابة جيدة.",
    "لا تنسَ الخطوات: نوع النص، الشرح، الدلالات، الواقع.",
  ],
  pitfalls: [
    "الاكتفاء بترجمة النص دون شرح.",
    "إهمال ربط النص بالحياة اليومية.",
    "استخدام أحكام عامة دون نص أو دليل.",
  ],
  flashcards: [
    {
      question: "ما تعريف الوسطية؟",
      answer: "الاعتدال والتوازن بين الأطراف دون غلو ولا تفريط، مع مراعاة النصوص والمقاصد.",
    },
    {
      question: "ما مقاصد الشريعة الأساسية؟",
      answer: "حفظ الدين والنفس والعقل والنسل والمال.",
    },
    {
      question: "كيف تخدم الوسطية الشباب؟",
      answer: "ببناء شخصية متوازنة، منفتحة على العلم والآخر، بعيدة عن الغلو والتسيب في التفكير والسلوك.",
    },
  ],
  tags: ["وسطية", "قيم", "مقاصد", "تحليل نص", "تربية إسلامية"],
};

const economieCroissance: LessonSeed = {
  slug: "croissance-developpement",
  subjectSlug: "economie",
  title: "Croissance, développement et développement durable",
  chapter: "Économie générale",
  summary:
    "Différencier croissance et développement, mesurer ces phénomènes et analyser les limites du PIB à l'aide d'indicateurs comme l'IDH.",
  level: "Bac · Économie & Gestion",
  durationMin: 24,
  orderIndex: 1,
  objectives: [
    "Définir la croissance économique et la mesurer par le PIB",
    "Distinguer croissance, développement et progrès social",
    "Présenter les limites du PIB comme indicateur",
    "Analyser les conditions d'un développement durable",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Deux notions liées mais distinctes",
      text: "La croissance est un phénomène quantitatif : l'augmentation durable de la production réelle. Le développement est plus large : ensemble des transformations structurelles et sociales qui améliorent le bien-être. La croissance est une condition nécessaire mais non suffisante du développement.",
    },
    {
      type: "formula",
      title: "Taux de croissance",
      expression: "t = [(PIB₁ − PIB₀) / PIB₀] × 100",
      note: "On le calcule toujours en volume (à prix constants) pour éliminer l'effet de l'inflation. Un taux nominal peut tromper.",
    },
    {
      type: "table",
      title: "Indicateurs à citer",
      head: ["Indicateur", "Ce qu'il mesure", "Limite"],
      rows: [
        ["PIB / habitant", "Production par habitant", "Ignore les inégalités et le travail non déclaré"],
        ["IDH", "Espérance de vie, scolarisation, revenu", "Indicateur composite, ne mesure pas le bonheur"],
        ["Coefficient de Gini", "Inégalités de revenus (0 à 1)", "Ne dit rien sur la nature des inégalités"],
        ["Empreinte écologique", "Pression humaine sur la planète", "Estimation dépendante des hypothèses"],
      ],
    },
    {
      type: "list",
      title: "Développement durable : trois piliers",
      items: [
        "Économique : une croissance viable, efficace et créatrice d'emplois.",
        "Social : équité, lutte contre la pauvreté, accès aux services de base.",
        "Environnemental : respect des ressources, réduction des émissions, énergies renouvelables.",
        "Exemple tunisien : stress hydrique, investissement dans le solaire et la gestion des déchets.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      title: "Structure d'une question d'analyse",
      text: "Définir → mesurer (chiffre ou indicateur) → expliquer le mécanisme → nuancer par une limite → conclure par une conséquence pour la Tunisie. Ce schéma s'applique à presque toutes les questions économiques du bac.",
    },
  ],
  keyPoints: [
    "Croissance = augmentation durable de la production réelle ; développement = amélioration du bien-être.",
    "PIB en volume, jamais en valeur nominale quand on compare des années.",
    "Le PIB ignore les inégalités, le travail domestique et les dommages écologiques.",
    "Développement durable = équilibre entre économique, social et environnemental.",
  ],
  pitfalls: [
    "Confondre croissance nominale et croissance réelle.",
    "Assimiler automatiquement croissance et développement.",
    "Donner un chiffre sans préciser la source ou l'unité.",
  ],
  flashcards: [
    {
      question: "Pourquoi le PIB n'est-il pas un indicateur parfait de bien-être ?",
      answer: "Il ignore les inégalités, le bénévolat, la santé du travail et les dégâts environnementaux.",
    },
    {
      question: "Que publie l'IDH ?",
      answer: "Un indicateur composite entre 0 et 1 basé sur la santé, l'éducation et le revenu.",
    },
    {
      question: "Un pays peut-il connaître une croissance sans développement ?",
      answer: "Oui : si les richesses ne profitent qu'à une minorité et n'améliorent pas les conditions de vie.",
    },
  ],
  tags: ["croissance", "développement durable", "PIB", "IDH", "inégalités"],
};

const gestionBilan: LessonSeed = {
  slug: "bilan-comptable",
  subjectSlug: "gestion",
  title: "Le bilan comptable : actif, passif et équilibre",
  chapter: "Comptabilité générale",
  summary:
    "Lire et construire un bilan, classer les emplois et les ressources, et vérifier l'équilibre actif = passif avant tout calcul de résultat.",
  level: "Bac · Économie & Gestion",
  durationMin: 26,
  orderIndex: 1,
  objectives: [
    "Distinguer emplois (actif) et ressources (passif)",
    "Classer les immobilisations, stocks, créances et dettes",
    "Vérifier l'équilibre du bilan et calculer les capitaux propres",
    "Relier le résultat de l'exercice au bilan et au compte de résultat",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Une photo à une date donnée",
      text: "Le bilan décrit le patrimoine de l'entreprise au dernier jour de l'exercice. À gauche (actif) : ce que l'entreprise possède et ce qu'on lui doit. À droite (passif) : ce qu'elle doit et ce qu'elle a apporté. Au total, les deux colonnes sont toujours égales.",
    },
    {
      type: "table",
      title: "Classement des postes",
      head: ["Actif (emplois)", "Exemples", "Passif (ressources)", "Exemples"],
      rows: [
        ["Actif immobilisé", "Terrain, bâtiment, matériel, logiciel", "Capitaux propres", "Capital, réserves, résultat"],
        ["Actif circulant", "Stocks, créances clients, banque, caisse", "Dettes à long terme", "Emprunt bancaire"],
        ["Charges constatées d'avance", "Loyer payé d'avance", "Dettes à court terme", "Fournisseurs, personnel, TVA, État"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — construire un bilan simple",
      items: [
        "Repérer les emplois : ce qui reste dans l'entreprise à la clôture (immobilisations, stocks, créances, banque, caisse).",
        "Repérer les ressources : origine de l'argent (capital, emprunt, dettes fournisseurs).",
        "Classer les éléments de l'actif en immobilisé puis circulant.",
        "Calculer le total de l'actif, puis en déduire les capitaux propres si le passif est incomplet.",
        "Vérifier : total actif = total passif. Sinon, chercher une erreur de classement ou un élément oublié.",
      ],
    },
    {
      type: "formula",
      title: "Relations clés",
      expression: "Total actif = Total passif\nCapitaux propres = Capital + Réserves + Résultat\nRésultat = Produits − Charges",
      note: "Si le résultat est négatif (perte), il diminue les capitaux propres et figure au passif avec le signe −.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "Pièges de l'exercice type bac",
      text: "Le découvert bancaire est une dette (passif), pas de la trésorerie. Un client qui doit de l'argent est une créance (actif), jamais une ressource. Ne jamais additionner les deux colonnes puis diviser : l'égalité doit être démontrée poste par poste.",
    },
  ],
  keyPoints: [
    "Actif = emplois, passif = ressources, et les deux totaux sont égaux.",
    "Immobilisations à l'actif, emprunts et fournisseurs au passif.",
    "Capitaux propres = capital + réserves + résultat.",
    "Le résultat relie le bilan et le compte de résultat.",
  ],
  pitfalls: [
    "Classer un emprunt à l'actif parce qu'il a fait entrer de l'argent.",
    "Oublier le report à nouveau ou les amortissements.",
    "Confondre charge (compte de résultat) et immobilisation (bilan).",
  ],
  flashcards: [
    {
      question: "Pourquoi le bilan est-il toujours équilibré ?",
      answer: "Parce que tout emploi a nécessairement une ressource à l'origine : actif = passif par construction.",
    },
    {
      question: "Où figure un stock de marchandises ?",
      answer: "À l'actif circulant, car il est destiné à être vendu dans l'exercice.",
    },
    {
      question: "Comment se calcule le résultat ?",
      answer: "Produits − charges de l'exercice. Bénéfice si positif, perte si négatif.",
    },
  ],
  tags: ["bilan", "actif", "passif", "comptabilité", "résultat"],
};

export const lettersLessons: LessonSeed[] = [
  philoLiberte,
  philoVerite,
  francaisRoman,
  anglaisTenses,
  arabeBalagha,
  histoireTunisie,
  educationIslamique,
  economieCroissance,
  gestionBilan,
];

export const lessonsSeed: LessonSeed[] = [...scienceLessons, ...lettersLessons];

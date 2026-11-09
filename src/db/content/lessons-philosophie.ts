import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Philosophie — fiches du programme officiel de 4ème année secondaire.
 *
 * Le programme s'organise en deux grands domaines :
 *   I. L'humain entre pluralité et unité (ipséité et altérité ; singularité et
 *      universalité ; communication et systèmes symboliques)
 *   II. La science entre vérité et modélisation (dimensions, limites
 *      épistémologiques et limites philosophiques)
 * auxquels s'ajoute l'axe des valeurs pour la section Lettres, et la
 * méthodologie de l'épreuve (dissertation et analyse de texte).
 */
export const philosophieLessons: LessonSeed[] = [
  {
    slug: "philo-ipseite-alterite",
    subjectSlug: "philosophie",
    title: "L'ipséité et l'altérité : le soi, le corps et l'autre",
    chapter: "Philosophie · L'humain entre pluralité et unité",
    summary:
      "Comprendre comment je me reconnais comme moi-même (ipséité) tout en étant habité par l'autre (altérité) : le corps, la conscience, le regard d'autrui et la reconnaissance.",
    level: "Bac · Toutes sections (T1)",
    durationMin: 30,
    orderIndex: 3,
    objectives: [
      "Définir ipséité, altérité, identité et reconnaissance",
      "Montrer que l'identité personnelle se construit dans le rapport à l'autre",
      "Analyser le rôle du corps et du regard d'autrui",
      "Construire un plan sur « Autrui est-il indispensable à la connaissance de soi ? »",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Deux termes qui se répondent",
        text: "L'ipséité désigne le fait d'être soi-même, un sujet singulier et identique à travers le temps. L'altérité désigne ce qui est autre que moi. Le programme les réunit parce que l'expérience montre qu'ils ne se séparent pas : je ne me saisis comme « je » qu'en me distinguant d'un « tu », et je ne deviens moi-même qu'à travers le regard des autres.",
      },
      {
        type: "table",
        title: "Les concepts du chapitre",
        head: ["Concept", "Définition", "Question directrice"],
        rows: [
          ["Identité", "Ce qui fait qu'un être reste le même malgré les changements", "Suis-je le même à 6 ans et à 18 ans ?"],
          ["Ipséité", "Le rapport de soi à soi, la mienneté de mon expérience", "Qu'est-ce qui m'appartient en propre ?"],
          ["Altérité", "Caractère de ce qui est autre : autrui, l'étranger, l'étrange", "L'autre me menace-t-il ou me constitue-t-il ?"],
          ["Reconnaissance", "Être reconnu comme sujet par un autre sujet", "Puis-je exister sans être reconnu ?"],
        ],
      },
      {
        type: "list",
        title: "Références à mobiliser",
        items: [
          "Descartes : le cogito fonde la certitude de soi, mais laisse ouverte la question de l'existence d'autrui.",
          "Hegel : la conscience de soi se conquiert dans la lutte pour la reconnaissance ; l'autre est nécessaire à ma liberté.",
          "Sartre : « autrui est le médiateur indispensable entre moi et moi-même » ; le regard de l'autre me fige en objet.",
          "Levinas : l'altérité d'autrui est irréductible, elle fonde une responsabilité éthique avant toute connaissance.",
          "Merleau-Ponty : je suis mon corps, l'expérience du corps propre est le socle de l'ipséité.",
        ],
      },
      {
        type: "steps",
        title: "Méthode — plan sur « Autrui est-il indispensable à la connaissance de soi ? »",
        items: [
          "Introduction : partir d'un exemple vécu (seul en chambre, je doute de l'image que j'ai de moi), formuler le paradoxe, annoncer la problématique.",
          "Thèse : la conscience de soi semble immédiate et solitaire (cogito cartésien, introspection).",
          "Antithèse : cette conscience est en réalité médiatisée par autrui (Hegel, Sartre) — le regard d'autrui révèle et aliène à la fois.",
          "Synthèse : la reconnaissance réciproque (Hegel, Levinas) — ni fusion, ni solitude, mais relation éthique.",
          "Conclusion : réponse claire et nuancée, sans introduire d'idée nouvelle.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ce qui fait perdre des points",
        text: "Confondre altérité et hostilité (« l'autre est toujours un ennemi »), raconter des anecdotes sans les conceptualiser, ou utiliser Hegel sans expliquer la lutte pour la reconnaissance. Chaque référence doit être suivie d'un « c'est-à-dire ».",
      },
    ],
    keyPoints: [
      "L'identité personnelle n'est pas une donnée immédiate : elle se construit.",
      "Autrui est à la fois condition et menace de la conscience de soi.",
      "Le corps est le lieu premier de l'ipséité.",
      "La reconnaissance réciproque transforme l'altérité en relation éthique.",
    ],
    pitfalls: [
      "Réduire l'altérité à la seule différence culturelle.",
      "Opposer radicalement ipséité et altérité sans penser leur lien.",
      "Citer Sartre sans expliquer le regard objectivant.",
    ],
    flashcards: [
      {
        question: "Que signifie « ipséité » ?",
        answer: "Le fait d'être soi-même, un sujet identique à travers ses changements, avec une expérience qui m'est propre.",
      },
      {
        question: "Quelle est la thèse de Hegel sur la reconnaissance ?",
        answer:
          "La conscience de soi ne se conquiert que dans le rapport à une autre conscience : la liberté exige d'être reconnue par autrui.",
      },
      {
        question: "Que veut dire Sartre par « autrui est le médiateur indispensable » ?",
        answer:
          "Je ne peux me connaître qu'à travers le regard d'autrui : cet autre me révèle à moi-même tout en risquant de me figer en objet.",
      },
    ],
    tags: ["philosophie", "ipséité", "altérité", "autrui", "reconnaissance"],
  },
  {
    slug: "philo-conscience-inconscient",
    subjectSlug: "philosophie",
    title: "La conscience et l'inconscient",
    chapter: "Philosophie · L'humain entre pluralité et unité",
    summary:
      "La conscience suffit-elle à définir le sujet ? L'hypothèse de l'inconscient déplace la question du « je » : elle interroge la transparence à soi, la responsabilité et la liberté.",
    level: "Bac · Toutes sections (T1)",
    durationMin: 30,
    orderIndex: 4,
    objectives: [
      "Distinguer conscience immédiate, conscience réflexive et conscience morale",
      "Exposer l'hypothèse de l'inconscient psychique et ses preuves cliniques",
      "Discuter la portée de l'inconscient sur la liberté et la responsabilité",
      "Construire un plan sur « Suis-je ce que j'ai conscience d'être ? »",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Un sujet qui n'est pas transparent à lui-même",
        text: "L'expérience ordinaire du lapsus, du rêve, de l'acte manqué ou du symptôme suggère qu'il y a en moi des pensées qui agissent sans que je les connaisse. La question n'est donc pas « ai-je un inconscient ? » mais « que devient la responsabilité du sujet si une part de lui-même lui échappe ? ».",
      },
      {
        type: "table",
        title: "Trois niveaux de conscience",
        head: ["Type de conscience", "Objet", "Exemple"],
        rows: [
          ["Immédiate", "Objet perçu, sensation", "Je perçois cette table, ce bruit"],
          ["Réflexive", "Mes propres états", "Je me sais en train de percevoir"],
          ["Morale", "La valeur de mes actes", "Je me reproche telle parole"],
        ],
      },
      {
        type: "list",
        title: "Références et ce qu'elles apportent au débat",
        items: [
          "Descartes : la conscience est la marque du sujet pensant — doute méthodique et certitude du cogito.",
          "Locke / Kant : la conscience réflexive fonde l'identité personnelle et la dignité morale.",
          "Leibniz : les petites perceptions inconscientes n'en sont pas moins réelles.",
          "Freud : l'inconscient psychique est le siège de désirs refoulés qui influencent la conduite ; la cure en permet la prise de conscience.",
          "Sartre : refus de l'inconscient comme « mauvaise foi » ; la conscience est toujours présente à elle-même, la responsabilité reste totale.",
        ],
      },
      {
        type: "steps",
        title: "Méthode — le plan en trois temps",
        items: [
          "Thèse : la conscience fait le sujet ; elle est la condition de la liberté et de la responsabilité (Descartes, Kant).",
          "Antithèse : l'existence de l'inconscient psychique dissout l'idée d'une transparence à soi (Freud, Leibniz).",
          "Synthèse : la distinction entre inconscient descriptif et inconscient psychique (Sartre) ; la conscience comme tâche, conquête plutôt que donnée.",
          "Conclusion : la liberté ne se mesure pas à la transparence totale mais à la capacité de se comprendre et de se transformer.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Réflexe d'argumentation",
        text: "Un bon devoir ne défend pas « je crois à l'inconscient » : il montre en quoi l'hypothèse est recevable, puis ce qu'elle coûte (la responsabilité). C'est l'articulation entre les deux qui fait la note.",
      },
    ],
    keyPoints: [
      "La conscience réflexive distingue le sujet de ses états et fonde l'identité personnelle.",
      "L'inconscient psychique se manifeste par des formations (rêve, acte manqué, symptôme).",
      "L'hypothèse freudienne déplace la question de la responsabilité morale.",
      "Sartre refuse l'inconscient et réaffirme la responsabilité du sujet.",
    ],
    pitfalls: [
      "Confondre inconscient psychique freudien et inconscient physiologique (réflexe).",
      "Faire de Freud un défenseur de l'irresponsabilité totale.",
      "Oublier de traiter la question de la responsabilité dans la conclusion.",
    ],
    flashcards: [
      {
        question: "Comment Freud repère-t-il l'inconscient ?",
        answer: "Par ses formations : rêves, lapsus, actes manqués, symptômes — autant de manifestations décalées d'un désir refoulé.",
      },
      {
        question: "Quel est le reproche de Sartre à l'hypothèse de l'inconscient ?",
        answer:
          "Elle dédouane le sujet de sa responsabilité : il y voit une mauvaise foi, la conscience étant toujours plus ou moins présente à elle-même.",
      },
      {
        question: "Quelle différence entre conscience immédiate et conscience réflexive ?",
        answer:
          "La première porte sur l'objet perçu, la seconde revient sur le sujet lui-même, sur ses propres états.",
      },
    ],
    tags: ["philosophie", "conscience", "inconscient", "Freud", "responsabilité"],
  },
  {
    slug: "philo-histoire",
    subjectSlug: "philosophie",
    title: "L'histoire : sens, mémoire et condition historique",
    chapter: "Philosophie · L'humain entre pluralité et unité",
    summary:
      "L'homme est un être historique : que peut-on connaître du passé, l'histoire a-t-elle un sens, et quelle est la différence entre histoire et mémoire ?",
    level: "Bac · Toutes sections (T2)",
    durationMin: 28,
    orderIndex: 5,
    objectives: [
      "Distinguer histoire (science) et mémoire (vécu collectif)",
      "Examiner les thèses du sens et de la fin de l'histoire",
      "Réfléchir au rapport entre progrès et catastrophe",
      "Construire un plan sur « L'histoire a-t-elle un sens ? »",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Connaître le passé et non simplement s'en souvenir",
        text: "L'histoire est une connaissance qui suppose des sources, une méthode critique et l'interprétation d'un historien situé dans son propre présent. La mémoire, elle, est un rapport vécu et affectif au passé, fondateur d'identité. La question philosophique est de savoir si la science historique peut atteindre une vérité objective ou si elle reste toujours une reconstruction.",
      },
      {
        type: "table",
        title: "Sens de l'histoire : trois grandes positions",
        head: ["Position", "Thèse", "Auteur"],
        rows: [
          ["Providentialiste", "L'histoire réalise un plan divin", "Saint Augustin, Bossuet"],
          ["Philosophie de l'histoire", "L'histoire avance par la raison vers la liberté", "Hegel, Kant"],
          ["Critique", "Aucun sens donné : ni nécessité ni finalité", "Popper, Aron, Lyotard"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — plan sur « L'histoire a-t-elle un sens ? »",
        items: [
          "Introduction : le mot « sens » est ambigu (signification et direction), le préciser est déjà la moitié du devoir.",
          "Partie 1 : oui, l'histoire semble orientée — progrès des sciences, des droits, progrès de la liberté (Kant, Hegel).",
          "Partie 2 : mais la notion de progrès est mise en échec par les catastrophes du XXe siècle ; l'histoire ne se répète pas moins (Adorno, critique de la philosophie de l'histoire).",
          "Partie 3 : sens construit plutôt que donné — l'histoire comme discipline scientifique (méthode) et comme responsabilité présente (mémoire).",
          "Conclusion : répondre au problème posé en distinguant les deux sens du mot « sens ».",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne pas confondre progression et progrès",
        text: "Le progrès des techniques n'entraîne pas mécaniquement un progrès moral. C'est exactement l'argument qui permet la critique de la philosophie de l'histoire : le XXe siècle est celui du progrès technique et des génocides.",
      },
    ],
    keyPoints: [
      "L'histoire est une science qui interprète des sources, la mémoire est un rapport vécu au passé.",
      "Kant et Hegel donnent un sens rationnel à l'histoire ; Popper et Aron le contestent.",
      "Progrès technique ≠ progrès moral.",
      "Le devoir de mémoire est une obligation présente, non une nostalgie.",
    ],
    pitfalls: [
      "Confondre sens (signification) et sens (direction).",
      "Décrire des événements au lieu de les problématiser.",
      "Conclure que l'histoire n'a aucun intérêt au motif qu'elle n'a pas de sens unique.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre histoire et mémoire ?",
        answer:
          "L'histoire est un savoir critique fondé sur des sources ; la mémoire est un rapport affectif et identitaire au passé, porté par un groupe.",
      },
      {
        question: "Quel est l'argument principal contre l'idée d'un progrès nécessaire ?",
        answer: "L'existence, au XXe siècle, de destructions de masse au sein de sociétés techniquement avancées : la technique ne garantit pas la moralité.",
      },
      {
        question: "Que veut dire « la condition historique de l'humain » ?",
        answer:
          "Que l'homme ne peut se comprendre hors du temps, des héritages et des transmissions : il est produit par une histoire qu'il contribue à faire.",
      },
    ],
    tags: ["philosophie", "histoire", "mémoire", "progrès", "sens"],
  },
  {
    slug: "philo-singularite-universalite",
    subjectSlug: "philosophie",
    title: "La singularité et l'universalité : identité, différence et culture",
    chapter: "Philosophie · L'humain entre pluralité et unité",
    summary:
      "Comment penser ensemble l'appartenance à une culture particulière et la prétention à l'universel ? Entre relativisme culturel, ethnocentrisme et droits universels.",
    level: "Bac · Toutes sections (T2)",
    durationMin: 30,
    orderIndex: 6,
    objectives: [
      "Définir culture, civilisation, ethnocentrisme et relativisme",
      "Discuter la prétention d'une culture à l'universel",
      "Analyser la tension entre différence et égalité",
      "Construire un plan sur « Peut-on parler d'une vérité universelle ? »",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "L'universel n'est pas l'uniforme",
        text: "Reconnaître une valeur universelle, c'est affirmer qu'elle vaut pour tout être humain, quelles que soient sa culture et son époque. Ce n'est pas affirmer que tout le monde vit de la même façon. Le vrai conflit est donc entre un universalisme abstrait qui ignore les différences et un relativisme absolu qui interdit toute critique.",
      },
      {
        type: "table",
        title: "Trois attitudes face à la différence",
        head: ["Attitude", "Thèse", "Limite"],
        rows: [
          ["Ethnocentrisme", "Ma culture est la mesure de l'humain", "Méprise les autres sociétés et légitime la domination"],
          ["Relativisme", "Chaque culture n'a de valeur que pour elle-même", "Interdit de condamner quoi que ce soit (même l'esclavage)"],
          ["Universalisme critique", "Des exigences valent pour tous, mais se construisent dans le débat", "Doit faire la preuve de son universalité, non la postuler"],
        ],
      },
      {
        type: "list",
        title: "Références utiles",
        items: [
          "Montaigne (Des cannibales) : critique de l'ethnocentrisme par le regard inversé.",
          "Lévi-Strauss : la diversité des cultures est une richesse ; il critique l'« humanisme » qui exclut.",
          "Todorov : l'universel se reconnaît dans la capacité de comprendre l'autre.",
          "Kant : le principe moral est universel parce que le sujet peut le penser comme loi pour tous.",
        ],
      },
      {
        type: "steps",
        title: "Méthode — problématiser la question",
        items: [
          "Distinguer le fait (les cultures sont différentes) et le droit (une norme peut-elle valoir pour toutes ?).",
          "Éviter deux pièges symétriques : « toutes les cultures se valent » et « seule la mienne est vraie ».",
          "Montrer que la diversité présuppose elle-même des invariants (langage, prohibition de l'inceste, même chez Lévi-Strauss).",
          "Défendre un universel ouvert : ce qui se construit par la parole donnée aux autres.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Formule qui sauve un devoir",
        text: "« L'universel n'est pas ce que tout le monde croit, mais ce que tous peuvent reconnaître comme valable. » Elle permet de sortir du relativisme sans retomber dans l'ethnocentrisme.",
      },
    ],
    keyPoints: [
      "Singleton : la culture est constitutive de l'humain, il n'existe pas d'homme « naturel ».",
      "L'ethnocentrisme et le relativisme sont deux excès symétriques.",
      "L'universalisme critique distingue l'universel (valeurs) et l'uniforme (pratiques).",
      "La diversité culturelle s'appuie sur des invariants anthropologiques.",
    ],
    pitfalls: [
      "Confondre culture et nature.",
      "Justifier le relativisme par la tolérance, ce qui l'auto-contredit.",
      "Citer Lévi-Strauss sans parler de la critique de la hiérarchisation des cultures.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce que l'ethnocentrisme ?",
        answer: "L'attitude consistant à juger les autres cultures à partir des seuls critères de la sienne, tenue pour la norme.",
      },
      {
        question: "Quelle est la limite logique du relativisme absolu ?",
        answer:
          "Il s'auto-contredit : affirmer que « toute norme est relative » revient à poser une norme universelle.",
      },
      {
        question: "Que signifie « l'universel n'est pas l'uniforme » ?",
        answer:
          "Une exigence peut valoir pour tous sans que tous vivent ni pensent de la même manière : l'universel concerne les principes, l'uniforme les pratiques.",
      },
    ],
    tags: ["philosophie", "culture", "universel", "relativisme", "identité"],
  },
  {
    slug: "philo-communication-symbolique",
    subjectSlug: "philosophie",
    title: "La communication et les systèmes symboliques : langue, image et sacré",
    chapter: "Philosophie · L'humain entre pluralité et unité",
    summary:
      "Ce que la langue, l'image et le sacré font de nous : des êtres de symboles. Comment communiquer sans réduire l'autre, et ce que le symbole révèle de l'humain.",
    level: "Bac · Toutes sections (T2)",
    durationMin: 28,
    orderIndex: 7,
    objectives: [
      "Définir signe, symbole et langage",
      "Montrer que l'humain est un être symbolique",
      "Analyser les effets de l'image sur la perception et le jugement",
      "Discuter le rôle du sacré dans le lien social",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Le langage comme condition de la pensée",
        text: "Parler n'est pas seulement transmettre une pensée déjà formée : c'est la former. Les mots donnent des contours aux émotions, découpent le réel en catégories, et permettent de parler de ce qui est absent, de mentir, de se contredire. C'est le sens de l'expression « système symbolique » : un ensemble de signes qui produisent du sens et du lien social.",
      },
      {
        type: "table",
        title: "Les systèmes symboliques du programme",
        head: ["Système", "Ce qu'il produit", "Thème de réflexion"],
        rows: [
          ["Langue", "Concepts et communication", "Les mots limitent-ils la pensée ?"],
          ["Image", "Représentation et émotion", "Le pouvoir des images sur nos jugements"],
          ["Sacré", "Séparation et communauté", "Le sacré fonde-t-il ou fragmente-t-il le lien social ?"],
          ["Mythe / rite", "Récit fondateur et identité commune", "Le mythe n'est-il qu'une erreur ancienne ?"],
        ],
      },
      {
        type: "list",
        title: "Références à convoquer",
        items: [
          "Saussure : le signe unit un signifiant (forme) et un signifié (concept) ; aucune langue n'a de privilège sur une autre.",
          "Cassirer : l'homme est un animal symbolique, il vit dans un univers symbolique (langue, mythe, science).",
          "Wittgenstein : les limites de mon langage sont les limites de mon monde.",
          "Durkheim : l'effervescence rituelle produit l'identité collective.",
          "Benjamin : l'image reproductible transforme le rapport à l'œuvre et au réel.",
        ],
      },
      {
        type: "steps",
        title: "Méthode — analyser une question sur l'image",
        items: [
          "Partir d'un exemple concret (une photo de presse, un filtre sur les réseaux sociaux).",
          "Distinguer l'image comme représentation (elle renvoie à autre chose) et comme production (elle est construite, cadrée, choisie).",
          "Montrer la puissance émotionnelle de l'image, puis sa vulnérabilité à la manipulation.",
          "Conclure sur la nécessité d'un regard critique : l'image ne parle pas seule, elle demande à être lue.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreur fréquente",
        text: "Réduire la communication à l'information (« bien communiquer = bien transmettre des données »). En philosophie, communiquer est une relation entre sujets qui peut réussir ou échouer : on ne communique pas avec un objet.",
      },
    ],
    keyPoints: [
      "Le langage n'exprime pas seulement la pensée, il la rend possible.",
      "Les systèmes symboliques (langue, image, sacré) structurent la vie sociale.",
      "L'image est une construction : elle peut informer comme manipuler.",
      "La communication suppose la reconnaissance de l'autre comme sujet.",
    ],
    pitfalls: [
      "Confondre signe et symbole (le symbole est motivé, le signe arbitraire).",
      "Traiter l'image sans exemple concret.",
      "Faire de la technique le principal critère d'évaluation de la communication.",
    ],
    flashcards: [
      {
        question: "Que dit le signe chez Saussure ?",
        answer: "Le signe unit un signifiant (la forme, le son écrit) et un signifié (le concept), de façon arbitraire.",
      },
      {
        question: "Que signifie « l'homme est un animal symbolique » (Cassirer) ?",
        answer:
          "Que l'humain ne vit pas directement dans la nature mais dans un réseau de symboles (langue, mythe, art, science) qu'il produit lui-même.",
      },
      {
        question: "Pourquoi l'image n'est-elle jamais neutre ?",
        answer: "Parce qu'elle est toujours cadrée, choisie et diffusée dans un contexte : elle suppose des intentions et des effets.",
      },
    ],
    tags: ["philosophie", "langage", "symbole", "image", "sacré"],
  },
  {
    slug: "philo-modelisation",
    subjectSlug: "philosophie",
    title: "Les dimensions de la modélisation scientifique",
    chapter: "Philosophie · La science entre vérité et modélisation",
    summary:
      "Comprendre ce que fait réellement une science : construire des modèles, c'est-à-dire des reprises contrôlées du réel, puis les éprouver par l'expérience et le calcul.",
    level: "Bac · Toutes sections (T3)",
    durationMin: 30,
    orderIndex: 8,
    objectives: [
      "Définir modèle, modélisation et hypothèse",
      "Distinguer expérience, mesure et simulation",
      "Montrer que le modèle n'est pas une copie du réel",
      "Construire un plan sur « La science décrit-elle le réel ou le reconstruit-elle ? »",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Modéliser, c'est choisir",
        text: "Un modèle est une construction théorique qui isole les variables jugées pertinentes et néglige les autres. Le modèle de la chute des corps néglige les frottements ; celui de la génétique suppose des populations idéales. Modéliser, c'est donc décider de ce qui compte — et c'est précisément là que se joue la vérité scientifique.",
      },
      {
        type: "table",
        title: "Les étapes de la démarche scientifique",
        head: ["Étape", "Ce qui se passe", "Risque"],
        rows: [
          ["Observation", "On choisit ce qu'on observe et comment", "Biais de sélection"],
          ["Hypothèse", "On formule une proposition testable", "Hypothèse ad hoc, non réfutable"],
          ["Modélisation", "On traduit en relations mathématiques ou informatiques", "Simplification abusive"],
          ["Expérience", "On teste sur le réel avec mesures et incertitudes", "Confondre corrélation et causalité"],
          ["Validation", "On confronte les prévisions aux résultats", "Refus de rejeter une hypothèse fausse"],
        ],
      },
      {
        type: "list",
        title: "Références et notions",
        items: [
          "Bachelard : la science se construit contre l'opinion ; elle rompt avec les évidences premières.",
          "Popper : une théorie scientifique doit être réfutable ; la vérification ne suffit pas.",
          "Kuhn : la science progresse par paradigmes et révolutions, non par simple accumulation.",
          "Weber : la science est axiologiquement neutre, mais le choix du problème ne l'est pas.",
        ],
      },
      {
        type: "steps",
        title: "Méthode — plan sur le rôle du modèle",
        items: [
          "Partie 1 : la science vise une connaissance objective du réel (mesure, mathématisation, reproductibilité).",
          "Partie 2 : cette connaissance passe toujours par une construction — modèle, hypothèses, simplifications.",
          "Partie 3 : la scientificité ne réside pas dans la copie du réel, mais dans la fécondité et la réfutabilité du modèle.",
          "Conclusion : le réel est approché, jamais possédé ; la vérité scientifique est provisoire et contrôlée.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Exemple à réutiliser",
        text: "La modélisation du climat : on construit des modèles numériques, on les teste sur le passé, on donne des intervalles de prévision. Cela montre à la fois la puissance du modèle et son caractère construit, sans autoriser à conclure que « c'est juste une opinion ».",
      },
    ],
    keyPoints: [
      "Un modèle est une construction : il sélectionne des variables et en néglige d'autres.",
      "La science progresse par hypothèses testables et réfutables (Popper).",
      "Mesurer, c'est toujours mesurer avec une incertitude.",
      "Objectivité ≠ neutralité : le choix des questions engage des valeurs.",
    ],
    pitfalls: [
      "Croire que le modèle est une photographie du réel.",
      "Confondre réfutabilité et réfutation.",
      "Conclure du caractère construit au relativisme (« toutes les théories se valent »).",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'un modèle scientifique ?",
        answer:
          "Une construction théorique qui représente certains aspects du réel à partir d'hypothèses et de simplifications choisies, et qui permet de faire des prévisions testables.",
      },
      {
        question: "Quel critère Popper retient-il pour la scientificité ?",
        answer: "La réfutabilité : une théorie doit pouvoir être mise en échec par une expérience possible.",
      },
      {
        question: "Pourquoi un modèle n'est-il pas une copie du réel ?",
        answer: "Parce qu'il isole et simplifie : il ne retient que les variables jugées pertinentes pour la question posée.",
      },
    ],
    tags: ["philosophie", "science", "modèle", "Popper", "épistémologie"],
  },
  {
    slug: "philo-limites-science",
    subjectSlug: "philosophie",
    title: "Les limites de la science : épistémologiques et philosophiques",
    chapter: "Philosophie · La science entre vérité et modélisation",
    summary:
      "Deux familles de limites : celles qui tiennent à la méthode (réduction, histoire, systèmes techniques) et celles qui touchent au sens (vérité, responsabilité, existence).",
    level: "Bac · Toutes sections (T3)",
    durationMin: 30,
    orderIndex: 9,
    objectives: [
      "Distinguer limites épistémologiques et limites philosophiques",
      "Analyser la réduction scientificiste et son coût",
      "Interroger la responsabilité du scientifique",
      "Construire un plan sur « La science peut-elle tout expliquer ? »",
    ],
    blocks: [
      {
        type: "table",
        title: "Les deux familles de limites",
        head: ["Type de limite", "Nature", "Exemples de questions"],
        rows: [
          ["Épistémologique", "Tient à la méthode elle-même", "La réduction fait-elle perdre l'essentiel ? Le modèle vieillit-il ?"],
          ["Philosophique", "Tient au sens et aux valeurs", "La science dit-elle comment agir ? Que faire de ses pouvoirs ?"],
        ],
      },
      {
        type: "paragraph",
        title: "La réduction : force et coût",
        text: "Réduire un phénomène complexe à ses composants est la condition même du progrès scientifique : on ne peut pas étudier la conscience sans étudier le cerveau. Mais la réduction devient abusive quand elle affirme que le niveau réduit est le seul réel : dire que « l'amour n'est que de la chimie » confond la condition et la signification.",
      },
      {
        type: "list",
        title: "Trois limites philosophiques à développer",
        items: [
          "La vérité : la science produit des énoncés vrais sur les faits, mais pas sur les valeurs (Hume : on ne déduit pas un devoir d'un fait).",
          "La responsabilité : le scientifique ne maîtrise pas les usages de ses découvertes (bombe atomique, manipulations génétiques) ; d'où la nécessité d'une éthique de la responsabilité (Jonas).",
          "Le sens : la science ne répond pas aux questions « pourquoi vivre ? », « qu'est-ce que le juste ? » — non par faiblesse, mais par méthode.",
        ],
      },
      {
        type: "steps",
        title: "Méthode — plan sur « La science peut-elle tout expliquer ? »",
        items: [
          "Partie 1 : oui, son domaine s'étend sans cesse ; ce qui n'est pas encore expliqué n'est pas inexpliquable (argument du progrès).",
          "Partie 2 : non, elle rencontre des limites structurelles — réduction, incertitude, historicité des modèles.",
          "Partie 3 : et surtout, l'explication n'est pas la justification : expliquer n'est pas prescrire ; la science ne remplace ni l'éthique ni la politique.",
          "Conclusion : distinguer « expliquer » et « comprendre », « fait » et « valeur ».",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux caricatures à éviter",
        text: "Le scientisme (« la science résoudra tout, y compris les problèmes moraux ») et l'obscurantisme (« la science ne sert à rien, tout se vaut »). Le devoir doit tenir la position médiane : autonomie de la science dans son ordre, subordination à l'éthique dans l'ordre de l'action.",
      },
    ],
    keyPoints: [
      "Réduire est nécessaire, réductionnisme est abusif.",
      "On ne déduit pas une norme d'un fait (Hume).",
      "La responsabilité du chercheur est engagée par les usages possibles.",
      "La science explique ; elle ne justifie pas les valeurs.",
    ],
    pitfalls: [
      "Confondre limites provisoires et limites structurelles.",
      "Attribuer à la science la réponse aux questions de sens.",
      "Opposer brutalement science et philosophie au lieu d'articuler leurs domaines.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre limite épistémologique et limite philosophique ?",
        answer:
          "La première concerne la méthode et la portée de la connaissance scientifique ; la seconde concerne le sens, les valeurs et la responsabilité.",
      },
      {
        question: "Que signifie le passage du fait au droit chez Hume ?",
        answer:
          "Qu'on ne peut pas déduire une prescription (ce qu'il faut faire) d'une description (ce qui est) sans commettre un saut logique.",
      },
      {
        question: "Pourquoi la réduction est-elle à la fois nécessaire et risquée ?",
        answer:
          "Nécessaire pour analyser, risquée quand elle prétend que le niveau réduit épuise la réalité de ce qui est étudié.",
      },
    ],
    tags: ["philosophie", "science", "réduction", "responsabilité", "éthique"],
  },
  {
    slug: "philo-methode-dissertation",
    subjectSlug: "philosophie",
    title: "La dissertation philosophique : analyser, problématiser, argumenter",
    chapter: "Philosophie · Méthodologie",
    summary:
      "La méthode complète de l'épreuve : décoder le sujet, formuler un problème, construire un plan progressif, argumenter avec des références expliquées et rédiger introduction et conclusion.",
    level: "Bac · Toutes sections",
    durationMin: 34,
    orderIndex: 10,
    objectives: [
      "Analyser les termes du sujet et repérer le présupposé",
      "Formuler une problématique et un plan progressif",
      "Insérer une référence philosophique au service d'un argument",
      "Rédiger introduction, transitions et conclusion",
    ],
    blocks: [
      {
        type: "steps",
        title: "Étape 1 — analyser le sujet (10 minutes)",
        items: [
          "Souligner les mots-clés et définir chacun précisément (ne jamais se contenter du sens courant).",
          "Repérer la forme de la question : « est-ce que… ? » (oui/non), « peut-on… ? » (capacité et droit), « faut-il… ? » (obligation).",
          "Chercher le présupposé : « La liberté consiste-t-elle à faire ce que l'on veut ? » suppose déjà que liberté et désir sont liés.",
          "Reformuler la question en une phrase personnelle : c'est la meilleure preuve de compréhension.",
        ],
      },
      {
        type: "steps",
        title: "Étape 2 — problématiser et planifier (10 minutes)",
        items: [
          "Énoncer le paradoxe : deux réponses opposées, toutes deux défendables.",
          "Construire un plan progressif : thèse, objection, dépassement — pas un catalogue de doctrines.",
          "Associer à chaque partie un argument, un exemple et une référence expliquée.",
          "Prévoir les transitions : chaque partie doit répondre à la précédente.",
        ],
      },
      {
        type: "table",
        title: "Structure d'une copie",
        head: ["Partie de la copie", "Contenu attendu", "Durée indicative"],
        rows: [
          ["Introduction", "Accroche concrète, définition des termes, problème, annonce du plan", "15 lignes"],
          ["Première partie", "Thèse claire + arguments + exemples + référence", "1/3 de la copie"],
          ["Transition", "Limite de la thèse, question nouvelle", "3 à 4 lignes"],
          ["Deuxième partie", "Objection argumentée, nouvelle référence", "1/3 de la copie"],
          ["Troisième partie", "Dépassement, distinction conceptuelle", "1/4 de la copie"],
          ["Conclusion", "Réponse explicite à la question, bilan", "10 lignes"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les cinq erreurs qui coûtent le plus",
        text: "Réciter un cours sans rapport avec le sujet ; empiler des citations non expliquées ; prendre parti sans argumenter ; oublier de répondre à la question dans la conclusion ; raconter une expérience personnelle à la place d'un exemple conceptuel.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Entraînement express",
        text: "« Peut-on vivre sans la vérité ? » : en 20 minutes, écris uniquement l'introduction et le plan détaillé (arguments + références). C'est l'exercice le plus rentable pour progresser vite.",
      },
    ],
    keyPoints: [
      "Définir les termes du sujet est un travail philosophique, pas un préambule.",
      "Un plan progressif répond à la question au lieu de la contourner.",
      "Une référence doit être expliquée et mise au service d'un argument.",
      "La conclusion répond explicitement, sans idée nouvelle.",
    ],
    pitfalls: [
      "Confondre plan « oui / non » et plan progressif.",
      "Utiliser une citation comme décoration.",
      "Rédiger des parties sans transition logique.",
    ],
    flashcards: [
      {
        question: "Que faire des mots-clés du sujet ?",
        answer: "Les définir un par un, puis montrer le lien problématique entre eux avant d'annoncer le plan.",
      },
      {
        question: "Qu'est-ce qu'un plan progressif ?",
        answer:
          "Un plan où chaque partie résout la difficulté laissée par la précédente : thèse, objection, dépassement.",
      },
      {
        question: "Comment intégrer une citation ?",
        answer:
          "En l'expliquant : auteur, sens précis, puis fonction dans l'argument (« c'est-à-dire…, ce qui montre que… »).",
      },
    ],
    tags: ["philosophie", "dissertation", "méthode", "problématique", "bac"],
  },
  {
    slug: "philo-analyse-texte",
    subjectSlug: "philosophie",
    title: "L'analyse de texte philosophique",
    chapter: "Philosophie · Méthodologie",
    summary:
      "Lire un texte philosophique sans le paraphraser : dégager la thèse, reconstruire l'argumentation, expliquer les concepts et discuter la portée du texte.",
    level: "Bac · Toutes sections",
    durationMin: 32,
    orderIndex: 11,
    objectives: [
      "Dégager la thèse d'un texte et la formuler en une phrase",
      "Reconstruire le mouvement argumentatif en parties numérotées",
      "Expliquer les termes techniques du texte par le texte lui-même",
      "Discuter la position de l'auteur avec un contre-argument",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Analyser n'est pas résumer",
        text: "Le résumé redit le texte ; l'analyse explique comment le texte produit sa thèse. Il faut donc trois gestes distincts : identifier ce que l'auteur affirme, montrer par quels arguments il y parvient, puis prendre du recul en discutant la portée de cette position.",
      },
      {
        type: "steps",
        title: "Méthode en quatre temps",
        items: [
          "Lecture active : numéroter les phrases, entourer les connecteurs logiques (or, donc, mais, car) qui indiquent la structure.",
          "Thèse : la formuler en une phrase claire, différente de la première phrase du texte.",
          "Explication linéaire : suivre le mouvement du texte paragraphe par paragraphe, en expliquant chaque concept dans son contexte.",
          "Discussion : confronter la thèse à une objection philosophique ou à une expérience qui la limite.",
        ],
      },
      {
        type: "table",
        title: "Connecteurs et ce qu'ils annoncent",
        head: ["Connecteur", "Fonction", "À faire dans l'analyse"],
        rows: [
          ["« Or »", "Introduit un fait qui contredit une attente", "Montrer le renversement"],
          ["« Donc / par conséquent »", "Tire une conséquence", "Vérifier la validité du raisonnement"],
          ["« Mais »", "Marque une restriction ou une objection", "Signaler le nuancement de la thèse"],
          ["« C'est-à-dire »", "Reformule pour préciser", "Expliquer le concept en jeu"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le piège du hors-sujet",
        text: "Raconter la doctrine complète de l'auteur au lieu d'analyser le texte donné fait perdre l'essentiel des points : l'explication doit rester ancrée dans les phrases du texte, citées entre guillemets.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Test de validation",
        text: "Si ton analyse pouvait s'appliquer à n'importe quel texte du même auteur, c'est qu'elle n'analyse pas ce texte-ci. Chaque paragraphe de ta copie doit renvoyer à un passage précis.",
      },
    ],
    keyPoints: [
      "Thèse, arguments, conclusion : trois éléments à identifier avant de rédiger.",
      "Expliquer un concept, c'est montrer son rôle dans l'argumentation du texte.",
      "La discussion évalue la portée de la thèse, elle ne la récite pas.",
      "Toute affirmation de la copie doit être adossée à une citation du texte.",
    ],
    pitfalls: [
      "Paraphraser phrase après phrase sans dégager la structure.",
      "Oublier la discussion finale et perdre les points de la dernière partie.",
      "Confondre l'auteur du texte avec un auteur cité par lui.",
    ],
    flashcards: [
      {
        question: "Quelle est la première chose à dégager d'un texte philosophique ?",
        answer: "Sa thèse, formulée en une phrase claire, distincte de la première phrase du texte.",
      },
      {
        question: "À quoi servent les connecteurs logiques dans l'analyse ?",
        answer:
          "Ils révèlent la structure argumentative (opposition, conséquence, restriction) et indiquent comment découper l'explication.",
      },
      {
        question: "Que doit contenir la partie « discussion » ?",
        answer:
          "Une objection argumentée ou une limite de la thèse de l'auteur, appuyée sur un exemple ou une autre position philosophique.",
      },
    ],
    tags: ["philosophie", "analyse de texte", "méthode", "argumentation", "bac"],
  },
];

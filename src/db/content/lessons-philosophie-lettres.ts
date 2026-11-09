import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Philosophie — programme complet de la 4ème année Lettres : la condition
 * humaine, l'art, le sacré, la morale, la politique, la science et la
 * méthodologie de l'épreuve (dissertation et commentaire de texte).
 */
export const philosophieLettresLessons: LessonSeed[] = [
  {
    slug: "philo-histoire-condition",
    subjectSlug: "philosophie",
    title: "L'histoire et la condition historique de l'humain",
    chapter: "L'humain · Histoire",
    summary:
      "Distinguer le récit historique, la connaissance historique et la condition historique : l'humain est un être qui se sait dans le temps.",
    level: "Bac · 4e Lettres (T1)",
    durationMin: 28,
    orderIndex: 20,
    objectives: [
      "Distinguer histoire-récit et histoire-savoir",
      "Analyser la notion de sens de l'histoire",
      "Comprendre la condition historique",
      "Éviter le relativisme historique",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Deux sens du mot « histoire »",
        text: "L'histoire est d'abord la suite des événements passés (res gestae), puis le récit et la connaissance que nous en produisons (historia rerum gestarum). Cette dualité est centrale : le passé existe indépendamment de nous, mais sa connaissance est toujours une reconstruction, avec des sources, des hypothèses et des choix d'historien.",
      },
      {
        type: "table",
        title: "Les problèmes philosophiques",
        head: ["Problème", "Question", "Position à connaître"],
        rows: [
          ["Sens de l'histoire", "L'histoire a-t-elle une direction ?", "Hegel : la raison se déploie ; Popper : pas de loi prédictive"],
          ["Objectivité", "Peut-on être neutre en histoire ?", "Max Weber : le choix des valeurs oriente la question, non la preuve"],
          ["Progrès", "Le progrès est-il moral ?", "Le progrès technique n'entraîne pas le progrès moral"],
          ["Mémoire", "Devoir de mémoire ou histoire ?", "Ricoeur : la mémoire doit être mise à l'épreuve du récit critique"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — traiter un sujet sur l'histoire",
        items: [
          "Distinguer les sens du terme dans le sujet (événements, récit, expérience vécue).",
          "Problématiser : si l'histoire est récit, qui écrit et selon quelles valeurs ?",
          "Développer : la connaissance historique est possible (sources, critique, méthode).",
          "Objeter : elle est toujours située, donc interprétative.",
          "Dépasser : la vérité historique est une exigence, non un résultat définitif.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Piège classique",
        text: "« Tout récit est subjectif, donc toute histoire est fausse » : raisonnement sophistique. La subjectivité de l'historien n'annule pas la rigueur de la preuve documentaire. Nuance indispensable.",
      },
    ],
    keyPoints: [
      "Deux sens : les événements et la connaissance des événements.",
      "La connaissance historique est reconstructrice mais contrôlable.",
      "Pas de loi universelle de l'histoire (critique de Popper).",
      "La condition historique : l'humain se comprend dans le temps.",
    ],
    pitfalls: [
      "Confondre histoire et mémoire.",
      "Adopter un relativisme absolu.",
      "Oublier la dimension critique des sources.",
    ],
    flashcards: [
      {
        question: "Quels sont les deux sens du mot histoire ?",
        answer: "La suite des événements passés et le récit/connaissance qu'on en construit.",
      },
      {
        question: "Quelle critique Popper adresse-t-il à l'historicisme ?",
        answer: "On ne peut pas prédire l'histoire, car la croissance du savoir est imprévisible.",
      },
      {
        question: "Que signifie « condition historique » ?",
        answer: "Le fait que l'humain existe dans un temps, hérite d'un passé et oriente un avenir — il ne peut pas vivre hors de l'histoire.",
      },
    ],
    tags: ["philosophie", "histoire", "mémoire", "progrès", "condition historique"],
  },
  {
    slug: "philo-singularite-lettres",
    subjectSlug: "philosophie",
    title: "La singularité et l'universalité : identité, différence et culture",
    chapter: "L'humain · Culture",
    summary:
      "Penser l'articulation entre l'universel humain et la pluralité culturelle, entre identité singulière et appartenance collective.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 28,
    orderIndex: 21,
    objectives: [
      "Distinguer universalité et uniformité",
      "Analyser la notion de culture",
      "Penser la différence sans relativisme absolu",
      "Construire une position argumentée",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Universalité n'est pas uniformité",
        text: "Dire que tout humain est doué de raison, de langage et de dignité, c'est affirmer un universel. Dire que tous les humains doivent vivre de la même manière, c'est confondre universel et uniforme. La philosophie exige cette distinction : l'universalité est un principe, pas une norme culturelle.",
      },
      {
        type: "table",
        title: "Trois positions sur la différence",
        head: ["Position", "Thèse", "Limite"],
        rows: [
          ["Ethnocentrisme", "ma culture est la mesure de l'humain", "méconnaît les autres et justifie la domination"],
          ["Relativisme absolu", "chaque culture vaut pour elle seule", "interdit tout jugement, même sur la torture"],
          ["Universalisme critique", "des principes communs, des expressions plurielles", "exige de distinguer universel et imposé"],
        ],
      },
      {
        type: "steps",
        title: "Construire un plan",
        items: [
          "I. L'humain est singulier : chaque culture produit un monde de sens.",
          "II. Mais cette singularité n'abolit pas l'universel : langage, raison, vulnérabilité partagés.",
          "III. L'universel se construit par le dialogue et la traduction, non par l'imposition.",
          "Chaque partie : argument + exemple anthropologique ou philosophique.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Exemple à réutiliser",
        text: "Le Lévi-Strauss des Structures élémentaires montre que la prohibition de l'inceste, sous des formes différentes, se retrouve partout : une règle universelle dans des expressions plurielles. C'est l'exemple parfait du couple universalité/singularité.",
      },
    ],
    keyPoints: [
      "Universel ≠ uniforme.",
      "L'ethnocentrisme juge les autres à sa mesure.",
      "Le relativisme absolu s'auto-contredit.",
      "L'universel se construit par le dialogue.",
    ],
    pitfalls: [
      "Confondre universel et occidental.",
      "Tomber dans le relativisme intégral.",
      "Oublier les exemples anthropologiques.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre universel et uniforme ?",
        answer: "L'universel est un principe partagé, l'uniforme est une identité de forme imposée.",
      },
      {
        question: "Pourquoi le relativisme absolu est-il intenable ?",
        answer: "Parce qu'il interdit de condamner des pratiques inhumaines tout en prétendant être lui-même une vérité.",
      },
      {
        question: "Donne un exemple d'universel dans la diversité.",
        answer: "La prohibition de l'inceste : universelle sous des formes variées.",
      },
    ],
    tags: ["philosophie", "culture", "universel", "identité", "différence"],
  },
  {
    slug: "philo-langage-expression",
    subjectSlug: "philosophie",
    title: "Le langage : expression, communication et pensée",
    chapter: "L'humain · Langage",
    summary:
      "Le langage est-il un simple outil de communication ou la condition même de la pensée ?",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 27,
    orderIndex: 22,
    objectives: [
      "Distinguer langue, langage et parole",
      "Analyser le rapport langage-pensée",
      "Comprendre la performativité du langage",
      "Problématiser le mensonge et la trahison par les mots",
    ],
    blocks: [
      {
        type: "table",
        title: "Trois niveaux",
        head: ["Notion", "Définition", "Exemple"],
        rows: [
          ["Langage", "faculté humaine de symboliser", "capacité à parler"],
          ["Langue", "système social de signes", "le français, l'arabe"],
          ["Parole", "usage individuel de la langue", "ma phrase, mon accent"],
        ],
      },
      {
        type: "paragraph",
        title: "Le langage précède-t-il la pensée ?",
        text: "Deux thèses s'opposent. Pour la tradition cartésienne, la pensée existe indépendamment du langage, qui n'est qu'un vêtement. Pour Humboldt, Saussure et la philosophie contemporaine, le langage structure la pensée : ce que je ne peux pas dire, je ne le pense qu'à moitié. La position la plus défendable est intermédiaire : le langage donne forme et précision à une pensée qui ne se réduit pas à lui.",
      },
      {
        type: "list",
        title: "Trois fonctions du langage",
        items: [
          "Fonction descriptive : dire le monde (« il pleut »).",
          "Fonction expressive : dire l'état intérieur (« je souffre »).",
          "Fonction performative : faire en disant (« je promets », « je vous déclare mariés »).",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "L'argument décisif",
        text: "Le langage trahit autant qu'il exprime : « les mots me manquent » est déjà une preuve que quelque chose échappe. Cet argument permet de dépasser l'idée d'un langage simple instrument transparent.",
      },
    ],
    keyPoints: [
      "Langage, langue et parole sont trois niveaux distincts.",
      "Le langage n'est pas qu'un outil : il structure la pensée.",
      "Certains énoncés font ce qu'ils disent (performativité).",
      "Le langage exprime et trahit à la fois.",
    ],
    pitfalls: [
      "Confondre langue et langage.",
      "Opposer radicalement langage et pensée.",
      "Oublier la dimension performative.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre langue et langage ?",
        answer: "Le langage est la faculté de symboliser ; la langue est un système de signes partagé par une communauté.",
      },
      {
        question: "Qu'appelle-t-on un énoncé performatif ?",
        answer: "Un énoncé qui réalise l'action qu'il énonce, comme une promesse ou un serment.",
      },
      {
        question: "Le langage est-il un simple outil ?",
        answer: "Non : il structure la pensée et les rapports sociaux, même s'il ne l'épuise pas.",
      },
    ],
    tags: ["philosophie", "langage", "pensée", "performativité", "communication"],
  },
  {
    slug: "philo-image-reel",
    subjectSlug: "philosophie",
    title: "L'image et le rapport au réel",
    chapter: "L'humain · Image",
    summary:
      "L'image est-elle un voile qui nous éloigne du réel ou une médiation qui l'approfondit ? Analyse de la ressemblance, du simulacre et du rôle des images.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 26,
    orderIndex: 23,
    objectives: [
      "Distinguer image, ressemblance et représentation",
      "Analyser la critique platonicienne des images",
      "Comprendre la puissance émotionnelle des images",
      "Penser la responsabilité face aux images",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "L'image entre vérité et illusion",
        text: "Platon condamnait les images comme copies de copies, éloignant de l'idée. Mais l'image n'est pas seulement trompeuse : elle donne accès à ce qui ne se dit pas, elle documente, elle témoigne. La question n'est donc pas « l'image est-elle vraie ? » mais « quel rapport au réel instaure-t-elle ? ».",
      },
      {
        type: "table",
        title: "Trois rapports au réel",
        head: ["Rapport", "Fonction de l'image", "Risque"],
        rows: [
          ["Documentaire", "attester un événement", "manipulation, cadrage trompeur"],
          ["Esthétique", "donner forme à une émotion", "esthétisation du malheur"],
          ["Idolâtrique", "remplacer le réel", "simulacre, perte du sens critique"],
        ],
      },
      {
        type: "steps",
        title: "Problématiser",
        items: [
          "I. L'image est une médiation : elle montre ce que l'œil nu ne saisit pas.",
          "II. Mais elle peut devenir un voile : elle séduit et empêche de penser.",
          "III. Le discernement est possible : apprendre à lire les images, à les contextualiser.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne pas confondre",
        text: "Critique platonicienne de l'image (elle est illusion) et critique moderne du spectacle (les images remplacent la vie). Ce sont deux problèmes différents : métaphysique chez Platon, politique et social aujourd'hui.",
      },
    ],
    keyPoints: [
      "L'image est une médiation, pas une simple copie.",
      "Elle peut témoigner ou tromper selon son usage.",
      "Sa puissance émotionnelle est aussi un risque.",
      "Lire une image est une compétence critique.",
    ],
    pitfalls: [
      "Condamner toute image au nom de Platon.",
      "Confondre image et réalité.",
      "Oublier la responsabilité de celui qui montre.",
    ],
    flashcards: [
      {
        question: "Pourquoi Platon critique-t-il les images ?",
        answer: "Parce qu'elles sont des copies de copies, éloignées de la vérité des Idées.",
      },
      {
        question: "Quel risque présente l'esthétisation d'une tragédie ?",
        answer: "Que la beauté de l'image fasse oublier la souffrance réelle et émousse le jugement moral.",
      },
      {
        question: "Que signifie « lire une image » ?",
        answer: "Identifier son cadrage, son intention, son contexte et ses effets sur le spectateur.",
      },
    ],
    tags: ["philosophie", "image", "représentation", "Platon", "critique"],
  },
  {
    slug: "philo-sacre-religion",
    subjectSlug: "philosophie",
    title: "Le sacré, le mythe et la religion",
    chapter: "L'humain · Sacré",
    summary:
      "Comprendre le sacré comme expérience et comme institution, la fonction du mythe, et le rapport entre foi, raison et critique.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 28,
    orderIndex: 24,
    objectives: [
      "Distinguer sacré et profane",
      "Analyser la fonction du mythe",
      "Penser le rapport foi / raison",
      "Éviter le confusionnisme et le mépris",
    ],
    blocks: [
      {
        type: "table",
        title: "Les notions à distinguer",
        head: ["Notion", "Définition", "Auteur de référence"],
        rows: [
          ["Sacré", "ce qui est séparé, interdit, investi d'une valeur absolue", "Durkheim, Otto"],
          ["Profane", "l'espace ordinaire de la vie quotidienne", "Eliade"],
          ["Mythe", "récit fondateur qui donne sens à l'existence collective", "Cassirer"],
          ["Religion", "institution organisant le rapport au sacré", "Weber"],
          ["Foi", "adhésion intime, non démontrable", "Kierkegaard"],
        ],
      },
      {
        type: "paragraph",
        title: "Foi et raison : un conflit mal posé",
        text: "Opposer foi et raison comme deux ennemis est une simplification. La foi relève d'une adhésion qui ne se prouve pas, la raison d'une exigence de preuve. Elles peuvent entrer en conflit (Galilée), coexister (Thomas d'Aquin) ou se critiquer mutuellement (Kant : la religion dans les limites de la simple raison). Le philosopher consiste à tenir les deux exigences sans confondre leurs domaines.",
      },
      {
        type: "steps",
        title: "Construire un plan",
        items: [
          "I. Le sacré est une dimension anthropologique universelle : il fonde la cohésion sociale.",
          "II. Mais il peut devenir instrument de domination ou d'exclusion.",
          "III. Penser un sacré qui respecte la liberté : la critique n'est pas la destruction.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Tenue du propos",
        text: "Un devoir de philosophie sur la religion doit rester argumenté et respectueux : critiquer une croyance, c'est examiner ses raisons, non tourner en dérision ceux qui la portent. La caricature est sanctionnée autant que l'apologétique.",
      },
    ],
    keyPoints: [
      "Le sacré est ce qui est séparé et investi d'une valeur absolue.",
      "Le mythe a une fonction de fondation du sens.",
      "Foi et raison ne relèvent pas du même registre.",
      "La critique philosophique n'est pas le mépris.",
    ],
    pitfalls: [
      "Confondre sacré et religieux institutionnel.",
      "Réduire la religion à l'illusion (ou à la vérité évidente).",
      "Manquer de respect ou d'argumentation.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre sacré et profane ?",
        answer: "Le sacré est séparé et interdit, investi d'une valeur absolue ; le profane est l'espace ordinaire.",
      },
      {
        question: "Quelle est la fonction du mythe ?",
        answer: "Fonder et justifier un ordre du monde et des pratiques collectives par un récit.",
      },
      {
        question: "Pourquoi foi et raison ne se situent-elles pas sur le même plan ?",
        answer: "La foi est une adhésion intime, la raison exige des preuves partageables : leurs critères diffèrent.",
      },
    ],
    tags: ["philosophie", "sacré", "religion", "mythe", "foi et raison"],
  },
  {
    slug: "philo-modelisation-lettres",
    subjectSlug: "philosophie",
    title: "Les dimensions de la modélisation scientifique",
    chapter: "Science · Modélisation",
    summary:
      "Comprendre comment la science construit des modèles pour comprendre le réel, et ce que cela implique sur la vérité scientifique.",
    level: "Bac · 4e Lettres (T3)",
    durationMin: 27,
    orderIndex: 25,
    objectives: [
      "Définir le modèle scientifique",
      "Comprendre l'écart modèle/réel",
      "Analyser la notion de vérité scientifique",
      "Éviter le relativisme scientifique",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Modéliser, ce n'est pas copier",
        text: "Un modèle est une construction abstraite qui simplifie le réel pour le rendre intelligible : on choisit des variables, on néglige des facteurs, on construit des équations. Le modèle n'est donc pas une copie du réel, mais un instrument d'intelligibilité. Sa validité se juge à sa capacité à prédire et à expliquer, non à sa ressemblance.",
      },
      {
        type: "table",
        title: "Trois dimensions du modèle",
        head: ["Dimension", "Question", "Exemple"],
        rows: [
          ["Représentation", "que montre le modèle ?", "une carte n'est pas le territoire"],
          ["Instrument", "à quoi sert-il ?", "prédire, décider, expérimenter"],
          ["Construction sociale", "qui le produit et dans quel cadre ?", "communauté scientifique, financement"],
        ],
      },
      {
        type: "steps",
        title: "Plan possible",
        items: [
          "I. La science modélise : elle ne décrit jamais le réel sans le construire.",
          "II. Cela ne signifie pas qu'elle est arbitraire : les modèles sont testés et corrigibles.",
          "III. La vérité scientifique est provisoire mais rationnellement justifiée.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le glissement à éviter",
        text: "« Les modèles sont des constructions, donc la science n'est qu'une opinion » : c'est un sophisme. La construction n'exclut pas la vérification. Distinguer construction et arbitraire est l'enjeu central du sujet.",
      },
    ],
    keyPoints: [
      "Modéliser = simplifier pour comprendre.",
      "Un modèle se juge à sa fécondité, pas à sa ressemblance.",
      "La science n'est pas arbitraire parce qu'elle se corrige.",
      "La vérité scientifique est provisoire et justifiée.",
    ],
    pitfalls: [
      "Confondre modèle et réalité.",
      "Verser dans le relativisme scientificophobe.",
      "Oublier la dimension instrumentale.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'un modèle scientifique ?",
        answer: "Une construction abstraite qui simplifie le réel pour le décrire, l'expliquer et le prédire.",
      },
      {
        question: "À quoi juge-t-on la validité d'un modèle ?",
        answer: "À sa capacité à expliquer et à prédire correctement, et à résister aux tests.",
      },
      {
        question: "Pourquoi la vérité scientifique est-elle provisoire ?",
        answer: "Parce qu'elle est toujours perfectible et révisable par de nouvelles preuves.",
      },
    ],
    tags: ["philosophie", "science", "modèle", "vérité", "épistémologie"],
  },
  {
    slug: "philo-morale-devoir-bonheur",
    subjectSlug: "philosophie",
    title: "La morale, le devoir et le bonheur",
    chapter: "Éthique · Morale",
    summary:
      "Le devoir moral est-il incompatible avec la recherche du bonheur ? Déontologie, conséquentialisme et éthique de la vertu.",
    level: "Bac · 4e Lettres (T3)",
    durationMin: 28,
    orderIndex: 26,
    objectives: [
      "Distinguer morale, éthique et droit",
      "Comprendre l'impératif catégorique",
      "Analyser l'utilitarisme",
      "Penser le rapport devoir / bonheur",
    ],
    blocks: [
      {
        type: "table",
        title: "Trois grandes approches",
        head: ["Approche", "Critère du bien", "Auteur"],
        rows: [
          ["Déontologie", "le devoir et l'intention", "Kant"],
          ["Conséquentialisme", "les conséquences et l'utilité", "Bentham, Mill"],
          ["Éthique de la vertu", "le caractère et la sagesse pratique", "Aristote"],
        ],
      },
      {
        type: "paragraph",
        title: "Devoir et bonheur ne sont pas ennemis",
        text: "Kant affirme que le devoir doit être accompli par devoir, non par intérêt. Aristote répond que la vertu est une disposition qui rend heureux parce qu'elle réalise la fonction propre de l'humain. Une lecture rapide oppose les deux ; une lecture fine montre que le bonheur n'est pas l'ennemi de la morale mais son horizon : agir bien, c'est vivre bien.",
      },
      {
        type: "list",
        title: "Arguments pour le plan",
        items: [
          "Le devoir s'impose même quand il coûte (Kant, impératif catégorique).",
          "L'utilitarisme évalue l'action par ses conséquences globales.",
          "La vertu est un juste milieu acquis par l'habitude (Aristote).",
          "Agir moralement rend heureux, mais ce n'est pas le motif de l'action morale.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "L'exemple qui structure",
        text: "Le mensonge : Kant l'interdit absolument ; l'utilitariste l'autorise s'il sauve une vie ; l'éthique de la vertu demande quelle personne je deviens en mentant. Le même cas, trois réponses : c'est la démonstration parfaite.",
      },
    ],
    keyPoints: [
      "Morale = normes du bien ; éthique = réflexion sur ces normes.",
      "Kant : agir par devoir, non par intérêt.",
      "Mill : maximiser le bonheur du plus grand nombre.",
      "Aristote : la vertu est une disposition, un juste milieu.",
    ],
    pitfalls: [
      "Réduire Kant à un rigoriste sans nuances.",
      "Confondre utilitarisme et égoïsme.",
      "Oublier l'articulation devoir / bonheur.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce que l'impératif catégorique ?",
        answer: "Un commandement moral inconditionnel : agir seulement selon une maxime qu'on pourrait vouloir universelle.",
      },
      {
        question: "Quel est le critère utilitariste ?",
        answer: "La maximisation du bonheur total ou du bien-être pour le plus grand nombre.",
      },
      {
        question: "Comment Aristote définit-il la vertu ?",
        answer: "Une disposition stable à choisir le juste milieu entre deux excès, acquise par l'habitude.",
      },
    ],
    tags: ["philosophie", "morale", "devoir", "bonheur", "Kant", "Aristote"],
  },
  {
    slug: "philo-art-beau",
    subjectSlug: "philosophie",
    title: "L'art, le beau et l'expérience esthétique",
    chapter: "Esthétique · Art",
    summary:
      "Qu'est-ce qui distingue l'art de l'artisanat et du simple plaisir ? Le beau est-il subjectif ou universel ?",
    level: "Bac · 4e Lettres (T3)",
    durationMin: 27,
    orderIndex: 27,
    objectives: [
      "Distinguer art et technique",
      "Analyser le jugement de goût",
      "Comprendre la fonction de l'art",
      "Penser la critique artistique",
    ],
    blocks: [
      {
        type: "table",
        title: "Art et technique",
        head: ["Critère", "Artisanat", "Art"],
        rows: [
          ["But", "utilité, fonction", "expression, sens"],
          ["Critère de réussite", "efficacité", "réussite esthétique"],
          ["Rapport à la règle", "application", "invention, transgression"],
          ["Valeur", "usage", "expérience partagée"],
        ],
      },
      {
        type: "paragraph",
        title: "Le jugement de goût",
        text: "Kant montre que le jugement de goût est subjectif (il repose sur un sentiment) mais prétend à l'universalité (je dis « c'est beau », non « c'est beau pour moi »). Cette tension est le cœur du problème : le beau n'est ni une propriété objective des choses, ni une simple préférence privée.",
      },
      {
        type: "steps",
        title: "Problématiser",
        items: [
          "I. Le beau est une expérience subjective et sensible.",
          "II. Mais le jugement esthétique prétend à un accord universel.",
          "III. L'éducation du goût et la critique rendent possible ce partage.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Attention au relativisme",
        text: "« Les goûts et les couleurs ne se discutent pas » est un slogan, pas un argument : la critique d'art existe, elle argumente, elle convainc. Distinguer le goût personnel et le jugement esthétique argumenté.",
      },
    ],
    keyPoints: [
      "L'art vise le sens, l'artisanat l'utilité.",
      "Le jugement de goût est subjectif et universalisable.",
      "L'art transforme notre rapport au monde.",
      "La critique d'art argumente, elle ne décrète pas.",
    ],
    pitfalls: [
      "Confondre art et habileté technique.",
      "Verser dans un subjectivisme intégral.",
      "Oublier de définir le beau.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre art et artisanat ?",
        answer: "L'artisanat vise l'utilité et l'efficacité, l'art vise l'expression et le sens.",
      },
      {
        question: "Que montre Kant du jugement de goût ?",
        answer: "Qu'il est subjectif mais prétend à l'universalité : je demande l'accord de tous.",
      },
      {
        question: "Quelle est la fonction de l'art ?",
        answer: "Donner forme à une expérience, révéler une vérité sensible, transformer notre perception du monde.",
      },
    ],
    tags: ["philosophie", "art", "beau", "esthétique", "Kant"],
  },
  {
    slug: "philo-etat-justice",
    subjectSlug: "philosophie",
    title: "L'État, la justice et la liberté politique",
    chapter: "Politique · État",
    summary:
      "L'État est-il l'ennemi de la liberté ou sa condition ? Analyse du contrat social, de la loi et de la justice.",
    level: "Bac · 4e Lettres (T3)",
    durationMin: 28,
    orderIndex: 28,
    objectives: [
      "Distinguer pouvoir, force et autorité",
      "Comprendre le contrat social",
      "Analyser la loi comme expression de la liberté",
      "Penser la justice et l'égalité",
    ],
    blocks: [
      {
        type: "table",
        title: "Trois théoriciens du contrat",
        head: ["Auteur", "État de nature", "Contrat"],
        rows: [
          ["Hobbes", "guerre de tous contre tous", "souverain absolu pour la sécurité"],
          ["Locke", "liberté et propriété menacées", "pouvoir limité, droit de résistance"],
          ["Rousseau", "liberté naturelle", "volonté générale, liberté civile"],
        ],
      },
      {
        type: "paragraph",
        title: "Obéir à la loi, est-ce être libre ?",
        text: "Pour Rousseau, obéir à la loi que l'on s'est prescrite, c'est obéir à soi-même : la liberté civile consiste à substituer l'obéissance à la volonté générale à l'impulsion du désir. Pour l'anarchiste, toute contrainte étatique est aliénation. La question est celle des conditions d'une loi légitime : universalité, égalité devant la loi, possibilité de contestation.",
      },
      {
        type: "steps",
        title: "Plan type",
        items: [
          "I. L'État apparaît comme une puissance qui contraint : impôts, lois, police.",
          "II. Mais il est aussi ce qui garantit les droits : sans lui, c'est la loi du plus fort.",
          "III. La liberté politique n'est pas l'absence de loi, mais la loi consentie et contestable.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "La distinction décisive",
        text: "Distinguer despotisme et État de droit : le premier impose la loi du maître, le second soumet le pouvoir lui-même à la loi. C'est cette distinction qui sauve l'analyse de la simplification « l'État est oppresseur ».",
      },
    ],
    keyPoints: [
      "Hobbes, Locke et Rousseau construisent l'État sur un contrat.",
      "La loi peut être libératrice si elle est consentie.",
      "L'État de droit soumet le pouvoir au droit.",
      "La justice exige l'égalité devant la loi.",
    ],
    pitfalls: [
      "Confondre autorité et force.",
      "Réduire l'État à la contrainte.",
      "Oublier la distinction État de droit / despotisme.",
    ],
    flashcards: [
      {
        question: "Que signifie le contrat social ?",
        answer: "L'hypothèse selon laquelle la société politique repose sur un accord par lequel les individus échangent une liberté naturelle contre une liberté civile garantie.",
      },
      {
        question: "Quelle différence entre pouvoir et force ?",
        answer: "La force contraint physiquement ; le pouvoir reconnu s'appuie sur la légitimité et l'autorité.",
      },
      {
        question: "Qu'est-ce qu'un État de droit ?",
        answer: "Un État dans lequel le pouvoir lui-même est soumis à des règles juridiques et contrôlé.",
      },
    ],
    tags: ["philosophie", "politique", "État", "justice", "contrat social"],
  },
  {
    slug: "philo-methode-lettres",
    subjectSlug: "philosophie",
    title: "La dissertation philosophique : analyser, problématiser, argumenter",
    chapter: "Méthodologie · Dissertation",
    summary:
      "Méthode complète de la dissertation : lire le sujet, construire une problématique, bâtir un plan progressif et rédiger.",
    level: "Bac · 4e Lettres (T1)",
    durationMin: 30,
    orderIndex: 29,
    objectives: [
      "Analyser les termes du sujet",
      "Formuler une problématique exigeante",
      "Construire un plan progressif",
      "Rédiger introduction et conclusion",
    ],
    blocks: [
      {
        type: "steps",
        title: "Analyser le sujet (20 min)",
        items: [
          "Définir chaque terme du sujet dans son usage philosophique.",
          "Repérer la forme : question fermée (oui/non), citation à discuter, notion unique.",
          "Chercher le présupposé caché : que suppose la question ?",
          "Dégager le paradoxe : pourquoi la question se pose-t-elle ?",
          "Noter au brouillon les auteurs et exemples mobilisables.",
        ],
      },
      {
        type: "table",
        title: "Structure du devoir",
        head: ["Partie", "Contenu", "Longueur"],
        rows: [
          ["Introduction", "accroche, définition, problématique, annonce du plan", "10–15 lignes"],
          ["Développement", "2 ou 3 parties, chacune argument + exemple + limite", "3 à 5 pages"],
          ["Transitions", "bilan + objection qui ouvre la partie suivante", "3–5 lignes"],
          ["Conclusion", "réponse ferme, bilan, ouverture courte", "8–10 lignes"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "La paraphrase et le catalogue",
        text: "Réciter des auteurs sans lien avec le sujet, ou répéter la question en la paraphrasant, sont les deux façons de perdre la majorité des points. Chaque paragraphe doit répondre à la question posée, pas à une question voisine.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "L'objection qui sauve un plan",
        text: "Si votre développement est une simple suite d'arguments dans le même sens, ajoutez une partie qui prend au sérieux la thèse adverse. La note mesure souvent la capacité à penser contre soi.",
      },
    ],
    keyPoints: [
      "Définir les termes avant de disserter.",
      "La problématique est une tension, pas une question vague.",
      "Chaque partie doit apporter une réponse partielle.",
      "La conclusion répond explicitement au sujet.",
    ],
    pitfalls: [
      "Recopier le sujet sans le problématiser.",
      "Plan catalogue d'auteurs.",
      "Paragraphes sans exemple concret.",
    ],
    flashcards: [
      {
        question: "Quelle est la différence entre une problématique et une question ?",
        answer: "La problématique formule une tension entre deux réponses possibles, là où la question simple attend un oui ou un non.",
      },
      {
        question: "Que doit contenir une transition ?",
        answer: "Le bilan de la partie achevée, la limite de ce bilan, puis l'ouverture vers la partie suivante.",
      },
      {
        question: "Quel est le rôle de l'exemple ?",
        answer: "Ancrer l'argument dans une expérience concrète ou une œuvre, sans remplacer l'argumentation.",
      },
    ],
    tags: ["philosophie", "méthode", "dissertation", "problématique", "plan"],
  },
  {
    slug: "philo-analyse-texte-lettres",
    subjectSlug: "philosophie",
    title: "L'analyse de texte philosophique : thèse, argumentation et critique",
    chapter: "Méthodologie · Commentaire",
    summary:
      "Lire un texte philosophique, dégager sa thèse et sa structure, l'expliquer puis le discuter.",
    level: "Bac · 4e Lettres (T2)",
    durationMin: 28,
    orderIndex: 30,
    objectives: [
      "Dégager la thèse du texte",
      "Repérer la structure argumentative",
      "Expliquer les concepts et les exemples",
      "Discuter la thèse avec pertinence",
    ],
    blocks: [
      {
        type: "steps",
        title: "Trois temps, un texte",
        items: [
          "Lecture et repérage : thème, thèse, notions, connecteurs logiques.",
          "Explication linéaire : suivre le mouvement du texte, définir les concepts dans leur contexte.",
          "Discussion : confronter à d'autres positions, évaluer la solidité de l'argumentation.",
        ],
      },
      {
        type: "table",
        title: "Repérer la structure",
        head: ["Indice", "Fonction", "Que faire"],
        rows: [
          ["« mais », « cependant »", "revirement, objection", "repérer la thèse finale"],
          ["« donc », « par conséquent »", "conclusion", "identifier l'argument qui la porte"],
          ["« par exemple »", "illustration", "expliquer en quoi l'exemple illustre"],
          ["« c'est-à-dire »", "reformulation", "préciser le concept"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les fautes de méthode",
        text: "Résumer le texte au lieu de l'expliquer, plaquer des auteurs hors sujet, et oublier de discuter. Un commentaire sans explication du texte n'est pas un commentaire.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Formule d'explication",
        text: "« En affirmant que…, l'auteur soutient que… ; l'emploi de… montre que… ». Cette structure cite, explique et interprète : les trois opérations attendues.",
      },
    ],
    keyPoints: [
      "Thèse, structure, explication, discussion : quatre exigences.",
      "Les connecteurs logiques révèlent le mouvement du texte.",
      "Expliquer un concept, c'est le définir dans le contexte.",
      "La discussion doit rester liée au texte.",
    ],
    pitfalls: [
      "Paraphraser le texte.",
      "Citer des auteurs sans lien.",
      "Oublier la discussion critique.",
    ],
    flashcards: [
      {
        question: "Comment identifier la thèse d'un texte ?",
        answer: "En repérant la proposition que l'auteur soutient et défend, souvent annoncée après un connecteur ou une formule conclusive.",
      },
      {
        question: "Quelles sont les trois parties d'un commentaire ?",
        answer: "L'explication de la thèse, l'analyse de l'argumentation et la discussion critique.",
      },
      {
        question: "Que signale le connecteur « mais » ?",
        answer: "Un revirement ou une objection : souvent la thèse véritable apparaît après.",
      },
    ],
    tags: ["philosophie", "méthode", "commentaire", "thèse", "argumentation"],
  },
];

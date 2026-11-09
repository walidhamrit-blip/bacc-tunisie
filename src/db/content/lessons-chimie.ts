import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Chimie — fiches de la 4ème année secondaire (sections Mathématiques,
 * Sciences expérimentales, Sciences techniques et Informatique) :
 * cinétique chimique, équilibre, acides et bases, oxydoréduction, piles et
 * électrolyse.
 */
export const chimieLessons: LessonSeed[] = [
  {
    slug: "avancement-reaction",
    subjectSlug: "physique",
    title: "Mesure de l'avancement d'une réaction chimique",
    chapter: "Chimie · Suivi de réaction",
    summary:
      "Suivre une réaction par dosage, mesure de volume gazeux ou conductimétrie, et exploiter un tableau d'avancement pour déterminer une quantité de matière.",
    level: "Bac · Sections scientifiques (T1)",
    durationMin: 26,
    orderIndex: 30,
    objectives: [
      "Construire un tableau d'avancement",
      "Déterminer le réactif limitant",
      "Exploiter un dosage pour trouver une quantité de matière",
      "Calculer un rendement",
    ],
    blocks: [
      {
        type: "table",
        title: "Trois méthodes de suivi",
        head: ["Méthode", "Ce qu'on mesure", "Application"],
        rows: [
          ["Dosage", "volume équivalent", "réactions acide-base, redox"],
          ["Mesure de volume gazeux", "V de gaz dégagé", "réactions avec dégagement de H₂ ou CO₂"],
          ["Conductimétrie", "conductance de la solution", "réactions produisant ou consommant des ions"],
        ],
      },
      {
        type: "steps",
        title: "Construire un tableau d'avancement",
        items: [
          "Écrire l'équation bilan équilibrée.",
          "Calculer les quantités initiales n = m/M, n = C·V ou n = V/Vm.",
          "Remplir trois lignes : état initial, en cours (x), état final (xmax).",
          "Déterminer xmax en testant les deux réactifs : celui qui donne le plus petit xmax est limitant.",
          "Conclure : quantité de produit formé et masse restante de réactif en excès.",
        ],
      },
      {
        type: "table",
        title: "Les formules de quantité de matière",
        head: ["Donnée", "Formule", "Unité"],
        rows: [
          ["masse", "n = m/M", "mol"],
          ["solution", "n = C·V", "mol (V en L)"],
          ["gaz (conditions normales)", "n = V/Vm avec Vm ≈ 24 L/mol", "mol"],
          ["rendement", "r = nexpérim / nthéorique × 100", "%"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreur de lecture la plus fréquente",
        text: "Confondre le volume équivalent (versé) avec le volume de la solution dosée (prélevé dans le bécher). Dans le calcul n = C·V, c'est toujours le volume prélevé qui compte pour l'espèce dosée, et le volume versé qui intervient pour la solution titrante.",
      },
    ],
    keyPoints: [
      "Un tableau d'avancement se construit avec des quantités de matière, pas des masses.",
      "Le réactif limitant est celui qui conduit au plus petit xmax.",
      "Le rendement compare quantité obtenue et quantité théorique.",
      "À l'équivalence d'un dosage : les réactifs ont été introduits dans les proportions stoechiométriques.",
    ],
    pitfalls: [
      "Oublier d'équilibrer l'équation bilan.",
      "Utiliser des grammes dans le tableau d'avancement.",
      "Confondre concentration et quantité de matière.",
    ],
    flashcards: [
      {
        question: "Comment détermine-t-on le réactif limitant ?",
        answer: "En calculant le xmax associé à chaque réactif ; le plus petit impose la fin de la réaction.",
      },
      {
        question: "Quelle relation donne la quantité de soluté dans une solution ?",
        answer: "n = C·V, avec V en litres.",
      },
      {
        question: "Que signifie l'équivalence d'un dosage ?",
        answer: "Les ions H₃O⁺ et les ions OH⁻ ont été introduits dans les proportions stoechiométriques.",
      },
    ],
    tags: ["chimie", "avancement", "dosage", "tableau d'avancement", "rendement"],
  },
  {
    slug: "vitesse-reaction",
    subjectSlug: "physique",
    title: "Vitesse de réaction et facteurs cinétiques",
    chapter: "Chimie · Cinétique",
    summary:
      "Mesurer une vitesse de réaction, comprendre l'effet de la concentration, de la température et du catalyseur, et exploiter une courbe de suivi temporel.",
    level: "Bac · Sections scientifiques (T1)",
    durationMin: 24,
    orderIndex: 31,
    objectives: [
      "Calculer une vitesse moyenne de réaction",
      "Exploiter une courbe cinétique (tangeante, pente)",
      "Identifier les facteurs cinétiques",
      "Expliquer le rôle d'un catalyseur",
    ],
    blocks: [
      {
        type: "table",
        title: "Vitesses et unités",
        head: ["Grandeur", "Expression", "Unité"],
        rows: [
          ["Vitesse de formation d'un produit", "v = d[n(P)]/dt", "mol/s"],
          ["Vitesse volumique de réaction", "v = (1/V)·d[n(P)]/dt", "mol/L/s"],
          ["Relief des concentrations", "v = (1/νP)·d[P]/dt", "mol/L/s"],
        ],
      },
      {
        type: "list",
        title: "Les facteurs cinétiques",
        items: [
          "La concentration des réactifs : plus elle est élevée, plus la réaction est rapide.",
          "La température : une hausse de 10 °C multiplie souvent la vitesse par 2 à 3.",
          "La surface de contact d'un solide : une poudre réagit plus vite qu'un bloc.",
          "Le catalyseur : accélère sans être consommé et sans modifier l'état final.",
          "La lumière, pour les réactions photochimiques.",
        ],
      },
      {
        type: "steps",
        title: "Méthode — exploiter une courbe",
        items: [
          "Identifier la grandeur portée en ordonnée et son unité.",
          "Tracer la tangeante en un instant donné pour obtenir la vitesse instantanée.",
          "Repérer la partie verticale (réaction rapide) et la partie asymptotique (réaction lente).",
          "Comparer deux expériences pour isoler l'effet d'un seul facteur.",
          "Conclure : la vitesse diminue au cours du temps car les réactifs sont consommés.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Catalyseur : ce qu'il ne fait pas",
        text: "Un catalyseur ne change ni la quantité finale de produit, ni la constante d'équilibre : il ne fait qu'atteindre plus vite l'état final. C'est un accélérateur, pas un moteur thermodynamique.",
      },
    ],
    keyPoints: [
      "v = (1/V)·dn/dt ; la vitesse diminue avec le temps.",
      "La tangeante à la courbe donne la vitesse instantanée.",
      "Température, concentration, surface de contact et catalyseur modifient la vitesse.",
      "Un catalyseur ne modifie pas l'état final.",
    ],
    pitfalls: [
      "Confondre vitesse moyenne et vitesse instantanée.",
      "Croire que le catalyseur modifie le rendement.",
      "Oublier l'unité (mol/L/s) de la vitesse volumique.",
    ],
    flashcards: [
      {
        question: "Comment obtient-on la vitesse instantanée ?",
        answer: "Par la pente de la tangeante à la courbe de suivi à l'instant considéré.",
      },
      {
        question: "Un catalyseur modifie-t-il la quantité de produit final ?",
        answer: "Non : il accélère la réaction sans changer l'état final ni l'équilibre.",
      },
      {
        question: "Pourquoi la vitesse diminue-t-elle au cours du temps ?",
        answer: "Parce que les concentrations des réactifs diminuent progressivement.",
      },
    ],
    tags: ["chimie", "cinétique", "vitesse", "catalyse", "température"],
  },
  {
    slug: "equilibre-action-masse",
    subjectSlug: "physique",
    title: "Loi d'action de masse et équilibre chimique",
    chapter: "Chimie · Équilibre chimique",
    summary:
      "Écrire une constante d'équilibre, interpréter la loi d'action de masse et utiliser le quotient de réaction pour déterminer le sens d'évolution d'un système.",
    level: "Bac · Sections scientifiques (T1)",
    durationMin: 27,
    orderIndex: 32,
    objectives: [
      "Écrire l'expression de K",
      "Calculer un quotient de réaction Qr",
      "Prévoir le sens d'évolution d'un système",
      "Interpréter l'effet de la concentration et de la température",
    ],
    blocks: [
      {
        type: "table",
        title: "Équilibre et constante",
        head: ["Notion", "Expression", "Remarque"],
        rows: [
          ["Quotient de réaction", "Qr = Π [produits]^ν / [réactifs]^ν", "solvants et solides exclus"],
          ["Constante d'équilibre", "K = Qr à l'équilibre", "dépend de la température"],
          ["Sens d'évolution", "Qr < K ⇒ sens direct ; Qr > K ⇒ sens inverse", "Qr = K ⇒ équilibre"],
          ["Taux d'avancement final", "τ = xfinal/xmax", "τ < 1 pour une réaction limitée"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — prévoir le sens d'évolution",
        items: [
          "Écrire l'équation bilan équilibrée.",
          "Écrire l'expression de Qr avec les concentrations et les exposants.",
          "Calculer Qr avec les concentrations à l'instant considéré.",
          "Comparer Qr à K : plus petit ⇒ sens direct, plus grand ⇒ sens inverse.",
          "Si nécessaire, désigner les espèces qui augmentent et celles qui diminuent.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Trois exclusions à ne jamais oublier",
        text: "On n'écrit pas dans Qr : les solides, le solvant (l'eau), ni les espèces non présentes. Une constante d'équilibre est sans unité. Et K ne dépend que de la température, jamais des concentrations initiales.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Réflexe de vérification",
        text: "Si tu trouves un taux d'avancement final supérieur à 1, il y a une erreur : τ est compris entre 0 et 1. Si K est très grand, la réaction est considérée comme totale (τ ≈ 1) ; si K est très petit, elle est très limitée.",
      },
    ],
    keyPoints: [
      "Qr s'écrit uniquement avec les espèces en solution ou gazeuses.",
      "K = Qr à l'équilibre et ne dépend que de T.",
      "Comparer Qr et K donne le sens d'évolution.",
      "τ = xf/xmax mesure le caractère limité de la réaction.",
    ],
    pitfalls: [
      "Inclure l'eau solvant dans Qr.",
      "Oublier les exposants stoechiométriques.",
      "Croire que K varie avec les concentrations initiales.",
    ],
    flashcards: [
      {
        question: "Que compare-t-on pour prévoir le sens d'évolution ?",
        answer: "Le quotient de réaction Qr et la constante d'équilibre K.",
      },
      {
        question: "Quelles espèces n'apparaissent pas dans Qr ?",
        answer: "Les solides, le solvant et les espèces absentes du système.",
      },
      {
        question: "De quoi dépend K ?",
        answer: "Uniquement de la température.",
      },
    ],
    tags: ["chimie", "équilibre", "action de masse", "Qr", "K"],
  },
  {
    slug: "acides-bases-dosage",
    subjectSlug: "physique",
    title: "Acides et bases, pH et dosage acido-basique",
    chapter: "Chimie · Acides et bases",
    summary:
      "Relier pH et concentration en ions oxonium, reconnaître un acide fort ou faible, et exploiter une courbe de dosage pH-métrique.",
    level: "Bac · Sections scientifiques (T2)",
    durationMin: 28,
    orderIndex: 33,
    objectives: [
      "Calculer un pH à partir d'une concentration",
      "Distinguer acide fort et acide faible",
      "Exploiter une courbe de dosage",
      "Déterminer une concentration par titrage",
    ],
    blocks: [
      {
        type: "table",
        title: "Les relations du chapitre",
        head: ["Notion", "Relation", "Condition"],
        rows: [
          ["Définition du pH", "pH = −log[H₃O⁺]", "toujours"],
          ["Acide fort", "pH = −log C", "dissociation totale"],
          ["Base forte", "pH = 14 + log C", "dissociation totale"],
          ["Produit ionique de l'eau", "Ke = [H₃O⁺][OH⁻] = 10⁻¹⁴", "à 25 °C"],
          ["À l'équivalence", "Ca·Va = Cb·Vb", "acide/base mono-fonctionnels"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — exploiter une courbe de dosage",
        items: [
          "Repérer le point d'équivalence : saut de pH le plus net (ou méthode des tangeantes).",
          "Lire le volume équivalent VbE sur l'axe des abscisses.",
          "Utiliser Ca·Va = Cb·VbE pour trouver la concentration inconnue.",
          "À la demi-équivalence, lire pH = pKa : c'est le meilleur moyen de trouver le pKa d'un acide faible.",
          "Choisir l'indicateur coloré dont la zone de virage encadre le pH à l'équivalence.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux confusions classiques",
        text: "pH et concentration ne varient pas proportionnellement : diviser C par 10 ajoute 1 au pH. Et un acide faible n'a pas un pH égal à −log C : il faut tenir compte de la dissociation partielle (pH plus élevé que prévu).",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Lecture du pKa sur la courbe",
        text: "Au point de demi-équivalence (V = VbE/2), [acide] = [base] donc pH = pKa. C'est la méthode la plus rapide et la plus fiable pour identifier un couple acide/base inconnu.",
      },
    ],
    keyPoints: [
      "pH = −log[H₃O⁺] ; [H₃O⁺] = 10^(−pH).",
      "Acide fort : pH = −log C ; acide faible : pH > −log C.",
      "À l'équivalence : Ca·Va = Cb·VbE.",
      "À la demi-équivalence : pH = pKa.",
    ],
    pitfalls: [
      "Utiliser pH = −log C pour un acide faible.",
      "Confondre le volume versé et le volume prélevé.",
      "Choisir un indicateur dont la zone de virage est loin du pH d'équivalence.",
    ],
    flashcards: [
      {
        question: "Quel est le pH d'une solution d'acide fort de concentration 10⁻³ mol/L ?",
        answer: "pH = 3.",
      },
      {
        question: "Que vaut le pH à la demi-équivalence d'un dosage acide faible / base forte ?",
        answer: "pH = pKa du couple acide/base dosé.",
      },
      {
        question: "Quelle relation donne la concentration à l'équivalence ?",
        answer: "Ca·Va = Cb·VbE pour un acide et une base mono-fonctionnels.",
      },
    ],
    tags: ["chimie", "acides", "bases", "pH", "dosage"],
  },
  {
    slug: "oxydoreduction-piles",
    subjectSlug: "physique",
    title: "Oxydoréduction et piles électrochimiques",
    chapter: "Chimie · Oxydoréduction",
    summary:
      "Identifier un couple oxydant/réducteur, écrire une demi-équation électronique et expliquer le fonctionnement d'une pile (anode, cathode, force électromotrice).",
    level: "Bac · Sections scientifiques (T3)",
    durationMin: 27,
    orderIndex: 34,
    objectives: [
      "Identifier oxydation et réduction",
      "Écrire et équilibrer une demi-équation",
      "Décrire le fonctionnement d'une pile",
      "Calculer une quantité d'électricité",
    ],
    blocks: [
      {
        type: "table",
        title: "Vocabulaire à ne pas inverser",
        head: ["Terme", "Définition", "Lieu dans la pile"],
        rows: [
          ["Oxydation", "perte d'électrons (le réducteur s'oxyde)", "anode (−)"],
          ["Réduction", "gain d'électrons (l'oxydant se réduit)", "cathode (+)"],
          ["Oxydant", "espèce capable de capter des électrons", "réduit à la cathode"],
          ["Réducteur", "espèce capable de céder des électrons", "oxydé à l'anode"],
        ],
      },
      {
        type: "steps",
        title: "Équilibrer une demi-équation électronique",
        items: [
          "Écrire les deux espèces du couple dans le bon sens (oxydant + ne⁻ → réducteur).",
          "Équilibrer les éléments autres que O et H.",
          "Équilibrer les oxygènes avec H₂O.",
          "Équilibrer les hydrogènes avec H⁺ (milieu acide).",
          "Équilibrer les charges avec des électrons, puis vérifier l'égalité en charges et en masse.",
        ],
      },
      {
        type: "table",
        title: "Grandeurs électrochimiques",
        head: ["Grandeur", "Relation", "Unité"],
        rows: [
          ["Quantité d'électricité", "Q = I·Δt", "C"],
          ["Charge et quantité de matière", "Q = n(e⁻)·F avec F ≈ 96500 C/mol", "C"],
          ["Force électromotrice", "E = E°(cathode) − E°(anode)", "V"],
          ["Pile en fonctionnement", "E° le plus grand joue le rôle de cathode (+)", "V"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Aide-mémoire mnémotechnique",
        text: "Anode = oxydation (les deux commencent par une voyelle), cathode = réduction. Dans une pile, l'anode est le pôle négatif ; en électrolyse, c'est l'inverse : l'anode reste le siège de l'oxydation mais devient le pôle positif.",
      },
    ],
    keyPoints: [
      "Oxydation = perte d'électrons à l'anode.",
      "Réduction = gain d'électrons à la cathode.",
      "Q = I·Δt et Q = n(e⁻)·F.",
      "La fem se calcule par différence des potentiels standard.",
    ],
    pitfalls: [
      "Inverser anode et cathode.",
      "Oublier d'équilibrer les charges avec les électrons.",
      "Confondre le sens du courant et celui des électrons dans le circuit extérieur.",
    ],
    flashcards: [
      {
        question: "Où se produit l'oxydation dans une pile ?",
        answer: "À l'anode, qui est le pôle négatif de la pile.",
      },
      {
        question: "Quelle relation lie Q, I et Δt ?",
        answer: "Q = I·Δt, avec Q en coulombs, I en ampères et Δt en secondes.",
      },
      {
        question: "Comment calcule-t-on la force électromotrice d'une pile ?",
        answer: "E = E°(cathode) − E°(anode), soit le plus grand potentiel moins le plus petit.",
      },
    ],
    tags: ["chimie", "oxydoréduction", "pile", "anode", "cathode"],
  },
  {
    slug: "electrolyse",
    subjectSlug: "physique",
    title: "Électrolyse et applications industrielles",
    chapter: "Chimie · Électrolyse",
    summary:
      "Étudier une électrolyse : réactions aux électrodes, bilan, quantité de matière déposée et applications (électrométallurgie, affinage, galvanoplastie).",
    level: "Bac · Sections scientifiques (T3)",
    durationMin: 25,
    orderIndex: 35,
    objectives: [
      "Identifier les réactions aux électrodes",
      "Écrire le bilan de l'électrolyse",
      "Calculer une masse déposée à partir de l'intensité",
      "Citer les applications industrielles",
    ],
    blocks: [
      {
        type: "steps",
        title: "Électrolyse : la méthode",
        items: [
          "Identifier la cathode (reliée au pôle − du générateur) : c'est là que se produit la réduction.",
          "Identifier l'anode (reliée au pôle +) : c'est là que se produit l'oxydation.",
          "Écrire les deux demi-équations et vérifier l'équilibre des charges.",
          "Additionner pour obtenir le bilan, en éliminant les électrons.",
          "Calculer la quantité de matière à partir de Q = I·Δt et du nombre d'électrons échangés.",
        ],
      },
      {
        type: "table",
        title: "Les applications à connaître",
        head: ["Application", "Principe", "Exemple"],
        rows: [
          ["Électrométallurgie", "réduction d'un cation métallique", "production d'aluminium"],
          ["Affinage électrolytique", "purification d'un métal", "cuivre à 99,99 %"],
          ["Galvanoplastie", "dépôt d'un métal sur un objet", "chromage, argenture"],
          ["Électrolyse de l'eau", "production de H₂ et O₂", "stockage d'énergie"],
          ["Traitement de surface", "protection contre la corrosion", "anodisation de l'aluminium"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le sens de branchement décide de tout",
        text: "Inverser les bornes du générateur inverse les réactions : le métal se dépose là où il était dissous et se dissout là où il s'était déposé. Toujours vérifier quel électrode est reliée au pôle négatif avant d'écrire les demi-équations.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Calcul rapide de masse déposée",
        text: "m = (M·I·Δt)/(n·F) où n est le nombre d'électrons échangés par ion. Vérifier l'ordre de grandeur : pour 1 A pendant 1 h, on dépose de l'ordre de quelques grammes de métal — jamais des kilos.",
      },
    ],
    keyPoints: [
      "Cathode = réduction, anode = oxydation, comme dans une pile.",
      "En électrolyse, les réactions sont forcées par le générateur.",
      "m = M·I·Δt/(n·F) pour un dépôt métallique.",
      "Applications : affinage, galvanoplastie, production de H₂.",
    ],
    pitfalls: [
      "Confondre pôles de la pile et de l'électrolyse.",
      "Oublier le nombre d'électrons échangés dans le calcul de masse.",
      "Utiliser Δt en minutes sans convertir en secondes.",
    ],
    flashcards: [
      {
        question: "Quelle réaction a lieu à la cathode ?",
        answer: "Une réduction : les cations captent des électrons.",
      },
      {
        question: "Quelle formule donne la masse déposée ?",
        answer: "m = M·I·Δt/(n·F), avec n le nombre d'électrons échangés.",
      },
      {
        question: "Cite deux applications industrielles de l'électrolyse.",
        answer: "L'affinage du cuivre et la galvanoplastie (chromage, argenture).",
      },
    ],
    tags: ["chimie", "électrolyse", "électrodes", "Faraday", "industrie"],
  },
];

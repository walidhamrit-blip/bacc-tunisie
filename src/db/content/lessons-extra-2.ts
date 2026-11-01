import type { Flashcard, LessonBlock } from "@/db/schema";

export type LessonSeed = {
  slug: string;
  subjectSlug: string;
  title: string;
  chapter: string;
  summary: string;
  level: string;
  durationMin: number;
  orderIndex: number;
  objectives: string[];
  blocks: LessonBlock[];
  keyPoints: string[];
  pitfalls: string[];
  flashcards: Flashcard[];
  tags: string[];
};

/* ============================================================
   SVT — programme de terminale (complément)
   ============================================================ */

const svtReproduction: LessonSeed = {
  slug: "reproduction-developpement",
  subjectSlug: "svt",
  title: "Reproduction humaine et développement de l'embryon",
  chapter: "Reproduction",
  summary:
    "Comprendre la gamétogénèse, la fécondation, les premières divisions de l'œuf et le rôle des hormones dans le cycle et la grossesse.",
  level: "Bac · Sciences",
  durationMin: 30,
  orderIndex: 3,
  objectives: [
    "Décrire la spermatogénèse et l'ovogénèse",
    "Expliquer les étapes de la fécondation et de la nidation",
    "Situer le rôle des hormones sexuelles (testostérone, œstrogènes, progestérone)",
    "Comprendre le développement des premières semaines de l'embryon",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "La gamétogénèse",
      text:
        "La spermatogénèse (chez l'homme) produit des spermatozoïdes continuellement après la puberté. L'ovogénèse (chez la femme) produit un ovule par cycle, avec une première division méiotique achevée avant l'ovulation et la seconde après la fécondation. La méiose réduit de moitié le nombre de chromosomes (2n → n) et crée de la diversité par le crossing-over.",
    },
    {
      type: "table",
      title: "Étapes de la fécondation au début de la grossesse",
      head: ["Étape", "Ce qui se passe", "Lieu"],
      rows: [
        ["Fécondation", "Un spermatozoïde pénètre l'ovule : formation du zygote (2n)", "Trompe de Fallope"],
        ["Segmentation", "Premières divisions mitotiques du zygote (2, 4, 8... cellules)", "Trompe vers l'utérus"],
        ["Nidation", "L'embryon (blastocyste) s'implante dans la muqueuse utérine", "Utérus"],
        ["Embryon puis fœtus", "Organogenèse : mise en place des organes et des systèmes", "Utérus (placenta et cordon)"],
      ],
    },
    {
      type: "list",
      title: "Hormones sexuelles principales",
      items: [
        "Testostérone (testicules) : développement des caractères sexuels secondaires masculins et production de spermatozoïdes.",
        "Œstrogènes (ovaires) : développement des caractères féminins, préparation de la muqueuse utérine.",
        "Progestérone (corpus luteum puis placenta) : maintien de la grossesse et de la muqueuse utérine.",
        "FSH et LH (hypophyse) : régulent les gonades et le cycle ovarien.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "Le rôle du placenta",
      text:
        "Le placenta permet les échanges entre le sang maternel et le sang fœtal sans mélange habituel des deux sangs : apport d'oxygène et de nutriments au fœtus, élimination de ses déchets. Il secrète aussi des hormones (hCG, œstrogènes, progestérone) qui maintiennent la grossesse.",
    },
  ],
  keyPoints: [
    "Méiose : 2n → n, diversité génétique par crossing-over et brassage.",
    "Fécondation : zygote (2n) dans la trompe, puis segmentation vers l'utérus.",
    "Nidation : implantation de l'embryon dans la muqueuse utérine.",
    "Œstrogènes/progestérone préparent et maintiennent la grossesse ; placenta assure les échanges.",
  ],
  pitfalls: [
    "Confondre mitose (2n → 2n, croissance) et méiose (2n → n, gamètes).",
    "Dire que l'ovule est fécondé dans l'utérus (c'est dans la trompe).",
    "Oublier que la nidation marque le début effectif de la grossesse.",
  ],
  flashcards: [
    {
      question: "Quel est le rôle de la méiose ?",
      answer: "Produire des gamètes haploïdes (n) à partir de cellules diploïdes (2n), avec diversité génétique.",
    },
    {
      question: "Où a lieu la fécondation chez l'humain ?",
      answer: "Dans la trompe de Fallope (ou utérine), pas dans l'utérus.",
    },
    {
      question: "Qu'est-ce que la nidation ?",
      answer: "L'implantation de l'embryon au stade blastocyste dans la muqueuse utérine.",
    },
  ],
  tags: ["reproduction", "méiose", "fécondation", "nidation", "hormones", "embryon"],
};

const svtVegetal: LessonSeed = {
  slug: "physiologie-vegetale",
  subjectSlug: "svt",
  title: "Physiologie végétale : photosynthèse, transpiration et transport",
  chapter: "Végétal",
  summary:
    "Comprendre comment la plante produit de la matière organique, perd de l'eau par transpiration et transporte la sève brute et élaborée.",
  level: "Bac · Sciences",
  durationMin: 26,
  orderIndex: 4,
  objectives: [
    "Écrire l'équation bilan de la photosynthèse et situer ses deux étapes",
    "Expliquer le rôle des stomates et de la transpiration",
    "Différencier sève brute et sève élaborée",
    "Comprendre le rôle des racines, de la tige et des feuilles",
  ],
  blocks: [
    {
      type: "formula",
      title: "Équation bilan de la photosynthèse",
      expression: "6 CO₂ + 6 H₂O + énergie lumineuse → C₆H₁₂O₆ + 6 O₂ (dans les chloroplastes, en présence de chlorophylle)",
      note: "La plante fixe du carbone minéral (CO₂) en matière organique (glucose) et rejette de l'oxygène.",
    },
    {
      type: "table",
      title: "Les deux sèves",
      head: ["Sève", "Composition", "Circulation", "Rôle"],
      rows: [
        ["Sève brute", "Eau + sels minéraux", "Racines → feuilles (xylème)", "Apporte l'eau et les minéraux pour la photosynthèse"],
        ["Sève élaborée", "Sucres + acides aminés", "Feuilles → organes de réserve/croissance (liber)", "Distribue la matière organique produite"],
      ],
    },
    {
      type: "list",
      title: "Facteurs influençant la photosynthèse",
      items: [
        "Luminosité : augmente le rythme jusqu'à saturation.",
        "Concentration en CO₂ : un manque limite la fixation du carbone.",
        "Température : optimum enzymatique (souvent 20-30 °C selon l'espèce).",
        "Disponibilité en eau : la sécheresse ferme les stomates et limite la photosynthèse.",
      ],
    },
    {
      type: "steps",
      title: "Méthode — expliquer la transpiration",
      items: [
        "L'eau est absorbée par les racines et remonte dans le xylème.",
        "L'évaporation se fait surtout par les stomates des feuilles.",
        "Cette perte d'eau crée une « tension » qui tire la sève brute vers le haut (ascendance de la sève).",
        "La transpiration régule aussi la température de la plante et permet le transport des minéraux.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Photosynthèse et respiration ne sont pas inverses simplistes",
      text:
        "La plante photosynthétise le jour (fixe du CO₂, rejette de l'O₂ en lumière) et respire jour et nuit (consomme O₂, rejette CO₂). Le bilan net dépend de l'intensité lumineuse : en pleine lumière, la photosynthèse dépasse la respiration.",
    },
  ],
  keyPoints: [
    "Photosynthèse : CO₂ + H₂O + lumière → glucose + O₂ (chloroplastes, chlorophylle).",
    "Sève brute : eau + minéraux, par le xylème, racines vers feuilles.",
    "Sève élaborée : sucres, par le liber, feuilles vers le reste de la plante.",
    "Stomates : échanges gazeux et transpiration, régulés selon l'hydratation de la plante.",
  ],
  pitfalls: [
    "Confondre sève brute et sève élaborée (direction et contenu inversés).",
    "Dire que la plante rejette de l'O₂ la nuit (elle respire et consomme O₂).",
    "Oublier que la transpiration est une perte d'eau nécessaire à la montée de la sève.",
  ],
  flashcards: [
    {
      question: "Produit principal de la photosynthèse ?",
      answer: "Du glucose (matière organique) et du dioxygène rejeté.",
    },
    {
      question: "Rôle des stomates ?",
      answer: "Échanges gazeux (CO₂ entrant, O₂ sortant) et régulation de la transpiration.",
    },
    {
      question: "Quelle sève circule dans le liber ?",
      answer: "La sève élaborée (sucres produits dans les feuilles).",
    },
  ],
  tags: ["photosynthèse", "transpiration", "sève", "stomates", "plante"],
};

/* ============================================================
   INFORMATIQUE — complément
   ============================================================ */

const infoAlgoAvance: LessonSeed = {
  slug: "algo-avance-tri-recherche",
  subjectSlug: "informatique",
  title: "Algorithmique avancée : recherche et tri",
  chapter: "Algorithmique",
  summary:
    "Comparer la recherche linéaire et la recherche dichotomique, puis comprendre et appliquer des algorithmes de tri simples (tri par sélection, tri à bulles).",
  level: "Bac · Toutes sections scientifiques",
  durationMin: 28,
  orderIndex: 3,
  objectives: [
    "Expliquer la recherche dichotomique sur un tableau trié",
    "Implémenter un tri par sélection et un tri à bulles",
    "Estimer le nombre d'opérations (complexité intuitive) de chaque algorithme",
    "Choisir l'algorithme adapté selon la taille des données",
  ],
  blocks: [
    {
      type: "table",
      title: "Recherche linéaire vs dichotomique",
      head: ["Critère", "Linéaire", "Dichotomique"],
      rows: [
        ["Condition", "Tableau quelconque", "Tableau trié obligatoire"],
        ["Principe", "Parcourir de 0 à n−1", "Diviser l'intervalle par deux à chaque étape"],
        ["Pire cas", "n comparaisons", "≈ log₂(n) comparaisons"],
        ["Exemple n = 1024", "jusqu'à 1024 comparaisons", "10 comparaisons maximum"],
      ],
    },
    {
      type: "steps",
      title: "Recherche dichotomique (tableau trié croissant)",
      items: [
        "Poser début = 0, fin = n − 1.",
        "Calculer milieu = (début + fin) / 2.",
        "Si T[milieu] == cible : trouvé. Sinon si T[milieu] > cible : fin = milieu − 1. Sinon : début = milieu + 1.",
        "Répéter tant que début ≤ fin ; sinon l'élément n'est pas présent.",
      ],
    },
    {
      type: "formula",
      title: "Tri par sélection — principe",
      expression: "Pour i de 0 à n−2 : chercher le minimum dans T[i..n−1] et l'échanger avec T[i]",
      note: "À la fin de l'itération i, les i+1 premières cases sont triées et contiennent les plus petites valeurs.",
    },
    {
      type: "callout",
      tone: "info",
      title: "Pourquoi trier avant de chercher ?",
      text:
        "Un tri coûte cher (≈ n² comparaisons pour les tris simples) mais rend la recherche dichotomique très rapide (≈ log₂ n). Si vous devez chercher plusieurs fois dans les mêmes données, trier une fois est rentable.",
    },
  ],
  keyPoints: [
    "Dichotomique : tableau trié, diviser par deux, ≈ log₂ n étapes.",
    "Tri par sélection : à chaque étape, placer le minimum suivant à sa place définitive.",
    "Tri à bulles : faire remonter les plus grandes valeurs par échanges successifs d'éléments adjacents.",
    "Complexité intuitive : linéaire O(n), dichotomique O(log n), tris simples O(n²).",
  ],
  pitfalls: [
    "Oublier que la dichotomie exige un tableau trié.",
    "Oublier de mettre à jour début et fin correctement (boucle infinie possible).",
    "Confondre l'indice du minimum trouvé et sa valeur lors d'un échange.",
  ],
  flashcards: [
    {
      question: "Recherche dichotomique sur 1000 éléments : environ combien d'étapes ?",
      answer: "≈ log₂(1000) ≈ 10 étapes (puisque 2¹⁰ = 1024).",
    },
    {
      question: "Condition indispensable pour la dichotomie ?",
      answer: "Le tableau doit être trié (croissant ou décroissant, selon l'algorithme).",
    },
    {
      question: "Après une passe de tri par sélection, que sait-on ?",
      answer: "Le premier élément est le plus petit du tableau (à sa place définitive).",
    },
  ],
  tags: ["recherche", "dichotomie", "tri", "sélection", "bulles", "complexité"],
};

/* ============================================================
   PHILOSOPHIE — complément
   ============================================================ */

const philoTravail: LessonSeed = {
  slug: "travail-technique",
  subjectSlug: "philosophie",
  title: "Travail et technique : aliénation ou émancipation ?",
  chapter: "Éthique politique et sociale",
  summary:
    "Comprendre la distinction travail / emploi, le rôle de la technique, et les débats sur l'aliénation au travail et l'émancipation par la technique.",
  level: "Bac · Toutes sections",
  durationMin: 26,
  orderIndex: 3,
  objectives: [
    "Différencier travail (activité) et emploi (contrat/salaire)",
    "Comprendre la technique comme moyen et comme environnement",
    "Mobiliser Marx (aliénation) et une conception émancipatrice du travail",
    "Construire un plan sur « La technique nous libère-t-elle du travail ? »",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Travail et emploi ne se confondent pas",
      text:
        "Le travail est une activité humaine qui transforme la nature et soi-même. L'emploi est une forme sociale du travail liée à un contrat et un salaire. Tout travail n'est pas employé (travail domestique, bénévolat) et tout emploi n'est pas toujours un travail au sens riche (tâches répétitives, absent de sens).",
    },
    {
      type: "table",
      title: "Deux conceptions de la technique",
      head: ["Conception", "Thèse", "Auteur représentatif"],
      rows: [
        ["Technique instrumentale", "La technique est un outil neutre, tout dépend de l'usage qu'on en fait", "Vision courante"],
        ["Technique environnement", "La technique façonne notre façon de penser et de vivre (outil qui nous utilise)", "Ellul, Heidegger"],
        ["Aliénation au travail", "L'ouvrier ne reconnaît pas son produit : le travail l'asservit", "Marx"],
        ["Émancipation", "Maîtriser la technique et organiser le travail peut libérer l'humain", "Conception humaniste"],
      ],
    },
    {
      type: "steps",
      title: "Plan type — « La technique nous libère-t-elle du travail ? »",
      items: [
        "Introduction : distinguer technique et travail, poser le paradoxe (la technique réduit la peine mais transforme le travail).",
        "I. Oui : machines et automatismes suppriment les tâches pénibles et raccourcissent le temps de travail.",
        "II. Non : la technique crée de nouvelles contraintes (cadence, surveillance, chômage technique) et déqualifie le travail.",
        "III. Au-delà : la libération ne vient pas de la technique seule, mais de l'organisation sociale du travail et du sens donné à l'activité.",
        "Conclusion : répondre nuancée — la technique est une condition, pas une garantie de libération.",
      ],
    },
  ],
  keyPoints: [
    "Travail ≠ emploi : l'un est une activité, l'autre un statut social.",
    "Marx : aliénation = le travailleur ne se reconnaît pas dans ce qu'il produit.",
    "La technique peut réduire la peine physique mais créer de nouvelles formes de dépendance.",
    "L'émancipation suppose de maîtriser la technique et le sens du travail, pas seulement d'avoir des machines.",
  ],
  pitfalls: [
    "Confondre technique et science (la science cherche à comprendre, la technique à produire/agir).",
    "Dire que la technique supprime tout travail (elle le transforme).",
    "Oublier le travail non rémunéré (domestique, associatif) dans la réflexion.",
  ],
  flashcards: [
    {
      question: "Aliénation au travail chez Marx : qu'est-ce ?",
      answer: "L'ouvrier est séparé de son produit, de son activité, de ses semblables et de sa propre nature humaine.",
    },
    {
      question: "Exemple de travail non employé ?",
      answer: "Le travail domestique ou le bénévolat : activité sans contrat de travail ni salaire.",
    },
    {
      question: "Une thèse pour « la technique libère du travail » ?",
      answer: "L'automatisation des tâches pénibles réduit la durée et la pénibilité du travail humain.",
    },
  ],
  tags: ["travail", "technique", "aliénation", "émancipation", "Marx"],
};

const philoEtat: LessonSeed = {
  slug: "etat-droit-justice",
  subjectSlug: "philosophie",
  title: "L'État, le droit et la justice : pourquoi obéir à la loi ?",
  chapter: "Éthique politique",
  summary:
    "Comprendre le contrat social, l'État de droit, la distinction légalité/légitimité, et la notion de justice comme répartition équitable.",
  level: "Bac · Toutes sections",
  durationMin: 26,
  orderIndex: 4,
  objectives: [
    "Expliquer le contrat social (Hobbes, Locke, Rousseau)",
    "Différencier légalité (conforme à la loi) et légitimité (justifiable moralement)",
    "Comprendre l'État de droit et la séparation des pouvoirs",
    "Aborder la justice distributive (à chacun selon son mérite, ses besoins ou son droit)",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Le contrat social",
      text:
        "Pour sortir de l'état de nature (conçu comme conflictuel ou insécurisé), les individus s'accordent pour créer un État et lui céder une partie de leur liberté naturelle contre la sécurité et les lois communes. Chez Hobbes, le souverain est absolu ; chez Locke, le pouvoir est limité et peut être renversé s'il trahit la confiance ; chez Rousseau, la loi exprime la volonté générale et obéir à la loi, c'est obéir à soi-même.",
    },
    {
      type: "table",
      title: "Légalité vs légitimité",
      head: ["Notion", "Définition", "Exemple"],
      rows: [
        ["Légalité", "Conforme à la loi en vigueur", "Une loi votée par le parlement"],
        ["Légitimité", "Justifiable moralement, acceptée par les consciences", "Une loi injuste peut être légale mais illégitime"],
        ["État de droit", "L'État lui-même est soumis à la loi", "Séparation des pouvoirs, juges indépendants"],
      ],
    },
    {
      type: "steps",
      title: "Plan type — « Faut-il toujours obéir à la loi ? »",
      items: [
        "Introduction : la loi impose des contraintes ; pourquoi y obéir sinon par la force ? Problème : obligation légale et devoir moral coïncident-ils ?",
        "I. Oui : obéir à la loi assure l'ordre, la sécurité et la vie collective (Hobbes, contrat social).",
        "II. Non : une loi injuste peut être désobéie (Antigone, résistance, désobéissance civile chez Thoreau ou King).",
        "III. Au-delà : obéir aux lois justes et contester les lois injustes par des voies légales ; la légitimité prime sur la simple légalité.",
        "Conclusion : on doit obéir à la loi quand elle exprime la volonté générale et protège la liberté de tous, pas quand elle sert l'oppression.",
      ],
    },
  ],
  keyPoints: [
    "Contrat social : échange de liberté naturelle contre sécurité civile.",
    "Légalité ≠ légitimité : une loi peut être juste ou injuste indépendamment de son vote.",
    "État de droit : personne n'est au-dessus de la loi, y compris les gouvernants.",
    "Justice : donner à chacun ce qui lui est dû (selon le mérite, le besoin ou l'égalité de droits).",
  ],
  pitfalls: [
    "Confondre loi et morale : tout ce qui est légal n'est pas moral, et inversement.",
    "Présenter Hobbes, Locke et Rousseau comme identiques : leurs conceptions de l'État diffèrent fortement.",
    "Réduire la justice à l'égalité stricte (la justice peut aussi tenir compte des besoins ou du mérite).",
  ],
  flashcards: [
    {
      question: "Selon Rousseau, obéir à la loi c'est ?",
      answer: "Obéir à soi-même, car la loi exprime la volonté générale à laquelle chacun a participé.",
    },
    {
      question: "État de droit : caractéristique ?",
      "answer": "Les pouvoirs de l'État sont limités par la loi et les citoyens peuvent contester les décisions devant des juges indépendants.",
    },
    {
      question: "Exemple de désobéissance civile ?",
      answer: "Refuser publiquement et non violamment une loi jugée injuste pour la faire évoluer (ex. : Martin Luther King).",
    },
  ],
  tags: ["État", "droit", "justice", "contrat social", "légitimité"],
};

const philoConscience: LessonSeed = {
  slug: "conscience-inconscient",
  subjectSlug: "philosophie",
  title: "Conscience et inconscient : me connais-je moi-même ?",
  chapter: "Anthropologie",
  summary:
    "Comprendre la conscience comme réflexion sur soi, le rôle de l'inconscient (Freud), et les enjeux de la connaissance de soi.",
  level: "Bac · Toutes sections",
  durationMin: 24,
  orderIndex: 5,
  objectives: [
    "Définir la conscience (connaissance de soi et du monde)",
    "Comprendre l'apport de Freud : l'inconscient dirige une partie de nos actes",
    "Différencier lapsus, rêves et symptômes comme manifestations de l'inconscient",
    "Aborder la responsabilité quand l'inconscient est à l'œuvre",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Qu'est-ce que la conscience ?",
      text:
        "La conscience est d'abord la capacité à se présenter soi-même et le monde comme objets de pensée (cogito : je pense et je sais que je pense). Elle inclut la conscience réflexive (je me regarde penser) et la conscience morale (je juge mes actions). Mais tout n'est pas conscient : des désirs, des peurs et des souvenirs peuvent agir sans que nous le sachions.",
    },
    {
      type: "table",
      title: "Conscience et inconscient",
      head: ["Conscience", "Inconscient (Freud)"],
      rows: [
        ["Ce dont je suis témoin à l'instant", "Ce qui m'échappe mais influence mes actes"],
        ["Contrôlable, expressible par la parole", "Révélé par les rêves, les lapsus, les lapsus, les symptômes"],
        ["Le « moi » pensé", "Le « ça » (pulsions), le « surmoi » (interdits intériorisés)"],
      ],
    },
    {
      type: "steps",
      title: "Plan type — « L'inconscient supprime-t-il la responsabilité ? »",
      items: [
        "Introduction : si je ne sais pas pourquoi j'agis, suis-je encore responsable ? Problème : concilier connaissance de soi et liberté.",
        "I. Oui (partialement) : l'inconscient limite la maîtrise de soi (actes manqués, pulsions, déterminisme psychique).",
        "II. Non : la responsabilité suppose la capacité de réflexion et de choix, même si elle est partielle et fragilisée.",
        "III. La psychoanalyse comme moyen de responsabilité : connaître ses mécanismes inconscients pour les maîtriser (le « où ça était, adviendra le moi »).",
        "Conclusion : l'inconscient complique mais n'abolit pas la responsabilité ; il rend la connaissance de soi indispensable à la liberté.",
      ],
    },
  ],
  keyPoints: [
    "Conscience : connaissance de soi et du monde, inclut la conscience réflexive et morale.",
    "Freud : une partie de la vie psychique est inconsciente (pulsions, refoulement).",
    "Rêves, lapsus et symptômes sont des voies d'accès à l'inconscient.",
    "Responsabilité : diminuée par l'inconscient mais pas supprimée ; la connaissance de soi la restaure en partie.",
  ],
  pitfalls: [
    "Dire que tout est inconscient (nier la liberté et la réflexion).",
    "Confondre l'inconscient freudien avec le simple « oubli » ou l'ignorance.",
    "Oublier que la responsabilité juridique présume la capacité de discernement (conscience).",
  ],
  flashcards: [
    {
      question: "Le « ça » chez Freud ?",
      answer: "L'instance inconsciente des pulsions et des désirs immédiats, régie par le principe de plaisir.",
    },
    {
      question: "Qu'est-ce qu'un lapsus ?",
      answer: "Une erreur de parole ou d'écriture qui révèle, selon Freud, une intention inconsciente.",
    },
    {
      question: "« Où ça était, adviendra le moi » signifie ?",
      answer: "En analysant l'inconscient, le sujet reprend le contrôle de lui-même : la conscience étend son domaine.",
    },
  ],
  tags: ["conscience", "inconscient", "Freud", "responsabilité", "connaissance de soi"],
};

/* ============================================================
   ARABE — complément
   ============================================================ */

const arabeArgumentatif: LessonSeed = {
  slug: "arabe-texte-argumentatif",
  subjectSlug: "arabe",
  title: "النص الحجاجي: الحجج، الأدلة، ومنهجية الرد",
  chapter: "التعبير · النص الحجاجي",
  summary:
    "تعلم كيف تحلل نصاً حجاجياً: تحديد رأي الكاتب، استخراج الحجج والأدلة، الربط بين الفكرة والحجة، ثم كتابة رد أو تأييد بمنهجية سليمة.",
  level: "باك · جميع الشعب",
  durationMin: 26,
  orderIndex: 2,
  objectives: [
    "تحديد رأي الكاتب (الرأي المستنتج أو المصرح به)",
    "استخراج الحجج والأدلة والتمييز بينها",
    "تحليل الربط بين الفكرة والفقرات باستخدام أدوات الربط",
    "كتابة رد حجاجي موجز على النص (تأييد أو رفض مع تبرير)",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "مفهوم النص الحجاجي",
      text:
        "النص الحجاجي هو نص يهدف إلى إقناع المتلقي بفكرة أو رأي معين، وذلك من خلال تقديم أدلة وحجج مدعمة. ويتميز بوجود رأي للكاتب، وأدلة منطقية أو واقعية، وأدوات ربط تنظم السير الحجاجي بين الفقرات.",
    },
    {
      type: "table",
      title: "عناصر التحليل الحجاجي",
      head: ["العنصر", "التعريف", "مثال على أداة"],
      rows: [
        ["الرأي", "الفكرة التي يريد الكاتب إقناع المتلقي بها", "أرى أن التعليم هو أساس التقدم"],
        ["الحجة", "البرهان أو الدليل الذي يدعم الرأي", "لأنه يطور قدرات الفرد والمجتمع"],
        ["الدليل", "النص، الواقع، الإحصاء، أو المثال الذي يثبت الحجة", "تجربة دولة ناجحة في التعليم"],
        ["أداة الربط", "كلمة تربط الفقرات وتظهر العلاقة المنطقية", "أيضاً، dunque، لذلك، 그럼에도 불구하고"],
      ],
    },
    {
      type: "steps",
      title: "منهجية تحليل النص الحجاجي",
      items: [
        "اقرأ النص كاملاً وحدد موضوعه العام ورأي الكاتب.",
        "استخرج الفقرات الرئيسية وما تحمله من أفكار وحجج.",
        "حدّد الدليل الذي يدعم كل حجة (واقعي، منطقي، نقلي).",
        "رصد أدوات الربط بين الفقرات (الإضافة، التوكيد، الاستدراك، السبب والنتيجة).",
        "قيّم قوة الحجة: هل هي مقنعة؟ هل الدليل كافٍ؟",
        "اكتب رداً موجزاً: تأييد أو رفض مع تبرير واضح.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "عبارات حجاجية جاهزة",
      text: "«يرى الكاتب أن...», «يدعم رأيه بدليل...», «هذه الحجة قوية لأن...», «من وجهة نظر أخرى يمكن القول...», «في الختام، أتفق/لا أتفق مع الكاتب لأن...».",
    },
  ],
  keyPoints: [
    "الرأي هو الركيزة: بدونه لا نص حجاجي.",
    "الحجة تحتاج دليلاً، والحجة دون دليل مجرد ادعاء.",
    "أدوات الربط تكشف البناء المنطقي للنص.",
    "الرد الحجاجي يكون بالموافقة أو الرفض مع الحجة المضادة، لا بالشعور فقط.",
  ],
  pitfalls: [
    "الخلط بين الفكرة والحجة (الفكرة عامة، الحجة تدعمها).",
    "اقتباس فقرات طويلة دون تحليل أو ربط برأي الكاتب.",
    "الرد العاطفي دون حجة أو دليل مضاد.",
  ],
  flashcards: [
    {
      question: "ما الفرق بين الحجة والدليل؟",
      answer: "الحجة هي المنطق الذي يدعم الرأي، والدليل هو الواقع أو المثال الذي يثبت صحة الحجة.",
    },
    {
      question: "مثال على أداة ربط تدل على السبب؟",
      answer: "لأن، puisque، نظرًا لأن، devido إلى.",
    },
    {
      question: "كيف يتم الرد على نص حجاجي؟",
      answer: "تأييد أو رفض الرأي مع تقديم حجة مضادة أو داعمة واضحة.",
    },
  ],
  tags: ["نص حجاجي", "حجة", "دليل", "رأي الكاتب", "أدوات الربط"],
};

const arabeGrammaire: LessonSeed = {
  slug: "arabe-grammaire-phrase",
  subjectSlug: "arabe",
  title: "القواعد: الجملة وفروعها (فاعل، مفعول به، مجرور)",
  chapter: "النحو · التركيب",
  summary:
    "مراجعة أنواع الجملة (اسمية وفعلية)، الفاعل والمفعول به، الجار والمجرور، مع تطبيق على جمل من النصوص الدراسية.",
  level: "باك · جميع الشعب",
  durationMin: 24,
  orderIndex: 3,
  objectives: [
    "تمييز الجملة الاسمية عن الجملة الفعلية",
    "تحديد الفاعل والمفعول به في الجملة الفعلية",
    "تعريف الجار والمجرور وأثر الجر في الإعراب",
    "تطبيق التحليل على جمل بسيطة من المنهج",
  ],
  blocks: [
    {
      type: "table",
      title: "أنواع الجملة",
      head: ["النوع", "البداية", "مثال"],
      rows: [
        ["الجملة الاسمية", "تبدأ باسم", "الطالب مجتهد"],
        ["الجملة الفعلية", "تبدأ بفعل", "قرأ الطالب الدرس"],
      ],
    },
    {
      type: "list",
      title: "رaken (أركان) الجملة الفعلية",
      items: [
        "الفعل: يدل على حدث وقع في زمن (ماضي، حاضر، أمر).",
        "الفاعل: من قام بالفعل، مرفوع.",
        "المفعول به: من وقع عليه الفعل، منصوب.",
        "قد تكون الجملة ناقصة بأحد الركنين حسب السياق.",
      ],
    },
    {
      type: "steps",
      title: "تحليل جملة بسيطة",
      items: [
        "حدد الفعل وازمنه (ماضي أو حاضر).",
        "اسأل: من قام بالفعل؟ → الفاعل (م أهل الرفع).",
        "اسأل: على من وقع الفعل؟ → المفعول به (منصوب).",
        "حدد الجار والمجرور إن وجدوا (المجرور يجره الحرف).",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "تنبيه عام",
      text: "الفاعل siempre مرفوع، والمفعول به دائماً منصوب، والمجرور دائماً مجرور. الإعراب يتغير حسب موقع الكلمة في الجملة، وليس حسب معناها فقط.",
    },
  ],
  keyPoints: [
    "الجملة الاسمية تبدأ باسم، والفعلية تبدأ بفعل.",
    "الفاعل يقوم بالفعل وهو مرفوع.",
    "المفعول به يقع عليه الفعل وهو منصوب.",
    "الجار والمجرور consiste في حرف جر + اسم مجرور.",
  ],
  pitfalls: [
    "تقديم المفعول به على الفاعل دون تعديل الإعراب بشكل صحيح.",
    "خلط بين النصب والجر في آخر الكلمة.",
    "إهمال إعراب الأسماءzyna في الجمل المعاد ترتيبها.",
  ],
  flashcards: [
    {
      question: "ما علامة نصب المفعول به؟",
      answer: "الفتحة (أو الياء في الجمع المؤنث السالم، أو الألف في المثنى).",
    },
    {
      question: "مثال على الجار والمجرور؟",
      answer: "في المدرسة: «في» حرف جر و«المدرسة» اسم مجرور.",
    },
    {
      question: "كيف تفرق بين الجملة الاسمية والفعلية؟",
      answer: "ب看بادئ الجملة: اسم → اسمية، فعل → فعلية.",
    },
  ],
  tags: ["نحو", "جملة", "فاعل", "مفعول به", "جار ومجرور"],
};

/* ============================================================
   FRANÇAIS — complément
   ============================================================ */

const francaisTheatre: LessonSeed = {
  slug: "francais-theatre",
  subjectSlug: "francais",
  title: "Théâtre : lire une pièce et analyser une scène",
  chapter: "Littérature · Théâtre",
  summary:
    "Repérer les spécificités du texte théâtral (didascalies, dialogues, monologue), analyser une scène et construire un commentaire avec mise en jeu scénique.",
  level: "Bac · Toutes sections",
  durationMin: 26,
  orderIndex: 2,
  objectives: [ // NOTE: 'objectifs' not 'objectifs' - wait schema uses 'objectives'. Fix below. Actually schema uses 'objectives'. Let's keep consistent.
    "Identifier les spécificités du texte théâtral (didacticalies, répliques, monologue)",
    "Analyser la dimension scénique d'une scène",
    "Construire un commentaire composé sur un extrait théâtral",
    "Mobiliser les notions de registre comique/tragique et de personnage",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Spécificités du théâtre",
      text:
        "Un texte théâtral est écrit pour être joué. Il comporte des répliques (paroles des personnages) et des didascalies (indications de mise en scène, décors, gestes, émotions). La communication scénique implique la parole, le corps, l'espace et le regard du public. Un monologue révèle la pensée intérieure d'un personnage seul en scène.",
    },
    {
      type: "table",
      title: "Éléments d'analyse théâtrale",
      head: ["Élément", "Questions à se poser"],
      rows: [
        ["Didascalies", "Que disent-elles du décor, des gestes, des silences, des entrées/sorties ?"],
        ["Répliques", "Qui parle à qui ? Quel ton ? Quel registre de langue ?"],
        ["Monologue / aparté", "Quel personnage est seul ou s'adresse au public ? Qu'est-ce qui est révélé ?"],
        ["Registre", "Comique (quiproquo, jeu de mots) ou tragique (fatalité, conflit de devoirs) ?"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — commenter une scène",
      items: [
        "Situer l'extrait (pièce, auteur, acte, scène, contexte de l'intrigue).",
        "Repérer les didascalies et ce qu'elles ajoutent au sens des paroles.",
        "Analyser les enjeux du dialogue : conflit, révélation, persuasion.",
        "Construire deux ou trois axes d'analyse (par exemple : la parole et le silence, le comique de situation, l'évolution du personnage).",
        "Conclure sur l'effet produit sur le spectateur.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Erreur fréquente",
      text:
        "Ne pas confondre l'auteur, le personnage et le metteur en scène. Les didascalies sont du texte : les citer entre guillemets et les analyser comme des indices de mise en scène.",
    },
  ],
  keyPoints: [
    "Théâtre = répliques + didascalies, écrit pour la scène.",
    "Le monologue et l'aparté révèlent la pensée d'un personnage.",
    "Le registre (comique/tragique) donne le ton de la scène.",
    "Un commentaire théâtral lie le texte à sa représentation possible.",
  ],
  pitfalls: [
    "Faire un résumé de l'intrigue au lieu d'analyser l'extrait.",
    "Ignorer les didascalies dans l'analyse.",
    "Confondre personnage et acteur.",
  ],
  flashcards: [
    {
      question: "Qu'est-ce qu'une didascalie ?",
      answer: "Une indication scénique (décor, gestes, bruit, émotion) qui n'est pas dite à voix haute par un personnage.",
    },
    {
      question: "Qu'est-ce qu'un aparté ?",
      answer: "Une réplique d'un personnage destinée au public et non aux autres personnages sur scène.",
    },
    {
      question: "Deux registres théâtraux ?",
      answer: "Le registre comique (fait rire) et le registre tragique (conflit grave, fatalité).",
    },
  ],
  tags: ["théâtre", "didascalie", "réplique", "monologue", "registre", "scène"],
};

const francaisPoesie: LessonSeed = {
  slug: "francais-poesie",
  subjectSlug: "francais",
  title: "Poésie : formes, vers, figures et commentaire",
  chapter: "Littérature · Poésie",
  summary:
    "Repérer le vers, la strophe, la rime et le mètre, analyser les figures de style et construire un commentaire de poème.",
  level: "Bac · Toutes sections",
  durationMin: 24,
  orderIndex: 3,
  objectives: [
    "Identifier le vers (alexandrin, décasyllabe) et la rime",
    "Repérer et analyser les figures de style principales",
    "Distinguer le sujet lyrique et le sujet énonciateur",
    "Construire un plan de commentaire de poème",
  ],
  blocks: [
    {
      type: "table",
      title: "Formes versifiées",
      head: ["Vers", "Syllabes", "Rime", "Usage"],
      rows: [
        ["Alexandrin", "12", "rimes plates ou croisées", "théâtre classique, poésie narrative"],
        ["Décasyllabe", "10", "rimes embrassées ou croisées", "sonnet, poésie lyrique"],
        ["Libre", "variable", "pas de rime obligatoire", "poésie moderne"],
      ],
    },
    {
      type: "list",
      title: "Figures de style à repérer",
      items: [
        "Métaphore : comparaison sans outil (« la vie est un combat »).",
        "Comparaison : outil (comme, tel, semblable à).",
        "Métonymie : remplacer un mot par un autre lié (« boire un verre » = le contenu).",
        "Anaphore : répétition d'un mot en début de vers (insistance).",
        "Oxymore : association de deux mots contraires (« douce violence »).",
      ],
    },
    {
      type: "steps",
      title: "Méthode — commenter un poème",
      items: [
        "Lire à haute voix pour saisir le rythme et la musicalité.",
        "Repérer la forme (strophes, vers, rimes) et ce qu'elle suggère.",
        "Analyser les figures et le champ lexical dominant.",
        "Identifier le locuteur (sujet énonciateur) et son émotion (lyrisme, nostalgie, révolte).",
        "Construire deux ou trois axes (par exemple : le temps qui passe, la nature, l'expression du sentiment).",
      ],
    },
    {
      type: "callout",
      title: "Le sujet lyrique",
      tone: "info",
      text: "Le sujet lyrique est « je » qui exprime un sentiment personnel. Il ne faut pas confondre le poète et le sujet énonciateur : le « je » du poème est une construction littéraire.",
    },
  ],
  keyPoints: [
    "Compter les syllabes pour identifier le mètre (alexandrin = 12).",
    "Les rimes structurent le poème (plates AABB, croisées ABAB, embrassées ABBA).",
    "Chaque figure doit être reliée à un effet de sens, pas seulement nommée.",
    "Le sujet lyrique exprime l'émotion du « je » poétique.",
  ],
  pitfalls: [
    "Confondre rime et répétition de mot.",
    "Lister des figures sans les analyser (figure nommée mais pas expliquée).",
    "Oublier de lire le poème à haute voix (le rythme est du sens).",
  ],
  flashcards: [
    {
      question: "Qu'est-ce qu'un alexandrin ?",
      answer: "Un vers de 12 syllabes, généralement césuré à la 6e syllabe.",
    },
    {
      question: "Rimes croisées vs rimes embrassées ?",
      answer: "Croisées ABAB ; embrassées ABBA (la première rime avec la dernière, l'intérieur en paire).",
    },
    {
      question: "Métaphore vs comparaison ?",
      answer: "La comparaison utilise un outil (comme, tel) ; la métaphore identifie directement les deux réalités.",
    },
  ],
  tags: ["poésie", "vers", "rime", "figure de style", "lyrisme"],
};

const francaisArgumentation: LessonSeed = {
  slug: "francais-argumentation",
  subjectSlug: "francais",
  title: "L'argumentation : dissertation et écriture argumentative",
  chapter: "Méthode",
  summary:
    "Construire un argumentaire, choisir des exemples pertinents, articuler thèse/antithèse/synthèse et rédiger une introduction et une conclusion.",
  level: "Bac · Toutes sections",
  durationMin: 26,
  orderIndex: 4,
  objectives: [
    "Construire une thèse argumentée avec un exemple",
    "Articuler une antithèse puis une synthèse",
    "Rédiger une introduction qui pose un problème",
    "Rédiger une conclusion qui répond à la question",
  ],
  blocks: [
    {
      type: "table",
      title: "Structure d'une argumentation",
      head: ["Partie", "Rôle", "Exemple de formulation"],
      rows: [
        ["Thèse", "Affirmer une réponse à la question", "D'abord, on peut considérer que..."],
        ["Antithèse", "Montrer les limites ou l'opposé", "Cependant, cette vue présente des limites..."],
        ["Synthèse", "Dépasser l'opposition", "Finalement, il convient de concilier..."],
        ["Exemple", "Illustrer chaque affirmation", "Par exemple, le cas de..."],
      ],
    },
    {
      type: "list",
      title: "Connecteurs logiques",
      items: [
        "Addition : d'abord, ensuite, de plus, également.",
        "Opposition : cependant, au contraire, pourtant, bien que.",
        "Cause : parce que, car, puisque, étant donné que.",
        "Conséquence : donc, ainsi, par conséquent, ce qui entraîne.",
        "Exemple : par exemple, notamment, ainsi que l'illustre.",
      ],
    },
    {
      type: "steps",
      title: "Rédiger une introduction argumentative",
      items: [
        "Accroche : partir d'un fait, d'une citation ou d'une question.",
        "Définir les termes du sujet si nécessaire.",
        "Problématique : formuler la tension ou le problème à traiter.",
        "Annonce du plan : annoncer les deux ou trois parties sans les résumer.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Ce qui affaiblit une dissertation",
      text:
        "L'exemple sans analyse (« par exemple, c'est comme ça ») et la thèse sans argument. Chaque affirmation doit être suivie d'un argument et d'un exemple analysé. La conclusion ne doit pas introduire une nouvelle idée : elle répond au problème.",
    },
  ],
  keyPoints: [
    "Chaque paragraphe : idée → argument → exemple → lien avec le sujet.",
    "Connecteurs logiques pour guider le lecteur.",
    "Introduction : accroche, définitions, problématique, annonce du plan.",
    "Conclusion : réponse directe, pas d'idée nouvelle.",
  ],
  pitfalls: [
    "Hors sujet : ne pas revenir constamment à la question posée.",
    "Exemples génériques sans précision (dates, auteurs, faits).",
    "Plan simplement descriptif (« d'abord je vais dire... ») plutôt qu'argumentatif.",
  ],
  flashcards: [
    {
      question: "Rôle de l'antithèse ?",
      answer: "Montrer les limites de la thèse ou présenter le point de vue opposé pour enrichir la réflexion.",
    },
    {
      question: "Que contient la problématique ?",
      answer: "La tension ou le problème à résoudre, formulée comme une question à laquelle la dissertation répond.",
    },
    {
      question: "Pourquoi utiliser des connecteurs ?",
      answer: "Pour articuler les idées et montrer les relations logiques (cause, conséquence, opposition).",
    },
  ],
  tags: ["argumentation", "dissertation", "thèse", "antithèse", "synthèse", "problématique"],
};

/* ============================================================
   ANGLAIS — complément
   ============================================================ */

const anglaisComprehension: LessonSeed = {
  slug: "anglais-comprehension-ecrite",
  subjectSlug: "anglais",
  title: "English reading comprehension: tips and practice",
  chapter: "Language · Reading",
  summary:
    "Understand a written text, identify main ideas and details, answer questions in English, and avoid common traps in reading comprehension.",
  level: "Bac · Toutes sections",
  durationMin: 20,
  orderIndex: 2,
  objectives: [
    "Skim a text for the general idea and scan for specific information",
    "Identify the author's opinion, tone and purpose",
    "Answer comprehension questions using evidence from the text",
    "Guess the meaning of unknown words from context",
  ],
  blocks: [
    {
      type: "table",
      title: "Question types and how to answer them",
      head: ["Question type", "What it asks", "Strategy"],
      rows: [
        ["Main idea", "What is the text mainly about?", "Read the title, introduction and conclusion."],
        ["Detail", "A specific fact or date", "Scan for keywords and numbers."],
        ["Inference", "What is implied, not stated", "Combine clues from several sentences."],
        ["Vocabulary", "Meaning of a word in context", "Read the sentence before and after."],
        ["Tone / purpose", "Author's attitude or goal", "Look at adjectives and verbs used."],
      ],
    },
    {
      type: "list",
      title: "Useful reading strategies",
      items: [
        "Read the questions first, then the text: you know what to look for.",
        "Underline key words in each question (names, dates, « not », « except »).",
        "Answer in your own words first, then find the sentence in the text.",
        "For « True / False / Not mentioned », answer « Not mentioned » only if the text really says nothing.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Typical trap",
      text: "« Not mentioned » is not the same as « False ». False = the text says the opposite. Not mentioned = the text gives no information on that point.",
    },
    {
      type: "paragraph",
      title: "Guessing vocabulary from context",
      text: "If you see « The arid desert received almost no rain », the words « almost no rain » help you guess that arid means very dry. Always check the part of speech (noun, verb, adjective) before choosing.",
    },
  ],
  keyPoints: [
    "Skim for gist, scan for details: do not read every word equally.",
    "Answer with evidence: quote or paraphrase the text.",
    "Watch out for negatives (« not », « never ») in questions.",
    "Context gives the meaning of unknown words.",
  ],
  pitfalls: [
    "Answering from general knowledge instead of the text.",
    "Choosing a word that fits the topic but not the sentence context.",
    "Confusing « Not mentioned » with « False ».",
  ],
  flashcards: [
    {
      question: "What is skimming?",
      answer: "Reading quickly to get the general idea of a text.",
    },
    {
      question: "True / False / Not mentioned: what is the difference?",
      answer: "False = text says the opposite; Not mentioned = text says nothing about it.",
    },
    {
      question: "How to guess an unknown word?",
      answer: "Read the surrounding sentence and look for clues (definition, example, contrast).",
    },
  ],
  tags: ["reading", "comprehension", "skimming", "scanning", "bac english"],
};

const anglaisEcriture: LessonSeed = {
  slug: "anglais-ecriture-types",
  subjectSlug: "anglais",
  title: "Writing tasks: email, letter and article for the bac",
  chapter: "Language · Writing",
  summary:
    "Write a formal email, a letter and a short article with the right register, structure and linkers for the English bac exam.",
  level: "Bac · Toutes sections",
  durationMin: 22,
  orderIndex: 3,
  objectives: [
    "Distinguish formal and informal register",
    "Structure an email: opening, body, closing",
    "Use appropriate linkers and topic sentences",
    "Respect the word count and the required format",
  ],
  blocks: [
    {
      type: "table",
      title: "Register and useful phrases",
      head: ["Task", "Opening", "Closing"],
      rows: [
        ["Formal email", "Dear Sir or Madam,", "Yours faithfully,"],
        ["Semi-formal email", "Dear Mr Smith,", "Yours sincerely,"],
        ["Informal email", "Hi Sarah,", "Best wishes,"],
        ["Article", "Title + hook", "A concluding remark"],
      ],
    },
    {
      type: "list",
      title: "Linkers by function",
      items: [
        "Addition: moreover, furthermore, in addition, also.",
        "Contrast: however, nevertheless, on the one hand / on the other hand.",
        "Cause: because, since, as, owing to.",
        "Consequence: therefore, thus, as a result.",
        "Conclusion: in conclusion, to sum up, overall.",
      ],
    },
    {
      type: "steps",
      title: "Writing method (10 minutes planning + writing)",
      items: [
        "Read the prompt: underline format (email/article/letter), recipient and required points.",
        "Plan two main body paragraphs, each with one topic sentence and one example.",
        "Write in the required register: no contractions in formal writing.",
        "Include at least four linkers and vary tenses accurately.",
        "Check word count (usually 120-150 words), spelling and subject-verb agreement.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Common mistakes",
      text: "« I am agree » → « I agree ». « He told me » not « he said me ». « Informations » → « information » (uncountable). Do not use SMS style or emojis in a formal task.",
    },
  ],
  keyPoints: [
    "Formal: no contractions (I am not I'm), full sentences, polite register.",
    "Every paragraph starts with a topic sentence.",
    "Respect the task: an email has a greeting and a closing.",
    "Linkers and accurate verbs score more than rare vocabulary.",
  ],
  pitfalls: [
    "Mixing registers (starting formal and ending informal).",
    "Forgetting one of the required points in the prompt.",
    "Writing one block paragraph without linkers.",
  ],
  flashcards: [
    {
      question: "Formal email closing when you don't know the name?",
      answer: "Yours faithfully, (with Dear Sir or Madam).",
    },
    {
      question: "Which linker shows contrast?",
      answer: "However / nevertheless / on the other hand.",
    },
    {
      question: "Correct: « She ___ English every day »?",
      answer: "She studies English every day (third person -s in present simple).",
    },
  ],
  tags: ["writing", "email", "letter", "register", "linkers", "bac english"],
};

/* ============================================================
   HISTOIRE-GÉOGRAPHIE — complément
   ============================================================ */

const hgMondialisation: LessonSeed = {
  slug: "hg-mondialisation",
  subjectSlug: "histoire-geographie",
  title: "La mondialisation : acteurs, flux et inégalités",
  chapter: "Géographie · La mondialisation",
  summary:
    "Comprendre la mondialisation (échanges, multinationales, organisations internationales) et analyser ses avantages et ses inégalités entre territoires.",
  level: "Bac · Toutes sections",
  durationMin: 26,
  orderIndex: 2,
  objectives: [
    "Définir la mondialisation et identifier ses moteurs",
    "Citer les acteurs (OMC, FMI, Banque mondiale, multinationales)",
    "Expliquer les flux (marchandises, capitaux, personnes, informations)",
    "Analyser les inégalités entre territoires intégrés et marginalisés",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Qu'est-ce que la mondialisation ?",
      text:
        "La mondialisation est l'intensification des échanges et des interdépendances à l'échelle mondiale, rendue possible par les transports, les technologies de l'information et la libéralisation des échanges. Elle relie territoires, économies et sociétés, mais pas de façon uniforme : certains territoires sont très intégrés (pôles, villes mondiales), d'autres sont marginalisés.",
    },
    {
      type: "table",
      title: "Acteurs et flux de la mondialisation",
      head: ["Acteurs", "Flux", "Exemples"],
      rows: [
        ["OMC, FMI, Banque mondiale", "Marchandises", "Conteneurs, produits manufacturés, pétrole"],
        ["Multinationales (GAFAM, TotalEnergies, etc.)", "Capitaux", "Investissements directs, profits, dettes"],
        ["États et accords régionaux (UE, UA, ZLECAf)", "Personnes", "Migrations, tourisme, étudiants"],
        ["Réseaux numériques", "Informations", "Internet, données, téléphonie"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — répondre à une question de géographie",
      items: [
        "Définir le concept clé (ici : mondialisation).",
        "Citer des acteurs, des flux et des exemples précis (ville, entreprise, région).",
        "Montrer les inégalités : cartes, chiffres, contrastes entre territoires.",
        "Conclure par une nuance (avantages et limites de la mondialisation).",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Piège : mondialisation ≠ uniformisation",
      text:
        "La mondialisation n'efface pas toutes les différences : les cultures, les régulations et les niveaux de développement restent très variables. Parler d'« uniformisation complète » est une exagération à éviter dans une copie.",
    },
  ],
  keyPoints: [
    "Mondialisation = interdépendances mondiales (échanges, capitaux, informations, personnes).",
    "Acteurs : OMC, FMI, Banque mondiale, multinationales, accords régionaux.",
    "Inégalités : pôles intégrés vs territoires marginalisés.",
    "Nuancer : la mondialisation a des avantages (croissance, échanges) et des limites (inégalités, dépendances).",
  ],
  pitfalls: [
    "Confondre mondialisation et universalisation (tout le monde pareil).",
    "Ne citer que des exemples généraux sans précision géographique.",
    "Oublier les inégalités entre territoires dans la réponse.",
  ],
  flashcards: [
    {
      question: "Quel est le rôle de l'OMC ?",
      answer: "Réguler les échanges commerciaux internationaux et résoudre les litiges entre États.",
    },
    {
      question: "Qu'est-ce qu'une ville mondiale ?",
      answer: "Une ville qui commande et coordonne des activités à l'échelle mondiale (ex. : New York, Londres, Tokyo).",
    },
    {
      question: "Un flux immatériel de la mondialisation ?",
      answer: "Les informations et les données via Internet et les télécommunications.",
    },
  ],
  tags: ["mondialisation", "flux", "OMC", "inégalités", "territoires"],
};

const hgEspaces: LessonSeed = {
  slug: "hg-espaces-productifs-tunisie",
  subjectSlug: "histoire-geographie",
  title: "Espaces productifs et aménagement du territoire en Tunisie",
  chapter: "Géographie · Tunisie",
  summary:
    "Identifier les principaux espaces productifs tunisiens (agriculture, industrie, tourisme, services) et les politiques d'aménagement du territoire.",
  level: "Bac · Toutes sections",
  durationMin: 24,
  orderIndex: 3,
  objectives: [
    "Situer les espaces productifs en Tunisie (agricole, industriel, touristique)",
    "Expliquer les inégalités de développement entre régions",
    "Comprendre le rôle de l'aménagement du territoire (pôles, zones de développement)",
    "Analyser un exemple local (région intérieure vs côte)",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Les espaces productifs tunisiens",
      text:
        "La Tunisie se divise en espaces productifs contrastés : le Nord et le Centre-Est sont davantage industrialisés et urbanisés (Tunis, Sfax, Sousse, Monastir), le Sahel est tourné vers l'industrie textile et le tourisme, le Sud combine tourisme saharien, agriculture oasienne et pétrole/gaz, tandis que les régions de l'intérieur (Nord-Ouest, Centre-Ouest) restent davantage agricoles et plus vulnérables à la pauvreté.",
    },
    {
      type: "table",
      title: "Espaces productifs et activités",
      head: ["Espace", "Activités principales", "Villes / régions"],
      rows: [
        ["Grand Tunis et Sahel", "Industrie, services, tourisme, ports", "Tunis, Sfax, Sousse, Monastir"],
        ["Cap Bon et Nord", "Agriculture (agrumes, oléiculture), industrie agroalimentaire", "Nabeul, Hammamet, Bizerte"],
        ["Sud et oases", "Tourisme saharien, dattes, élevage, pétrole et gaz", "Tozeur, Kebili, Tataouine"],
        ["Régions de l'intérieur", "Agriculture pluviale, élevage, artisanat", "Kef, Siliana, Kasserine"],
      ],
    },
    {
      type: "list",
      title: "Aménagement du territoire",
      items: [
        "Création de pôles de développement et de zones industrielles pour attirer l'investissement.",
        "Programmes de développement régional pour réduire les disparités (intérieur vs côte).",
        "Infrastructures : routes, autoroutes, chemins de fer, ports et aéroports.",
        "Zones de développement prioritaire pour les régions les plus défavorisées.",
      ],
    },
    {
      type: "callout",
      title: "Le littoral face à l'intérieur",
      tone: "warn",
      text: "La concentration des activités et de la population sur le littoral crée un déséquilibre avec l'intérieur. Une réponse de bac doit nommer ce déséquilibre et proposer des mesures (développement régional, emploi local, infrastructures).",
    },
  ],
  keyPoints: [
    "Littoral et Sahel : industrie, services, tourisme (zones intégrées).",
    "Sud : tourisme saharien, oases, hydrocarbures.",
    "Intérieur : agriculture, élevage, plus vulnérable à la pauvreté.",
    "Aménagement : pôles, zones industrielles, programmes régionaux pour réduire les disparités.",
  ],
  pitfalls: [
    "Confondre les régions (par exemple placer Sfax dans le Sud oasien).",
    "Parler de la Tunisie comme un espace uniforme.",
    "Oublier de citer des exemples précis (villes, régions, activités).",
  ],
  flashcards: [
    {
      question: "Deux villes industrielles majeures en Tunisie ?",
      answer: "Tunis et Sfax (pôles industriels et portuaires).",
    },
    {
      question: "Activité du Sud tunisien ?",
      answer: "Tourisme saharien, agriculture oasienne (dattes), élevage, hydrocarbures.",
    },
    {
      question: "But de l'aménagement du territoire ?",
      answer: "Réduire les disparités régionales et équilibrer le développement entre le littoral et l'intérieur.",
    },
  ],
  tags: ["Tunisie", "espaces productifs", "aménagement du territoire", "régions", "inégalités"],
};

/* ============================================================
   ÉDUCATION ISLAMIQUE — complément
   ============================================================ */

const educationEthique: LessonSeed = {
  slug: "education-ethique-responsabilite",
  subjectSlug: "education-islamique",
  title: "الأخلاق والمسؤولية في الإسلام: من النص إلى السلوك",
  chapter: "قيم وأخلاق",
  summary:
    "فهم الأخلاق الإسلامية من خلال النصوص القرآنية والحديثية، وتطبيق قيم الصدق والأمانة والمسؤولية في حياة الطالب والمجتمع.",
  level: "باك · جميع الشعب",
  durationMin: 24,
  orderIndex: 2,
  objectives: [
    "استخراج قيم الصدق والأمانة والتسامح من النصوص",
    "فهم مفهوم المسؤولية الفردية والاجتماعية",
    "ربط القيم بسلوك الطالب اليومي",
    "تنظيم إجابة تحليلية بمقدمة وعرض وخاتمة",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "مفهوم المسؤولية",
      text: "المسؤولية في الإسلام تعني أن كل فرد مسؤول عن أفعاله أمام الله وأمام المجتمع. وقال النبي صلى الله عليه وسلم: «كلكم راعٍ وكلكم مسؤول عن رعيته». وتشمل المسؤولية الحفاظ على الوقت، والاجتهاد في الدراسة، واحترام حقوق الآخرين.",
    },
    {
      type: "table",
      title: "قيم إسلامية وتطبيقات",
      head: ["القيمة", "الدليل", "التطبيق في الحياة"],
      rows: [
        ["الصدق", "قال تعالى: «يا أيها الذين آمنوا اتقوا الله وكونوا مع الصادقين»", "الصدق في الامتحانات وفي التعامل مع المعلمين"],
        ["الأمانة", "قال صلى الله عليه وسلم: «أد الأمانة إلى من ائتمنك»", "الحفاظ على الممتلكات المدرسية وأسرار الآخرين"],
        ["التسامح", "قال تعالى: «واقرأهم واستغفر لهم»", "عفو عن الزملاء وحل النزاعات بالحوار"],
        ["الاجتهاد", "قال صلى الله عليه وسلم: «إن الله يحب إذا عمل أحدكم عملاً أن يتقنه»", "المذاكرة المنتظمة وإتقان الواجبات"],
      ],
    },
    {
      type: "steps",
      title: "منهجية الإجابة على موضوع قيم",
      items: [
        "تحديد النص (آية أو حديث) وذكر مصدره إن أمكن.",
        "شرح المفردات والقيمة المستخلصة من النص.",
        "بيان كيف تؤثر هذه القيمة في سلوك الفرد.",
        "ربط القيمة بواقع الطالب (المدرسة، العائلة، الأصدقاء).",
        "خاتمة تقوّم أهمية القيمة وتدعو إلى تطبيقها.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "الحديث عن المسؤولية",
      text: "المسؤولية لا تقتصر على الجانب الديني، بل تشمل مسؤولية الطالب عن درسه، ومسؤولية المواطن عن بيئته، ومسؤولية القائد عن رعيته.",
    },
  ],
  keyPoints: [
    "كل فرد مسؤول عن أفعاله (حديث: كل راعٍ مسؤول عن رعيته).",
    "الصدق، الأمانة، التسامح والاجتهاد قيم مركزية في الإسلام.",
    "ربط النص بالواقع المعيش للطالب يجعل الإجابة ناجحة.",
    "الخاتمة تقويم وليس تكرار للمقدمة.",
  ],
  pitfalls: [
    "الاكتفاء بترجمة الآية دون استخراج القيمة.",
    "نسيان ربط القيمة بحياة الطالب اليومية.",
    "استخدام أقوال عامة دون نص أو دليل ديني.",
  ],
  flashcards: [
    {
      question: "ما مفهوم المسؤولية في الإسلام؟",
      answer: "التكليف الإنساني: كل فرد مسؤول عن أفعاله أمام الله والمجتمع، وفق مبدأ «كل راعٍ مسؤول عن رعيته».",
    },
    {
      question: "مثال على تطبيق الأمانة في المدرسة؟",
      answer: "عدم الغش في الامتحانات والحفاظ على الممتلكات المدرسية.",
    },
    {
      question: "كيف يساهم التسامح في الحياة المدرسية؟",
      answer: "بإنهاء الخلافات بالحوار والعفو، مما يخلق بيئة دراسية آمنة ومستقرة.",
    },
  ],
  tags: ["أخلاق", "مسؤولية", "صدق", "أمانة", "نص شرعي", "تطبيق"],
};

const educationEnvironnement: LessonSeed = {
  slug: "education-environnement",
  subjectSlug: "education-islamique",
  title: "البيئة وحمايتها في الإسلام: من النظافة إلى الإعمار",
  chapter: "قيم وبيئة",
  summary:
    "فهم النظرة الإسلامية للبيئة كأمانة، وأهمية النظافة، وعدم الإسراف، وحماية الموارد الطبيعية، مع ربط ذلك بالواقع البيئي في تونس.",
  level: "باك · جميع الشعب",
  durationMin: 22,
  orderIndex: 3,
  objectives: [
    "فهم مفهوم الاستخلاف والإعمار في الأرض",
    "استخراج قيم النظافة وعدم الإسراف من النصوص",
    "ربط البيئة الإسلامية بالمشاكل البيئية المعاصرة (التلوث، المياه)",
    "اقتراح سلوكيات صديقة للبيئة للطالب",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "الأرض أمانة",
      text: "المسلمين مؤتمنون على الأرض، ومن مسؤولياتهم إعمارها دون إفسادها. قال النبي صلى الله عليه وسلم: «لا ضرر ولا ضرار»، وهي قاعدة تحمي البيئة والإنسان. والنظافة من الإيمان، والإسراف في الماء أو الطعام محرم حتى في حالات الوضوء.",
    },
    {
      type: "list",
      title: "مبادئ بيئية إسلامية",
      items: [
        "النظافة: «النظافة من الإيمان»، وتشمل نظافة الجسم والمكان والمحيط.",
        "عدم الإسراف: «كلوا واشربوا ولا تسرفوا»، ينطبق على الماء والكهرباء والطعام.",
        "الحفاظ على الحيوانات والنباتات: حتى في الحرب، لا يُقطع الشجر المثمّر.",
        "المسؤولية عن الأجيال القادمة: لا نورثهم بيئة مدمّرة.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      title: "تطبيق تونسي",
      text: "ترشيد استهلاك المياه في المناطق التي تعرف إجهاداً مائياً، وعدم رمي النفايات في الأماكن العامة، وتشجيع إعادة التدوير في المدرسة—كل هذه السلوكيات تُترجم القيمة الإسلامية في العناية بالأرض.",
    },
  ],
  keyPoints: [
    "الإنسان مستخلف في الأرض، مسؤول عن إعمارها وصيانتها دون إفساد.",
    "النظافة من الإيمان، والإسراف محرم حتى في العبادة.",
    "حماية الماء والنبات والحيوان جزء من الدين، وليس ترفاً.",
    "ربط القيم بالواقع البيئي التونسي (المياه، النفايات، التلوث).",
  ],
  pitfalls: [
    "الاكتفاء بالحديث عن البيئة بشكل عام دون نص إسلامي.",
    "نسيان ذكر أمثلة عملية من حياة الطالب.",
    "الخلط بين الاجتهاد البيئي والنصوص القطعية.",
  ],
  flashcards: [
    {
      question: "ما معنى الاستخلاف في الأرض؟",
      answer: "أن الإنسان نائب الله في الأرض، مسؤول عن عمارتها وصيانتها دون إفساد.",
    },
    {
      question: "لماذا يُحظر الإسراف في الماء حتى عند الوضوء؟",
      answer: "لأن الماء نعمة يجب حفظها، والإسراف فيها يخالف قيمة التوازن والاعتدال في الإسلام.",
    },
    {
      question: "سلوك بيئي واحد يمكن للطالب تبنيه؟",
      answer: "إيقاف الصنبور أثناء تفريش الأسنان، أو استخدام الورق بشكل معتدل، أو المشاركة في جمع النفايات القابلة لإعادة التدوير.",
    },
  ],
  tags: ["بيئة", "استخلاف", "نظافة", "إسراف", "ماء", "تونس"],
};

const ecoInflation: LessonSeed = {
  slug: "eco-inflation-pouvoir-achat",
  subjectSlug: "economie",
  title: "Inflation, pouvoir d'achat et monnaie",
  chapter: "Économie générale",
  summary:
    "Comprendre l'inflation, ses causes et ses conséquences, calculer le pouvoir d'achat et le rôle de la banque centrale.",
  level: "Bac · Économie & Gestion",
  durationMin: 24,
  orderIndex: 2,
  objectives: [
    "Définir l'inflation et la mesurer par l'indice des prix",
    "Distinguer revenu nominal et revenu réel",
    "Expliquer les conséquences de l'inflation sur les agents",
    "Comprendre le rôle de la banque centrale (taux directeurs)",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Qu'est-ce que l'inflation ?",
      text:
        "L'inflation est une hausse générale et persistante des prix. Elle se mesure par l'indice des prix à la consommation (IPC) : on compare le coût d'un panier de biens et services à deux dates. Une inflation de 5 % signifie que le même panier coûte 5 % de plus qu'avant.",
    },
    {
      type: "formula",
      title: "Pouvoir d'achat du revenu",
      expression: "Revenu réel = Revenu nominal / IPC (en indice)   ou   Revenu réel = Revenu nominal × (indice base / indice courant)",
      note: "Si les prix augmentent plus vite que les revenus nominaux, le pouvoir d'achat diminue même si le revenu nominal augmente.",
    },
    {
      type: "table",
      title: "Conséquences de l'inflation selon les agents",
      head: ["Agent", "Effet de l'inflation", "Exemple"],
      rows: [
        ["Ménages à revenus fixes", "Perte de pouvoir d'achat", "Retraité dont la pension n'est pas indexée"],
        ["Emprunteurs", "Gagnent (ils remboursent avec une monnaie dévalorisée)", "Crédit immobilier à taux fixe"],
        ["Entreprises", "Incertitude sur les coûts et les prix", "Hésitation à investir"],
        ["État", "Réduit la valeur réelle de la dette", "La dette publique pèse moins en termes réels"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — calculer l'évolution du pouvoir d'achat",
      items: [
        "Relever le revenu nominal aux deux dates et l'IPC aux deux dates.",
        "Calculer le revenu réel à la date courante (revenu nominal divisé par l'indice de prix, ramené à la base).",
        "Comparer les revenus réels : évolution en pourcentage.",
        "Conclure : le pouvoir d'achat a augmenté, diminué ou stagné.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Inflation et croissance nominale",
      text:
        "Une croissance du PIB nominal de 10 % avec une inflation de 6 % ne signifie pas une croissance réelle de 10 % : le PIB réel ne progresse que d'environ 3,8 %. Toujours raisonner en volume (prix constants) pour comparer des années.",
    },
  ],
  keyPoints: [
    "Inflation = hausse générale et persistante des prix (mesurée par l'IPC).",
    "Revenu réel = revenu nominal corrigé de l'inflation.",
    "Inflation : perdants (revenus fixes, épargnants) et gagnants (emprunteurs à taux fixe, État endetté).",
    "Banque centrale : elle agit sur les taux directeurs pour maîtriser l'inflation.",
  ],
  pitfalls: [
    "Confondre inflation (hausse des prix) et hausse d'un prix isolé.",
    "Dire que l'inflation appauvrit tout le monde (les emprunteurs peuvent y gagner).",
    "Oublier de distinguer nominal et réel quand on compare des revenus dans le temps.",
  ],
  flashcards: [
    {
      question: "L'IPC mesure quoi ?",
      answer: "L'évolution du coût d'un panier de biens et services représentatif de la consommation des ménages.",
    },
    {
      question: "Qui gagne avec l'inflation ?",
      answer: "Les emprunteurs à taux fixe et l'État endetté (ils remboursent avec une monnaie dévalorisée).",
    },
    {
      question: "Revenu nominal vs réel ?",
      answer: "Nominal = montant en monnaie courante ; réel = pouvoir d'achat corrigé de l'inflation.",
    },
  ],
  tags: ["inflation", "pouvoir d'achat", "IPC", "monnaie", "banque centrale"],
};

/* ============================================================
   GESTION — complément
   ============================================================ */

const gestionCompteResultat: LessonSeed = {
  slug: "gestion-compte-resultat",
  subjectSlug: "gestion",
  title: "Le compte de résultat : produits, charges et résultat",
  chapter: "Comptabilité générale",
  summary:
    "Construire et lire un compte de résultat, distinguer produits et charges, calculer le résultat et le seuil de rentabilité.",
  level: "Bac · Économie & Gestion",
  durationMin: 26,
  orderIndex: 2,
  objectives: [
    "Distinguer produits (encaissements créés) et charges (consommations de l'exercice)",
    "Construire un compte de résultat simplifié",
    "Calculer le résultat net (bénéfice ou perte)",
    "Comprendre le lien avec le bilan (résultat aux capitaux propres)",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Produits et charges",
      text:
        "Le compte de résultat présente, pour un exercice, tous les produits (ce qui rapporte de l'argent : ventes, subventions, produits financiers) et toutes les charges (ce qui consomme des ressources : achats, salaires, loyers, amortissements). Résultat = Produits − Charges. Si positif : bénéfice. Si négatif : perte.",
    },
    {
      type: "table",
      title: "Comptes de résultat simplifié",
      head: ["Poste", "Exemples", "Sens"],
      rows: [
        ["Produits d'exploitation", "Ventes de marchandises, prestations fournies", "+"],
        ["Charges d'exploitation", "Achats consommés, salaires, loyers, énergie, amortissements", "−"],
        ["Résultat d'exploitation", "Produits d'exploitation − charges d'exploitation", "+ ou −"],
        ["Produits et charges financiers", "Intérêts reçus, intérêts d'emprunt payés", "+ / −"],
        ["Résultat net de l'exercice", "Somme de tous les résultats partiels", "Bénéfice ou perte"],
      ],
    },
    {
      type: "formula",
      title: "Seuil de rentabilité",
      expression: "CA de seuil = Charges fixes / Taux de marge sur coûts variables   (taux de marge = (CA − charges variables) / CA)",
      note: "Au-delà du CA de seuil, l'entreprise est bénéficiaire. En dessous, elle est déficitaire.",
    },
    {
      type: "steps",
      title: "Méthode — construire un compte de résultat",
      items: [
        "Lister tous les produits de l'exercice (ventes, subventions, produits financiers).",
        "Lister toutes les charges de l'exercice (achats, salaires, loyers, amortissements, intérêts).",
        "Calculer les totaux des produits et des charges.",
        "Soustraire : Résultat = Total produits − Total charges.",
        "Interpréter : bénéfice ou perte, et préciser d'où il provient (exploitation, financier, exceptionnel).",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Charges et paiements ne coïncident pas toujours",
      text:
        "Une charge se rattache à l'exercice même si elle n'est pas encore payée (ex. : loyer dû mais non versé). Un paiement n'est pas toujours une charge (ex. : remboursement d'emprunt, qui diminue une dette au passif). Toujours raisonner par exercice, pas par mouvement de caisse.",
    },
  ],
  keyPoints: [
    "Résultat = Produits − Charges de l'exercice.",
    "Bénéfice si positif, perte si négatif.",
    "Le résultat alimente les capitaux propres au bilan (résultat reporté à nouveau).",
    "Seuil de rentabilité : CA minimum pour couvrir toutes les charges fixes.",
  ],
  pitfalls: [
    "Confondre charge (compte de résultat) et paiement de trésorerie.",
    "Oublier les amortissements (charge calculée, pas de sortie d'argent immédiate).",
    "Classer un achat de matériel en charge : c'est une immobilisation au bilan, seule son amortissement est en charge.",
  ],
  flashcards: [
    {
      question: "Où figure le résultat dans le bilan ?",
      answer: "Aux capitaux propres (au passif), il augmente ou diminue les fonds propres selon son signe.",
    },
    {
      question: "Un amortissement est-il une sortie d'argent ?",
      answer: "Non : c'est une charge calculée qui constate l'usure d'une immobilisation, sans décaissement cette année-là.",
    },
    {
      question: "Formule du seuil de rentabilité ?",
      answer: "CA de seuil = Charges fixes / Taux de marge sur coûts variables.",
    },
  ],
  tags: ["compte de résultat", "produits", "charges", "bénéfice", "seuil de rentabilité"],
};

export const extraLessons: LessonSeed[] = [
  /* SVT */
  svtReproduction,
  svtVegetal,
  /* Informatique */
  infoAlgoAvance,
  /* Philosophie */
  philoTravail,
  philoEtat,
  philoConscience,
  /* Arabe */
  arabeArgumentatif,
  arabeGrammaire,
  /* Français */
  francaisTheatre,
  francaisPoesie,
  francaisArgumentation,
  /* Anglais */
  anglaisComprehension,
  anglaisEcriture,
  /* Histoire-Géo */
  hgMondialisation,
  hgEspaces,
  /* Éducation islamique */
  educationEthique,
  educationEnvironnement,
  /* Économie */
  ecoInflation,
  /* Gestion */
  gestionCompteResultat,
];

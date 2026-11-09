import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Technologie — programme complet de la 4ème année Sciences techniques :
 * électronique numérique (binaire, logique combinatoire et séquentielle),
 * automatismes (GRAFCET, API, asservissement), électrotechnique (monophasé et
 * triphasé, transformateur, moteurs, AOP) et construction mécanique
 * (liaisons, cotation, résistance des matériaux).
 */
export const technologieLessons: LessonSeed[] = [
  {
    slug: "tech-arithmetique-binaire",
    subjectSlug: "technologie",
    title: "Arithmétique binaire et codage de l'information",
    chapter: "Électronique numérique · Codage",
    summary:
      "Convertir entre binaire, décimal et hexadécimal, effectuer les opérations de base et coder un nombre signé ou un caractère.",
    level: "Bac · 4e Sciences techniques (T1)",
    durationMin: 26,
    orderIndex: 10,
    objectives: [
      "Convertir un nombre entre bases 2, 10 et 16",
      "Additionner et soustraire en binaire",
      "Coder un nombre signé (complément à 2)",
      "Comprendre le codage d'un caractère (ASCII)",
    ],
    blocks: [
      {
        type: "table",
        title: "Les bases à maîtriser",
        head: ["Base", "Chiffres", "Usage"],
        rows: [
          ["2 (binaire)", "0, 1", "logique, circuits numériques"],
          ["8 (octal)", "0 à 7", "ancienne notation"],
          ["10 (décimal)", "0 à 9", "usage humain"],
          ["16 (hexadécimal)", "0–9, A–F", "adresses, couleurs, mémoire"],
        ],
      },
      {
        type: "steps",
        title: "Convertir et calculer",
        items: [
          "Décimal → binaire : divisions successives par 2, lire les restes à l'envers.",
          "Binaire → décimal : somme des puissances de 2 pour chaque bit à 1.",
          "Binaire → hexadécimal : grouper les bits par 4 en partant de la droite.",
          "Addition binaire : 1 + 1 = 10 (retenue), comme en décimal avec 10 remplacé par 2.",
          "Nombre négatif : complément à 2 = inversion des bits + 1.",
        ],
      },
      {
        type: "table",
        title: "Repères utiles",
        head: ["Valeur", "Binaire", "Hexadécimal"],
        rows: [
          ["8", "1000", "8"],
          ["10", "1010", "A"],
          ["15", "1111", "F"],
          ["255", "1111 1111", "FF"],
          ["1024", "1 0000 0000 0000", "400"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "L'erreur de lecture des restes",
        text: "Dans la conversion décimal → binaire, les restes se lisent du dernier au premier (le bit de poids fort est le dernier reste). Les écrire dans l'ordre de calcul est l'erreur la plus fréquente.",
      },
    ],
    keyPoints: [
      "Binaire → hexadécimal : groupement par 4 bits.",
      "1 + 1 = 10 en binaire, avec retenue.",
      "Le complément à 2 code les nombres négatifs.",
      "n bits codent 2ⁿ valeurs, de 0 à 2ⁿ − 1.",
    ],
    pitfalls: [
      "Lire les restes dans le mauvais ordre.",
      "Oublier la retenue dans une addition binaire.",
      "Confondre complément à 1 et complément à 2.",
    ],
    flashcards: [
      {
        question: "Comment convertit-on le binaire en hexadécimal ?",
        answer: "En groupant les bits par quatre en partant de la droite, puis en traduisant chaque groupe.",
      },
      {
        question: "Que vaut 1111 1111 en décimal ?",
        answer: "255.",
      },
      {
        question: "Comment obtient-on le complément à 2 d'un nombre ?",
        answer: "En inversant tous les bits, puis en ajoutant 1.",
      },
    ],
    tags: ["technologie", "binaire", "codage", "hexadécimal", "numérique"],
  },
  {
    slug: "tech-logique-combinatoire",
    subjectSlug: "technologie",
    title: "Logique combinatoire : fonctions et simplification",
    chapter: "Électronique numérique · Combinatoire",
    summary:
      "Manipuler les opérateurs logiques, écrire une équation à partir d'une table de vérité et la simplifier par Karnaugh.",
    level: "Bac · 4e Sciences techniques (T1)",
    durationMin: 27,
    orderIndex: 11,
    objectives: [
      "Utiliser les opérateurs ET, OU, NON, NAND, NOR, XOR",
      "Écrire une équation depuis une table de vérité",
      "Simplifier par le tableau de Karnaugh",
      "Réaliser une fonction avec des portes logiques",
    ],
    blocks: [
      {
        type: "table",
        title: "Les opérateurs et leurs symboles",
        head: ["Fonction", "Écriture", "Vaut 1 si…"],
        rows: [
          ["ET (AND)", "S = a·b", "a et b valent 1"],
          ["OU (OR)", "S = a + b", "a ou b vaut 1"],
          ["NON (NOT)", "S = ā", "a vaut 0"],
          ["NAND", "S = (a·b)‾", "pas les deux à 1"],
          ["NOR", "S = (a+b)‾", "aucun des deux à 1"],
          ["XOR", "S = a ⊕ b", "a et b différents"],
        ],
      },
      {
        type: "steps",
        title: "Méthode complète",
        items: [
          "Dresser la table de vérité avec toutes les combinaisons d'entrées (2ⁿ lignes).",
          "Repérer les lignes où S = 1 et écrire un terme produit pour chacune.",
          "Sommer ces termes : c'est la forme canonique disjonctive.",
          "Reporter les 1 dans le tableau de Karnaugh et regrouper par paquets de 2, 4 ou 8.",
          "Écrire l'équation simplifiée et la réaliser avec des portes.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Karnaugh : la règle du regroupement",
        text: "On regroupe les 1 en rectangles de 2, 4 ou 8 cases adjacentes (les bords se rejoignent). Chaque paquet donne un terme où l'on ne garde que les variables qui ne changent pas. Un paquet de 4 élimine deux variables : c'est le gain de simplification le plus visible.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux pièges de simplification",
        text: "Oublier que le tableau de Karnaugh est cyclique (la colonne de gauche est voisine de celle de droite) et laisser une case isolée non regroupée alors qu'elle pouvait l'être avec un bord. Vérifie toujours la couverture complète des 1.",
      },
    ],
    keyPoints: [
      "2ⁿ lignes dans une table de vérité à n entrées.",
      "La forme canonique somme de produits se lit sur les lignes à 1.",
      "Karnaugh : paquets de 2ⁿ cases adjacentes, tableau cyclique.",
      "NAND et NOR sont des portes universelles.",
    ],
    pitfalls: [
      "Oublier une ligne de la table de vérité.",
      "Regrouper des cases non adjacentes.",
      "Simplifier en perdant une variable significative.",
    ],
    flashcards: [
      {
        question: "Combien de lignes pour une fonction à 3 entrées ?",
        answer: "2³ = 8 lignes.",
      },
      {
        question: "Que donne un regroupement de 4 cases dans Karnaugh ?",
        answer: "Un terme simplifié de deux variables éliminées.",
      },
      {
        question: "Quelle porte est dite universelle ?",
        answer: "NAND (et NOR) : elles permettent de réaliser toutes les autres fonctions.",
      },
    ],
    tags: ["technologie", "logique", "Karnaugh", "portes logiques", "combinatoire"],
  },
  {
    slug: "tech-logique-sequentielle",
    subjectSlug: "technologie",
    title: "Logique séquentielle : bascules et compteurs",
    chapter: "Électronique numérique · Séquentiel",
    summary:
      "Comprendre les bascules RS, D et JK, leur rôle de mémoire, et analyser un compteur ou un registre à décalage.",
    level: "Bac · 4e Sciences techniques (T1)",
    durationMin: 26,
    orderIndex: 12,
    objectives: [
      "Distinguer logique combinatoire et séquentielle",
      "Décrire le fonctionnement d'une bascule D",
      "Analyser un compteur binaire",
      "Comprendre l'horloge et les fronts",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "La mémoire change tout",
        text: "En combinatoire, la sortie ne dépend que des entrées. En séquentiel, elle dépend aussi de l'état antérieur : le circuit a une mémoire. Cette mémoire est portée par des bascules, qui mémorisent un bit et ne changent d'état qu'à un front d'horloge.",
      },
      {
        type: "table",
        title: "Les bascules du programme",
        head: ["Bascule", "Entrées", "Comportement"],
        rows: [
          ["RS", "R, S", "S = 1 met à 1, R = 1 met à 0, R = S = 1 interdit"],
          ["D", "D", "Q recopie D au front d'horloge : mémoire d'un bit"],
          ["JK", "J, K", "J = 1 met à 1, K = 1 met à 0, J = K = 1 bascule"],
          ["T", "T", "bascule à chaque front si T = 1 (division par 2)"],
        ],
      },
      {
        type: "steps",
        title: "Analyser un compteur",
        items: [
          "Repérer le type de bascules et leurs entrées (J, K ou D).",
          "Identifier le signal d'horloge et le front actif.",
          "Écrire les équations des entrées en fonction des sorties Q.",
          "Dresser la séquence d'états : 00, 01, 10, 11, puis retour à 00.",
          "Vérifier le module du compteur et son éventuelle remise à zéro.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Ce qu'il faut savoir justifier",
        text: "Un compteur est une suite de bascules en cascade où chaque sortie divise la fréquence par 2. C'est pourquoi n bascules comptent jusqu'à 2ⁿ − 1 : un compteur à 3 bascules va de 000 à 111, soit 8 états.",
      },
    ],
    keyPoints: [
      "Le séquentiel dépend de l'état antérieur : il y a mémoire.",
      "La bascule D mémorise un bit au front d'horloge.",
      "J = K = 1 sur une bascule JK la fait basculer.",
      "n bascules ⇒ 2ⁿ états possibles.",
    ],
    pitfalls: [
      "Confondre niveau et front d'horloge.",
      "Oublier l'état interdit de la bascule RS.",
      "Se tromper dans le nombre d'états d'un compteur.",
    ],
    flashcards: [
      {
        question: "Quelle est la différence entre combinatoire et séquentiel ?",
        answer: "Le séquentiel dépend aussi de l'état antérieur : le circuit possède une mémoire.",
      },
      {
        question: "Que fait une bascule D au front d'horloge ?",
        answer: "Elle recopie l'entrée D sur la sortie Q.",
      },
      {
        question: "Combien d'états compte un compteur à 4 bascules ?",
        answer: "2⁴ = 16 états, de 0000 à 1111.",
      },
    ],
    tags: ["technologie", "bascules", "compteurs", "séquentiel", "horloge"],
  },
  {
    slug: "tech-grafcet",
    subjectSlug: "technologie",
    title: "GRAFCET et logique programmée",
    chapter: "Automatismes · GRAFCET",
    summary:
      "Lire et écrire un GRAFCET : étapes, transitions, actions, et traduction en logique programmée pour un automate.",
    level: "Bac · 4e Sciences techniques (T2)",
    durationMin: 27,
    orderIndex: 13,
    objectives: [
      "Identifier les éléments d'un GRAFCET",
      "Écrire un GRAFCET à partir d'un cahier des charges",
      "Distinguer actions continues et actions impulsionnelles",
      "Traduire un GRAFCET en équations de programmation",
    ],
    blocks: [
      {
        type: "table",
        title: "Le vocabulaire graphique",
        head: ["Élément", "Symbole", "Rôle"],
        rows: [
          ["Étape initiale", "double rectangle", "point de départ du cycle"],
          ["Étape", "rectangle numéroté", "état stable du système"],
          ["Transition", "barre transversale", "condition de passage"],
          ["Action", "rectangle lié à l'étape", "ce qui s'exécute pendant l'étape"],
          ["Liaison orientée", "flèche", "sens de l'évolution"],
        ],
      },
      {
        type: "steps",
        title: "Écrire un GRAFCET",
        items: [
          "Lister les étapes du cycle dans l'ordre chronologique.",
          "Définir pour chaque étape l'action réalisée (moteur, vérin, voyant).",
          "Écrire entre chaque étape la condition de transition (capteur, temporisation).",
          "Vérifier que chaque transition est unique et non ambiguë.",
          "Prévoir l'arrêt d'urgence et le retour à l'étape initiale.",
        ],
      },
      {
        type: "table",
        title: "Conditions de transition typiques",
        head: ["Symbole", "Signification", "Exemple"],
        rows: [
          ["a", "capteur a actionné", "fin de course"],
          ["a‾", "capteur non actionné", "position de repos"],
          ["t1/X2/5s", "temporisation de 5 s", "attente"],
          ["a·b", "ET logique", "deux conditions simultanées"],
          ["a+b", "OU logique", "l'une ou l'autre"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "La règle d'évolution",
        text: "Une transition est franchie si elle est valide (étape amont active) ET si sa condition est vraie. On désactive l'étape amont et on active l'étape aval simultanément : une seule étape active à la fois dans un GRAFCET linéaire.",
      },
    ],
    keyPoints: [
      "Une étape = un état stable ; une transition = une condition.",
      "La règle d'évolution exige étape active + condition vraie.",
      "Une action peut être continue, impulsionnelle ou conditionnelle.",
      "Chaque transition doit être non ambiguë.",
    ],
    pitfalls: [
      "Écrire une transition sans condition.",
      "Activer deux étapes simultanément dans un GRAFCET linéaire.",
      "Oublier l'étape initiale.",
    ],
    flashcards: [
      {
        question: "Quand une transition est-elle franchie ?",
        answer: "Lorsqu'elle est valide (étape amont active) et que sa condition est vraie.",
      },
      {
        question: "Comment note-t-on une étape initiale ?",
        answer: "Par un double rectangle.",
      },
      {
        question: "Que signifie la notation t1/X2/5s ?",
        answer: "Une temporisation de 5 s lancée après l'activation de l'étape 2.",
      },
    ],
    tags: ["technologie", "GRAFCET", "automatisme", "transitions", "séquences"],
  },
  {
    slug: "tech-api-microcontroleurs",
    subjectSlug: "technologie",
    title: "Automates programmables (API) et microcontrôleurs",
    chapter: "Automatismes · API",
    summary:
      "Comprendre l'architecture d'un automate, le cycle de scrutation et la différence avec un microcontrôleur, puis choisir le bon matériel.",
    level: "Bac · 4e Sciences techniques (T2)",
    durationMin: 25,
    orderIndex: 14,
    objectives: [
      "Décrire l'architecture d'un API",
      "Expliquer le cycle de scrutation",
      "Distinguer API et microcontrôleur",
      "Choisir les entrées/sorties adaptées",
    ],
    blocks: [
      {
        type: "table",
        title: "Architecture comparée",
        head: ["Élément", "API", "Microcontrôleur"],
        rows: [
          ["Processeur", "industriel, robuste", "intégré, basse consommation"],
          ["Mémoire", "programme + données", "flash + RAM limitées"],
          ["Entrées/sorties", "24 V, optocouplées", "3,3 V ou 5 V"],
          ["Langage", "LADDER, GRAFCET", "C, assembleur"],
          ["Usage", "automatisme industriel", "objet connecté, robotique"],
        ],
      },
      {
        type: "steps",
        title: "Le cycle de scrutation d'un API",
        items: [
          "Lecture des entrées : l'automate photographie l'état des capteurs.",
          "Exécution du programme : les sorties sont calculées en mémoire image.",
          "Mise à jour des sorties : les sorties physiques sont actualisées.",
          "Diagnostic et communication avec le superviseur.",
          "Le cycle recommence indéfiniment, en quelques millisecondes.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Pourquoi le cycle de scrutation est-il déterminant ?",
        text: "Un événement plus court que la durée du cycle peut être manqué : c'est le problème des impulsions brèves. C'est pourquoi on utilise des entrées d'interruption ou des compteurs rapides lorsqu'un capteur délivre des impulsions très courtes.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "API n'est pas un simple ordinateur",
        text: "Un API est conçu pour fonctionner 24 h/24 dans un environnement industriel : tensions élevées, perturbations électromagnétiques, température. Ce n'est pas la puissance de calcul qui le distingue mais sa robustesse et sa sûreté de fonctionnement.",
      },
    ],
    keyPoints: [
      "Le cycle de scrutation = lire, exécuter, écrire.",
      "Les entrées d'un API sont généralement en 24 V et optocouplées.",
      "Le microcontrôleur convient aux objets et à l'embarqué.",
      "Une impulsion plus courte que le cycle peut être perdue.",
    ],
    pitfalls: [
      "Confondre API et microcontrôleur.",
      "Oublier la mise à jour des sorties en fin de cycle.",
      "Négliger la protection des entrées.",
    ],
    flashcards: [
      {
        question: "Quelles sont les trois phases du cycle de scrutation ?",
        answer: "Lecture des entrées, exécution du programme, mise à jour des sorties.",
      },
      {
        question: "Quel langage est typique d'un API ?",
        answer: "Le LADDER (schéma à relais), ou le GRAFCET selon la norme utilisée.",
      },
      {
        question: "Pourquoi une impulsion brève peut-elle être manquée ?",
        answer: "Parce qu'elle peut survenir entre deux lectures d'entrées, plus courtes que le cycle.",
      },
    ],
    tags: ["technologie", "API", "automate", "microcontrôleur", "scrutation"],
  },
  {
    slug: "tech-asservissement",
    subjectSlug: "technologie",
    title: "Asservissement et régulation",
    chapter: "Automatismes · Asservissement",
    summary:
      "Distinguer système asservi et régulé, identifier les éléments de la chaîne d'action et comprendre les notions de consigne, d'écart et de correcteur.",
    level: "Bac · 4e Sciences techniques (T2)",
    durationMin: 26,
    orderIndex: 15,
    objectives: [
      "Distinguer asservissement et régulation",
      "Identifier capteur, comparateur, correcteur, actionneur",
      "Analyser un schéma-bloc",
      "Comprendre les correcteurs P, PI et PID",
    ],
    blocks: [
      {
        type: "table",
        title: "Les deux familles",
        head: ["Système", "Grandeur de sortie", "Exemple"],
        rows: [
          ["Asservissement", "suit une consigne variable", "bras de robot, drone"],
          ["Régulation", "maintient une grandeur constante", "chauffage, niveau d'eau"],
        ],
      },
      {
        type: "steps",
        title: "La chaîne d'asservissement",
        items: [
          "La consigne est fournie par l'utilisateur ou le programme.",
          "Le capteur mesure la grandeur de sortie et la renvoie en retour.",
          "Le comparateur calcule l'écart (consigne − mesure).",
          "Le correcteur transforme l'écart en commande.",
          "L'actionneur agit sur le système, et la mesure recommence : c'est la boucle fermée.",
        ],
      },
      {
        type: "table",
        title: "Les correcteurs et leurs effets",
        head: ["Correcteur", "Action", "Effet"],
        rows: [
          ["P (proportionnel)", "commande proportionnelle à l'écart", "rapide, mais laisse une erreur statique"],
          ["I (intégral)", "intègre l'écart dans le temps", "annule l'erreur statique, plus lent"],
          ["D (dérivé)", "agit sur la vitesse de variation de l'écart", "amortit, anticipe"],
          ["PI / PID", "combinaison", "compromis rapidité / stabilité / précision"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Un vocabulaire à réutiliser",
        text: "Boucle ouverte = la commande ne tient pas compte de la mesure. Boucle fermée = la mesure est réinjectée et corrige la commande. Un système en boucle fermée est plus précis mais peut devenir instable si le correcteur est mal réglé.",
      },
    ],
    keyPoints: [
      "L'écart est la différence entre consigne et mesure.",
      "La boucle fermée réinjecte la mesure.",
      "Le correcteur P laisse une erreur statique.",
      "Le correcteur I annule l'erreur statique.",
    ],
    pitfalls: [
      "Confondre consigne et mesure.",
      "Oublier le capteur dans la chaîne.",
      "Croire que l'action dérivée améliore la précision statique.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce que l'écart d'un asservissement ?",
        answer: "La différence entre la consigne et la mesure renvoyée par le capteur.",
      },
      {
        question: "Quel correcteur annule l'erreur statique ?",
        answer: "Le correcteur intégral (I).",
      },
      {
        question: "Quelle différence entre asservissement et régulation ?",
        answer: "L'asservissement suit une consigne variable ; la régulation maintient une grandeur constante.",
      },
    ],
    tags: ["technologie", "asservissement", "régulation", "PID", "boucle fermée"],
  },
  {
    slug: "tech-triphase",
    subjectSlug: "technologie",
    title: "Courants monophasé et triphasé",
    chapter: "Électrotechnique · Triphasé",
    summary:
      "Comparer monophasé et triphasé, calculer les grandeurs efficaces et les puissances, et connaître les couplages étoile et triangle.",
    level: "Bac · 4e Sciences techniques (T2)",
    durationMin: 27,
    orderIndex: 16,
    objectives: [
      "Définir les tensions simples et composées",
      "Calculer les puissances en triphasé",
      "Distinguer les couplages étoile et triangle",
      "Choisir le couplage adapté au réseau",
    ],
    blocks: [
      {
        type: "table",
        title: "Les relations du triphasé",
        head: ["Grandeur", "Relation", "Valeur usuelle"],
        rows: [
          ["Tension composée / simple", "U = √3·V", "400 V / 230 V"],
          ["Puissance active (étoile ou triangle)", "P = √3·U·I·cos φ", "W"],
          ["Puissance réactive", "Q = √3·U·I·sin φ", "var"],
          ["Puissance apparente", "S = √3·U·I", "VA"],
          ["Fréquence", "50 Hz en Tunisie", "—"],
        ],
      },
      {
        type: "table",
        title: "Couplage étoile ou triangle",
        head: ["Couplage", "Chaque enroulement reçoit", "Cas d'usage"],
        rows: [
          ["Étoile (Y)", "une tension simple V = U/√3", "démarrage, réduction de courant"],
          ["Triangle (Δ)", "une tension composée U", "pleine puissance"],
          ["Pl aqueur", "permet de changer de couplage", "adaptation au réseau"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — bilan de puissance d'une installation",
        items: [
          "Relever U (entre phases) et I (courant de ligne) à la pince ampèremétrique.",
          "Relever le facteur de puissance ou le déphasage.",
          "Calculer P = √3·U·I·cos φ, puis S et Q.",
          "Vérifier la cohérence : S² = P² + Q².",
          "Conclure sur le dimensionnement des protections et l'intérêt d'une compensation.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Attention aux unités et à la nature du courant",
        text: "En triphasé équilibré, le courant de ligne est égal au courant de phase en étoile, mais vaut √3 fois le courant d'enroulement en triangle. Inverser ces deux relations fausse tout le bilan de puissance.",
      },
    ],
    keyPoints: [
      "U = √3·V : 400 V entre phases, 230 V entre phase et neutre.",
      "P = √3·U·I·cos φ en triphasé équilibré.",
      "En étoile, chaque enroulement reçoit la tension simple.",
      "Le couplage triangle donne la pleine puissance.",
    ],
    pitfalls: [
      "Utiliser P = U·I·cos φ en triphasé.",
      "Confondre courant de ligne et courant de phase.",
      "Oublier le facteur √3.",
    ],
    flashcards: [
      {
        question: "Quelle relation lie tension simple et composée ?",
        answer: "U = √3·V, soit environ 400 V et 230 V.",
      },
      {
        question: "Quelle formule donne la puissance active en triphasé ?",
        answer: "P = √3·U·I·cos φ.",
      },
      {
        question: "Quel couplage réduit le courant au démarrage ?",
        answer: "Le couplage étoile, avant de passer en triangle.",
      },
    ],
    tags: ["technologie", "triphasé", "puissance", "couplage", "électrotechnique"],
  },
  {
    slug: "tech-transformateur",
    subjectSlug: "technologie",
    title: "Le transformateur",
    chapter: "Électrotechnique · Transformateur",
    summary:
      "Analyser le fonctionnement d'un transformateur monophasé : rapport de transformation, essais à vide et en court-circuit, et rendement.",
    level: "Bac · 4e Sciences techniques (T3)",
    durationMin: 26,
    orderIndex: 17,
    objectives: [
      "Définir le rapport de transformation",
      "Exploiter un essai à vide et un essai en court-circuit",
      "Calculer le rendement",
      "Expliquer le rôle du transformateur dans le transport de l'énergie",
    ],
    blocks: [
      {
        type: "table",
        title: "Les relations essentielles",
        head: ["Grandeur", "Relation", "Remarque"],
        rows: [
          ["Rapport de transformation", "m = U₂/U₁ = N₂/N₁", "à vide"],
          ["Induction magnétique", "B = Φ/S", "circuit magnétique"],
          ["Essai à vide", "donne les pertes fer", "P₁₀ ≈ Pfer"],
          ["Essai en court-circuit", "donne les pertes cuivre", "R·I²"],
          ["Rendement", "η = P₂/P₁ = P₂/(P₂ + pertes)", "< 1"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — bilan d'un transformateur",
        items: [
          "Relever U₁, U₂ et m à vide : m = U₂/U₁.",
          "Mesurer les pertes fer lors d'un essai à vide (tension nominale, secondaire ouvert).",
          "Mesurer les pertes cuivre en court-circuit (courant nominal, faible tension).",
          "Calculer P₂ = U₂·I₂·cos φ₂ avec la charge.",
          "Calculer le rendement et vérifier l'ordre de grandeur (souvent 0,95 à 0,99).",
        ],
      },
      {
        type: "paragraph",
        title: "Pourquoi transporter en très haute tension ?",
        text: "Pour une puissance donnée, augmenter la tension diminue le courant, donc les pertes par effet Joule (P = R·I²) et la section des conducteurs. Le transformateur est l'organe qui rend cette transformation possible entre production, transport et distribution. C'est ce raisonnement qui est attendu dans les questions d'ordre général.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne pas confondre les pertes",
        text: "Les pertes fer dépendent de la tension et de la fréquence (indépendantes de la charge) ; les pertes cuivre dépendent du courant, donc carrément de la charge. Un transformateur à vide consomme très peu de cuivre mais toutes ses pertes fer.",
      },
    ],
    keyPoints: [
      "m = U₂/U₁ = N₂/N₁.",
      "Les pertes fer se mesurent à vide, les pertes cuivre en court-circuit.",
      "Le rendement est proche de 1 pour un transformateur bien dimensionné.",
      "Transporter en haute tension réduit les pertes en ligne.",
    ],
    pitfalls: [
      "Inverser le rapport de transformation.",
      "Attribuer les pertes cuivre à l'essai à vide.",
      "Oublier le facteur de puissance dans le calcul de P₂.",
    ],
    flashcards: [
      {
        question: "Comment mesure-t-on les pertes fer ?",
        answer: "Par un essai à vide sous tension nominale : la puissance absorbée est presque égale aux pertes fer.",
      },
      {
        question: "Quelle relation exprime le rapport de transformation ?",
        answer: "m = U₂/U₁ = N₂/N₁, pour un transformateur idéal à vide.",
      },
      {
        question: "Pourquoi transporter l'électricité en haute tension ?",
        answer: "Pour réduire le courant, donc les pertes par effet Joule et la section des conducteurs.",
      },
    ],
    tags: ["technologie", "transformateur", "rendement", "électrotechnique", "pertes"],
  },
  {
    slug: "tech-moteur-asynchrone",
    subjectSlug: "technologie",
    title: "Le moteur asynchrone",
    chapter: "Électrotechnique · Moteurs",
    summary:
      "Comprendre le champ tournant, le glissement, le principe du démarrage et la variation de vitesse du moteur asynchrone triphasé.",
    level: "Bac · 4e Sciences techniques (T3)",
    durationMin: 27,
    orderIndex: 18,
    objectives: [
      "Expliquer la création d'un champ tournant",
      "Calculer la vitesse de synchronisme et le glissement",
      "Décrire les modes de démarrage",
      "Justifier l'usage d'un variateur de fréquence",
    ],
    blocks: [
      {
        type: "table",
        title: "Les grandeurs du moteur",
        head: ["Grandeur", "Relation", "Remarque"],
        rows: [
          ["Vitesse de synchronisme", "ns = f/p (tr/s)", "p = nombre de paires de pôles"],
          ["Vitesse de synchronisme (tr/min)", "ns = 60·f/p", "50 Hz, p = 2 ⇒ 1500 tr/min"],
          ["Glissement", "g = (ns − n)/ns", "en %"],
          ["Couple utile", "Cu = Pu/ω", "N·m"],
          ["Plaque signalétique", "tension, intensité, cos φ, couplage", "lire avant tout branchement"],
        ],
      },
      {
        type: "steps",
        title: "Démarrage et variation de vitesse",
        items: [
          "Démarrage direct : simple, mais courant de démarrage 4 à 8 fois le nominal.",
          "Démarrage étoile-triangle : réduit le courant d'un facteur 3 environ.",
          "Démarrage par résistances ou autotransformateur : progressif.",
          "Variateur de fréquence : l'équivalent d'un réglage continu de la vitesse.",
          "Freinage : par injection de courant continu ou freinage mécanique selon l'usage.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "L'essentiel à retenir",
        text: "Le moteur asynchrone ne tourne jamais exactement à la vitesse de synchronisme : c'est le glissement qui crée le couple. Plus la charge est forte, plus le glissement augmente (dans la zone utile). Ce paradoxe apparent est la clé du fonctionnement.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Piège du calcul de p",
        text: "p est le nombre de paires de pôles. Un moteur tétrapolaire (4 pôles) a donc p = 2, et sa vitesse de synchronisme à 50 Hz vaut 1500 tr/min. Confondre nombre de pôles et paires de pôles divise ou multiplie la vitesse par deux.",
      },
    ],
    keyPoints: [
      "ns = 60·f/p en tr/min.",
      "Le glissement g = (ns − n)/ns est indispensable au couple.",
      "Un démarrage direct provoque environ 4 à 8 fois In.",
      "Le variateur de fréquence permet une variation continue de la vitesse.",
    ],
    pitfalls: [
      "Confondre nombre de pôles et nombre de paires de pôles.",
      "Croire que le rotor tourne à la vitesse de synchronisme.",
      "Oublier de lire la plaque signalétique avant branchement.",
    ],
    flashcards: [
      {
        question: "Quelle est la vitesse de synchronisme d'un moteur tétrapolaire à 50 Hz ?",
        answer: "ns = 60 × 50 / 2 = 1500 tr/min.",
      },
      {
        question: "Quel est le rôle du glissement ?",
        answer: "Il crée le couple : le rotor doit tourner moins vite que le champ tournant pour que des courants induits apparaissent.",
      },
      {
        question: "Pourquoi utiliser un variateur de fréquence ?",
        answer: "Pour faire varier la vitesse de manière continue en agissant sur la fréquence d'alimentation.",
      },
    ],
    tags: ["technologie", "moteur asynchrone", "glissement", "démarrage", "variateur"],
  },
  {
    slug: "tech-moteur-continu",
    subjectSlug: "technologie",
    title: "Le moteur à courant continu",
    chapter: "Électrotechnique · Moteurs",
    summary:
      "Établir les relations électromécaniques du moteur à courant continu et expliquer les modes de réglage de la vitesse et du couple.",
    level: "Bac · 4e Sciences techniques (T3)",
    durationMin: 25,
    orderIndex: 19,
    objectives: [
      "Écrire la relation E = k·Φ·ω",
      "Utiliser le modèle électrique de l'induit",
      "Calculer le couple électromagnétique",
      "Régler la vitesse par la tension ou l'excitation",
    ],
    blocks: [
      {
        type: "table",
        title: "Les relations électromécaniques",
        head: ["Grandeur", "Relation", "Remarque"],
        rows: [
          ["Force électromotrice", "E = k·Φ·ω", "ω en rad/s"],
          ["Équation de l'induit", "U = E + R·I", "induit"],
          ["Couple électromagnétique", "Ce = k·Φ·I", "proportionnel à I"],
          ["Couple utile", "Cu = Ce − Cp", "pertes collectives"],
          ["Puissance utile", "Pu = U·I − pertes", "bilan"],
        ],
      },
      {
        type: "steps",
        title: "Réglages et points de fonctionnement",
        items: [
          "Réglage de la vitesse par la tension d'induit (à flux constant) : le plus courant, couple disponible constant.",
          "Réglage par défluxage : au-delà de la vitesse nominale, mais avec perte de couple.",
          "Le courant d'induit est directement lié au couple : un même courant donne un même couple.",
          "L'introduction de résistances rotoriques permet un réglage de vitesse par variation du flux.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le nerf de l'exercice",
        text: "Retenir que ces trois relations forment un système fermé : connaître deux grandeurs suffit à déduire les autres. Et que U = E + RI montre que le courant diminue quand la vitesse augmente, à tension constante.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux erreurs classiques",
        text: "Oublier de convertir la vitesse en rad/s (ω = 2πn/60) et oublier la chute ohmique R·I en supposant E ≈ U. Les deux se traduisent par un facteur ou un écart systématique dans les résultats.",
      },
    ],
    keyPoints: [
      "E = k·Φ·ω et U = E + R·I.",
      "Le couple est proportionnel au courant : Ce = k·Φ·I.",
      "La vitesse se règle principalement par la tension d'induit.",
      "Convertir la vitesse en rad/s avant tout calcul.",
    ],
    pitfalls: [
      "Confondre tr/min et rad/s.",
      "Oublier la chute de tension R·I.",
      "Négliger la perte de couple en défluxage.",
    ],
    flashcards: [
      {
        question: "Quelle relation lie la fém, le flux et la vitesse ?",
        answer: "E = k·Φ·ω, avec ω en rad/s.",
      },
      {
        question: "Comment règle-t-on la vitesse d'un moteur à courant continu ?",
        answer: "En agissant sur la tension d'induit, ou sur le flux (défluxage).",
      },
      {
        question: "À quoi est proportionnel le couple ?",
        answer: "Au courant d'induit, à flux constant : Ce = k·Φ·I.",
      },
    ],
    tags: ["technologie", "moteur CC", "fém", "couple", "électrotechnique"],
  },
  {
    slug: "tech-amplificateur-operationnel",
    subjectSlug: "technologie",
    title: "L'amplificateur opérationnel",
    chapter: "Électronique · AOP",
    summary:
      "Étudier l'AOP idéal en régime linéaire et en commutation : montages fondamentaux et calcul du gain.",
    level: "Bac · 4e Sciences techniques (T3)",
    durationMin: 26,
    orderIndex: 20,
    objectives: [
      "Énoncer les hypothèses de l'AOP idéal",
      "Calculer le gain d'un montage inverseur ou non inverseur",
      "Reconnaître un montage suiveur, intégrateur, dérivateur",
      "Analyser un AOP en comparateur",
    ],
    blocks: [
      {
        type: "table",
        title: "Les hypothèses de l'AOP idéal",
        head: ["Hypothèse", "Conséquence", "Condition"],
        rows: [
          ["Impédance d'entrée infinie", "i⁺ = i⁻ = 0", "toujours"],
          ["Gain infini", "V⁺ = V⁻", "en régime linéaire (avec rétroaction)"],
          ["Impédance de sortie nulle", "Vs indépendante de la charge", "toujours"],
          ["Bande passante infinie", "réponse en fréquence idéale", "toujours"],
        ],
      },
      {
        type: "table",
        title: "Les montages fondamentaux",
        head: ["Montage", "Gain", "Remarque"],
        rows: [
          ["Inverseur", "Av = −R₂/R₁", "déphasage de 180°"],
          ["Non inverseur", "Av = 1 + R₂/R₁", "gain toujours ≥ 1"],
          ["Suiveur", "Av = 1", "adaptation d'impédance"],
          ["Intégrateur", "Vs = −(1/RC)·∫Ve dt", "en régime linéaire"],
          ["Dérivateur", "Vs = −RC·dVe/dt", "sensible au bruit"],
          ["Comparateur", "Vs = ±Vsat", "pas de rétroaction : V⁺ ≠ V⁻"],
        ],
      },
      {
        type: "steps",
        title: "Méthode d'étude",
        items: [
          "Identifier la borne d'entrée utilisée et la présence d'une rétroaction.",
          "Si rétroaction sur l'entrée inverseuse : régime linéaire, poser V⁺ = V⁻.",
          "Écrire les équations des courants aux nœuds en utilisant i⁺ = i⁻ = 0.",
          "Résoudre pour exprimer Vs en fonction de Ve.",
          "Sans rétroaction : commutation, comparer V⁺ et V⁻ pour connaître la saturation.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "La question à se poser en premier",
        text: "Y a-t-il une rétroaction sur l'entrée inverseuse ? Si oui, l'AOP fonctionne en linéaire et V⁺ = V⁻. Si non, il sature et Vs vaut ±Vsat. Poser V⁺ = V⁻ dans un montage comparateur est l'erreur la plus fréquente.",
      },
    ],
    keyPoints: [
      "i⁺ = i⁻ = 0 et V⁺ = V⁻ en régime linéaire.",
      "Inverseur : −R₂/R₁ ; non inverseur : 1 + R₂/R₁.",
      "Sans rétroaction, l'AOP commute : Vs = ±Vsat.",
      "Le suiveur sert à l'adaptation d'impédance.",
    ],
    pitfalls: [
      "Appliquer V⁺ = V⁻ à un comparateur.",
      "Préciser les signes des gains à l'envers.",
      "Oublier que le gain du non inverseur est supérieur à 1.",
    ],
    flashcards: [
      {
        question: "Quelles sont les deux hypothèses de l'AOP idéal en régime linéaire ?",
        answer: "Courants d'entrée nuls et tension différentielle nulle (V⁺ = V⁻).",
      },
      {
        question: "Quel est le gain d'un montage inverseur ?",
        answer: "Av = −R₂/R₁.",
      },
      {
        question: "Que vaut la sortie d'un AOP en comparateur ?",
        answer: "±Vsat selon que V⁺ > V⁻ ou l'inverse.",
      },
    ],
    tags: ["technologie", "AOP", "amplificateur", "gain", "comparateur"],
  },
  {
    slug: "tech-liaisons-mecaniques",
    subjectSlug: "technologie",
    title: "Liaisons mécaniques et transmission de mouvement",
    chapter: "Construction mécanique · Liaisons",
    summary:
      "Identifier les liaisons normalisées, leur degré de liberté et les mécanismes de transmission (engrenages, courroies, vis-écrou).",
    level: "Bac · 4e Sciences techniques (T2)",
    durationMin: 26,
    orderIndex: 21,
    objectives: [
      "Identifier une liaison et son degré de liberté",
      "Lire un schéma cinématique",
      "Calculer un rapport de transmission",
      "Choisir un système de transmission adapté",
    ],
    blocks: [
      {
        type: "table",
        title: "Liaisons usuelles",
        head: ["Liaison", "Degrés de liberté", "Exemple"],
        rows: [
          ["Encastrement", "0", "soudure"],
          ["Pivot", "1 (rotation)", "charnière"],
          ["Glissière", "1 (translation)", "tiroir"],
          ["Hélicoïdale", "1 (translation + rotation liées)", "vis-écrou"],
          ["Rotule", "3 (rotations)", "articulation sphérique"],
          ["Pivot glissant", "2", "arbre dans un alésage"],
        ],
      },
      {
        type: "table",
        title: "Transmissions et rapports",
        head: ["Système", "Rapport", "Remarque"],
        rows: [
          ["Engrenages", "r = Z₁/Z₂ ou −Z₁/Z₂ (sens)", "inverse le sens si contact extérieur"],
          ["Poulies-courroie", "r = D₁/D₂", "glissement possible"],
          ["Chaîne-pignon", "r = Z₁/Z₂", "pas de glissement"],
          ["Vis-écrou", "v = pas × n", "transformation rotation → translation"],
          ["Pignon-crémaillère", "v = ω·R", "translation continue"],
        ],
      },
      {
        type: "steps",
        title: "Lire un schéma cinématique",
        items: [
          "Repérer les classes d'équivalence (pièces liées entre elles).",
          "Identifier chaque liaison par son symbole normalisé.",
          "Compter les degrés de liberté et vérifier la mobilité de l'ensemble.",
          "Calculer le rapport de transmission chaîne par chaîne.",
          "Vérifier le sens de rotation à chaque étage.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le piège du rendement",
        text: "Un rapport de transmission se calcule sur les fréquences de rotation, pas sur les vitesses linéaires. Et le rendement d'une transmission par engrenages n'est jamais de 100 % : il faut distinguer rapport cinématique et rendement énergétique.",
      },
    ],
    keyPoints: [
      "Une liaison se définit par son nombre de degrés de liberté.",
      "r = Zmenant/Zmené pour les engrenages.",
      "La vis-écrou transforme la rotation en translation.",
      "Toujours vérifier le sens de rotation après transmission.",
    ],
    pitfalls: [
      "Inverser menant et mené dans le rapport.",
      "Confondre liaison pivot et pivot glissant.",
      "Oublier le changement de sens dans un engrenage extérieur.",
    ],
    flashcards: [
      {
        question: "Combien de degrés de liberté a une liaison pivot ?",
        answer: "Un seul : la rotation autour de l'axe.",
      },
      {
        question: "Quel est le rapport d'un engrenage de 20 dents menant un pignon de 40 dents ?",
        answer: "r = 20/40 = 0,5 : la sortie tourne deux fois moins vite.",
      },
      {
        question: "Quelle liaison transforme la rotation en translation ?",
        answer: "La liaison hélicoïdale (vis-écrou).",
      },
    ],
    tags: ["technologie", "liaisons", "transmission", "engrenages", "cinématique"],
  },
  {
    slug: "tech-cotation-dessin",
    subjectSlug: "technologie",
    title: "Cotation, tolérance et dessin technique",
    chapter: "Construction mécanique · Dessin",
    summary:
      "Lire un dessin d'ensemble, coter une pièce et interpréter les tolérances et ajustements normalisés.",
    level: "Bac · 4e Sciences techniques (T3)",
    durationMin: 24,
    orderIndex: 22,
    objectives: [
      "Lire une vue en coupe et une vue de dessus",
      "Coter une pièce selon les règles",
      "Interpréter une tolérance dimensionnelle",
      "Distinguer les types d'ajustement",
    ],
    blocks: [
      {
        type: "table",
        title: "Les tolérances",
        head: ["Notion", "Définition", "Exemple"],
        rows: [
          ["Cote nominale", "dimension théorique", "Ø 20"],
          ["Écart supérieur (ES)", "écart maximal", "+0,02"],
          ["Écart inférieur (EI)", "écart minimal", "-0,01"],
          ["IT", "intervalle de tolérance = ES − EI", "0,03"],
          ["Ajustement", "relation entre alésage et arbre", "H7/g6"],
        ],
      },
      {
        type: "table",
        title: "Types d'ajustement",
        head: ["Type", "Condition", "Usage"],
        rows: [
          ["Avec jeu", "alésage toujours > arbre", "guidage en rotation"],
          ["Incertain", "jeu ou serrage selon les cas", "centrage précis"],
          ["Serré", "alésage toujours < arbre", "assemblage fixe, transmission de couple"],
        ],
      },
      {
        type: "steps",
        title: "Coter une pièce",
        items: [
          "Identifier les surfaces fonctionnelles : ce sont elles qui se cotent en priorité.",
          "Éviter les cotes redondantes (surcharge de cotation).",
          "Placer les cotes sur les vues les plus lisibles, jamais sur les arêtes cachées.",
          "Indiquer les tolérances et ajustements sur les dimensions fonctionnelles.",
          "Vérifier la cohérence avec les vues en coupe.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Lire un ajustement H7/g6",
        text: "La lettre majuscule désigne l'alésage, la minuscule l'arbre ; le chiffre donne la qualité de tolérance. Ici H7 (alésage de référence) et g6 (arbre avec jeu) : c'est un ajustement avec jeu, typique d'un guidage en rotation.",
      },
    ],
    keyPoints: [
      "IT = ES − EI.",
      "Majuscule = alésage, minuscule = arbre.",
      "Un ajustement avec jeu permet la rotation.",
      "Coter d'abord les surfaces fonctionnelles.",
    ],
    pitfalls: [
      "Coter une arête cachée.",
      "Confondre alésage et arbre dans la notation.",
      "Multiplier les cotes redondantes.",
    ],
    flashcards: [
      {
        question: "Que signifie l'appellation H7 ?",
        answer: "Un alésage de qualité 7 avec l'écart inférieur nul (H = position de référence).",
      },
      {
        question: "Comment calcule-t-on l'intervalle de tolérance ?",
        answer: "IT = ES − EI.",
      },
      {
        question: "Quel ajustement pour un guidage en rotation ?",
        answer: "Un ajustement avec jeu.",
      },
    ],
    tags: ["technologie", "cotation", "tolérance", "ajustement", "dessin"],
  },
  {
    slug: "tech-rdm",
    subjectSlug: "technologie",
    title: "Résistance des matériaux : contraintes et déformations",
    chapter: "Construction mécanique · RDM",
    summary:
      "Calculer une contrainte de traction ou de flexion, vérifier une condition de résistance et interpréter une déformation élastique.",
    level: "Bac · 4e Sciences techniques (T3)",
    durationMin: 26,
    orderIndex: 23,
    objectives: [
      "Calculer une contrainte normale",
      "Utiliser la condition de résistance",
      "Calculer un allongement élastique",
      "Interpréter un essai de traction",
    ],
    blocks: [
      {
        type: "table",
        title: "Les relations de base",
        head: ["Grandeur", "Relation", "Unité"],
        rows: [
          ["Contrainte normale", "σ = N/S", "MPa"],
          ["Allongement", "ΔL = N·L/(E·S)", "mm"],
          ["Déformation relative", "ε = ΔL/L", "sans unité"],
          ["Loi de Hooke", "σ = E·ε", "MPa"],
          ["Module d'Young (acier)", "E ≈ 200 000 MPa", "MPa"],
          ["Condition de résistance", "σ ≤ σlim = Re/s", "coef. de sécurité s"],
        ],
      },
      {
        type: "steps", 
        title: "Vérifier une pièce",
        items: [
          "Identifier le type de sollicitation (traction, compression, flexion, torsion).",
          "Calculer la section utile S en mm².",
          "Calculer l'effort normal N en newtons.",
          "En déduire σ = N/S en MPa.",
          "Comparer à σlim = Re/s ; conclure sur la résistance et, si besoin, sur le dimensionnement.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Essai de traction : les quatre repères",
        text: "Zone élastique linéaire (loi de Hooke), limite d'élasticité Re, résistance maximale Rm, striction puis rupture. Le bac demande de situer ces points et de distinguer une déformation réversible (élastique) d'une déformation définitive (plastique).",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les unités font toute la note",
        text: "1 MPa = 1 N/mm². Un effort en daN doit être converti en newtons et une section en cm² en mm². Utiliser N en daN avec S en mm² donne une contrainte en daN/mm² : il faut convertir pour comparer à Re exprimée en MPa.",
      },
    ],
    keyPoints: [
      "σ = N/S, avec N en N et S en mm², donne des MPa.",
      "La condition de résistance inclut un coefficient de sécurité.",
      "Loi de Hooke : σ = E·ε en domaine élastique.",
      "ΔL = N·L/(E·S) pour un allongement élastique.",
    ],
    pitfalls: [
      "Mélanger daN et N dans le calcul de σ.",
      "Oublier le coefficient de sécurité.",
      "Appliquer Hooke hors du domaine élastique.",
    ],
    flashcards: [
      {
        question: "Quelle est l'unité de la contrainte ?",
        answer: "Le mégapascal (MPa), équivalent à 1 N/mm².",
      },
      {
        question: "Que dit la loi de Hooke ?",
        answer: "Que la contrainte est proportionnelle à la déformation relative en domaine élastique : σ = E·ε.",
      },
      {
        question: "Quelle est la condition de résistance ?",
        answer: "σ ≤ Re/s, avec Re la limite d'élasticité et s le coefficient de sécurité.",
      },
    ],
    tags: ["technologie", "RDM", "contrainte", "Hooke", "résistance"],
  },
  {
    slug: "memento-technologie",
    subjectSlug: "technologie",
    title: "Mémento de technologie : formules et schémas clés",
    chapter: "Révision générale",
    summary:
      "Toutes les formules d'électronique, d'automatisme, d'électrotechnique et de construction à relire avant l'épreuve de technologie.",
    level: "Bac · 4e Sciences techniques (REV)",
    durationMin: 28,
    orderIndex: 24,
    objectives: [
      "Restituer les formules de chaque domaine",
      "Retenir les schémas types",
      "Éviter les confusions d'unités",
      "Structurer la réponse aux questions de calcul",
    ],
    blocks: [
      {
        type: "table",
        title: "Électronique et logique",
        head: ["Notion", "Formule / règle"],
        rows: [
          ["Binaire → hexadécimal", "groupes de 4 bits"],
          ["Complément à 2", "inverser les bits + 1"],
          ["Table de vérité", "2ⁿ lignes pour n entrées"],
          ["Karnaugh", "paquets de 2, 4, 8 cases adjacentes, tableau cyclique"],
          ["Bascule D", "Q recopie D au front d'horloge"],
          ["Compteur à n bascules", "2ⁿ états"],
        ],
      },
      {
        type: "table",
        title: "Automatismes",
        head: ["Notion", "Règle"],
        rows: [
          ["Transition GRAFCET", "franchie si étape amont active ET condition vraie"],
          ["Cycle API", "lire entrées → exécuter → actualiser sorties"],
          ["Écart d'asservissement", "ε = consigne − mesure"],
          ["Correcteur P", "rapide, erreur statique résiduelle"],
          ["Correcteur I", "annule l'erreur statique"],
        ],
      },
      {
        type: "table",
        title: "Électrotechnique et mécanique",
        head: ["Notion", "Formule"],
        rows: [
          ["Triphasé", "U = √3·V ; P = √3·U·I·cos φ"],
          ["Transformateur", "m = U₂/U₁ = N₂/N₁ ; η = P₂/P₁"],
          ["Moteur asynchrone", "ns = 60f/p ; g = (ns − n)/ns"],
          ["Moteur CC", "E = kΦω ; U = E + RI ; Ce = kΦI"],
          ["AOP inverseur", "Av = −R₂/R₁"],
          ["Engrenages", "r = Z₁/Z₂"],
          ["RDM", "σ = N/S ; σ = E·ε ; σ ≤ Re/s"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Réponse type à une question de calcul",
        text: "Écris la formule littérale, remplace avec les unités, donne le résultat avec son unité, puis conclus par une phrase (compatible / non compatible, gain / perte). Un résultat sans unité perd systématiquement des points.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le palmarès des erreurs",
        text: "tr/min au lieu de rad/s, daN au lieu de N, oubli du √3 en triphasé, pôles au lieu de paires de pôles, et V⁺ = V⁻ appliqué à un comparateur. Ces cinq erreurs expliquent la majorité des pertes de points.",
      },
    ],
    keyPoints: [
      "Toujours vérifier l'unité avant de calculer.",
      "Le cycle API est un cycle de scrutation.",
      "En triphasé, le facteur √3 est omniprésent.",
      "Un résultat se conclut par une phrase.",
    ],
    pitfalls: [
      "Confondre pôles et paires de pôles.",
      "Oublier le coefficient de sécurité en RDM.",
      "Utiliser la formule du monophasé en triphasé.",
    ],
    flashcards: [
      {
        question: "Quelle formule donne la vitesse de synchronisme ?",
        answer: "ns = 60·f/p, avec p le nombre de paires de pôles.",
      },
      {
        question: "Quel correcteur annule l'erreur statique ?",
        answer: "Le correcteur intégral (I).",
      },
      {
        question: "Que vaut 1 MPa en N/mm² ?",
        answer: "1 N/mm².",
      },
    ],
    tags: ["technologie", "mémento", "révision", "formules", "électrotechnique"],
  },
];

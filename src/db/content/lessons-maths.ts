import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Mathématiques — 4ème année secondaire, filières scientifiques
 * (Mathématiques, Sciences expérimentales, Sciences techniques,
 * Sciences de l'informatique), conformes à la répartition officielle.
 */
export const mathsLessons: LessonSeed[] = [
  {
    slug: "continuite-tvi-bijection",
    subjectSlug: "mathematiques",
    title: "Continuité, théorème des valeurs intermédiaires et bijection",
    chapter: "Analyse · Continuité",
    summary:
      "Maîtriser les trois théorèmes qui reviennent à chaque devoir : TVI pour l'existence d'une solution, continuité et stricte monotonie pour l'unicité, puis bijection et fonction réciproque.",
    level: "Bac · Math / Sciences / Tech / Info (T1)",
    durationMin: 30,
    orderIndex: 4,
    objectives: [
      "Montrer la continuité d'une fonction sur un intervalle",
      "Appliquer le TVI pour prouver l'existence d'une racine et l'encadrer",
      "Démontrer l'unicité en ajoutant la stricte monotonie",
      "Justifier qu'une fonction réalise une bijection et étudier sa réciproque",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Trois résultats, un seul raisonnement",
        text: "Le TVI garantit l'existence d'une solution, mais pas son unicité. La stricte monotonie fournit l'unicité. Les deux réunis donnent la bijection d'un intervalle vers son image, et donc l'existence d'une fonction réciproque. Au bac, ces trois étapes s'enchaînent presque toujours dans la même question.",
      },
      {
        type: "formula",
        title: "TVI (version du programme)",
        expression:
          "Si f est continue sur [a, b] et si k est compris entre f(a) et f(b),\nalors il existe au moins un c ∈ [a, b] tel que f(c) = k.",
        note: "Corollaire très utilisé : si f est continue sur [a,b] et f(a)·f(b) < 0, l'équation f(x) = 0 admet au moins une solution dans ]a, b[.",
      },
      {
        type: "steps",
        title: "Méthode — existence ET unicité d'une racine",
        items: [
          "Justifier la continuité (théorèmes généraux : somme, produit, composée de fonctions continues).",
          "Calculer f(a) et f(b) et vérifier que leur produit est strictement négatif.",
          "Conclure par le TVI : il existe c dans ]a, b[ tel que f(c) = 0.",
          "Étudier le signe de f' sur ]a, b[ : si f' > 0 (ou < 0) partout, f est strictement monotone, donc c est unique.",
          "Encadrer c par balayage : calculer f(m) pour m le milieu, choisir le sous-intervalle qui change de signe, et resserrer jusqu'à la précision demandée.",
        ],
      },
      {
        type: "table",
        title: "Les théorèmes à citer correctement",
        head: ["Théorème", "Hypothèses", "Conclusion"],
        rows: [
          ["TVI", "f continue sur [a,b], k entre f(a) et f(b)", "∃ c ∈ [a,b] : f(c) = k"],
          ["TVI + monotonie", "Continuité + stricte monotonie", "Solution unique"],
          ["Image d'un intervalle", "f continue sur I", "f(I) est un intervalle"],
          ["Bijection", "f continue et strictement monotone sur I", "f réalise une bijection de I sur f(I)"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ce qui n'est pas justifié ne rapporte rien",
        text: "« La courbe coupe l'axe, donc il y a une solution » ne vaut aucun point : il faut nommer la continuité, l'intervalle, les valeurs de f aux bornes, puis citer le théorème. Et le TVI ne donne jamais l'unicité à lui seul.",
      },
    ],
    keyPoints: [
      "TVI = existence ; monotonie = unicité ; les deux = bijection.",
      "f(a)·f(b) < 0 + continuité ⇒ au moins une racine dans ]a,b[.",
      "L'image d'un intervalle par une fonction continue est un intervalle.",
      "Une fonction strictement monotone et continue est bijective de I sur f(I).",
    ],
    pitfalls: [
      "Appliquer le TVI hors de l'intervalle où f est continue.",
      "Oublier de vérifier que 0 est bien compris entre f(a) et f(b).",
      "Confondre continuité (pas de saut) et dérivabilité (pas de cassure).",
    ],
    flashcards: [
      {
        question: "Que faut-il ajouter au TVI pour obtenir l'unicité ?",
        answer: "La stricte monotonie de f sur l'intervalle considéré.",
      },
      {
        question: "Une fonction continue sur [0,2] avec f(0) = −1 et f(2) = 3 admet-elle une racine ?",
        answer: "Oui, au moins une, dans ]0,2[, car f(0)·f(2) < 0 et f est continue.",
      },
      {
        question: "À quelle condition une fonction f réalise-t-elle une bijection de I sur f(I) ?",
        answer: "Si f est continue et strictement monotone sur I.",
      },
    ],
    tags: ["continuité", "TVI", "bijection", "racine", "analyse"],
  },
  {
    slug: "derivabilite-taf",
    subjectSlug: "mathematiques",
    title: "Dérivabilité et théorème des accroissements finis",
    chapter: "Analyse · Dérivation",
    summary:
      "Relier dérivée, monotonie et inégalités : le TAF est l'outil qui transforme une information sur f' en information sur f, et qui permet de démontrer les inégalités du bac.",
    level: "Bac · Math / Sciences / Tech / Info (T1)",
    durationMin: 28,
    orderIndex: 5,
    objectives: [
      "Étudier la dérivabilité sur un intervalle et en un point (taux d'accroissement)",
      "Utiliser le signe de f' pour conclure sur les variations",
      "Appliquer le TAF pour démontrer une inégalité",
      "Reconnaître les cas de non-dérivabilité (valeur absolue, racine en 0)",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Dérivable, c'est plus fort que continu",
        text: "Une fonction dérivable en a admet une tangente : le taux d'accroissement (f(a+h) − f(a))/h tend vers un réel fini quand h tend vers 0. Toute fonction dérivable est continue, mais l'inverse est faux : la valeur absolue est continue en 0 et n'y est pas dérivable (deux demi-tangentes différentes).",
      },
      {
        type: "formula",
        title: "Théorème des accroissements finis",
        expression:
          "Si f est continue sur [a, b] et dérivable sur ]a, b[,\nil existe c ∈ ]a, b[ tel que  f(b) − f(a) = f'(c) (b − a).",
        note: "Conséquence pratique : si |f'| ≤ M sur I, alors |f(b) − f(a)| ≤ M |b − a|. C'est l'inégalité des accroissements finis, très utilisée pour encadrer.",
      },
      {
        type: "steps",
        title: "Méthode — démontrer une inégalité par le TAF",
        items: [
          "Réécrire l'inégalité sous la forme f(b) − f(a) ≤ … en identifiant f et l'intervalle.",
          "Vérifier les hypothèses : continuité sur [a,b], dérivabilité sur ]a,b[.",
          "Majorer f'(t) sur l'intervalle (tableau de signes ou variations de f').",
          "Appliquer le TAF puis l'inégalité des accroissements finis pour conclure.",
          "Vérifier le cas d'égalité (souvent a = b) et les bornes de l'intervalle.",
        ],
      },
      {
        type: "table",
        title: "Dérivées à ne plus hésiter",
        head: ["Fonction", "Dérivée", "Domaine"],
        rows: [
          ["xⁿ (n ∈ ℕ*)", "n xⁿ⁻¹", "ℝ"],
          ["√x", "1 / (2√x)", "]0, +∞["],
          ["ln x", "1 / x", "]0, +∞["],
          ["eˣ", "eˣ", "ℝ"],
          ["u∘v", "v' × u'(v)", "là où les deux existent"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Rédaction type en trois lignes",
        text: "« f est continue sur [a,b] et dérivable sur ]a,b[ ; d'après le théorème des accroissements finis, il existe c dans ]a,b[ tel que f(b) − f(a) = f'(c)(b − a). Or pour tout t de ]a,b[, f'(t) ≤ M. Donc f(b) − f(a) ≤ M(b − a). »",
      },
    ],
    keyPoints: [
      "Dérivable ⇒ continue, la réciproque est fausse.",
      "f' > 0 ⇒ f strictement croissante ; f' = 0 ⇒ f constante sur un intervalle.",
      "TAF : f(b) − f(a) = f'(c)(b − a) pour un certain c.",
      "|f'| ≤ M ⇒ |f(b) − f(a)| ≤ M|b − a|.",
    ],
    pitfalls: [
      "Étudier le signe de f' mais oublier de conclure sur les variations.",
      "Écrire f'(c) sans préciser que c dépend de a et b.",
      "Appliquer le TAF sans vérifier la dérivabilité sur l'ouvert.",
    ],
    flashcards: [
      {
        question: "Énonce le TAF.",
        answer:
          "Si f est continue sur [a,b] et dérivable sur ]a,b[, il existe c ∈ ]a,b[ tel que f(b) − f(a) = f'(c)(b − a).",
      },
      {
        question: "Que peut-on dire de f si f' = 0 sur un intervalle ?",
        answer: "f est constante sur cet intervalle.",
      },
      {
        question: "La fonction x ↦ |x| est-elle dérivable en 0 ?",
        answer: "Non : le taux d'accroissement vaut 1 à droite et −1 à gauche, il n'a pas de limite finie.",
      },
    ],
    tags: ["dérivabilité", "TAF", "inégalité", "tangente", "monotonie"],
  },
  {
    slug: "fonctions-reciproques",
    subjectSlug: "mathematiques",
    title: "Fonctions réciproques : existence, calcul et lecture graphique",
    chapter: "Analyse · Fonctions réciproques",
    summary:
      "Construire la fonction réciproque d'une bijection : domaine, expression, dérivée, courbe symétrique par rapport à la première bissectrice, et cas de ln et exp.",
    level: "Bac · Math / Sciences / Tech / Info (T1-T2)",
    durationMin: 28,
    orderIndex: 6,
    objectives: [
      "Justifier l'existence d'une réciproque par la stricte monotonie",
      "Déterminer l'expression de f⁻¹ en résolvant y = f(x)",
      "Déduire la courbe de f⁻¹ par symétrie axiale",
      "Calculer la dérivée de f⁻¹ et retrouver ln comme réciproque de exp",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Réciproque = échange des rôles",
        text: "Si f est continue et strictement monotone sur I, elle réalise une bijection de I sur J = f(I). La fonction réciproque f⁻¹ part de J et revient dans I : elle à x associe l'unique antécédent. Concrètement, y = f(x) équivaut à x = f⁻¹(y) : on échange x et y, puis on isole y.",
      },
      {
        type: "formula",
        title: "Les deux formules à retenir",
        expression:
          "f⁻¹(f(x)) = x  pour x ∈ I     et     f(f⁻¹(y)) = y  pour y ∈ J\n(f⁻¹)'(y) = 1 / f'(x)   avec y = f(x)",
        note: "La dérivée de la réciproque est l'inverse de la dérivée de f, évaluée au point correspondant. On retrouve ainsi la dérivée de ln : (ln)' (y) = 1/eˣ = 1/y.",
      },
      {
        type: "steps",
        title: "Méthode — déterminer f⁻¹",
        items: [
          "Étudier f sur l'intervalle : continuité, dérivée, tableau de variations.",
          "Conclure à la stricte monotonie et donner J = f(I) (les valeurs aux bornes).",
          "Écrire y = f(x) et résoudre en x (exponentielle, carré, logarithme…).",
          "Échanger le nom des variables pour obtenir f⁻¹(x).",
          "Vérifier sur deux valeurs : f(f⁻¹(a)) = a et le domaine trouvé.",
        ],
      },
      {
        type: "table",
        title: "Réciproques à connaître",
        head: ["Fonction", "Domaine", "Réciproque", "Domaine de la réciproque"],
        rows: [
          ["exp : x ↦ eˣ", "ℝ", "ln", "]0, +∞["],
          ["ln : x ↦ ln x", "]0, +∞[", "exp", "ℝ"],
          ["x ↦ x²", "[0, +∞[", "x ↦ √x", "[0, +∞["],
          ["x ↦ x³", "ℝ", "x ↦ ∛x", "ℝ"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Piège de notation",
        text: "f⁻¹ ne signifie pas 1/f ! L'inverse d'une fonction et l'inverse d'un nombre sont deux objets différents. De même, la réciproque n'existe que si f est bijective sur l'intervalle choisi : x ↦ x² sur ℝ n'a pas de réciproque, sur [0,+∞[ si.",
      },
    ],
    keyPoints: [
      "Réciproque ⇔ bijection (continuité + stricte monotonie sur un intervalle).",
      "Courbes de f et f⁻¹ symétriques par rapport à y = x.",
      "(f⁻¹)'(y) = 1/f'(x) avec y = f(x).",
      "exp et ln sont réciproques l'une de l'autre.",
    ],
    pitfalls: [
      "Écrire f⁻¹ = 1/f.",
      "Oublier de restreindre l'intervalle pour rendre f bijective.",
      "Se tromper dans le domaine de la réciproque (image de I, pas I).",
    ],
    flashcards: [
      {
        question: "Quelle est la réciproque de la fonction exponentielle ?",
        answer: "La fonction logarithme népérien, définie sur ]0, +∞[.",
      },
      {
        question: "Comment obtient-on la courbe de f⁻¹ ?",
        answer: "Par symétrie axiale de la courbe de f par rapport à la droite d'équation y = x.",
      },
      {
        question: "Quelle est la dérivée de f⁻¹ au point y = f(x) ?",
        answer: "1 / f'(x), à condition que f'(x) ≠ 0.",
      },
    ],
    tags: ["fonction réciproque", "bijection", "ln", "exp", "symétrie"],
  },
  {
    slug: "etude-fonctions-complete",
    subjectSlug: "mathematiques",
    title: "Étude complète d'une fonction et représentation graphique",
    chapter: "Analyse · Étude de fonctions",
    summary:
      "Mener une étude de fonction de bout en bout : domaine, limites, asymptotes, dérivée, tableau de variations, points particuliers et tracé — la question qui ouvre presque tous les sujets de bac.",
    level: "Bac · Toutes filières (T1-T2)",
    durationMin: 32,
    orderIndex: 7,
    objectives: [
      "Déterminer le domaine et les limites aux bornes",
      "Identifier asymptotes verticales, horizontales et obliques",
      "Construire le tableau de variations complet",
      "Placer tangentes, extremums et points d'inflexion sur le graphique",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Un ordre à ne pas changer",
        text: "L'étude se conduit toujours dans le même ordre : domaine, limites et asymptotes, dérivée, signe de la dérivée, tableau de variations, points remarquables, tracé. Changer d'ordre conduit à des oublis ; suivre l'ordre permet aussi de vérifier la cohérence du tracé avec les limites trouvées.",
      },
      {
        type: "table",
        title: "Reconnaître les asymptotes",
        head: ["Limite obtenue", "Asymptote", "Exemple"],
        rows: [
          ["lim f(x) = ±∞ quand x → a", "Verticale x = a", "f(x) = 1/(x−2) en x = 2"],
          ["lim f(x) = ℓ quand x → ±∞", "Horizontale y = ℓ", "f(x) = (2x+1)/(x−3) : y = 2"],
          ["f(x) − (ax + b) → 0 quand x → ±∞", "Oblique y = ax + b", "f(x) = x + 1/x : y = x"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — dériver puis signer",
        items: [
          "Factoriser f'(x) pour obtenir un signe visible (numérateur, dénominateur, facteurs).",
          "Étudier le signe de chaque facteur sur le domaine, puis dresser le tableau de signes.",
          "Conclure sur les variations et repérer les extremums (changement de signe de f').",
          "Calculer les valeurs de f aux bornes et aux extremums pour le tableau de variations.",
          "Tracer les asymptotes en pointillés, placer les points, puis la courbe.",
        ],
      },
      {
        type: "formula",
        title: "Position relative de deux courbes",
        expression: "Étudier le signe de d(x) = f(x) − g(x)",
        note: "d(x) > 0 : la courbe de f est au-dessus de celle de g. Le signe de d se lit souvent grâce à une factorisation déjà faite pour la dérivée.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Gain de temps le jour du bac",
        text: "Pour une fonction du type (ax+b)/(cx+d), la division euclidienne donne directement l'asymptote oblique et la position relative. Pour une fonction avec ln ou exp, factoriser par le terme dominant évite les formes indéterminées.",
      },
    ],
    keyPoints: [
      "Domaine d'abord : les limites n'ont de sens qu'aux bornes du domaine.",
      "Asymptote oblique ⇔ f(x) − (ax+b) tend vers 0.",
      "Le signe de f' donne les variations ; ses zéros donnent les extremums.",
      "Le tableau de variations doit contenir limites, extremums et signes.",
    ],
    pitfalls: [
      "Oublier les limites aux bornes du domaine (souvent les seules questions faciles).",
      "Confondre zéro de f (intersection avec l'axe des abscisses) et zéro de f' (extremum).",
      "Tracer une courbe qui ne respecte pas les asymptotes trouvées.",
    ],
    flashcards: [
      {
        question: "Quand y = ax + b est-elle asymptote oblique à la courbe de f en +∞ ?",
        answer: "Lorsque f(x) − (ax + b) tend vers 0 quand x tend vers +∞.",
      },
      {
        question: "Comment repère-t-on un extremum local dans le tableau de variations ?",
        answer: "Par un changement de signe de f' : + puis − donne un maximum, − puis + un minimum.",
      },
      {
        question: "Comment étudier la position de deux courbes ?",
        answer: "En étudiant le signe de la différence f(x) − g(x).",
      },
    ],
    tags: ["étude de fonction", "asymptote", "variations", "dérivée", "courbe"],
  },
  {
    slug: "primitives-calcul",
    subjectSlug: "mathematiques",
    title: "Primitives : tableau, linéarité et formes composées",
    chapter: "Analyse · Primitives",
    summary:
      "Trouver une primitive par reconnaissance de formes : le tableau de base, la linéarité, puis les formes composées u'·uⁿ, u'/u, u'eᵘ — sans oublier la constante.",
    level: "Bac · Math / Sciences / Tech (T2)",
    durationMin: 28,
    orderIndex: 8,
    objectives: [
      "Citer les primitives des fonctions usuelles",
      "Utiliser la linéarité pour combiner des primitives",
      "Reconnaître u'uⁿ, u'/u, u'eᵘ et u'/√u",
      "Déterminer la constante avec une condition initiale",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Une primitive n'est jamais unique",
        text: "Deux primitives d'une même fonction diffèrent d'une constante. On écrit donc « les primitives de f sont F + k ». La condition F(x₀) = y₀ fixe la constante : c'est la question classique en fin d'exercice.",
      },
      {
        type: "table",
        title: "Le tableau à connaître par cœur",
        head: ["f(x)", "Une primitive F(x)", "Valable sur"],
        rows: [
          ["xⁿ (n ≠ −1)", "xⁿ⁺¹/(n+1)", "ℝ ou ]0,+∞[ selon n"],
          ["1/x", "ln |x|", "ℝ*"],
          ["eˣ", "eˣ", "ℝ"],
          ["1/√x", "2√x", "]0, +∞["],
          ["u'uⁿ", "uⁿ⁺¹/(n+1)", "là où u est définie"],
          ["u'/u", "ln |u|", "u ≠ 0"],
          ["u'eᵘ", "eᵘ", "ℝ"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — reconnaître une forme composée",
        items: [
          "Repérer la fonction « intérieure » u et calculer sa dérivée u'.",
          "Vérifier que u' apparaît en facteur dans f (au coefficient près).",
          "Ajuster le coefficient : si f = k·u'·uⁿ, la primitive contient le facteur 1/k.",
          "Appliquer la formule du tableau correspondante.",
          "Dériver le résultat pour vérifier — réflexe qui évite l'erreur de coefficient.",
        ],
      },
      {
        type: "formula",
        title: "Un exemple complet",
        expression: "f(x) = x/(x²+1)  ⇒  F(x) = ½ ln(x²+1) + k",
        note: "Ici u = x²+1, u' = 2x. On écrit f = ½ · (2x)/(x²+1) = ½ · u'/u, d'où F = ½ ln|u| = ½ ln(x²+1) puisque x²+1 > 0.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les deux erreurs classiques",
        text: "Oublier le coefficient d'ajustement (la dérivée du résultat doit redonner f exactement) et oublier la valeur absolue dans ln|u| quand u peut être négatif.",
      },
    ],
    keyPoints: [
      "Les primitives de f sont F + k.",
      "Linéarité : une primitive d'une somme est la somme des primitives.",
      "Formes composées : u'uⁿ → uⁿ⁺¹/(n+1), u'/u → ln|u|, u'eᵘ → eᵘ.",
      "Toujours vérifier en dérivant.",
    ],
    pitfalls: [
      "Écrire une primitive de 1/x égale à ln x au lieu de ln|x|.",
      "Oublier le 1/n+1 devant uⁿ⁺¹.",
      "Confondre primitive et dérivée (sens inverse des formules).",
    ],
    flashcards: [
      {
        question: "Une primitive de 1/x sur ℝ* ?",
        answer: "ln|x|.",
      },
      {
        question: "Une primitive de 2x·eˣ² ?",
        answer: "eˣ² : on reconnaît u'eᵘ avec u = x² et u' = 2x.",
      },
      {
        question: "Pourquoi ajoute-t-on + k ?",
        answer: "Parce que la dérivée d'une constante est nulle : toutes les fonctions F + k ont la même dérivée f.",
      },
    ],
    tags: ["primitive", "forme composée", "linéarité", "ln", "exponentielle"],
  },
  {
    slug: "fonction-logarithme",
    subjectSlug: "mathematiques",
    title: "Fonction logarithme népérien : propriétés, limites et étude",
    chapter: "Analyse · Logarithme népérien",
    summary:
      "Le logarithme comme réciproque de l'exponentielle : propriétés algébriques, limites de référence, dérivée, croissances comparées et résolution d'équations et d'inéquations.",
    level: "Bac · Toutes filières scientifiques (T2)",
    durationMin: 30,
    orderIndex: 9,
    objectives: [
      "Utiliser les propriétés algébriques de ln pour transformer une expression",
      "Connaître les limites de référence et les croissances comparées",
      "Étudier une fonction contenant ln",
      "Résoudre équations et inéquations avec ln",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Définition et domaine",
        text: "ln est définie sur ]0, +∞[, strictement croissante, et c'est la réciproque de exp. Conséquences immédiates : ln 1 = 0, ln e = 1, et ln x > 0 équivaut à x > 1. Toute étude contenant ln commence donc par le domaine, en n'oubliant jamais que ln(u) exige u > 0.",
      },
      {
        type: "formula",
        title: "Les propriétés à maîtriser",
        expression:
          "ln(ab) = ln a + ln b     ln(a/b) = ln a − ln b     ln(aⁿ) = n ln a     ln(√a) = ½ ln a",
        note: "Ces propriétés servent surtout à transformer une équation en une équation linéaire, et à transformer un quotient en différence pour étudier une limite.",
      },
      {
        type: "table",
        title: "Limites et croissances comparées",
        head: ["Limite", "Résultat", "Usage"],
        rows: [
          ["lim (x → 0⁺) ln x", "−∞", "Asymptote verticale x = 0"],
          ["lim (x → +∞) ln x", "+∞", "Croissance très lente"],
          ["lim (x → +∞) ln x / x", "0", "ln est négligeable devant x"],
          ["lim (x → 0⁺) x ln x", "0", "Forme 0 × ∞ → 0"],
          ["lim (x → +∞) ln x / xⁿ", "0", "Généralisation aux puissances"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — résoudre une équation avec ln",
        items: [
          "Poser les conditions d'existence : tous les arguments strictement positifs.",
          "Utiliser les propriétés pour regrouper en un seul ln quand c'est possible.",
          "Passer à l'exponentielle : ln A = ln B ⇔ A = B (sur le domaine).",
          "Résoudre l'équation algébrique obtenue.",
          "Vérifier chaque solution dans les conditions d'existence et conclure.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Rédaction attendue",
        text: "Pour une limite du type lim ln(1+x)/x en 0, écrire « taux d'accroissement de ln en 1 » est plus rapide que de tout développer. De même, ln x − ln y = ln(x/y) transforme souvent une forme indéterminée en limite simple.",
      },
    ],
    keyPoints: [
      "Domaine : ]0, +∞[ ; ln est strictement croissante.",
      "ln(ab) = ln a + ln b, ln(a/b) = ln a − ln b, ln aⁿ = n ln a.",
      "Croissance comparée : ln x / x → 0 en +∞ ; x ln x → 0 en 0⁺.",
      "Toute équation avec ln exige un contrôle des conditions d'existence.",
    ],
    pitfalls: [
      "Écrire ln(a + b) = ln a + ln b (faux).",
      "Oublier le domaine et accepter une solution négative.",
      "Confondre ln x → −∞ en 0⁺ avec une limite finie.",
    ],
    flashcards: [
      {
        question: "Quel est le domaine de ln ?",
        answer: "]0, +∞[.",
      },
      {
        question: "Combien vaut lim(x→+∞) ln x / x ?",
        answer: "0 : le logarithme est négligeable devant x.",
      },
      {
        question: "Simplifier ln 8 − ln 2.",
        answer: "ln(8/2) = ln 4 = 2 ln 2.",
      },
    ],
    tags: ["logarithme", "ln", "croissances comparées", "domaine", "équation"],
  },
  {
    slug: "fonction-exponentielle",
    subjectSlug: "mathematiques",
    title: "Fonction exponentielle : propriétés, équations différentielles et limites",
    chapter: "Analyse · Exponentielle",
    summary:
      "La fonction exponentielle comme unique solution de y' = y avec y(0) = 1 : propriétés algébriques, limites, dérivée, et lien avec les équations différentielles.",
    level: "Bac · Toutes filières scientifiques (T3)",
    durationMin: 30,
    orderIndex: 10,
    objectives: [
      "Utiliser les propriétés algébriques de exp",
      "Connaître les limites de référence et les croissances comparées",
      "Dériver une fonction composée contenant eᵘ",
      "Résoudre y' = ay + b et y'' + ω²y = 0",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Une fonction définie par sa dérivée",
        text: "La fonction exponentielle est l'unique fonction dérivable sur ℝ telle que f' = f et f(0) = 1. Toutes ses propriétés en découlent, notamment e^(a+b) = eᵃ × eᵇ, qui transforme les sommes en produits. C'est le lien direct avec les équations différentielles du programme.",
      },
      {
        type: "formula",
        title: "Propriétés et dérivées",
        expression:
          "e^(a+b) = eᵃ·eᵇ   e^(−a) = 1/eᵃ   (eᵘ)' = u'·eᵘ   (e^(ax+b))' = a·e^(ax+b)",
        note: "Pour dériver e^(ax+b), on multiplie par le coefficient a : erreur classique de l'oublier. Pour une limite en −∞, factoriser par le terme dominant.",
      },
      {
        type: "table",
        title: "Limites de référence",
        head: ["Limite", "Résultat", "Remarque"],
        rows: [
          ["lim (x → +∞) eˣ", "+∞", "Croissance extrêmement rapide"],
          ["lim (x → −∞) eˣ", "0", "Asymptote horizontale y = 0"],
          ["lim (x → +∞) eˣ / xⁿ", "+∞", "L'exponentielle l'emporte sur toute puissance"],
          ["lim (x → −∞) xⁿ eˣ", "0", "Elle écrase toute puissance"],
          ["lim (x → 0) (eˣ − 1)/x", "1", "Taux d'accroissement en 0"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — résoudre y' = ay + b",
        items: [
          "Chercher une solution particulière constante : y = −b/a (si a ≠ 0).",
          "Résoudre l'équation homogène y' = ay : les solutions sont k·e^(ax).",
          "Additionner : les solutions générales sont y = k·e^(ax) − b/a.",
          "Utiliser la condition initiale pour déterminer k.",
          "Vérifier en reportant dans l'équation de départ.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Équation du second ordre",
        text: "Pour y'' + ω²y = 0, les solutions sont y = A cos(ωx) + B sin(ωx), ou encore y = C cos(ωx + φ). Les constantes se déterminent avec y(0) et y'(0) — ne pas oublier de dériver avant d'utiliser la seconde condition.",
      },
    ],
    keyPoints: [
      "exp est l'unique solution de f' = f avec f(0) = 1.",
      "e^(a+b) = eᵃeᵇ, e^(−a) = 1/eᵃ, e^(ln x) = x pour x > 0.",
      "L'exponentielle domine toute puissance en +∞.",
      "y' = ay + b : solutions k·e^(ax) − b/a.",
    ],
    pitfalls: [
      "Oublier le facteur u' en dérivant eᵘ.",
      "Écrire e^(a+b) = eᵃ + eᵇ.",
      "Négliger la condition initiale pour déterminer la constante.",
    ],
    flashcards: [
      {
        question: "Quelle est la dérivée de e^(3x+1) ?",
        answer: "3·e^(3x+1).",
      },
      {
        question: "Solutions de y' = 2y ?",
        answer: "y = k·e^(2x), avec k réel déterminé par une condition initiale.",
      },
      {
        question: "Quelle est la limite de x·e^(−x) en +∞ ?",
        answer: "0 : l'exponentielle l'emporte sur x.",
      },
    ],
    tags: ["exponentielle", "équation différentielle", "limites", "dérivée", "croissance comparée"],
  },
  {
    slug: "nombres-complexes",
    subjectSlug: "mathematiques",
    title: "Nombres complexes : formes algébrique, trigonométrique et interprétation géométrique",
    chapter: "Algèbre · Nombres complexes",
    summary:
      "Calculer avec les complexes, passer d'une forme à l'autre, interpréter module et argument comme distance et angle, et reconnaître les ensembles de points.",
    level: "Bac · Math / Sciences / Tech / Info (T1-T2)",
    durationMin: 32,
    orderIndex: 11,
    objectives: [
      "Effectuer les opérations sous forme algébrique et conjuguée",
      "Calculer module et argument, passer en forme exponentielle",
      "Interpréter géométriquement module, argument et conjugué",
      "Identifier un ensemble de points par une équation complexe",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Un nombre, deux lectures",
        text: "Un complexe z = a + ib est à la fois un nombre (sur lequel on calcule) et un point du plan (d'affixe z). Cette double lecture est la clé du chapitre : dès qu'une question parle de distance ou d'angle, il faut passer au module et à l'argument.",
      },
      {
        type: "formula",
        title: "Formes et opérations",
        expression:
          "z = a + ib = r(cos θ + i sin θ) = r·e^(iθ)\n|z| = √(a² + b²)   ·   z·z̄ = |z|²   ·   arg(z) = θ [2π]",
        note: "Pour un quotient, on multiplie numérateur et dénominateur par le conjugué du dénominateur : c'est la technique systématique pour écrire z sous forme algébrique.",
      },
      {
        type: "table",
        title: "Traduction géométrique",
        head: ["Expression", "Interprétation", "Ensemble"],
        rows: [
          ["|z − z_A| = r", "Distance de M à A égale à r", "Cercle de centre A et de rayon r"],
          ["|z − z_A| = |z − z_B|", "M équidistant de A et B", "Médiatrice de [AB]"],
          ["arg(z − z_A) = θ", "Angle orienté", "Demi-droite d'origine A"],
          ["z̄ = z", "Partie imaginaire nulle", "Axe des réels"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — mettre un quotient sous forme algébrique",
        items: [
          "Écrire le quotient z = (a+ib)/(c+id).",
          "Multiplier en haut et en bas par le conjugué du dénominateur : (c − id).",
          "Développer le numérateur et utiliser i² = −1.",
          "Au dénominateur, écrire c² + d² (réel positif).",
          "Séparer partie réelle et partie imaginaire, puis vérifier le module.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le réflexe qui fait gagner 10 minutes",
        text: "Avant tout calcul, regarder si l'expression se simplifie en forme exponentielle. Un produit ou un quotient de complexes se traite immédiatement par les modules et les arguments, alors qu'en forme algébrique le calcul devient interminable.",
      },
    ],
    keyPoints: [
      "z·z̄ = |z|² et 1/z = z̄/|z|².",
      "Forme exponentielle : z = r·e^(iθ), pratique pour produits et quotients.",
      "|z − z_A| représente une distance ; arg un angle orienté.",
      "Les formules de Moivre et d'Euler découlent de la forme exponentielle.",
    ],
    pitfalls: [
      "Écrire i² = 1 au lieu de −1.",
      "Oublier le conjugué au dénominateur.",
      "Confondre module de z et module de z̄ (ils sont égaux) avec argument (opposés).",
    ],
    flashcards: [
      {
        question: "Que vaut z·z̄ ?",
        answer: "|z|², un réel positif. Cela permet d'écrire 1/z = z̄/|z|².",
      },
      {
        question: "Quel ensemble représente |z − (1+i)| = 2 ?",
        answer: "Le cercle de centre le point d'affixe 1+i et de rayon 2.",
      },
      {
        question: "Quelle est la forme exponentielle de i ?",
        answer: "i = e^(iπ/2), car |i| = 1 et arg(i) = π/2.",
      },
    ],
    tags: ["complexes", "module", "argument", "forme exponentielle", "géométrie"],
  },
  {
    slug: "equations-complexes",
    subjectSlug: "mathematiques",
    title: "Équations du second degré à coefficients complexes",
    chapter: "Algèbre · Équations dans ℂ",
    summary:
      "Résoudre az² + bz + c = 0 dans ℂ : discriminant complexe, racines carrées d'un complexe, relations coefficients-racines et factorisation.",
    level: "Bac · Math / Info (T1)",
    durationMin: 26,
    orderIndex: 12,
    objectives: [
      "Calculer les racines carrées d'un nombre complexe",
      "Résoudre une équation du second degré dans ℂ",
      "Utiliser les relations somme-produit des racines",
      "Factoriser un trinôme dans ℂ",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Le discriminant redevient utile",
        text: "Dans ℂ, toute équation du second degré admet deux solutions (éventuellement confondues) : le discriminant négatif n'est plus un obstacle, il devient un complexe dont on cherche les racines carrées. C'est la grande différence avec ℝ, où Δ < 0 signifie « pas de solution ».",
      },
      {
        type: "formula",
        title: "Méthode générale",
        expression:
          "Δ = b² − 4ac ;  soit δ une racine carrée de Δ\nz₁ = (−b + δ)/(2a)   et   z₂ = (−b − δ)/(2a)",
        note: "Les deux racines sont conjuguées si a, b, c sont réels et Δ < 0 : c'est le cas classique du bac, et la vérification est immédiate.",
      },
      {
        type: "steps",
        title: "Méthode — racines carrées de w = u + iv",
        items: [
          "Écrire (x + iy)² = u + iv et développer : x² − y² = u et 2xy = v.",
          "Utiliser |w| = x² + y² pour obtenir x² = (|w| + u)/2 et y² = (|w| − u)/2.",
          "Choisir les signes de x et y de façon que 2xy = v.",
          "Vérifier en élevant au carré le résultat trouvé.",
          "Si w est réel négatif, les racines sont ±i√|w| : cas particulier à connaître par cœur.",
        ],
      },
      {
        type: "table",
        title: "Relations à utiliser pour vérifier",
        head: ["Relation", "Formule", "Intérêt"],
        rows: [
          ["Somme des racines", "z₁ + z₂ = −b/a", "Vérification immédiate"],
          ["Produit des racines", "z₁·z₂ = c/a", "Détermine la seconde racine quand on connaît la première"],
          ["Factorisation", "az² + bz + c = a(z − z₁)(z − z₂)", "Sert dans les questions suivantes (signes, ensembles)"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne pas oublier le facteur a",
        text: "La factorisation s'écrit a(z − z₁)(z − z₂), jamais (z − z₁)(z − z₂) seul. Et si l'équation est de degré 3, chercher d'abord une racine évidente (0, 1, −1, i, −i) pour factoriser par (z − z₀).",
      },
    ],
    keyPoints: [
      "Δ peut être négatif ou complexe : on en cherche les racines carrées.",
      "z₁ + z₂ = −b/a et z₁z₂ = c/a permettent de contrôler les calculs.",
      "Coefficients réels et Δ < 0 ⇒ racines conjuguées.",
      "Racines carrées d'un réel négatif : ±i√|w|.",
    ],
    pitfalls: [
      "S'arrêter à Δ < 0 comme dans ℝ.",
      "Oublier le signe ± devant la racine carrée.",
      "Perdre le facteur a dans la factorisation.",
    ],
    flashcards: [
      {
        question: "Comment résout-on z² + z + 1 = 0 dans ℂ ?",
        answer: "Δ = 1 − 4 = −3, racines carrées ±i√3, d'où z = (−1 ± i√3)/2.",
      },
      {
        question: "Si z₁ est racine de az² + bz + c, comment trouver z₂ ?",
        answer: "Par z₂ = c/(a z₁) (produit des racines) ou z₂ = −b/a − z₁ (somme).",
      },
      {
        question: "Que peut-on dire des racines d'une équation à coefficients réels avec Δ < 0 ?",
        answer: "Elles sont conjuguées l'une de l'autre.",
      },
    ],
    tags: ["complexes", "équation du second degré", "discriminant", "racines carrées", "factorisation"],
  },
  {
    slug: "arithmetique-z",
    subjectSlug: "mathematiques",
    title: "Arithmétique dans ℤ : division euclidienne, congruences, PGCD et Bézout",
    chapter: "Algèbre · Arithmétique",
    summary:
      "Le chapitre complet du programme : division euclidienne, congruences et leurs règles de calcul, PGCD et algorithme d'Euclide, théorème de Bézout, lemme de Gauss et petit théorème de Fermat.",
    level: "Bac · Math / Info (T1)",
    durationMin: 36,
    orderIndex: 13,
    objectives: [
      "Effectuer une division euclidienne et utiliser congruences et modulo",
      "Calculer un PGCD par l'algorithme d'Euclide et déterminer un couple de Bézout",
      "Appliquer le lemme de Gauss et le théorème de Fermat",
      "Résoudre une équation diophantienne ax + by = c et un système de congruences",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "La division euclidienne, socle de tout le chapitre",
        text: "Pour tout a ∈ ℤ et b ∈ ℕ*, il existe un unique couple (q, r) tel que a = bq + r avec 0 ≤ r < b. Toutes les notions du chapitre en découlent : la congruence a ≡ r [b], l'algorithme d'Euclide, et les systèmes de congruences.",
      },
      {
        type: "formula",
        title: "Congruences : les règles de calcul",
        expression:
          "a ≡ b [n] ⇔ n | (a − b)\nsi a ≡ b [n] et c ≡ d [n] alors a+c ≡ b+d, ac ≡ bd, aᵏ ≡ bᵏ [n]",
        note: "On ne divise jamais par un entier non premier avec le module : 2x ≡ 2 [6] ne donne pas x ≡ 1 [6] (x = 4 convient aussi). Vérifier pgcd(coefficient, module) = 1 avant de simplifier.",
      },
      {
        type: "table",
        title: "Les théorèmes du programme",
        head: ["Théorème", "Énoncé", "Utilisation typique"],
        rows: [
          ["Bézout", "pgcd(a,b) = 1 ⇔ ∃ u,v ∈ ℤ : au + bv = 1", "Montrer que deux entiers sont premiers entre eux"],
          ["Gauss", "Si a | bc et pgcd(a,b) = 1, alors a | c", "Déduire une divisibilité après simplification"],
          ["Fermat", "Si p premier et p ∤ a, alors a^(p−1) ≡ 1 [p]", "Calculer des puissances modulo p"],
          ["Théorème chinois", "Systèmes de congruences premiers entre eux", "Résoudre un système modulo n₁n₂"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — algorithme d'Euclide étendu (Bézout)",
        items: [
          "Effectuer les divisions euclidiennes successives jusqu'au reste nul.",
          "Le dernier reste non nul est le PGCD.",
          "Remonter les divisions de la dernière à la première pour exprimer le PGCD en combinaison de a et b.",
          "Vérifier en calculant au + bv et en retrouvant le PGCD.",
          "Pour une équation ax + by = c, une solution particulière suffit : les autres sont (x₀ + kb', y₀ − ka') avec a' = a/d, b' = b/d.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le plan de rédaction attendu",
        text: "Pour un exercice de bac : 1) congruence de départ, 2) réduction des puissances par Fermat ou par périodicité, 3) conclusion sur le reste, 4) vérification numérique sur un petit exemple. La question « en déduire le reste de la division » se traite toujours ainsi.",
      },
    ],
    keyPoints: [
      "Division euclidienne : unicité du couple (q, r) avec 0 ≤ r < b.",
      "On additionne et multiplie les congruences, on ne divise pas n'importe comment.",
      "Euclide donne le PGCD ; Euclide étendu donne un couple de Bézout.",
      "Fermat : a^(p−1) ≡ 1 [p] pour p premier ne divisant pas a.",
    ],
    pitfalls: [
      "Diviser une congruence par un entier non premier avec le module.",
      "Confondre pgcd(a,b) = 1 avec a et b premiers.",
      "Oublier de vérifier les hypothèses de Fermat (p premier, p ∤ a).",
    ],
    flashcards: [
      {
        question: "Que signifie a ≡ b [n] ?",
        answer: "Que n divise a − b, autrement dit que a et b ont le même reste dans la division par n.",
      },
      {
        question: "Énonce le lemme de Gauss.",
        answer: "Si a divise bc et si pgcd(a,b) = 1, alors a divise c.",
      },
      {
        question: "Quel est le reste de 3^100 modulo 7 ?",
        answer: "3^6 ≡ 1 [7] (Fermat), or 100 = 6×16 + 4, donc 3^100 ≡ 3^4 ≡ 81 ≡ 4 [7].",
      },
    ],
    tags: ["arithmétique", "congruence", "PGCD", "Bézout", "Fermat"],
  },
  {
    slug: "probabilites-conditionnelles",
    subjectSlug: "mathematiques",
    title: "Probabilités : conditionnement, indépendance et variables aléatoires",
    chapter: "Probabilités · Conditionnement",
    summary:
      "Calculer une probabilité conditionnelle, utiliser l'arbre pondéré, la formule des probabilités totales et l'indépendance, puis passer aux variables aléatoires (espérance, variance) et à la loi binomiale.",
    level: "Bac · Toutes filières scientifiques (T2-T3)",
    durationMin: 32,
    orderIndex: 14,
    objectives: [
      "Distinguer P(A ∩ B) et P(B|A)",
      "Construire un arbre pondéré et appliquer la formule des probabilités totales",
      "Reconnaître deux événements indépendants",
      "Calculer espérance et variance d'une variable aléatoire, puis appliquer la loi binomiale",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Conditionner, c'est réduire l'univers",
        text: "P(B|A) est la probabilité de B sachant que A est réalisé : l'univers se réduit à A. D'où la définition P(B|A) = P(A ∩ B)/P(A) pour P(A) ≠ 0. Confondre P(A ∩ B) et P(B|A) est l'erreur la plus fréquente du chapitre.",
      },
      {
        type: "formula",
        title: "Les trois formules du chapitre",
        expression:
          "P(A ∩ B) = P(A) × P(B|A)\nP(B) = P(A)·P(B|A) + P(Ā)·P(B|Ā)   (probabilités totales)\nA et B indépendants ⇔ P(A ∩ B) = P(A) × P(B)",
        note: "L'arbre pondéré est la version visuelle de ces formules : on multiplie le long d'une branche, on additionne entre les branches qui mènent au même événement.",
      },
      {
        type: "table",
        title: "Variable aléatoire et loi binomiale",
        head: ["Notion", "Formule", "Lecture"],
        rows: [
          ["Loi d'une variable X", "P(X = xᵢ) = pᵢ", "Tableau des valeurs et probabilités"],
          ["Espérance", "E(X) = Σ xᵢ pᵢ", "Valeur moyenne attendue"],
          ["Variance", "V(X) = Σ xᵢ² pᵢ − (E(X))²", "Dispersion autour de la moyenne"],
          ["Loi binomiale B(n, p)", "P(X = k) = C(n,k) pᵏ (1−p)^(n−k)", "E(X) = np, V(X) = np(1−p)"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — traiter un exercice avec arbre",
        items: [
          "Nommer clairement les événements et leurs probabilités données.",
          "Construire l'arbre : premier niveau = premier critère, deuxième niveau = conditionnement.",
          "Pondérer chaque branche (les branches issues d'un même nœud somment à 1).",
          "Multiplier le long du chemin pour une intersection, additionner les chemins pour un événement.",
          "Justifier l'indépendance en comparant P(A ∩ B) et P(A)P(B) — jamais « à vue ».",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux pièges d'examen",
        text: "« Indépendants » et « incompatibles » ne s'opposent pas : incompatibles signifie A ∩ B = ∅ (donc jamais indépendants si P(A) et P(B) sont non nulles). Et pour la loi binomiale, vérifier explicitement les hypothèses : n épreuves identiques, indépendantes, deux issues.",
      },
    ],
    keyPoints: [
      "P(B|A) = P(A ∩ B)/P(A), avec P(A) ≠ 0.",
      "Probabilités totales : on additionne les scénarios qui réalisent B.",
      "Indépendance ⇔ P(A ∩ B) = P(A)P(B).",
      "B(n,p) : E(X) = np, V(X) = np(1−p).",
    ],
    pitfalls: [
      "Confondre P(A ∩ B) et P(B|A).",
      "Utiliser la loi binomiale sans vérifier l'indépendance et la répétition identique.",
      "Oublier de normaliser : la somme des probabilités doit valoir 1.",
    ],
    flashcards: [
      {
        question: "Deux événements incompatibles peuvent-ils être indépendants ?",
        answer: "Non, sauf si l'un des deux est de probabilité nulle : si A ∩ B = ∅, alors P(A ∩ B) = 0 ≠ P(A)P(B).",
      },
      {
        question: "Que donne l'arbre pour une intersection ?",
        answer: "Le produit des probabilités portées par les branches du chemin.",
      },
      {
        question: "Espérance d'une loi binomiale B(20 ; 0,3) ?",
        answer: "E(X) = np = 20 × 0,3 = 6.",
      },
    ],
    tags: ["probabilités", "conditionnement", "indépendance", "variable aléatoire", "loi binomiale"],
  },
  {
    slug: "statistiques-deux-caracteres",
    subjectSlug: "mathematiques",
    title: "Statistiques à deux caractères : nuage de points et ajustement affine",
    chapter: "Statistiques · Ajustement",
    summary:
      "Décrire une série double : point moyen, covariance, coefficient de corrélation, puis ajustement affine par la méthode des moindres carrés et prévision.",
    level: "Bac · Toutes filières scientifiques (T2-T3)",
    durationMin: 28,
    orderIndex: 15,
    objectives: [
      "Calculer le point moyen et le représenter",
      "Interpréter la covariance et le coefficient de corrélation linéaire",
      "Déterminer une droite d'ajustement par moindres carrés",
      "Faire une prévision et en discuter la validité",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Deux caractères, un nuage",
        text: "Une série statistique double associe à chaque individu deux caractères (par exemple l'ancienneté et le salaire). Le nuage de points permet de voir si une relation linéaire est plausible. Le point moyen G(x̄, ȳ) est toujours sur la droite d'ajustement : c'est un contrôle immédiat.",
      },
      {
        type: "formula",
        title: "Les formules du programme",
        expression:
          "cov(x, y) = (1/n) Σ xᵢyᵢ − x̄·ȳ\nr = cov(x, y) / (σx·σy),  avec −1 ≤ r ≤ 1\nDroite : y = ax + b,  a = cov(x,y)/V(x),  b = ȳ − a·x̄",
        note: "Plus |r| est proche de 1, plus l'ajustement affine est pertinent. En pratique, un ajustement est jugé acceptable à partir de |r| ≈ 0,9.",
      },
      {
        type: "table",
        title: "Lecture du coefficient de corrélation",
        head: ["Valeur de r", "Interprétation", "Décision"],
        rows: [
          ["> 0,95", "Corrélation linéaire forte et croissante", "Ajustement affine fiable"],
          ["0,8 à 0,95", "Corrélation acceptable", "Ajustement utilisable avec prudence"],
          ["Proche de 0", "Pas de lien linéaire", "Ne pas ajuster par une droite"],
          ["< −0,9", "Corrélation forte décroissante", "Ajustement affine décroissant"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — ajustement et prévision",
        items: [
          "Calculer x̄, ȳ et placer le point moyen sur le graphique.",
          "Calculer la covariance puis la variance de x.",
          "En déduire a, puis b grâce à la relation b = ȳ − a x̄.",
          "Vérifier que la droite passe par G et tracer.",
          "Prévoir pour une valeur donnée, en rappelant que l'extrapolation hors de la plage observée reste incertaine.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Ce qu'on attend en rédaction",
        text: "Toujours commenter : « r = 0,97, la corrélation est forte, l'ajustement affine est donc justifié » — un calcul sans interprétation ne rapporte que la moitié des points. Et pour une prévision, préciser qu'il s'agit d'une extrapolation.",
      },
    ],
    keyPoints: [
      "Le point moyen appartient toujours à la droite des moindres carrés.",
      "r ∈ [−1, 1] ; |r| proche de 1 ⇒ ajustement affine pertinent.",
      "cov > 0 ⇒ relation croissante, cov < 0 ⇒ décroissante.",
      "Une prévision hors de la plage de données est une extrapolation incertaine.",
    ],
    pitfalls: [
      "Confondre covariance et corrélation (la corrélation est normalisée).",
      "Oublier de passer la droite par le point moyen (erreur détectable).",
      "Conclure à une causalité à partir d'une corrélation.",
    ],
    flashcards: [
      {
        question: "Que mesure le coefficient de corrélation linéaire ?",
        answer: "La qualité de l'ajustement d'un nuage de points par une droite, entre −1 et 1.",
      },
      {
        question: "Pourquoi la droite d'ajustement passe-t-elle par le point moyen ?",
        answer: "Parce que b = ȳ − a x̄, ce qui équivaut à ȳ = a x̄ + b.",
      },
      {
        question: "Que signifie un coefficient de corrélation de −0,98 ?",
        answer: "Une liaison linéaire forte et décroissante : quand x augmente, y diminue presque proportionnellement.",
      },
    ],
    tags: ["statistiques", "corrélation", "moindres carrés", "régression", "prévision"],
  },
  {
    slug: "espace-droites-plans",
    subjectSlug: "mathematiques",
    title: "Droites et plans de l'espace : équations et positions relatives",
    chapter: "Géométrie dans l'espace",
    summary:
      "Représenter une droite et un plan par une équation, déterminer une intersection et calculer une distance dans l'espace en repère orthonormé.",
    level: "Bac · 4e Sciences de l'informatique (T2)",
    durationMin: 28,
    orderIndex: 16,
    objectives: [
      "Déterminer une représentation paramétrique d'une droite de l'espace",
      "Déterminer une équation cartésienne d'un plan",
      "Étudier la position relative d'une droite et d'un plan",
      "Calculer la distance d'un point à un plan",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Deux modes de description",
        text: "Dans l'espace, une droite se décrit par un système d'équations paramétriques (un point et un vecteur directeur), un plan par une équation cartésienne (un point et un vecteur normal). Passer de l'un à l'autre est la compétence centrale du chapitre : tout exercice du bac commence par cette traduction.",
      },
      {
        type: "table",
        title: "Les deux descriptions à maîtriser",
        head: ["Objet", "Donnée utile", "Écriture"],
        rows: [
          ["Droite (D)", "point A et vecteur directeur u", "M = A + t·u, t ∈ ℝ"],
          ["Plan (P)", "point A et vecteur normal n", "ax + by + cz + d = 0 avec n(a, b, c)"],
          ["Plan (P)", "trois points non alignés", "n = AB ∧ AC puis équation"],
          ["Distance point-plan", "A(x₀,y₀,z₀) et ax + by + cz + d = 0", "|ax₀ + by₀ + cz₀ + d| / √(a² + b² + c²)"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — position relative d'une droite et d'un plan",
        items: [
          "Écrire la droite en paramétrique et le plan en cartésien.",
          "Substituer x, y, z de la droite dans l'équation du plan : on obtient une équation en t.",
          "Si elle a une unique solution : la droite coupe le plan en un point.",
          "Si elle est impossible : la droite est strictement parallèle au plan.",
          "Si elle est toujours vraie : la droite est incluse dans le plan.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le piège du vecteur normal",
        text: "Un plan n'a pas un vecteur normal unique, mais une infinité proportionnels entre eux. Deux équations proportionnelles définissent le même plan : vérifie toujours en divisant les coefficients avant de conclure à deux plans parallèles distincts.",
      },
    ],
    keyPoints: [
      "Droite = point + vecteur directeur ; plan = point + vecteur normal.",
      "Le paramétrage de la droite transforme la question en équation en t.",
      "Distance d'un point à un plan : formule avec valeur absolue.",
      "Deux plans sont parallèles si leurs vecteurs normaux sont colinéaires.",
    ],
    pitfalls: [
      "Confondre vecteur directeur et vecteur normal.",
      "Oublier la valeur absolue dans la distance.",
      "Conclure « pas d'intersection » sans vérifier le cas d'inclusion.",
    ],
    flashcards: [
      {
        question: "Comment obtient-on un vecteur normal à un plan passant par A, B, C ?",
        answer: "Par le produit vectoriel AB ∧ AC, qui est orthogonal aux deux vecteurs du plan.",
      },
      {
        question: "Que signifie une équation 0 = 0 après substitution ?",
        answer: "Que la droite est entièrement incluse dans le plan.",
      },
      {
        question: "Quelle est la formule de la distance d'un point à un plan ?",
        answer: "d = |ax₀ + by₀ + cz₀ + d| / √(a² + b² + c²).",
      },
    ],
    tags: ["maths", "espace", "droites", "plans", "géométrie"],
  },
  {
    slug: "equations-differentielles",
    subjectSlug: "mathematiques",
    title: "Équations différentielles y' = ay + b et y'' + ω²y = 0",
    chapter: "Analyse · Équations différentielles",
    summary:
      "Résoudre les deux équations différentielles du programme, déterminer la solution vérifiant une condition initiale et interpréter le résultat en physique.",
    level: "Bac · 4e Sciences de l'informatique / Sciences exp. (T3)",
    durationMin: 26,
    orderIndex: 17,
    objectives: [
      "Résoudre y' = ay et y' = ay + b",
      "Résoudre y'' + ω²y = 0",
      "Déterminer la solution avec conditions initiales",
      "Relier la solution à un phénomène physique (RC, RL, RLC)",
    ],
    blocks: [
      {
        type: "table",
        title: "Les deux formes et leurs solutions",
        head: ["Équation", "Solution générale", "Constante"],
        rows: [
          ["y' = ay", "y(x) = C·e^(ax)", "C déterminée par y(0)"],
          ["y' = ay + b (a ≠ 0)", "y(x) = C·e^(ax) − b/a", "solution particulière constante −b/a"],
          ["y'' + ω²y = 0", "y(x) = A·cos(ωx) + B·sin(ωx)", "A et B par y(0) et y'(0)"],
        ],
      },
      {
        type: "steps",
        title: "Méthode en trois temps",
        items: [
          "Identifier le type d'équation et écrire la solution générale avec ses constantes.",
          "Utiliser la (les) condition(s) initiale(s) pour déterminer les constantes.",
          "Vérifier en dérivant et en reportant dans l'équation.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le lien avec la physique",
        text: "Le dipôle RC donne y' = −y/τ + ... , la décharge d'un condensateur suit une exponentielle décroissante ; le circuit RLC libre donne y'' + ω²y = 0 avec ω = 1/√(LC). Reconnaître l'équation derrière le montage fait gagner beaucoup de temps.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreurs classiques",
        text: "Oublier la solution particulière dans y' = ay + b, confondre ω et ω² dans l'équation, et oublier de dériver pour utiliser y'(0). Le bac sanctionne systématiquement la constante non déterminée.",
      },
    ],
    keyPoints: [
      "y' = ay + b : solution homogène + solution particulière constante.",
      "y'' + ω²y = 0 : combinaison de cos(ωx) et sin(ωx).",
      "Les conditions initiales fixent les constantes.",
      "Toujours vérifier en reportant dans l'équation.",
    ],
    pitfalls: [
      "Oublier −b/a dans la solution de y' = ay + b.",
      "Confondre les conditions y(0) et y'(0).",
      "Se tromper de signe dans l'exponentielle.",
    ],
    flashcards: [
      {
        question: "Quelle est la solution générale de y' = ay + b ?",
        answer: "y(x) = C·e^(ax) − b/a, avec C ∈ ℝ.",
      },
      {
        question: "Quelle est la solution générale de y'' + ω²y = 0 ?",
        answer: "y(x) = A·cos(ωx) + B·sin(ωx).",
      },
      {
        question: "Quel montage physique conduit à y'' + ω²y = 0 ?",
        answer: "Le circuit LC (ou RLC libre peu amorti), avec ω = 1/√(LC).",
      },
    ],
    tags: ["maths", "équations différentielles", "exponentielle", "oscillations", "physique"],
  },
  {
    slug: "graphes-euleriens",
    subjectSlug: "mathematiques",
    title: "Graphes : vocabulaire, chaîne eulérienne et coloration",
    chapter: "Algèbre · Graphes",
    summary:
      "Modéliser une situation par un graphe, reconnaître une chaîne eulérienne, déterminer un plus court chemin et colorier les sommets d'un graphe.",
    level: "Bac · 4e Sciences de l'informatique (T2)",
    durationMin: 26,
    orderIndex: 18,
    objectives: [
      "Utiliser le vocabulaire des graphes (sommets, arêtes, degré, ordre)",
      "Reconnaître un graphe connexe, complet, eulérien",
      "Appliquer le théorème d'Euler",
      "Déterminer le nombre chromatique d'un graphe",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Un outil de modélisation",
        text: "Un graphe est un ensemble de sommets reliés par des arêtes : il modélise des routes, des réseaux, des tournois, des emplois du temps. La force du chapitre est de traduire un problème concret en graphe, puis d'appliquer un théorème pour le résoudre sans énumérer tous les cas.",
      },
      {
        type: "table",
        title: "Vocabulaire indispensable",
        head: ["Notion", "Définition", "Exemple d'usage"],
        rows: [
          ["Ordre", "nombre de sommets", "un réseau de 6 villes"],
          ["Degré d'un sommet", "nombre d'arêtes incidentes", "nombre de routes arrivant à une ville"],
          ["Chaîne", "suite de sommets reliés consécutivement", "un itinéraire"],
          ["Graphe connexe", "toute paire de sommets est reliée", "réseau entièrement desservi"],
          ["Graphe complet", "toutes les arêtes possibles existent", "tournoi où chacun joue contre tous"],
          ["Nombre chromatique", "minimum de couleurs pour colorier sans conflit", "attribution de salles ou de fréquences"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Théorème d'Euler, version bac",
        text: "Un graphe connexe admet une chaîne eulérienne si et seulement s'il a 0 ou 2 sommets de degré impair : 0 sommet impair donne un cycle eulérien (retour au départ), 2 sommets impairs donnent une chaîne qui part de l'un et arrive à l'autre. Compter les degrés impairs suffit.",
      },
      {
        type: "steps",
        title: "Méthode — colorier un graphe",
        items: [
          "Repérer une clique (sous-ensemble dont tous les sommets sont reliés) : sa taille est une borne inférieure du nombre chromatique.",
          "Colorier les sommets de plus fort degré en premier.",
          "Ajouter des couleurs jusqu'à ce que plus aucun conflit ne subsiste.",
          "Vérifier que le nombre de couleurs trouvé égale la borne inférieure : c'est alors le nombre chromatique exact.",
        ],
      },
    ],
    keyPoints: [
      "Le degré d'un sommet se lit directement sur le dessin.",
      "Théorème d'Euler : 0 ou 2 sommets de degré impair.",
      "La taille de la plus grande clique minore le nombre chromatique.",
      "Un graphe complet Kₙ a n sommets et n(n−1)/2 arêtes.",
    ],
    pitfalls: [
      "Oublier de vérifier la connexité avant d'appliquer Euler.",
      "Confondre chaîne et cycle.",
      "Annoncer un nombre chromatique sans preuve de la borne inférieure.",
    ],
    flashcards: [
      {
        question: "Quand un graphe connexe admet-il un cycle eulérien ?",
        answer: "Lorsque tous ses sommets sont de degré pair.",
      },
      {
        question: "Combien d'arêtes possède un graphe complet d'ordre n ?",
        answer: "n(n − 1)/2.",
      },
      {
        question: "Comment prouver qu'un nombre chromatique vaut 3 ?",
        answer: "En exhibant un coloriage à 3 couleurs et un triangle dans le graphe (borne inférieure 3).",
      },
    ],
    tags: ["maths", "graphes", "Euler", "coloration", "modélisation"],
  },
];

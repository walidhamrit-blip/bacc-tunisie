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
   MATHÉMATIQUES — programme de terminale (complément)
   ============================================================ */

export const mathFonctions: LessonSeed = {
  slug: "fonctions-reference",
  subjectSlug: "mathematiques",
  title: "Fonctions de référence : ln, exp et trigonométrie",
  chapter: "Analyse · Fonctions",
  summary:
    "Maîtriser les fonctions ln, exp, cos, sin et leurs propriétés : dérivées, équations, limites et modélisation de phénomènes réels.",
  level: "Bac · Math / Sciences / Tech / Éco",
  durationMin: 30,
  orderIndex: 3,
  objectives: [
    "Connaitre les domaines de définition et les graphes de ln, exp, cos et sin",
    "Calculer les dérivées de ln u, exp u et des fonctions trigonométriques",
    "Résoudre des équations du type ln x = a et exp x = a",
    "Modéliser une croissance ou une décroissance avec exp",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Le couple ln et exp",
      text:
        "La fonction ln est définie sur ]0, +∞[ et est l'inverse de la fonction exp (définie sur ℝ). On a ln(exp(x)) = x et exp(ln x) = x (pour x > 0). Leurs graphes sont symétriques par rapport à la première bissectrice. ln est croissante, exp est croissante et exp(x) > 0 pour tout x.",
    },
    {
      type: "table",
      title: "Propriétés algébriques à connaître",
      head: ["Propriété", "Formule", "Condition"],
      rows: [
        ["ln d'un produit", "ln(a × b) = ln a + ln b", "a > 0, b > 0"],
        ["ln d'un quotient", "ln(a / b) = ln a − ln b", "a > 0, b > 0"],
        ["ln d'une puissance", "ln(aⁿ) = n·ln a", "a > 0"],
        ["Produit d'exponentielles", "exp(a) × exp(b) = exp(a + b)", "a, b ∈ ℝ"],
        ["Puissance d'exponentielle", "exp(a)ⁿ = exp(n·a)", "a ∈ ℝ"],
      ],
    },
    {
      type: "formula",
      title: "Dérivées utiles",
      expression: "(ln x)′ = 1/x   et   (exp x)′ = exp x   et   (ln u)′ = u′/u   et   (exp u)′ = u′·exp u",
      note: "Ces formules, avec la dérivation composée, suffisent pour dériver la plupart des fonctions du programme.",
    },
    {
      type: "table",
      title: "Fonctions trigonométriques de référence",
      head: ["Fonction", "Domaine", "Période", "Valeurs remarquables"],
      rows: [
        ["cos x", "ℝ", "2π", "cos 0 = 1, cos π/2 = 0, cos π = −1"],
        ["sin x", "ℝ", "2π", "sin 0 = 0, sin π/2 = 1, sin π = 0"],
        ["cos² + sin²", "ℝ", "2π", "cos²x + sin²x = 1"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — étudier une fonction avec ln ou exp",
      items: [
        "Déterminer le domaine de définition (x > 0 pour ln).",
        "Calculer la dérivée et son signe avec un tableau de variation.",
        "Calculer les limites aux bornes du domaine (±∞, 0).",
        "Tracer le graphe en repérant les asymptotes et les intersections avec les axes.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Erreur classique",
      text:
        "ln(a + b) ≠ ln a + ln b : le logarithme transforme un produit en somme, jamais une somme en produit. exp(a + b) = exp(a)·exp(b), pas exp(a) + exp(b).",
    },
  ],
  keyPoints: [
    "ln et exp sont réciproques : domaine de ln = ]0, +∞[, image de exp = ]0, +∞[.",
    "ln(ab) = ln a + ln b ; exp(a + b) = exp(a)·exp(b).",
    "(ln u)′ = u′/u et (exp u)′ = u′·exp u.",
    "cos²x + sin²x = 1 et les deux fonctions ont période 2π.",
  ],
  pitfalls: [
    "Oublier la condition x > 0 avant d'écrire ln x.",
    "Confondre (ln x)′ = 1/x avec la primitive de 1/x qui est ln|x|.",
    "Écrire ln(a + b) = ln a + ln b (faux).",
  ],
  flashcards: [
    {
      question: "Domaine de définition de ln x ?",
      answer: "]0, +∞[ (x strictement positif).",
    },
    {
      question: "Dérivée de ln u ?",
      answer: "(ln u)′ = u′/u, avec u > 0.",
    },
    {
      question: "Valeur de exp(0) et de ln(1) ?",
      answer: "exp(0) = 1 et ln(1) = 0.",
    },
  ],
  tags: ["ln", "exp", "trigonométrie", "dérivée", "fonctions de référence"],
};

export const mathDerivation: LessonSeed = {
  slug: "derivation-variations",
  subjectSlug: "mathematiques",
  title: "Dérivation : variations, tangents et optimisation",
  chapter: "Analyse · Dérivation",
  summary:
    "Calculer une dérivée, étudier les variations d'une fonction, écrire l'équation de la tangente et résoudre un problème d'optimisation avec une contrainte.",
  level: "Bac · Math / Sciences / Tech",
  durationMin: 32,
  orderIndex: 4,
  objectives: [
    "Appliquer les formules de dérégation (somme, produit, quotient, composée)",
    "Construire un tableau de variation complet",
    "Écrire l'équation de la tangente en un point",
    "Modéliser et résoudre un problème de maximisation ou minimisation",
  ],
  blocks: [
    {
      type: "table",
      title: "Formules de dérégation",
      head: ["Fonction f(x)", "Dérivée f′(x)", "Condition"],
      rows: [
        ["k (constante)", "0", "partout"],
        ["xⁿ", "n·xⁿ⁻¹", "x ∈ ℝ (selon n)"],
        ["u + v", "u′ + v′", "u, v dérivables"],
        ["u × v", "u′v + uv′", "u, v dérivables"],
        ["u / v", "(u′v − uv′)/v²", "v ≠ 0"],
        ["u(v(x))", "v′(x)·u′(v(x))", "chaîne dérivable"],
        ["eᵘ", "u′·eᵘ", "u dérivable"],
        ["ln u", "u′/u", "u > 0"],
      ],
    },
    {
      type: "formula",
      title: "Tangente et variations",
      expression: "Tangente en x₀ : y = f′(x₀)(x − x₀) + f(x₀)",
      note: "Si f′(x₀) > 0, f est croissante en x₀ ; si f′(x₀) < 0, f est décroissante. f′(x₀) = 0 : extremum candidat.",
    },
    {
      type: "steps",
      title: "Méthode — étude de variations",
      items: [
        "Domaine de définition et dérivabilité.",
        "Calculer f′, facteuriser si possible, étudier le signe de f′.",
        "Remplir le tableau de variation (bornes, extrema, sens).",
        "Calculer les limites ±∞ pour les branches aux infinis.",
        "Tracer la courbe representative si demandé.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      title: "Optimisation avec contrainte",
      text:
        "Exemple classique : maximiser l'aire d'un rectangle de périmètre fixé. Exprimer la quantité à optimiser en fonction d'une seule variable (en utilisant la contrainte), dériver, annuler f′ = 0 et vérifier que c'est bien un maximum via le signe de f′ ou les valeurs aux bornes.",
    },
    {
      type: "paragraph",
      title: "Interprétation géométrique",
      text:
        "f′(a) est la pente de la tangente à la courbe en le point d'abscisse a. Si la tangente est horizontale, f′(a) = 0. La dérivée seconde f″ permet d'étudier la convexité (f″ > 0 : courbe en dessous de ses tangentes, « cuve vers le haut »).",
    },
  ],
  keyPoints: [
    "Dérivée composée : dériver « par couches », de l'extérieur vers l'intérieur.",
    "Tableau de variation : signe de f′ entre les zéros, avec les bornes du domaine.",
    "Tangente : y = f′(a)(x − a) + f(a).",
    "Extremum : f′(a) = 0 est nécessaire, pas suffisant (vérifier le changement de signe).",
  ],
  pitfalls: [
    "Oublier la règle de la chaîne pour une fonction composée.",
    "Confondre f′(a) (une valeur) et f′ (la fonction dérivée).",
    "Dire qu'il y a un extremum partout où f′ = 0 sans vérifier le signe de f′ autour.",
  ],
  flashcards: [
    {
      question: "Dérivée de (u × v) ?",
      answer: "(uv)′ = u′v + uv′ (dérivé du premier fois le second, plus le premier fois dérivé du second).",
    },
    {
      question: "Condition nécessaire pour un extremum en a ?",
      answer: "f doit être dérivable en a et f′(a) = 0 (point critique).",
    },
    {
      question: "À quoi sert f″ ?",
      answer: "À étudier la convexité et à confirmer la nature d'un extremum (f″(a) > 0 ⇒ minimum).",
    },
  ],
  tags: ["dérivation", "variations", "tangente", "optimisation", "tableau de signe"],
};

export const mathComplexes: LessonSeed = {
  slug: "nombres-complexes",
  subjectSlug: "mathematiques",
  title: "Nombres complexes : forme algébrique,module et forme trigonométrique",
  chapter: "Algèbre · Nombres complexes",
  summary:
    "Calculer avec les nombres complexes, représenter dans le plan de Gauss, passer de la forme algébrique à la forme trigonométrique et résoudre des équations du second degré.",
  level: "Bac · Math / Sciences / Tech",
  durationMin: 28,
  orderIndex: 5,
  objectives: [
    "Additionner, multiplier et diviser des nombres complexes en forme algébrique",
    "Calculer le module et l'argument d'un complexe",
    "Écrire un complexe sous forme trigonométrique et exponentielle",
    "Résoudre une équation du second degré à racines complexes",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Forme algébrique",
      text:
        "Un nombre complexe s'écrit z = a + ib où a = Re(z) (partie réelle) et b = Im(z) (partie imaginaire), avec i² = −1. Deux complexes sont égaux si leurs parties réelles et imaginaires sont égales. Le conjugué de z est z̄ = a − ib.",
    },
    {
      type: "table",
      title: "Opérations en forme algébrique",
      head: ["Opération", "Formule", "Rappel"],
      rows: [
        ["Addition", "(a + ib) + (c + id) = (a + c) + i(b + d)", "parties réelles et imaginaires séparément"],
        ["Multiplication", "(a + ib)(c + id) = (ac − bd) + i(ad + bc)", "penser à i² = −1"],
        ["Division", "(a + ib)/(c + id) = ((a + ib)(c − id))/(c² + d²)", "multiplier par le conjugué du dénominateur"],
        ["Produit conjugué", "z·z̄ = a² + b² = |z|²", "toujours réel et positif"],
      ],
    },
    {
      type: "formula",
      title: "Module et argument",
      expression: "|z| = √(a² + b²)   et   z = ρ(cos θ + i sin θ) avec ρ = |z|, θ = arg(z)",
      note: "L'argument θ est déterminé à 2π près. La forme trigonométrique facilite les puissances (formule de Moivre).",
    },
    {
      type: "steps",
      title: "Méthode — résoudre une équation du second degré",
      items: [
        "Calculer le discriminant Δ = b² − 4ac.",
        "Si Δ < 0, les racines sont complexes : x = (−b ± i√(−Δ))/(2a).",
        "Vérifier en remplaçant dans l'équation.",
        "Exprimer le résultat sous forme algébrique a + ib.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "Géométrie dans le plan de Gauss",
      text:
        "Le complexe z = a + ib correspond au point M(a, b). |z| est la distance OM. |z₁ − z₂| est la distance M₁M₂. Le point affixe de i est (0, 1) et de −i est (0, −1). Multiplier par i correspond à une rotation de +π/2 autour de l'origine.",
    },
  ],
  keyPoints: [
    "z = a + ib, i² = −1, conjugué z̄ = a − ib.",
    "|z|² = z·z̄ = a² + b².",
    "Division : multiplier numérateur et dénominateur par le conjugué du dénominateur.",
    "Forme trigonométrique : z = ρ(cos θ + i sin θ), utile pour les puissances et les racines.",
  ],
  pitfalls: [
    "Oublier i² = −1 dans une multiplication de complexes.",
    "Confondre le module |z| (toujours positif) et la partie réelle a (peut être négative).",
    "Prendre un argument principal sans vérifier le quadrant du point M(a, b).",
  ],
  flashcards: [
    {
      question: "Conjugué de 3 − 4i ?",
      answer: "3 + 4i (on change le signe de la partie imaginaire).",
    },
    {
      question: "Module de 3 + 4i ?",
      answer: "√(3² + 4²) = 5.",
    },
    {
      question: "Si Δ < 0, combien de racines réelles ?",
      answer: "Aucune racine réelle, deux racines conjuguées complexes.",
    },
  ],
  tags: ["complexes", "module", "argument", "conjugué", "équation du second degré"],
};

export const mathProbas: LessonSeed = {
  slug: "probabilites-loi-binomiale",
  subjectSlug: "mathematiques",
  title: "Probabilités : loi binomiale et événements répétés",
  chapter: "Probabilités",
  summary:
    "Modéliser des expériences répétées avec la loi binomiale, calculer des probabilités et interpréter l'espérance et l'écart-type.",
  level: "Bac · Math / Sciences / Tech / Éco",
  durationMin: 26,
  orderIndex: 6,
  objectives: [
    "Reconnaître une situation binomiale (épreuves indépendantes, même probabilité)",
    "Calculer P(X = k) avec la formule de la loi binomiale",
    "Calculer l'espérance E(X) = np et la variance V(X) = np(1 − p)",
    "Interpréter un résultat en termes de fréquence attendue",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Quand utiliser la loi binomiale ?",
      text:
        "Une expérience binomiale comporte n épreuves indépendantes, chacune ayant deux issues (succès/échec) avec la même probabilité p de succès. X = nombre de succès parmi les n épreuves suit une loi binomiale B(n, p).",
    },
    {
      type: "formula",
      title: "Loi binomiale B(n, p)",
      expression: "P(X = k) = C(n, k) · pᵏ · (1 − p)^(n−k), pour k = 0, 1, ..., n",
      note: "C(n, k) est le nombre de combinaisons de k parmi n. E(X) = n·p et V(X) = n·p·(1 − p).",
    },
    {
      type: "table",
      title: "Raccourcis utiles",
      head: ["Question", "Formule"],
      rows: [
        ["P(X = k)", "C(n, k) pᵏ (1 − p)^(n−k)"],
        ["P(X ≤ k)", "somme de P(X = j) pour j = 0 à k"],
        ["P(X ≥ k)", "1 − P(X ≤ k − 1)"],
        ["Espérance", "E(X) = n·p"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — résoudre un exercice binomiale",
      items: [
        "Identifier n (nombre d'épreuves), p (probabilité de succès) et la variable X.",
        "Vérifier l'indépendance et la probabilité constante.",
        "Traduire la question en probabilité sur X (P(X = k), P(X ≤ k), etc.).",
        "Calculer avec la formule, puis interpréter (ex. : « on s'attend à n·p succès en moyenne »).",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Piège : dépendance entre épreuves",
      text:
        "Un tirage sans remise modifie les probabilités d'un tirage à l'autre : ce n'est pas binomiale (c'est la loi hypergéométrique, hors programme ou traitée par arbre pondéré). La binomiale exige des épreuves indépendantes avec remise ou des événements séparés.",
    },
  ],
  keyPoints: [
    "Binomiale : n épreuves indépendantes, même p, deux issues.",
    "P(X = k) = C(n, k)·pᵏ·(1 − p)^(n−k).",
    "E(X) = np ; plus p est proche de 0 ou 1, plus la distribution est concentrée.",
    "P(X ≥ k) se calcule souvent par l'événement contraire : 1 − P(X ≤ k − 1).",
  ],
  pitfalls: [
    "Oublier le coefficient C(n, k) qui compte les arrangements possibles.",
    "Appliquer la binomiale à des tirages sans remise (probabilités qui changent).",
    "Confondre « au moins k » (P(X ≥ k)) et « plus de k » (P(X > k)).",
  ],
  flashcards: [
    {
      question: "Espérance d'une loi B(n, p) ?",
      answer: "E(X) = n·p.",
    },
    {
      question: "Conditions pour modéliser par une loi binomiale ?",
      answer: "Nombre fixe d'épreuves indépendantes, deux issues, même probabilité de succès.",
    },
    {
      question: "P(X ≥ 1) se calcule comment ?",
      answer: "1 − P(X = 0) = 1 − (1 − p)ⁿ.",
    },
  ],
  tags: ["probabilités", "binomiale", "espérance", "événements répétés"],
};

/* ============================================================
   PHYSIQUE — programme de terminale (complément)
   ============================================================ */

export const physElec: LessonSeed = {
  slug: "electricite-generale",
  subjectSlug: "physique",
  title: "Électricité générale : lois de Kirchhoff, puissance et énergie",
  chapter: "Électricité · Circuits",
  summary:
    "Appliquer les lois des noeuds et des mailles, calculer les puissances actives et l'énergie consommée, analyser un circuit série/derivé.",
  level: "Bac · Math / Sciences / Tech",
  durationMin: 30,
  orderIndex: 3,
  objectives: [
    "Écrire la loi des noeuds (LKN) et la loi des mailles (LKM)",
    "Calculer résistance équivalente en série et en dérivé",
    "Calculer puissance électrique P = UI et énergie W = Pt",
    "Analyser un diviseur de tension et un diviseur de courant",
  ],
  blocks: [
    {
      type: "table",
      title: "Les deux lois de Kirchhoff",
      head: ["Loi", "Énoncé", "Application"],
      rows: [
        ["Loi des noeuds (LKN)", "Somme algébrique des courants entrant dans un noeud = 0", "ΣI_entrant = ΣI_sortant"],
        ["Loi des mailles (LKM)", "Somme algébrique des tensions autour d'une maille fermée = 0", "Σu = 0 (avec les conventions de signe)"],
      ],
    },
    {
      type: "formula",
      title: "Puissance et énergie",
      expression: "P = U·I (watt)   W = P·t = U·I·t (joule)   Pour une résistance : P = R·I² = U²/R",
      note: "L'énergie consommée par un appareil = puissance × durée d'utilisation. Facture : souvent en kWh (1 kWh = 3,6 MJ).",
    },
    {
      type: "table",
      title: "Équivalences résistances",
      head: ["Montage", "Résistance équivalente", "Remarque"],
      rows: [
        ["Série", "Rₑq = R₁ + R₂ + ...", "Le courant est le même partout"],
        ["Dérivé (2 résistances)", "1/Rₑq = 1/R₁ + 1/R₂", "La tension est la même aux bornes de chaque branche"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — résoudre un circuit",
      items: [
        "Repérer les noeuds, les mailles, les générateurs et les récepteurs.",
        "Choisir les directions de courant et les sens des tensions (flèches).",
        "Écrire les LKN aux noeuds et les LKM sur les mailles indépendantes.",
        "Résoudre le système pour trouver les courants et tensions inconnus.",
        "Vérifier avec la puissance : puissance fournie = puissance consommée.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Conventions de signe",
      text:
        "Un récepteur absorbe une puissance (U et I dans le même sens, passive convention). Un générateur fournit de la puissance. Le signe de P indique si l'élément fournit ou absorbe : cohérence obligatoire avec les flèches choisies.",
    },
  ],
  keyPoints: [
    "LKN : somme des courants à un noeud = 0. LKM : somme des tensions dans une maille = 0.",
    "Série : R s'additionne, I constant. Dérivé : 1/R s'additionne, U constant.",
    "P = UI ; énergie W = Pt ; facture en kWh.",
    "Toujours dessiner le circuit avec les flèches de courant et les signes + − avant tout calcul.",
  ],
  pitfalls: [
    "Oublier le signe dans la LKM (tension de générateur vs récepteur).",
    "Additionner des résistances en dérivé comme en série.",
    "Confondre puissance nominale (sur la plaque) et puissance réelle selon la tension effective.",
  ],
  flashcards: [
    {
      question: "Loi des noeuds en une phrase ?",
      answer: "La somme algébrique des courants arrivant en un noeud est nulle (ce qui entre = ce qui sort).",
    },
    {
      question: "Deux résistances en série de 4 Ω et 6 Ω : équivalente ?",
      answer: "R = 4 + 6 = 10 Ω.",
    },
    {
      question: "Un appareil de 2 kW utilisé 3 h consomme combien ?",
      answer: "2 kW × 3 h = 6 kWh.",
    },
  ],
  tags: ["électricité", "Kirchhoff", "puissance", "circuit", "série", "dérivé"],
};

export const physOptique: LessonSeed = {
  slug: "optique-geometrique",
  subjectSlug: "physique",
  title: "Optique géométrique : réflexion, réfraction et lentilles minces",
  chapter: "Optique",
  summary:
    "Appliquer les lois de la réflexion et de la réfraction (Snell-Descartes), tracer des images avec une lentille mince et utiliser la formule de conjugaison.",
  level: "Bac · Math / Sciences / Tech",
  durationMin: 28,
  orderIndex: 4,
  objectives: [
    "Appliquer la loi de la réflexion (angle d'incidence = angle de réflexion)",
    "Appliquer la loi de Snell-Descartes n₁·sin i₁ = n₂·sin i₂",
    "Utiliser la formule de conjugaison 1/f = 1/d_obj + 1/d_img",
    "Déterminer si une image est réelle ou virtuelle, agrandie ou réduite",
  ],
  blocks: [
    {
      type: "formula",
      title: "Lois de la réflexion et de la réfraction",
      expression: "i_r = i_i   et   n₁·sin(i₁) = n₂·sin(i₂)",
      note: "Les angles se mesurent par rapport à la normale. n est l'indice de réfraction (n = c/v, n ≈ 1 pour l'air, ≈ 1,33 pour l'eau, ≈ 1,5 pour le verre).",
    },
    {
      type: "table",
      title: "Phénomènes à reconnaître",
      head: ["Phénomène", "Condition", "Exemple"],
      rows: [
        ["Réflexion", "rayon sur séparateur", "miroir"],
        ["Réfraction", "passage d'un milieu à l'autre", "bâton dans l'eau"],
        ["Réflexion totale", "i₁ > i_c (angle critique), milieu dense → milieu moins dense", "fibre optique"],
      ],
    },
    {
      type: "formula",
      title: "Lentille mince — conjugaison",
      expression: "1/f = 1/d_o + 1/d_i   et   grossissement Γ = −d_i/d_o = h_i/h_o",
      note: "f > 0 lentille convergente, f < 0 divergente. d_o > 0 objet réel, d_i > 0 image réelle (de l'autre côté).",
    },
    {
      type: "steps",
      title: "Méthode — tracer l'image d'un objet par lentille",
      items: [
        "Tracer l'axe optique, le centre optique O et les foyers F et F′ (de chaque côté à distance f).",
        "Rayon 1 : parallèle à l'axe, passe par F′ après la lentille (ou vient de F pour divergent).",
        "Rayon 2 : passe par O sans déviation.",
        "L'intersection des deux rayons (ou de leurs prolongements) donne l'image.",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "Image réelle vs virtuelle",
      text:
        "Image réelle : les rayons se croisent réellement (d_i > 0), peut être projetée sur un écran, souvent inversée (Γ < 0). Image virtuelle : les rayons ne font que sembler diverger (d_i < 0), de même côté que l'objet, droite (Γ > 0), comme à la loupe quand l'objet est dans le foyer.",
    },
  ],
  keyPoints: [
    "Angles mesurés par rapport à la normale.",
    "Snell-Descartes : n₁sin i₁ = n₂sin i₂ ; plus n est grand, plus le rayon se rapproche de la normale.",
    "1/f = 1/d_o + 1/d_i ; Γ = −d_i/d_o.",
    "Lentille convergente : objet au-delà de 2f ⇒ image réelle, réduite, inversée.",
  ],
  pitfalls: [
    "Mesurer l'angle par rapport à la surface au lieu de la normale.",
    "Oublier le signe de f pour une lentille divergente.",
    "Confondre distance focale et distance objet-image.",
  ],
  flashcards: [
    {
      question: "Indice de réfraction n = ?",
      answer: "n = c/v (rapport de la vitesse de la lumière dans le vide sur celle dans le milieu).",
    },
    {
      question: "Condition de réflexion totale ?",
      answer: "Passage d'un milieu plus dense vers un milieu moins dense, avec angle d'incidence supérieur à l'angle critique.",
    },
    {
      question: "Grossissement Γ > 0 signifie ?",
      answer: "Image de même sens que l'objet (souvent virtuelle). Γ < 0 : image inversée.",
    },
  ],
  tags: ["optique", "réfraction", "lentille", "miroir", "Snell-Descartes"],
};

export const physMeca: LessonSeed = {
  slug: "mecanique-mouvements-forces",
  subjectSlug: "physique",
  title: "Mécanique : mouvements, forces et lois de Newton",
  chapter: "Mécanique",
  summary:
    "Décrire un mouvement (position, vitesse, accélération), identifier les forces, appliquer les trois lois de Newton et résoudre un problème de dynamique simple.",
  level: "Bac · Math / Sciences / Tech",
  durationMin: 30,
  orderIndex: 5,
  objectives: [
    "Différencier vitesse et accélération, lire un graphique v(t)",
    "Identifier et représenter les forces (poids, réaction, frottement, tension)",
    "Appliquer la seconde loi de Newton ΣF = m·a",
    "Calculer un poids P = m·g et une force de réaction d'appui",
  ],
  blocks: [
    {
      type: "table",
      title: "Les grandeurs du mouvement",
      head: ["Grandeur", "Définition", "Unité"],
      rows: [
        ["Position", "emplacement dans un repère", "mètre (m)"],
        ["Vitesse", "variation de la position par rapport au temps", "m/s"],
        ["Accélération", "variation de la vitesse par rapport au temps", "m/s²"],
      ],
    },
    {
      type: "list",
      title: "Les trois lois de Newton",
      items: [
        "Loi de l'inertie : un corps garde son état de mouvement si la somme des forces est nulle.",
        "Loi fondamentale : la somme des forces est proportionnelle à l'accélération, ΣF = m·a.",
        "Loi des actions-réactions : si A agit sur B, B agit sur A par une force de même intensité, de sens opposé, de même nature.",
      ],
    },
    {
      type: "formula",
      title: "Forces courantes",
      expression: "Poids : P = m·g (g ≈ 9,8 m/s²)   Réaction d'appui sur sol horizontal : N = P   Frottement : f ≤ μ·N",
      note: "Le poids est toujours dirigé verticalement vers le bas. La réaction d'appui est perpendiculaire à la surface de contact.",
    },
    {
      type: "steps",
      title: "Méthode — problème de dynamique",
      items: [
        "Choisir le repère (souvent lié au sol, galiléen).",
        "Isoler le corps et dessiner toutes les forces qui lui sont appliquées (diagramme des forces).",
        "Écrire ΣF = m·a selon les axes choisis (souvent horizontal et vertical).",
        "Résoudre pour l'inconnue (accélération, force, masse, coefficient de frottement).",
        "Vérifier les unités et la plausibilité du résultat.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Poids et masse ne sont pas identiques",
      text:
        "La masse m (kg) est une quantité de matière, invariante. Le poids P (N) est une force, P = m·g, qui dépend du lieu (sur la Lune, g est environ 6 fois plus petit). Ne jamais dire « le poids est de 60 kg » : dire « la masse est de 60 kg, le poids est d'environ 588 N ».",
    },
  ],
  keyPoints: [
    "v = Δx/Δt, a = Δv/Δt.",
    "ΣF = m·a (seconde loi de Newton), vecteur équation.",
    "Poids P = m·g, dirigé vers le bas ; réaction d'appui perpendiculaire au sol.",
    "Action = −réaction : deux corps, même nature de force, pas sur le même objet.",
  ],
  pitfalls: [
    "Ajouter des forces qui n'agissent pas sur le même corps dans une même équation ΣF.",
    "Oublier le poids dans le diagramme des forces d'un objet au sol.",
    "Confondre réaction d'appui et réaction de Newton (la réaction de l'appui est une force différente de l'action-réaction du poids).",
  ],
  flashcards: [
    {
      question: "Unité de la force ?",
      answer: "Le newton (N) = 1 kg·m/s².",
    },
    {
      question: "Poids d'un objet de 2 kg sur Terre ?",
      answer: "P = 2 × 9,8 ≈ 19,6 N, soit environ 20 N.",
    },
    {
      question: "Que dit la troisième loi de Newton ?",
      answer: "À toute action correspond une réaction de même intensité, même nature, sens opposé, agissant sur l'autre corps.",
    },
  ],
  tags: ["mécanique", "Newton", "forces", "accélération", "poids", "réaction"],
};

export const extraLessons: LessonSeed[] = [
  /* Mathématiques */
  mathFonctions,
  mathDerivation,
  mathComplexes,
  mathProbas,
  /* Physique */
  physElec,
  physOptique,
  physMeca,
];

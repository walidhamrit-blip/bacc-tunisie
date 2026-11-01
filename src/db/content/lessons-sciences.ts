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

const mathSuites: LessonSeed = {
  slug: "suites-numeriques",
  subjectSlug: "mathematiques",
  title: "Suites numériques : arithmétiques, géométriques et récurrence",
  chapter: "Analyse · Suites",
  summary:
    "Comprendre une suite comme une liste de nombres indexés, reconnaître sa nature, prouver une propriété par récurrence et calculer sa limite sans hésitation.",
  level: "Bac · Math / Sciences / Tech / Éco",
  durationMin: 28,
  orderIndex: 1,
  objectives: [
    "Passer de la relation de récurrence à la forme explicite d'une suite",
    "Distinguer suite arithmétique et suite géométrique par le calcul de la différence ou du quotient",
    "Rédiger une démonstration par récurrence en trois temps",
    "Déterminer la limite d'une suite et justifier avec un théorème de comparaison",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "L'idée à retenir avant les formules",
      text: "Une suite est une fonction définie sur les entiers : à chaque rang n on associe un nombre réel U(n), noté Uₙ. Travailler sur une suite, c'est donc répondre à deux questions : comment passe-t-on d'un rang au suivant, et vers quoi tend-on quand n devient très grand ?",
    },
    {
      type: "table",
      title: "Les deux familles à reconnaître immédiatement",
      head: ["Type", "Relation", "Terme général", "Somme des termes"],
      rows: [
        [
          "Arithmétique (raison r)",
          "Uₙ₊₁ = Uₙ + r",
          "Uₙ = U₀ + n·r",
          "Sₙ = (nombre de termes) × (premier + dernier) / 2",
        ],
        [
          "Géométrique (raison q ≠ 0)",
          "Vₙ₊₁ = q·Vₙ",
          "Vₙ = V₀·qⁿ",
          "Sₙ = premier terme × (1 − q^(n+1)) / (1 − q) si q ≠ 1",
        ],
      ],
    },
    {
      type: "steps",
      title: "Méthode 1 — Démontrer par récurrence",
      items: [
        "Initialisation : vérifier la propriété au premier rang (souvent n = 0 ou n = 1). Écrire les deux membres et montrer qu'ils sont égaux.",
        "Hérédité : supposer la propriété vraie au rang n (hypothèse de récurrence), puis prouver qu'elle est vraie au rang n + 1.",
        "Conclusion : rédiger « La propriété est vraie au rang initial et héréditaire, donc elle est vraie pour tout n ≥ n₀ ».",
      ],
    },
    {
      type: "formula",
      title: "Suite auxiliaire : la technique qui sauve",
      expression: "Vₙ = Uₙ − L  puis  Vₙ₊₁ = q·Vₙ",
      note: "Si l'énoncé donne Uₙ₊₁ = a·Uₙ + b, la suite Vₙ = Uₙ − b/(1 − a) devient géométrique de raison a (a ≠ 1). On trouve ainsi la forme explicite de Uₙ.",
    },
    {
      type: "paragraph",
      title: "Limites : les réflexes",
      text: "Pour un quotient de polynômes en n, on factorise par la plus grande puissance au numérateur et au dénominateur : la limite est le quotient des coefficients dominants. Pour qⁿ, la limite vaut 0 si |q| < 1, 1 si q = 1 et +∞ si q > 1. On conclut toujours avec SOIT une factorisation, SOIT un théorème de comparaison (gendarmes, ou « si 0 ≤ Uₙ ≤ Vₙ et Vₙ → 0 alors Uₙ → 0 »).",
    },
    {
      type: "callout",
      tone: "tip",
      title: "Le vocabulaire attendu au bac",
      text: "Une suite est majorée s'il existe M tel que Uₙ ≤ M pour tout n. Elle est convergente si elle admet une limite finie. Théorème clé : toute suite croissante et majorée converge (on l'utilise quand on ne connaît pas la limite).",
    },
    {
      type: "list",
      title: "Exercice flash mental",
      items: [
        "U₀ = 2, Uₙ₊₁ = Uₙ + 5 : nature ? réponse : arithmétique, r = 5, Uₙ = 2 + 5n.",
        "V₀ = 3, Vₙ₊₁ = 2Vₙ : nature ? réponse : géométrique, q = 2, Vₙ = 3 × 2ⁿ.",
        "Wₙ = (3n + 1)/(n + 2) : limite ? réponse : 3, on factorise par n.",
      ],
    },
  ],
  keyPoints: [
    "Arithmétique ⇔ différence constante ; géométrique ⇔ quotient constant.",
    "Récurrence = initialisation + hérédité + conclusion rédigée.",
    "Suite Uₙ₊₁ = aUₙ + b : poser Vₙ = Uₙ − b/(1 − a) pour obtenir une suite géométrique.",
    "Pour une limite en +∞, factoriser par la plus grande puissance de n.",
  ],
  pitfalls: [
    "Oublier l'initialisation dans la récurrence : la démonstration vaut zéro point.",
    "Écrire Uₙ = U₀ + n·r avec U₀ alors que la suite commence à U₁ (utiliser U₁ + (n − 1)r).",
    "Appliquer la formule de somme géométrique avec q = 1 (la formule n'est pas définie, la somme vaut n + 1 termes × V₀).",
  ],
  flashcards: [
    {
      question: "Que vaut la somme des n premiers entiers ?",
      answer: "1 + 2 + ... + n = n(n + 1)/2. C'est le cas arithmétique r = 1, U₁ = 1.",
    },
    {
      question: "Formule de Uₙ pour une suite géométrique commençant au rang 1 ?",
      answer: "Uₙ = U₁ × q^(n−1). L'exposant compte le nombre de pas, pas le rang.",
    },
    {
      question: "Une suite croissante et majorée est-elle convergente ?",
      answer: "Oui, c'est le théorème de convergence monotone : sa limite est finie et inférieure ou égale au majorant.",
    },
  ],
  tags: ["suites", "récurrence", "limites", "géométrique", "arithmétique"],
};

const mathIntegrales: LessonSeed = {
  slug: "primitives-integrales",
  subjectSlug: "mathematiques",
  title: "Primitives et calcul intégral : le cours + la méthode",
  chapter: "Analyse · Intégration",
  summary:
    "Relier primitive, aire et intégrale, puis choisir la bonne technique de calcul (tableau, linéarisation, intégration par parties) selon la forme de la fonction.",
  level: "Bac · Math / Sciences / Tech / Éco",
  durationMin: 32,
  orderIndex: 2,
  objectives: [
    "Trouver une primitive en reconnaissant la forme u′·uⁿ ou u′/u",
    "Calculer une intégrale par la relation de Chasles et la linéarité",
    "Utiliser l'intégration par parties sur un produit ln/x ou xeˣ",
    "Interpréter une intégrale en termes d'aire et de valeur moyenne",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Primitive, une opération à l'envers",
      text: "F est une primitive de f sur un intervalle I si F est dérivable sur I et F′ = f. Deux primitives d'une même fonction diffèrent d'une constante. L'intégrale, elle, ne dépend pas du choix de la primitive : ∫ₐᵇ f(x)dx = F(b) − F(a).",
    },
    {
      type: "table",
      title: "Tableau à connaître par cœur",
      head: ["Fonction f(x)", "Une primitive F(x)", "Condition"],
      rows: [
        ["xⁿ", "x^(n+1)/(n+1)", "n ≠ −1"],
        ["1/x", "ln|x|", "x ≠ 0"],
        ["eˣ", "eˣ", "partout"],
        ["1/x²", "−1/x", "x ≠ 0"],
        ["u′·eᵘ", "eᵘ", "u dérivable"],
        ["u′/u", "ln|u|", "u ne s'annule pas"],
        ["cos x / sin x", "sin x / −cos x", "partout"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — intégration par parties",
      items: [
        "Repérer un produit : on choisit u′ facile à intégrer et v facile à dériver.",
        "Poser u′ = ..., u = ... et v = ..., v′ = ... .",
        "Écrire la formule : ∫ₐᵇ u′v = [uv]ₐᵇ − ∫ₐᵇ uv′.",
        "Vérifier que la nouvelle intégrale est plus simple ; sinon échanger les rôles.",
      ],
    },
    {
      type: "formula",
      title: "Valeur moyenne et aire",
      expression: "m = (1/(b − a)) · ∫ₐᵇ f(x)dx  et  aire = ∫ₐᵇ |f(x)| dx",
      note: "Si f ≥ 0, l'aire sous la courbe entre a et b est exactement ∫ₐᵇ f(x)dx : cette interprétation permet de vérifier l'ordre de grandeur du résultat.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "Erreur classique de rédaction",
      text: "Ne jamais écrire ∫ f(x)dx = F(b) − F(a) sans bornes. Les notations ∫ₐᵇ f(x)dx et [F(x)]ₐᵇ doivent apparaître telles quelles dans la copie : c'est une exigence du correcteur.",
    },
    {
      type: "list",
      title: "Trois calculs types",
      items: [
        "∫₀¹ (2x + 1)³ dx : forme u′uⁿ avec u = 2x + 1, u′ = 2. Résultat : [(2x+1)⁴/8]₀¹ = (81 − 1)/8 = 10.",
        "∫₁ᵉ ln x dx : par parties avec u′ = 1, v = ln x. Résultat : [x ln x − x]₁ᵉ = e − e + 1 = 1.",
        "∫₀^(π/2) sin x cos x dx : écrire sin x cos x = (1/2)sin(2x). Résultat : 1/2.",
      ],
    },
  ],
  keyPoints: [
    "F′ = f et ∫ₐᵇ f = F(b) − F(a) quelle que soit la primitive choisie.",
    "Reconnaître u′uⁿ, u′/u et u′eᵘ : ces trois formes couvrent la majorité des sujets.",
    "L'intégration par parties sert quand un ln ou un eˣ est multiplié par un polynôme.",
    "La valeur moyenne est une moyenne continue : on divise par la largeur (b − a).",
  ],
  pitfalls: [
    "Oublier la valeur absolue dans ln|x| quand x peut être négatif.",
    "Confondre dérivée et primitive de cos et sin.",
    "Calculer une aire en intégrant f sans valeur absolue alors que f change de signe.",
  ],
  flashcards: [
    {
      question: "Une primitive de u′eᵘ ?",
      answer: "eᵘ. On dérive eᵘ pour retrouver u′eᵘ.",
    },
    {
      question: "À quoi sert la linéarité de l'intégrale ?",
      answer: "À séparer ∫(αf + βg) en α∫f + β∫g, puis à calculer chaque morceau avec le tableau.",
    },
    {
      question: "Que représente ∫ₐᵇ f(x)dx si f ≤ 0 sur [a, b] ?",
      answer: "C'est l'opposé de l'aire géométrique : l'aire vaut −∫ₐᵇ f(x)dx.",
    },
  ],
  tags: ["primitives", "intégrale", "parties", "aire", "valeur moyenne"],
};

const physiqueRC: LessonSeed = {
  slug: "dipole-rc",
  subjectSlug: "physique",
  title: "Le dipôle RC : charge et décharge d'un condensateur",
  chapter: "Électricité · Dipôles RC",
  summary:
    "Établir l'équation différentielle de la tension aux bornes du condensateur, résoudre avec la constante de temps τ = RC et exploiter la courbe expérimentale.",
  level: "Bac · Math / Sciences / Tech",
  durationMin: 30,
  orderIndex: 1,
  objectives: [
    "Écrire l'équation différentielle de charge et de décharge",
    "Justifier la solution uC(t) = E(1 − e^(−t/τ))",
    "Déterminer τ graphiquement et vérifier son unité",
    "Expliquer le rôle du condensateur dans un montage (filtrage, temporisation)",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Les deux grandeurs du condensateur",
      text: "Un condensateur stocke de l'énergie sous forme de charge électrique. Sa charge q(t) = C·uC(t) (en coulombs) et son énergie E = ½·C·uC². La tension uC est continue : elle ne peut pas sauter brutalement, ce qui explique l'exponentielle.",
    },
    {
      type: "formula",
      title: "Équation différentielle en charge (générateur E, résistance R)",
      expression: "RC · duC/dt + uC = E",
      note: "Solution : uC(t) = E(1 − e^(−t/τ)) avec τ = RC. La constante de temps τ s'exprime en secondes (Ω × F = s).",
    },
    {
      type: "formula",
      title: "Décharge dans la résistance",
      expression: "RC · duC/dt + uC = 0  ⇒  uC(t) = U₀ · e^(−t/τ)",
      note: "Le temps de décharge ne dépend ni de U₀ ni de E : seulement du produit RC.",
    },
    {
      type: "steps",
      title: "Méthode — exploiter une courbe de charge",
      items: [
        "Vérifier l'asymptote : uC tend vers E, la tangente à t = 0 coupe l'asymptote à t = τ.",
        "Lire τ aussi à 63 % de la valeur finale (uC = 0,63·E) : les deux lectures doivent concorder.",
        "Calculer C = τ/R puis comparer à la valeur nominale du condensateur.",
        "Conclure sur l'effet d'un RC plus petit : charge plus rapide.",
      ],
    },
    {
      type: "callout",
      tone: "warn",
      title: "Piège de sécurité et de rédaction",
      text: "On ne débranche jamais un condensateur chargé sans résistance de décharge : risque de choc et d'étincelle. En rédaction, préciser le référentiel du montage et les conventions de signe avant d'écrire la loi des mailles.",
    },
    {
      type: "table",
      title: "Ordres de grandeur utiles",
      head: ["Grandeur", "Symbole", "Unité", "Remarque"],
      rows: [
        ["Capacité", "C", "farad (F)", "souvent µF ou nF"],
        ["Constante de temps", "τ = RC", "seconde (s)", "temps caractéristique du régime"],
        ["Énergie stockée", "E = ½Cu²", "joule (J)", "toujours positive"],
      ],
    },
  ],
  keyPoints: [
    "Loi des mailles : E = uR + uC avec uR = R·i et i = C·duC/dt.",
    "Charge : uC(t) = E(1 − e^(−t/τ)) ; décharge : uC(t) = U₀e^(−t/τ).",
    "τ = RC, lu à 63 % de la variation ou par la tangente à l'origine.",
    "uC est continue, i peut être discontinue (saut à la fermeture de l'interrupteur).",
  ],
  pitfalls: [
    "Écrire i = C·uC au lieu de i = C·duC/dt.",
    "Confondre charge et décharge : le signe devant l'exponentielle change.",
    "Oublier de convertir µF en F (10⁻⁶) dans le calcul de τ.",
  ],
  flashcards: [
    {
      question: "Que vaut uC à t = τ lors d'une charge ?",
      answer: "uC(τ) = 0,63·E, soit environ 63 % de la tension finale.",
    },
    {
      question: "Unité de RC ?",
      answer: "La seconde : Ω × F = Ω × C/V = (V/A) × (A·s/V) = s.",
    },
    {
      question: "Pourquoi uC ne peut-elle pas varier brusquement ?",
      answer: "Car cela imposerait un courant infini ; l'énergie ½Cu² ne peut pas changer instantanément.",
    },
  ],
  tags: ["condensateur", "RC", "équation différentielle", "constante de temps"],
};

const physiqueNoyaux: LessonSeed = {
  slug: "noyaux-radioactivite",
  subjectSlug: "physique",
  title: "Noyaux et radioactivité : désintégrations et datation",
  chapter: "Physique nucléaire",
  summary:
    "Écrire une équation de désintégration en respectant les lois de conservation, utiliser la loi exponentielle N(t) = N₀e^(−λt) et dater un échantillon.",
  level: "Bac · Math / Sciences",
  durationMin: 26,
  orderIndex: 2,
  objectives: [
    "Compléter une équation nucléaire avec conservation de A et Z",
    "Distinguer α, β⁻, β⁺ et le rayonnement γ",
    "Exploiter la loi de décroissance et le temps de demi-vie",
    "Appliquer la radioactivité à la datation au carbone 14",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Le noyau, écriture et vocabulaire",
      text: "Un noyau est noté ᴬᶻX : A est le nombre de nucléons, Z le nombre de protons (le nombre de neutrons est A − Z). Dans toute réaction nucléaire, A et Z se conservent : c'est l'outil unique pour compléter une équation.",
    },
    {
      type: "table",
      title: "Trois désintégrations à reconnaître",
      head: ["Type", "Émission", "Effet sur le noyau", "Exemple"],
      rows: [
        ["α", "noyau d'hélium ⁴₂He", "A diminue de 4, Z de 2", "²²⁶₈₈Ra → ²²²₈₆Rn + ⁴₂He"],
        ["β⁻", "électron ⁰₋₁e + antineutrino", "Z augmente de 1, A inchangé", "¹⁴₆C → ¹⁴₇N + ⁰₋₁e"],
        ["β⁺", "positron ⁰₊₁e + neutrino", "Z diminue de 1, A inchangé", "¹⁸₉F → ¹⁸₈O + ⁰₊₁e"],
      ],
    },
    {
      type: "formula",
      title: "Loi de décroissance",
      expression: "N(t) = N₀ · e^(−λt)  et  t₁/₂ = ln 2 / λ",
      note: "λ est la constante radioactive (s⁻¹). L'activité A(t) = λN(t) s'exprime en becquerel (1 Bq = 1 désintégration/s).",
    },
    {
      type: "steps",
      title: "Méthode — datation au carbone 14",
      items: [
        "Écrire N(t) = N₀e^(−λt) et identifier ce que l'on connaît (rapport N/N₀ ou activité résiduelle).",
        "Isoler le temps : t = (1/λ)·ln(N₀/N) = (t₁/₂/ln2)·ln(N₀/N).",
        "Utiliser t₁/₂ = 5 730 ans pour le carbone 14.",
        "Conclure avec une unité et un nombre de chiffres significatifs cohérent (souvent 3).",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "Comprendre sans calcul",
      text: "Après une demi-vie, il reste 50 % des noyaux ; après deux demi-vies 25 % ; après trois 12,5 %. Ce raisonnement suffit pour éliminer des réponses dans un QCM.",
    },
  ],
  keyPoints: [
    "Conservation de A (nucléons) et de Z (charge) dans toute équation nucléaire.",
    "β⁻ : Z + 1 ; β⁺ : Z − 1 ; α : A − 4 et Z − 2.",
    "N(t) = N₀e^(−λt), t₁/₂ = ln2/λ, activité en becquerel.",
    "La radioactivité est un phénomène aléatoire, spontané et indépendant de la température.",
  ],
  pitfalls: [
    "Oublier l'antineutrino dans l'écriture β⁻ (perte de points en rédaction).",
    "Confondre demi-vie et constante radioactive : t₁/₂ est un temps, λ est l'inverse d'un temps.",
    "Utiliser les logarithmes décimaux au lieu du logarithme népérien dans la loi exponentielle.",
  ],
  flashcards: [
    {
      question: "Que devient Z lors d'une désintégration β⁻ ?",
      answer: "Z augmente de 1 car un neutron se transforme en proton avec émission d'un électron.",
    },
    {
      question: "Relation entre λ et t₁/₂ ?",
      answer: "t₁/₂ = ln 2 / λ, soit λ = 0,693/t₁/₂.",
    },
    {
      question: "L'activité d'un échantillon dépend-elle de la température ?",
      answer: "Non. La désintégration est spontanée et aléatoire, indépendante des conditions physico-chimiques.",
    },
  ],
  tags: ["noyau", "radioactivité", "demi-vie", "carbone 14"],
};

const svtGenetique: LessonSeed = {
  slug: "genetique-transmission",
  subjectSlug: "svt",
  title: "Transmission des caractères héréditaires",
  chapter: "Génétique",
  summary:
    "Passer de l'observation d'un croisement à un modèle chromosomique : gènes, allèles, brassage interchromosomique et interprétation d'un échiquier de croisement.",
  level: "Bac · Sciences",
  durationMin: 34,
  orderIndex: 1,
  objectives: [
    "Définir gène, allèle, homozygote, hétérozygote et phénotype",
    "Interpréter les résultats d'un test-cross avec un échiquier",
    "Distinguer brassage interchromosomique et intrachromosomique",
    "Argumenter sur la localisation des gènes à partir d'un pourcentage de recombinaison",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Le raisonnement génétique en trois étapes",
      text: "Tout exercice de génétique se traite de la même façon : (1) formuler des hypothèses sur le nombre de gènes et la dominance ; (2) tester l'hypothèse avec les proportions observées ; (3) représenter le croisement avec les génotypes et les gamètes. Aucune conclusion sans vérification numérique.",
    },
    {
      type: "table",
      title: "Les proportions qui parlent",
      head: ["Résultat du croisement", "Interprétation"],
      rows: [
        ["100 % de phénotype dominant", "Parent dominant homozygote (ou hérédité liée au sexe à discuter)"],
        ["3/4 – 1/4 (F2)", "Monohybridisme, dominance absolue, gènes indépendants"],
        ["1/2 – 1/2 (test-cross)", "Monohybridisme : un parent hétérozygote croisé avec un double récessif"],
        ["9/16 – 3/16 – 3/16 – 1/16", "Dihybridisme, gènes indépendants (brassage interchromosomique)"],
        ["Proportions non équilibrées, 4 phénotypes inégaux", "Gènes liés : brassage intrachromosomique, crossing-over"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — exploiter un test-cross",
      items: [
        "Écrire les phénotypes des parents et en déduire les génotypes possibles (notés A/a, B/b).",
        "Déterminer les gamètes produits par chaque parent en respectant l'indépendance ou la liaison.",
        "Construire l'échiquier et calculer les proportions théoriques.",
        "Comparer aux résultats expérimentaux ; si les proportions diffèrent, conclure à une liaison avec crossing-over et évaluer la distance en centimorgans.",
      ],
    },
    {
      type: "formula",
      title: "Distance génétique",
      expression: "distance (cM) = (nombre de recombinants / nombre total) × 100",
      note: "1 % de recombinaison = 1 centimorgan. Plus la distance est grande, plus les gènes sont éloignés sur le chromosome.",
    },
    {
      type: "callout",
      tone: "tip",
      title: "Ce que le correcteur attend",
      text: "Un schéma chromosomique annoté (allèles placés sur les chromosomes), la liste des gamètes, l'échiquier, et une phrase de conclusion reliant les proportions observées au modèle. Les schémas rapportent des points même imparfaits : ne pas les oublier.",
    },
  ],
  keyPoints: [
    "Gène = séquence d'ADN, allèle = version d'un gène, génotype = combinaison d'allèles.",
    "Brassage interchromosomique : chromosomes indépendants → proportions 9:3:3:1.",
    "Brassage intrachromosomique : crossing-over → gamètes recombinants minoritaires.",
    "Un test-cross révèle les gamètes du parent hétérozygote : c'est l'outil de choix.",
  ],
  pitfalls: [
    "Confondre phénotype et génotype dans la rédaction.",
    "Conclure à une liaison sans calculer les proportions.",
    "Oublier de préciser le sexe des parents dans un croisement.",
  ],
  flashcards: [
    {
      question: "Qu'est-ce qu'un test-cross ?",
      answer: "Croisement d'un individu à tester avec un homozygote récessif : les phénotypes des descendants révèlent les gamètes du parent testé.",
    },
    {
      question: "Que traduit un pourcentage de recombinaison de 15 % ?",
      answer: "Des gènes liés situés à 15 centimorgans, avec 15 % de gamètes recombinants.",
    },
    {
      question: "Différence entre brassage inter et intrachromosomique ?",
      answer: "Inter : répartition indépendante des chromosomes homologues en anaphase I. Intra : crossing-over entre chromatides homologues en prophase I.",
    },
  ],
  tags: ["génétique", "allèle", "test-cross", "crossing-over", "dihybridisme"],
};

const svtImmuno: LessonSeed = {
  slug: "immunologie",
  subjectSlug: "svt",
  title: "L'immunité : réponses innée et acquise",
  chapter: "Immunologie",
  summary:
    "Comprendre comment l'organisme distingue le soi du non-soi, puis comment une réponse lente et spécifique (lymphocytes B et T) s'organise et laisse une mémoire immunitaire.",
  level: "Bac · Sciences",
  durationMin: 30,
  orderIndex: 2,
  objectives: [
    "Identifier les acteurs de l'immunité innée et leurs barrières",
    "Décrire la coopération cellulaire de la réponse acquise",
    "Distinguer réponse humorale et réponse cellulaire",
    "Expliquer le principe de la vaccination et le rôle de la mémoire",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Deux étages, une seule défense",
      text: "L'immunité innée est immédiate (heures), non spécifique : barrières cutanéo-muqueuses, phagocytose, inflammation, complément. L'immunité acquise est plus lente (jours) mais spécifique et mémorisée : elle repose sur les lymphocytes B (anticorps) et T (cytotoxicité, aide).",
    },
    {
      type: "steps",
      title: "Méthode — raconter une réponse humorale",
      items: [
        "Un antigène franchit les barrières et est capturé par une cellule dendritique (CPA).",
        "La CPA migre vers le ganglion et présente l'antigène au lymphocyte T auxiliaire (LT4) via le CMH II.",
        "Le LT4 s'active et sécrète des interleukines qui stimulent le lymphocyte B spécifique.",
        "Le LB se multiplie (expansion clonale), se différencie en plasmocytes sécréteurs d'anticorps et en LB mémoire.",
        "Les anticorps forment le complexe immun, neutralisé puis éliminé par phagocytose.",
      ],
    },
    {
      type: "table",
      title: "Comparaison à connaître",
      head: ["Critère", "Réponse humorale", "Réponse cellulaire"],
      rows: [
        ["Cellule effectrice", "Plasmocyte", "Lymphocyte T cytotoxique (CD8)"],
        ["Molécule active", "Anticorps", "Perforine et granzymes"],
        ["Cible", "Antigène libre / bactérie extracellulaire", "Cellule infectée ou tumorale"],
        ["Rôle du LT4", "Indispensable (interleukines)", "Indispensable (activation du LT8)"],
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "Vaccination et sérothérapie",
      text: "La vaccination injecte un antigène non pathogène : l'organisme fabrique ses propres anticorps et sa mémoire → protection active, lente à installer, durable. La sérothérapie injecte directement des anticorps → protection passive, immédiate mais brève. C'est une question de bac très fréquente.",
    },
    {
      type: "paragraph",
      title: "Le VIH, un détournement du système",
      text: "Le VIH infecte les LT4 (via le récepteur CD4) et les détruit progressivement : la coopération immunitaire s'effondre, ouvrant la voie aux infections opportunistes. Le suivi se fait par la charge virale et le taux de LT4.",
    },
  ],
  keyPoints: [
    "Innée : rapide, non spécifique, sans mémoire. Acquise : lente, spécifique, avec mémoire.",
    "LB → plasmocytes → anticorps. LT8 → cytotoxicité. LT4 → chef d'orchestre via les interleukines.",
    "Le complexe immun est éliminé par phagocytose.",
    "Vaccination = active et durable ; sérothérapie = passive et immédiate.",
  ],
  pitfalls: [
    "Confondre lymphocyte B et plasmocyte : le plasmocyte est le stade sécréteur issu du LB.",
    "Dire que l'anticorps détruit directement l'antigène : il le neutralise, un phagocyte l'élimine ensuite.",
    "Oublier le rôle central du LT4 dans les deux réponses.",
  ],
  flashcards: [
    {
      question: "Quelle cellule est le chef d'orchestre de la réponse acquise ?",
      answer: "Le lymphocyte T auxiliaire (LT4), qui sécrète des interleukines activant LB et LT8.",
    },
    {
      question: "Que contient un vaccin ?",
      answer: "Un antigène non pathogène (atténué, inactivé ou fragment) + un adjuvant, pour déclencher une réponse primaire et une mémoire.",
    },
    {
      question: "Que reconnaît le récepteur CD4 du VIH ?",
      answer: "Il sert de porte d'entrée au VIH sur les LT4, dont la destruction désorganise tout le système immunitaire.",
    },
  ],
  tags: ["immunité", "lymphocyte", "anticorps", "vaccination", "VIH"],
};

const infoAlgorithmique: LessonSeed = {
  slug: "algorithmique-python",
  subjectSlug: "informatique",
  title: "Algorithmique et Python : construire un programme fiable",
  chapter: "Algorithmique",
  summary:
    "Décomposer un problème, choisir une structure de contrôle, écrire une fonction correcte et la tester sur des cas limites : la démarche attendue en informatique.",
  level: "Bac · Toutes sections scientifiques",
  durationMin: 30,
  orderIndex: 1,
  objectives: [
    "Traduire un énoncé en algorithme séquentiel avec entrées, traitement, sorties",
    "Choisir entre boucle bornée for et boucle conditionnelle while",
    "Écrire et documenter une fonction en Python",
    "Tester un programme sur des cas normaux et limites",
  ],
  blocks: [
    {
      type: "steps",
      title: "Méthode — de l'énoncé au programme",
      items: [
        "Entrées : quelles données faut-il ? sous quelle forme (entier, liste, chaîne) ?",
        "Traitement : décrire les étapes en français, sans jargon, dans l'ordre.",
        "Sorties : ce que l'on affiche ou ce que l'on retourne.",
        "Codage : traduire chaque étape ; nommer les variables clairement.",
        "Tests : au moins un cas normal, un cas limite (vide, zéro) et un cas erroné.",
      ],
    },
    {
      type: "table",
      title: "Structures de base",
      head: ["Besoin", "Structure", "Exemple Python"],
      rows: [
        ["Répéter un nombre connu de fois", "Boucle bornée", "for i in range(n):"],
        ["Répéter tant qu'une condition tient", "Boucle non bornée", "while n > 1:"],
        ["Choisir entre deux cas", "Alternative", "if / elif / else"],
        ["Stocker une suite de valeurs", "Liste", "notes = [12, 8, 17]"],
        ["Découper en sous-programme", "Fonction", "def moyenne(notes):"],
      ],
    },
    {
      type: "formula",
      title: "Modèle de fonction Python",
      expression: "def somme(liste):\n    total = 0\n    for x in liste:\n        total = total + x\n    return total",
      note: "Une fonction retourne une valeur avec return ; elle affiche avec print. Ne pas confondre les deux dans une copie.",
    },
    {
      type: "callout",
      tone: "warn",
      title: "Les erreurs qui coûtent le plus",
      text: "Indentation incorrecte, oubli du return, boucle while sans modification de la condition (boucle infinie), index hors limites, comparaison avec = au lieu de ==. Relire systématiquement le code en simulant deux itérations.",
    },
    {
      type: "list",
      title: "À savoir refaire sans modèle",
      items: [
        "Chercher le maximum d'une liste avec une boucle et une variable maxi.",
        "Compter les occurrences d'une valeur dans une liste.",
        "Vérifier si une chaîne de caractères est un palindrome.",
        "Calculer la moyenne et afficher les notes supérieures à la moyenne.",
      ],
    },
  ],
  keyPoints: [
    "Un algorithme a toujours : entrées → traitement → sorties.",
    "for quand le nombre d'itérations est connu, while sinon.",
    "Une fonction doit retourner un résultat et ne doit pas dépendre de variables globales.",
    "Tester avec un cas limite (liste vide, n = 0) avant de conclure.",
  ],
  pitfalls: [
    "Confondre print et return dans une fonction.",
    "Oublier d'initialiser un compteur ou un accumulateur.",
    "Utiliser une variable non définie ou un nom de variable avec un espace.",
  ],
  flashcards: [
    {
      question: "Différence entre for et while ?",
      answer: "for parcourt une séquence ou un nombre connu d'itérations ; while répète tant qu'une condition est vraie.",
    },
    {
      question: "Que fait range(1, n + 1) ?",
      answer: "Il produit les entiers de 1 à n inclus (la borne de fin est exclue).",
    },
    {
      question: "Comment calculer la moyenne d'une liste non vide ?",
      answer: "total = sum(liste) puis moyenne = total / len(liste). Penser à tester liste != [].",
    },
  ],
  tags: ["python", "algorithme", "boucle", "fonction", "tests"],
};

const infoSQL: LessonSeed = {
  slug: "bases-donnees-sql",
  subjectSlug: "informatique",
  title: "Bases de données relationnelles et requêtes SQL",
  chapter: "Bases de données",
  summary:
    "Lire un schéma relationnel, identifier clés primaires et étrangères, puis écrire des requêtes SELECT simples, avec jointures et calculs d'agrégats.",
  level: "Bac · Toutes sections",
  durationMin: 26,
  orderIndex: 2,
  objectives: [
    "Distinguer entité, attribut, clé primaire et clé étrangère",
    "Écrire une requête de sélection avec conditions et tri",
    "Utiliser les fonctions d'agrégat et GROUP BY",
    "Comprendre l'intérêt d'une jointure entre deux tables",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Modèle relationnel en une phrase",
      text: "Une table (relation) contient des lignes (enregistrements) décrites par des colonnes (attributs). La clé primaire identifie une ligne de façon unique ; la clé étrangère référence la clé primaire d'une autre table pour traduire une association.",
    },
    {
      type: "table",
      title: "Requêtes à connaître",
      head: ["Besoin", "Requête SQL"],
      rows: [
        ["Toutes les colonnes", "SELECT * FROM eleves;"],
        ["Colonnes choisies", "SELECT nom, moyenne FROM eleves;"],
        ["Filtre simple", "SELECT nom FROM eleves WHERE moyenne >= 10;"],
        ["Motif de texte", "SELECT nom FROM eleves WHERE nom LIKE 'B%';"],
        ["Tri décroissant", "SELECT nom FROM eleves ORDER BY moyenne DESC;"],
        ["Moyenne par section", "SELECT section, AVG(moyenne) FROM eleves GROUP BY section;"],
        ["Jointure", "SELECT e.nom, c.titre FROM eleves e JOIN classes c ON e.classe_id = c.id;"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — écrire une requête sans se tromper",
      items: [
        "Lire la question et lister les colonnes à afficher : c'est la partie SELECT.",
        "Identifier la table principale (FROM) et les tables à joindre.",
        "Traduire les conditions en WHERE ; attention à AND (les deux) et OR (l'un ou l'autre).",
        "Si la question parle de « par » (par section, par classe), penser GROUP BY.",
        "Vérifier le tri demandé (ORDER BY) et la limite éventuelle.",
      ],
    },
    {
      type: "callout",
      tone: "tip",
      title: "Test de cohérence",
      text: "Si ta requête renvoie plusieurs lignes alors que la question attend une seule valeur, il manque probablement un agrégat (COUNT, AVG, MAX) ou une condition WHERE. Si elle ne renvoie rien alors qu'il y a des données, vérifie l'orthographe des valeurs et la casse.",
    },
  ],
  keyPoints: [
    "Clé primaire = identifiant unique ; clé étrangère = référence vers une autre table.",
    "SELECT ... FROM ... WHERE ... GROUP BY ... ORDER BY : l'ordre des clauses est fixe.",
    "Les agrégats (COUNT, SUM, AVG, MIN, MAX) s'utilisent avec GROUP BY pour grouper.",
    "JOIN relie deux tables par une égalité de clés.",
  ],
  pitfalls: [
    "Oublier les guillemets autour des chaînes de caractères en SQL.",
    "Utiliser AVG sans GROUP BY alors qu'on veut une moyenne par groupe.",
    "Confondre NULL et chaîne vide : NULL n'est jamais égal à NULL (= devient IS NULL).",
  ],
  flashcards: [
    {
      question: "Qu'est-ce qu'une clé étrangère ?",
      answer: "Un attribut qui référence la clé primaire d'une autre table pour assurer l'intégrité relationnelle.",
    },
    {
      question: "Quelle requête compte les élèves par section ?",
      answer: "SELECT section, COUNT(*) FROM eleves GROUP BY section;",
    },
    {
      question: "Comment tester une valeur NULL ?",
      answer: "Avec IS NULL ou IS NOT NULL, jamais avec =.",
    },
  ],
  tags: ["SQL", "base de données", "clé primaire", "jointure", "SELECT"],
};

const technoChaine: LessonSeed = {
  slug: "chaine-energie-information",
  subjectSlug: "technologie",
  title: "Chaîne d'énergie et chaîne d'information d'un système",
  chapter: "Analyse fonctionnelle",
  summary:
    "Découper un système technique en fonctions et en chaînes, lire un cahier des charges et justifier les solutions techniques retenues.",
  level: "Bac · Sciences techniques",
  durationMin: 24,
  orderIndex: 1,
  objectives: [
    "Identifier la fonction globale et les fonctions de service",
    "Repérer les constituants de la chaîne d'énergie",
    "Décrire la chaîne d'information (acquérir, traiter, communiquer)",
    "Proposer une amélioration argumentée d'une solution technique",
  ],
  blocks: [
    {
      type: "paragraph",
      title: "Analyser avant de calculer",
      text: "Tout système automatisé remplit une fonction globale et se décompose en deux chaînes : la chaîne d'information qui décide, la chaîne d'énergie qui agit. Savoir nommer chaque bloc est la condition d'une analyse correcte.",
    },
    {
      type: "table",
      title: "Les blocs fonctionnels",
      head: ["Chaîne", "Fonction", "Exemples de constituants"],
      rows: [
        ["Information", "Acquérir", "Capteur de température, fin de course, codeur"],
        ["Information", "Traiter", "Automate programmable, microcontrôleur"],
        ["Information", "Communiquer", "Bus de terrain, Wi-Fi, écran de supervision"],
        ["Énergie", "Alimenter", "Réseau 230 V, batterie, transformateur"],
        ["Énergie", "Distribuer", "Contacteur, relais, variateur"],
        ["Énergie", "Convertir", "Moteur, vérin, résistance chauffante"],
        ["Énergie", "Transmettre", "Réducteur, courroie, vis-écrou"],
      ],
    },
    {
      type: "steps",
      title: "Méthode — répondre à une question d'analyse",
      items: [
        "Reformuler la fonction à assurer en une phrase avec un verbe d'action.",
        "Localiser les composants sur le schéma ou la photo, les nommer précisément.",
        "Associer chaque composant à un bloc fonctionnel.",
        "Justifier le choix en citant une contrainte du cahier des charges (coût, sécurité, précision, cadence).",
      ],
    },
    {
      type: "callout",
      tone: "info",
      title: "Formules utiles",
      text: "Puissance mécanique P = C·ω (couple × vitesse angulaire), rendement η = Puissance utile / Puissance absorbée (< 1), rapport de réduction r = ωentrée/ωsortie = Nsortie/Nentrée.",
    },
  ],
  keyPoints: [
    "Chaîne d'information = acquérir, traiter, communiquer. Chaîne d'énergie = alimenter, distribuer, convertir, transmettre.",
    "Toujours relier une solution technique à une contrainte du cahier des charges.",
    "Le rendement est toujours inférieur à 1 : les pertes sont dissipées en chaleur.",
    "Un capteur fournit une information, un actionneur produit un effort ou un mouvement.",
  ],
  pitfalls: [
    "Confondre capteur (information) et détecteur actionné par l'énergie.",
    "Oublier l'unité du couple (N·m) et de la vitesse angulaire (rad/s).",
    "Décrire un composant sans le nommer précisément.",
  ],
  flashcards: [
    {
      question: "Le moteur appartient à quelle chaîne et quel bloc ?",
      answer: "Chaîne d'énergie, bloc convertir (énergie électrique → énergie mécanique).",
    },
    {
      question: "Formule du rendement ?",
      answer: "η = Pu / Pa, avec Pu la puissance utile et Pa la puissance absorbée, toujours ≤ 1.",
    },
    {
      question: "Que fait un variateur de vitesse ?",
      answer: "Il appartient au bloc distribuer : il adapte l'énergie électrique au moteur pour régler la vitesse.",
    },
  ],
  tags: ["chaîne d'énergie", "capteur", "automate", "rendement", "cahier des charges"],
};

export const scienceLessons: LessonSeed[] = [
  mathSuites,
  mathIntegrales,
  physiqueRC,
  physiqueNoyaux,
  svtGenetique,
  svtImmuno,
  infoAlgorithmique,
  infoSQL,
  technoChaine,
];

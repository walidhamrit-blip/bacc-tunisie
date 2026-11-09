import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Sciences physiques — fiches complémentaires du programme de 4ème année
 * (dipôle RL, oscillations RLC libres, ondes mécaniques, décroissance
 * radioactive), utilisées notamment par la filière Informatique.
 */
export const physiqueLessons: LessonSeed[] = [
  {
    slug: "dipole-rl",
    subjectSlug: "physique",
    title: "Le dipôle RL : établissement du courant et rupture",
    chapter: "Électricité · Dipôle RL",
    summary:
      "Comprendre pourquoi l'intensité ne peut pas varier brutalement dans une bobine : constante de temps, équation différentielle, énergie magnétique et rupture de courant.",
    level: "Bac · Math / Sciences / Tech / Info (T1)",
    durationMin: 28,
    orderIndex: 4,
    objectives: [
      "Établir l'équation différentielle de l'intensité dans un circuit RL",
      "Déterminer la constante de temps τ = L/R et l'utiliser",
      "Calculer l'énergie magnétique stockée dans une bobine",
      "Expliquer le rôle de la diode de roue libre à la rupture",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "La bobine s'oppose aux variations",
        text: "Une bobine d'inductance L crée une force électromotrice d'auto-induction u = L·di/dt : elle s'oppose à toute variation de l'intensité. C'est pourquoi, à la fermeture de l'interrupteur, l'intensité part de zéro et rejoint sa valeur finale progressivement, et pourquoi elle ne s'annule pas instantanément à l'ouverture.",
      },
      {
        type: "formula",
        title: "Équation différentielle et solution",
        expression:
          "E = R·i + L·(di/dt)\ni(t) = I₀ (1 − e^(−t/τ)),  I₀ = E/R,  τ = L/R",
        note: "À l'ouverture, la solution devient i(t) = I₀ e^(−t/τ). La tangente à l'origine coupe l'asymptote à l'instant t = τ : c'est la méthode graphique pour mesurer τ.",
      },
      {
        type: "table",
        title: "Ce qu'il faut savoir lire sur la courbe",
        head: ["Instant", "Valeur de i", "Interprétation"],
        rows: [
          ["t = 0", "i = 0", "La bobine s'oppose à l'établissement du courant"],
          ["t = τ", "i = 0,63 I₀", "63 % de la valeur finale atteinte"],
          ["t = 3τ", "i ≈ 0,95 I₀", "Le régime permanent est pratiquement établi"],
          ["t = 5τ", "i ≈ 0,99 I₀", "On considère le régime permanent atteint"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Sécurité et interprétation",
        text: "À l'ouverture du circuit, di/dt est très grand et négatif : la tension aux bornes de la bobine peut atteindre plusieurs centaines de volts et détériorer le circuit. D'où la diode de roue libre, qui offre un chemin au courant et protège les composants.",
      },
    ],
    keyPoints: [
      "u_L = L·di/dt : l'intensité dans une bobine est une fonction continue.",
      "Régime transitoire : i(t) = (E/R)(1 − e^(−t/τ)) avec τ = L/R.",
      "Énergie magnétique : E = ½ L i².",
      "τ se mesure graphiquement par la tangente à l'origine.",
    ],
    pitfalls: [
      "Croire que l'intensité varie brutalement à la fermeture.",
      "Confondre τ = L/R avec τ = RC.",
      "Oublier que l'énergie est en joules alors que L est en henrys.",
    ],
    flashcards: [
      {
        question: "Quelle est l'expression de la constante de temps d'un circuit RL ?",
        answer: "τ = L/R, en secondes si L est en henrys et R en ohms.",
      },
      {
        question: "Que vaut l'intensité à t = τ ?",
        answer: "Elle atteint environ 63 % de sa valeur finale I₀ = E/R.",
      },
      {
        question: "Pourquoi utilise-t-on une diode de roue libre ?",
        answer: "Pour offrir un chemin au courant à l'ouverture et éviter une surtension destructrice aux bornes de la bobine.",
      },
    ],
    tags: ["RL", "bobine", "constante de temps", "auto-induction", "physique"],
  },
  {
    slug: "oscillations-rlc-libres",
    subjectSlug: "physique",
    title: "Oscillations libres dans un circuit RLC",
    chapter: "Électricité · Oscillations RLC",
    summary:
      "Passer du régime pseudo-périodique au régime apériodique : équation différentielle, période propre, amortissement par la résistance et énergie du circuit.",
    level: "Bac · Math / Sciences / Tech / Info (T2)",
    durationMin: 30,
    orderIndex: 5,
    objectives: [
      "Établir l'équation différentielle de la charge dans un circuit RLC",
      "Distinguer régime pseudo-périodique, critique et apériodique",
      "Calculer la période propre T₀ = 2π√(LC)",
      "Décrire l'évolution de l'énergie totale du circuit",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Un échange permanent d'énergie",
        text: "Le condensateur stocke de l'énergie électrique (½ C u²) et la bobine de l'énergie magnétique (½ L i²). Dans un circuit LC idéal, l'énergie passe de l'un à l'autre sans perte : les oscillations sont sinusoïdales et éternelles. La résistance dissipe cette énergie par effet Joule, ce qui amortit les oscillations.",
      },
      {
        type: "formula",
        title: "Équation et solutions",
        expression:
          "L·(d²q/dt²) + R·(dq/dt) + q/C = 0\nsi R = 0 : q(t) = Qm cos(2πt/T₀ + φ),  T₀ = 2π√(LC)",
        note: "En régime pseudo-périodique, la pseudo-période reste très proche de T₀ tant que l'amortissement est faible. L'amortissement est caractérisé par le facteur 2√(L/C) comparé à R.",
      },
      {
        type: "table",
        title: "Les trois régimes",
        head: ["Régime", "Condition", "Allure"],
        rows: [
          ["Pseudo-périodique", "R faible", "Oscillations amorties de période quasi constante"],
          ["Critique", "R = 2√(L/C)", "Retour le plus rapide à l'équilibre sans osciller"],
          ["Apériodique", "R forte", "Retour lent à l'équilibre sans aucune oscillation"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Exploitation graphique au bac",
        text: "Sur un enregistrement, on mesure la pseudo-période entre deux maxima successifs, on en déduit L = T²/(4π²C), puis on compare la décroissance de l'amplitude (décrément logarithmique) pour estimer la résistance.",
      },
    ],
    keyPoints: [
      "T₀ = 2π√(LC) et f₀ = 1/(2π√(LC)).",
      "L'énergie totale diminue par effet Joule : elle est transférée à l'extérieur sous forme de chaleur.",
      "Trois régimes selon la valeur de la résistance.",
      "L'équation de la charge est celle d'un oscillateur amorti.",
    ],
    pitfalls: [
      "Confondre période propre T₀ et pseudo-période T (elles diffèrent légèrement).",
      "Oublier les unités (L en H, C en F, donc LC en s²).",
      "Croire que l'énergie totale se conserve quand R ≠ 0.",
    ],
    flashcards: [
      {
        question: "Expression de la période propre d'un circuit LC ?",
        answer: "T₀ = 2π√(LC).",
      },
      {
        question: "Que devient l'énergie perdue dans un circuit RLC réel ?",
        answer: "Elle est dissipée par effet Joule dans la résistance, sous forme de chaleur.",
      },
      {
        question: "Quel régime obtient-on quand R = 2√(L/C) ?",
        answer: "Le régime critique : retour à l'équilibre le plus rapide sans oscillation.",
      },
    ],
    tags: ["RLC", "oscillations", "période propre", "amortissement", "physique"],
  },
  {
    slug: "ondes-mecaniques",
    subjectSlug: "physique",
    title: "Ondes mécaniques progressives et périodiques",
    chapter: "Ondes · Ondes mécaniques",
    summary:
      "Décrire la propagation d'une perturbation dans un milieu : célérité, retard, ondes longitudinales et transversales, puis ondes périodiques, longueur d'onde et diffraction.",
    level: "Bac · Math / Sciences / Tech / Info (T2)",
    durationMin: 28,
    orderIndex: 6,
    objectives: [
      "Distinguer onde longitudinale et transversale",
      "Relier célérité, distance et retard : v = d/Δt",
      "Utiliser la relation λ = v·T = v/f",
      "Prévoir l'effet d'un changement de milieu sur la propagation",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Une onde transporte de l'énergie, pas de la matière",
        text: "Une onde mécanique progressive est la propagation d'une perturbation dans un milieu matériel, sans transport de matière : chaque point du milieu oscille autour de sa position d'équilibre et transmet le mouvement à son voisin. La corde vibre, mais ne se déplace pas globalement.",
      },
      {
        type: "formula",
        title: "Les deux relations essentielles",
        expression: "v = d / Δt     et     λ = v · T = v / f",
        note: "Δt ne dépend que de la distance parcourue et de la célérité du milieu. Deux points distants de λ vibrent en phase ; distants de λ/2, ils sont en opposition de phase.",
      },
      {
        type: "table",
        title: "Deux familles d'ondes",
        head: ["Type", "Déformation du milieu", "Exemple"],
        rows: [
          ["Longitudinale", "Compression-dilatation parallèle à la direction de propagation", "Son dans l'air, ressort comprimé"],
          ["Transversale", "Déplacement perpendiculaire à la direction de propagation", "Vague sur l'eau, corde vibrante"],
          ["Périodique", "Répétition identique dans le temps", "Onde sinusoïdale entretenue"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le piège du changement de milieu",
        text: "Quand une onde change de milieu, sa célérité et sa longueur d'onde changent, mais sa fréquence reste identique (elle est imposée par la source). Écrire que la fréquence diminue en passant dans l'eau est une erreur classique.",
      },
    ],
    keyPoints: [
      "Une onde transporte de l'énergie sans transport de matière.",
      "v = d/Δt permet de calculer un retard ou une distance.",
      "λ = v/f : la longueur d'onde dépend du milieu, la fréquence non.",
      "Deux points distants de λ vibrent en phase.",
    ],
    pitfalls: [
      "Confondre période T et retard τ.",
      "Croire que la fréquence change avec le milieu.",
      "Oublier de convertir les centimètres en mètres.",
    ],
    flashcards: [
      {
        question: "Que se conserve quand une onde change de milieu ?",
        answer: "La fréquence ; la célérité et la longueur d'onde changent.",
      },
      {
        question: "Relation entre longueur d'onde, célérité et fréquence ?",
        answer: "λ = v/f, avec λ en mètres, v en m/s et f en hertz.",
      },
      {
        question: "Une onde sur une corde est-elle longitudinale ou transversale ?",
        answer: "Transversale : le déplacement est perpendiculaire à la direction de propagation.",
      },
    ],
    tags: ["ondes", "célérité", "longueur d'onde", "périodicité", "physique"],
  },
  {
    slug: "decroissance-radioactive",
    subjectSlug: "physique",
    title: "Décroissance radioactive et datation",
    chapter: "Nucléaire · Décroissance",
    summary:
      "Relier loi de décroissance, demi-vie et constante radioactive, puis appliquer la décroissance à la datation d'un échantillon.",
    level: "Bac · Math / Sciences / Tech / Info (T3)",
    durationMin: 26,
    orderIndex: 7,
    objectives: [
      "Écrire la loi de décroissance radioactive",
      "Relier demi-vie et constante radioactive",
      "Déterminer l'âge d'un échantillon par la méthode de datation",
      "Distinguer activité et nombre de noyaux",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Une décroissance exponentielle",
        text: "Le nombre de noyaux radioactifs restants à l'instant t suit N(t) = N₀·e^(−λt). La constante radioactive λ caractérise l'isotope ; elle ne dépend ni de la température, ni de la pression, ni de la forme chimique. C'est ce qui rend la datation radioactive fiable.",
      },
      {
        type: "formula",
        title: "Loi et demi-vie",
        expression: "N(t) = N₀·e^(−λt)   ·   t½ = ln 2 / λ   ·   A(t) = λ·N(t)",
        note: "L'activité A se mesure en becquerels (1 Bq = 1 désintégration par seconde). Elle décroît avec la même loi que N : A(t) = A₀ e^(−λt).",
      },
      {
        type: "steps",
        title: "Méthode — dater un échantillon",
        items: [
          "Identifier l'isotope utilisé et sa demi-vie t½.",
          "Mesurer le rapport N(t)/N₀ (ou l'activité actuelle comparée à l'activité initiale).",
          "Appliquer N/N₀ = e^(−λt) et prendre le logarithme : t = −ln(N/N₀)/λ.",
          "Exprimer le résultat dans une unité lisible (années) et vérifier l'ordre de grandeur.",
          "Discuter la validité : la méthode n'est fiable que sur quelques demi-vies.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le raccourci des demi-vies",
        text: "Après n demi-vies, il reste N₀/2ⁿ. Pour un âge de 3 demi-vies, il reste 12,5 % des noyaux. Ce raisonnement évite tout calcul avec le logarithme et suffit à beaucoup de questions de bac.",
      },
    ],
    keyPoints: [
      "N(t) = N₀·e^(−λt) et A(t) = λ·N(t).",
      "Demi-vie : t½ = ln 2/λ, temps au bout duquel la moitié des noyaux a disparu.",
      "λ est indépendant des conditions physico-chimiques.",
      "Après n demi-vies, il reste N₀/2ⁿ noyaux.",
    ],
    pitfalls: [
      "Confondre activité (Bq) et nombre de noyaux.",
      "Utiliser le logarithme décimal à la place du logarithme népérien.",
      "Oublier que λ et t doivent être dans la même unité de temps.",
    ],
    flashcards: [
      {
        question: "Relation entre demi-vie et constante radioactive ?",
        answer: "t½ = ln 2 / λ.",
      },
      {
        question: "Quelle fraction reste après 4 demi-vies ?",
        answer: "1/2⁴ = 1/16, soit 6,25 % des noyaux initiaux.",
      },
      {
        question: "L'activité dépend-elle de la température ?",
        answer: "Non : la décroissance radioactive est un phénomène nucléaire indépendant des conditions extérieures.",
      },
    ],
    tags: ["radioactivité", "demi-vie", "datation", "activité", "physique"],
  },
];

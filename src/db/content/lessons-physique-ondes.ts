import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Physique et chimie — fiches de la 4ème année secondaire (sections
 * Mathématiques, Sciences expérimentales et Sciences techniques).
 *
 * Ce fichier couvre la seconde moitié du programme : oscillations forcées,
 * puissance, mécanique du solide, ondes électromagnétiques, diffraction et
 * toute la partie chimie (cinétique, équilibre, acides-bases, oxydoréduction,
 * électrolyse).
 */
export const physiqueChimieLessons: LessonSeed[] = [
  {
    slug: "oscillations-forcees-resonance",
    subjectSlug: "physique",
    title: "Oscillations électriques forcées et résonance",
    chapter: "Électricité · Oscillations forcées",
    summary:
      "Étudier un circuit RLC soumis à une tension sinusoïdale : résonance d'intensité, facteur de qualité et bande passante, et savoir les exploiter dans un exercice.",
    level: "Bac · 4e Mathématiques / Sciences exp. (T2)",
    durationMin: 28,
    orderIndex: 20,
    objectives: [
      "Distinguer oscillations libres et oscillations forcées",
      "Décrire la résonance d'intensité et sa condition",
      "Utiliser le facteur de qualité Q et la bande passante",
      "Expliquer les applications et les dangers de la résonance",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Du régime libre au régime forcé",
        text: "Dans un circuit RLC libre, le condensateur se décharge et l'amplitude décroît sous l'effet de la résistance. Si l'on branche à la place une source sinusoïdale de fréquence f, le circuit entretenu oscille à la fréquence imposée : c'est le régime forcé. L'amplitude de l'intensité dépend alors de f, et passe par un maximum à la résonance.",
      },
      {
        type: "table",
        title: "Les grandeurs du régime forcé",
        head: ["Grandeur", "Expression", "Remarque"],
        rows: [
          ["Fréquence propre", "f₀ = 1/(2π√(LC))", "indépendante de R"],
          ["Résonance d'intensité", "f = f₀", "I maximale, circuit inductif/capacitif de part et d'autre"],
          ["Impédance", "Z = U/I = √(R² + (Lω − 1/(Cω))²)", "Z minimale à la résonance = R"],
          ["Facteur de qualité", "Q = Lω₀/R = 1/(R·C·ω₀)", "Q élevé ⇒ résonance aiguë"],
          ["Bande passante", "Δf = f₀/Q", "intervalle où I ≥ Imax/√2"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — exploiter une courbe de résonance",
        items: [
          "Repérer le maximum de I : son abscisse donne f₀.",
          "Calculer L ou C à partir de f₀ = 1/(2π√(LC)).",
          "Lire l'intensité maximale : elle vaut U/R, ce qui donne R.",
          "Mesurer la largeur de la bande passante pour en déduire Q.",
          "Conclure sur la sélectivité : plus Q est grand, plus le circuit est sélectif.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Applications concrètes à citer",
        text: "La résonance sert à sélectionner une fréquence (accord d'un récepteur radio, filtre) ; elle est redoutée quand elle provoque des amplitudes destructrices (vibrations d'un pont, d'un moteur). Un même phénomène, deux usages opposés : c'est ce que le correcteur attend.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne pas confondre",
        text: "Résonance d'intensité (circuit série, I maximale, Z minimale) et résonance de tension aux bornes du condensateur (fréquence légèrement différente, surtout quand Q est faible). Le programme du bac demande la première.",
      },
    ],
    keyPoints: [
      "En régime forcé, le circuit oscille à la fréquence de la source.",
      "À la résonance : f = f₀, Z = R, I est maximale.",
      "Q mesure l'acuité de la résonance ; Δf = f₀/Q.",
      "La sélectivité d'un récepteur vient de la résonance.",
    ],
    pitfalls: [
      "Confondre fréquence propre et fréquence imposée.",
      "Oublier que Z = R seulement à la résonance.",
      "Utiliser Δf = f₀·Q au lieu de f₀/Q.",
    ],
    flashcards: [
      {
        question: "Quelle est la condition de résonance d'intensité ?",
        answer: "La fréquence de la source doit égaler la fréquence propre f₀ = 1/(2π√(LC)).",
      },
      {
        question: "Que vaut l'impédance à la résonance ?",
        answer: "Z = R : les réactances inductive et capacitive se compensent.",
      },
      {
        question: "Comment augmente-t-on la sélectivité d'un circuit ?",
        answer: "En diminuant R, ce qui augmente Q et réduit la bande passante.",
      },
    ],
    tags: ["physique", "RLC", "résonance", "impédance", "oscillations forcées"],
  },
  {
    slug: "puissance-sinusoidal",
    subjectSlug: "physique",
    title: "Puissance en régime sinusoïdal et facteur de puissance",
    chapter: "Électricité · Puissance",
    summary:
      "Calculer la puissance moyenne absorbée par un dipôle, interpréter le facteur de puissance et comprendre l'intérêt de la compensation (relèvement du cos φ).",
    level: "Bac · 4e Mathématiques / Sciences techniques (T2)",
    durationMin: 24,
    orderIndex: 21,
    objectives: [
      "Calculer puissance instantanée et puissance moyenne",
      "Définir les valeurs efficaces",
      "Interpréter le facteur de puissance cos φ",
      "Expliquer l'intérêt de relever le facteur de puissance",
    ],
    blocks: [
      {
        type: "table",
        title: "Les expressions à connaître",
        head: ["Grandeur", "Expression", "Unité"],
        rows: [
          ["Valeur maximale / efficace", "U = Umax/√2 ; I = Imax/√2", "V, A"],
          ["Puissance instantanée", "p(t) = u(t)·i(t)", "W"],
          ["Puissance moyenne", "P = U·I·cos φ", "W"],
          ["Puissance apparente", "S = U·I", "VA"],
          ["Puissance réactive", "Q = U·I·sin φ", "var"],
          ["Facteur de puissance", "k = P/S = cos φ", "sans unité"],
        ],
      },
      {
        type: "paragraph",
        title: "Ce que mesure le cos φ",
        text: "cos φ mesure la part de la puissance apparente réellement convertie en travail utile. Pour un résistor, φ = 0 et cos φ = 1 : toute la puissance est active. Pour une bobine idéale, φ = π/2 et cos φ = 0 : le courant et la tension sont décalés, l'énergie fait des allers-retours sans travail utile. Un facteur de puissance faible oblige le distributeur à transporter un courant plus élevé pour la même puissance utile, d'où des pertes par effet Joule.",
      },
      {
        type: "steps",
        title: "Méthode — exploiter un relevé expérimental",
        items: [
          "Repérer Umax et Imax, puis calculer les valeurs efficaces.",
          "Mesurer le déphasage φ entre tension et courant (ou le déduire du cos φ donné).",
          "Calculer P = U·I·cos φ, puis S = U·I et Q = U·I·sin φ.",
          "Vérifier la cohérence avec la loi des mailles du dipôle étudié.",
          "Conclure sur la nature du dipôle : résistif (cos φ ≈ 1), inductif (φ > 0), capacitif (φ < 0).",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreur de calcul classique",
        text: "Utiliser les valeurs maximales dans P = U·I·cos φ. La formule n'est valable qu'avec les valeurs efficaces. Écris toujours la conversion U = Umax/√2 avant de calculer la puissance.",
      },
    ],
    keyPoints: [
      "P = U·I·cos φ avec les valeurs efficaces.",
      "S = U·I en voltampères, P en watts.",
      "Un cos φ faible signifie des pertes en ligne plus élevées.",
      "Le condensateur de compensation relève le facteur de puissance.",
    ],
    pitfalls: [
      "Mélanger valeurs maximales et efficaces.",
      "Confondre puissance active et apparente dans les unités (W et VA).",
      "Oublier le signe du déphasage selon la nature du dipôle.",
    ],
    flashcards: [
      {
        question: "Quelle relation lie P, U, I et φ ?",
        answer: "P = U·I·cos φ, avec U et I en valeurs efficaces.",
      },
      {
        question: "Pourquoi relever le facteur de puissance d'une installation ?",
        answer: "Pour réduire le courant transporté à puissance utile égale, donc les pertes par effet Joule et le dimensionnement des câbles.",
      },
      {
        question: "Quel est le facteur de puissance d'un résistor pur ?",
        answer: "cos φ = 1, car tension et courant sont en phase.",
      },
    ],
    tags: ["physique", "puissance", "cos φ", "alternatif", "efficace"],
  },
  {
    slug: "pendule-elastique",
    subjectSlug: "physique",
    title: "Le pendule élastique : oscillations mécaniques",
    chapter: "Mécanique · Oscillateurs mécaniques",
    summary:
      "Établir l'équation différentielle d'un oscillateur élastique horizontal ou vertical, en déduire la période propre et étudier l'amortissement.",
    level: "Bac · 4e Mathématiques / Sciences exp. (T2)",
    durationMin: 28,
    orderIndex: 22,
    objectives: [
      "Établir l'équation différentielle du mouvement",
      "Exprimer la période propre T₀",
      "Distinguer régimes pseudo-périodique, critique et apériodique",
      "Exploiter un enregistrement expérimental",
    ],
    blocks: [
      {
        type: "steps",
        title: "Établir l'équation différentielle",
        items: [
          "Définir le système (solide de masse m) et le référentiel galiléen.",
          "Faire le bilan des forces : poids, réaction du support, force de rappel du ressort T = −k·x.",
          "Appliquer la deuxième loi de Newton et projeter sur l'axe du mouvement.",
          "Obtenir m·a = −k·x, soit x'' + (k/m)·x = 0.",
          "Identifier ω₀ = √(k/m) et T₀ = 2π√(m/k).",
        ],
      },
      {
        type: "table",
        title: "Les régimes d'oscillation",
        head: ["Régime", "Amortissement", "Allure"],
        rows: [
          ["Périodique (non amorti)", "frottements négligés", "sinusoïde d'amplitude constante"],
          ["Pseudo-périodique", "frottements faibles", "oscillations d'amplitude décroissante"],
          ["Critique", "amortissement limite", "retour rapide à l'équilibre sans oscillation"],
          ["Apériodique", "frottements forts", "retour lent, sans dépassement"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Ce que la période propre ne dépend pas",
        text: "T₀ = 2π√(m/k) ne dépend ni de l'amplitude ni de la gravité (dans le cas horizontal) : c'est l'isochronisme des petites oscillations. En revanche, elle dépend de m et de k — d'où l'usage du pendule pour mesurer une masse ou une raideur.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux pièges de rédaction",
        text: "Oublier de préciser le référentiel galiléen avant d'appliquer Newton, et confondre T (période) avec T la tension du ressort dans les notations. Numérote toujours tes grandeurs dans le bilan des forces.",
      },
    ],
    keyPoints: [
      "Équation du mouvement : x'' + (k/m)·x = 0.",
      "Période propre : T₀ = 2π√(m/k).",
      "L'amortissement diminue l'amplitude sans changer (beaucoup) la pseudo-période.",
      "Le régime critique est le plus rapide sans dépassement (amortisseurs).",
    ],
    pitfalls: [
      "Appliquer Newton dans un référentiel non galiléen.",
      "Confondre x (élongation) et a (accélération) dans l'équation.",
      "Oublier la force de rappel dans le bilan.",
    ],
    flashcards: [
      {
        question: "Quelle est la période propre d'un oscillateur élastique ?",
        answer: "T₀ = 2π√(m/k).",
      },
      {
        question: "Que devient l'amplitude en régime pseudo-périodique ?",
        answer: "Elle décroît progressivement à cause des frottements, la pseudo-période restant presque constante.",
      },
      {
        question: "Quel régime choisit-on pour un amortisseur ?",
        answer: "Le régime critique ou légèrement sous-critique : retour rapide à l'équilibre sans oscillation gênante.",
      },
    ],
    tags: ["physique", "pendule", "oscillations", "ressort", "amortissement"],
  },
  {
    slug: "energie-mecanique-amortissement",
    subjectSlug: "physique",
    title: "Énergie mécanique et amortissement",
    chapter: "Mécanique · Énergie",
    summary:
      "Calculer l'énergie cinétique, l'énergie potentielle et l'énergie mécanique d'un oscillateur, et exploiter sa non-conservation pour mesurer le travail des frottements.",
    level: "Bac · 4e Mathématiques / Sciences exp. (T2)",
    durationMin: 25,
    orderIndex: 23,
    objectives: [
      "Calculer Ec, Ep et Em d'un système",
      "Énoncer la condition de conservation de l'énergie mécanique",
      "Relier la variation de Em au travail des frottements",
      "Exploiter une courbe d'énergie",
    ],
    blocks: [
      {
        type: "table",
        title: "Les trois énergies",
        head: ["Énergie", "Expression", "Dépend de"],
        rows: [
          ["Cinétique", "Ec = ½mv²", "vitesse"],
          ["Potentielle de pesanteur", "Ep = mgh", "altitude"],
          ["Potentielle élastique", "Epe = ½kx²", "élongation"],
          ["Mécanique", "Em = Ec + Ep", "état du système"],
        ],
      },
      {
        type: "paragraph",
        title: "Le critère de conservation",
        text: "L'énergie mécanique se conserve si et seulement si les forces non conservatives (frottements) ne travaillent pas. Dans un oscillateur réel, chaque oscillation dissipe de l'énergie : la courbe de Em décroît, et cette décroissance mesure exactement le travail des forces de frottement, ΔEm = W(f) < 0.",
      },
      {
        type: "steps",
        title: "Méthode — exploiter un enregistrement",
        items: [
          "Repérer les positions extrêmes : la vitesse s'y annule, donc Ec = 0 et Em = Ep.",
          "Repérer la position d'équilibre : Ep y est minimale et la vitesse maximale.",
          "Calculer Em en deux positions différentes : la différence donne l'énergie dissipée.",
          "Diviser par la durée pour obtenir la puissance moyenne dissipée.",
          "Conclure sur l'effet des frottements (amortissement).",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Attention aux unités",
        text: "m en kilogrammes, v en m/s, k en N/m, x en mètres. Un oubli de conversion des centimètres en mètres fausse l'énergie d'un facteur 10⁴ sur x² — l'erreur la plus fréquente dans les exercices d'énergie.",
      },
    ],
    keyPoints: [
      "Em = Ec + Ep ; elle se conserve sans frottement.",
      "ΔEm = W(f) mesure l'énergie dissipée.",
      "Aux extremums, Ec = 0 et Em = Ep.",
      "La puissance dissipée moyenne vaut ΔEm/Δt.",
    ],
    pitfalls: [
      "Oublier de convertir les centimètres en mètres.",
      "Confondre Ep de pesanteur et Ep élastique.",
      "Affirmer la conservation de Em en présence de frottements.",
    ],
    flashcards: [
      {
        question: "Que vaut l'énergie mécanique en une position extrême d'un oscillateur élastique ?",
        answer: "Em = ½k·xmax² puisque la vitesse (donc Ec) y est nulle.",
      },
      {
        question: "Comment mesure-t-on l'énergie dissipée par frottements ?",
        answer: "Par la diminution de l'énergie mécanique entre deux instants : |ΔEm| = travail des frottements.",
      },
      {
        question: "Quand l'énergie mécanique se conserve-t-elle ?",
        answer: "Lorsque seules des forces conservatives travaillent (pas de frottement).",
      },
    ],
    tags: ["physique", "énergie", "mécanique", "frottements", "oscillateur"],
  },
  {
    slug: "rotation-axe-fixe",
    subjectSlug: "physique",
    title: "Rotation d'un solide autour d'un axe fixe",
    chapter: "Mécanique · Solide en rotation",
    summary:
      "Décrire un mouvement de rotation : vitesse angulaire, accélération angulaire, moment d'inertie et relation fondamentale de la dynamique de rotation.",
    level: "Bac · 4e Mathématiques / Sciences techniques (T2)",
    durationMin: 27,
    orderIndex: 24,
    objectives: [
      "Relier vitesse linéaire et vitesse angulaire",
      "Calculer un moment d'inertie usuel",
      "Appliquer la relation fondamentale de la rotation",
      "Étudier l'équilibre d'un solide mobile autour d'un axe",
    ],
    blocks: [
      {
        type: "table",
        title: "Grandeurs de rotation",
        head: ["Grandeur", "Expression", "Unité"],
        rows: [
          ["Vitesse angulaire", "ω = dθ/dt = v/R", "rad/s"],
          ["Accélération angulaire", "α = dω/dt", "rad/s²"],
          ["Moment d'inertie (cylindre)", "J = ½mR²", "kg·m²"],
          ["Moment d'inertie (tige, axe au centre)", "J = (1/12)mL²", "kg·m²"],
          ["Moment cinétique", "L = J·ω", "kg·m²/s"],
          ["Relation fondamentale", "Σ MΔ(F) = J·α", "N·m"],
        ],
      },
      {
        type: "paragraph",
        title: "L'analogue de la deuxième loi de Newton",
        text: "En rotation, le moment d'une force joue le rôle de la force, le moment d'inertie celui de la masse, l'accélération angulaire celui de l'accélération. La relation Σ MΔ = J·α s'écrit donc avec les mêmes réflexes : bilan des moments, choix du sens positif, projection, puis résolution.",
      },
      {
        type: "steps",
        title: "Méthode — exercice type poulie + masse",
        items: [
          "Isoler chaque solide : la masse en translation, la poulie en rotation.",
          "Écrire pour la masse : m·a = m·g − T (axe descendant positif).",
          "Écrire pour la poulie : T·R = J·α.",
          "Utiliser la liaison : a = α·R (le fil ne glisse pas).",
          "Résoudre le système et vérifier l'homogénéité des unités.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le moment d'inertie traduit la répartition de masse",
        text: "Plus la masse est éloignée de l'axe, plus J est grand et plus il est difficile de mettre le solide en rotation. C'est pourquoi un patineur qui rapproche les bras tourne plus vite : J diminue, et le moment cinétique Jω se conserve.",
      },
    ],
    keyPoints: [
      "v = R·ω relie translation et rotation.",
      "Σ MΔ(F) = J·α est la loi fondamentale de la rotation.",
      "Le moment d'inertie dépend de l'axe choisi.",
      "La conservation du moment cinétique explique l'accélération quand J diminue.",
    ],
    pitfalls: [
      "Oublier de choisir un sens positif unique pour les moments.",
      "Utiliser le moment d'inertie d'un autre axe.",
      "Confondre vitesse angulaire (rad/s) et fréquence (tr/s).",
    ],
    flashcards: [
      {
        question: "Quelle relation lie vitesse linéaire et vitesse angulaire ?",
        answer: "v = R·ω, avec ω en rad/s et R la distance à l'axe.",
      },
      {
        question: "Quel est le moment d'inertie d'un cylindre plein autour de son axe ?",
        answer: "J = ½mR².",
      },
      {
        question: "Pourquoi le patineur tourne-t-il plus vite quand il rapproche les bras ?",
        answer: "Parce que J diminue ; le moment cinétique Jω conservé impose une augmentation de ω.",
      },
    ],
    tags: ["physique", "rotation", "moment d'inertie", "solide", "mécanique"],
  },
  {
    slug: "ondes-mecaniques-periodiques",
    subjectSlug: "physique",
    title: "Ondes mécaniques progressives et périodiques",
    chapter: "Ondes · Propagation",
    summary:
      "Décrire la propagation d'une onde : célérité, retard, double périodicité (temporelle et spatiale) et ondulatoire sinusoïdale, avec les calculs du bac.",
    level: "Bac · 4e Mathématiques / Sciences exp. (T2)",
    durationMin: 26,
    orderIndex: 25,
    objectives: [
      "Distinguer onde longitudinale et transversale",
      "Calculer un retard à partir d'une distance",
      "Utiliser la double périodicité d'une onde sinusoïdale",
      "Exploiter un enregistrement de deux points du milieu",
    ],
    blocks: [
      {
        type: "table",
        title: "Formules de propagation",
        head: ["Grandeur", "Expression", "Attention"],
        rows: [
          ["Célérité", "v = d/Δt", "constante dans un milieu homogène"],
          ["Retard", "τ = d/v", "d parcourue par l'onde"],
          ["Période temporelle", "T = 1/f", "en s"],
          ["Longueur d'onde", "λ = v·T = v/f", "en m"],
          ["Retard et période", "τ = k·T si les points sont en phase", "k entier"],
        ],
      },
      {
        type: "paragraph",
        title: "La double périodicité, clé du chapitre",
        text: "Une onde sinusoïdale est périodique dans le temps (une même perturbation revient toutes les T) et dans l'espace (le profil se répète toutes les λ). Le lien entre les deux est la célérité : λ = v·T. Cette unique relation permet de résoudre presque tous les exercices d'exploitation d'enregistrement.",
      },
      {
        type: "steps",
        title: "Méthode — deux points d'un enregistrement",
        items: [
          "Identifier la source et les points : le point le plus éloigné est atteint plus tard.",
          "Mesurer le décalage temporel τ entre les deux courbes.",
          "En déduire v = d/τ (d étant la distance entre les deux points).",
          "Lire la période T sur l'enregistrement, puis λ = v·T.",
          "Vérifier la cohérence : si τ est un multiple entier de T, les points vibrent en phase.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Onde et déplacement de matière",
        text: "Une onde transporte de l'énergie sans transporter de matière : chaque point du milieu reproduit le mouvement de la source avec un retard, mais ne se déplace pas d'ensemble. Dire le contraire est l'erreur conceptuelle la plus sanctionnée.",
      },
    ],
    keyPoints: [
      "v = d/Δt et τ = d/v.",
      "λ = v·T relie périodicité spatiale et temporelle.",
      "Une onde transporte l'énergie, pas la matière.",
      "Deux points distants de k·λ vibrent en phase.",
    ],
    pitfalls: [
      "Confondre la distance parcourue par l'onde et l'amplitude de vibration.",
      "Oublier que la célérité dépend du milieu, pas de la source.",
      "Utiliser τ = d/v avec la distance source-récepteur au lieu de la distance entre points.",
    ],
    flashcards: [
      {
        question: "Quelle relation lie λ, v et T ?",
        answer: "λ = v·T = v/f.",
      },
      {
        question: "Que transporte une onde mécanique ?",
        answer: "De l'énergie (et de la quantité de mouvement), sans transport de matière.",
      },
      {
        question: "Que signifie un retard τ = 3T entre deux points ?",
        answer: "Qu'ils vibrent en phase, le second reproduisant le mouvement du premier avec trois périodes de retard.",
      },
    ],
    tags: ["physique", "ondes", "célérité", "longueur d'onde", "retard"],
  },
  {
    slug: "ondes-electromagnetiques",
    subjectSlug: "physique",
    title: "Ondes électromagnétiques et spectre",
    chapter: "Ondes · Lumière et spectre",
    summary:
      "Situer les ondes électromagnétiques dans le spectre, utiliser la relation λ = c/ν et comprendre les applications et les risques des différents domaines.",
    level: "Bac · 4e Mathématiques / Sciences exp. (T3)",
    durationMin: 24,
    orderIndex: 26,
    objectives: [
      "Classer les domaines du spectre électromagnétique",
      "Utiliser la relation λ = c/ν",
      "Relier un domaine à ses applications",
      "Identifier les risques et les précautions",
    ],
    blocks: [
      {
        type: "table",
        title: "Le spectre, du plus énergétique au moins énergétique",
        head: ["Domaine", "Longueur d'onde typique", "Usage / effet"],
        rows: [
          ["Rayons gamma", "< 10 pm", "médecine nucléaire, risque d'ionisation"],
          ["Rayons X", "0,01–10 nm", "radiographie"],
          ["Ultraviolet", "10–400 nm", "érythème, synthèse de vitamine D"],
          ["Visible", "400–800 nm", "vision"],
          ["Infrarouge", "800 nm–1 mm", "télécommande, capteur thermique"],
          ["Micro-ondes", "1 mm–30 cm", "téléphonie, four"],
          ["Ondes radio", "> 30 cm", "radio, télévision, Wi-Fi"],
        ],
      },
      {
        type: "paragraph",
        title: "Une seule famille, une seule vitesse dans le vide",
        text: "Toutes les ondes électromagnétiques se propagent dans le vide à la même célérité c ≈ 3,00·10⁸ m/s, et ne nécessitent aucun milieu matériel. Ce qui les distingue est leur fréquence : plus elle est élevée, plus l'énergie du photon est grande (E = hν), et plus les effets biologiques sont marqués.",
      },
      {
        type: "steps",
        title: "Méthode — calcul de longueur d'onde",
        items: [
          "Convertir la fréquence en hertz ou la longueur d'onde en mètres.",
          "Appliquer λ = c/ν (dans le vide ou l'air).",
          "Comparer le résultat aux bornes du visible (400–800 nm).",
          "Conclure sur le domaine du spectre, puis sur l'usage ou le risque.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Ordre de grandeur à mémoriser",
        text: "Une fréquence de 10¹⁵ Hz correspond à λ ≈ 300 nm (ultraviolet) ; 10¹⁰ Hz correspond à λ ≈ 3 cm (micro-ondes). Retenir ces deux repères permet de situer n'importe quelle valeur sans hésitation.",
      },
    ],
    keyPoints: [
      "λ = c/ν avec c ≈ 3,00·10⁸ m/s.",
      "Toutes les ondes EM vont à la même vitesse dans le vide.",
      "Le visible occupe une étroite bande de 400 à 800 nm.",
      "Fréquence élevée ⇒ énergie élevée ⇒ effets biologiques plus forts.",
    ],
    pitfalls: [
      "Confondre longueur d'onde en nm et en m.",
      "Croire qu'une onde EM a besoin d'un milieu matériel.",
      "Inverser proportionnalité et fréquence dans λ = c/ν.",
    ],
    flashcards: [
      {
        question: "Quelle est la vitesse d'une onde électromagnétique dans le vide ?",
        answer: "c ≈ 3,00·10⁸ m/s, quelle que soit sa fréquence.",
      },
      {
        question: "Quel domaine correspond à 500 nm ?",
        answer: "Le visible (lumière verte).",
      },
      {
        question: "Quelle relation lie énergie du photon et fréquence ?",
        answer: "E = h·ν, avec h la constante de Planck.",
      },
    ],
    tags: ["physique", "ondes", "spectre", "lumière", "EM"],
  },
  {
    slug: "diffraction-lumiere",
    subjectSlug: "physique",
    title: "Diffraction de la lumière",
    chapter: "Ondes · Diffraction",
    summary:
      "Observer et exploiter la diffraction : écart angulaire, largeur de la tache centrale et détermination d'une longueur d'onde ou d'une dimension d'ouverture.",
    level: "Bac · 4e Mathématiques / Sciences exp. (T3)",
    durationMin: 24,
    orderIndex: 27,
    objectives: [
      "Décrire le phénomène de diffraction",
      "Utiliser la relation θ ≈ λ/a",
      "Mesurer une longueur d'onde avec une fente",
      "Expliquer la limite de résolution d'un instrument",
    ],
    blocks: [
      {
        type: "table",
        title: "Les relations utiles",
        head: ["Grandeur", "Relation", "Conditions"],
        rows: [
          ["Écart angulaire", "θ = λ/a", "petit angle, θ en rad"],
          ["Largeur de la tache centrale", "L = 2·D·λ/a", "D distance fente-écran"],
          ["Longueur d'onde", "λ = a·L/(2D)", "a largeur de fente"],
          ["Limite de résolution", "θmin ≈ λ/a", "diamètre d'ouverture a"],
        ],
      },
      {
        type: "paragraph",
        title: "Un phénomène caractéristique des ondes",
        text: "La diffraction est l'étalement d'une onde lorsqu'elle rencontre un obstacle ou une ouverture de dimension comparable à sa longueur d'onde. Elle prouve la nature ondulatoire de la lumière, que l'optique géométrique (rayons rectilignes) ne peut expliquer. Plus l'ouverture est petite, plus l'étalement est grand.",
      },
      {
        type: "steps",
        title: "Méthode — déterminer λ au laboratoire",
        items: [
          "Mesurer a, la largeur de la fente, au micromètre.",
          "Mesurer D, la distance fente-écran, au mètre ruban.",
          "Mesurer L, la largeur de la tache centrale sur l'écran.",
          "Calculer λ = a·L/(2D) et vérifier l'ordre de grandeur attendu.",
          "Comparer les valeurs obtenues avec des fentes de largeurs différentes : θ augmente quand a diminue.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Diffraction et pouvoir séparateur",
        text: "C'est la diffraction qui limite la finesse d'un télescope ou d'un microscope : deux points trop proches donnent des taches qui se chevauchent. Augmenter le diamètre de l'ouverture améliore la résolution — un argument très apprécié en commentaire de document.",
      },
    ],
    keyPoints: [
      "θ = λ/a : l'écart angulaire croît quand a diminue.",
      "L = 2·D·λ/a pour la tache centrale.",
      "La diffraction prouve le caractère ondulatoire de la lumière.",
      "Elle fixe la limite de résolution des instruments d'optique.",
    ],
    pitfalls: [
      "Utiliser des degrés à la place des radians.",
      "Confondre a (largeur de fente) et D (distance à l'écran).",
      "Oublier le facteur 2 dans la largeur de la tache centrale.",
    ],
    flashcards: [
      {
        question: "Quelle est la relation entre écart angulaire, λ et a ?",
        answer: "θ = λ/a, pour de petits angles exprimés en radians.",
      },
      {
        question: "Que devient la tache centrale si la fente est plus étroite ?",
        answer: "Elle devient plus large : l'étalement augmente quand a diminue.",
      },
      {
        question: "Quelle propriété ondulatoire la diffraction met-elle en évidence ?",
        answer: "La nature ondulatoire de la lumière, que les rayons rectilignes n'expliquent pas.",
      },
    ],
    tags: ["physique", "diffraction", "optique", "longueur d'onde", "résolution"],
  },
];

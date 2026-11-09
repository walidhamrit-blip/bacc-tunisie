import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * SVT — programme complet de la 4ème année Sciences expérimentales :
 * reproduction et procréation, génétique (méiose, phylogénie, spéciation),
 * système nerveux et muscle, régulation de la pression artérielle, immunologie.
 */
export const svtExperimentalLessons: LessonSeed[] = [
  {
    slug: "fonction-reproductrice-homme",
    subjectSlug: "svt",
    title: "La fonction reproductrice chez l'homme",
    chapter: "Reproduction · Appareil reproducteur masculin",
    summary:
      "Décrire l'appareil reproducteur masculin, la spermatogenèse et son contrôle hormonal (GnRH, FSH, LH, testostérone).",
    level: "Bac · 4e Sciences expérimentales (T1)",
    durationMin: 26,
    orderIndex: 30,
    objectives: [
      "Situer les organes et leur rôle",
      "Décrire les étapes de la spermatogenèse",
      "Expliquer le contrôle hormonal",
      "Interpréter les effets d'une castration ou d'une injection hormonale",
    ],
    blocks: [
      {
        type: "table",
        title: "Organes et fonctions",
        head: ["Organe", "Rôle", "Remarque"],
        rows: [
          ["Testicules", "production de spermatozoïdes et de testostérone", "double fonction exocrine/endocrine"],
          ["Épididyme", "maturation et stockage des spermatozoïdes", "12 à 21 jours"],
          ["Canal déférent", "transport", "—"],
          ["Prostate et vésicules séminales", "sécrétion du liquide séminal", "nutrition et mobilité"],
          ["Hypophyse", "sécrétion de FSH et LH", "sous contrôle hypothalamique"],
        ],
      },
      {
        type: "steps",
        title: "La spermatogenèse",
        items: [
          "Les cellules germinales souches se multiplient par mitoses.",
          "Les spermatocytes I subissent la méiose I : deux spermatocytes II haploïdes.",
          "La méiose II donne quatre spermatides haploïdes.",
          "La spermatogenèse se termine par la spermiogenèse (différenciation en spermatozoïdes).",
          "Durée totale : environ 74 jours, production continue à partir de la puberté.",
        ],
      },
      {
        type: "paragraph",
        title: "Un contrôle hypothalamo-hypophysaire avec rétrocontrôle",
        text: "L'hypothalamus sécrète la GnRH, qui stimule l'antéhypophyse à libérer FSH et LH. La LH stimule les cellules de Leydig qui produisent la testostérone ; la FSH, avec la testostérone, stimule la spermatogenèse dans les tubes séminifères. La testostérone exerce en retour un rétrocontrôle négatif sur l'hypothalamus et l'hypophyse : c'est ce qui maintient les concentrations stables.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux cellules à ne pas confondre",
        text: "Cellules de Leydig (interstitielles) : produisent la testostérone sous l'effet de la LH. Cellules de Sertoli (dans les tubes séminifères) : nourrissent les cellules germinales et répondent à la FSH. L'exercice classique consiste à croiser un effet hormonal avec le type cellulaire concerné.",
      },
    ],
    keyPoints: [
      "Le testicule a une double fonction : exocrine (spermatozoïdes) et endocrine (testostérone).",
      "La méiose réduit de moitié le nombre de chromosomes.",
      "LH → Leydig → testostérone ; FSH → Sertoli → spermatogenèse.",
      "La testostérone rétrocontrôle négativement l'axe hypothalamo-hypophysaire.",
    ],
    pitfalls: [
      "Confondre Leydig et Sertoli.",
      "Oublier que la spermatogenèse est continue alors que l'ovogenèse est cyclique.",
      "Croire que la testostérone n'agit que sur les caractères sexuels secondaires.",
    ],
    flashcards: [
      {
        question: "Quelles cellules produisent la testostérone ?",
        answer: "Les cellules de Leydig, sous l'effet de la LH.",
      },
      {
        question: "Combien de spermatozoïdes donne un spermatocyte I ?",
        answer: "Quatre spermatozoïdes haploïdes, après les deux divisions de méiose.",
      },
      {
        question: "Quel est l'effet de la testostérone sur l'hypophyse ?",
        answer: "Un rétrocontrôle négatif qui limite la sécrétion de FSH et LH.",
      },
    ],
    tags: ["svt", "reproduction", "spermatogenèse", "testostérone", "hormones"],
  },
  {
    slug: "fonction-reproductrice-femme",
    subjectSlug: "svt",
    title: "La fonction reproductrice chez la femme et le cycle ovarien",
    chapter: "Reproduction · Cycle féminin",
    summary:
      "Décrire le cycle ovarien et le cycle utérin, leur synchronisation hormonale et les rétrocontrôles qui les gouvernent.",
    level: "Bac · 4e Sciences expérimentales (T1)",
    durationMin: 28,
    orderIndex: 31,
    objectives: [
      "Décrire les phases du cycle ovarien",
      "Relier cycle ovarien et cycle utérin",
      "Expliquer les rétrocontrôles de l'œstradiol et de la progestérone",
      "Interpréter des courbes hormonales",
    ],
    blocks: [
      {
        type: "table",
        title: "Le cycle en deux colonnes",
        head: ["Phase", "Ovaire", "Utérus"],
        rows: [
          ["Phase folliculaire (J1–J13)", "croissance folliculaire, sécrétion d'œstradiol", "desquamation puis prolifération de l'endomètre"],
          ["Ovulation (J14)", "libération de l'ovocyte II", "endomètre épais"],
          ["Phase lutéale (J15–J28)", "corps jaune, progestérone + œstradiol", "endomètre sécrétoire, prêt à la nidation"],
          ["Absence de fécondation", "régression du corps jaune", "chute hormonale, règles"],
        ],
      },
      {
        type: "paragraph",
        title: "Une bascule de rétrocontrôle",
        text: "En début de cycle, l'œstradiol exerce un rétrocontrôle négatif sur FSH et LH. Quand le follicule est mûr, la concentration d'œstradiol devient suffisamment élevée pour exercer un rétrocontrôle positif : cela déclenche le pic de LH, qui provoque l'ovulation. Ce renversement est le point le plus délicat à expliquer correctement.",
      },
      {
        type: "steps",
        title: "Méthode — lire des courbes hormonales",
        items: [
          "Repérer le pic de LH : il encadre l'ovulation (J14 d'un cycle de 28 jours).",
          "Repérer le pic d'œstradiol juste avant ce pic de LH.",
          "Repérer le plateau de progestérone après l'ovulation : c'est la signature du corps jaune.",
          "Relire la courbe de température : elle augmente de 0,3 à 0,5 °C après l'ovulation.",
          "Conclure sur la phase du cycle correspondant à chaque portion de courbe.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Argument expérimental type",
        text: "Si l'on détruit le corps jaune, la progestérone chute et la muqueuse utérine est éliminée : on en déduit que le corps jaune, par la progestérone, est indispensable au maintien de l'endomètre. Ce raisonnement « ablation → effet → conclusion » est attendu en épreuve.",
      },
    ],
    keyPoints: [
      "Le pic de LH déclenche l'ovulation.",
      "L'œstradiol a un rétrocontrôle négatif puis positif.",
      "Le corps jaune sécrète la progestérone qui maintient l'endomètre.",
      "La chute des hormones lutéales déclenche les règles.",
    ],
    pitfalls: [
      "Oublier le rétrocontrôle positif de l'œstradiol.",
      "Confondre le rôle de FSH (croissance folliculaire) et de LH (ovulation).",
      "Placer l'ovulation au début du cycle.",
    ],
    flashcards: [
      {
        question: "Quelle hormone maintient l'endomètre en phase lutéale ?",
        answer: "La progestérone sécrétée par le corps jaune.",
      },
      {
        question: "Quel événement hormonal déclenche l'ovulation ?",
        answer: "Le pic de LH provoqué par le rétrocontrôle positif de l'œstradiol.",
      },
      {
        question: "Que se passe-t-il si la fécondation n'a pas lieu ?",
        answer: "Le corps jaune régresse, les hormones chutent et les règles surviennent.",
      },
    ],
    tags: ["svt", "reproduction", "cycle ovarien", "progestérone", "ovulation"],
  },
  {
    slug: "procreation-maitrise",
    subjectSlug: "svt",
    title: "Procréation et maîtrise de la procréation",
    chapter: "Reproduction · Maîtrise de la procréation",
    summary:
      "Comparer les méthodes contraceptives par leur mode d'action hormonal, et comprendre les techniques d'assistance médicale à la procréation.",
    level: "Bac · 4e Sciences expérimentales (T1)",
    durationMin: 26,
    orderIndex: 32,
    objectives: [
      "Classer les méthodes contraceptives selon leur mode d'action",
      "Expliquer l'effet d'une pilule combinée",
      "Décrire les principales techniques de PMA",
      "Argumenter sur les enjeux éthiques",
    ],
    blocks: [
      {
        type: "table",
        title: "Modes d'action",
        head: ["Méthode", "Mode d'action", "Protection IST"],
        rows: [
          ["Pilule combinée", "rétrocontrôle négatif : bloque le pic de LH", "non"],
          ["Pilule progestative", "épaissit la glaire, modifie l'endomètre", "non"],
          ["Préservatif", "barrière mécanique", "oui"],
          ["DIU au cuivre", "spermicide local, gêne la nidation", "non"],
          ["Contraception d'urgence", "retarde ou bloque l'ovulation", "non"],
          ["Vasectomie / ligature", "obstruction des voies génitales", "non"],
        ],
      },
      {
        type: "steps",
        title: "Les techniques de PMA",
        items: [
          "Stimulation ovarienne par hormones pour obtenir plusieurs follicules.",
          "Recueil des ovocytes par ponction folliculaire.",
          "Fécondation in vitro (FIV) puis culture des embryons.",
          "Transfert d'embryon(s) dans l'utérus.",
          "En cas d'infertilité masculine sévère : ICSI (injection d'un spermatozoïde dans l'ovocyte).",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Une précision qui compte",
        text: "La pilule n'est pas abortive : elle empêche l'ovulation, elle n'expulse pas un embryon. En revanche, le DIU au cuivre peut gêner la nidation — c'est la distinction que les sujets de bac demandent souvent de préciser.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Répondre à une question d'éthique",
        text: "Sur la PMA ou le diagnostic prénatal, structure ta réponse : le fait biologique, le bénéfice attendu, la limite ou le risque, puis ta position argumentée. Une réponse nuancée vaut mieux qu'un jugement tranché sans argument.",
      },
    ],
    keyPoints: [
      "Les contraceptifs hormonaux agissent sur l'axe hypothalamo-hypophysaire.",
      "Seul le préservatif protège des IST.",
      "La FIV contourne une obstruction ou une infertilité inexpliquée.",
      "L'ICSI répond à une infertilité masculine sévère.",
    ],
    pitfalls: [
      "Affirmer que la pilule est abortive.",
      "Croire que la PMA traite toutes les infertilités de la même façon.",
      "Oublier la protection contre les IST.",
    ],
    flashcards: [
      {
        question: "Comment agit la pilule combinée ?",
        answer: "Par rétrocontrôle négatif, elle inhibe le pic de LH et empêche l'ovulation.",
      },
      {
        question: "Quelle méthode protège des IST ?",
        answer: "Le préservatif, masculin ou féminin.",
      },
      {
        question: "Quelle technique pour une infertilité masculine sévère ?",
        answer: "L'ICSI : injection intracytoplasmique d'un spermatozoïde dans l'ovocyte.",
      },
    ],
    tags: ["svt", "contraception", "PMA", "FIV", "éthique"],
  },
  {
    slug: "brassage-genetique",
    subjectSlug: "svt",
    title: "Le brassage de l'information génétique : méiose et fécondation",
    chapter: "Génétique · Méiose",
    summary:
      "Expliquer le brassage interchromosomique et intrachromosomique de la méiose, et montrer comment la fécondation restaure la diploïdie.",
    level: "Bac · 4e Sciences expérimentales (T1)",
    durationMin: 28,
    orderIndex: 33,
    objectives: [
      "Décrire les phases de la méiose",
      "Distinguer brassage inter- et intrachromosomique",
      "Calculer le nombre de gamètes possibles",
      "Expliquer le rôle de la fécondation",
    ],
    blocks: [
      {
        type: "table",
        title: "Les deux brassages",
        head: ["Brassage", "Quand", "Conséquence"],
        rows: [
          ["Interchromosomique", "anaphase I", "répartition indépendante des paires de chromosomes"],
          ["Intrachromosomique (crossing-over)", "prophase I", "recombinaison entre chromatides homologues"],
          ["Fécondation", "rencontre des gamètes", "rétablit la diploïdie et amplifie la diversité"],
        ],
      },
      {
        type: "steps",
        title: "Décrire la méiose",
        items: [
          "Prophase I : appariement des homologues et crossing-over (échange de segments).",
          "Métaphase I : les paires se placent de part et d'autre du plan équatorial.",
          "Anaphase I : séparation des homologues — c'est le brassage interchromosomique.",
          "Méiose II : séparation des chromatides, comme une mitose sans réplication préalable.",
          "Résultat : quatre cellules haploïdes génétiquement différentes.",
        ],
      },
      {
        type: "table",
        title: "Calculs de diversité",
        head: ["Situation", "Nombre de combinaisons", "Formule"],
        rows: [
          ["n paires de chromosomes", "2ⁿ types de gamètes", "brassage interchromosomique seul"],
          ["crossing-over sur 1 paire", "4 types pour cette paire", "2 chromatides recombinées"],
          ["Fécondation", "2ⁿ × 2ⁿ = 4ⁿ zygotes possibles", "pour n paires"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le raisonnement attendu",
        text: "Quand un énoncé donne des phénotypes de descendants non conformes aux proportions attendues, il faut invoquer un crossing-over : ce sont les gamètes recombinés qui expliquent les phénotypes minoritaires. Les nommer « recombinés » et les opposer aux « parentaux » fait gagner des points.",
      },
    ],
    keyPoints: [
      "La méiose réduit le nombre de chromosomes de moitié.",
      "Le brassage interchromosomique a lieu en anaphase I.",
      "Le crossing-over a lieu en prophase I.",
      "La fécondation rétablit la diploïdie et accroît la diversité.",
    ],
    pitfalls: [
      "Placer le crossing-over en anaphase.",
      "Confondre brassage et mutation.",
      "Oublier que la méiose comporte deux divisions successives.",
    ],
    flashcards: [
      {
        question: "Quand se produit le brassage interchromosomique ?",
        answer: "En anaphase I, lors de la séparation aléatoire des chromosomes homologues.",
      },
      {
        question: "Combien de types de gamètes pour 3 paires de chromosomes ?",
        answer: "2³ = 8, sans tenir compte des crossing-over.",
      },
      {
        question: "Que rétablit la fécondation ?",
        answer: "La diploïdie, en réunissant deux lots haploïdes.",
      },
    ],
    tags: ["svt", "méiose", "brassage", "crossing-over", "fécondation"],
  },
  {
    slug: "phylogenie-parente",
    subjectSlug: "svt",
    title: "Relations de parenté entre les êtres vivants (phylogénie)",
    chapter: "Évolution · Phylogénie",
    summary:
      "Construire et lire un arbre phylogénétique à partir de caractères homologues, et distinguer homologie et analogie.",
    level: "Bac · 4e Sciences expérimentales (T2)",
    durationMin: 26,
    orderIndex: 34,
    objectives: [
      "Distinguer homologie et analogie",
      "Construire une matrice de caractères",
      "Lire un arbre phylogénétique",
      "Dater un nœud de divergence",
    ],
    blocks: [
      {
        type: "table",
        title: "Vocabulaire de la phylogénie",
        head: ["Notion", "Définition", "Exemple"],
        rows: [
          ["Homologie", "même structure d'origine commune", "membres antérieurs des vertébrés"],
          ["Analogie", "même fonction, origine différente", "aile d'insecte et aile d'oiseau"],
          ["Caractère dérivé", "apparu dans le groupe étudié", "plumes chez les oiseaux"],
          ["Nœud", "ancêtre commun hypothétique", "point de divergence"],
          ["Groupe monophylétique", "ancêtre et tous ses descendants", "les mammifères"],
        ],
      },
      {
        type: "steps",
        title: "Lire un arbre",
        items: [
          "Repérer la racine : elle représente l'ancêtre commun à tous les taxons représentés.",
          "Suivre les branches : deux taxons sont d'autant plus proches qu'ils partagent un nœud récent.",
          "Placer les caractères dérivés partagés sur les branches où ils apparaissent.",
          "Ne jamais lire l'arbre de gauche à droite comme une échelle de progrès.",
          "Utiliser l'échelle de temps pour dater les divergences si elle est fournie.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux erreurs classiques",
        text: "1) Lire l'arbre comme une progression vers l'homme : il représente des relations de parenté, pas une hiérarchie de valeur. 2) Confondre homologie et analogie : une ressemblance de fonction ne prouve pas une parenté.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Méthode — placer un caractère",
        text: "Un caractère dérivé partagé par un sous-ensemble de taxons apparaît sur la branche qui mène à ce sous-ensemble. S'il est présent dans deux groupes éloignés, il s'agit d'une convergence (analogie), pas d'une parenté.",
      },
    ],
    keyPoints: [
      "La phylogénie se fonde sur les caractères homologues.",
      "Un nœud = un ancêtre commun hypothétique.",
      "Proximité de parenté = nœud récent partagé.",
      "Analogie = convergence, pas parenté.",
    ],
    pitfalls: [
      "Lire l'arbre comme une échelle de progrès.",
      "Confondre homologie et analogie.",
      "Placer un caractère dérivé au mauvais nœud.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre homologie et analogie ?",
        answer: "L'homologie est une ressemblance d'origine commune, l'analogie une ressemblance de fonction sans parenté proche.",
      },
      {
        question: "Comment mesure-t-on la proximité de deux taxons sur un arbre ?",
        answer: "Par la récence de leur ancêtre commun : plus le nœud partagé est récent, plus ils sont proches.",
      },
      {
        question: "Que représente la racine d'un arbre ?",
        answer: "L'ancêtre commun à tous les taxons représentés dans l'arbre.",
      },
    ],
    tags: ["svt", "phylogénie", "évolution", "homologie", "arbre"],
  },
  {
    slug: "speciation",
    subjectSlug: "svt",
    title: "La spéciation et la diversité du vivant",
    chapter: "Évolution · Spéciation",
    summary:
      "Expliquer comment de nouvelles espèces apparaissent : isolement reproducteur, dérive génétique, sélection naturelle et polyploïdisation.",
    level: "Bac · 4e Sciences expérimentales (T2)",
    durationMin: 25,
    orderIndex: 35,
    objectives: [
      "Définir l'espèce biologique",
      "Distinguer spéciation allopatrique et sympatrique",
      "Expliquer l'isolement reproducteur",
      "Relier diversité génétique et évolution",
    ],
    blocks: [
      {
        type: "table",
        title: "Mécanismes de spéciation",
        head: ["Type", "Contexte", "Exemple"],
        rows: [
          ["Allopatrique", "barrière géographique", "populations séparées par un bras de mer"],
          ["Sympatrique", "même territoire", "polyploïdisation chez les plantes"],
          ["Périphérique", "petite population isolée", "dérive génétique rapide"],
          ["Par hybridation", "croisement de deux espèces", "plants hybrides fertiles"],
        ],
      },
      {
        type: "paragraph",
        title: "L'isolement reproducteur, critère de l'espèce",
        text: "Deux populations appartiennent à la même espèce si elles peuvent se reproduire entre elles et donner une descendance fertile. La spéciation est l'accumulation de différences génétiques (mutations, dérive, sélection) jusqu'à ce que cet échange de gènes devienne impossible : isolement prézygotique (comportemental, écologique) ou postzygotique (stérilité des hybrides).",
      },
      {
        type: "list",
        title: "Les moteurs de la divergence",
        items: [
          "Mutations : source de nouvelle variabilité génétique.",
          "Dérive génétique : fluctuation aléatoire des allèles, forte dans les petites populations.",
          "Sélection naturelle : avantage reproductif des variants adaptés au milieu.",
          "Flux de gènes : migration entre populations, qui au contraire homogénéise.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Un piège de vocabulaire",
        text: "Une espèce n'est pas définie par une ressemblance physique mais par l'isolement reproducteur. Deux populations qui se ressemblent peuvent être deux espèces distinctes ; à l'inverse, des races d'une même espèce peuvent différer fortement.",
      },
    ],
    keyPoints: [
      "Espèce = populations interfécondes donnant une descendance fertile.",
      "L'isolement géographique est le moteur le plus fréquent.",
      "La dérive génétique est forte dans les petites populations.",
      "La sélection naturelle ne crée pas la variabilité, elle la trie.",
    ],
    pitfalls: [
      "Définir l'espèce par la seule ressemblance.",
      "Confondre dérive génétique et sélection naturelle.",
      "Oublier que la sélection trie une variabilité déjà présente.",
    ],
    flashcards: [
      {
        question: "Quel est le critère biologique de l'espèce ?",
        answer: "L'interfécondité : des populations capables de produire une descendance fertile commune.",
      },
      {
        question: "Qu'est-ce que la dérive génétique ?",
        answer: "La variation aléatoire des fréquences alléliques d'une population, surtout sensible si elle est petite.",
      },
      {
        question: "Donne un exemple de spéciation sympatrique.",
        answer: "La polyploïdisation chez les plantes, qui rend les hybrides immédiatement isolés de leurs parents.",
      },
    ],
    tags: ["svt", "spéciation", "évolution", "dérive génétique", "isolement"],
  },
  {
    slug: "tissu-nerveux-message",
    subjectSlug: "svt",
    title: "Le tissu nerveux et le message nerveux",
    chapter: "Système nerveux · Tissu nerveux",
    summary:
      "Décrire le neurone, le potentiel de repos et le potentiel d'action, et expliquer la propagation du message nerveux.",
    level: "Bac · 4e Sciences expérimentales (T2)",
    durationMin: 26,
    orderIndex: 36,
    objectives: [
      "Décrire la structure du neurone",
      "Expliquer le potentiel de repos",
      "Décrire les phases du potentiel d'action",
      "Expliquer la propagation et la vitesse du message",
    ],
    blocks: [
      {
        type: "table",
        title: "Le potentiel d'action en quatre temps",
        head: ["Phase", "Mécanisme", "Effet sur la membrane"],
        rows: [
          ["Dépolarisation", "ouverture des canaux Na⁺", "entrée de Na⁺, inversion locale"],
          ["Repolarisation", "inactivation Na⁺, ouverture K⁺", "sortie de K⁺"],
          ["Hyperpolarisation", "canaux K⁺ lents", "potentiel sous le repos"],
          ["Retour au repos", "pompe Na⁺/K⁺", "rétablissement des gradients"],
        ],
      },
      {
        type: "paragraph",
        title: "Tout ou rien, mais fréquence variable",
        text: "Le potentiel d'action a toujours la même amplitude : il existe ou n'existe pas. L'intensité du stimulus n'est donc pas codée par l'amplitude mais par la fréquence des potentiels d'action (codage en fréquence). Autre conséquence : pendant la période réfractaire, aucun nouveau potentiel n'est possible, ce qui limite la fréquence maximale et assure la propagation dans un seul sens.",
      },
      {
        type: "steps",
        title: "Expliquer la propagation",
        items: [
          "Le potentiel d'action local dépolarise la zone voisine de la membrane.",
          "Cette zone atteint son seuil et déclenche un nouveau potentiel d'action.",
          "Le message se propage ainsi de proche en proche, sans atténuation.",
          "Sur une fibre myélinisée, la propagation est saltatoire (de nœud en nœud).",
          "Conséquence : la vitesse augmente avec le diamètre de la fibre et la présence de myéline.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Relier structure et vitesse",
        text: "Une fibre de gros diamètre et myélinisée conduit plus vite (jusqu'à 100 m/s) qu'une fibre fine non myélinisée (moins d'1 m/s). C'est une question de révision très fréquente, avec l'exemple de la sclérose en plaques : la perte de myéline ralentit la conduction.",
      },
    ],
    keyPoints: [
      "Le potentiel de repos résulte de la pompe Na⁺/K⁺ et de la perméabilité sélective.",
      "Le potentiel d'action obéit à la loi du tout ou rien.",
      "L'intensité est codée par la fréquence des potentiels d'action.",
      "La myéline accélère la conduction (propagation saltatoire).",
    ],
    pitfalls: [
      "Croire que l'amplitude code l'intensité du stimulus.",
      "Oublier la période réfractaire.",
      "Confondre potentiel de repos et potentiel d'action.",
    ],
    flashcards: [
      {
        question: "Que se passe-t-il pendant la dépolarisation ?",
        answer: "Les canaux Na⁺ s'ouvrent, le sodium entre et la membrane se dépolarise.",
      },
      {
        question: "Comment l'intensité du stimulus est-elle codée ?",
        answer: "Par la fréquence des potentiels d'action, non par leur amplitude.",
      },
      {
        question: "Pourquoi la myéline accélère-t-elle la conduction ?",
        answer: "Parce qu'elle impose une propagation saltatoire de nœud de Ranvier en nœud de Ranvier.",
      },
    ],
    tags: ["svt", "neurone", "potentiel d'action", "myéline", "message nerveux"],
  },
  {
    slug: "reflexe-myotatique-arc",
    subjectSlug: "svt",
    title: "Le réflexe myotatique et l'arc réflexe",
    chapter: "Système nerveux · Motricité réflexe",
    summary:
      "Analyser l'arc réflexe du réflexe rotulien : récepteur, voie sensitive, centre, voie motrice, muscle effecteur et synapse.",
    level: "Bac · 4e Sciences expérimentales (T3)",
    durationMin: 27,
    orderIndex: 37,
    objectives: [
      "Identifier les cinq composantes de l'arc réflexe",
      "Expliquer le rôle du fuseau neuromusculaire",
      "Interpréter des expériences de section",
      "Distinguer réflexe et mouvement volontaire",
    ],
    blocks: [
      {
        type: "table",
        title: "Les cinq composantes",
        head: ["Composante", "Nature", "Exemple (réflexe rotulien)"],
        rows: [
          ["Récepteur", "fuseau neuromusculaire", "muscle quadriceps"],
          ["Voie sensitive", "neurone sensitif, ganglion spinal", "racine postérieure"],
          ["Centre nerveux", "moelle épinière (synapse)", "L2–L4"],
          ["Voie motrice", "motoneurone", "racine antérieure"],
          ["Effecteur", "muscle", "contraction du quadriceps"],
        ],
      },
      {
        type: "steps",
        title: "Interpréter une expérience",
        items: [
          "Section de la racine postérieure : plus aucune réponse ⇒ la voie sensitive est indispensable.",
          "Section de la racine antérieure : plus de contraction ⇒ la voie motrice est indispensable.",
          "Section du nerf sensitif en aval du ganglion : plus de réponse également.",
          "Stimulation directe du motoneurone : contraction, même sans stimulus périphérique.",
          "Conclusion : le circuit est orienté du récepteur vers l'effecteur, sans détour par le cerveau.",
        ],
      },
      {
        type: "paragraph",
        title: "Réflexe versus mouvement volontaire",
        text: "Le réflexe est stéréotypé, involontaire et rapide : il ne passe pas par le cortex, ce qui explique sa latence courte. Le mouvement volontaire, lui, part du cortex moteur, descend par la moelle et peut être modulé par le contrôle inhibiteur du réflexe. Cette modulation est ce qui permet, par exemple, de marcher sans déclencher de contraction réflexe à chaque pas.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne pas dire « le cerveau commande le réflexe »",
        text: "Le centre du réflexe myotatique est la moelle épinière. Le cerveau peut moduler le réflexe (facilitation ou inhibition), mais il n'en est pas le centre : la rapidité de la réponse (quelques dizaines de millisecondes) en est la preuve.",
      },
    ],
    keyPoints: [
      "Le centre du réflexe rotulien est médullaire.",
      "La voie sensitive entre par la racine postérieure.",
      "Le réflexe est involontaire, stéréotypé et rapide.",
      "Le cerveau module le réflexe sans en être le centre.",
    ],
    pitfalls: [
      "Placer le centre du réflexe dans le cerveau.",
      "Inverser les racines.",
      "Confondre fuseau neuromusculaire et organe tendineux de Golgi.",
    ],
    flashcards: [
      {
        question: "Quel est le récepteur du réflexe myotatique ?",
        answer: "Le fuseau neuromusculaire, sensible à l'étirement du muscle.",
      },
      {
        question: "Que provoque une section de la racine antérieure ?",
        answer: "La disparition de la contraction : le message moteur ne parvient plus au muscle.",
      },
      {
        question: "Pourquoi le réflexe est-il plus rapide qu'un mouvement volontaire ?",
        answer: "Parce que son circuit ne passe pas par le cortex, mais par la moelle épinière.",
      },
    ],
    tags: ["svt", "réflexe", "arc réflexe", "moelle épinière", "motoneurone"],
  },
  {
    slug: "muscle-contraction",
    subjectSlug: "svt",
    title: "Le muscle squelettique et la contraction",
    chapter: "Système nerveux · Muscle",
    summary:
      "Décrire l'organisation du muscle et du sarcomère, expliquer le couplage excitation-contraction et le rôle du calcium et de l'ATP.",
    level: "Bac · 4e Sciences expérimentales (T3)",
    durationMin: 26,
    orderIndex: 38,
    objectives: [
      "Décrire l'organisation du sarcomère",
      "Expliquer le rôle du calcium et de l'ATP",
      "Décrire la transmission neuromusculaire",
      "Interpréter une expérience de fatigue ou de curarisation",
    ],
    blocks: [
      {
        type: "table",
        title: "Les niveaux d'organisation",
        head: ["Niveau", "Structure", "Rôle"],
        rows: [
          ["Muscle", "faisceaux de fibres", "organe effecteur"],
          ["Fibre musculaire", "cellule plurinucléée", "unité cellulaire"],
          ["Myofibrille", "succession de sarcomères", "unité fonctionnelle"],
          ["Sarcomère", "actine + myosine entre deux stries Z", "raccourcissement"],
        ],
      },
      {
        type: "steps",
        title: "Le couplage excitation-contraction",
        items: [
          "Le motoneurone libère de l'acétylcholine dans la plaque motrice.",
          "La fibre se dépolarise et le potentiel d'action se propage au sarcolemme.",
          "Le réticulum sarcoplasmique libère des ions Ca²⁺.",
          "Le calcium lève l'inhibition sur l'actine : les têtes de myosine s'accrochent.",
          "En présence d'ATP, les filaments glissent : le sarcomère raccourcit.",
          "Le calcium est recapté, l'acétylcholine dégradée : le muscle se relâche.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Deux expériences à savoir expliquer",
        text: "Curare : bloque les récepteurs à l'acétylcholine → pas de contraction, alors que la stimulation directe du muscle fonctionne. Absence d'ATP (rigor mortis) : les têtes de myosine ne se détachent plus → muscle rigide. Ces deux observations prouvent le rôle du neuromédiateur et de l'ATP.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le raccourcissement ne vient pas des filaments",
        text: "Les filaments d'actine et de myosine ne raccourcissent pas : ils glissent les uns sur les autres, ce qui réduit la longueur du sarcomère. Dire que « les filaments se contractent » est une erreur de vocabulaire sanctionnée.",
      },
    ],
    keyPoints: [
      "Le sarcomère est l'unité fonctionnelle du muscle.",
      "Le calcium lève l'inhibition et permet l'interaction actine-myosine.",
      "L'ATP est nécessaire au cycle des têtes de myosine.",
      "Les filaments glissent, ils ne se raccourcissent pas.",
    ],
    pitfalls: [
      "Dire que les filaments se contractent.",
      "Oublier le rôle du calcium.",
      "Confondre plaque motrice et synapse neuronale.",
    ],
    flashcards: [
      {
        question: "Quel ion déclenche la contraction ?",
        answer: "L'ion calcium Ca²⁺ libéré par le réticulum sarcoplasmique.",
      },
      {
        question: "Quel est le rôle de l'ATP dans la contraction ?",
        answer: "Permettre le cycle d'attachement et de détachement des têtes de myosine.",
      },
      {
        question: "Que fait le curare ?",
        answer: "Il bloque les récepteurs à l'acétylcholine, empêchant la transmission neuromusculaire donc la contraction.",
      },
    ],
    tags: ["svt", "muscle", "contraction", "calcium", "ATP"],
  },
  {
    slug: "pression-arterielle",
    subjectSlug: "svt",
    title: "La régulation de la pression artérielle",
    chapter: "Physiologie · Régulation cardiovasculaire",
    summary:
      "Comprendre les facteurs de la pression artérielle et les mécanismes de régulation à court terme (baroréflexe) et à moyen terme (système rénine-angiotensine).",
    level: "Bac · 4e Sciences expérimentales (T3)",
    durationMin: 27,
    orderIndex: 39,
    objectives: [
      "Relier pression artérielle, débit cardiaque et résistances",
      "Décrire le baroréflexe",
      "Expliquer le système rénine-angiotensine-aldostérone",
      "Interpréter des données expérimentales",
    ],
    blocks: [
      {
        type: "table",
        title: "Les paramètres de la pression artérielle",
        head: ["Paramètre", "Effet sur la PA", "Régulation"],
        rows: [
          ["Débit cardiaque (fréquence × volume)", "augmente la PA", "système nerveux autonome"],
          ["Résistances périphériques", "augmentent la PA", "vasoconstriction / vasodilatation"],
          ["Volume sanguin", "augmente la PA", "reins, aldostérone, ADH"],
          ["Élasticité artérielle", "amortit les variations", "vieillissement, athérosclérose"],
        ],
      },
      {
        type: "steps",
        title: "Le baroréflexe en quatre temps",
        items: [
          "Les barorécepteurs (sinus carotidien, crosse aortique) détectent la pression.",
          "Le message sensitif gagne le bulbe rachidien.",
          "Le centre bulbaire ajuste l'activité sympathique et parasympathique.",
          "Effets : modification de la fréquence cardiaque et des résistances vasculaires.",
          "Résultat : la pression revient vers sa valeur de consigne.",
        ],
      },
      {
        type: "paragraph",
        title: "Le système rénine-angiotensine-aldostérone",
        text: "Une baisse de la pression rénale déclenche la sécrétion de rénine par les reins. La rénine active l'angiotensine II, qui provoque une vasoconstriction et stimule la sécrétion d'aldostérone. L'aldostérone favorise la réabsorption du sodium et donc de l'eau : le volume sanguin augmente et la pression remonte. C'est une régulation plus lente que le baroréflexe, mais durable.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Court terme et long terme",
        text: "Le baroréflexe est immédiat (quelques secondes) et nerveux. Le système rénine-angiotensine est hormonal, plus lent (heures) mais durable. Un sujet de bac demande souvent de comparer les deux : précise toujours le délai et la nature du signal.",
      },
    ],
    keyPoints: [
      "PA ≈ débit cardiaque × résistances périphériques.",
      "Les barorécepteurs sont situés dans le sinus carotidien et la crosse aortique.",
      "Le centre intégrateur est bulbaire.",
      "L'aldostérone augmente le volume sanguin en favorisant la rétention de sodium.",
    ],
    pitfalls: [
      "Confondre barorécepteur et chémorécepteur.",
      "Oublier que le rein participe à la régulation de la pression.",
      "Attribuer au baroréflexe une action hormonale.",
    ],
    flashcards: [
      {
        question: "Où sont situés les barorécepteurs ?",
        answer: "Dans le sinus carotidien et la crosse aortique.",
      },
      {
        question: "Quel est l'effet de l'angiotensine II ?",
        answer: "Vasoconstriction et stimulation de l'aldostérone, donc augmentation de la pression artérielle.",
      },
      {
        question: "Quelle est la formule simplifiée de la pression artérielle ?",
        answer: "PA ≈ débit cardiaque × résistances périphériques totales.",
      },
    ],
    tags: ["svt", "pression artérielle", "baroréflexe", "aldostérone", "régulation"],
  },
  {
    slug: "hygiene-systeme-nerveux",
    subjectSlug: "svt",
    title: "Hygiène du système nerveux",
    chapter: "Système nerveux · Santé",
    summary:
      "Identifier les facteurs qui protègent ou agressent le système nerveux : sommeil, substances psychoactives, stress chronique et prévention des accidents.",
    level: "Bac · 4e Sciences expérimentales (T3)",
    durationMin: 22,
    orderIndex: 40,
    objectives: [
      "Expliquer le rôle du sommeil dans la récupération nerveuse",
      "Identifier les effets des substances psychoactives",
      "Expliquer les effets du stress chronique",
      "Adopter des comportements de prévention",
    ],
    blocks: [
      {
        type: "table",
        title: "Facteurs et effets",
        head: ["Facteur", "Effet sur le système nerveux", "Prévention"],
        rows: [
          ["Sommeil insuffisant", "baisse de vigilance, de mémoire et de concentration", "7 à 9 h par nuit, horaires réguliers"],
          ["Alcool", "dépresseur du SNC, désinhibition, troubles moteurs", "éviter, jamais au volant"],
          ["Tabac / nicotine", "dépendance, vasoconstriction", "arrêt, accompagnement"],
          ["Cannabis", "troubles de la mémoire et de la motivation", "prévention, information"],
          ["Stress chronique", "cortisol élevé, troubles du sommeil et de l'humeur", "activité physique, relaxation, soutien"],
          ["Écrans tardifs", "retard d'endormissement, dette de sommeil", "arrêt des écrans avant le coucher"],
        ],
      },
      {
        type: "paragraph",
        title: "Le sommeil, une fonction active",
        text: "Le sommeil n'est pas une simple pause : il comporte des cycles de sommeil lent et paradoxal, indispensables à la consolidation de la mémoire et à la récupération. La privation de sommeil dégrade l'attention et la vitesse de réaction, ce qui explique pourquoi la somnolence au volant est un facteur majeur d'accidents.",
      },
      {
        type: "list",
        title: "Les réflexes de prévention",
        items: [
          "Dormir suffisamment et à horaires réguliers, y compris avant un examen.",
          "Ne jamais conduire après avoir consommé de l'alcool ou du cannabis.",
          "Porter un casque à vélo ou en deux-roues : le cerveau ne se répare pas.",
          "Bouger régulièrement : l'activité physique protège la santé nerveuse.",
          "Consulter en cas de troubles persistants du sommeil ou de l'humeur.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Relier au programme",
        text: "Le stress chronique maintient un taux élevé de cortisol, ce qui perturbe le sommeil et la mémoire — deux fonctions dont dépendent les apprentissages. C'est l'argument qui transforme une réponse de bon sens en réponse scientifique.",
      },
    ],
    keyPoints: [
      "Le sommeil consolide la mémoire et restaure la vigilance.",
      "L'alcool est un dépresseur du système nerveux central.",
      "Le stress chronique a des effets durables sur le sommeil et l'humeur.",
      "La somnolence est une cause majeure d'accidents de la route.",
    ],
    pitfalls: [
      "Présenter le sommeil comme un temps mort.",
      "Minimiser les effets du cannabis sur la mémoire.",
      "Confondre fatigue normale et dette de sommeil chronique.",
    ],
    flashcards: [
      {
        question: "Pourquoi le sommeil est-il indispensable aux apprentissages ?",
        answer: "Parce qu'il consolide la mémoire et restaure l'attention et la vigilance.",
      },
      {
        question: "Quel est l'effet de l'alcool sur le système nerveux ?",
        answer: "Un effet dépresseur : désinhibition, troubles moteurs et de la vigilance.",
      },
      {
        question: "Quelle hormone est associée au stress chronique ?",
        answer: "Le cortisol, dont le taux élevé durable perturbe sommeil et humeur.",
      },
    ],
    tags: ["svt", "santé", "sommeil", "addictions", "prévention"],
  },
  {
    slug: "soi-non-soi",
    subjectSlug: "svt",
    title: "Le soi et le non-soi",
    chapter: "Immunologie · Reconnaissance",
    summary:
      "Comprendre comment l'organisme distingue le soi du non-soi grâce au complexe majeur d'histocompatibilité et aux cellules immunitaires.",
    level: "Bac · 4e Sciences expérimentales (T3)",
    durationMin: 26,
    orderIndex: 41,
    objectives: [
      "Définir le soi et le non-soi",
      "Expliquer le rôle du CMH",
      "Décrire les cellules présentatrices d'antigène",
      "Interpréter une expérience de greffe",
    ],
    blocks: [
      {
        type: "table",
        title: "Les acteurs de la reconnaissance",
        head: ["Acteur", "Rôle", "Marqueur"],
        rows: [
          ["CMH de classe I", "présente le soi à toutes les cellules nucléées", "marqueur du soi"],
          ["CMH de classe II", "présente les antigènes aux lymphocytes T helper", "cellules présentatrices"],
          ["Macrophage / dendritique", "capture et présentation de l'antigène", "CPA"],
          ["Lymphocyte T", "reconnaissance spécifique via son récepteur", "TCR"],
          ["Lymphocyte B", "production d'anticorps spécifiques", "BCR"],
        ],
      },
      {
        type: "steps",
        title: "Reconnaître le non-soi",
        items: [
          "Un antigène pénètre dans l'organisme (virus, bactérie, greffon).",
          "Une cellule présentatrice le capture et le présente sur son CMH II.",
          "Le lymphocyte T helper dont le récepteur est complémentaire est activé.",
          "Il amplifie la réponse : activation des lymphocytes B et des T cytotoxiques.",
          "La réponse devient spécifique de cet antigène et garde une mémoire immunitaire.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "L'expérience de greffe, argument clé",
        text: "Une greffe entre deux individus génétiquement identiques (vrais jumeaux) est acceptée, alors qu'une greffe entre individus non apparentés est rejetée : la reconnaissance du non-soi repose donc sur des marqueurs génétiques, les molécules du CMH. C'est le raisonnement attendu au bac.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux définitions à ne pas mélanger",
        text: "Le soi immunologique est l'ensemble des molécules tolérées par le système immunitaire ; le non-soi est tout ce qui déclenche une réponse. Attention : un antigène du soi peut devenir immunogène dans une maladie auto-immune, ce qui n'invalide pas la définition mais la complique.",
      },
    ],
    keyPoints: [
      "Le CMH est le marqueur moléculaire du soi.",
      "La reconnaissance est spécifique : un récepteur pour un antigène.",
      "Les cellules présentatrices font le lien entre immunité innée et adaptative.",
      "Le rejet de greffe prouve le rôle du CMH.",
    ],
    pitfalls: [
      "Confondre CMH I et CMH II.",
      "Croire que le système immunitaire reconnaît « les microbes » en général.",
      "Oublier la mémoire immunitaire.",
    ],
    flashcards: [
      {
        question: "Quel est le rôle du CMH ?",
        answer: "Présenter des fragments antigéniques et servir de marqueur du soi aux cellules immunitaires.",
      },
      {
        question: "Quelle cellule présente l'antigène aux lymphocytes T helper ?",
        answer: "La cellule présentatrice d'antigène (macrophage, cellule dendritique, lymphocyte B).",
      },
      {
        question: "Pourquoi un greffon est-il rejeté ?",
        answer: "Parce que ses molécules du CMH diffèrent : elles sont reconnues comme non-soi.",
      },
    ],
    tags: ["svt", "immunologie", "CMH", "soi", "antigène"],
  },
  {
    slug: "dysfonctionnements-immunitaires",
    subjectSlug: "svt",
    title: "Dysfonctionnements immunitaires : allergie et SIDA",
    chapter: "Immunologie · Pathologies",
    summary:
      "Analyser deux dysfonctionnements du système immunitaire : l'allergie (réponse excessive) et le SIDA (immunodéficience acquise).",
    level: "Bac · 4e Sciences expérimentales (T3)",
    durationMin: 26,
    orderIndex: 42,
    objectives: [
      "Expliquer le mécanisme de la réaction allergique",
      "Décrire l'action du VIH sur le système immunitaire",
      "Distinguer séropositivité et SIDA",
      "Relier les traitements à leur mode d'action",
    ],
    blocks: [
      {
        type: "table",
        title: "Deux mécanismes opposés",
        head: ["Pathologie", "Mécanisme", "Conséquence"],
        rows: [
          ["Allergie", "réaction excessive à un antigène inoffensif (allergène)", "histamine, inflammation, bronchospasme"],
          ["SIDA", "destruction des lymphocytes T4 par le VIH", "immunodéficience acquise"],
          ["Maladie auto-immune", "réponse contre le soi", "destruction de tissus propres"],
        ],
      },
      {
        type: "steps",
        title: "La réaction allergique",
        items: [
          "Premier contact : sensibilisation, production d'IgE spécifiques.",
          "Les IgE se fixent sur les mastocytes.",
          "Second contact : l'allergène pont les IgE et déclenche la dégranulation.",
          "Libération d'histamine : vasodilatation, œdème, démangeaisons, bronchoconstriction.",
          "Traitement : antihistaminiques en prévention, adrénaline en urgence dans le choc anaphylactique.",
        ],
      },
      {
        type: "steps",
        title: "L'infection par le VIH",
        items: [
          "Le VIH se fixe sur le récepteur CD4 des lymphocytes T helper.",
          "Il s'y multiplie et les détruit progressivement.",
          "Le nombre de T4 chute : l'organisme perd son chef d'orchestre immunitaire.",
          "Des infections opportunistes apparaissent : c'est le stade SIDA.",
          "Les antirétroviraux bloquent la réplication virale sans éliminer le virus intégré.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Séropositif n'est pas malade du SIDA",
        text: "Un séropositif est porteur du VIH ; on parle de SIDA quand l'immunodéficience est installée (T4 effondrés, infections opportunistes). Cette distinction est explicitement attendue dans les sujets de bac.",
      },
    ],
    keyPoints: [
      "L'allergie est une réponse immunitaire excessive, pas un déficit.",
      "Les IgE et les mastocytes sont centraux dans l'allergie.",
      "Le VIH cible les lymphocytes T4 (CD4).",
      "Séropositivité ≠ SIDA : le stade dépend de l'immunodéficience.",
    ],
    pitfalls: [
      "Confondre allergie et immunodéficience.",
      "Dire que le VIH tue toutes les cellules immunitaires.",
      "Confondre séropositivité et maladie déclarée.",
    ],
    flashcards: [
      {
        question: "Quel anticorps intervient dans l'allergie ?",
        answer: "Les IgE, fixées sur les mastocytes, qui libèrent de l'histamine.",
      },
      {
        question: "Quelle cellule le VIH détruit-il ?",
        answer: "Les lymphocytes T helper porteurs du marqueur CD4.",
      },
      {
        question: "Quelle différence entre séropositivité et SIDA ?",
        answer: "La séropositivité est la présence du VIH ; le SIDA est le stade d'immunodéficience avec infections opportunistes.",
      },
    ],
    tags: ["svt", "immunologie", "allergie", "VIH", "SIDA"],
  },
  {
    slug: "memento-svt-experimental",
    subjectSlug: "svt",
    title: "Mémento de SVT expérimentales : schémas et raisonnements",
    chapter: "Révision générale",
    summary:
      "Les schémas fonctionnels à restituer, les raisonnements expérimentaux types et les pièges de vocabulaire de l'épreuve de SVT.",
    level: "Bac · 4e Sciences expérimentales (REV)",
    durationMin: 25,
    orderIndex: 43,
    objectives: [
      "Restituer les grands schémas fonctionnels",
      "Appliquer le raisonnement expérimental",
      "Éviter les confusions de vocabulaire",
      "Gérer le temps de l'épreuve",
    ],
    blocks: [
      {
        type: "table",
        title: "Les schémas à savoir redessiner",
        head: ["Thème", "Schéma attendu", "Points clés"],
        rows: [
          ["Reproduction", "axe hypothalamo-hypophysaire et rétrocontrôles", "sens des flèches et signe du rétrocontrôle"],
          ["Génétique", "méiose et brassage", "placer le crossing-over en prophase I"],
          ["Système nerveux", "arc réflexe", "racine postérieure sensitive, antérieure motrice"],
          ["Muscle", "sarcomère", "stries Z, actine, myosine"],
          ["Immunologie", "réponse à médiation cellulaire et humorale", "T4 au centre de l'amplification"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le raisonnement expérimental en trois lignes",
        text: "« On observe que… ; or si le mécanisme X était responsable, on devrait observer… ; donc… ». Ce triptyque observation / hypothèse / conclusion structure toutes les réponses d'exploitation de documents.",
      },
      {
        type: "list",
        title: "Confusions à bannir définitivement",
        items: [
          "Génotype / phénotype — brassage / mutation — homologie / analogie.",
          "Cellules de Leydig (testostérone) / cellules de Sertoli (spermatogenèse).",
          "Réflexe (moelle) / mouvement volontaire (cortex).",
          "CMH I (toutes les cellules) / CMH II (cellules présentatrices).",
          "Séropositivité / SIDA.",
        ],
      },
    ],
    keyPoints: [
      "Un schéma sans légendes ni flèches orientées ne rapporte presque rien.",
      "Toujours décrire le document avant de l'interpréter.",
      "Le vocabulaire précis vaut des points : Leydig, Sertoli, CMH, T4.",
      "Gérer 3 h : 20 min de lecture, 2 h de rédaction, 40 min de relecture.",
    ],
    pitfalls: [
      "Oublier de légender un schéma.",
      "Répondre sans reprendre les données du document.",
      "Confondre les stades de la réponse immunitaire.",
    ],
    flashcards: [
      {
        question: "Quelles sont les trois étapes d'une exploitation de document ?",
        answer: "Décrire ce que l'on observe, interpréter avec les connaissances, conclure en réponse à la question.",
      },
      {
        question: "Où placer le crossing-over dans un schéma de méiose ?",
        answer: "En prophase I, entre chromatides homologues.",
      },
      {
        question: "Quel schéma est central en immunologie ?",
        answer: "Celui de la coopération cellulaire où le lymphocyte T4 amplifie la réponse humorale et cellulaire.",
      },
    ],
    tags: ["svt", "mémento", "révision", "schémas", "méthode"],
  },
];

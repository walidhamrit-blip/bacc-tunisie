import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Économie générale — programme de la 4ème année Économie & Gestion :
 * croissance et développement, structures productives, emploi, développement
 * durable, mondialisation et politiques économiques.
 */
export const economieLessons: LessonSeed[] = [
  {
    slug: "eco-facteurs-croissance",
    subjectSlug: "economie",
    title: "Les facteurs de croissance : travail, capital et progrès technique",
    chapter: "Croissance · Sources",
    summary:
      "Identifier les sources de la croissance économique et distinguer croissance extensive et intensive à partir d'indicateurs simples.",
    level: "Bac · 4e Économie & Gestion (T1)",
    durationMin: 26,
    orderIndex: 10,
    objectives: [
      "Définir les facteurs de production",
      "Distinguer croissance extensive et intensive",
      "Mesurer la contribution du progrès technique",
      "Relier investissement et croissance",
    ],
    blocks: [
      {
        type: "table",
        title: "Les facteurs et leur contribution",
        head: ["Facteur", "Nature", "Contribution à la croissance"],
        rows: [
          ["Travail", "quantité (population active) et qualité (formation)", "extensive puis intensive"],
          ["Capital", "investissement matériel et immatériel", "accumulation → hausse de la production"],
          ["Progrès technique", "innovation de produit et de procédé", "hausse de la productivité globale"],
          ["Capital humain", "santé, éducation, qualification", "améliore la productivité du travail"],
          ["Institutions", "droit, stabilité, confiance", "condition du développement"],
        ],
      },
      {
        type: "paragraph",
        title: "Croissance extensive ou intensive",
        text: "La croissance est extensive quand elle résulte de l'augmentation de la quantité de facteurs (plus de travailleurs, plus de machines). Elle est intensive quand elle provient de l'efficacité de ces facteurs : c'est la productivité qui augmente, grâce au progrès technique, à la formation ou à l'organisation. Une économie ne peut pas croître indéfiniment de façon extensive : au-delà d'un certain point, seule la productivité permet la croissance.",
      },
      {
        type: "steps",
        title: "Méthode — analyser un cas de croissance",
        items: [
          "Repérer la variation de la production sur la période étudiée.",
          "Repérer la variation des facteurs (emploi, stock de capital).",
          "Si les facteurs augmentent autant que la production : croissance extensive.",
          "Si la production augmente plus vite que les facteurs : croissance intensive (gain de productivité).",
          "Identifier la source du gain : innovation, formation, organisation, ouverture.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Formule à utiliser",
        text: "Productivité du travail = production / nombre de travailleurs (ou heures travaillées). Une croissance de la production de 4 % avec une croissance de l'emploi de 1 % signifie un gain de productivité d'environ 3 % : la croissance est donc majoritairement intensive.",
      },
    ],
    keyPoints: [
      "Travail, capital et progrès technique sont les trois sources de la croissance.",
      "Croissance extensive = plus de facteurs ; intensive = plus de productivité.",
      "Le progrès technique est le moteur de la croissance durable.",
      "Le capital humain est un facteur de productivité.",
    ],
    pitfalls: [
      "Confondre croissance et développement.",
      "Oublier le progrès technique dans l'analyse d'un cas.",
      "Confondre production et productivité.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce que la croissance intensive ?",
        answer: "Une croissance due à l'amélioration de la productivité des facteurs, non à leur augmentation en quantité.",
      },
      {
        question: "Que mesure la productivité du travail ?",
        answer: "La production rapportée au nombre de travailleurs ou au nombre d'heures travaillées.",
      },
      {
        question: "Cite trois sources de la croissance.",
        answer: "L'accumulation du capital, l'augmentation et la qualification du travail, le progrès technique.",
      },
    ],
    tags: ["économie", "croissance", "productivité", "progrès technique", "facteurs"],
  },
  {
    slug: "eco-mesure-croissance",
    subjectSlug: "economie",
    title: "La mesure de la croissance : PIB, IDH et limites",
    chapter: "Croissance · Indicateurs",
    summary:
      "Calculer un taux de croissance, distinguer PIB nominal et réel, et critiquer les indicateurs à partir de leurs angles morts.",
    level: "Bac · 4e Économie & Gestion (T1)",
    durationMin: 26,
    orderIndex: 11,
    objectives: [
      "Calculer un taux de croissance",
      "Distinguer PIB nominal et PIB réel",
      "Utiliser le PIB par habitant et l'IDH",
      "Critiquer les indicateurs de richesse",
    ],
    blocks: [
      {
        type: "table",
        title: "Les indicateurs",
        head: ["Indicateur", "Mesure", "Limite"],
        rows: [
          ["PIB nominal", "production valorisée aux prix courants", "inclut l'inflation"],
          ["PIB réel", "production à prix constants", "mesure la croissance en volume"],
          ["PIB par habitant", "PIB / population", "ignore les inégalités"],
          ["IDH", "PIB/hab + espérance de vie + scolarisation", "ne mesure pas les inégalités internes"],
          ["Taux de croissance", "(PIB₁ − PIB₀)/PIB₀ × 100", "moyenne qui masque les disparités"],
        ],
      },
      {
        type: "paragraph",
        title: "Les angles morts du PIB",
        text: "Le PIB compte les flux monétaires mais ignore le travail domestique, l'économie informelle, et ne dit rien de la répartition ni de la soutenabilité écologique. Pire : il compte positivement la reconstruction après une catastrophe. C'est pourquoi on lui adjoint des indicateurs comme l'IDH, le coefficient de Gini ou l'empreinte écologique.",
      },
      {
        type: "steps",
        title: "Méthode — calculer et interpréter",
        items: [
          "Écrire la formule du taux de croissance et repérer les valeurs.",
          "Vérifier si les valeurs sont en volume (réel) ou en valeur (nominal).",
          "Calculer le taux et l'exprimer en pourcentage.",
          "Rapporter le PIB à la population pour comparer des pays.",
          "Nuancer la conclusion par une limite du PIB.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne jamais comparer un nominal et un réel",
        text: "Si l'inflation est de 6 % et le PIB nominal augmente de 4 %, la croissance réelle est négative. C'est l'erreur de lecture la plus fréquente dans les exercices sur données tunisiennes.",
      },
    ],
    keyPoints: [
      "PIB nominal = prix courants ; PIB réel = prix constants.",
      "Taux de croissance = (PIB₁ − PIB₀)/PIB₀ × 100.",
      "Le PIB/habitant permet la comparaison internationale.",
      "L'IDH combine revenu, santé et éducation.",
    ],
    pitfalls: [
      "Comparer un PIB nominal à un PIB réel.",
      "Confondre PIB et IDH.",
      "Oublier de nuancer par les inégalités.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre PIB nominal et PIB réel ?",
        answer: "Le nominal est valorisé aux prix courants (inflation incluse), le réel à prix constants (en volume).",
      },
      {
        question: "Que mesure l'IDH ?",
        answer: "Le développement humain : revenu par habitant, espérance de vie et niveau d'éducation.",
      },
      {
        question: "Cite deux limites du PIB.",
        answer: "Il ignore les inégalités, le travail domestique, l'informel et les dégâts écologiques.",
      },
    ],
    tags: ["économie", "PIB", "IDH", "croissance", "indicateurs"],
  },
  {
    slug: "eco-secteurs-activite",
    subjectSlug: "economie",
    title: "Les secteurs d'activité et leur évolution",
    chapter: "Structures · Secteurs",
    summary:
      "Analyser les mutations sectorielles de l'économie tunisienne et le processus de tertiarisation.",
    level: "Bac · 4e Économie & Gestion (T2)",
    durationMin: 24,
    orderIndex: 12,
    objectives: [
      "Distinguer les trois secteurs d'activité",
      "Lire une répartition sectorielle",
      "Expliquer la tertiarisation",
      "Relier mutations sectorielles et développement",
    ],
    blocks: [
      {
        type: "table",
        title: "Les trois secteurs",
        head: ["Secteur", "Contenu", "Évolution"],
        rows: [
          ["Primaire", "agriculture, pêche, extraction", "baisse tendancielle de l'emploi"],
          ["Secondaire", "industrie, mines, bâtiment", "stagnation ou baisse en emploi"],
          ["Tertiaire", "commerce, services, tourisme, TIC", "forte progression"],
        ],
      },
      {
        type: "paragraph",
        title: "La tertiarisation",
        text: "La tertiarisation désigne la progression de la part du tertiaire dans l'emploi et la valeur ajoutée. Elle vient de facteurs multiples : hausse des revenus (les ménages consomment plus de services), gains de productivité dans l'industrie qui libèrent de la main-d'œuvre, externalisation des services des entreprises et développement du numérique. En Tunisie, le tourisme, le commerce, les transports et les TIC en sont les fleurons.",
      },
      {
        type: "steps",
        title: "Lire une répartition sectorielle",
        items: [
          "Repérer l'indicateur : emploi, valeur ajoutée ou exportations ?",
          "Comparer les parts des trois secteurs et leur évolution dans le temps.",
          "Identifier le secteur dominant et celui qui recule.",
          "Relier l'évolution aux facteurs économiques (revenus, productivité, ouverture).",
          "Conclure sur le degré de tertiarisation et ses fragilités.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Argument à réutiliser",
        text: "« La part du tertiaire progresse mais sa valeur ajoutée peut stagner si les services créés sont peu productifs. » Cette nuance distingue une bonne copie : tertiarisation n'est pas synonyme automatique de développement.",
      },
    ],
    keyPoints: [
      "Trois secteurs : primaire, secondaire, tertiaire.",
      "La tertiarisation progresse dans les économies en développement.",
      "Elle s'explique par la demande et par les gains de productivité.",
      "Tertiarisation ne signifie pas automatiquement plus de valeur ajoutée.",
    ],
    pitfalls: [
      "Confondre emploi et valeur ajoutée dans la lecture.",
      "Croire que le tertiaire est toujours plus productif.",
      "Oublier la spécificité du tourisme tunisien.",
    ],
    flashcards: [
      {
        question: "Quels secteurs composent l'économie ?",
        answer: "Primaire (agriculture, extraction), secondaire (industrie, BTP), tertiaire (services).",
      },
      {
        question: "Qu'est-ce que la tertiarisation ?",
        answer: "La progression de la part du secteur tertiaire dans l'emploi et la valeur ajoutée.",
      },
      {
        question: "Cite deux causes de la tertiarisation.",
        answer: "La hausse des revenus qui accroît la demande de services, et les gains de productivité industriels qui libèrent de la main-d'œuvre.",
      },
    ],
    tags: ["économie", "secteurs", "tertiaire", "Tunisie", "structures"],
  },
  {
    slug: "eco-concentration-concurrence",
    subjectSlug: "economie",
    title: "Concentration, concurrence et mutations des entreprises",
    chapter: "Structures · Entreprises",
    summary:
      "Analyser les formes de concentration, les structures de marché et les mutations des entreprises tunisiennes.",
    level: "Bac · 4e Économie & Gestion (T2)",
    durationMin: 26,
    orderIndex: 13,
    objectives: [
      "Distinguer les formes de concentration",
      "Identifier les structures de marché",
      "Expliquer les effets sur la concurrence",
      "Analyser les mutations des entreprises tunisiennes",
    ],
    blocks: [
      {
        type: "table",
        title: "Les structures de marché",
        head: ["Structure", "Nombre d'offreurs", "Prix"],
        rows: [
          ["Concurrence parfaite", "très grand nombre", "donné par le marché"],
          ["Monopole", "un seul", "fixé par le monopoleur"],
          ["Oligopole", "quelques-uns", "dépend de leur interaction"],
          ["Concurrence monopolistique", "nombreux, produits différenciés", "marge liée à la différenciation"],
        ],
      },
      {
        type: "paragraph",
        title: "Concentration : pourquoi et comment",
        text: "La concentration désigne le regroupement des entreprises. Elle peut être horizontale (même stade de production), verticale (stades successifs) ou conglomérale (activités différentes). Ses motifs : réaliser des économies d'échelle, accéder à de nouveaux marchés, mutualiser la recherche, ou gagner un pouvoir de marché. Son risque : affaiblir la concurrence et réduire le bien-être du consommateur — d'où l'existence des autorités de la concurrence.",
      },
      {
        type: "steps",
        title: "Analyser un cas de concentration",
        items: [
          "Identifier le type de concentration (horizontale, verticale, conglomérale).",
          "Repérer les motifs : échelle, marché, technologie, financement.",
          "Évaluer les effets sur la concurrence et sur les prix.",
          "Vérifier l'existence d'un contrôle par l'autorité de la concurrence.",
          "Conclure : efficacité économique ou risque de position dominante ?",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Économies d'échelle ≠ toujours baisse de prix",
        text: "Les économies d'échelle réduisent le coût unitaire, mais une entreprise en position dominante peut conserver la marge au lieu de baisser les prix. Distinguer le bénéfice potentiel de son effectif est exactement ce que le correcteur attend.",
      },
    ],
    keyPoints: [
      "Concentration horizontale, verticale, conglomérale.",
      "Les économies d'échelle sont le motif principal.",
      "Oligopole et monopole réduisent la pression concurrentielle.",
      "L'autorité de la concurrence veille au maintien de la concurrence.",
    ],
    pitfalls: [
      "Confondre concentration verticale et conglomérale.",
      "Affirmer automatiquement que la concentration fait baisser les prix.",
      "Oublier de citer le droit de la concurrence.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'une concentration verticale ?",
        answer: "Le regroupement d'entreprises situées à des stades différents d'une même filière.",
      },
      {
        question: "Qu'est-ce qu'un oligopole ?",
        answer: "Un marché où quelques offreurs se partagent la production et s'influencent mutuellement.",
      },
      {
        question: "Pourquoi une économie d'échelle ne garantit-elle pas une baisse de prix ?",
        answer: "Parce qu'en l'absence de concurrence, l'entreprise peut conserver la marge au lieu de la répercuter.",
      },
    ],
    tags: ["économie", "concentration", "concurrence", "oligopole", "entreprises"],
  },
  {
    slug: "eco-emploi-chomage",
    subjectSlug: "economie",
    title: "Emploi, chômage et mutations du marché du travail",
    chapter: "Marché du travail",
    summary:
      "Mesurer le chômage, en analyser les causes et comprendre les mutations du marché du travail tunisien.",
    level: "Bac · 4e Économie & Gestion (T2)",
    durationMin: 27,
    orderIndex: 14,
    objectives: [
      "Calculer un taux de chômage",
      "Distinguer les types de chômage",
      "Analyser les causes du chômage",
      "Comprendre les mutations du travail",
    ],
    blocks: [
      {
        type: "table",
        title: "Les types de chômage",
        head: ["Type", "Cause", "Remède"],
        rows: [
          ["Frictionnel", "temps de recherche entre deux emplois", "information, intermédiation"],
          ["Structurel", "inadéquation formation / emploi", "formation, orientation"],
          ["Conjoncturel", "insuffisance de la demande", "politique de relance"],
          ["Technologique", "automatisation", "reconversion, qualification"],
          ["Saisonnier", "variations d'activité", "pluriactivité, planning"],
        ],
      },
      {
        type: "table",
        title: "Les indicateurs",
        head: ["Indicateur", "Formule", "Attention"],
        rows: [
          ["Taux de chômage", "chômeurs / population active × 100", "les inactifs ne comptent pas"],
          ["Taux d'activité", "actifs / population en âge de travailler", "mesure la participation"],
          ["Taux d'emploi", "emplois / population en âge de travailler", "différent du taux d'activité"],
          ["Sous-emploi", "temps partiel subi, bas revenus", "souvent sous-estimé"],
        ],
      },
      {
        type: "paragraph",
        title: "Le cas tunisien",
        text: "Le chômage tunisien est marqué par deux traits : il touche particulièrement les jeunes diplômés et les femmes, et il est très inégal selon les régions. Les causes sont à la fois structurelles (inadéquation entre formation et besoins des entreprises, faible diversification industrielle) et conjoncturelles (croissance insuffisante pour absorber les arrivées sur le marché du travail). Le secteur informel complique la lecture des statistiques.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Lecture d'un taux",
        text: "Un taux de chômage élevé chez les diplômés n'implique pas un manque d'emplois en général : il peut signaler une inadéquation entre les qualifications offertes et demandées. Formuler la réponse ainsi vaut toujours mieux qu'une explication par « la crise » seule.",
      },
    ],
    keyPoints: [
      "Taux de chômage = chômeurs / actifs × 100.",
      "Les inactifs ne sont pas des chômeurs.",
      "Chômage structurel = inadéquation des qualifications.",
      "En Tunisie, le chômage frappe surtout les jeunes diplômés.",
    ],
    pitfalls: [
      "Diviser par la population totale au lieu de la population active.",
      "Confondre inactif et chômeur.",
      "Réduire les causes du chômage à la seule conjoncture.",
    ],
    flashcards: [
      {
        question: "Quelle est la formule du taux de chômage ?",
        answer: "Nombre de chômeurs / population active × 100.",
      },
      {
        question: "Qu'est-ce que le chômage structurel ?",
        answer: "Un chômage dû à une inadéquation durable entre les qualifications disponibles et les emplois offerts.",
      },
      {
        question: "Pourquoi un diplômé peut-il être chômeur malgré des offres ?",
        answer: "Parce que sa qualification ne correspond pas aux besoins, ou qu'il se trouve dans une région sans emploi correspondant.",
      },
    ],
    tags: ["économie", "emploi", "chômage", "marché du travail", "Tunisie"],
  },
  {
    slug: "eco-developpement-durable",
    subjectSlug: "economie",
    title: "Les trois piliers du développement durable",
    chapter: "Développement durable · Principes",
    summary:
      "Articuler les dimensions économique, sociale et environnementale du développement durable et les appliquer à des politiques concrètes.",
    level: "Bac · 4e Économie & Gestion (T2)",
    durationMin: 25,
    orderIndex: 15,
    objectives: [
      "Définir le développement durable",
      "Identifier les trois piliers",
      "Analyser un projet au regard des trois piliers",
      "Comprendre les objectifs de développement durable",
    ],
    blocks: [
      {
        type: "table",
        title: "Les trois piliers",
        head: ["Pilier", "Objectif", "Indicateurs"],
        rows: [
          ["Économique", "croissance et efficacité", "PIB, valeur ajoutée, compétitivité"],
          ["Social", "équité et cohésion", "emploi, IDH, Gini, pauvreté"],
          ["Environnemental", "préservation des ressources", "émissions, eau, énergie, déchets"],
        ],
      },
      {
        type: "paragraph",
        title: "Un équilibre, pas une addition",
        text: "Le développement durable ne consiste pas à ajouter une préoccupation verte à la croissance : il suppose que les trois dimensions soient compatibles. Un projet qui crée des emplois mais épuise la ressource en eau n'est pas durable, même s'il est rentable à court terme. Le rapport Brundtland le définit comme un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à répondre aux leurs.",
      },
      {
        type: "steps",
        title: "Analyser un projet durable",
        items: [
          "Décrire le projet et ses effets directs.",
          "Classer les effets dans les trois piliers.",
          "Repérer les tensions entre piliers (emploi contre environnement, par exemple).",
          "Proposer une mesure d'atténuation ou une compensation.",
          "Conclure sur la durabilité du projet, conditions à l'appui.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne pas confondre croissance et développement",
        text: "La croissance est une augmentation quantitative de la production ; le développement est une transformation qualitative des structures et des conditions de vie. Un pays peut connaître la croissance sans développement, et c'est précisément ce que le concept de développement durable cherche à dépasser.",
      },
    ],
    keyPoints: [
      "Trois piliers : économique, social, environnemental.",
      "Développement durable = satisfaire les besoins sans compromettre l'avenir.",
      "Les piliers peuvent entrer en tension.",
      "Croissance ≠ développement.",
    ],
    pitfalls: [
      "Réduire le développement durable à l'écologie.",
      "Confondre croissance et développement.",
      "Oublier la dimension sociale dans l'analyse.",
    ],
    flashcards: [
      {
        question: "Quels sont les trois piliers du développement durable ?",
        answer: "Économique, social et environnemental.",
      },
      {
        question: "Quelle est la définition du rapport Brundtland ?",
        answer: "Un développement qui répond aux besoins du présent sans compromettre la capacité des générations futures à satisfaire les leurs.",
      },
      {
        question: "Donne un exemple de tension entre deux piliers.",
        answer: "Un projet industriel créateur d'emplois (social) mais polluant (environnemental).",
      },
    ],
    tags: ["économie", "développement durable", "environnement", "social", "piliers"],
  },
  {
    slug: "eco-environnement-ressources",
    subjectSlug: "economie",
    title: "Environnement, ressources et croissance soutenable",
    chapter: "Développement durable · Ressources",
    summary:
      "Analyser la relation entre croissance et pression environnementale, et les instruments économiques de la transition écologique.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 26,
    orderIndex: 16,
    objectives: [
      "Distinguer ressources renouvelables et non renouvelables",
      "Expliquer les externalités négatives",
      "Utiliser les instruments économiques de régulation",
      "Analyser la situation hydrique tunisienne",
    ],
    blocks: [
      {
        type: "table",
        title: "Instruments de politique environnementale",
        head: ["Instrument", "Principe", "Avantage"],
        rows: [
          ["Taxe (pollueur-payeur)", "faire payer la pollution", "incite à réduire, rapporte des recettes"],
          ["Marché de quotas", "plafonner les émissions et échanger", "efficacité allocative"],
          ["Normes", "fixer des seuils", "simple, contrôlable"],
          ["Subventions vertes", "aider la transition", "acceptabilité sociale"],
          ["Éducation et labels", "changer les comportements", "faible coût"],
        ],
      },
      {
        type: "paragraph",
        title: "Externalités et défaillance du marché",
        text: "Une externalité négative est un effet d'une activité sur un tiers sans compensation par le marché : la pollution en est l'exemple typique. Le prix du bien ne reflète pas le coût social, donc la production est excessive. L'intervention publique (taxe, norme, marché de quotas) vise à intégrer ce coût dans le prix : c'est le principe pollueur-payeur.",
      },
      {
        type: "list",
        title: "Le cas tunisien",
        items: [
          "Stress hydrique : ressources par habitant parmi les plus faibles de la Méditerranée.",
          "Dépendance énergétique croissante et développement du solaire et de l'éolien.",
          "Gestion des déchets et économie circulaire encore peu développées.",
          "Littoral menacé par l'érosion et la pression urbaine.",
          "Potentiel important en énergies renouvelables (ensoleillement, vent).",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le raisonnement à réutiliser",
        text: "« Une ressource gratuite est surexploitée parce que son prix est nul. Instaurer un prix ou une taxe envoie un signal de rareté et oriente les comportements. » Cette chaîne d'arguments s'applique à l'eau, à l'énergie comme aux déchets.",
      },
    ],
    keyPoints: [
      "Externalité négative = coût supporté par un tiers.",
      "Le principe pollueur-payeur internalise ce coût.",
      "Taxe, norme, quotas et subventions sont les instruments principaux.",
      "La Tunisie est en situation de stress hydrique.",
    ],
    pitfalls: [
      "Confondre externalité et coût de production interne.",
      "Croire que la norme est toujours plus efficace que la taxe.",
      "Oublier les énergies renouvelables dans le cas tunisien.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'une externalité négative ?",
        answer: "Un effet préjudiciable d'une activité sur un tiers, non pris en compte par le marché.",
      },
      {
        question: "Quel est le principe de la taxe environnementale ?",
        answer: "Le principe pollueur-payeur : intégrer le coût de la pollution dans le prix payé.",
      },
      {
        question: "Quel est le principal défi environnemental tunisien ?",
        answer: "Le stress hydrique, avec des ressources en eau par habitant très faibles.",
      },
    ],
    tags: ["économie", "environnement", "externalités", "énergie", "eau"],
  },
  {
    slug: "eco-mondialisation",
    subjectSlug: "economie",
    title: "La mondialisation : acteurs, flux et firmes multinationales",
    chapter: "Économie internationale · Mondialisation",
    summary:
      "Analyser les dimensions de la mondialisation, le rôle des firmes multinationales et les avantages et risques pour les pays émergents.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 27,
    orderIndex: 17,
    objectives: [
      "Définir la mondialisation et ses dimensions",
      "Expliquer le rôle des firmes multinationales",
      "Analyser les flux commerciaux et financiers",
      "Évaluer les avantages et les risques pour la Tunisie",
    ],
    blocks: [
      {
        type: "table",
        title: "Les dimensions de la mondialisation",
        head: ["Dimension", "Contenu", "Indicateur"],
        rows: [
          ["Commerciale", "échanges de biens et services", "taux d'ouverture"],
          ["Financière", "capitaux, IDE, marchés", "flux d'IDE"],
          ["Productive", "délocalisation, chaînes de valeur", "part des FMN"],
          ["Technologique", "diffusion des innovations", "dépenses de R&D"],
          ["Culturelle", "circulation de l'information", "flux numériques"],
        ],
      },
      {
        type: "paragraph",
        title: "La firme multinationale, acteur central",
        text: "Une firme multinationale possède des unités de production dans plusieurs pays. Elle organise une chaîne de valeur mondiale : conception, production, assemblage et distribution sont répartis là où les coûts et les compétences sont les plus favorables. Pour un pays d'accueil, elle apporte du capital, de la technologie et des emplois, mais elle peut aussi fragiliser la balance des paiements (rapatriement des profits) et maintenir des activités à faible valeur ajoutée.",
      },
      {
        type: "steps",
        title: "Analyser un document sur la mondialisation",
        items: [
          "Identifier la nature du document et ses sources.",
          "Repérer les flux (biens, capitaux, personnes) et leur évolution.",
          "Identifier les acteurs : États, FMN, institutions internationales.",
          "Analyser la position du pays dans la division internationale du travail.",
          "Conclure sur les opportunités et les vulnérabilités.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Nuancer le jugement",
        text: "La mondialisation n'est ni bonne ni mauvaise en soi : elle profite aux pays capables de monter en gamme et expose les autres à la concurrence. Dans une copie, toujours opposer un avantage et une limite pour la même dimension.",
      },
    ],
    keyPoints: [
      "La mondialisation est multiforme : commerciale, financière, productive.",
      "Les FMN organisent les chaînes de valeur mondiales.",
      "Elle apporte capitaux et technologies mais crée des dépendances.",
      "Le taux d'ouverture est un indicateur clé.",
    ],
    pitfalls: [
      "Réduire la mondialisation au commerce.",
      "Oublier le rôle des États et des institutions.",
      "Ne présenter qu'un seul côté du bilan.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'une firme multinationale ?",
        answer: "Une entreprise qui possède des unités de production ou de service dans plusieurs pays.",
      },
      {
        question: "Quelles sont les principales dimensions de la mondialisation ?",
        answer: "Commerciale, financière, productive, technologique et culturelle.",
      },
      {
        question: "Quel risque la mondialisation fait-elle peser sur un pays d'accueil ?",
        answer: "Une dépendance à des activités à faible valeur ajoutée et une vulnérabilité aux décisions des firmes étrangères.",
      },
    ],
    tags: ["économie", "mondialisation", "FMN", "IDE", "chaînes de valeur"],
  },
  {
    slug: "eco-commerce-exterieur",
    subjectSlug: "economie",
    title: "Le commerce international et les échanges extérieurs de la Tunisie",
    chapter: "Économie internationale · Échanges",
    summary:
      "Interpréter la balance commerciale, analyser les avantages comparatifs et évaluer la structure des échanges tunisiens.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 27,
    orderIndex: 18,
    objectives: [
      "Calculer le solde commercial",
      "Expliquer les avantages comparatifs",
      "Analyser la structure des échanges tunisiens",
      "Comprendre les effets d'une dépréciation",
    ],
    blocks: [
      {
        type: "table",
        title: "Les soldes à interpréter",
        head: ["Solde", "Calcul", "Signification"],
        rows: [
          ["Solde commercial", "exportations − importations", "positif = excédent"],
          ["Taux de couverture", "exportations/importations × 100", "> 100 % = excédent"],
          ["Solde courant", "biens + services + revenus + transferts", "mesure la position extérieure"],
          ["Balance commerciale déficitaire", "importations > exportations", "besoin de financement"],
        ],
      },
      {
        type: "paragraph",
        title: "Avantages comparatifs et spécialisation",
        text: "Un pays a intérêt à se spécialiser dans les productions pour lesquelles son coût relatif est le plus faible, même s'il est moins productif dans l'absolu : c'est la théorie des avantages comparatifs. En pratique, la structure des échanges tunisiens repose sur le textile, les pièces automobiles et électriques, l'agroalimentaire et le tourisme, tandis que les importations portent sur l'énergie, les biens d'équipement et les produits alimentaires de base.",
      },
      {
        type: "steps", 
        title: "Analyser une balance commerciale",
        items: [
          "Repérer la période et l'unité (millions de dinars, de dollars).",
          "Calculer le solde et le taux de couverture.",
          "Identifier les principaux produits exportés et importés.",
          "Identifier les principaux partenaires (Union européenne, Maghreb).",
          "Conclure sur la vulnérabilité : dépendance énergétique, concentration des marchés.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Dépréciation et balance commerciale",
        text: "Une dépréciation du dinar rend les exportations plus compétitives et les importations plus chères : elle peut améliorer le solde, mais peut aussi renchérir les intrants importés et alimenter l'inflation. Cet arbitrage est l'argument qui distingue une réponse complète.",
      },
    ],
    keyPoints: [
      "Solde commercial = exportations − importations.",
      "Taux de couverture = exportations/importations × 100.",
      "Les avantages comparatifs justifient la spécialisation.",
      "La Tunisie dépend fortement des importations d'énergie.",
    ],
    pitfalls: [
      "Confondre solde commercial et solde courant.",
      "Oublier le taux de couverture dans l'analyse.",
      "Conclure que la dépréciation est toujours favorable.",
    ],
    flashcards: [
      {
        question: "Comment calcule-t-on le taux de couverture ?",
        answer: "Exportations / importations × 100.",
      },
      {
        question: "Qu'est-ce qu'un avantage comparatif ?",
        answer: "Un coût relatif plus faible dans une production, qui justifie la spécialisation.",
      },
      {
        question: "Pourquoi la Tunisie a-t-elle un déficit commercial structurel ?",
        answer: "Notamment à cause de la dépendance énergétique et de la faiblesse des exportations à forte valeur ajoutée.",
      },
    ],
    tags: ["économie", "commerce international", "balance commerciale", "Tunisie", "spécialisation"],
  },
  {
    slug: "eco-integration-regionale",
    subjectSlug: "economie",
    title: "Intégration régionale et accords de libre-échange",
    chapter: "Économie internationale · Intégration",
    summary:
      "Distinguer les niveaux d'intégration régionale et évaluer les effets de l'accord d'association avec l'Union européenne.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 25,
    orderIndex: 19,
    objectives: [
      "Classer les degrés d'intégration",
      "Expliquer l'accord d'association Tunisie–UE",
      "Analyser les effets d'une zone de libre-échange",
      "Comprendre le rôle de l'UMA",
    ],
    blocks: [
      {
        type: "table",
        title: "Les degrés d'intégration",
        head: ["Degré", "Contenu", "Exemple"],
        rows: [
          ["Zone de libre-échange", "suppression des droits de douane", "ALE Tunisie–UE (1995)"],
          ["Union douanière", "+ tarif extérieur commun", "Union européenne"],
          ["Marché commun", "+ libre circulation des facteurs", "UE"],
          ["Union économique", "+ harmonisation des politiques", "UE avancée"],
          ["Intégration politique", "institutions communes", "fédération"],
        ],
      },
      {
        type: "paragraph",
        title: "L'accord d'association de 1995",
        text: "L'accord d'association signé en 1995 et entré en vigueur en 1998 prévoit le démantèlement progressif des droits de douane sur les produits industriels entre la Tunisie et l'Union européenne. Il a stimulé les exportations tunisiennes vers l'UE, principal partenaire commercial, mais a aussi exposé l'industrie locale à la concurrence et accentué la dépendance vis-à-vis d'un seul marché. Le projet de zone de libre-échange complète (ALECA) prolonge cette logique et suscite des débats sur l'agriculture et les services.",
      },
      {
        type: "list",
        title: "Effets à analyser",
        items: [
          "Création de commerce : les échanges entre partenaires augmentent.",
          "Détournement de commerce : les importations se réorientent vers le partenaire.",
          "Gains pour le consommateur : baisse des prix, plus grande variété.",
          "Coûts d'ajustement : fermetures d'entreprises non compétitives, chômage sectoriel.",
          "Effet d'agglomération : concentration des activités près des marchés.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Intégration Nord–Sud et Sud–Sud",
        text: "L'intégration avec l'UE est profonde mais asymétrique (grand partenaire, petit partenaire). L'Union du Maghreb arabe (UMA) reste très en retard à cause des blocages politiques : le commerce intra-maghrébin est inférieur à 5 % des échanges. Cette comparaison est fréquemment demandée.",
      },
    ],
    keyPoints: [
      "Zone de libre-échange : suppression des droits de douane.",
      "L'accord de 1995 a fait de l'UE le premier partenaire de la Tunisie.",
      "Création et détournement de commerce sont les deux effets à analyser.",
      "L'intégration maghrébine reste très faible.",
    ],
    pitfalls: [
      "Confondre zone de libre-échange et union douanière.",
      "Négliger les coûts d'ajustement.",
      "Oublier l'asymétrie des partenaires.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre zone de libre-échange et union douanière ?",
        answer: "L'union douanière ajoute un tarif extérieur commun appliqué aux pays tiers.",
      },
      {
        question: "Qu'est-ce que la création de commerce ?",
        answer: "L'augmentation des échanges entre partenaires due à la suppression des barrières.",
      },
      {
        question: "Pourquoi l'intégration maghrébine est-elle faible ?",
        answer: "À cause des blocages politiques et des frontières fermées, qui limitent le commerce intra-régional.",
      },
    ],
    tags: ["économie", "intégration", "libre-échange", "UE", "UMA"],
  },
  {
    slug: "eco-role-etat",
    subjectSlug: "economie",
    title: "Le rôle de l'État dans l'économie",
    chapter: "Politiques économiques · État",
    summary:
      "Identifier les fonctions économiques de l'État et les instruments de ses politiques budgétaire et monétaire.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 26,
    orderIndex: 20,
    objectives: [
      "Énoncer les fonctions de l'État",
      "Distinguer politique budgétaire et monétaire",
      "Comprendre les effets d'une relance",
      "Analyser les limites de l'intervention publique",
    ],
    blocks: [
      {
        type: "table",
        title: "Les fonctions de l'État",
        head: ["Fonction", "Contenu", "Exemple"],
        rows: [
          ["Allocation", "produire des biens non assurés par le marché", "défense, éclairage public"],
          ["Redistribution", "corriger les inégalités", "impôts, transferts sociaux"],
          ["Régulation", "stabiliser la conjoncture", "politique budgétaire et monétaire"],
          ["Réglementation", "édicter les règles", "droit de la concurrence"],
        ],
      },
      {
        type: "paragraph",
        title: "Deux politiques, deux outils",
        text: "La politique budgétaire agit par les dépenses publiques et les impôts ; la politique monétaire agit par le taux directeur et la liquidité, via la banque centrale. En période de ralentissement, une relance budgétaire soutient la demande, tandis qu'une politique monétaire accommodante facilite le crédit. Mais ces politiques ont des limites : déficit budgétaire, endettement, inflation et délais d'action.",
      },
      {
        type: "steps",
        title: "Analyser une politique économique",
        items: [
          "Identifier l'objectif visé (croissance, emploi, inflation, équilibre extérieur).",
          "Identifier l'instrument utilisé (budgétaire ou monétaire).",
          "Décrire le mécanisme de transmission (demande, crédit, change).",
          "Évaluer les effets attendus à court et moyen terme.",
          "Repérer les limites et effets pervers.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le multiplicateur, sans excès de formalisme",
        text: "Une hausse des dépenses publiques augmente la demande, qui accroît la production et les revenus, qui accroît à nouveau la demande : c'est l'effet multiplicateur. Il est plus faible dans une économie très ouverte, parce qu'une partie de la demande se porte sur des produits importés.",
      },
    ],
    keyPoints: [
      "L'État alloue, redistribue, régule et réglemente.",
      "La politique budgétaire utilise dépenses et impôts.",
      "La politique monétaire utilise le taux et la liquidité.",
      "Toute relance a des limites : déficit, inflation, délais.",
    ],
    pitfalls: [
      "Confondre politique budgétaire et monétaire.",
      "Oublier les délais d'action.",
      "Ignorer l'effet des importations sur le multiplicateur.",
    ],
    flashcards: [
      {
        question: "Quelles sont les fonctions économiques de l'État ?",
        answer: "Allocation, redistribution, régulation et réglementation.",
      },
      {
        question: "Quels sont les instruments de la politique budgétaire ?",
        answer: "Les dépenses publiques et les prélèvements obligatoires (impôts, cotisations).",
      },
      {
        question: "Pourquoi le multiplicateur est-il plus faible dans une économie ouverte ?",
        answer: "Parce qu'une partie de la demande supplémentaire se porte sur des importations.",
      },
    ],
    tags: ["économie", "État", "politique budgétaire", "redistribution", "régulation"],
  },
  {
    slug: "eco-politique-monetaire",
    subjectSlug: "economie",
    title: "Politique monétaire, inflation et rôle de la BCT",
    chapter: "Politiques économiques · Monnaie",
    summary:
      "Comprendre la création monétaire, mesurer l'inflation et analyser les décisions de la Banque centrale de Tunisie.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 26,
    orderIndex: 21,
    objectives: [
      "Définir les fonctions de la monnaie",
      "Expliquer la création monétaire",
      "Mesurer l'inflation",
      "Analyser une décision de taux directeur",
    ],
    blocks: [
      {
        type: "table",
        title: "Monnaie et inflation",
        head: ["Notion", "Définition", "Remarque"],
        rows: [
          ["Fonctions de la monnaie", "unité de compte, intermédiaire des échanges, réserve de valeur", "les trois sont indissociables"],
          ["Masse monétaire", "M1, M2, M3", "agrégats croissants"],
          ["Inflation", "hausse durable du niveau général des prix", "mesurée par l'IPC"],
          ["Taux directeur", "taux de la BCT", "instrument principal"],
          ["Taux de change", "prix d'une devise", "dépréciation / appréciation"],
        ],
      },
      {
        type: "paragraph",
        title: "Le rôle de la Banque centrale",
        text: "La BCT a pour mission la stabilité des prix, la solidité du système bancaire et le bon fonctionnement du système de paiement. Elle agit sur le taux directeur : le relever renchérit le crédit, freine la demande et modère l'inflation ; le baisser soutient l'activité. Ces décisions comportent un arbitrage : lutter contre l'inflation peut ralentir la croissance et alourdir le service de la dette.",
      },
      {
        type: "steps",
        title: "Analyser une décision monétaire",
        items: [
          "Repérer la décision (hausse, baisse ou statu quo du taux directeur).",
          "Identifier le motif : inflation, croissance, change, stabilité financière.",
          "Décrire le mécanisme : coût du crédit, demande, investissement.",
          "Anticiper les effets sur l'inflation et sur l'activité.",
          "Signaler l'arbitrage et les effets indésirables.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Inflation par la demande, par les coûts",
        text: "Une inflation par la demande vient d'un excès de dépenses ; une inflation par les coûts vient de la hausse des intrants (énergie, matières premières). Le remède n'est pas le même : politique monétaire restrictive dans le premier cas, politique d'offre dans le second. Distinguer les deux est souvent l'objet de la question de synthèse.",
      },
    ],
    keyPoints: [
      "La monnaie a trois fonctions : unité de compte, échange, réserve de valeur.",
      "L'inflation se mesure par l'indice des prix à la consommation.",
      "Le taux directeur est l'instrument principal de la BCT.",
      "Toute politique monétaire implique un arbitrage croissance / inflation.",
    ],
    pitfalls: [
      "Confondre inflation par la demande et par les coûts.",
      "Oublier les effets sur le service de la dette.",
      "Penser que la BCT est un organe du gouvernement.",
    ],
    flashcards: [
      {
        question: "Quelles sont les trois fonctions de la monnaie ?",
        answer: "Unité de compte, intermédiaire des échanges et réserve de valeur.",
      },
      {
        question: "Quel est l'effet d'une hausse du taux directeur ?",
        answer: "Le crédit devient plus cher, la demande ralentit et l'inflation est modérée.",
      },
      {
        question: "Comment mesure-t-on l'inflation ?",
        answer: "Par la variation de l'indice des prix à la consommation sur une période.",
      },
    ],
    tags: ["économie", "monnaie", "inflation", "BCT", "taux directeur"],
  },
  {
    slug: "eco-politique-budgetaire",
    subjectSlug: "economie",
    title: "Politique budgétaire et finances publiques",
    chapter: "Politiques économiques · Budget",
    summary:
      "Lire un budget de l'État, calculer le déficit et la dette, et analyser les effets d'une politique de rigueur ou de relance.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 26,
    orderIndex: 22,
    objectives: [
      "Distinguer recettes et dépenses de l'État",
      "Calculer un solde budgétaire",
      "Comprendre la dynamique de la dette",
      "Comparer relance et rigueur",
    ],
    blocks: [
      {
        type: "table",
        title: "Le budget de l'État",
        head: ["Poste", "Contenu", "Nature"],
        rows: [
          ["Recettes fiscales", "TVA, impôt sur le revenu, impôt sur les sociétés", "principale ressource"],
          ["Recettes non fiscales", "redevances, dividendes", "secondaire"],
          ["Dépenses de fonctionnement", "salaires, subventions, intérêts", "rigides"],
          ["Dépenses d'investissement", "infrastructures, équipements", "soutenables"],
          ["Solde budgétaire", "recettes − dépenses", "déficit ou excédent"],
          ["Dette publique", "cumul des déficits", "rapportée au PIB"],
        ],
      },
      {
        type: "paragraph",
        title: "Rigueur ou relance",
        text: "La relance augmente les dépenses pour soutenir la demande, au prix d'un déficit plus élevé. La rigueur réduit les dépenses pour assainir les finances publiques, au risque de freiner l'activité. L'arbitrage dépend de la situation : en récession, la relance peut être justifiée ; quand la dette devient insoutenable, la consolidation s'impose. Le critère décisif est le coût du financement et la crédibilité de la trajectoire budgétaire.",
      },
      {
        type: "steps",
        title: "Lire un tableau de finances publiques",
        items: [
          "Repérer les unités (millions ou milliards de dinars, % du PIB).",
          "Calculer le solde : recettes − dépenses.",
          "Calculer le déficit en pourcentage du PIB.",
          "Identifier les postes rigides (salaires, intérêts de la dette).",
          "Évaluer la soutenabilité : niveau et coût de la dette.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le cas tunisien en une phrase",
        text: "La Tunisie a longtemps combiné masse salariale publique élevée, subventions coûteuses et dette en hausse : la consolidation budgétaire y passe par la maîtrise des dépenses de fonctionnement et la relance de l'investissement productif.",
      },
    ],
    keyPoints: [
      "Recettes fiscales = TVA + IR + IS principalement.",
      "Solde budgétaire = recettes − dépenses.",
      "La dette est le cumul des déficits rapportés au PIB.",
      "Relance et rigueur répondent à des situations différentes.",
    ],
    pitfalls: [
      "Confondre déficit et dette.",
      "Oublier les intérêts de la dette dans les dépenses.",
      "Croire que toute hausse d'impôt résorbe le déficit.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre déficit et dette ?",
        answer: "Le déficit est un flux annuel, la dette est le cumul des déficits passés.",
      },
      {
        question: "Quelle est la principale ressource fiscale de l'État tunisien ?",
        answer: "La TVA, suivie de l'impôt sur le revenu et de l'impôt sur les sociétés.",
      },
      {
        question: "Quand la rigueur budgétaire est-elle justifiée ?",
        answer: "Lorsque le déficit et la dette deviennent insoutenables et que leur financement est coûteux.",
      },
    ],
    tags: ["économie", "budget", "déficit", "dette", "finances publiques"],
  },
  {
    slug: "memento-economie",
    subjectSlug: "economie",
    title: "Mémento d'économie : notions, formules et repères",
    chapter: "Révision générale",
    summary:
      "Les définitions, formules et mécanismes du programme d'économie, avec les repères tunisiens à citer en copie.",
    level: "Bac · 4e Économie & Gestion (REV)",
    durationMin: 26,
    orderIndex: 23,
    objectives: [
      "Restituer les définitions clés",
      "Retenir les formules de calcul",
      "Citer des repères tunisiens exacts",
      "Structurer une réponse économétrique",
    ],
    blocks: [
      {
        type: "table",
        title: "Formules à connaître",
        head: ["Notion", "Formule"],
        rows: [
          ["Taux de croissance", "(PIB₁ − PIB₀)/PIB₀ × 100"],
          ["PIB par habitant", "PIB / population"],
          ["Taux de chômage", "chômeurs / actifs × 100"],
          ["Taux d'activité", "actifs / population en âge de travailler"],
          ["Solde commercial", "exportations − importations"],
          ["Taux de couverture", "exportations / importations × 100"],
          ["Productivité du travail", "production / effectif"],
        ],
      },
      {
        type: "list",
        title: "Repères tunisiens utiles",
        items: [
          "L'UE est le premier partenaire commercial, avec plus de la moitié des échanges.",
          "La Tunisie est en situation de stress hydrique (moins de 500 m³/habitant/an).",
          "Le tourisme et le textile sont des secteurs historiques d'exportation.",
          "L'économie est dominée par les PME et un secteur informel important.",
          "La dette publique dépasse 80 % du PIB depuis 2020.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Structure d'une bonne synthèse",
        text: "Introduction (définir les termes), développement en deux ou trois parties (mécanismes, effets, limites), conclusion nuancée. Utilise les documents : chaque affirmation doit pouvoir être rattachée à une donnée ou à un mécanisme nommé.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les erreurs qui coûtent",
        text: "Confondre croissance et développement, déficit et dette, nominal et réel, actif et inactif. Et citer des chiffres approximatifs sans source : mieux vaut un ordre de grandeur exact qu'une précision inventée.",
      },
    ],
    keyPoints: [
      "Distinguer flux et stock (déficit/dette).",
      "Distinguer volume et valeur (réel/nominal).",
      "Utiliser les formules plutôt que des impressions.",
      "Toujours nuancer par une limite.",
    ],
    pitfalls: [
      "Confondre les agrégats monétaires.",
      "Citer des données non vérifiées.",
      "Oublier de définir les termes du sujet.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre actif et inactif ?",
        answer: "L'actif est en emploi ou en recherche d'emploi ; l'inactif n'est ni l'un ni l'autre.",
      },
      {
        question: "Comment calcule-t-on la productivité du travail ?",
        answer: "Production (ou valeur ajoutée) divisée par l'effectif ou les heures travaillées.",
      },
      {
        question: "Que signifie un taux de couverture de 80 % ?",
        answer: "Que les exportations couvrent 80 % des importations : la balance commerciale est déficitaire.",
      },
    ],
    tags: ["économie", "mémento", "révision", "formules", "Tunisie"],
  },
];

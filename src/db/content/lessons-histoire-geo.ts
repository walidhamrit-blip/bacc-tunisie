import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Histoire-géographie — programme de la 4ème année (Économie & Gestion et
 * Lettres) : histoire de la Tunisie contemporaine, conflits mondiaux,
 * mondialisation, espaces productifs, Maghreb et méthodes de la discipline.
 */
export const histoireGeoLessons: LessonSeed[] = [
  {
    slug: "hg-economie-coloniale-tunisie",
    subjectSlug: "histoire-geographie",
    title: "L'économie et la société tunisiennes sous le protectorat",
    chapter: "Histoire · Protectorat",
    summary:
      "Analyser les transformations économiques et sociales de la Tunisie entre 1881 et 1956 : mise en valeur, inégalités et naissance du mouvement national.",
    level: "Bac · Économie & Gestion / Lettres (T1)",
    durationMin: 27,
    orderIndex: 10,
    objectives: [
      "Décrire les structures économiques coloniales",
      "Analyser les transformations sociales",
      "Relier les inégalités à la naissance du mouvement national",
      "Exploiter des documents statistiques",
    ],
    blocks: [
      {
        type: "table",
        title: "Les transformations coloniales",
        head: ["Domaine", "Transformation", "Conséquence"],
        rows: [
          ["Agriculture", "colonisation des terres, cultures commerciales", "prolétarisation paysanne"],
          ["Infrastructures", "ports, routes, chemin de fer", "intégration à l'économie française"],
          ["Mines et industrie", "extraction de phosphates et minerais", "économie extravertie"],
          ["Finances", "banque et monnaie rattachées à la France", "dépendance financière"],
          ["Éducation", "école pour une minorité", "élite restreinte, inégalités"],
        ],
      },
      {
        type: "paragraph",
        title: "Une économie duale",
        text: "Le protectorat a modernisé les infrastructures mais orienté l'économie vers l'exportation de matières premières et l'importation de produits manufacturés. Le résultat est une économie duale : un secteur moderne, souvent contrôlé par les colons, et un secteur traditionnel appauvri. Cette inégalité structurelle nourrit les revendications nationales, du Destour au Néo-Destour.",
      },
      {
        type: "steps",
        title: "Analyser un document d'histoire économique",
        items: [
          "Identifier la nature et la source du document.",
          "Repérer la période et l'unité des données.",
          "Décrire l'évolution : croissance, stagnation, régression.",
          "Expliquer par un mécanisme économique ou politique.",
          "Relier au contexte général du protectorat.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le lien économie / politique",
        text: "Les revendications nationales ne sont pas seulement politiques : elles portent sur la terre, l'emploi, l'éducation et l'égalité devant l'administration. Montrer ce lien est ce qui distingue une copie d'histoire économique d'un simple récit d'événements.",
      },
    ],
    keyPoints: [
      "L'économie coloniale est extravertie et duale.",
      "Les infrastructures servent l'exportation, pas le marché intérieur.",
      "Les inégalités sociales nourrissent le mouvement national.",
      "Toute analyse doit relier données et mécanismes.",
    ],
    pitfalls: [
      "Décrire les événements sans les expliquer.",
      "Oublier la dimension sociale.",
      "Confondre protectorat (1881) et indépendance (1956).",
    ],
    flashcards: [
      {
        question: "Quelles sont les dates du protectorat français en Tunisie ?",
        answer: "1881 (traité du Bardo) à 1956 (indépendance).",
      },
      {
        question: "Qu'appelle-t-on une économie duale ?",
        answer: "Une économie partagée entre un secteur moderne tourné vers l'exportation et un secteur traditionnel appauvri.",
      },
      {
        question: "Quel lien entre économie coloniale et mouvement national ?",
        answer: "Les inégalités d'accès à la terre, à l'emploi et à l'éducation ont nourri les revendications nationales.",
      },
    ],
    tags: ["histoire", "protectorat", "Tunisie", "économie coloniale", "société"],
  },
  {
    slug: "hg-tunisie-1956",
    subjectSlug: "histoire-geographie",
    title: "La Tunisie depuis 1956 : construction de l'État et développement",
    chapter: "Histoire · Tunisie indépendante",
    summary:
      "Analyser les choix de développement de la Tunisie indépendante : planification, éducation, ouverture et mutations sociales.",
    level: "Bac · Économie & Gestion / Lettres (T2)",
    durationMin: 28,
    orderIndex: 11,
    objectives: [
      "Décrire les étapes de la construction de l'État",
      "Analyser les choix économiques successifs",
      "Mesurer les acquis sociaux",
      "Repérer les limites du modèle",
    ],
    blocks: [
      {
        type: "table",
        title: "Les grandes étapes",
        head: ["Période", "Orientations", "Résultats"],
        rows: [
          ["1956–1961", "édification de l'État, code du statut personnel", "souveraineté, droits des femmes"],
          ["1962–1969", "planification, coopératives, industrialisation", "infrastructures, mais crise agricole"],
          ["1970–1986", "libéralisation, ouverture aux IDE, tourisme", "croissance, dette extérieure"],
          ["1987–2010", "ajustement structurel, privatisations", "compétitivité, mais chômage des diplômés"],
          ["2011–aujourd'hui", "transition démocratique", "libertés, mais instabilité économique"],
        ],
      },
      {
        type: "paragraph",
        title: "Un modèle fondé sur l'éducation et l'ouverture",
        text: "La Tunisie a misé très tôt sur l'école et la santé publiques, ce qui a produit un capital humain remarquable pour la région, et sur l'ouverture aux investissements étrangers, notamment dans le textile et le tourisme. Ce modèle a créé de la croissance et une classe moyenne, mais il est resté dépendant de l'Europe, peu diversifié et incapable d'absorber les diplômés : c'est la tension centrale des années 2000.",
      },
      {
        type: "steps",
        title: "Étudier une politique de développement",
        items: [
          "Identifier la période et le contexte international.",
          "Repérer les instruments : plan, code d'investissement, privatisation.",
          "Mesurer les résultats par des indicateurs (croissance, emploi, IDH).",
          "Repérer les limites et les effets sociaux.",
          "Relier les limites aux tensions politiques ultérieures.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Éviter deux excès",
        text: "Ni l'hagiographie (tout est réussi) ni la dénonciation sans preuve. L'épreuve attend une analyse équilibrée : des acquis réels (éducation, santé, infrastructures) et des limites structurelles (chômage, disparités régionales, dette).",
      },
    ],
    keyPoints: [
      "1956 : indépendance et construction de l'État moderne.",
      "L'éducation et la santé ont été les piliers du modèle.",
      "L'ouverture a apporté croissance et dépendance.",
      "Les disparités régionales persistent.",
    ],
    pitfalls: [
      "Confondre les périodes et leurs orientations.",
      "Oublier les disparités régionales.",
      "Juger sans données.",
    ],
    flashcards: [
      {
        question: "Quel texte fondateur a réformé le statut personnel en 1956 ?",
        answer: "Le Code du statut personnel, promulgué en août 1956.",
      },
      {
        question: "Quels ont été les deux piliers du modèle tunisien ?",
        answer: "L'éducation et la santé publiques, avec l'ouverture aux investissements étrangers.",
      },
      {
        question: "Quelle limite majeure du modèle s'est révélée dans les années 2000 ?",
        answer: "L'incapacité à absorber les diplômés et les fortes disparités régionales.",
      },
    ],
    tags: ["histoire", "Tunisie", "développement", "indépendance", "planification"],
  },
  {
    slug: "hg-tunisie-aujourdhui",
    subjectSlug: "histoire-geographie",
    title: "La Tunisie aujourd'hui : population, villes et activités",
    chapter: "Géographie · Tunisie",
    summary:
      "Analyser la répartition de la population tunisienne, l'armature urbaine et l'organisation du territoire.",
    level: "Bac · Économie & Gestion / Lettres (T2)",
    durationMin: 27,
    orderIndex: 12,
    objectives: [
      "Décrire la répartition de la population",
      "Analyser l'armature urbaine",
      "Expliquer les contrastes régionaux",
      "Comprendre les enjeux d'aménagement",
    ],
    blocks: [
      {
        type: "table",
        title: "Les contrastes du territoire",
        head: ["Espace", "Caractéristiques", "Activités"],
        rows: [
          ["Littoral nord-est", "densité élevée, urbanisation", "services, industrie, tourisme"],
          ["Littoral oriental (Sahel)", "oliveraies, villes moyennes", "agriculture, textile, tourisme"],
          ["Intérieur nord-ouest", "relief, faible densité", "agriculture, forêt"],
          ["Centre-ouest", "steppes, élevage", "élevage, artisanat, mines"],
          ["Sud", "très faible densité", "tourisme saharien, pétrole, dattes"],
        ],
      },
      {
        type: "paragraph",
        title: "Un territoire littoralisé",
        text: "Plus des deux tiers de la population et l'essentiel de l'activité économique se concentrent sur le littoral oriental, entre Tunis et Sfax. Cette littoralisation résulte de la concentration des investissements, des infrastructures portuaires et des services. Elle s'accompagne d'un dépeuplement relatif de l'intérieur, source de disparités régionales persistantes et d'un fort exode vers les grandes villes.",
      },
      {
        type: "steps",
        title: "Analyser une carte de population",
        items: [
          "Repérer les zones de forte et de faible densité.",
          "Identifier les facteurs : relief, climat, littoral, emploi.",
          "Repérer les grandes villes et les axes de communication.",
          "Mesurer les contrastes entre littoral et intérieur.",
          "Conclure sur les enjeux d'aménagement du territoire.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Vocabulaire de géographie",
        text: "Densité (hab/km²), littoralisation, métropolisation, armature urbaine, exode rural, aménagement du territoire, zone de développement régional. Utiliser ces termes précis fait gagner des points en analyse de documents.",
      },
    ],
    keyPoints: [
      "Les deux tiers de la population sont sur le littoral.",
      "Tunis et Sfax dominent l'armature urbaine.",
      "L'intérieur souffre d'un déficit d'emploi et d'infrastructures.",
      "L'aménagement du territoire vise à rééquilibrer ces contrastes.",
    ],
    pitfalls: [
      "Confondre densité et population totale.",
      "Oublier les facteurs naturels.",
      "Négliger les disparités internes.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce que la littoralisation ?",
        answer: "La concentration de la population et des activités sur les zones côtières.",
      },
      {
        question: "Quelles sont les deux principales agglomérations tunisiennes ?",
        answer: "Grand Tunis et Sfax.",
      },
      {
        question: "Quelles sont les causes des disparités régionales ?",
        answer: "La concentration des investissements et des infrastructures sur le littoral, l'emploi et les services.",
      },
    ],
    tags: ["géographie", "Tunisie", "population", "littoral", "aménagement"],
  },
  {
    slug: "hg-guerres-mondiales",
    subjectSlug: "histoire-geographie",
    title: "Les grands conflits mondiaux et la construction de la paix",
    chapter: "Histoire · Conflits mondiaux",
    summary:
      "Analyser les deux guerres mondiales, leurs conséquences et les institutions de la paix, avec le rôle des peuples colonisés.",
    level: "Bac · Économie & Gestion / Lettres (T1)",
    durationMin: 28,
    orderIndex: 13,
    objectives: [
      "Identifier les causes des deux guerres",
      "Analyser leurs conséquences",
      "Comprendre les institutions de la paix",
      "Mesurer l'impact sur les colonies",
    ],
    blocks: [
      {
        type: "table",
        title: "Comparaison des deux conflits",
        head: ["Critère", "1914–1918", "1939–1945"],
        rows: [
          ["Causes", "alliances, nationalismes, Balkans", "totalitarismes, expansionnisme nazi"],
          ["Caractère", "guerre de position", "guerre totale, mobilisation industrielle"],
          ["Morts", "environ 10 millions", "50 à 60 millions"],
          ["Conséquence pour la Tunisie", "enrôlement, revendications nationales", "occupation, puis décolonisation"],
        ],
      },
      {
        type: "paragraph",
        title: "De la paix manquée à la paix institutionnelle",
        text: "Le traité de Versailles (1919) imposé à l'Allemagne a nourri un ressentiment exploité par les régimes totalitaires. Après 1945, les vainqueurs tirent la leçon : création de l'ONU, de la Déclaration universelle des droits de l'homme (1948) et d'un système de sécurité collective. Ces institutions n'empêchent pas la guerre froide, mais elles changent durablement la légitimité internationale.",
      },
      {
        type: "list",
        title: "Les conséquences à analyser",
        items: [
          "Démographiques : hécatombe, déséquilibres de population active.",
          "Économiques : reconstruction, plan Marshall, États-Unis première puissance.",
          "Politiques : déclin de l'Europe, bipolarisation, ONU.",
          "Coloniales : affaiblissement des empires et revendications d'indépendance.",
          "Morales : invention du crime contre l'humanité, droits de l'homme.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ne pas oublier la Tunisie",
        text: "Les deux guerres ont concerné la Tunisie : enrôlement de soldats en 1914-1918, combats sur le sol tunisien en 1942-1943. Le lien entre guerre et décolonisation est un axe d'analyse explicitement attendu dans le programme tunisien.",
      },
    ],
    keyPoints: [
      "1919 a préparé 1939 par une paix punitive.",
      "1945 a créé l'ONU et le droit international des droits de l'homme.",
      "Les guerres ont accéléré la décolonisation.",
      "La Tunisie a été concernée par les deux conflits.",
    ],
    pitfalls: [
      "Confondre causes profondes et prétexte immédiat.",
      "Oublier les conséquences coloniales.",
      "Décrire sans analyser.",
    ],
    flashcards: [
      {
        question: "Quelle est la conséquence politique majeure de 1945 ?",
        answer: "La création de l'ONU et l'instauration d'un système de sécurité collective.",
      },
      {
        question: "Pourquoi le traité de Versailles est-il critiqué ?",
        answer: "Parce que son caractère punitif a nourri le ressentiment exploité par les régimes totalitaires.",
      },
      {
        question: "Quel effet les guerres ont-elles eu sur les colonies ?",
        answer: "Elles ont affaibli les empires coloniaux et accéléré les revendications d'indépendance.",
      },
    ],
    tags: ["histoire", "guerres mondiales", "ONU", "décolonisation", "paix"],
  },
  {
    slug: "hg-mondialisation-effets",
    subjectSlug: "histoire-geographie",
    title: "La mondialisation et ses effets",
    chapter: "Géographie · Mondialisation",
    summary:
      "Analyser les acteurs, les flux et les territoires de la mondialisation, et ses effets inégaux selon les espaces.",
    level: "Bac · Économie & Gestion / Lettres (T2)",
    durationMin: 27,
    orderIndex: 14,
    objectives: [
      "Identifier les acteurs de la mondialisation",
      "Décrire les flux et les réseaux",
      "Analyser la hiérarchie des territoires",
      "Mesurer les effets sociaux et spatiaux",
    ],
    blocks: [
      {
        type: "table",
        title: "Les acteurs",
        head: ["Acteur", "Rôle", "Exemple"],
        rows: [
          ["Firmes transnationales", "organisation de la production", "chaînes de valeur"],
          ["États", "cadre juridique et fiscal", "politiques d'attractivité"],
          ["Institutions internationales", "règles et financement", "OMC, FMI, Banque mondiale"],
          ["Métropoles", "concentration des commandements", "villes globales"],
          ["ONG et société civile", "contre-pouvoirs", "dénonciation des abus"],
        ],
      },
      {
        type: "paragraph",
        title: "Des territoires gagnants et des territoires délaissés",
        text: "La mondialisation ne lisse pas l'espace : elle le hiérarchise. Les métropoles, les littoraux et les régions connectées aux réseaux mondiaux concentrent les richesses et les commandements, tandis que les espaces enclavés, les zones rurales isolées et les régions sans infrastructure sont marginalisés. C'est pourquoi on parle de « mondialisation en archipel » : des points connectés dans des espaces qui le sont moins.",
      },
      {
        type: "steps",
        title: "Analyser une carte des flux mondiaux",
        items: [
          "Repérer les pôles majeurs : Amérique du Nord, Europe, Asie orientale.",
          "Identifier les types de flux (biens, capitaux, information, personnes).",
          "Repérer les nœuds : ports, aéroports, câbles, places financières.",
          "Mesurer les inégalités de connexion.",
          "Conclure sur la hiérarchie et les marges.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Trois termes à réutiliser",
        text: "Métropolisation (concentration dans les grandes villes), archipel (réseau de pôles connectés), marginalisation (espaces hors des flux). Ces trois concepts suffisent à structurer une bonne réponse.",
      },
    ],
    keyPoints: [
      "Les firmes transnationales organisent les chaînes de valeur.",
      "La mondialisation hiérarchise les territoires.",
      "Les métropoles concentrent les commandements.",
      "Des espaces restent marginalisés.",
    ],
    pitfalls: [
      "Décrire la mondialisation comme uniforme.",
      "Oublier les flux immatériels.",
      "Négliger les inégalités spatiales.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce que la métropolisation ?",
        answer: "La concentration croissante de la population et des activités de commandement dans les grandes villes.",
      },
      {
        question: "Quels sont les trois grands pôles de la mondialisation ?",
        answer: "L'Amérique du Nord, l'Europe occidentale et l'Asie orientale.",
      },
      {
        question: "Que signifie « mondialisation en archipel » ?",
        answer: "Que des pôles connectés entre eux coexistent avec des espaces marginaux délaissés.",
      },
    ],
    tags: ["géographie", "mondialisation", "flux", "métropolisation", "territoires"],
  },
  {
    slug: "hg-espaces-productifs",
    subjectSlug: "histoire-geographie",
    title: "Les espaces productifs et les flux mondiaux",
    chapter: "Géographie · Espaces productifs",
    summary:
      "Comparer les espaces industriels, agricoles et de services, et expliquer leur localisation dans la mondialisation.",
    level: "Bac · Économie & Gestion / Lettres (T3)",
    durationMin: 26,
    orderIndex: 15,
    objectives: [
      "Distinguer les types d'espaces productifs",
      "Expliquer les facteurs de localisation",
      "Analyser les reconversions",
      "Relier localisation et mondialisation",
    ],
    blocks: [
      {
        type: "table",
        title: "Les trois types d'espaces",
        head: ["Espace", "Facteurs de localisation", "Exemple"],
        rows: [
          ["Industriel", "énergie, main-d'œuvre, transport, proximité du marché", "zone industrielle portuaire"],
          ["Agricole", "climat, sol, eau, débouchés", "oliveraies du Sahel"],
          ["De services", "population, accessibilité, image", "quartier d'affaires, tourisme"],
        ],
      },
      {
        type: "paragraph",
        title: "La double logique de localisation",
        text: "Un espace productif se localise selon deux logiques : les avantages comparatifs (coûts, ressources, main-d'œuvre) et les économies d'agglomération (proximité des autres entreprises, des fournisseurs, des centres de recherche). La mondialisation pousse à la spécialisation : chaque territoire valorise ce qu'il fait le mieux, au risque de devenir dépendant d'un seul secteur.",
      },
      {
        type: "steps",
        title: "Analyser un espace productif",
        items: [
          "Localiser l'espace et décrire ses caractéristiques physiques.",
          "Identifier la production dominante.",
          "Repérer les facteurs de localisation.",
          "Analyser les dynamiques : croissance, reconversion, déclin.",
          "Conclure sur l'insertion dans les flux mondiaux.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Reconversion n'est pas disparition",
        text: "Un espace industriel en crise peut se reconvertir vers de nouvelles spécialités (technologie, tourisme industriel, logistique). Dire qu'il « disparaît » est faux : il change de fonction. Ce mot de reconversion est souvent l'élément qui manque aux copies.",
      },
    ],
    keyPoints: [
      "Trois types d'espaces : industriel, agricole, de services.",
      "Localisation = avantages comparatifs + économies d'agglomération.",
      "La mondialisation spécialise les territoires.",
      "Reconversion ≠ disparition.",
    ],
    pitfalls: [
      "Confondre espace productif et espace urbain.",
      "Oublier les facteurs naturels.",
      "Ignorer les dynamiques de reconversion.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'une économie d'agglomération ?",
        answer: "Un avantage dû à la proximité d'autres entreprises, fournisseurs et services spécialisés.",
      },
      {
        question: "Cite trois facteurs de localisation industrielle.",
        answer: "L'accès aux transports, la disponibilité de la main-d'œuvre et la proximité du marché ou de l'énergie.",
      },
      {
        question: "Que signifie la reconversion d'un espace productif ?",
        answer: "Le passage d'une activité dominante à une autre, en réutilisant les infrastructures et les compétences.",
      },
    ],
    tags: ["géographie", "espaces productifs", "industrie", "localisation", "reconversion"],
  },
  {
    slug: "hg-maghreb-integration",
    subjectSlug: "histoire-geographie",
    title: "Le Maghreb et l'intégration régionale",
    chapter: "Géographie · Maghreb",
    summary:
      "Analyser les atouts et les blocages de l'intégration maghrébine, et le rôle de l'Union du Maghreb arabe.",
    level: "Bac · Économie & Gestion / Lettres (T3)",
    durationMin: 25,
    orderIndex: 16,
    objectives: [
      "Présenter les atouts du Maghreb",
      "Expliquer les blocages de l'intégration",
      "Comparer avec d'autres ensembles régionaux",
      "Proposer des pistes",
    ],
    blocks: [
      {
        type: "table",
        title: "Atouts et blocages",
        head: ["Dimension", "Atouts", "Blocages"],
        rows: [
          ["Géographique", "continuité territoriale, façade méditerranéenne", "frontières fermées"],
          ["Humain", "population jeune, diaspora", "faible mobilité"],
          ["Économique", "complémentarités possibles", "économies concurrentes, faible intra-échange"],
          ["Institutionnel", "UMA créée en 1989", "blocages politiques"],
        ],
      },
      {
        type: "paragraph",
        title: "Un potentiel inexploité",
        text: "Le commerce intra-maghrébin représente moins de 5 % des échanges des pays membres, alors qu'il atteint plusieurs dizaines de pour cent dans l'Union européenne ou l'ASEAN. Les causes sont politiques (différends bilatéraux, frontières fermées) et économiques (structures de production similaires, absence d'infrastructures communes). Pourtant, l'intégration offrirait un marché de plus de 100 millions d'habitants et des économies d'échelle décisives.",
      },
      {
        type: "steps",
        title: "Analyser une intégration régionale",
        items: [
          "Repérer les institutions et leur date de création.",
          "Mesurer le commerce intra-régional.",
          "Identifier les obstacles : tarifaires, non tarifaires, politiques.",
          "Repérer les complémentarités possibles.",
          "Conclure sur les conditions d'une intégration effective.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "La comparaison qui convainc",
        text: "Comparer systématiquement le Maghreb à l'Union européenne (intégration avancée) et à l'ASEAN (intégration progressive malgré la diversité) permet de démontrer que le blocage maghrébin n'est pas d'abord économique mais politique.",
      },
    ],
    keyPoints: [
      "L'UMA a été créée en 1989 à Marrakech.",
      "Le commerce intra-maghrébin est inférieur à 5 %.",
      "Les blocages sont d'abord politiques.",
      "L'intégration offrirait un marché de plus de 100 millions d'habitants.",
    ],
    pitfalls: [
      "Réduire les blocages à des causes économiques.",
      "Confondre UMA et Union africaine.",
      "Oublier les complémentarités possibles.",
    ],
    flashcards: [
      {
        question: "Quand l'UMA a-t-elle été créée ?",
        answer: "En 1989, à Marrakech, par cinq pays maghrébins.",
      },
      {
        question: "Quelle est la part du commerce intra-maghrébin ?",
        answer: "Moins de 5 % des échanges des pays membres.",
      },
      {
        question: "Quelle est la principale cause du blocage maghrébin ?",
        answer: "Les différends politiques bilatéraux, qui maintiennent des frontières fermées.",
      },
    ],
    tags: ["géographie", "Maghreb", "intégration", "UMA", "commerce"],
  },
  {
    slug: "hg-methodes-cartographie",
    subjectSlug: "histoire-geographie",
    title: "Cartographie et analyse de documents",
    chapter: "Méthodes · Analyse de documents",
    summary:
      "Maîtriser les techniques d'analyse de documents (texte, carte, statistique, image) et les règles du croquis de géographie.",
    level: "Bac · Économie & Gestion / Lettres (T3)",
    durationMin: 26,
    orderIndex: 17,
    objectives: [
      "Analyser un texte historique",
      "Lire une carte thématique",
      "Interpréter un tableau statistique",
      "Réaliser un croquis avec légende",
    ],
    blocks: [
      {
        type: "steps",
        title: "Analyser un document écrit",
        items: [
          "Présenter : nature, auteur, date, source, destinataire.",
          "Dégager l'idée principale en une phrase.",
          "Repérer les arguments et les faits cités.",
          "Confronter au contexte et aux connaissances.",
          "Critiquer : portée, limites, intentions de l'auteur.",
        ],
      },
      {
        type: "table",
        title: "Lire une carte ou un tableau",
        head: ["Élément", "Ce qu'il faut repérer", "Erreur à éviter"],
        rows: [
          ["Titre", "thème et espace concerné", "l'ignorer"],
          ["Légende", "classes et figurés", "confondre les classes"],
          ["Échelle", "ordre de grandeur", "comparer des échelles différentes"],
          ["Source et date", "fiabilité", "citer des données périmées"],
          ["Unités", "valeurs absolues ou relatives", "confondre % et valeurs"],
        ],
      },
      {
        type: "steps",
        title: "Réaliser un croquis",
        items: [
          "Lire le sujet et choisir un titre clair.",
          "Sélectionner 3 à 4 idées organisatrices (la légende).",
          "Choisir des figurés adaptés : surfaces pour les ensembles, lignes pour les flux, symboles ponctuels.",
          "Dessiner proprement, sans saturer la carte.",
          "Rédiger une légende organisée en parties et ajouter un schéma d'organisation si demandé.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les trois fautes qui coûtent le plus",
        text: "Une carte sans titre, une légende incomplète et des figurés qui ne correspondent pas au phénomène (un flux dessiné avec une surface, par exemple). Le croquis est évalué sur sa logique, pas sur sa beauté.",
      },
    ],
    keyPoints: [
      "Tout document se présente avant d'être analysé.",
      "Confronter le document aux connaissances est obligatoire.",
      "Un croquis repose sur une légende organisée.",
      "Les figurés doivent correspondre à la nature des phénomènes.",
    ],
    pitfalls: [
      "Résumer le document au lieu de l'analyser.",
      "Oublier la critique de la source.",
      "Croquis sans titre ni légende structurée.",
    ],
    flashcards: [
      {
        question: "Que doit contenir la présentation d'un document ?",
        answer: "Sa nature, son auteur, sa date, sa source et son destinataire.",
      },
      {
        question: "Combien d'idées organisatrices pour un croquis ?",
        answer: "De trois à quatre, organisées en parties dans la légende.",
      },
      {
        question: "Quel figuré pour représenter un flux ?",
        answer: "Une flèche, dont l'épaisseur traduit l'importance du flux.",
      },
    ],
    tags: ["géographie", "méthode", "croquis", "document", "cartographie"],
  },
  {
    slug: "memento-histoire-geographie",
    subjectSlug: "histoire-geographie",
    title: "Mémento d'histoire-géographie : repères et méthodes",
    chapter: "Révision générale",
    summary:
      "Les dates, les notions et les méthodes à réviser avant l'épreuve d'histoire-géographie.",
    level: "Bac · Économie & Gestion / Lettres (REV)",
    durationMin: 24,
    orderIndex: 18,
    objectives: [
      "Retenir les dates essentielles",
      "Maîtriser les notions de géographie",
      "Appliquer les méthodes d'analyse",
      "Gérer le temps de l'épreuve",
    ],
    blocks: [
      {
        type: "table",
        title: "Dates et repères",
        head: ["Date", "Événement", "Portée"],
        rows: [
          ["1881", "traité du Bardo", "début du protectorat"],
          ["1914–1918", "Première Guerre mondiale", "remaniement de l'ordre mondial"],
          ["1939–1945", "Seconde Guerre mondiale", "ONU, bipolarisation"],
          ["1956", "indépendance de la Tunisie", "construction de l'État"],
          ["1989", "création de l'UMA", "intégration maghrébine"],
          ["2011", "révolution tunisienne", "transition démocratique"],
        ],
      },
      {
        type: "table",
        title: "Notions de géographie",
        head: ["Notion", "Définition courte"],
        rows: [
          ["Littoralisation", "concentration des hommes et activités sur les côtes"],
          ["Métropolisation", "concentration dans les grandes villes"],
          ["Espace productif", "territoire organisé par une activité dominante"],
          ["Intégration régionale", "rapprochement économique et institutionnel d'États voisins"],
          ["Développement durable", "répondre aux besoins sans compromettre l'avenir"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Méthode universelle",
        text: "Présenter, analyser, confronter aux connaissances, critiquer, conclure. Cette séquence vaut pour tous les documents. En histoire, dater et contextualiser ; en géographie, localiser et comparer les échelles.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreurs de méthode",
        text: "Réciter le cours au lieu de répondre à la question, ignorer les documents, et oublier de conclure. En cartographie, ne jamais dessiner sans légende préalablement rédigée.",
      },
    ],
    keyPoints: [
      "1881–1956 : protectorat ; 1956 : indépendance.",
      "1945 : ONU et droits de l'homme.",
      "Littoralisation et métropolisation structurent le territoire tunisien.",
      "Toute réponse suit : présenter, analyser, confronter, conclure.",
    ],
    pitfalls: [
      "Confondre les dates du protectorat.",
      "Réciter sans répondre au sujet.",
      "Oublier la conclusion.",
    ],
    flashcards: [
      {
        question: "Quelle est la date de l'indépendance tunisienne ?",
        answer: "Le 20 mars 1956.",
      },
      {
        question: "Que signifie littoralisation ?",
        answer: "La concentration de la population et des activités sur les zones côtières.",
      },
      {
        question: "Quelles sont les étapes d'une analyse de document ?",
        answer: "Présenter, dégager l'idée principale, analyser, confronter aux connaissances, critiquer, conclure.",
      },
    ],
    tags: ["histoire-géographie", "mémento", "révision", "méthode", "repères"],
  },
];

import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Histoire-Géographie — chapitres propres à la section Lettres (coefficient 3),
 * qui complètent les fiches communes (`lessons-histoire-geo.ts`).
 */
export const histoireGeoLettresLessons: LessonSeed[] = [
  {
    slug: "hg-tunisie-transition-2011",
    subjectSlug: "histoire-geographie",
    title: "La Tunisie après 2011 : transition politique et défis économiques",
    chapter: "La Tunisie contemporaine · 2011-2025",
    summary:
      "Comprendre les étapes de la transition politique tunisienne depuis 2011, ses acquis institutionnels et les blocages économiques et sociaux qui la traversent.",
    level: "Bac · 4e Lettres (T3)",
    durationMin: 28,
    orderIndex: 20,
    objectives: [
      "Dater et caractériser les étapes de la transition",
      "Identifier les acquis institutionnels",
      "Analyser les difficultés économiques et sociales",
      "Construire un croquis ou un schéma d'organisation",
    ],
    blocks: [
      {
        type: "table",
        title: "Les étapes de la transition",
        head: ["Date", "Événement", "Portée"],
        rows: [
          ["14 janvier 2011", "Chute du régime de Ben Ali", "fin d'un régime autoritaire de 23 ans"],
          ["Octobre 2011", "Élection de l'Assemblée constituante", "première élection libre, scrutin de liste"],
          ["Janvier 2014", "Adoption de la Constitution", "régime parlementaire mixte, garanties des libertés"],
          ["2014", "Élections législatives et présidentielle", "alternance politique pacifique"],
          ["2015", "Prix Nobel de la paix au Quartet", "reconnaissance du dialogue national"],
          ["25 juillet 2021", "Mesures exceptionnelles", "suspension du Parlement, révision constitutionnelle de 2022"],
          ["2022-2024", "Nouvelle Constitution, élections", "refonte des institutions, faible participation"],
        ],
      },
      {
        type: "list",
        title: "Les acquis",
        items: [
          "Liberté d'expression et pluralisme médiatique.",
          "Indépendance de la justice affirmée constitutionnellement.",
          "Parité inscrite dans la Constitution de 2014.",
          "Instance Vérité et Dignité : justice transitionnelle.",
          "Société civile dynamique et reconnue internationalement.",
        ],
      },
      {
        type: "table",
        title: "Les défis économiques",
        head: ["Défi", "Manifestation", "Conséquence"],
        rows: [
          ["Chômage des jeunes et des diplômés", "taux élevé, surtout intérieur et littoral défavorisé", "émigration, économie informelle"],
          ["Déficit budgétaire et dette", "recours au FMI, tensions de trésorerie", "austérité, subventions réduites"],
          ["Inflation et pouvoir d'achat", "hausse des prix alimentaires", "tensions sociales"],
          ["Inégalités territoriales", "contraste littoral / intérieur", "migrations internes, marginalisation"],
          ["Secteur informel", "poids important de l'emploi non déclaré", "perte de recettes fiscales"],
        ],
      },
      {
        type: "steps",
        title: "Construire une réponse de type bac",
        items: [
          "Introduire : situer 2011 comme rupture et point de départ d'un processus.",
          "Partie 1 : les acquis politiques (constitution, élections, libertés).",
          "Partie 2 : les blocages (instabilité gouvernementale, faible croissance, terrorisme 2015).",
          "Partie 3 : les défis économiques et territoriaux, avec chiffres et exemples.",
          "Conclure : transition inachevée, enjeu de consolidation démocratique et de justice sociale.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Croquis à savoir refaire",
        text: "Un croquis de la Tunisie avec : littoral industrialisé et touristique, intérieur en difficulté, axes Tunis–Sfax–Sousse, pôles de Gabès et Gafsa, flux migratoires internes. Titre, légende organisée, nomenclature limitée : trois exigences notées.",
      },
    ],
    keyPoints: [
      "2011 : rupture fondatrice, pas aboutissement.",
      "Constitution de 2014 : acquis institutionnel majeur.",
      "Défis : chômage, dette, inflation, inégalités territoriales.",
      "Transition inachevée entre acquis et blocages.",
    ],
    pitfalls: [
      "Confondre 2011 et 2014 dans la chronologie.",
      "Décrire sans analyser les causes.",
      "Oublier les contrastes territoriaux.",
    ],
    flashcards: [
      {
        question: "Quelle est la date de la chute de Ben Ali ?",
        answer: "Le 14 janvier 2011, après un mois de protestations.",
      },
      {
        question: "Pourquoi la Constitution de 2014 est-elle un acquis ?",
        answer: "Elle instaure un régime mixte, garantit les libertés et affirme l'indépendance de la justice et la parité.",
      },
      {
        question: "Quel est le principal contraste territorial tunisien ?",
        answer: "Le littoral développé face à un intérieur marginalisé, source de migrations internes.",
      },
    ],
    tags: ["histoire", "Tunisie", "transition", "2011", "économie"],
  },
  {
    slug: "hg-echanges-mondiaux-poles",
    subjectSlug: "histoire-geographie",
    title: "Les échanges mondiaux et les pôles de la puissance",
    chapter: "Le monde contemporain · Géographie",
    summary:
      "Comprendre l'organisation des flux mondiaux (marchandises, capitaux, informations) et la hiérarchie des pôles de puissance.",
    level: "Bac · 4e Lettres (T3)",
    durationMin: 28,
    orderIndex: 21,
    objectives: [
      "Identifier les grands types de flux",
      "Localiser les pôles majeurs de la Triade",
      "Analyser la hiérarchie des puissances",
      "Réaliser un croquis des flux mondiaux",
    ],
    blocks: [
      {
        type: "table",
        title: "Les flux mondiaux",
        head: ["Flux", "Nature", "Pôles dominants"],
        rows: [
          ["Marchandises", "80 % du commerce en volume par voie maritime", "Chine, UE, États-Unis"],
          ["Capitaux", "investissements directs, bourses", "New York, Londres, Tokyo, Hong Kong"],
          ["Informations", "câbles sous-marins, data centers", "États-Unis, Chine, Europe"],
          ["Hommes", "migrations de travail, tourisme", "Golfe, Europe, Amérique du Nord"],
          ["Énergie", "pétrole, gaz, électricité", "Golfe, Russie, Norvège"],
        ],
      },
      {
        type: "paragraph",
        title: "Une hiérarchie, pas une égalité",
        text: "La mondialisation n'efface pas les inégalités : elle les recompose. Trois pôles dominants structurent l'économie mondiale (Amérique du Nord, Europe occidentale, Asie orientale), mais des puissances émergentes (Chine en tête, Inde, Brésil) et des pays en développement (Afrique, Amérique latine) occupent des positions très inégales. Le pouvoir se mesure aujourd'hui autant à la capacité de contrôler les flux qu'à la possession de ressources.",
      },
      {
        type: "table",
        title: "Les formes de la puissance",
        head: ["Dimension", "Indicateurs", "Exemple"],
        rows: [
          ["Économique", "PIB, firmes multinationales, bourses", "États-Unis, Chine"],
          ["Commerciale", "parts de marché, ports", "Shanghai, Rotterdam"],
          ["Financière", "capitaux, monnaies de réserve", "dollar, euro"],
          ["Technologique", "brevets, R&D, semi-conducteurs", "États-Unis, Taïwan, Corée"],
          ["Militaire et diplomatique", "dépenses, alliances, ONU", "États-Unis, Russie, Chine"],
          ["Culturelle", "langue, médias, soft power", "Hollywood, Netflix"],
        ],
      },
      {
        type: "steps",
        title: "Méthode du croquis « flux et pôles »",
        items: [
          "Titre : « Les flux et les pôles de la puissance dans le monde ».",
          "Figurés ponctuels pour les pôles (cercles proportionnels).",
          "Figurés linéaires pour les flux (flèches épaisses = trafic majeur).",
          "Nomenclature limitée à une dizaine de noms.",
          "Légende organisée en trois parties : pôles, flux, marges.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le rôle du canal de Suez",
        text: "Exemple tunisien à forte valeur ajoutée : la Tunisie dépend de flux maritimes méditerranéens, et le canal de Suez est un verrou stratégique du commerce Asie–Europe. Citer un exemple local améliore nettement une copie de Lettres.",
      },
    ],
    keyPoints: [
      "Trois types de flux majeurs : marchandises, capitaux, informations.",
      "Trois pôles dominants : Amérique du Nord, Europe, Asie orientale.",
      "La puissance est multidimensionnelle.",
      "Les marges existent et se creusent souvent.",
    ],
    pitfalls: [
      "Confondre flux et pôles.",
      "Oublier la dimension maritime.",
      "Croquis surchargé de noms.",
    ],
    flashcards: [
      {
        question: "Trois pôles dominants de l'économie mondiale ?",
        answer: "Amérique du Nord, Europe occidentale et Asie orientale.",
      },
      {
        question: "Quels sont les principaux types de flux mondiaux ?",
        answer: "Les marchandises, les capitaux, les informations, les hommes et l'énergie.",
      },
      {
        question: "Que sont les « marges » dans un croquis de la mondialisation ?",
        answer: "Les territoires faiblement intégrés aux flux mondiaux, souvent en Afrique subsaharienne ou en Amérique latine rurale.",
      },
    ],
    tags: ["géographie", "mondialisation", "flux", "puissance", "croquis"],
  },
];

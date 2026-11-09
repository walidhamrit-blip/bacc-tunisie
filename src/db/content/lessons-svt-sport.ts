import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Sciences de la vie et de la Terre en section Sport (coefficient 3) :
 * les chapitres propres à l'effort physique et au sportif.
 */
export const svtSportLessons: LessonSeed[] = [
  {
    slug: "svt-neuro-muscle-sport",
    subjectSlug: "svt",
    title: "Système nerveux, réflexe myotatique et muscle squelettique",
    chapter: "Neurophysiologie · Effort",
    summary:
      "De la commande nerveuse à la contraction : message nerveux, arc réflexe, plaque motrice et sarcomère.",
    level: "Bac · 4e Sport (T2)",
    durationMin: 29,
    orderIndex: 14,
    objectives: [
      "Décrire le trajet du message nerveux",
      "Expliquer le réflexe myotatique",
      "Décrire le mécanisme de la contraction",
      "Relier commande nerveuse et performance",
    ],
    blocks: [
      {
        type: "steps",
        title: "De la commande au mouvement",
        items: [
          "Le récepteur (fuseau neuromusculaire) détecte l'étirement du muscle.",
          "Le message sensitif gagne la moelle épinière par la racine postérieure.",
          "Le neurone moteur (motoneurone α) conduit le message jusqu'à la plaque motrice.",
          "L'acétylcholine est libérée dans la fente synaptique et dépolarise la fibre musculaire.",
          "Le potentiel d'action se propage le long du sarcolemme, le calcium est libéré et la contraction démarre.",
        ],
      },
      {
        type: "table",
        title: "Structure et fonction",
        head: ["Élément", "Rôle", "Particularité"],
        rows: [
          ["Neurone sensitif", "transporter l'information vers le centre", "corps cellulaire dans le ganglion rachidien"],
          ["Motoneurone α", "commander la fibre musculaire", "synapse sur la plaque motrice"],
          ["Fuseau neuromusculaire", "récepteur d'étirement", "à l'origine du réflexe myotatique"],
          ["Sarcomère", "unité contractile", "glissement actine-myosine dépendant du Ca²⁺ et de l'ATP"],
          ["Plaque motrice", "transmission neuromusculaire", "synapse excitatrice, acétylcholine"],
        ],
      },
      {
        type: "paragraph",
        title: "Le réflexe myotatique, boucle de protection et de posture",
        text: "Quand le tendon rotulien est frappé, le muscle quadriceps est étiré : le fuseau neuromusculaire déclenche un message sensitif, la moelle épinière le transmet via un motoneurone α, et le muscle se contracte. C'est un réflexe monosynaptique, involontaire et rapide, qui participe au maintien de la posture et à la protection contre les étirements excessifs.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Précision qui rapporte des points",
        text: "Ne dites pas « le muscle se contracte parce qu'il reçoit un signal » : précisez la nature du signal (potentiel d'action), le neurotransmetteur (acétylcholine), l'ion responsable de la contraction (Ca²⁺) et la source d'énergie (ATP).",
      },
    ],
    keyPoints: [
      "Réflexe myotatique : monosynaptique, involontaire, rapide.",
      "L'acétylcholine transmet le message à la plaque motrice.",
      "La contraction résulte du glissement actine-myosine, avec Ca²⁺ et ATP.",
      "La commande nerveuse conditionne la qualité du geste.",
    ],
    pitfalls: [
      "Confondre racine sensitive et motrice.",
      "Oublier le rôle du calcium.",
      "Décrire la contraction sans l'ATP.",
    ],
    flashcards: [
      {
        question: "Quel est le récepteur du réflexe myotatique ?",
        answer: "Le fuseau neuromusculaire, sensible à l'étirement du muscle.",
      },
      {
        question: "Quel neurotransmetteur agit à la plaque motrice ?",
        answer: "L'acétylcholine.",
      },
      {
        question: "Deux conditions indispensables à la contraction ?",
        answer: "La présence de calcium et d'ATP dans la fibre musculaire.",
      },
    ],
    tags: ["svt", "neurophysiologie", "muscle", "réflexe", "sport"],
  },
  {
    slug: "svt-metabolisme-effort",
    subjectSlug: "svt",
    title: "Métabolisme énergétique et adaptation à l'effort",
    chapter: "Métabolisme · Effort",
    summary:
      "Respiration cellulaire, fermentation et mobilisation des réserves énergétiques pendant l'exercice.",
    level: "Bac · 4e Sport (T3)",
    durationMin: 29,
    orderIndex: 15,
    objectives: [
      "Comparer respiration et fermentation",
      "Localiser les voies dans la cellule",
      "Expliquer l'utilisation des réserves",
      "Relier métabolisme et performance",
    ],
    blocks: [
      {
        type: "table",
        title: "Respiration et fermentation",
        head: ["Critère", "Respiration aérobie", "Fermentation lactique"],
        rows: [
          ["O₂", "indispensable", "inutile"],
          ["Localisation", "cytosol puis mitochondrie", "cytosol uniquement"],
          ["Rendement", "≈ 36–38 ATP par glucose", "2 ATP par glucose"],
          ["Produits", "CO₂, H₂O", "acide lactique"],
          ["Durée", "effort long modéré", "effort intense bref"],
        ],
      },
      {
        type: "list",
        title: "Mobilisation des réserves",
        items: [
          "ATP et phosphocréatine : immédiatement disponibles, réserves très faibles.",
          "Glycogène musculaire : glycogénolyse, puis glycolyse.",
          "Glycogène hépatique : libération de glucose sanguin.",
          "Lipides : lipolyse et bêta-oxydation, filière lente mais très énergétique.",
          "Les glucides sont donc priorisés lors des efforts intenses et courts.",
        ],
      },
      {
        type: "paragraph",
        title: "Adaptation à l'effort : ce que l'entraînement modifie",
        text: "L'entraînement favorise l'augmentation du volume mitochondrial, de la densité capillaire et de la capacité oxydative. Ces adaptations permettent un recours plus tardif à la glycolyse, retiennent le lactate et réduisent le coût cardiaque d'un effort donné. Chez le sportif entraîné, un même effort est réalisé à une fréquence cardiaque plus basse : c'est la preuve du gain d'efficacité énergétique.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le schéma qui rapporte des points",
        text: "Un tableau à double entrée (filière × paramètre : O₂, localisation, ATP, produits) est attendu dans presque toutes les épreuves. Le reproduire de mémoire est indispensable.",
      },
    ],
    keyPoints: [
      "Respiration : O₂, mitochondrie, rendement élevé.",
      "Fermentation : sans O₂, cytosol, 2 ATP, lactate.",
      "Les réserves sont mobilisées selon la durée et l'intensité.",
      "L'entraînement améliore le rendement oxydatif.",
    ],
    pitfalls: [
      "Confondre fermentation lactique et alcalose.",
      "Oublier la mitochondrie.",
      "Croire que la fermentation n'a aucun intérêt.",
    ],
    flashcards: [
      {
        question: "Combien d'ATP produit la respiration par glucose ?",
        answer: "Environ 36 à 38 ATP, contre 2 par la fermentation lactique.",
      },
      {
        question: "Où se déroule la respiration cellulaire ?",
        answer: "Dans le cytosol pour la glycolyse, puis dans la mitochondrie pour le cycle et la chaîne respiratoire.",
      },
      {
        question: "Quel avantage confère l'entraînement aérobie ?",
        answer: "Un meilleur rendement énergétique : plus d'ATP par glucose, moins de lactate, effort perçu plus faible.",
      },
    ],
    tags: ["svt", "métabolisme", "respiration", "fermentation", "sport"],
  },
  {
    slug: "svt-nutrition-sportif",
    subjectSlug: "svt",
    title: "Nutrition du sportif et équilibre alimentaire",
    chapter: "Nutrition · Effort",
    summary:
      "Composer un régime adapté au sportif et corriger les déséquilibres alimentaires fréquents.",
    level: "Bac · 4e Sport (T3)",
    durationMin: 27,
    orderIndex: 16,
    objectives: [
      "Analyser un apport alimentaire",
      "Composer une ration équilibrée",
      "Expliquer le rôle du fer et du calcium",
      "Corriger les erreurs fréquentes",
    ],
    blocks: [
      {
        type: "table",
        title: "Répartition recommandée",
        head: ["Groupe", "Part de l'apport", "Référence"],
        rows: [
          ["Céréales et féculents", "≈ 50–55 %", "glucides complexes"],
          ["Fruits et légumes", "≈ 25 %", "fibres, vitamines, minéraux"],
          ["Produits laitiers et protéines", "≈ 15–20 %", "calcium, protides"],
          ["Matières grasses", "≈ 10 %, dont 60 % insaturées", "acides gras essentiels"],
          ["Produits sucrés", "occasionnels", "sucres rapides = énergie immédiate"],
        ],
      },
      {
        type: "paragraph",
        title: "Fer, calcium et vitamines",
        text: "Le fer est indispensable au transport de l'oxygène : une carence provoque anémie, fatigue et baisse de performance. Le calcium conditionne la solidité osseuse, défi majeur du jeune sportif en croissance. Les vitamines antioxydantes (A, C et E) limitent le stress oxydatif de l'effort intense. Ces micronutriments ne fournissent pas d'énergie, mais leur carence limite la performance.",
      },
      {
        type: "steps",
        title: "Analyser un apport alimentaire",
        items: [
          "Recenser les aliments sur une journée.",
          "Classer dans les groupes et calculer approximativement les apports en macronutriments.",
          "Comparer à la répartition recommandée.",
          "Identifier les déséquilibres (trop de sucres rapides, pas assez de légumes…).",
          "Proposer des corrections concrètes et applicables.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreurs fréquentes de la copie",
        text: "Dire « les protides donnent la force » : les protides construisent, les glucides fournissent l'énergie. Dire « il faut supprimer les lipides » : les acides gras essentiels sont indispensables. Ces deux phrases, très répandues, sont fausses et sanctionnées.",
      },
    ],
    keyPoints: [
      "50–55 % de glucides, 10 % de lipides, 15–20 % de protides.",
      "Le fer transporte l'oxygène ; sa carence diminue la performance.",
      "Le calcium est essentiel chez le jeune sportif en croissance.",
      "Corriger un déséquilibre se fait par des propositions concrètes.",
    ],
    pitfalls: [
      "Confondre rôle des protides et des glucides.",
      "Supprimer tous les lipides.",
      "Proposer une correction impraticable.",
    ],
    flashcards: [
      {
        question: "Quel micronutriment conditionne le transport de l'oxygène ?",
        answer: "Le fer, constitutif de l'hémoglobine.",
      },
      {
        question: "Quelle part de l'apport doit venir des glucides ?",
        answer: "Environ 50 à 55 %, majoritairement complexes.",
      },
      {
        question: "Pourquoi le calcium est-il crucial chez le sportif adolescent ?",
        answer: "Parce que la croissance osseuse est en cours et que l'os se minéralise à cet âge.",
      },
    ],
    tags: ["svt", "nutrition", "alimentation", "fer", "sportif"],
  },
];

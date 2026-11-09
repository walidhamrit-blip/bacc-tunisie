import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Éducation physique et sportive — matière de spécialité de la section Sport
 * (coefficient 3, dont 2,5 à l'épreuve pratique). Partie théorique : anatomie,
 * biomécanique, physiologie de l'entraînement, nutrition, pédagogie,
 * réglementation et prévention.
 */
export const educationPhysiqueLessons: LessonSeed[] = [
  {
    slug: "sport-anatomie-effort",
    subjectSlug: "education-physique",
    title: "Anatomie et physiologie de l'effort",
    chapter: "Sciences du sport · Anatomie",
    summary:
      "Les structures engagées dans l'effort : squelette, articulations, muscles, appareil cardio-respiratoire et leur mise en jeu à l'exercice.",
    level: "Bac · 4e Sport (T1)",
    durationMin: 30,
    orderIndex: 10,
    objectives: [
      "Nommer les grands systèmes de l'appareil locomoteur",
      "Décrire les types de muscles et de contractions",
      "Expliquer la réponse cardio-respiratoire à l'effort",
      "Relier structure et fonction dans un geste sportif",
    ],
    blocks: [
      {
        type: "table",
        title: "Les systèmes en jeu",
        head: ["Système", "Éléments", "Rôle à l'effort"],
        rows: [
          ["Ostéo-articulaire", "os, cartilages, ligaments, capsules", "support, transmission des forces, mobilité"],
          ["Musculaire", "muscles striés squelettiques, tendons", "production de force et de mouvement"],
          ["Cardio-vasculaire", "cœur, artères, veines, capillaires", "transport de l'oxygène et des nutriments"],
          ["Respiratoire", "poumons, voies aériennes, diaphragme", "échanges gazeux O₂/CO₂"],
          ["Nerveux", "motoneurones, plaques motrices", "commande et coordination du mouvement"],
        ],
      },
      {
        type: "list",
        title: "Les types de contraction",
        items: [
          "Concentrique : le muscle se raccourcit en produisant de la force (montée de marche).",
          "Excentrique : le muscle s'allonge sous tension (freinage, descente) — forte source de courbatures.",
          "Isométrique : la longueur ne change pas (gainage, maintien) — pas de mouvement articulaire.",
          "Pliométrique : alternance étirement-raccourcissement rapide (sauts).",
        ],
      },
      {
        type: "table",
        title: "Réponse cardio-respiratoire à l'effort",
        head: ["Paramètre", "Au repos", "À l'effort intense"],
        rows: [
          ["Fréquence cardiaque", "60–80 bpm", "jusqu'à 200 bpm chez le jeune"],
          ["Débit cardiaque", "≈ 5 L/min", "jusqu'à 20–25 L/min"],
          ["Ventilation", "≈ 6 L/min", "jusqu'à 100–120 L/min"],
          ["Pression artérielle systolique", "≈ 120 mmHg", "augmente avec l'intensité"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Formule utile",
        text: "Débit cardiaque = fréquence cardiaque × volume d'éjection systolique (Q = FC × VES). L'entraînement augmente surtout le VES : le cœur entraîné bat plus lentement au repos pour un même débit.",
      },
    ],
    keyPoints: [
      "L'appareil locomoteur associe os, articulations, muscles et tendons.",
      "Trois contractions de base : concentrique, excentrique, isométrique.",
      "L'effort augmente fréquence cardiaque, débit cardiaque et ventilation.",
      "Structure et fonction sont liées : chaque geste engage une chaîne précise.",
    ],
    pitfalls: [
      "Confondre tendon (muscle-os) et ligament (os-os).",
      "Confondre contraction excentrique et isométrique.",
      "Oublier la dimension respiratoire de l'effort.",
    ],
    flashcards: [
      {
        question: "Quelle est la différence entre tendon et ligament ?",
        answer: "Le tendon relie le muscle à l'os ; le ligament relie deux os entre eux au niveau d'une articulation.",
      },
      {
        question: "Qu'est-ce qu'une contraction excentrique ?",
        answer: "Une contraction où le muscle s'allonge tout en produisant de la force (freinage d'un mouvement).",
      },
      {
        question: "Comment évolue le débit cardiaque à l'effort ?",
        answer: "Il passe d'environ 5 L/min au repos à 20–25 L/min à l'effort maximal.",
      },
    ],
    tags: ["sport", "anatomie", "physiologie", "muscle", "cœur"],
  },
  {
    slug: "sport-biomecanique",
    subjectSlug: "education-physique",
    title: "Biomécanique du mouvement sportif",
    chapter: "Sciences du sport · Biomécanique",
    summary:
      "Décomposer un geste sportif en leviers, forces et trajectoires, et en déduire des conseils techniques.",
    level: "Bac · 4e Sport (T1)",
    durationMin: 28,
    orderIndex: 11,
    objectives: [
      "Identifier les forces appliquées au corps",
      "Reconnaître les classes de leviers",
      "Analyser trajectoire et centre de gravité",
      "Optimiser un geste technique",
    ],
    blocks: [
      {
        type: "table",
        title: "Les trois classes de leviers",
        head: ["Classe", "Disposition", "Exemple sportif"],
        rows: [
          ["1er genre (inter-appui)", "point d'appui entre les forces", "balancement de la tête, extension du coude"],
          ["2e genre (inter-résistant)", "résistance entre appui et force", "montée sur la pointe des pieds"],
          ["3e genre (inter-moteur)", "force entre appui et résistance", "flexion du coude, la plupart des gestes sportifs"],
        ],
      },
      {
        type: "paragraph",
        title: "Le levier, outil d'analyse du geste",
        text: "Un levier comprend un point d'appui (articulation), une force motrice (muscle) et une résistance (charge ou poids du segment). Le bras de levier est la distance perpendiculaire entre l'axe et la ligne d'action de la force : plus il est grand, plus le couple est efficace. C'est pourquoi on fléchit les genoux pour soulever une charge lourde, et pourquoi un bras tendu donne plus de vitesse en fin de mouvement.",
      },
      {
        type: "list",
        title: "Notions clés",
        items: [
          "Force : toute action capable de modifier un mouvement (poids, réaction, frottement, propulsion).",
          "Centre de gravité : point d'application du poids ; sa position conditionne l'équilibre.",
          "Base de sustentation : surface d'appui ; plus elle est large et le centre bas, plus l'équilibre est stable.",
          "Trajectoire : parabole d'un projectile, influencée par l'angle et la vitesse d'envol (optimum ≈ 45° sans résistance).",
          "Inertie : résistance au changement de mouvement, proportionnelle à la masse.",
        ],
      },
      {
        type: "steps",
        title: "Analyser un geste en 4 étapes",
        items: [
          "Segmenter le geste (préparation, action, récupération).",
          "Identifier les articulations et les muscles impliqués.",
          "Situer les forces et les bras de levier.",
          "Proposer une correction technique justifiée par la mécanique.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreur fréquente",
        text: "Dire « le muscle tire l'os » sans préciser l'articulation et le bras de levier : une analyse biomécanique doit toujours nommer l'axe, la force et le bras de levier.",
      },
    ],
    keyPoints: [
      "Levier = appui + force motrice + résistance.",
      "La plupart des gestes sportifs sont des leviers de 3e genre.",
      "Un grand bras de levier augmente l'efficacité.",
      "Équilibre : base large et centre de gravité bas.",
    ],
    pitfalls: [
      "Confondre les classes de leviers.",
      "Négliger le bras de levier.",
      "Décrire le geste sans identifier l'axe articulaire.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'un levier de 3e genre ?",
        answer: "Un levier où la force motrice s'applique entre le point d'appui et la résistance — le cas de la plupart des gestes sportifs.",
      },
      {
        question: "Qu'est-ce qu'un bras de levier ?",
        answer: "La distance perpendiculaire entre l'axe de rotation et la ligne d'action de la force.",
      },
      {
        question: "Comment améliorer la stabilité ?",
        answer: "En élargissant la base de sustentation et en abaissant le centre de gravité.",
      },
    ],
    tags: ["sport", "biomécanique", "levier", "force", "équilibre"],
  },
  {
    slug: "sport-physiologie-entrainement",
    subjectSlug: "education-physique",
    title: "Physiologie de l'entraînement, filières énergétiques et récupération",
    chapter: "Sciences du sport · Entraînement",
    summary:
      "Comprendre les trois filières de production d'énergie, les principes de la charge d'entraînement et les mécanismes de récupération.",
    level: "Bac · 4e Sport (T2)",
    durationMin: 30,
    orderIndex: 12,
    objectives: [
      "Distinguer les filières anaérobie alactique, anaérobie lactique et aérobie",
      "Positionner une activité sur le continuum énergétique",
      "Appliquer les principes de la charge d'entraînement",
      "Expliquer la récupération et la surcompensation",
    ],
    blocks: [
      {
        type: "table",
        title: "Les trois filières énergétiques",
        head: ["Filière", "Durée dominante", "Substrat", "Exemple"],
        rows: [
          ["Anaérobie alactique (phosphagène)", "0–10 s", "ATP et phosphocréatine", "sprint 60 m, saut, haltérophilie"],
          ["Anaérobie lactique (glycolyse)", "10 s – 2 min", "glucose musculaire", "400 m, 200 m nage, effort intense continu"],
          ["Aérobie (oxydative)", "> 2 min", "glucides et lipides + O₂", "course longue, cyclisme, match de football"],
        ],
      },
      {
        type: "paragraph",
        title: "Un continuum, pas des cases",
        text: "Les filières fonctionnent simultanément et se relaient : au début d'un effort intense, l'alactique domine ; après quelques secondes, la glycolyse prend le relais ; après deux à trois minutes, l'aérobie devient majoritaire. Un match de sport collectif sollicite donc les trois filières en alternance, ce qui explique la variété des exercices d'entraînement.",
      },
      {
        type: "list",
        title: "Principes de la charge d'entraînement",
        items: [
          "Surcharge progressive : augmenter la charge pour progresser.",
          "Spécificité : l'entraînement doit ressembler à l'activité cible.",
          "Alternance charge / récupération : le progrès se construit pendant la récupération.",
          "Individualisation : adapter à l'âge, au niveau et à l'état de santé.",
          "Réversibilité : les adaptations disparaissent en cas d'arrêt.",
        ],
      },
      {
        type: "table",
        title: "Récupération et surcompensation",
        head: ["Phase", "Ce qui se passe", "Conséquence pratique"],
        rows: [
          ["Fatigue immédiate", "baisse des réserves et de la performance", "ne pas enchaîner un effort maximal"],
          ["Récupération", "reconstitution des réserves", "repos, sommeil, hydratation"],
          ["Surcompensation", "niveau supérieur au niveau initial", "placer la séance suivante à ce moment"],
          ["Retour au niveau initial", "si le délai est trop long", "perte du bénéfice"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Chiffres à retenir",
        text: "Fréquence cardiaque maximale estimée = 220 − âge. Zone aérobie ≈ 60–75 % FCM ; zone seuil ≈ 80–90 % FCM. La récupération active (marche, trot léger) élimine plus vite le lactate qu'un arrêt complet.",
      },
    ],
    keyPoints: [
      "Trois filières : alactique, lactique, aérobie.",
      "Elles se relaient selon l'intensité et la durée.",
      "Surcharge progressive, spécificité, individualisation.",
      "La surcompensation est le moment favorable de la séance suivante.",
    ],
    pitfalls: [
      "Croire que les filières fonctionnent séparément.",
      "Confondre récupération passive et active.",
      "Oublier le rôle du sommeil.",
    ],
    flashcards: [
      {
        question: "Quelle filière domine sur un 100 m ?",
        answer: "La filière anaérobie alactique, puis la glycolyse en fin de course.",
      },
      {
        question: "Qu'est-ce que la surcompensation ?",
        answer: "La phase de récupération où l'organisme reconstitue ses réserves au-delà du niveau initial.",
      },
      {
        question: "Comment estimer la fréquence cardiaque maximale ?",
        answer: "FC max ≈ 220 − âge (estimation, à valider individuellement).",
      },
    ],
    tags: ["sport", "entraînement", "filières énergétiques", "récupération", "lactate"],
  },
  {
    slug: "sport-nutrition-hydratation",
    subjectSlug: "education-physique",
    title: "Nutrition, hydratation et préparation du sportif",
    chapter: "Sciences du sport · Nutrition",
    summary:
      "Équilibrer les apports du sportif avant, pendant et après l'effort, et prévenir la déshydratation.",
    level: "Bac · 4e Sport (T2)",
    durationMin: 28,
    orderIndex: 13,
    objectives: [
      "Connaître le rôle des trois macronutriments",
      "Construire une ration adaptée à l'effort",
      "Prévenir la déshydratation",
      "Éviter les erreurs de préparation alimentaire",
    ],
    blocks: [
      {
        type: "table",
        title: "Les macronutriments",
        head: ["Nutriment", "Rôle énergétique", "Apport conseillé (sportif)"],
        rows: [
          ["Glucides", "4 kcal/g, carburant principal de l'effort intense", "50–60 % de l'apport, davantage avant une compétition"],
          ["Lipides", "9 kcal/g, réserve pour l'effort long modéré", "25–30 %, privilégier les insaturés"],
          ["Protides", "4 kcal/g, construction et réparation musculaire", "1,2–1,6 g/kg/j selon l'activité"],
          ["Eau et électrolytes", "aucun apport énergétique, régulation thermique", "boire avant d'avoir soif"],
          ["Micronutriments", "vitamines et minéraux, sans énergie", "fer, calcium, magnésium"],
        ],
      },
      {
        type: "steps",
        title: "La ration du sportif",
        items: [
          "3 h avant : repas riche en glucides complexes, pauvre en graisses et en fibres, hydratation abondante.",
          "1 h avant : collation légère (fruit, barre, eau).",
          "Pendant : eau toutes les 15–20 min ; boisson glucidique si effort > 1 h.",
          "Dans l'heure qui suit : glucides + protéines pour reconstituer le glycogène et réparer.",
          "Le lendemain : repas équilibré, sommeil suffisant.",
        ],
      },
      {
        type: "paragraph",
        title: "Pourquoi l'hydratation est décisive",
        text: "Une perte de 2 % du poids corporel en eau diminue déjà la performance et la vigilance. La soif apparaît tardivement : il faut donc boire de façon anticipée. À l'inverse, une hyperhydratation excessive avec des boissons très diluées peut provoquer une hyponatrémie. La règle : boire régulièrement, en petites quantités, avec des électrolytes lors des efforts longs.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Ce qu'il ne faut pas faire",
        text: "Sauter le petit-déjeuner avant une compétition, tester une alimentation nouvelle le jour du match, consommer des boissons énergisantes riches en caféine avant l'effort, ou prendre des compléments « miracle » : efficacité non prouvée et risque pour la santé et l'éligibilité.",
      },
    ],
    keyPoints: [
      "Les glucides sont le carburant principal de l'effort intense.",
      "Les protides réparent, les lipides fournissent l'énergie de longue durée.",
      "Boire avant la soif, en petites quantités régulières.",
      "Ne rien changer à son alimentation le jour de la compétition.",
    ],
    pitfalls: [
      "Confondre besoin énergétique et besoin de protéines.",
      "Attendre la soif pour boire.",
      "Oublier la fenêtre de récupération après l'effort.",
    ],
    flashcards: [
      {
        question: "Quel macronutriment est prioritaire avant un effort intense ?",
        answer: "Les glucides, sous forme complexe, pour remplir les réserves de glycogène.",
      },
      {
        question: "À partir de quel pourcentage de perte d'eau la performance baisse-t-elle ?",
        answer: "Dès 2 % du poids corporel.",
      },
      {
        question: "Que faut-il consommer dans l'heure suivant un effort ?",
        answer: "Des glucides associés à des protéines, avec une bonne hydratation.",
      },
    ],
    tags: ["sport", "nutrition", "hydratation", "glucides", "récupération"],
  },
  {
    slug: "sport-pedagogie-didactique",
    subjectSlug: "education-physique",
    title: "Pédagogie, didactique et animation sportive",
    chapter: "Sciences du sport · Pédagogie",
    summary:
      "Construire une séance d'EPS : objectifs, situations d'apprentissage, consignes, feedback et gestion du groupe.",
    level: "Bac · 4e Sport (T3)",
    durationMin: 28,
    orderIndex: 14,
    objectives: [
      "Formuler un objectif opérationnel",
      "Construire les trois temps d'une séance",
      "Donner des consignes efficaces",
      "Différencier selon les niveaux",
    ],
    blocks: [
      {
        type: "steps",
        title: "La structure d'une séance",
        items: [
          "Mise en train (10–15 %) : échauffement général puis spécifique.",
          "Corps de séance (70–75 %) : situations d'apprentissage progressives.",
          "Retour au calme (10–15 %) : étirements, bilan, retour sur les apprentissages.",
        ],
      },
      {
        type: "table",
        title: "Objectif et situation d'apprentissage",
        head: ["Élément", "Définition", "Exemple (basket)"],
        rows: [
          ["Objectif général", "compétence visée à long terme", "jouer en équipe et marquer"],
          ["Objectif opérationnel", "comportement observable et mesurable", "réussir 6 passes en 30 s sans perdre le ballon"],
          ["Situation de référence", "test initial d'évaluation", "match 3 contre 3 chronométré"],
          ["Situation d'apprentissage", "exercice ciblé sur l'obstacle", "jeu de la passe en mouvement avec défenseur passif"],
          ["Critère de réussite", "indicateur de validation", "8 passes sur 10"],
        ],
      },
      {
        type: "list",
        title: "Consignes efficaces",
        items: [
          "Une seule information nouvelle à la fois.",
          "Formulation affirmative et concrète (« passe devant le joueur », pas « ne passe pas derrière »).",
          "Démonstration courte, puis pratique immédiate.",
          "Vérification par reformulation d'un élève.",
          "Feedback immédiat, spécifique et positif avant la correction.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Différencier sans exclure",
        text: "Trois leviers : la taille du terrain ou du ballon, le nombre d'adversaires, la règle du jeu. Différencier ne signifie pas séparer durablement les élèves : on modifie les contraintes pour que tous progressent dans la même situation.",
      },
    ],
    keyPoints: [
      "Une séance = mise en train, corps de séance, retour au calme.",
      "Un objectif opérationnel est observable et mesurable.",
      "Une consigne efficace est unique, affirmative et vérifiée.",
      "Différencier, c'est modifier les contraintes, pas exclure.",
    ],
    pitfalls: [
      "Formuler des objectifs vagues (« progresser »).",
      "Donner trop de consignes à la fois.",
      "Supprimer l'échauffement ou le retour au calme.",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'un objectif opérationnel ?",
        answer: "Un objectif formulé en comportement observable et mesurable, avec un critère de réussite.",
      },
      {
        question: "Quelles sont les trois parties d'une séance ?",
        answer: "La mise en train, le corps de séance et le retour au calme.",
      },
      {
        question: "Comment rendre une consigne efficace ?",
        answer: "Une seule information nouvelle, formulation affirmative, démonstration courte et vérification.",
      },
    ],
    tags: ["sport", "pédagogie", "didactique", "séance", "feedback"],
  },
  {
    slug: "sport-reglementation-arbitrage",
    subjectSlug: "education-physique",
    title: "Réglementation, arbitrage et organisation des compétitions",
    chapter: "Sciences du sport · Réglementation",
    summary:
      "Connaître le cadre réglementaire du sport scolaire et fédéral, les devoirs de l'arbitre et l'organisation d'une compétition.",
    level: "Bac · 4e Sport (T3)",
    durationMin: 28,
    orderIndex: 15,
    objectives: [
      "Distinguer les instances du sport tunisien",
      "Connaître les pouvoirs et devoirs de l'arbitre",
      "Organiser un tournoi à élimination ou en poules",
      "Gérer un incident de match",
    ],
    blocks: [
      {
        type: "table",
        title: "Les instances",
        head: ["Niveau", "Instance", "Rôle"],
        rows: [
          ["Scolaire", "Fédération tunisienne du sport scolaire (FTSS)", "compétitions scolaires, championnats de section"],
          ["National", "Comité national olympique tunisien (CNOT)", "représentation olympique"],
          ["Fédéral", "fédérations par discipline (FTF, FTHB, FTV…)", "règlements, licences, arbitrage"],
          ["International", "CIO, fédérations internationales", "Jeux olympiques, règles mondiales"],
        ],
      },
      {
        type: "list",
        title: "Devoirs de l'arbitre",
        items: [
          "Connaître et appliquer le règlement de la discipline.",
          "Garantir la sécurité et l'intégrité physique des joueurs.",
          "Assurer l'équité : mêmes règles pour les deux équipes.",
          "Sanctionner progressivement : avertissement, exclusion.",
          "Rédiger la feuille de match et signaler les incidents.",
        ],
      },
      {
        type: "steps",
        title: "Organiser une compétition",
        items: [
          "Définir la formule : élimination directe, poules, championnat toutes rondes.",
          "Calculer le nombre de matchs : n − 1 en élimination directe pour n équipes.",
          "Établir le calendrier et les terrains disponibles.",
          "Prévoir arbitres, feuilles de match, table de marque et secours.",
          "Publier le règlement et le classement de façon transparente.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Sécurité d'abord",
        text: "Aucun match ne se joue sans vérification du terrain, des équipements et de la présence d'une trousse de secours. L'arbitre interrompt le jeu en cas de danger, de blessure grave ou de conditions météorologiques extrêmes : c'est un devoir, non un choix.",
      },
    ],
    keyPoints: [
      "FTSS pour le scolaire, fédérations pour le civil.",
      "L'arbitre applique le règlement et protège les joueurs.",
      "n − 1 matchs en élimination directe.",
      "La sécurité prime sur la compétition.",
    ],
    pitfalls: [
      "Confondre instance scolaire et fédérale.",
      "Oublier la feuille de match.",
      "Négliger la sécurité du terrain.",
    ],
    flashcards: [
      {
        question: "Quel est le rôle de la FTSS ?",
        answer: "Organiser et encadrer les compétitions sportives scolaires en Tunisie.",
      },
      {
        question: "Combien de matchs pour un tournoi à élimination directe de 16 équipes ?",
        answer: "15 matchs (n − 1).",
      },
      {
        question: "Quels sont les pouvoirs de l'arbitre ?",
        answer: "Appliquer le règlement, sanctionner, interrompre le jeu et rédiger la feuille de match.",
      },
    ],
    tags: ["sport", "réglementation", "arbitrage", "compétition", "sécurité"],
  },
  {
    slug: "sport-sante-prevention",
    subjectSlug: "education-physique",
    title: "Sport, santé et prévention des blessures",
    chapter: "Sciences du sport · Santé",
    summary:
      "Prévenir les blessures sportives, reconnaître le surentraînement et adapter l'activité aux pathologies chroniques.",
    level: "Bac · 4e Sport (T3)",
    durationMin: 27,
    orderIndex: 16,
    objectives: [
      "Identifier les facteurs de risque de blessure",
      "Appliquer la conduite à tenir devant une blessure",
      "Reconnaître les signes de surentraînement",
      "Adapter l'activité en cas de pathologie",
    ],
    blocks: [
      {
        type: "table",
        title: "Conduite immédiate devant une blessure (RICE)",
        head: ["Étape", "Geste", "Pourquoi"],
        rows: [
          ["Rest", "arrêt immédiat de l'activité", "éviter d'aggraver la lésion"],
          ["Ice", "glace 15–20 min, jamais directement sur la peau", "réduire œdème et douleur"],
          ["Compression", "bandage modéré", "limiter l'épanchement"],
          ["Elevation", "surélever le membre", "favoriser le retour veineux"],
        ],
      },
      {
        type: "list",
        title: "Facteurs de risque",
        items: [
          "Absence ou insuffisance d'échauffement.",
          "Surcharge brutale du volume d'entraînement.",
          "Matériel inadapté ou terrain dégradé.",
          "Fatigue et manque de sommeil.",
          "Antécédents de blessure non rééduquée.",
          "Manque de souplesse et déséquilibres musculaires.",
        ],
      },
      {
        type: "paragraph",
        title: "Le surentraînement",
        text: "Le surentraînement est un état de fatigue chronique dû à un déséquilibre entre charge et récupération. Signes : baisse durable de performance, fréquence cardiaque de repos élevée, troubles du sommeil, irritabilité, perte d'appétit, blessures à répétition. La conduite à tenir est un repos relatif, une réduction de la charge et un avis médical.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Bénéfices de l'activité physique",
        text: "Prévention du surpoids, du diabète de type 2 et des maladies cardio-vasculaires ; amélioration de la densité osseuse, de la santé mentale et du sommeil. L'OMS recommande au moins 60 min d'activité modérée à intense par jour chez l'adolescent.",
      },
    ],
    keyPoints: [
      "RICE : repos, glace, compression, élévation.",
      "L'échauffement et la progressivité préviennent les blessures.",
      "Surentraînement = fatigue chronique et baisse de performance.",
      "L'activité physique régulière est un facteur de santé majeur.",
    ],
    pitfalls: [
      "Mettre de la chaleur immédiatement après une entorse.",
      "Reprendre trop vite après blessure.",
      "Confondre fatigue normale et surentraînement.",
    ],
    flashcards: [
      {
        question: "Que signifie RICE ?",
        answer: "Rest, Ice, Compression, Elevation : les quatre gestes immédiats devant une blessure.",
      },
      {
        question: "Quels signes évoquent un surentraînement ?",
        answer: "Baisse durable de performance, FC de repos élevée, troubles du sommeil et irritabilité.",
      },
      {
        question: "Combien de minutes d'activité l'OMS recommande-t-elle chez l'adolescent ?",
        answer: "Au moins 60 minutes par jour d'activité modérée à intense.",
      },
    ],
    tags: ["sport", "santé", "prévention", "blessure", "surentraînement"],
  },
  {
    slug: "sport-pratique-habilete",
    subjectSlug: "education-physique",
    title: "Épreuve pratique : habiletés techniques de la discipline",
    chapter: "Pratique · Habiletés",
    summary:
      "Préparer l'épreuve pratique : apprentissage moteur, décomposition du geste, correction technique et auto-évaluation.",
    level: "Bac · 4e Sport (T2)",
    durationMin: 27,
    orderIndex: 17,
    objectives: [
      "Analyser un geste technique de sa discipline",
      "Appliquer les étapes de l'apprentissage moteur",
      "Utiliser le feedback pour progresser",
      "Préparer une démonstration notée",
    ],
    blocks: [
      {
        type: "table",
        title: "Les étapes de l'apprentissage moteur",
        head: ["Étape", "Caractéristique", "Rôle de l'élève"],
        rows: [
          ["Cognitive", "le geste est maladroit, coûteux en attention", "observer, comprendre, répéter lentement"],
          ["Associative", "le geste se stabilise, les erreurs diminuent", "varier les situations, ajuster"],
          ["Autonome", "le geste devient automatique et adaptable", "l'intégrer en situation de jeu"],
        ],
      },
      {
        type: "steps",
        title: "Décomposer un geste (exemple : tir au but)",
        items: [
          "Position de départ : appuis, orientation du corps, regard.",
          "Préparation : armé du segment, transfert de poids.",
          "Action : coordination segmentaire, accélération, point de frappe.",
          "Finale : accompagnement du geste, équilibre, replacement.",
          "Erreurs fréquentes : appui trop proche, buste en arrière, absence d'accompagnement.",
        ],
      },
      {
        type: "list",
        title: "Types de feedback",
        items: [
          "Feedback interne : sensations du pratiquant (proprioception).",
          "Feedback externe : observation de l'enseignant ou de la vidéo.",
          "Feedback immédiat et spécifique : plus efficace qu'une correction générale.",
          "Feedback positif d'abord, correctif ensuite : préserve la motivation.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Réussir l'épreuve pratique",
        text: "L'évaluateur note la maîtrise technique mais aussi la capacité à expliquer son geste, à repérer ses erreurs et à proposer une correction. Préparer une fiche personnelle du geste évalué est un avantage décisif.",
      },
    ],
    keyPoints: [
      "Trois étapes : cognitive, associative, autonome.",
      "Un geste s'analyse en préparation, action, finale.",
      "Le feedback immédiat et spécifique fait progresser.",
      "Savoir expliquer et corriger son geste est noté.",
    ],
    pitfalls: [
      "Répéter sans corriger.",
      "Négliger les appuis et l'équilibre.",
      "Utiliser un feedback vague (« c'est bien »).",
    ],
    flashcards: [
      {
        question: "Quelles sont les trois étapes de l'apprentissage moteur ?",
        answer: "Cognitive, associative et autonome.",
      },
      {
        question: "Quel feedback est le plus efficace ?",
        answer: "Un feedback immédiat, spécifique et correctif, précédé d'un point positif.",
      },
      {
        question: "Comment décompose-t-on un geste technique ?",
        answer: "En position de départ, préparation, action et finale.",
      },
    ],
    tags: ["sport", "pratique", "habileté", "apprentissage moteur", "feedback"],
  },
  {
    slug: "sport-pratique-match-arbitrage",
    subjectSlug: "education-physique",
    title: "Épreuve pratique : situation de match et arbitrage",
    chapter: "Pratique · Match",
    summary:
      "Lire le jeu en situation de match, prendre les bonnes décisions et arbitrer de façon cohérente et crédible.",
    level: "Bac · 4e Sport (T3)",
    durationMin: 27,
    orderIndex: 18,
    objectives: [
      "Analyser une situation de jeu et décider vite",
      "Adapter son placement et son arbitrage",
      "Communiquer avec les joueurs sans conflit",
      "S'auto-évaluer après un match",
    ],
    blocks: [
      {
        type: "steps",
        title: "Décider en situation de jeu",
        items: [
          "Percevoir : identifier les espaces libres, les partenaires et les adversaires.",
          "Analyser : évaluer le rapport de force et le risque de la décision.",
          "Décider : choisir l'action la plus efficace (passe, dribble, tir).",
          "Exécuter : réaliser le geste choisi avec précision.",
          "Évaluer : constater l'effet de la décision et ajuster.",
        ],
      },
      {
        type: "table",
        title: "Placement de l'arbitre",
        head: ["Principes", "Pourquoi", "Erreur à éviter"],
        rows: [
          ["Voir la zone de jeu et l'action", "juger l'action et non l'anticipation", "être masqué par les joueurs"],
          ["Rester proche sans gêner", "crédibilité et réactivité", "se placer sur la trajectoire du ballon"],
          ["Suivre le jeu en diagonale", "couvrir l'ensemble du terrain", "rester figé dans l'axe"],
          ["Anticiper les phases", "limiter les courses tardives", "arbitrer de loin"],
        ],
      },
      {
        type: "list",
        title: "Autorité et communication",
        items: [
          "Siffler fort et net, gestes clairs et codifiés.",
          "Expliquer brièvement en cas de contestation, sans débat prolongé.",
          "Utiliser le capitaine comme interlocuteur privilégié.",
          "Sanctionner la faute, jamais la personne.",
          "Rester cohérent du début à la fin : la cohérence fait la crédibilité.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les erreurs qui coûtent cher",
        text: "Siffler tardivement, changer de critère de sanction en cours de match, ou discuter avec un joueur en colère. L'évaluateur observe la constance de vos décisions autant que leur exactitude.",
      },
    ],
    keyPoints: [
      "Décider : percevoir, analyser, choisir, exécuter, évaluer.",
      "Le placement conditionne la qualité de l'arbitrage.",
      "La cohérence est la première qualité de l'arbitre.",
      "On sanctionne la faute, jamais la personne.",
    ],
    pitfalls: [
      "Arbitrer de trop loin.",
      "Siffler avec retard.",
      "Discuter longuement avec les joueurs.",
    ],
    flashcards: [
      {
        question: "Quelles sont les cinq étapes de la décision en jeu ?",
        answer: "Percevoir, analyser, décider, exécuter, évaluer.",
      },
      {
        question: "Pourquoi le placement de l'arbitre est-il décisif ?",
        answer: "Parce qu'il conditionne la visibilité de l'action et donc la justesse de la décision.",
      },
      {
        question: "Que signifie arbitrer de façon cohérente ?",
        answer: "Appliquer le même critère de sanction du début à la fin du match.",
      },
    ],
    tags: ["sport", "pratique", "match", "arbitrage", "décision"],
  },
  {
    slug: "memento-education-physique",
    subjectSlug: "education-physique",
    title: "Mémento : formules, chiffres et notions clés en EPS",
    chapter: "Révision générale",
    summary:
      "Toutes les formules, valeurs de référence et notions indispensables de la partie théorique de l'épreuve.",
    level: "Bac · 4e Sport (REV)",
    durationMin: 25,
    orderIndex: 19,
    objectives: [
      "Mémoriser les formules essentielles",
      "Retenir les valeurs de référence",
      "Réviser les notions par thème",
      "Se préparer à l'oral et à l'écrit",
    ],
    blocks: [
      {
        type: "table",
        title: "Formules et valeurs de référence",
        head: ["Notion", "Formule / valeur", "Usage"],
        rows: [
          ["Fréquence cardiaque maximale", "220 − âge", "calcul des zones d'entraînement"],
          ["Débit cardiaque", "Q = FC × VES", "analyse de la réponse à l'effort"],
          ["Volume d'éjection systolique", "70 mL repos → 130–150 mL à l'effort", "adaptation cardiaque"],
          ["Zone aérobie", "60–75 % FCM", "endurance fondamentale"],
          ["Zone seuil", "80–90 % FCM", "travail lactique"],
          ["Matchs en élimination directe", "n − 1", "organisation de tournoi"],
          ["Âge recommandé de 60 min/j", "OMS adolescent", "santé"],
        ],
      },
      {
        type: "table",
        title: "Mémo par thème",
        head: ["Thème", "À retenir"],
        rows: [
          ["Anatomie", "os, articulations, tendons, ligaments, muscles striés"],
          ["Biomécanique", "levier = appui + force + résistance ; bras de levier ; base de sustentation"],
          ["Filières", "alactique < 10 s, lactique 10 s–2 min, aérobie > 2 min"],
          ["Nutrition", "glucides 50–60 %, protides 1,2–1,6 g/kg, eau avant la soif"],
          ["Pédagogie", "mise en train / corps de séance / retour au calme"],
          ["Réglementation", "FTSS, fédérations, RICE, sécurité prioritaire"],
          ["Prévention", "progressivité, échauffement, sommeil, récupération"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Stratégie de révision",
        text: "Réciter les formules à voix haute, puis les appliquer à un cas concret (un joueur de 17 ans, un 400 m, un tournoi à 8 équipes). Une formule non appliquée est une formule oubliée le jour de l'épreuve.",
      },
    ],
    keyPoints: [
      "FC max = 220 − âge ; Q = FC × VES.",
      "Les trois filières se relaient selon la durée.",
      "Nutrition : glucides avant, glucides + protides après.",
      "Sécurité et progressivité avant performance.",
    ],
    pitfalls: [
      "Apprendre les formules sans les appliquer.",
      "Confondre zone aérobie et zone seuil.",
      "Oublier les valeurs de référence.",
    ],
    flashcards: [
      {
        question: "Quelles zones pour l'endurance et le seuil ?",
        answer: "Endurance : 60–75 % FCM ; seuil : 80–90 % FCM.",
      },
      {
        question: "Quel volume d'éjection systolique à l'effort maximal ?",
        answer: "Environ 130 à 150 mL par battement chez le sujet entraîné.",
      },
      {
        question: "Combien de matchs pour 8 équipes en élimination directe ?",
        answer: "7 matchs (n − 1).",
      },
    ],
    tags: ["sport", "mémento", "formules", "révision", "valeurs"],
  },
];

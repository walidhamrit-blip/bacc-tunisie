import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Sciences de la vie et de la Terre — fiches complémentaires du programme de
 * 4ème année secondaire (sections Mathématiques, Sciences expérimentales,
 * Sciences techniques et Sport) : reproduction humaine, système nerveux et
 * génétique humaine.
 */
export const svtLessons: LessonSeed[] = [
  {
    slug: "reproduction-humaine",
    subjectSlug: "svt",
    title: "Reproduction humaine et maîtrise de la procréation",
    chapter: "Reproduction · Fonctions reproductrices",
    summary:
      "Comprendre la régulation hormonale des fonctions reproductrices chez l'homme et la femme, le cycle ovarien et les moyens de maîtrise de la procréation.",
    level: "Bac · 4e Mathématiques / Sciences (T1)",
    durationMin: 28,
    orderIndex: 10,
    objectives: [
      "Décrire le contrôle hormonal des testicules",
      "Expliquer le cycle ovarien et son synchronisme avec le cycle utérin",
      "Interpréter les rétrocontrôles hypophyso-ovariens",
      "Distinguer les moyens de contraception et leurs modes d'action",
    ],
    blocks: [
      {
        type: "table",
        title: "Les hormones du cycle",
        head: ["Hormone", "Origine", "Effet principal"],
        rows: [
          ["GnRH", "hypothalamus", "stimule l'antéhypophyse"],
          ["FSH", "antéhypophyse", "croissance des follicules / spermatogenèse"],
          ["LH", "antéhypophyse", "ovulation, corps jaune / testostérone"],
          ["Œstradiol", "follicules", "épaississement de l'endomètre, rétrocontrôle"],
          ["Progestérone", "corps jaune", "maintien de l'endomètre, inhibition de FSH/LH"],
          ["Testostérone", "cellules de Leydig", "spermatogenèse et caractères sexuels"],
        ],
      },
      {
        type: "steps",
        title: "Décrire un cycle ovarien en quatre temps",
        items: [
          "Phase folliculaire : sous l'effet de la FSH, un follicule mûrit et sécrète de l'œstradiol.",
          "Pic de LH : il déclenche l'ovulation vers le 14e jour d'un cycle de 28 jours.",
          "Phase lutéale : le corps jaune sécrète de la progestérone et de l'œstradiol.",
          "Régression du corps jaune : la chute hormonale déclenche les règles et lève l'inhibition de la FSH.",
        ],
      },
      {
        type: "list",
        title: "Moyens de maîtrise de la procréation",
        items: [
          "Contraception hormonale (pilule) : inhibe le pic de LH, donc l'ovulation.",
          "Préservatif : barrière mécanique, seule protection contre les IST.",
          "DIU : gêne la nidation ou la mobilité des spermatozoïdes.",
          "Contraception d'urgence : retarde l'ovulation, à utiliser dans les 72 h.",
          "PMA (FIV, ICSI) : assistance à la procréation en cas d'infertilité.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux confusions à éviter",
        text: "La pilule n'empêche pas la nidation : elle empêche l'ovulation par rétrocontrôle négatif. Et l'œstradiol a un rétrocontrôle négatif en début de cycle puis positif avant l'ovulation : cette bascule positive est ce qui déclenche le pic de LH.",
      },
    ],
    keyPoints: [
      "Le couple FSH/LH contrôle les gonades, les hormones sexuelles rétrocontrôlent l'hypophyse.",
      "Le pic de LH déclenche l'ovulation.",
      "Le corps jaune sécrète la progestérone indispensable au maintien de l'endomètre.",
      "La pilule bloque l'ovulation par rétrocontrôle négatif.",
    ],
    pitfalls: [
      "Confondre œstradiol et progestérone dans leur rôle sur l'endomètre.",
      "Oublier le rétrocontrôle positif de l'œstradiol avant l'ovulation.",
      "Attribuer à la pilule un effet abortif.",
    ],
    flashcards: [
      {
        question: "Quelle hormone déclenche l'ovulation ?",
        answer: "Le pic de LH vers le 14e jour du cycle.",
      },
      {
        question: "Quel est le rôle du corps jaune ?",
        answer: "Sécréter de la progestérone qui maintient l'endomètre en vue d'une nidation.",
      },
      {
        question: "Comment agit la pilule contraceptive ?",
        answer: "Par rétrocontrôle négatif, elle bloque le pic de LH et empêche l'ovulation.",
      },
    ],
    tags: ["svt", "reproduction", "hormones", "cycle", "contraception"],
  },
  {
    slug: "reflexe-myotatique",
    subjectSlug: "svt",
    title: "Le réflexe myotatique et le système nerveux",
    chapter: "Système nerveux · Réflexe",
    summary:
      "Suivre le trajet du message nerveux dans un arc réflexe, distinguer tissu nerveux, nerf et centre nerveux, et comprendre le rôle des synapses.",
    level: "Bac · 4e Mathématiques / Sciences exp. (T3)",
    durationMin: 28,
    orderIndex: 11,
    objectives: [
      "Décrire l'arc réflexe du réflexe myotatique",
      "Distinguer neurone sensitif et motoneurone",
      "Expliquer la transmission synaptique",
      "Interpréter une expérience de section ou de stimulation",
    ],
    blocks: [
      {
        type: "steps",
        title: "L'arc réflexe en cinq étapes",
        items: [
          "Le muscle s'étire : les fuseaux neuromusculaires sont stimulés.",
          "Le message sensitif part par le neurone sensitif vers la racine postérieure.",
          "Il atteint la moelle épinière, où s'établit une synapse avec le motoneurone.",
          "Le message moteur repart par la racine antérieure vers le muscle.",
          "Le muscle se contracte : c'est la réponse réflexe, involontaire et rapide.",
        ],
      },
      {
        type: "table",
        title: "Vocabulaire à maîtriser",
        head: ["Terme", "Définition", "Exemple"],
        rows: [
          ["Nerf", "ensemble de fibres nerveuses", "nerf sciatique"],
          ["Centre nerveux", "lieu des synapses intégratrices", "moelle épinière, cerveau"],
          ["Neurone sensitif", "conduit le message des récepteurs vers le centre", "ganglion spinal"],
          ["Motoneurone", "conduit le message du centre vers le muscle", "corne antérieure"],
          ["Synapse", "zone de transmission chimique entre deux neurones", "neuromédiateur"],
          ["Fuseau neuromusculaire", "récepteur sensible à l'étirement", "dans le muscle"],
        ],
      },
      {
        type: "paragraph",
        title: "Le message nerveux est électrique puis chimique",
        text: "Le long de la fibre, le message est un potentiel d'action : une dépolarisation brève et propagée, de loi tout ou rien. Au niveau de la synapse, il devient chimique : le neuromédiateur est libéré dans la fente synaptique, se fixe sur les récepteurs postsynaptiques et y régénère un potentiel. Cette conversion explique le délai synaptique et le sens unique de la transmission.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Interpréter une expérience",
        text: "Section de la racine postérieure ⇒ plus de réponse (le message sensitif ne passe plus). Section de la racine antérieure ⇒ plus de contraction (le message moteur ne passe plus). Stimulation du motoneurone ⇒ contraction, même si le récepteur n'est pas stimulé. Ces trois observations suffisent à prouver le sens de l'arc réflexe.",
      },
    ],
    keyPoints: [
      "Le réflexe myotatique est involontaire, rapide et stéréotypé.",
      "Le message sensitif entre par la racine postérieure, le moteur sort par l'antérieure.",
      "La synapse assure la transmission chimique et l'unidirectionnalité.",
      "Un potentiel d'action obéit à la loi du tout ou rien.",
    ],
    pitfalls: [
      "Inverser racine antérieure et postérieure.",
      "Décrire le message nerveux comme purement électrique.",
      "Confondre nerf et centre nerveux.",
    ],
    flashcards: [
      {
        question: "Par quelle racine entre le message sensitif ?",
        answer: "Par la racine postérieure (dorsale) de la moelle épinière.",
      },
      {
        question: "Quel est le rôle de la synapse ?",
        answer: "Transmettre le message chimiquement d'un neurone à l'autre, dans un seul sens.",
      },
      {
        question: "Que signifie « loi du tout ou rien » ?",
        answer: "Le potentiel d'action a toujours la même amplitude, ou n'existe pas : il ne dépend pas de l'intensité du stimulus, seulement de sa fréquence.",
      },
    ],
    tags: ["svt", "système nerveux", "réflexe", "synapse", "neurone"],
  },
  {
    slug: "genetique-humaine",
    subjectSlug: "svt",
    title: "Génétique humaine et anomalies chromosomiques",
    chapter: "Génétique · Génétique humaine",
    summary:
      "Analyser un arbre généalogique, déterminer le mode de transmission d'un caractère et interpréter une anomalie chromosomique.",
    level: "Bac · 4e Mathématiques / Sciences exp. (T3)",
    durationMin: 28,
    orderIndex: 12,
    objectives: [
      "Distinguer transmission autosomale et liée au sexe",
      "Déterminer le mode de transmission sur un arbre",
      "Interpréter une anomalie chromosomique (trisomie, monosomie)",
      "Utiliser l'échiquier de croisement",
    ],
    blocks: [
      {
        type: "table",
        title: "Les modes de transmission",
        head: ["Mode", "Indice sur l'arbre", "Exemple"],
        rows: [
          ["Autosomale dominante", "toutes les générations touchées", "maladie de Huntington"],
          ["Autosomale récessive", "sauts de génération, consanguinité", "drépanocytose"],
          ["Liée à l'X récessive", "surtout des garçons atteints", "hémophilie, daltonisme"],
          ["Liée à l'X dominante", "filles et garçons, père atteint ⇒ toutes ses filles", "rachitisme carentiel"],
          ["Liée à l'Y", "uniquement les hommes", "transmission père-fils"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — lire un arbre généalogique",
        items: [
          "Compter les atteints par sexe : nette prédominance masculine ⇒ piste liée à l'X.",
          "Chercher un saut de génération : deux parents sains avec un enfant atteint ⇒ récessif.",
          "Vérifier la transmission père → fils : si elle existe pour un caractère, il n'est pas lié à l'X.",
          "Tester chaque hypothèse en écrivant les génotypes probables des parents.",
          "Conclure avec la probabilité demandée, calculée par échiquier de croisement.",
        ],
      },
      {
        type: "table",
        title: "Anomalies chromosomiques",
        head: ["Anomalie", "Cause", "Exemple"],
        rows: [
          ["Trisomie 21", "non-disjonction en méiose I ou II", "3 chromosomes 21"],
          ["Monosomie X (Turner)", "absence d'un chromosome sexuel", "45, X0"],
          ["XXY (Klinefelter)", "surplus de chromosome sexuel", "47, XXY"],
          ["Caryotype normal", "23 paires", "46, XY ou 46, XX"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux erreurs de raisonnement",
        text: "Un caractère récessif ne saute pas les générations « par hasard » : c'est parce que les porteurs hétérozygotes sont sains. Et une non-disjonction peut survenir en méiose I comme en méiose II : les conséquences ne sont pas identiques, il faut le préciser si le sujet le demande.",
      },
    ],
    keyPoints: [
      "Deux parents sains avec un enfant atteint ⇒ caractère récessif.",
      "Une prédominance masculine suppose une transmission liée à l'X.",
      "La transmission père → fils exclut le chromosome X.",
      "Une trisomie résulte d'une non-disjonction méiotique.",
    ],
    pitfalls: [
      "Conclure un mode de transmission sans tester les autres hypothèses.",
      "Oublier que les porteurs hétérozygotes sont sains pour un caractère récessif.",
      "Confondre caryotype et génotype.",
    ],
    flashcards: [
      {
        question: "Que suggère une forte prédominance masculine des atteints ?",
        answer: "Une transmission liée au chromosome X (récessive le plus souvent).",
      },
      {
        question: "Comment prouver qu'un caractère n'est pas lié à l'X ?",
        answer: "En observant une transmission père → fils, impossible si le gène est porté par X.",
      },
      {
        question: "Que révèle un caryotype 47, XXY ?",
        answer: "Un syndrome de Klinefelter : un chromosome X supplémentaire chez un garçon.",
      },
    ],
    tags: ["svt", "génétique", "arbre généalogique", "chromosomes", "caryotype"],
  },
  {
    slug: "memento-svt",
    subjectSlug: "svt",
    title: "Mémento de SVT : reproduction, système nerveux et génétique",
    chapter: "Révision générale",
    summary:
      "Les schémas fonctionnels, les hormones et les raisonnements génétiques à réviser la veille de l'épreuve de sciences naturelles.",
    level: "Bac · Sections scientifiques et Sport (REV)",
    durationMin: 24,
    orderIndex: 20,
    objectives: [
      "Restituer les grandes fonctions et leurs régulations",
      "Retenir les raisonnements génétiques types",
      "Éviter les confusions de vocabulaire",
      "Préparer l'exploitation de documents",
    ],
    blocks: [
      {
        type: "table",
        title: "Les régulations à connaître",
        head: ["Fonction", "Régulation", "Organe clé"],
        rows: [
          ["Glycémie", "insuline / glucagon", "pancréas endocrine"],
          ["Pression artérielle", "baroréflexes, système rénine-angiotensine", "cœur, reins, vaisseaux"],
          ["Fonction reproductrice", "axe hypothalamo-hypophysaire, rétrocontrôles", "gonades"],
          ["Réflexe myotatique", "arc réflexe monosynaptique", "moelle épinière"],
          ["Immunité", "réponse innée puis adaptative", "ganglions, thymus"],
        ],
      },
      {
        type: "list",
        title: "Les raisonnements génétiques types",
        items: [
          "Deux parents sains, un enfant atteint ⇒ caractère récessif.",
          "Un père atteint et toutes ses filles atteintes ⇒ piste dominante liée à l'X.",
          "Une transmission père → fils exclut le chromosome X.",
          "Une prédominance masculine oriente vers un gène porté par X.",
          "Toujours vérifier l'hypothèse par un échiquier de croisement et donner la probabilité.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Exploiter un document en trois temps",
        text: "1) Décrire ce que l'on observe (courbe, schéma, résultat expérimental) ; 2) Interpréter en mobilisant les connaissances ; 3) Conclure en répondant à la question posée. Ne jamais sauter la description : elle est notée.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Confusions à bannir",
        text: "Génotype (ensemble des allèles) ≠ phénotype (caractère observé) ; hormone ≠ neuromédiateur ; nerf ≠ centre nerveux ; mitose (conservatrice) ≠ méiose (réductrice).",
      },
    ],
    keyPoints: [
      "Une régulation hormonale repose sur des rétrocontrôles.",
      "Le réflexe myotatique est monosynaptique et involontaire.",
      "Toute conclusion génétique doit être testée sur un échiquier.",
      "Décrire avant d'interpréter.",
    ],
    pitfalls: [
      "Confondre génotype et phénotype.",
      "Conclure un mode de transmission sans vérifier les alternatives.",
      "Oublier la description du document dans la réponse.",
    ],
    flashcards: [
      {
        question: "Quelles hormones régulent la glycémie ?",
        answer: "L'insuline (hypoglycémiante) et le glucagon (hyperglycémiant), sécrétés par le pancréas.",
      },
      {
        question: "Comment prouver qu'un gène n'est pas porté par X ?",
        answer: "En observant une transmission père → fils.",
      },
      {
        question: "Quelle est la différence entre mitose et méiose ?",
        answer: "La mitose conserve le nombre de chromosomes, la méiose le réduit de moitié.",
      },
    ],
    tags: ["svt", "mémento", "révision", "génétique", "physiologie"],
  },
];

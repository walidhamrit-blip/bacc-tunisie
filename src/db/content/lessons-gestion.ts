import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Gestion — programme de la 4ème année Économie & Gestion : comptabilité
 * générale (charges, produits, résultat, états financiers), gestion des
 * stocks et approvisionnements, comptabilité analytique, contrôle de gestion,
 * marketing, analyse financière et gestion des ressources humaines.
 */
export const gestionLessons: LessonSeed[] = [
  {
    slug: "gest-charges-produits",
    subjectSlug: "gestion",
    title: "Les charges et les produits : formation du résultat",
    chapter: "Comptabilité générale · Résultat",
    summary:
      "Classer les charges et les produits, les enregistrer et calculer le résultat de l'exercice.",
    level: "Bac · 4e Économie & Gestion (T1)",
    durationMin: 26,
    orderIndex: 10,
    objectives: [
      "Distinguer charges et produits",
      "Classer les charges par nature",
      "Calculer le résultat de l'exercice",
      "Enregistrer les écritures de régularisation",
    ],
    blocks: [
      {
        type: "table",
        title: "Les grandes classes",
        head: ["Classe", "Contenu", "Sens"],
        rows: [
          ["Charges d'exploitation", "achats, services extérieurs, personnel, impôts", "débit"],
          ["Charges financières", "intérêts, pertes de change", "débit"],
          ["Charges exceptionnelles", "amendes, cessions d'immobilisations", "débit"],
          ["Produits d'exploitation", "ventes, prestations, subventions", "crédit"],
          ["Produits financiers", "revenus de placements", "crédit"],
          ["Produits exceptionnels", "cessions d'actifs", "crédit"],
        ],
      },
      {
        type: "paragraph",
        title: "Le résultat, une différence",
        text: "Le résultat de l'exercice est la différence entre les produits et les charges de la période : résultat = produits − charges. S'il est positif, c'est un bénéfice ; négatif, une perte. Attention : ce n'est pas un solde de trésorerie. Une entreprise peut être bénéficiaire et manquer de liquidités, ou l'inverse — c'est toute la différence entre résultat et cash.",
      },
      {
        type: "steps",
        title: "Principes de rattachement",
        items: [
          "Rattacher les charges à l'exercice qui les a consommées.",
          "Rattacher les produits à l'exercice qui les a générés.",
          "Enregistrer une charge constatée d'avance si elle concerne l'exercice suivant.",
          "Enregistrer un produit constaté d'avance si la prestation n'est pas encore réalisée.",
          "Passer les écritures de régularisation avant la clôture.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Amortissement : charge sans décaissement",
        text: "Un amortissement est une charge calculée qui constate la dépréciation d'une immobilisation. Il réduit le résultat mais ne correspond à aucune sortie de trésorerie. C'est la question la plus fréquente des exercices de comptabilité.",
      },
    ],
    keyPoints: [
      "Résultat = produits − charges.",
      "Charges d'exploitation, financières et exceptionnelles.",
      "Le principe de rattachement impose les régularisations.",
      "Résultat positif ≠ trésorerie positive.",
    ],
    pitfalls: [
      "Confondre résultat et trésorerie.",
      "Oublier les régularisations de fin d'exercice.",
      "Comptabiliser un amortissement comme un décaissement.",
    ],
    flashcards: [
      {
        question: "Comment calcule-t-on le résultat de l'exercice ?",
        answer: "Produits − charges de la période.",
      },
      {
        question: "Un amortissement est-il un décaissement ?",
        answer: "Non : c'est une charge calculée qui constate la dépréciation d'une immobilisation.",
      },
      {
        question: "Qu'est-ce qu'une charge constatée d'avance ?",
        answer: "Une charge payée pendant l'exercice mais qui concerne l'exercice suivant ; elle est neutralisée.",
      },
    ],
    tags: ["gestion", "comptabilité", "charges", "produits", "résultat"],
  },
  {
    slug: "gest-compte-resultat",
    subjectSlug: "gestion",
    title: "Le compte de résultat et les états financiers",
    chapter: "Comptabilité générale · États financiers",
    summary:
      "Lire un compte de résultat en trois niveaux, un bilan et une annexe, et calculer les soldes intermédiaires de gestion.",
    level: "Bac · 4e Économie & Gestion (T1)",
    durationMin: 27,
    orderIndex: 11,
    objectives: [
      "Lire un compte de résultat",
      "Calculer les soldes intermédiaires",
      "Distinguer bilan et compte de résultat",
      "Interpréter les états financiers",
    ],
    blocks: [
      {
        type: "table",
        title: "Les soldes intermédiaires",
        head: ["Solde", "Calcul", "Signification"],
        rows: [
          ["Marge commerciale", "ventes de marchandises − coût d'achat", "performance commerciale"],
          ["Valeur ajoutée", "marge + production − consommations", "richesse créée"],
          ["EBE", "VA − charges de personnel − impôts", "capacité d'autofinancement d'exploitation"],
          ["Résultat d'exploitation", "EBE − amortissements − provisions", "performance de l'exploitation"],
          ["Résultat financier", "produits financiers − charges financières", "coût du financement"],
          ["Résultat de l'exercice", "REX + RF + exceptionnel", "bénéfice ou perte"],
        ],
      },
      {
        type: "paragraph",
        title: "Bilan et compte de résultat ne disent pas la même chose",
        text: "Le bilan est une photographie du patrimoine à une date donnée (actif et passif) ; le compte de résultat est un film de l'activité sur l'exercice (produits et charges). Le bilan répond à « que possède l'entreprise et comment est-elle financée ? », le compte de résultat à « a-t-elle gagné de l'argent cette année ? ».",
      },
      {
        type: "steps",
        title: "Lire un compte de résultat",
        items: [
          "Repérer les trois niveaux : exploitation, financier, exceptionnel.",
          "Calculer la valeur ajoutée : c'est l'indicateur de richesse créée.",
          "Repérer l'EBE : il mesure la capacité à financer l'investissement et le service de la dette.",
          "Analyser le résultat financier : il révèle le poids de l'endettement.",
          "Conclure sur la rentabilité et la solidité financière.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Valeur ajoutée, le meilleur indicateur",
        text: "La valeur ajoutée mesure la richesse réellement produite par l'entreprise, hors consommations intermédiaires. Elle se répartit ensuite entre salariés, prêteurs, État et actionnaires : c'est le raisonnement à exposer quand une question demande « comment la valeur créée est-elle répartie ? ».",
      },
    ],
    keyPoints: [
      "Bilan = patrimoine à une date ; compte de résultat = activité sur l'exercice.",
      "La valeur ajoutée mesure la richesse créée.",
      "L'EBE mesure la capacité d'autofinancement d'exploitation.",
      "Le résultat financier révèle le poids de la dette.",
    ],
    pitfalls: [
      "Confondre bilan et compte de résultat.",
      "Oublier la marge commerciale pour une entreprise de négoce.",
      "Confondre EBE et résultat net.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre bilan et compte de résultat ?",
        answer: "Le bilan photographie le patrimoine à une date ; le compte de résultat retrace produits et charges sur l'exercice.",
      },
      {
        question: "Que mesure la valeur ajoutée ?",
        answer: "La richesse créée par l'entreprise, égale à la production moins les consommations intermédiaires.",
      },
      {
        question: "Que mesure l'EBE ?",
        answer: "L'excédent brut d'exploitation, c'est-à-dire la capacité d'autofinancement issue de l'exploitation.",
      },
    ],
    tags: ["gestion", "compte de résultat", "bilan", "soldes", "valeur ajoutée"],
  },
  {
    slug: "gest-stocks",
    subjectSlug: "gestion",
    title: "La gestion comptable des stocks",
    chapter: "Comptabilité · Stocks",
    summary:
      "Valoriser les stocks selon les méthodes CMUP et FIFO et enregistrer les écritures d'entrée, de sortie et de régularisation.",
    level: "Bac · 4e Économie & Gestion (T2)",
    durationMin: 26,
    orderIndex: 12,
    objectives: [
      "Valoriser un stock final",
      "Appliquer la méthode du coût moyen unitaire pondéré",
      "Appliquer la méthode FIFO",
      "Enregistrer les écritures de variation de stock",
    ],
    blocks: [
      {
        type: "table",
        title: "Les méthodes de valorisation",
        head: ["Méthode", "Principe", "Effet"],
        rows: [
          ["CMUP après chaque entrée", "coût moyen recalculé à chaque achat", "valeurs lissées"],
          ["CMUP de fin de période", "moyenne pondérée sur la période", "simple, moins précis"],
          ["FIFO (premier entré, premier sorti)", "les plus anciens lots sortent d'abord", "stock final au coût récent"],
          ["LIFO", "les plus récents sortent d'abord", "souvent non autorisé"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — valoriser un stock",
        items: [
          "Repérer les entrées (date, quantité, prix unitaire) et les sorties (date, quantité).",
          "Appliquer la méthode demandée sans mélanger les deux.",
          "Calculer la valeur du stock final.",
          "Calculer la variation de stock : stock final − stock initial.",
          "Enregistrer l'écriture : variation de stock en charge ou en produit selon le sens.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le tableau à double entrée",
        text: "Sur une fiche de stock, utilise toujours trois colonnes : entrées, sorties, existants. La colonne « existants » se recalcule ligne par ligne et sert de contrôle : elle doit toujours être positive et cohérente avec le total.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Variation de stock : le sens",
        text: "Une augmentation de stock est un produit (stockage de richesse) ; une diminution est une charge (déstockage). Inverser les deux est l'erreur la plus fréquente des exercices de clôture.",
      },
    ],
    keyPoints: [
      "CMUP lisse les coûts, FIFO suit les lots réels.",
      "Stock final − stock initial = variation de stock.",
      "Une hausse de stock est un produit, une baisse une charge.",
      "La colonne « existants » sert de contrôle.",
    ],
    pitfalls: [
      "Inverser le sens de la variation de stock.",
      "Mélanger les méthodes de valorisation.",
      "Oublier les frais d'achat dans le coût d'entrée.",
    ],
    flashcards: [
      {
        question: "Quelle est la différence entre CMUP et FIFO ?",
        answer: "Le CMUP valorise au coût moyen pondéré, le FIFO fait sortir les lots dans l'ordre d'arrivée.",
      },
      {
        question: "Comment calcule-t-on la variation de stock ?",
        answer: "Stock final − stock initial.",
      },
      {
        question: "Une diminution de stock est-elle une charge ou un produit ?",
        answer: "Une charge (déstockage).",
      },
    ],
    tags: ["gestion", "stocks", "CMUP", "FIFO", "valorisation"],
  },
  {
    slug: "gest-approvisionnement",
    subjectSlug: "gestion",
    title: "La fonction approvisionnement et le coût de possession",
    chapter: "Gestion · Approvisionnement",
    summary:
      "Calculer les coûts de passation et de possession, déterminer la quantité économique de commande et le point de commande.",
    level: "Bac · 4e Économie & Gestion (T2)",
    durationMin: 27,
    orderIndex: 13,
    objectives: [
      "Décomposer les coûts d'approvisionnement",
      "Calculer la quantité économique de commande",
      "Déterminer le point de commande",
      "Analyser le risque de rupture",
    ],
    blocks: [
      {
        type: "table",
        title: "Les deux coûts à arbitrer",
        head: ["Coût", "Composantes", "Évolue avec"],
        rows: [
          ["Coût de passation", "frais administratifs, transport, réception", "nombre de commandes"],
          ["Coût de possession", "stockage, assurance, obsolescence, immobilisation", "niveau du stock"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — quantité économique",
        items: [
          "Repérer la consommation annuelle (D), le coût de passation (K) et le coût de possession unitaire (h).",
          "Écrire : coût total = K·(D/Q) + h·(Q/2).",
          "Égaliser les deux composantes : K·D/Q = h·Q/2.",
          "La quantité économique est Q* = √(2·D·K/h).",
          "Vérifier l'ordre de grandeur et interpréter : commander peu souvent et en grande quantité ou l'inverse.",
        ],
      },
      {
        type: "table",
        title: "Les indicateurs opérationnels",
        head: ["Indicateur", "Formule", "Usage"],
        rows: [
          ["Point de commande", "consommation pendant le délai + stock de sécurité", "déclencher la commande"],
          ["Stock de sécurité", "consommation × délai × coefficient de risque", "couvrir l'incertitude"],
          ["Rotation des stocks", "consommation / stock moyen", "efficacité"],
          ["Taux de service", "lignes servies / lignes demandées", "qualité de service"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le compromis rentable",
        text: "Un gros stock coûte cher à entretenir ; des commandes fréquentes coûtent cher à lancer. La formule de Wilson trouve exactement l'équilibre : c'est l'argument à expliquer avant le calcul.",
      },
    ],
    keyPoints: [
      "Coût de passation ∝ nombre de commandes ; coût de possession ∝ niveau de stock.",
      "Q* = √(2·D·K/h) (formule de Wilson).",
      "Point de commande = consommation pendant le délai + stock de sécurité.",
      "Rotation des stocks = consommation / stock moyen.",
    ],
    pitfalls: [
      "Confondre coût de passation et coût de possession.",
      "Oublier le stock de sécurité.",
      "Utiliser la consommation mensuelle au lieu de l'annuelle dans Wilson.",
    ],
    flashcards: [
      {
        question: "Que mesure le coût de possession ?",
        answer: "Le coût lié au maintien du stock : stockage, assurance, obsolescence, immobilisation du capital.",
      },
      {
        question: "Quelle est la formule de la quantité économique ?",
        answer: "Q* = √(2·D·K/h), avec D la demande annuelle, K le coût de passation et h le coût de possession unitaire.",
      },
      {
        question: "Comment calcule-t-on le point de commande ?",
        answer: "Consommation pendant le délai d'approvisionnement augmentée du stock de sécurité.",
      },
    ],
    tags: ["gestion", "approvisionnement", "Wilson", "stock de sécurité", "coûts"],
  },
  {
    slug: "gest-couts-complets",
    subjectSlug: "gestion",
    title: "Les coûts complets : centres d'analyse et imputation",
    chapter: "Comptabilité analytique · Coûts complets",
    summary:
      "Calculer un coût complet en répartissant les charges indirectes par les centres d'analyse, et déterminer un résultat par produit.",
    level: "Bac · 4e Économie & Gestion (T2)",
    durationMin: 28,
    orderIndex: 14,
    objectives: [
      "Distinguer charges directes et indirectes",
      "Répartir les charges par centres d'analyse",
      "Calculer un coût d'unité d'œuvre",
      "Déterminer le coût complet et le résultat",
    ],
    blocks: [
      {
        type: "table",
        title: "Les étapes du calcul",
        head: ["Étape", "Contenu", "Résultat"],
        rows: [
          ["Charges par nature", "achats, personnel, énergie", "total des charges"],
          ["Répartition primaire", "charges directes + indirectes par centre", "coût du centre"],
          ["Répartition secondaire", "échange de prestations entre centres", "centres auxiliaires répartis"],
          ["Unité d'œuvre", "unité de mesure de l'activité du centre", "coût unitaire"],
          ["Imputation au produit", "coût direct + charges indirectes imputées", "coût complet"],
        ],
      },
      {
        type: "steps",
        title: "Méthode complète",
        items: [
          "Classer les charges en directes et indirectes.",
          "Répartir les indirectes sur les centres d'analyse.",
          "Répartir les centres auxiliaires sur les centres principaux.",
          "Calculer le coût d'unité d'œuvre de chaque centre principal : coût du centre / nombre d'unités d'œuvre.",
          "Imputer au produit : coût direct + (coût unitaire d'œuvre × nombre d'unités d'œuvre consommées).",
        ],
      },
      {
        type: "table",
        title: "Unités d'œuvre usuelles",
        head: ["Centre", "Unité d'œuvre", "Exemple"],
        rows: [
          ["Atelier", "heure machine ou heure ouvrier", "3 h machine par produit"],
          ["Achat", "nombre de commandes fournisseurs", "10 commandes"],
          ["Distribution", "nombre de colis ou chiffre d'affaires", "500 colis"],
          ["Administration", "heure de travail ou produit", "répartition au prorata"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le piège de la répartition secondaire",
        text: "Un centre auxiliaire qui fournit des prestations à un autre centre auxiliaire impose un système de répartition (en escalier, croisée ou algébrique). Choisir la mauvaise méthode fausse tous les coûts en cascade. Lis toujours l'énoncé avant de répartir.",
      },
    ],
    keyPoints: [
      "Charges directes : affectées ; indirectes : réparties.",
      "Unité d'œuvre = mesure de l'activité d'un centre.",
      "Coût complet = direct + indirect imputé.",
      "Le résultat par produit = prix de vente − coût complet.",
    ],
    pitfalls: [
      "Imputer une charge directe à un centre.",
      "Oublier la répartition secondaire.",
      "Choisir une unité d'œuvre sans lien avec l'activité.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre charge directe et indirecte ?",
        answer: "La directe est affectable sans calcul au produit ; l'indirecte doit être répartie par les centres d'analyse.",
      },
      {
        question: "Comment calcule-t-on un coût d'unité d'œuvre ?",
        answer: "Coût du centre divisé par le nombre d'unités d'œuvre du centre.",
      },
      {
        question: "Comment obtient-on le coût complet d'un produit ?",
        answer: "Coût direct + charges indirectes imputées via les unités d'œuvre.",
      },
    ],
    tags: ["gestion", "coûts complets", "centres d'analyse", "unité d'œuvre", "analytique"],
  },
  {
    slug: "gest-couts-partiels",
    subjectSlug: "gestion",
    title: "Les coûts partiels, le seuil de rentabilité et le coût marginal",
    chapter: "Comptabilité analytique · Coûts partiels",
    summary:
      "Distinguer charges fixes et variables, calculer le seuil de rentabilité et exploiter la marge sur coût variable.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 27,
    orderIndex: 15,
    objectives: [
      "Séparer charges fixes et variables",
      "Calculer la marge sur coût variable",
      "Déterminer le seuil de rentabilité",
      "Utiliser le coût marginal",
    ],
    blocks: [
      {
        type: "table",
        title: "Les indicateurs",
        head: ["Indicateur", "Formule", "Signification"],
        rows: [
          ["Marge sur coût variable", "MCA = CA − charges variables", "contribution à couvrir les fixes"],
          ["Taux de MCA", "MCA / CA", "marge par dinar de vente"],
          ["Seuil de rentabilité", "SR = charges fixes / taux de MCA", "CA minimum pour ne pas perdre"],
          ["Point mort", "SR / CA × 12", "date d'atteinte en mois"],
          ["Marge de sécurité", "CA − SR", "marge avant la perte"],
          ["Indice de sécurité", "marge de sécurité / CA", "risque relatif"],
        ],
      },
      {
        type: "steps",
        title: "Calculer un seuil de rentabilité",
        items: [
          "Classer les charges en fixes et variables.",
          "Calculer les charges variables et les charges fixes totales.",
          "Calculer la marge sur coût variable = CA − charges variables.",
          "Calculer le taux de MCA = MCA / CA.",
          "Appliquer SR = CF / taux de MCA, puis convertir éventuellement en date (point mort).",
        ],
      },
      {
        type: "paragraph",
        title: "L'intérêt du coût marginal",
        text: "Le coût marginal est le coût de la dernière unité produite. Comparer le coût marginal au prix de vente permet de décider d'accepter ou non une commande supplémentaire : tant que le prix couvre le coût marginal, la commande apporte une contribution positive, même si le coût complet n'est pas couvert. Attention : cette logique ne vaut qu'à court terme, quand les charges fixes sont déjà engagées.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Deux erreurs de raisonnement",
        text: "1) Comparer le prix de la commande supplémentaire au coût complet au lieu du coût marginal. 2) Oublier de vérifier la capacité disponible. Ces deux oublis transforment une décision rentable en refus infondé — ou l'inverse.",
      },
    ],
    keyPoints: [
      "MCA = CA − charges variables.",
      "SR = charges fixes / taux de MCA.",
      "Point mort = SR / CA × 12 (en mois).",
      "Une commande est rentable si son prix couvre le coût marginal.",
    ],
    pitfalls: [
      "Classer une charge semi-variable comme fixe ou variable sans justification.",
      "Oublier de convertir le seuil en date.",
      "Comparer le prix au coût complet pour une commande marginale.",
    ],
    flashcards: [
      {
        question: "Comment calcule-t-on le seuil de rentabilité ?",
        answer: "Charges fixes divisées par le taux de marge sur coût variable.",
      },
      {
        question: "Que mesure la marge sur coût variable ?",
        answer: "La contribution de l'activité à la couverture des charges fixes.",
      },
      {
        question: "Quand accepter une commande supplémentaire ?",
        answer: "Lorsque le prix proposé couvre le coût marginal et que la capacité le permet.",
      },
    ],
    tags: ["gestion", "seuil de rentabilité", "coût variable", "coût marginal", "point mort"],
  },
  {
    slug: "gest-controle-budgetaire",
    subjectSlug: "gestion",
    title: "Le contrôle budgétaire et l'analyse des écarts",
    chapter: "Contrôle de gestion · Écarts",
    summary:
      "Construire un budget, calculer un écart sur chiffre d'affaires ou sur coût, et l'analyser en écart sur prix et sur quantité.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 27,
    orderIndex: 16,
    objectives: [
      "Élaborer un budget flexible",
      "Calculer un écart global",
      "Décomposer en écart sur prix et sur quantité",
      "Interpréter un écart favorable ou défavorable",
    ],
    blocks: [
      {
        type: "table",
        title: "Les types d'écarts",
        head: ["Écart", "Calcul", "Lecture"],
        rows: [
          ["Écart sur CA", "CA réel − CA prévu", "favorable si positif"],
          ["Écart sur coût", "coût prévu − coût réel", "favorable si positif"],
          ["Écart sur prix", "(prix réel − prix prévu) × quantité réelle", "effet du prix"],
          ["Écart sur quantité", "(quantité réelle − quantité prévue) × prix prévu", "effet du volume"],
          ["Écart global", "écart sur prix + écart sur quantité", "somme des deux"],
        ],
      },
      {
        type: "steps",
        title: "Analyser un écart",
        items: [
          "Repérer le budget prévu et les réalisations.",
          "Calculer l'écart global et son signe (favorable ou défavorable).",
          "Décomposer en écart sur prix et écart sur quantité.",
          "Identifier la cause la plus probable : négociation, inflation, productivité.",
          "Proposer une action corrective réaliste.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Un écart n'est pas une faute",
        text: "Un écart favorable peut cacher une dégradation de qualité ; un écart défavorable peut venir d'une hausse des prix subie. Toujours expliquer l'écart avant de proposer une correction : c'est ce que distingue une copie de contrôle de gestion.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le signe compte autant que la valeur",
        text: "Sur les charges, un écart est favorable quand le coût réel est inférieur au coût prévu. Sur les produits, il est favorable quand le chiffre d'affaires réel dépasse le prévu. Ne jamais l'appliquer mécaniquement sans réfléchir au sens.",
      },
    ],
    keyPoints: [
      "Écart global = écart sur prix + écart sur quantité.",
      "Un écart favorable sur les charges = coût réel inférieur.",
      "Un écart sur les produits favorable = CA réel supérieur.",
      "Tout écart doit être expliqué, pas seulement calculé.",
    ],
    pitfalls: [
      "Inverser le signe d'un écart de charge.",
      "Oublier de décomposer l'écart global.",
      "Proposer une correction sans identifier la cause.",
    ],
    flashcards: [
      {
        question: "Quand un écart sur charge est-il favorable ?",
        answer: "Lorsque le coût réel est inférieur au coût prévu.",
      },
      {
        question: "Comment décompose-t-on un écart global ?",
        answer: "En écart sur prix et écart sur quantité.",
      },
      {
        question: "Pourquoi un écart favorable peut-il être inquiétant ?",
        answer: "Parce qu'il peut refléter une baisse de qualité ou un sous-investissement caché.",
      },
    ],
    tags: ["gestion", "contrôle budgétaire", "écarts", "budget", "analyse"],
  },
  {
    slug: "gest-etude-marche",
    subjectSlug: "gestion",
    title: "L'étude de marché : demande, offre et concurrence",
    chapter: "Marketing · Marché",
    summary:
      "Structurer une étude de marché, estimer la demande potentielle et analyser la concurrence.",
    level: "Bac · 4e Économie & Gestion (T2)",
    durationMin: 26,
    orderIndex: 17,
    objectives: [
      "Distinguer étude documentaire et étude de terrain",
      "Estimer la demande potentielle",
      "Analyser la concurrence",
      "Segmenter un marché",
    ],
    blocks: [
      {
        type: "table",
        title: "Les étapes de l'étude",
        head: ["Étape", "Contenu", "Outils"],
        rows: [
          ["Problème de marché", "formuler la question à résoudre", "brief"],
          ["Étude documentaire", "sources existantes", "statistiques, presse, rapports"],
          ["Étude qualitative", "comprendre les motivations", "entretiens, réunions de groupe"],
          ["Étude quantitative", "mesurer les comportements", "questionnaire, sondage"],
          ["Analyse et décision", "interpréter et recommander", "tableaux croisés"],
        ],
      },
      {
        type: "steps",
        title: "Estimer une demande potentielle",
        items: [
          "Calcule la population cible à partir des données démographiques.",
          "Applique un taux de pénétration ou de notoriété estimé.",
          "Multiplie par la fréquence d'achat annuelle.",
          "Multiplie par le prix moyen de vente.",
          "Compare le résultat à la capacité de production et au seuil de rentabilité.",
        ],
      },
      {
        type: "table",
        title: "Analyser la concurrence",
        head: ["Type de concurrent", "Définition", "Exemple"],
        rows: [
          ["Direct", "même produit, même marché", "deux opérateurs téléphoniques"],
          ["Indirect", "produit substitut", "café vs thé"],
          ["Potentiel", "pourrait entrer sur le marché", "distributeur qui lance sa marque"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "La segmentation, clé du positionnement",
        text: "Segmenter, c'est découper le marché en groupes homogènes (âge, revenus, style de vie). Le positionnement consiste à choisir le segment et l'image à occuper. Une étude de marché sans segmentation reste une accumulation de données sans décision.",
      },
    ],
    keyPoints: [
      "Étude documentaire puis qualitative puis quantitative.",
      "Demande potentielle = cible × taux de pénétration × fréquence × prix.",
      "Concurrence directe, indirecte et potentielle.",
      "Segmenter avant de se positionner.",
    ],
    pitfalls: [
      "Confondre étude qualitative et quantitative.",
      "Oublier la fréquence d'achat dans l'estimation de la demande.",
      "Ignorer la concurrence indirecte.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre étude qualitative et quantitative ?",
        answer: "La qualitative explore les motivations, la quantitative mesure les comportements sur un échantillon représentatif.",
      },
      {
        question: "Qu'est-ce qu'un concurrent indirect ?",
        answer: "Une entreprise proposant un produit substitut qui satisfait le même besoin autrement.",
      },
      {
        question: "Comment estimer une demande potentielle en valeur ?",
        answer: "Cible × taux de pénétration × fréquence d'achat × prix moyen.",
      },
    ],
    tags: ["gestion", "marketing", "marché", "segmentation", "concurrence"],
  },
  {
    slug: "gest-politique-commerciale",
    subjectSlug: "gestion",
    title: "La politique commerciale : produit, prix, distribution, communication",
    chapter: "Marketing · Mix",
    summary:
      "Construire un marketing-mix cohérent et justifier les décisions de prix, de distribution et de communication.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 27,
    orderIndex: 18,
    objectives: [
      "Élaborer un marketing-mix cohérent",
      "Choisir une stratégie de prix",
      "Comparer les circuits de distribution",
      "Choisir un média de communication",
    ],
    blocks: [
      {
        type: "table",
        title: "Les quatre leviers du mix",
        head: ["Levier", "Décisions", "Critères"],
        rows: [
          ["Produit", "gamme, qualité, conditionnement, marque", "cible, positionnement"],
          ["Prix", "pénétration, écumage, alignement", "coûts, concurrence, élasticité"],
          ["Distribution", "directe, courte, longue, en ligne", "couverture, coût, contrôle"],
          ["Communication", "publicité, promotion, relations publiques, digitale", "budget, cible, mesure"],
        ],
      },
      {
        type: "table",
        title: "Stratégies de prix",
        head: ["Stratégie", "Principe", "Quand l'utiliser"],
        rows: [
          ["Écrémage", "prix élevé au lancement", "innovation, demande peu élastique"],
          ["Pénétration", "prix bas pour gagner des parts", "marché concurrentiel, effets d'échelle"],
          ["Alignement", "prix proche des concurrents", "marché mature"],
          ["Prix psychologique", "9,990 dt au lieu de 10", "produits de grande consommation"],
        ],
      },
      {
        type: "steps",
        title: "Justifier un marketing-mix",
        items: [
          "Rappeler la cible et le positionnement choisis.",
          "Définir le produit et son conditionnement en cohérence.",
          "Fixer le prix en fonction des coûts, de la concurrence et de la demande.",
          "Choisir le circuit de distribution selon la couverture voulue.",
          "Choisir les actions de communication et définir un indicateur de suivi.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "La cohérence avant tout",
        text: "Un produit haut de gamme vendu en discount avec une promotion permanente envoie un message contradictoire et détruit le positionnement. Le correcteur évalue surtout la cohérence entre les quatre leviers, pas la créativité isolée.",
      },
    ],
    keyPoints: [
      "Le mix = produit, prix, distribution, communication.",
      "Écrémage pour innover, pénétration pour conquérir.",
      "Le circuit court donne du contrôle, le long donne de la couverture.",
      "La cohérence du mix prime sur l'originalité.",
    ],
    pitfalls: [
      "Choisir un prix sans référence aux coûts.",
      "Proposer une communication sans cible définie.",
      "Oublier la cohérence entre prix et distribution.",
    ],
    flashcards: [
      {
        question: "Quels sont les quatre leviers du marketing-mix ?",
        answer: "Produit, prix, distribution (place) et communication (promotion).",
      },
      {
        question: "Quand utiliser une stratégie de pénétration ?",
        answer: "Sur un marché concurrentiel où l'on cherche à gagner rapidement des parts grâce à un prix bas.",
      },
      {
        question: "Quel est l'avantage d'un circuit court ?",
        answer: "Un meilleur contrôle de la distribution et une marge mieux maîtrisée.",
      },
    ],
    tags: ["gestion", "marketing", "marketing-mix", "prix", "distribution"],
  },
  {
    slug: "gest-bilan-fonctionnel",
    subjectSlug: "gestion",
    title: "Le bilan fonctionnel et les ratios financiers",
    chapter: "Analyse financière · Bilan",
    summary:
      "Construire un bilan fonctionnel, calculer le fonds de roulement, le besoin en fonds de roulement et la trésorerie nette, puis les ratios clés.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 28,
    orderIndex: 19,
    objectives: [
      "Construire un bilan fonctionnel",
      "Calculer FR, BFR et TN",
      "Interpréter la structure financière",
      "Calculer les ratios d'endettement et de rentabilité",
    ],
    blocks: [
      {
        type: "table",
        title: "Les trois indicateurs",
        head: ["Indicateur", "Formule", "Lecture"],
        rows: [
          ["Fonds de roulement (FR)", "ressources stables − emplois stables", "marge de sécurité"],
          ["Besoin en fonds de roulement (BFR)", "actif circulant d'exploitation − passif circulant d'exploitation", "besoin du cycle"],
          ["Trésorerie nette (TN)", "FR − BFR", "disponibilités réelles"],
        ],
      },
      {
        type: "table",
        title: "Les ratios clés",
        head: ["Ratio", "Formule", "Interprétation"],
        rows: [
          ["Autonomie financière", "capitaux propres / total des ressources", "> 30 % rassurant"],
          ["Endettement", "dettes / capitaux propres", "< 1 souhaitable"],
          ["Rentabilité économique", "résultat d'exploitation / total actif", "efficacité de l'actif"],
          ["Rentabilité financière", "résultat net / capitaux propres", "rendement pour l'actionnaire"],
          ["Liquidité générale", "actif circulant / passif circulant", "> 1 rassurant"],
        ],
      },
      {
        type: "steps",
        title: "Diagnostiquer une structure financière",
        items: [
          "Calculer FR, BFR et TN.",
          "Si FR > BFR : trésorerie positive, la structure est saine.",
          "Si FR < BFR : trésorerie négative, risque de tension de liquidité.",
          "Calculer les ratios d'endettement et de rentabilité.",
          "Conclure sur la solidité, la rentabilité et le risque.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le raisonnement FR / BFR",
        text: "Le FR mesure les ressources disponibles après financement des investissements ; le BFR mesure ce que le cycle d'exploitation consomme. La trésorerie est ce qui reste : TN = FR − BFR. Un BFR structurellement élevé (clients qui paient tard) peut asphyxier une entreprise rentable.",
      },
    ],
    keyPoints: [
      "FR = ressources stables − emplois stables.",
      "BFR = actif circulant d'exploitation − passif circulant d'exploitation.",
      "TN = FR − BFR.",
      "Une entreprise rentable peut manquer de trésorerie.",
    ],
    pitfalls: [
      "Confondre FR et trésorerie.",
      "Oublier les comptes de régularisation dans le bilan fonctionnel.",
      "Conclure sur la santé financière à partir d'un seul ratio.",
    ],
    flashcards: [
      {
        question: "Comment calcule-t-on la trésorerie nette ?",
        answer: "TN = FR − BFR.",
      },
      {
        question: "Que signifie un BFR supérieur au FR ?",
        answer: "Que la trésorerie est négative : le cycle d'exploitation consomme plus que les ressources stables ne le permettent.",
      },
      {
        question: "Quel ratio mesure l'indépendance financière ?",
        answer: "Capitaux propres / total des ressources (autonomie financière).",
      },
    ],
    tags: ["gestion", "analyse financière", "FR", "BFR", "ratios"],
  },
  {
    slug: "gest-financement-investissement",
    subjectSlug: "gestion",
    title: "Le tableau de financement et les décisions d'investissement",
    chapter: "Analyse financière · Investissement",
    summary:
      "Analyser le financement d'un investissement : autofinancement, emprunt, critères de rentabilité (VAN, TRI, délai de récupération).",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 27,
    orderIndex: 20,
    objectives: [
      "Distinguer les modes de financement",
      "Calculer une capacité d'autofinancement",
      "Calculer une VAN et un délai de récupération",
      "Choisir entre deux projets",
    ],
    blocks: [
      {
        type: "table",
        title: "Les critères de choix",
        head: ["Critère", "Principe", "Décision"],
        rows: [
          ["VAN (valeur actuelle nette)", "Σ flux actualisés − investissement", "VAN > 0 ⇒ projet rentable"],
          ["TRI (taux de rentabilité interne)", "taux annulant la VAN", "TRI > taux exigé ⇒ accepté"],
          ["Délai de récupération", "temps pour récupérer l'investissement", "plus court = moins risqué"],
          ["Indice de profitabilité", "VAN / investissement", "compare des projets de tailles différentes"],
        ],
      },
      {
        type: "steps",
        title: "Évaluer un projet",
        items: [
          "Lister les flux de trésorerie année par année (investissement initial négatif).",
          "Choisir le taux d'actualisation (coût du capital).",
          "Actualiser chaque flux : Fₙ/(1+t)ⁿ.",
          "Sommer les flux actualisés et retrancher l'investissement : c'est la VAN.",
          "Calculer le délai de récupération et comparer les projets si nécessaire.",
        ],
      },
      {
        type: "paragraph",
        title: "Financement : fonds propres ou dette ?",
        text: "L'autofinancement évite les intérêts mais réduit les liquidités ; l'emprunt conserve la trésorerie mais crée une charge fixe et un risque. Le choix dépend de la rentabilité du projet, de la structure financière existante et du coût du crédit. Un projet rentable peut être refusé par prudence si la capacité d'endettement est déjà saturée.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Actualiser, pas simplement additionner",
        text: "Un dinar encaissé dans trois ans vaut moins d'un dinar aujourd'hui. Additionner des flux sans actualisation surestime systématiquement la rentabilité : c'est l'erreur la plus lourde dans les exercices de choix d'investissement.",
      },
    ],
    keyPoints: [
      "VAN > 0 : le projet est rentable au taux exigé.",
      "Actualiser chaque flux avant de les sommer.",
      "Le délai de récupération mesure le risque.",
      "L'autofinancement évite la dette mais consomme la trésorerie.",
    ],
    pitfalls: [
      "Oublier d'actualiser les flux.",
      "Confondre VAN et TRI.",
      "Comparer des projets de tailles différentes sans indice de profitabilité.",
    ],
    flashcards: [
      {
        question: "Quand un projet est-il acceptable selon la VAN ?",
        answer: "Lorsque sa valeur actuelle nette est positive au taux d'actualisation retenu.",
      },
      {
        question: "Qu'est-ce que le TRI ?",
        answer: "Le taux d'actualisation qui annule la VAN : le rendement propre du projet.",
      },
      {
        question: "Pourquoi actualiser les flux ?",
        answer: "Parce qu'un revenu futur a moins de valeur qu'un revenu immédiat, à cause du temps et du risque.",
      },
    ],
    tags: ["gestion", "investissement", "VAN", "TRI", "financement"],
  },
  {
    slug: "gest-ressources-humaines",
    subjectSlug: "gestion",
    title: "La gestion des ressources humaines",
    chapter: "Gestion · RH",
    summary:
      "Comprendre le recrutement, la formation, l'évaluation et la gestion des compétences, et leurs enjeux pour la performance.",
    level: "Bac · 4e Économie & Gestion (T3)",
    durationMin: 25,
    orderIndex: 21,
    objectives: [
      "Décrire le processus de recrutement",
      "Distinguer formation et développement des compétences",
      "Comprendre les outils d'évaluation",
      "Relier GRH et performance",
    ],
    blocks: [
      {
        type: "steps",
        title: "Le processus de recrutement",
        items: [
          "Analyse du besoin : définir le poste et le profil (fiche de poste).",
          "Sourcing : interne (mobilité) ou externe (annonce, réseau, école).",
          "Sélection : tri des candidatures, entretiens, tests.",
          "Intégration : accueil, formation initiale, période d'essai.",
          "Évaluation : vérifier l'adéquation et ajuster le rôle.",
        ],
      },
      {
        type: "table",
        title: "Les outils de la GRH",
        head: ["Outil", "Objet", "Risque s'il est mal utilisé"],
        rows: [
          ["Plan de formation", "développer les compétences", "formation décorative sans effet"],
          ["Entretien d'évaluation", "mesurer la performance et fixer des objectifs", "subjectivité, démotivation"],
          ["Grille de compétences", "cartographier les savoir-faire", "obsolescence rapide"],
          ["Rémunération variable", "aligner intérêts et performance", "effet pervers à court terme"],
          ["Gestion des carrières", "fidéliser les talents", "promotion sans compétence"],
        ],
      },
      {
        type: "paragraph",
        title: "La GRH, ressource stratégique",
        text: "Le capital humain est devenu un facteur de compétitivité : la capacité à attirer, former et fidéliser les compétences conditionne l'innovation et la qualité. La GRH ne se réduit donc pas à l'administration du personnel : elle relie les compétences aux objectifs stratégiques de l'entreprise.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Lien avec l'économie",
        text: "Un investissement en formation améliore la productivité du travail, donc la croissance intensive. Ce pont entre GRH et économie est souvent valorisé dans les sujets de synthèse.",
      },
    ],
    keyPoints: [
      "Recruter, former, évaluer, fidéliser : quatre fonctions.",
      "Le capital humain est un facteur de compétitivité.",
      "La formation améliore la productivité.",
      "L'évaluation doit être outillée pour éviter la subjectivité.",
    ],
    pitfalls: [
      "Réduire la GRH à la paie et à l'administration.",
      "Oublier l'étape d'intégration.",
      "Confondre évaluation et sanction.",
    ],
    flashcards: [
      {
        question: "Quelles sont les grandes étapes du recrutement ?",
        answer: "Analyse du besoin, sourcing, sélection, intégration, évaluation.",
      },
      {
        question: "Pourquoi la formation est-elle un investissement ?",
        answer: "Parce qu'elle accroît les compétences et donc la productivité et la qualité du travail.",
      },
      {
        question: "Quel est le risque d'une évaluation mal outillée ?",
        answer: "La subjectivité, l'iniquité perçue et la démotivation des salariés.",
      },
    ],
    tags: ["gestion", "RH", "recrutement", "formation", "compétences"],
  },
  {
    slug: "memento-gestion",
    subjectSlug: "gestion",
    title: "Mémento de gestion : formules comptables et financières",
    chapter: "Révision générale",
    summary:
      "Toutes les formules de comptabilité, d'analyse des coûts et de finance à relire avant l'épreuve de gestion.",
    level: "Bac · 4e Économie & Gestion (REV)",
    durationMin: 26,
    orderIndex: 22,
    objectives: [
      "Restituer les formules de comptabilité",
      "Retenir les formules de coûts",
      "Mémoriser les indicateurs financiers",
      "Éviter les confusions classiques",
    ],
    blocks: [
      {
        type: "table",
        title: "Comptabilité générale",
        head: ["Notion", "Formule"],
        rows: [
          ["Résultat", "produits − charges"],
          ["Valeur ajoutée", "production − consommations intermédiaires"],
          ["EBE", "VA − charges de personnel − impôts"],
          ["Variation de stock", "stock final − stock initial"],
          ["Amortissement linéaire", "valeur d'origine / durée d'utilisation"],
        ],
      },
      {
        type: "table",
        title: "Coûts et contrôle",
        head: ["Notion", "Formule"],
        rows: [
          ["Marge sur coût variable", "CA − charges variables"],
          ["Seuil de rentabilité", "charges fixes / taux de MCA"],
          ["Quantité économique", "√(2·D·K/h)"],
          ["Coût d'unité d'œuvre", "coût du centre / unités d'œuvre"],
          ["Écart sur prix", "(prix réel − prix prévu) × quantité réelle"],
        ],
      },
      {
        type: "table",
        title: "Analyse financière",
        head: ["Notion", "Formule"],
        rows: [
          ["Fonds de roulement", "ressources stables − emplois stables"],
          ["BFR", "actif circulant d'exploitation − passif circulant d'exploitation"],
          ["Trésorerie nette", "FR − BFR"],
          ["Autonomie financière", "capitaux propres / total des ressources"],
          ["VAN", "Σ flux actualisés − investissement"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Quatre réflexes de rédaction",
        text: "1) Poser la formule littérale. 2) Remplacer avec les unités. 3) Donner le résultat avec son unité (dt, %, années). 4) Conclure par une phrase d'interprétation. Ce quadruple réflexe vaut la moitié des points de calcul.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Confusions à bannir",
        text: "Résultat ≠ trésorerie ; déficit ≠ dette ; charge directe ≠ charge fixe ; FR ≠ BFR ; chiffre d'affaires ≠ marge. Et un amortissement n'est pas un décaissement.",
      },
    ],
    keyPoints: [
      "Poser la formule avant tout calcul.",
      "Résultat et trésorerie sont deux notions distinctes.",
      "FR − BFR = trésorerie nette.",
      "Toujours interpréter le résultat obtenu.",
    ],
    pitfalls: [
      "Confondre charge directe et charge fixe.",
      "Oublier les unités dans les résultats.",
      "Conclure sans phrase d'interprétation.",
    ],
    flashcards: [
      {
        question: "Comment calcule-t-on l'amortissement linéaire ?",
        answer: "Valeur d'origine divisée par la durée d'utilisation.",
      },
      {
        question: "Quelle est la différence entre résultat et trésorerie ?",
        answer: "Le résultat mesure la performance comptable, la trésorerie mesure les liquidités disponibles.",
      },
      {
        question: "Que vaut la trésorerie nette ?",
        answer: "FR − BFR.",
      },
    ],
    tags: ["gestion", "mémento", "révision", "formules", "comptabilité"],
  },
];

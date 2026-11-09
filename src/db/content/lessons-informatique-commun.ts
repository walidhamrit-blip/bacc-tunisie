import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Informatique du tronc commun (sections Mathématiques, Sciences
 * expérimentales et Sciences techniques) : sous-programmes, recherche et tri,
 * bases de données simples, et usage responsable du web.
 */
export const informatiqueCommunLessons: LessonSeed[] = [
  {
    slug: "sous-programmes-modularite",
    subjectSlug: "informatique",
    title: "Sous-programmes et analyse modulaire",
    chapter: "Algorithmique · Modularité",
    summary:
      "Décomposer un problème en sous-programmes, choisir entre fonction et procédure, et passer correctement les paramètres par valeur ou par variable.",
    level: "Bac · 4e Mathématiques / Sciences / Techniques (T1)",
    durationMin: 26,
    orderIndex: 110,
    objectives: [
      "Justifier l'usage de sous-programmes",
      "Distinguer fonction et procédure",
      "Choisir entre passage par valeur et par variable",
      "Écrire un algorithme modulaire lisible",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Pourquoi découper",
        text: "Un programme long se conçoit par morceaux : chaque sous-programme résout un problème nommé, testable séparément, et réutilisable. L'analyse modulaire consiste à découper un problème en sous-problèmes indépendants, puis à écrire un sous-programme par sous-problème. Le programme principal devient alors une suite d'appels lisibles.",
      },
      {
        type: "table",
        title: "Fonction ou procédure ?",
        head: ["Type", "Retourne", "Quand l'utiliser"],
        rows: [
          ["Fonction", "une valeur d'un type donné", "calcul : somme, moyenne, recherche, conversion"],
          ["Procédure", "aucune valeur (éventuellement des paramètres modifiés)", "action : afficher, remplir un tableau, trier"],
        ],
      },
      {
        type: "table",
        title: "Passage de paramètres",
        head: ["Mode", "Effet", "Exemple"],
        rows: [
          ["Par valeur", "la copie est modifiée, l'original intact", "afficher(note)"],
          ["Par variable (référence)", "l'original est modifié", "saisir(reference t : tableau)"],
        ],
      },
      {
        type: "steps",
        title: "Écrire un programme modulaire",
        items: [
          "Décomposer le problème en trois à cinq sous-problèmes nommés par un verbe.",
          "Définir pour chacun ses entrées (paramètres) et sa sortie (résultat).",
          "Écrire d'abord les en-têtes, puis le corps de chaque sous-programme.",
          "Écrire le programme principal comme une suite d'appels, sans logique de calcul.",
          "Tester séparément chaque sous-programme avant l'assemblage.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "L'erreur classique",
        text: "Vouloir modifier un tableau dans un sous-programme tout en le passant par valeur : la modification est perdue à la sortie. Un paramètre modifié doit être déclaré en variable (var en Pascal).",
      },
    ],
    keyPoints: [
      "Un sous-programme résout un seul problème nommé.",
      "Fonction = retourne une valeur ; procédure = agit.",
      "Passage par valeur = copie ; par variable = original modifié.",
      "Le programme principal orchestre les appels.",
    ],
    pitfalls: [
      "Confondre paramètre formel et paramètre effectif.",
      "Oublier le mot-clé var pour un paramètre à modifier.",
      "Écrire toute la logique dans le programme principal.",
    ],
    flashcards: [
      {
        question: "Quelle différence entre fonction et procédure ?",
        answer: "La fonction retourne une valeur, la procédure ne retourne rien mais peut modifier ses paramètres.",
      },
      {
        question: "Que se passe-t-il si on modifie un paramètre passé par valeur ?",
        answer: "Seule la copie locale est modifiée ; la variable d'origine reste inchangée.",
      },
      {
        question: "Quel est le premier critère d'une bonne décomposition ?",
        answer: "Chaque sous-programme correspond à un sous-problème unique, nommé par un verbe.",
      },
    ],
    tags: ["informatique", "sous-programmes", "modularité", "paramètres", "algorithmique"],
  },
  {
    slug: "tri-recherche-tableau",
    subjectSlug: "informatique",
    title: "Algorithmes de tri et de recherche dans un tableau",
    chapter: "Algorithmique · Tableaux",
    summary:
      "Comparer tri sélectif, tri à bulles et recherche dichotomique : principes, complexités et conditions d'utilisation.",
    level: "Bac · 4e Mathématiques / Sciences / Techniques (T2)",
    durationMin: 26,
    orderIndex: 111,
    objectives: [
      "Écrire un tri par sélection ou à bulles",
      "Écrire une recherche séquentielle et dichotomique",
      "Comparer les complexités",
      "Choisir l'algorithme adapté à la taille des données",
    ],
    blocks: [
      {
        type: "table",
        title: "Comparaison des algorithmes",
        head: ["Algorithme", "Principe", "Complexité"],
        rows: [
          ["Recherche séquentielle", "parcourir jusqu'à trouver", "O(n)"],
          ["Recherche dichotomique", "diviser l'intervalle en deux", "O(log n), tableau trié requis"],
          ["Tri par sélection", "chercher le minimum et l'échanger", "O(n²)"],
          ["Tri à bulles", "échanger les voisins mal ordonnés", "O(n²)"],
          ["Tri par insertion", "insérer chaque élément à sa place", "O(n²) au pire"],
        ],
      },
      {
        type: "steps",
        title: "Principe de la recherche dichotomique",
        items: [
          "Vérifier que le tableau est trié (condition indispensable).",
          "Poser debut = 1 et fin = n.",
          "Calculer milieu = (debut + fin) div 2.",
          "Comparer T[milieu] à la valeur cherchée.",
          "Réduire l'intervalle à la moitié et recommencer, jusqu'à trouver ou dépasser.",
        ],
      },
      {
        type: "paragraph",
        title: "Un tri, c'est une suite d'échanges",
        text: "Tous les tris simples reposent sur la même brique : comparer deux éléments et les échanger si l'ordre est mauvais. Ce qui les distingue est la façon de choisir quels éléments comparer. Écrire correctement l'échange (avec une variable temporaire) est la première source d'erreur à éliminer.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Estimer une complexité en une phrase",
        text: "« La recherche dichotomique divise l'intervalle par deux à chaque étape : pour 1 000 000 d'éléments, il faut environ 20 comparaisons au lieu d'un million. » Ce type d'ordre de grandeur convainc toujours un correcteur.",
      },
    ],
    keyPoints: [
      "La dichotomie exige un tableau trié.",
      "Les tris simples sont en O(n²), la dichotomie en O(log n).",
      "L'échange nécessite une variable temporaire.",
      "La recherche séquentielle est la seule possible sur un tableau non trié.",
    ],
    pitfalls: [
      "Utiliser la dichotomie sur un tableau non trié.",
      "Écrire un échange sans variable temporaire.",
      "Confondre indice et valeur dans les bornes de la recherche.",
    ],
    flashcards: [
      {
        question: "Quelle condition impose la recherche dichotomique ?",
        answer: "Que le tableau soit trié selon le critère de recherche.",
      },
      {
        question: "Quelle est la complexité du tri par sélection ?",
        answer: "O(n²) : deux boucles imbriquées.",
      },
      {
        question: "Pourquoi une variable temporaire dans l'échange ?",
        answer: "Parce que la première affectation écrase la valeur d'origine de la seconde variable.",
      },
    ],
    tags: ["informatique", "tri", "recherche", "dichotomie", "complexité"],
  },
  {
    slug: "bdd-requetes-simples",
    subjectSlug: "informatique",
    title: "Bases de données et requêtes : recherche, sélection, ajout et mise à jour",
    chapter: "Bases de données · Requêtes",
    summary:
      "Créer une table, interroger, filtrer, trier, ajouter et mettre à jour des données avec SQL, et comprendre la clé primaire.",
    level: "Bac · 4e Mathématiques / Sciences / Techniques (T2)",
    durationMin: 26,
    orderIndex: 112,
    objectives: [
      "Créer une table avec ses contraintes",
      "Écrire une requête de sélection avec filtre et tri",
      "Ajouter et mettre à jour des enregistrements",
      "Distinguer clé primaire et clé étrangère",
    ],
    blocks: [
      {
        type: "table",
        title: "Les requêtes essentielles",
        head: ["Opération", "Instruction", "Remarque"],
        rows: [
          ["Créer", "CREATE TABLE t (id INT PRIMARY KEY, nom VARCHAR(30));", "définir les types et contraintes"],
          ["Lire", "SELECT nom, note FROM eleves WHERE note >= 10;", "WHERE filtre les lignes"],
          ["Trier", "SELECT * FROM eleves ORDER BY note DESC;", "ASC par défaut"],
          ["Ajouter", "INSERT INTO eleves VALUES (1, 'Ali', 14);", "respecter l'ordre des colonnes"],
          ["Modifier", "UPDATE eleves SET note = 15 WHERE id = 1;", "sans WHERE : toute la table !"],
          ["Supprimer", "DELETE FROM eleves WHERE id = 1;", "idem, prudence"],
        ],
      },
      {
        type: "table",
        title: "Clés et contraintes",
        head: ["Contrainte", "Rôle", "Effet"],
        rows: [
          ["PRIMARY KEY", "identifie de façon unique", "pas de doublon, pas de valeur nulle"],
          ["FOREIGN KEY", "référence une autre table", "garantit l'intégrité référentielle"],
          ["NOT NULL", "valeur obligatoire", "refuse l'absence de valeur"],
          ["UNIQUE", "unicité", "ex. adresse électronique"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — traduire une question en requête",
        items: [
          "Repérer ce qu'on veut afficher : c'est la liste des colonnes du SELECT.",
          "Repérer la table concernée : FROM.",
          "Repérer les conditions : WHERE.",
          "Repérer un ordre ou une limite : ORDER BY, LIMIT.",
          "Tester mentalement sur un exemple concret avant d'écrire.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le danger des requêtes sans WHERE",
        text: "Un UPDATE ou un DELETE sans clause WHERE modifie ou supprime tous les enregistrements de la table. C'est l'erreur la plus lourde de conséquences en pratique, et elle est examinée au bac.",
      },
    ],
    keyPoints: [
      "SELECT … FROM … WHERE … ORDER BY …",
      "La clé primaire identifie une ligne ; la clé étrangère la relie à une autre table.",
      "Toujours écrire WHERE avant UPDATE ou DELETE.",
      "ORDER BY trie, WHERE filtre : ne pas confondre.",
    ],
    pitfalls: [
      "Confondre filtre (WHERE) et tri (ORDER BY).",
      "Oublier les apostrophes autour des chaînes de caractères.",
      "Oublier WHERE dans un UPDATE.",
    ],
    flashcards: [
      {
        question: "Quelle clause trie les résultats ?",
        answer: "ORDER BY colonne ASC|DESC.",
      },
      {
        question: "Quel est le rôle d'une clé étrangère ?",
        answer: "Référencer la clé primaire d'une autre table pour garantir l'intégrité des liens.",
      },
      {
        question: "Que se passe-t-il avec DELETE FROM t; (sans WHERE) ?",
        answer: "Tous les enregistrements de la table sont supprimés.",
      },
    ],
    tags: ["informatique", "SQL", "bases de données", "requêtes", "clés"],
  },
  {
    slug: "web-securite-identite",
    subjectSlug: "informatique",
    title: "Recherche, sécurité et identité numérique",
    chapter: "TIC · Web et citoyenneté numérique",
    summary:
      "Chercher efficacement l'information, évaluer sa fiabilité, protéger ses données et gérer son identité numérique de façon responsable.",
    level: "Bac · 4e Mathématiques / Sciences / Techniques (T3)",
    durationMin: 24,
    orderIndex: 113,
    objectives: [
      "Formuler une requête de recherche efficace",
      "Évaluer la fiabilité d'une source",
      "Identifier les risques liés aux données personnelles",
      "Adopter les bonnes pratiques de sécurité",
    ],
    blocks: [
      {
        type: "steps",
        title: "Chercher et vérifier",
        items: [
          "Formuler une requête précise : mots-clés utiles, guillemets pour une expression exacte.",
          "Croiser au moins trois sources indépendantes avant de retenir une information.",
          "Vérifier l'auteur, la date et l'organisme qui publie.",
          "Distinguer un site institutionnel, un média reconnu et un contenu amateur.",
          "Citer la source et sa date dans tout travail rendu.",
        ],
      },
      {
        type: "table",
        title: "Risques et protections",
        head: ["Risque", "Manifestation", "Protection"],
        rows: [
          ["Phishing", "courriel imitant un site officiel", "vérifier l'adresse, ne jamais cliquer sans contrôle"],
          ["Vol de compte", "mot de passe faible ou réutilisé", "mot de passe long, unique, gestionnaire"],
          ["Trace numérique", "cookies, historique, géolocalisation", "paramétrer la confidentialité, limiter les permissions"],
          ["Logiciel malveillant", "rançongiciel, virus", "mises à jour, sauvegardes, antivirus"],
          ["Désinformation", "fausse information virale", "recouper les sources, vérifier la date"],
        ],
      },
      {
        type: "paragraph",
        title: "Identité numérique : ce que l'on laisse",
        text: "L'identité numérique est l'ensemble des traces laissées en ligne : publications, commentaires, photos, données de navigation. Elle est persistante, copiable et souvent publique sans que l'on en ait conscience. La maîtriser suppose de distinguer vie privée et vie publique, de paramétrer ses comptes et de réfléchir avant de publier.",
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le réflexe qui protège",
        text: "Un mot de passe long et unique par service, une double authentification sur la messagerie, et une sauvegarde régulière : ces trois gestes couvrent l'essentiel des incidents courants. Aucun service légitime ne demande un mot de passe par courriel.",
      },
    ],
    keyPoints: [
      "Croiser les sources et vérifier auteur, date et organisme.",
      "Un mot de passe unique par service + double authentification.",
      "Les traces numériques sont persistantes et copiables.",
      "Aucun organisme sérieux ne demande un mot de passe par message.",
    ],
    pitfalls: [
      "Se fier au premier résultat de recherche.",
      "Réutiliser le même mot de passe partout.",
      "Publier des informations personnelles sans paramétrer la confidentialité.",
    ],
    flashcards: [
      {
        question: "Comment vérifier la fiabilité d'une information ?",
        answer: "En croisant plusieurs sources indépendantes et en vérifiant l'auteur, la date et l'organisme.",
      },
      {
        question: "Quel est le principe d'un bon mot de passe ?",
        answer: "Long, unique par service, non devinable, idéalement géré par un gestionnaire de mots de passe.",
      },
      {
        question: "Qu'est-ce que l'identité numérique ?",
        answer: "L'ensemble des traces et informations qu'une personne laisse en ligne, souvent publiques et persistantes.",
      },
    ],
    tags: ["informatique", "TIC", "web", "sécurité", "identité numérique"],
  },
];

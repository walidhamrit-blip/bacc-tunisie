import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Filière Informatique (Sciences de l'informatique) — 4ème année secondaire.
 *
 * Fiches « Bases de données » (coef. 3) et « TIC » (coef. 3) conformes au
 * programme officiel : modèle relationnel, conception (entités-relations),
 * algèbre relationnelle et SQL ; outils de collaboration, systèmes, réseaux,
 * pages web dynamiques, animation multimédia et publication.
 */
export const informatiqueBddLessons: LessonSeed[] = [
  {
    slug: "modele-relationnel",
    subjectSlug: "informatique",
    title: "Le modèle relationnel : tables, clés et contraintes",
    chapter: "Bases de données · Modèle relationnel",
    summary:
      "Comprendre une base de données comme un ensemble de tables reliées par des clés, et connaître les contraintes qui garantissent la cohérence des données.",
    level: "Bac · Informatique (T1)",
    durationMin: 26,
    orderIndex: 8,
    objectives: [
      "Distinguer relation (table), attribut (colonne) et tuple (ligne)",
      "Identifier clé primaire, clé candidate et clé étrangère",
      "Justifier les contraintes d'intégrité d'un schéma",
      "Lire et écrire un schéma relationnel sous la forme R(clé, attributs…)",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Une table, pas un tableau",
        text: "Dans le modèle relationnel, une relation est une table dont chaque ligne est un tuple (un enregistrement) et chaque colonne un attribut. Deux règles absolues : l'ordre des lignes et des colonnes n'a aucune signification, et deux lignes ne peuvent pas être identiques — sinon on ne pourrait plus les distinguer.",
      },
      {
        type: "table",
        title: "Les clés et leur rôle",
        head: ["Notion", "Définition", "Exemple (lycée)"],
        rows: [
          ["Clé primaire", "Attribut (ou groupe) identifiant de façon unique chaque tuple", "numEleve dans Eleve"],
          ["Clé candidate", "Tout attribut pouvant jouer le rôle de clé primaire", "numEleve, ou CIN de l'élève"],
          ["Clé étrangère", "Attribut qui référence la clé primaire d'une autre relation", "numClasse dans Eleve"],
          ["Contrainte de domaine", "Chaque valeur appartient au type déclaré (entier, date, chaîne)", "note entre 0 et 20"],
        ],
      },
      {
        type: "formula",
        title: "Écriture d'un schéma relationnel",
        expression:
          "Eleve(numEleve, nom, prenom, dateNaissance, #numClasse)\nClasse(numClasse, libelle, niveau)\nNote(#numEleve, #codeMatiere, valeur, trimestre)",
        note: "Le # marque une clé étrangère ; l'attribut souligné (ici le premier) est la clé primaire. Une clé étrangère peut être aussi une clé primaire : c'est le cas dans Note, où le couple (numEleve, codeMatiere, trimestre) identifie une note.",
      },
      {
        type: "list",
        title: "Les contraintes d'intégrité à citer",
        items: [
          "Intégrité de l'entité : la clé primaire est unique et jamais nulle.",
          "Intégrité référentielle : une clé étrangère doit exister dans la relation référencée (pas d'élève dans une classe inexistante).",
          "Intégrité de domaine : les valeurs respectent le type et les bornes.",
          "Dépendance fonctionnelle : tout attribut non clé dépend de la clé primaire, de toute la clé et rien que la clé.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Réflexe d'examen",
        text: "Avant d'écrire une requête, souligne les clés primaires sur le schéma et repère le chemin de jointure entre les tables. La moitié des erreurs viennent d'une jointure oubliée.",
      },
    ],
    keyPoints: [
      "Une relation = une table ; un tuple = une ligne ; un attribut = une colonne.",
      "Clé primaire : identifie un tuple de façon unique et ne peut pas être nulle.",
      "Clé étrangère : assure le lien entre deux relations et l'intégrité référentielle.",
      "Le schéma se lit R(clé primaire, attributs, #clés étrangères).",
    ],
    pitfalls: [
      "Choisir comme clé primaire un attribut qui peut changer (nom, téléphone).",
      "Oublier une clé étrangère dans le schéma : le lien entre tables disparaît.",
      "Croire que la clé primaire est forcément un seul attribut (clé composée possible).",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'une clé étrangère ?",
        answer: "Un attribut d'une relation qui prend ses valeurs dans la clé primaire d'une autre relation : c'est elle qui matérialise le lien entre les deux tables.",
      },
      {
        question: "Une clé primaire peut-elle être nulle ?",
        answer: "Non : l'intégrité de l'entité l'interdit, sinon le tuple ne serait plus identifiable.",
      },
      {
        question: "Pourquoi l'ordre des lignes d'une table n'a-t-il pas d'importance ?",
        answer: "Une relation est un ensemble de tuples : l'ordre d'insertion ne fait pas partie de l'information.",
      },
    ],
    tags: ["modèle relationnel", "clé primaire", "clé étrangère", "contraintes", "bases de données"],
  },
  {
    slug: "conception-bdd",
    subjectSlug: "informatique",
    title: "Conception d'une base : modèle conceptuel (entités-relations) et modèle logique",
    chapter: "Bases de données · Conception",
    summary:
      "Passer d'un énoncé en langue naturelle à un modèle conceptuel (entités, associations, cardinalités) puis au modèle relationnel (tables, clés), sans perdre d'information.",
    level: "Bac · Informatique (T2)",
    durationMin: 30,
    orderIndex: 9,
    objectives: [
      "Extraire les entités, les associations et les attributs d'un énoncé",
      "Lire et écrire une cardinalité (1,1), (0,n), (1,n)",
      "Traduire un modèle conceptuel en tables relationnelles",
      "Identifier les associations porteuses d'attributs",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Du texte au schéma",
        text: "La conception se fait en deux temps. D'abord le modèle conceptuel : on repère les objets du domaine (entités) et les liens entre eux (associations), sans se soucier de l'informatique. Ensuite le modèle logique : on transforme ce schéma en tables et en clés, selon des règles fixes. Sauter la première étape produit des tables incohérentes et des données dupliquées.",
      },
      {
        type: "table",
        title: "Les cardinalités et leur signification",
        head: ["Cardinalité", "Lecture", "Exemple"],
        rows: [
          ["(1,1) — (0,n)", "Un élève appartient à une seule classe ; une classe contient plusieurs élèves", "Eleve — Appartenir — Classe"],
          ["(1,n) — (1,n)", "Un élève suit plusieurs matières ; une matière est suivie par plusieurs élèves", "Eleve — Suivre — Matiere"],
          ["(0,1) — (1,1)", "Un élève a au plus une carte de transport ; une carte appartient à un seul élève", "Relation un-à-un"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — des cardinalités aux tables",
        items: [
          "Chaque entité devient une table, dont la clé est l'identifiant choisi.",
          "Association (1,n) — (1,1) : on ajoute la clé du côté « un » comme clé étrangère du côté « plusieurs ».",
          "Association (1,n) — (1,n) : elle devient une table dont la clé primaire est le couple des deux clés.",
          "Association (0,1) — (1,1) : on fusionne souvent les deux entités ou on place la clé étrangère du côté obligatoire.",
          "Si l'association porte des attributs (date d'inscription, note), ils rejoignent la table intermédiaire.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "L'erreur qui coûte le plus",
        text: "Mettre une clé étrangère du mauvais côté dans une association un-à-plusieurs : on obtient alors un élève qui référence une seule classe par attribut… ou une classe qui ne peut contenir qu'un élève. La cardinalité « plusieurs » désigne le côté qui reçoit la clé étrangère.",
      },
    ],
    keyPoints: [
      "Modèle conceptuel : entités + associations + cardinalités, sans clé informatique.",
      "Modèle logique : tables, clé primaire soulignée, clés étrangères précédées de #.",
      "Association plusieurs-à-plusieurs → table intermédiaire.",
      "Les attributs d'association se placent dans la table du lien.",
    ],
    pitfalls: [
      "Confondre entité et attribut (la couleur est un attribut, pas une entité).",
      "Oublier la table intermédiaire pour une association plusieurs-à-plusieurs.",
      "Placer une clé étrangère dans une association (0,n) — (0,n) sans table dédiée.",
    ],
    flashcards: [
      {
        question: "Comment traduit-on une association plusieurs-à-plusieurs ?",
        answer: "Par une nouvelle table dont la clé primaire est composée des clés des deux entités, avec leurs clés étrangères.",
      },
      {
        question: "Que signifient les cardinalités (1,n) et (0,1) ?",
        answer:
          "Chaque occurrence de l'entité participe au moins une fois (1,n) ou au plus une fois (0,1) à l'association.",
      },
      {
        question: "Où placer l'attribut « date d'inscription » d'une association ?",
        answer: "Dans la table qui représente l'association (ou dans la table du côté « plusieurs » si elle est convertie en clé étrangère).",
      },
    ],
    tags: ["modèle conceptuel", "entité-association", "cardinalité", "conception", "bases de données"],
  },
  {
    slug: "algebre-relationnelle",
    subjectSlug: "informatique",
    title: "Algèbre relationnelle : sélection, projection, jointure",
    chapter: "Bases de données · Algèbre relationnelle",
    summary:
      "Décrire formellement ce que fait une requête : filtrer des lignes (sélection σ), garder des colonnes (projection π), relier deux tables (jointure ⨝) et combiner ces opérations.",
    level: "Bac · Informatique (T2)",
    durationMin: 28,
    orderIndex: 10,
    objectives: [
      "Utiliser les opérateurs σ, π et ⨝ avec la bonne notation",
      "Composer plusieurs opérations dans l'ordre correct",
      "Distinguer jointure naturelle, équi-jointure et produit cartésien",
      "Traduire une expression d'algèbre relationnelle en SQL",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Trois opérateurs, toutes les requêtes",
        text: "L'algèbre relationnelle est la théorie derrière SQL. Trois opérateurs suffisent à l'essentiel du programme : la sélection choisit des lignes, la projection choisit des colonnes, la jointure relie deux tables par une condition d'égalité. Une requête complexe n'est qu'une composition de ces opérateurs.",
      },
      {
        type: "table",
        title: "Notations à connaître",
        head: ["Opérateur", "Notation", "Effet", "Équivalent SQL"],
        rows: [
          ["Sélection", "σ condition (R)", "Garde les tuples qui vérifient la condition", "WHERE"],
          ["Projection", "π attributs (R)", "Garde uniquement les colonnes citées (et supprime les doublons)", "SELECT"],
          ["Jointure", "R ⨝ condition S", "Apparie les tuples de R et S vérifiant la condition", "FROM R JOIN S ON …"],
          ["Produit cartésien", "R × S", "Toutes les combinaisons (à éviter si possible)", "FROM R, S sans condition"],
          ["Union / différence", "R ∪ S / R − S", "Réunion ou soustraction d'ensembles de tuples", "UNION / EXCEPT"],
        ],
      },
      {
        type: "formula",
        title: "Lecture d'une expression composée",
        expression: "π nom, libelle ( σ note ≥ 10 ( Eleve ⨝ numEleve Note ⨝ numClasse Classe ) )",
        note: "On lit de l'intérieur vers l'extérieur : joindre les trois tables, garder les lignes dont la note atteint 10, puis n'afficher que le nom et le libellé de classe.",
      },
      {
        type: "steps",
        title: "Méthode — traduire une question en algèbre puis en SQL",
        items: [
          "Repérer les colonnes à afficher : ce sera la projection la plus externe.",
          "Repérer les tables nécessaires et les attributs communs : ce sont les jointures.",
          "Écrire les conditions sur les lignes : sélection, à placer le plus tôt possible.",
          "Ordonner : jointures d'abord, sélection ensuite, projection en dernier.",
          "Traduire en SQL dans l'ordre SELECT … FROM … WHERE … GROUP BY … ORDER BY.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Jointure naturelle ou équi-jointure ?",
        text: "La jointure naturelle s'applique sur les attributs de même nom et n'affiche qu'une fois la colonne commune. L'équi-jointure explicite la condition (R.numEleve = S.numEleve) et peut laisser apparaître les deux colonnes : plus lisible dans un corrigé de bac.",
      },
    ],
    keyPoints: [
      "σ filtre les lignes, π garde des colonnes, ⨝ relie des tables.",
      "La projection élimine les doublons (elle travaille sur des ensembles).",
      "Un produit cartésien sans condition est presque toujours une erreur de jointure.",
      "Toute expression d'algèbre relationnelle a un équivalent SQL.",
    ],
    pitfalls: [
      "Projeter avant de filtrer et perdre la colonne utile à la condition.",
      "Oublier la condition de jointure → produit cartésien et résultats faux.",
      "Confondre jointure et union : elles ne produisent pas le même ensemble.",
    ],
    flashcards: [
      {
        question: "Que fait σ note ≥ 10 (Note) ?",
        answer: "Elle garde les seuls tuples de la relation Note dont la valeur est supérieure ou égale à 10.",
      },
      {
        question: "Pourquoi la projection supprime-t-elle les doublons ?",
        answer: "Parce qu'une relation est un ensemble : deux tuples identiques après projection n'en forment plus qu'un.",
      },
      {
        question: "Quel opérateur correspond à WHERE ?",
        answer: "La sélection σ.",
      },
    ],
    tags: ["algèbre relationnelle", "sélection", "projection", "jointure", "SQL"],
  },
  {
    slug: "sql-requetes-avancees",
    subjectSlug: "informatique",
    title: "SQL : recherche, ajout, mise à jour, agrégats et sous-requêtes",
    chapter: "Bases de données · SQL",
    summary:
      "Maîtriser les requêtes attendues au bac : SELECT avec jointure et tri, INSERT, UPDATE, DELETE, puis GROUP BY / HAVING et sous-requêtes pour les calculs sur des groupes.",
    level: "Bac · Informatique (T3)",
    durationMin: 34,
    orderIndex: 11,
    objectives: [
      "Écrire une requête de sélection avec jointure, condition et tri",
      "Utiliser les fonctions d'agrégat avec GROUP BY et HAVING",
      "Écrire une sous-requête dans WHERE ou dans FROM",
      "Modifier les données avec INSERT, UPDATE et DELETE sans casser l'intégrité",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "L'ordre d'exécution change tout",
        text: "On écrit SELECT en premier mais la base l'exécute en dernier. L'ordre réel est FROM → JOIN → WHERE → GROUP BY → HAVING → SELECT → ORDER BY. C'est pourquoi une fonction d'agrégat ne peut pas apparaître dans WHERE (les groupes n'existent pas encore) et pourquoi on filtre les groupes avec HAVING.",
      },
      {
        type: "formula",
        title: "Squelette d'une requête complète",
        expression:
          "SELECT   c.libelle, AVG(n.valeur) AS moyenne\nFROM     Note n\n  JOIN   Eleve e ON e.numEleve = n.numEleve\n  JOIN   Classe c ON c.numClasse = e.numClasse\nWHERE    n.trimestre = 2\nGROUP BY c.libelle\nHAVING   AVG(n.valeur) >= 10\nORDER BY moyenne DESC;",
        note: "Les alias (n, e, c) évitent les ambiguïtés quand deux tables ont un attribut de même nom.",
      },
      {
        type: "table",
        title: "Les fonctions d'agrégat du programme",
        head: ["Fonction", "Calcul", "Remarque d'examen"],
        rows: [
          ["COUNT(*)", "Nombre de lignes du groupe", "COUNT(*) compte les lignes, COUNT(colonne) ignore les NULL"],
          ["SUM", "Somme", "Renvoie NULL sur un groupe vide"],
          ["AVG", "Moyenne", "Attention aux NULL qui faussent la moyenne"],
          ["MIN / MAX", "Extrêmes", "Souvent utilisés dans une sous-requête (« l'élève qui a la meilleure moyenne »)"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — les trois ordres de modification",
        items: [
          "INSERT INTO Note (numEleve, codeMatiere, valeur) VALUES (12, 'MATH', 15.5) : vérifier que la clé étrangère existe.",
          "UPDATE Note SET valeur = 16 WHERE numEleve = 12 AND codeMatiere = 'MATH' : ne jamais oublier le WHERE, sinon toutes les lignes sont modifiées.",
          "DELETE FROM Note WHERE valeur IS NULL : même remarque, sans WHERE on vide la table.",
          "Toute modification doit respecter l'intégrité référentielle : on ne supprime pas une classe qui contient encore des élèves.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "IS NULL, pas = NULL",
        text: "NULL signifie « valeur inconnue » : aucune comparaison avec NULL n'est vraie, même NULL = NULL. On écrit WHERE note IS NULL ou WHERE note IS NOT NULL.",
      },
    ],
    keyPoints: [
      "Ordre d'exécution : FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY.",
      "WHERE filtre les lignes, HAVING filtre les groupes.",
      "Une sous-requête scalaire se place dans WHERE ; une sous-requête de table dans FROM.",
      "UPDATE et DELETE sans WHERE modifient toute la table.",
    ],
    pitfalls: [
      "Écrire WHERE AVG(note) > 10 au lieu de HAVING.",
      "Comparer à NULL avec = .",
      "Oublier de grouper par toutes les colonnes non agrégées du SELECT.",
    ],
    flashcards: [
      {
        question: "Quelle est la différence entre WHERE et HAVING ?",
        answer: "WHERE s'applique aux lignes avant regroupement, HAVING s'applique aux groupes après GROUP BY.",
      },
      {
        question: "Comment trouver l'élève qui a la meilleure moyenne ?",
        answer:
          "Avec une sous-requête : WHERE moyenne = (SELECT MAX(moyenne) FROM …), ou en triant et en limitant à une ligne selon le SGBD.",
      },
      {
        question: "Comment tester qu'une valeur est absente ?",
        answer: "Avec IS NULL (et non = NULL).",
      },
    ],
    tags: ["SQL", "GROUP BY", "sous-requête", "jointure", "base de données"],
  },
  {
    slug: "tic-collaboration-systemes",
    subjectSlug: "informatique",
    title: "TIC : outils de collaboration, systèmes d'exploitation et réseaux",
    chapter: "TIC · Collaboration, systèmes et réseaux",
    summary:
      "Travailler à plusieurs sur un réseau local (partage, forums, visioconférence), connaître le rôle du système d'exploitation et les bases des réseaux : topologies, adressage et services.",
    level: "Bac · Informatique (T1-T2)",
    durationMin: 28,
    orderIndex: 12,
    objectives: [
      "Choisir l'outil de collaboration adapté (synchrone ou asynchrone)",
      "Expliquer les fonctions d'un système d'exploitation",
      "Distinguer les topologies réseau et le matériel associé",
      "Identifier les services d'un réseau et les règles de sécurité de base",
    ],
    blocks: [
      {
        type: "table",
        title: "Outils de collaboration : synchrone ou asynchrone",
        head: ["Outil", "Mode", "Usage scolaire"],
        rows: [
          ["Partage de fichiers sur réseau local", "Asynchrone", "Déposer un exposé dans un dossier partagé avec droits de lecture/écriture"],
          ["Forum de discussion", "Asynchrone", "Poser une question, répondre, garder une trace des échanges"],
          ["Visioconférence", "Synchrone", "Cours à distance, réunion de projet, partage d'écran"],
          ["Document partagé en ligne", "Synchrone", "Écrire à plusieurs sur le même document en temps réel"],
        ],
      },
      {
        type: "list",
        title: "Les fonctions d'un système d'exploitation",
        items: [
          "Gérer les processus : lancer, ordonnancer, arrêter les programmes.",
          "Gérer la mémoire : allouer et libérer l'espace nécessaire aux programmes.",
          "Gérer les fichiers et les droits : arborescence, lecture, écriture, exécution.",
          "Gérer les périphériques via des pilotes et offrir une interface (graphique ou en ligne de commande).",
          "Assurer la sécurité : comptes utilisateurs, mots de passe, journalisation.",
        ],
      },
      {
        type: "table",
        title: "Topologies et équipements",
        head: ["Élément", "Rôle", "Avantage / limite"],
        rows: [
          ["Topologie en étoile", "Tous les postes reliés à un commutateur central", "Panne d'un poste sans effet sur le réseau ; dépend du commutateur"],
          ["Topologie en bus", "Un câble unique partagé", "Simple mais une coupure bloque tout le réseau"],
          ["Commutateur (switch)", "Relie les machines d'un même réseau local", "Commutation par adresse MAC, plus efficace qu'un concentrateur"],
          ["Routeur", "Relie des réseaux différents", "Assure l'interconnexion vers Internet"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Sécurité : les cinq réflexes",
        text: "Mot de passe robuste et unique, mises à jour régulières, sauvegardes, antivirus, prudence avec les pièces jointes et l'hameçonnage. Un réseau local partagé n'est jamais privé : toute donnée déposée peut être lue par les autres utilisateurs autorisés.",
      },
    ],
    keyPoints: [
      "Synchrone = en même temps (visio, édition partagée) ; asynchrone = en différé (forum, dépôt de fichiers).",
      "Le système d'exploitation gère processus, mémoire, fichiers, périphériques et utilisateurs.",
      "Étoile = commutateur central ; bus = câble partagé.",
      "Le routeur interconnecte des réseaux, le commutateur relie les postes d'un même réseau.",
    ],
    pitfalls: [
      "Confondre commutateur (même réseau) et routeur (réseaux différents).",
      "Croire qu'un forum est synchrone.",
      "Oublier les droits d'accès lors d'un partage de dossier.",
    ],
    flashcards: [
      {
        question: "Cite deux fonctions du système d'exploitation.",
        answer: "Gestion des processus et ordonnancement du processeur ; gestion de la mémoire et des fichiers avec les droits d'accès.",
      },
      {
        question: "Quelle topologie résiste le mieux à la panne d'un poste ?",
        answer: "La topologie en étoile : chaque poste a sa propre liaison vers le commutateur central.",
      },
      {
        question: "Quelle différence entre un forum et une visioconférence ?",
        answer: "Le forum est asynchrone (échanges différés et conservés), la visioconférence est synchrone (participants simultanés).",
      },
    ],
    tags: ["TIC", "réseau", "système d'exploitation", "collaboration", "sécurité"],
  },
  {
    slug: "web-dynamique-publication",
    subjectSlug: "informatique",
    title: "Pages web dynamiques, animation multimédia et publication d'un site",
    chapter: "TIC · Production et publication",
    summary:
      "Passer d'une page statique à une page dynamique : structure HTML, mise en forme CSS, scripts qui échangent des données, animation multimédia, puis hébergement, référencement et sécurisation du site.",
    level: "Bac · Informatique (T2-T3) · 50 h",
    durationMin: 32,
    orderIndex: 13,
    objectives: [
      "Distinguer page statique et page dynamique",
      "Écrire une page HTML structurée et la mettre en forme en CSS",
      "Décrire l'échange de données entre une page et un serveur",
      "Préparer la publication : hébergement, référencement, sécurisation",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Statique ou dynamique ?",
        text: "Une page statique est un fichier dont le contenu ne change pas : le serveur l'envoie tel quel. Une page dynamique est construite au moment de la requête, à partir de données (base de données, formulaire, session) : elle peut afficher le nom de l'utilisateur, un résultat de recherche ou un panier. C'est exactement le programme de 4ème année : « échanger des données à distance à travers une page web ».",
      },
      {
        type: "formula",
        title: "Squelette d'une page structurée",
        expression:
          "<!DOCTYPE html>\n<html>\n  <head>\n    <title>Bulletin de l'élève</title>\n    <link rel=\"stylesheet\" href=\"style.css\">\n  </head>\n  <body>\n    <h1>Résultats du 2e trimestre</h1>\n    <table id=\"notes\"> … </table>\n    <script src=\"app.js\"></script>\n  </body>\n</html>",
        note: "Trois technologies complémentaires : HTML pour la structure, CSS pour la présentation, JavaScript pour le comportement. Mélanger les trois rend le code ingérable.",
      },
      {
        type: "steps",
        title: "Méthode — échanger des données avec le serveur",
        items: [
          "La page contient un formulaire ou un bouton déclenchant une requête.",
          "Le client envoie une requête HTTP (GET pour consulter, POST pour envoyer des données).",
          "Le serveur exécute un script (PHP, Python, Node.js…), interroge la base et construit la réponse.",
          "Le client reçoit du HTML ou des données (JSON) et met à jour l'affichage.",
          "Toute donnée reçue doit être vérifiée côté serveur : on ne fait jamais confiance au navigateur.",
        ],
      },
      {
        type: "table",
        title: "Avant de publier : la liste de contrôle",
        head: ["Étape", "Ce qu'on fait", "Pourquoi"],
        rows: [
          ["Hébergement", "Choisir un serveur (mutualisé, VPS, cloud) et transférer les fichiers", "Rendre le site accessible en permanence"],
          ["Nom de domaine", "Réserver une adresse et la faire pointer (DNS) vers l'hébergement", "Adresse mémorisable"],
          ["Référencement", "Titres explicites, mots-clés, plan du site, liens entrants", "Être trouvé par les moteurs de recherche"],
          ["Sécurisation", "HTTPS, mots de passe forts, sauvegardes, formulaires filtrés", "Protéger les données et les visiteurs"],
          ["Animation et multimédia", "Images optimisées, sons compressés, animations exportées", "Ne pas faire attendre le visiteur"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Les deux fautes qui font perdre des points",
        text: "Écrire du contenu directement dans la page alors qu'il vient de la base de données (le travail demandé était dynamique), et oublier d'indiquer où les scripts sont exécutés : côté serveur (accès à la base) ou côté client (interactivité).",
      },
    ],
    keyPoints: [
      "Statique = fichier envoyé tel quel ; dynamique = page générée à partir de données.",
      "HTML (structure) + CSS (présentation) + JavaScript (comportement).",
      "GET pour lire, POST pour envoyer ; validation toujours côté serveur.",
      "Publication = hébergement + domaine + référencement + sécurisation.",
    ],
    pitfalls: [
      "Confondre script serveur et script client.",
      "Insérer des images non compressées qui ralentissent le site.",
      "Oublier la sauvegarde avant la mise en ligne.",
    ],
    flashcards: [
      {
        question: "Quelle est la différence entre une page statique et une page dynamique ?",
        answer: "La page statique est un fichier fixe ; la page dynamique est générée à la demande à partir de données, souvent stockées dans une base.",
      },
      {
        question: "À quoi sert le CSS ?",
        answer: "À séparer la présentation (couleurs, mise en page, typographie) de la structure HTML.",
      },
      {
        question: "Pourquoi valider les données côté serveur ?",
        answer: "Parce que le navigateur peut être contourné : seule la vérification serveur protège réellement la base.",
      },
    ],
    tags: ["web", "HTML", "dynamique", "hébergement", "référencement"],
  },
];

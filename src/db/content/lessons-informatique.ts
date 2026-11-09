import type { LessonSeed } from "@/db/content/lessons-sciences";

/**
 * Filière Informatique (Sciences de l'informatique) — 4ème année secondaire.
 *
 * Fiches « Algorithmique & programmation » (coef. 3) conformes au programme
 * officiel du ministère : enregistrements et fichiers, récursivité, tris
 * (insertion, Shell, rapide), algorithmes récurrents, arithmétique,
 * approximation et algorithmes avancés.
 */
export const informatiqueAlgoLessons: LessonSeed[] = [
  {
    slug: "enregistrements-fichiers",
    subjectSlug: "informatique",
    title: "Enregistrements, vecteurs d'enregistrements et fichiers",
    chapter: "Algorithmique · Structures de données",
    summary:
      "Regrouper des informations hétérogènes dans un enregistrement, manipuler un tableau d'enregistrements, puis enregistrer et relire durablement ces données dans un fichier texte ou typé.",
    level: "Bac · Informatique (T1) · 20 h",
    durationMin: 32,
    orderIndex: 1,
    objectives: [
      "Déclarer un type enregistrement et accéder à ses champs par le point",
      "Manipuler un vecteur d'enregistrements : saisie, recherche, tri, statistiques",
      "Distinguer fichier texte et fichier typé, et choisir le bon mode d'ouverture",
      "Écrire les quatre traitements de base : création, lecture, ajout, mise à jour",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Pourquoi un enregistrement ?",
        text: "Un tableau ne peut stocker que des valeurs de même type. Or un élève, c'est un nom (chaîne), un âge (entier) et une moyenne (réel) : trois types différents qui décrivent une seule réalité. L'enregistrement (record) regroupe ces champs sous un même nom ; on parle alors de structure hétérogène. Un vecteur dont chaque case est un enregistrement s'appelle un vecteur d'enregistrements : c'est la structure qui porte tout le programme de gestion de l'année.",
      },
      {
        type: "formula",
        title: "Déclaration et accès",
        expression:
          "Type Eleve = Enregistrement\n  nom : Chaîne\n  age : Entier\n  moyenne : Réel\nFin\n\nTableau classe[1..30] : Eleve\nclasse[i].nom ← \"Ali\"",
        note: "En Python, l'enregistrement devient une classe (ou un dictionnaire) : eleve = {\"nom\": \"Ali\", \"age\": 17, \"moyenne\": 14.5} et l'accès s'écrit eleve[\"nom\"].",
      },
      {
        type: "table",
        title: "Les quatre traitements d'un fichier",
        head: ["Traitement", "Mode d'ouverture", "Ce qu'on écrit", "Piège classique"],
        rows: [
          ["Création", "Écriture (w)", "On parcourt les données et on écrit chaque enregistrement sur une ligne", "Oublier que le mode w écrase un fichier existant"],
          ["Lecture", "Lecture (r)", "Tant que non fin de fichier : lire, puis traiter", "Tester la fin de fichier avant la première lecture"],
          ["Ajout", "Ajout (a)", "On ouvre en ajout pour ne pas perdre l'existant", "Écrire en w et perdre toutes les données précédentes"],
          ["Mise à jour", "Lecture puis réécriture", "On recopie dans un fichier temporaire en modifiant les lignes utiles", "Modifier un fichier pendant qu'on le lit"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — lire un fichier texte d'enregistrements",
        items: [
          "Ouvrir le fichier en lecture et vérifier qu'il existe (sinon afficher un message, ne pas planter).",
          "Lire une première ligne ; si elle est vide, le fichier est vide : sortir de la boucle.",
          "Découper la ligne selon le séparateur (point-virgule ou virgule) pour retrouver les champs.",
          "Convertir chaque champ dans son type (entier, réel) puis ranger l'enregistrement dans le tableau.",
          "Répéter jusqu'à la fin du fichier, puis fermer le fichier et afficher le nombre d'enregistrements lus.",
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Le réflexe qui rapporte des points",
        text: "Toujours séparer la saisie de l'affichage : une procédure Saisir (remplit le tableau), une fonction Rechercher (renvoie l'indice), une procédure Afficher. Le correcteur retrouve immédiatement l'analyse modulaire demandée par le programme.",
      },
    ],
    keyPoints: [
      "Un enregistrement regroupe des champs de types différents ; un vecteur d'enregistrements est un tableau de structures.",
      "Fichier texte = lisible, portable ; fichier typé = mêmes types qu'en mémoire, plus rapide, non lisible par un éditeur.",
      "Mode w écrase, mode a ajoute : confondre les deux détruit les données existantes.",
      "Fin de fichier : on lit d'abord, on teste ensuite.",
    ],
    pitfalls: [
      "Écrire classe.nom au lieu de classe[i].nom : l'indice est obligatoire sur un vecteur.",
      "Oublier de convertir la chaîne lue en entier avant de la comparer à un nombre.",
      "Utiliser une variable globale au lieu de passer le tableau en paramètre.",
    ],
    flashcards: [
      {
        question: "Quelle est la différence entre un tableau simple et un vecteur d'enregistrements ?",
        answer:
          "Le tableau simple ne contient qu'un seul type de valeurs ; le vecteur d'enregistrements contient des structures à plusieurs champs de types différents.",
      },
      {
        question: "Que se passe-t-il si on ouvre en mode \"w\" un fichier qui contient déjà des données ?",
        answer: "Il est vidé immédiatement : tout le contenu précédent est perdu.",
      },
      {
        question: "Comment repérer la fin d'un fichier texte ?",
        answer:
          "On teste la fin de fichier juste après chaque lecture (ou on lit une ligne et on vérifie qu'elle n'est pas vide), jamais avant la première lecture.",
      },
    ],
    tags: ["enregistrement", "fichier", "vecteur d'enregistrements", "algorithmique", "bac informatique"],
  },
  {
    slug: "recursivite",
    subjectSlug: "informatique",
    title: "La récursivité : définition, cas de base et applications",
    chapter: "Algorithmique · Récursivité",
    summary:
      "Écrire une fonction qui s'appelle elle-même sans boucle infinie : identifier le cas de base, la relation de récurrence, puis passer d'une version itérative à une version récursive.",
    level: "Bac · Informatique (T1) · 12 h",
    durationMin: 30,
    orderIndex: 2,
    objectives: [
      "Définir une fonction récursive avec un cas d'arrêt explicite",
      "Passer d'une formulation itérative à une formulation récursive (et inversement)",
      "Dérouler une pile d'appels à la main",
      "Reconnaître les cas où la récursivité coûte trop cher",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Une fonction qui s'appelle elle-même",
        text: "La récursivité consiste à résoudre un problème de taille n en utilisant la solution du même problème de taille n-1. Deux éléments sont obligatoires : le cas de base (la plus petite taille, résolue directement sans appel) et la relation de récurrence (l'appel avec un paramètre plus petit). Sans cas de base, l'appel s'enfonce indéfiniment et la pile d'exécution déborde.",
      },
      {
        type: "formula",
        title: "Le squelette à réutiliser",
        expression:
          "Fonction Fact(n : Entier) : Entier\n  Si n ≤ 1 Alors\n    Retourner 1            { cas de base }\n  Sinon\n    Retourner n * Fact(n-1) { appel récursif }\n  FinSi",
        note: "En Python : def fact(n): return 1 if n <= 1 else n * fact(n - 1). La même structure sert pour la somme, le PGCD, la puissance, le nombre de chiffres, etc.",
      },
      {
        type: "steps",
        title: "Méthode — passer d'une boucle à une fonction récursive",
        items: [
          "Repérer la variable qui diminue à chaque tour de boucle : ce sera le paramètre récursif.",
          "Écrire le résultat pour la plus petite valeur possible (0 ou 1) : c'est le cas de base.",
          "Exprimer le résultat pour n à partir du résultat pour n-1 : c'est la relation de récurrence.",
          "Remplacer la boucle par un seul appel qui combine l'étape courante et le résultat de l'appel plus petit.",
          "Vérifier sur n = 0, 1, 2 avec un déroulement manuel de la pile d'appels.",
        ],
      },
      {
        type: "table",
        title: "Récursif ou itératif ? Les deux versions",
        head: ["Problème", "Version itérative", "Version récursive"],
        rows: [
          ["Factorielle", "Boucle de 1 à n en multipliant", "Fact(n) = n × Fact(n-1), Fact(1)=1"],
          ["Somme 1..n", "Boucle d'accumulation", "Somme(n) = n + Somme(n-1), Somme(1)=1"],
          ["PGCD (Euclide)", "Tant que b ≠ 0 : (a,b) ← (b, a mod b)", "Pgcd(a,b) = Pgcd(b, a mod b) si b ≠ 0, sinon a"],
          ["Puissance x^n", "n multiplications", "Puiss(x,n) = x × Puiss(x,n-1), Puiss(x,0)=1"],
          ["Nombre de chiffres", "Compteur dans une boucle", "NbChiffres(n) = 1 + NbChiffres(n div 10), base n < 10"],
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Le piège de l'examen",
        text: "Oublier le cas de base, ou écrire n-1 au lieu de n div 10 pour les nombres (la pile ne se vide jamais). Pour Fibonacci, la version récursive naïve recalcule les mêmes valeurs : sa complexité est exponentielle — le programme officiel demande justement de savoir comparer les deux formulations.",
      },
    ],
    keyPoints: [
      "Cas de base + appel sur un paramètre strictement plus petit = terminaison garantie.",
      "Toute fonction récursive peut s'écrire de façon itérative, et inversement.",
      "La récursivité utilise la pile d'exécution : chaque appel empile un contexte.",
      "Certains problèmes (tours de Hanoï, huit dames) s'écrivent naturellement en récursif.",
    ],
    pitfalls: [
      "Écrire une récursivité sans condition d'arrêt → « RecursionError » / débordement de pile.",
      "Confondre cas de base et premier appel.",
      "Croire que la version récursive est toujours plus rapide : c'est souvent l'inverse.",
    ],
    flashcards: [
      {
        question: "Quelles sont les deux parties obligatoires d'une fonction récursive ?",
        answer: "Le cas de base (résolu sans appel) et la relation de récurrence (appel avec un paramètre plus petit).",
      },
      {
        question: "Écris la version récursive du PGCD.",
        answer: "Pgcd(a, b) : si b = 0 alors retourner a, sinon retourner Pgcd(b, a mod b).",
      },
      {
        question: "Pourquoi la version récursive naïve de Fibonacci est-elle inefficace ?",
        answer:
          "Parce qu'elle recalcule plusieurs fois les mêmes termes : le nombre d'appels croît de façon exponentielle, alors qu'une version itérative travaille en n étapes.",
      },
    ],
    tags: ["récursivité", "cas de base", "pile d'appels", "PGCD", "algorithmique"],
  },
  {
    slug: "tri-insertion-shell",
    subjectSlug: "informatique",
    title: "Tri par insertion et tri Shell",
    chapter: "Algorithmique · Algorithmes de tri",
    summary:
      "Trier un tableau en place : insérer chaque élément à sa place dans la partie déjà triée (insertion), puis accélérer la démarche en comparant des éléments éloignés (Shell).",
    level: "Bac · Informatique (T1) · 10 h",
    durationMin: 28,
    orderIndex: 3,
    objectives: [
      "Dérouler le tri par insertion sur un exemple et compter les comparaisons",
      "Écrire l'algorithme du tri par insertion avec une boucle while interne",
      "Comprendre le rôle du pas décroissant dans le tri Shell",
      "Comparer les tris selon le nombre de comparaisons et la stabilité",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Le principe de l'insertion",
        text: "On considère que la partie gauche du tableau (indices 1 à i-1) est déjà triée. On prend l'élément d'indice i, on le mémorise dans une variable temporaire, puis on décale vers la droite tous les éléments plus grands que lui. Il reste alors une place libre : on y écrit la valeur. Comme au jeu de cartes quand on insère une carte dans son éventail.",
      },
      {
        type: "formula",
        title: "Algorithme du tri par insertion",
        expression:
          "Pour i de 2 à n Faire\n  temp ← T[i]\n  j ← i - 1\n  TantQue (j ≥ 1) et (T[j] > temp) Faire\n    T[j+1] ← T[j]\n    j ← j - 1\n  FinTantQue\n  T[j+1] ← temp\nFinPour",
        note: "La condition composée s'écrit dans cet ordre : on teste j ≥ 1 avant de lire T[j], sinon on sort du tableau (erreur d'indice).",
      },
      {
        type: "table",
        title: "Déroulement sur [5, 2, 4, 1]",
        head: ["i", "temp", "Comparaisons", "Tableau après insertion"],
        rows: [
          ["2", "2", "5 > 2 → décalage", "[2, 5, 4, 1]"],
          ["3", "4", "5 > 4 → décalage ; 2 < 4 → stop", "[2, 4, 5, 1]"],
          ["4", "1", "5, 4, 2 > 1 → trois décalages", "[1, 2, 4, 5]"],
        ],
      },
      {
        type: "paragraph",
        title: "Le tri Shell : le même tri, mais de loin",
        text: "Dans le tri par insertion, un petit élément situé à la fin du tableau doit traverser tout le tableau un cran à la fois. Le tri Shell commence par comparer des éléments éloignés d'un pas p (par exemple n div 2, puis p div 2, jusqu'à 1). Chaque passe rapproche les éléments de leur position finale ; la dernière passe (p = 1) est exactement un tri par insertion, mais sur un tableau presque trié, donc très rapide.",
      },
      {
        type: "formula",
        title: "Squelette du tri Shell",
        expression: "p ← n div 2\nTantQue p ≥ 1 Faire\n  { tri par insertion avec le pas p : comparer T[i] et T[i-p] }\n  p ← p div 2\nFinTantQue",
        note: "Le corps de la boucle est identique à l'insertion en remplaçant 1 par p : on décale de p en p au lieu de 1 en 1.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Ce qu'on attend de toi au bac",
        text: "Savoir écrire l'algorithme, le dérouler sur un petit tableau et donner le nombre de comparaisons pour un tableau déjà trié (n-1, cas le meilleur) et pour un tableau trié à l'envers (n(n-1)/2, cas le pire).",
      },
    ],
    keyPoints: [
      "Tri par insertion : en place, stable, complexité n² dans le pire cas, n dans le meilleur cas.",
      "La boucle interne est un TantQue avec double condition : indice valide ET valeur supérieure.",
      "Tri Shell : pas décroissant, dernière passe avec p = 1.",
      "Un tri « en place » n'utilise qu'une mémoire auxiliaire constante.",
    ],
    pitfalls: [
      "Inverser les deux conditions du TantQue (accès hors tableau).",
      "Oublier d'écrire temp à la fin : la valeur insérée est perdue.",
      "Croire que Shell change le résultat : il change seulement le nombre d'opérations.",
    ],
    flashcards: [
      {
        question: "Pourquoi le tri par insertion est-il rapide sur un tableau presque trié ?",
        answer: "Parce que la boucle interne s'arrête presque tout de suite : le nombre de décalages est proche de zéro.",
      },
      {
        question: "Quelle est la dernière valeur du pas dans le tri Shell ?",
        answer: "p = 1 : la dernière passe est un tri par insertion classique.",
      },
      {
        question: "Le tri par insertion est-il stable ?",
        answer: "Oui : deux éléments égaux ne sont jamais échangés, ils gardent leur ordre d'origine.",
      },
    ],
    tags: ["tri", "insertion", "Shell", "complexité", "algorithmique"],
  },
  {
    slug: "algorithmes-recurrents",
    subjectSlug: "informatique",
    title: "Algorithmes récurrents d'ordre 2 et plus",
    chapter: "Algorithmique · Suites récurrentes",
    summary:
      "Calculer les termes d'une suite définie par plusieurs termes précédents (Fibonacci, factorielle double, suites du second ordre) en itératif et en récursif, puis comparer les deux approches.",
    level: "Bac · Informatique (T2) · 16 h",
    durationMin: 30,
    orderIndex: 4,
    objectives: [
      "Reconnaître l'ordre d'une relation de récurrence",
      "Calculer un terme avec deux ou trois variables d'accumulation",
      "Écrire la version récursive correspondante",
      "Mesurer le coût des deux versions",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Ordre d'une relation de récurrence",
        text: "Une suite est d'ordre 1 si chaque terme dépend du précédent (u(n) = f(u(n-1))), d'ordre 2 s'il dépend des deux précédents (u(n) = f(u(n-1), u(n-2))). En 4ème année, on traite les ordres 2 et plus : Fibonacci, Lucas, suites du type u(n) = a·u(n-1) + b·u(n-2) + c, ou encore la factorielle du produit des deux précédents.",
      },
      {
        type: "formula",
        title: "Fibonacci en itératif : deux variables suffisent",
        expression:
          "a ← u0 ; b ← u1\nPour i de 2 à n Faire\n  c ← a + b\n  a ← b\n  b ← c\nFinPour\n{ résultat = b }",
        note: "Le décalage a ← b puis b ← c est l'étape qu'on oublie : si on écrit a ← c avant b ← c, on perd un terme. La version récursive naïve de Fibonacci est exponentielle.",
      },
      {
        type: "table",
        title: "Deux suites classiques du programme",
        head: ["Suite", "Relation", "Conditions initiales", "Remarque"],
        rows: [
          ["Fibonacci", "F(n) = F(n-1) + F(n-2)", "F(0)=0, F(1)=1", "Modélise la croissance des lapins ; version itérative en n étapes"],
          ["Lucas", "L(n) = L(n-1) + L(n-2)", "L(0)=2, L(1)=1", "Même relation, conditions initiales différentes"],
          ["Suite du 2nd ordre", "u(n) = 3·u(n-1) − 2·u(n-2)", "u(0)=1, u(1)=3", "Converge vers une limite : on peut l'afficher pour n grand"],
          ["Produit récurrent", "P(n) = n × P(n-1) × P(n-2)", "P(0)=P(1)=1", "Ordre 2 avec opération produit : attention aux grands nombres"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — écrire un calcul récurrent d'ordre 2",
        items: [
          "Initialiser les deux (ou trois) premiers termes dans les variables a, b, c.",
          "Traiter à part les cas n = 0 et n = 1 (le résultat est déjà connu).",
          "Boucler de 2 à n : calculer le nouveau terme, puis décaler les variables dans le bon ordre.",
          "Afficher le terme demandé et, éventuellement, tous les termes intermédiaires pour vérifier.",
          "Passer à la version récursive en écrivant la relation telle quelle, avec deux cas de base.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Attention aux grands nombres",
        text: "F(50) dépasse la capacité d'un entier sur 16 bits. En algorithmique, on signale ce risque ; en Python, les entiers sont illimités, ce qui permet de calculer sans précaution — mais le temps de calcul, lui, reste à analyser.",
      },
    ],
    keyPoints: [
      "Ordre 2 = deux termes précédents nécessaires ; il faut donc deux variables d'accumulation.",
      "L'ordre des affectations de décalage est décisif.",
      "Version itérative : n étapes, mémoire constante. Version récursive naïve : exponentielle.",
      "Toujours traiter séparément les cas initiaux.",
    ],
    pitfalls: [
      "Utiliser une seule variable et perdre le terme n-2.",
      "Oublier le cas n = 0 dans la version récursive.",
      "Confondre suite arithmétique/géométrique (ordre 1) et suite récurrente d'ordre 2.",
    ],
    flashcards: [
      {
        question: "Combien de variables sont nécessaires pour calculer Fibonacci itérativement ?",
        answer: "Deux variables (les deux derniers termes) plus une variable temporaire pour le nouveau terme.",
      },
      {
        question: "Pourquoi la version récursive naïve de Fibonacci est-elle lente ?",
        answer: "Chaque appel en déclenche deux autres : le nombre d'appels double à chaque niveau, d'où une croissance exponentielle.",
      },
      {
        question: "Quel est l'ordre de la relation u(n) = u(n-1) + u(n-3) ?",
        answer: "Ordre 3 : elle utilise trois termes précédents.",
      },
    ],
    tags: ["suite récurrente", "Fibonacci", "ordre 2", "itératif", "algorithmique"],
  },
  {
    slug: "algorithmes-arithmetique",
    subjectSlug: "informatique",
    title: "Algorithmes d'arithmétique : PGCD, divisibilité, Fibonacci, bases et dénombrement",
    chapter: "Algorithmique · Arithmétique",
    summary:
      "Les algorithmes d'arithmétique du programme : PGCD récursif (Euclide), règles de divisibilité, suite de Fibonacci, conversions entre bases de numération et calcul de C(n,p) et A(n,p).",
    level: "Bac · Informatique (T2) · 16 h",
    durationMin: 34,
    orderIndex: 5,
    objectives: [
      "Écrire le PGCD de deux entiers en version récursive et itérative",
      "Tester la divisibilité et la primalité d'un entier",
      "Convertir un entier d'une base vers une autre",
      "Calculer une combinaison et un arrangement sans débordement inutile",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Euclide : l'algorithme le plus rentable du programme",
        text: "Le PGCD de a et b est le PGCD de b et du reste de la division de a par b. On répète jusqu'à obtenir un reste nul : le dernier diviseur non nul est le PGCD. La version récursive tient en deux lignes, ce qui en fait l'exemple favori des exercices de récursivité.",
      },
      {
        type: "formula",
        title: "Pgcd, Ppcm et primalité",
        expression:
          "Fonction Pgcd(a, b) : Entier\n  Si b = 0 Alors Retourner a\n  Sinon Retourner Pgcd(b, a mod b)\n\nPpcm(a, b) = a * b div Pgcd(a, b)",
        note: "Primalité : n est premier si aucun entier de 2 à √n ne le divise. Tester jusqu'à n-1 est correct mais deux fois plus lent qu'un test jusqu'à la racine carrée.",
      },
      {
        type: "table",
        title: "Règles de divisibilité à connaître",
        head: ["Diviseur", "Critère", "Utilisation algorithmique"],
        rows: [
          ["2 / 5", "Dernier chiffre pair / 0 ou 5", "n mod 2 = 0, n mod 5 = 0"],
          ["3 / 9", "Somme des chiffres divisible par 3 / 9", "Boucle d'extraction des chiffres avec div et mod"],
          ["4 / 25", "Deux derniers chiffres", "n mod 100"],
          ["7, 11, 13", "Pas de critère simple : division directe", "n mod d = 0 avec d de 2 à √n"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — convertir un entier décimal en base b",
        items: [
          "Répéter : écrire le reste de la division par b, puis remplacer n par le quotient entier.",
          "Continuer tant que le quotient est non nul.",
          "Lire les restes à l'envers : ils forment le nombre dans la base b.",
          "Pour les bases supérieures à 10 (hexadécimal), convertir les restes 10 à 15 en A à F.",
          "Vérifier par une conversion inverse (somme des chiffres × puissances de b).",
        ],
      },
      {
        type: "formula",
        title: "Combinaisons et arrangements",
        expression: "C(n, p) = n! / (p! × (n-p)!)   ·   A(n, p) = n! / (n-p)!",
        note: "Mieux vaut calculer C(n,p) par produits successifs : C(n,p) = C(n,p-1) × (n-p+1) / p, ce qui évite les factorielles énormes et les divisions flottantes.",
      },
      {
        type: "callout",
        tone: "tip",
        title: "Version récursive de C(n, p)",
        text: "C(n,p) = C(n-1,p-1) + C(n-1,p), avec C(n,0) = C(n,n) = 1 : c'est le triangle de Pascal. Cette formule se démontre en séparant les combinaisons qui contiennent un élément donné de celles qui ne le contiennent pas.",
      },
    ],
    keyPoints: [
      "Euclide : Pgcd(a,b) = Pgcd(b, a mod b), arrêt quand b = 0.",
      "Ppcm(a,b) × Pgcd(a,b) = a × b.",
      "Conversion de base : restes successifs lus à l'envers.",
      "C(n,p) = C(n,n-p) permet de réduire le nombre d'opérations.",
    ],
    pitfalls: [
      "Calculer Ppcm par a*b avant de diviser : débordement possible, diviser d'abord.",
      "Tester la primalité jusqu'à n au lieu de √n.",
      "Lire les restes de conversion dans le mauvais ordre.",
    ],
    flashcards: [
      {
        question: "Écris la version récursive du PGCD.",
        answer: "Pgcd(a,b) : si b = 0 alors a, sinon Pgcd(b, a mod b).",
      },
      {
        question: "Comment obtient-on l'écriture binaire d'un entier ?",
        answer: "En divisant successivement par 2 et en lisant les restes à l'envers.",
      },
      {
        question: "Relation entre PGCD et PPCM ?",
        answer: "Pgcd(a,b) × Ppcm(a,b) = a × b.",
      },
    ],
    tags: ["PGCD", "Euclide", "divisibilité", "base de numération", "combinaison"],
  },
  {
    slug: "algorithmes-approximation",
    subjectSlug: "informatique",
    title: "Algorithmes d'approximation : point fixe, constantes et calcul d'aires",
    chapter: "Algorithmique · Approximation",
    summary:
      "Quand la solution exacte n'existe pas (ou coûte trop cher), on l'approche : méthode du point fixe, calcul de π et de e par séries, calcul d'aires par rectangles et trapèzes.",
    level: "Bac · Informatique (T3) · 10 h",
    durationMin: 30,
    orderIndex: 6,
    objectives: [
      "Distinguer méthode exacte et méthode approchée",
      "Appliquer la méthode du point fixe à une équation f(x) = x",
      "Programmer le calcul d'une constante par une série convergente",
      "Calculer une intégrale par la méthode des rectangles puis des trapèzes",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Approcher, c'est encadrer",
        text: "Un algorithme d'approximation ne donne pas la valeur exacte mais une valeur dont on sait mesurer l'écart. Tous reposent sur un critère d'arrêt : soit un nombre d'itérations fixé, soit un écart entre deux valeurs successives inférieur à une précision ε (par exemple 10⁻⁶). Sans critère d'arrêt, la boucle ne s'arrête jamais.",
      },
      {
        type: "formula",
        title: "Méthode du point fixe",
        expression:
          "x0 donné\nRépéter\n  x ← f(x)\nJusqu'à |x - precedent| < ε",
        note: "Si f est contractante sur un intervalle (|f'(x)| < 1), la suite converge vers le point fixe, c'est-à-dire la solution de f(x) = x. C'est la même idée que la dichotomie, mais sans encadrement.",
      },
      {
        type: "table",
        title: "Trois calculs classiques",
        head: ["Objectif", "Formule utilisée", "Convergence"],
        rows: [
          ["π", "π/4 = 1 − 1/3 + 1/5 − 1/7 + … (Leibniz)", "Très lente : il faut beaucoup de termes"],
          ["e", "e = 1 + 1/1! + 1/2! + 1/3! + …", "Rapide : quelques termes suffisent"],
          ["√a", "x ← (x + a/x) / 2 (Héron)", "Très rapide, critère |x² − a| < ε"],
        ],
      },
      {
        type: "steps",
        title: "Méthode — aire par rectangles puis trapèzes",
        items: [
          "Découper [a, b] en n sous-intervalles de largeur h = (b-a)/n.",
          "Rectangles : somme des h × f(a + k·h), pour k de 0 à n-1 (rectangles à gauche).",
          "Trapèzes : somme des h × (f(xk) + f(xk+1))/2, plus précis car on remplace la marche par une pente.",
          "Doubler n et comparer : si l'écart est inférieur à ε, on arrête et on garde la dernière valeur.",
        ],
      },
      {
        type: "callout",
        tone: "warn",
        title: "Erreur classique",
        text: "Utiliser = au lieu de < dans le test d'arrêt sur des réels : deux valeurs approchées ne sont presque jamais exactement égales. On écrit toujours |x − y| < ε.",
      },
    ],
    keyPoints: [
      "Un algorithme approché exige un critère d'arrêt (nombre d'itérations ou précision ε).",
      "Point fixe : on cherche x tel que x = f(x).",
      "La méthode des trapèzes est plus précise que celle des rectangles pour le même n.",
      "Tests d'arrêt sur réels : comparaison à ε, jamais égalité stricte.",
    ],
    pitfalls: [
      "Boucle infinie faute de critère d'arrêt.",
      "Prendre h = b − a sans diviser par n.",
      "Comparer deux flottants avec = .",
    ],
    flashcards: [
      {
        question: "Qu'est-ce qu'un point fixe de f ?",
        answer: "Un réel x tel que f(x) = x ; la méthode du point fixe construit une suite qui converge vers lui.",
      },
      {
        question: "Pourquoi la méthode des trapèzes est-elle plus précise ?",
        answer: "Elle approxime la courbe par des segments obliques au lieu de marches horizontales : l'erreur diminue en 1/n² au lieu de 1/n.",
      },
      {
        question: "Quel critère d'arrêt utiliser sur des réels ?",
        answer: "|x_nouveau − x_ancien| < ε avec ε la précision souhaitée.",
      },
    ],
    tags: ["approximation", "point fixe", "intégrale", "π", "précision"],
  },
  {
    slug: "algorithmes-avances",
    subjectSlug: "informatique",
    title: "Algorithmes avancés : tri rapide, tours de Hanoï, huit dames et voyageur de commerce",
    chapter: "Algorithmique · Algorithmes avancés",
    summary:
      "Les quatre algorithmes « avancés » du programme : tri rapide (diviser pour régner), tours de Hanoï, problème des huit dames et voyageur de commerce — l'occasion de comprendre la stratégie « diviser pour régner » et le coût des problèmes combinatoires.",
    level: "Bac · Informatique (T3) · 16 h",
    durationMin: 34,
    orderIndex: 7,
    objectives: [
      "Décrire la stratégie diviser pour régner sur le tri rapide",
      "Écrire la récursivité des tours de Hanoï",
      "Comprendre le retour sur trace (backtracking) sur les huit dames",
      "Expliquer pourquoi le voyageur de commerce est un problème coûteux",
    ],
    blocks: [
      {
        type: "paragraph",
        title: "Trois stratégies, un même objectif",
        text: "Le tri rapide divise un problème de tri en deux sous-problèmes plus petits autour d'un pivot. Les tours de Hanoï montrent une récursivité d'une élégance rare : pour déplacer n disques, on déplace n-1 disques, on bouge le plus grand, on redéplace n-1 disques. Les huit dames et le voyageur de commerce illustrent les problèmes combinatoires : on explore des possibilités et on revient en arrière dès qu'une contrainte est violée.",
      },
      {
        type: "formula",
        title: "Tri rapide (quicksort)",
        expression:
          "TriRapide(T, debut, fin)\n  Si debut < fin Alors\n    p ← Partition(T, debut, fin)   { place le pivot }\n    TriRapide(T, debut, p-1)\n    TriRapide(T, p+1, fin)\n  FinSi",
        note: "Partition : on choisit le pivot (souvent le dernier élément), on place à gauche tout ce qui est plus petit, à droite tout ce qui est plus grand, et on renvoie l'indice final du pivot.",
      },
      {
        type: "formula",
        title: "Tours de Hanoï",
        expression:
          "Hanoi(n, depart, arrivee, intermediaire)\n  Si n = 1 Alors Déplacer(depart, arrivee)\n  Sinon\n    Hanoi(n-1, depart, intermediaire, arrivee)\n    Déplacer(depart, arrivee)\n    Hanoi(n-1, intermediaire, arrivee, depart)\n  FinSi",
        note: "Nombre de déplacements : 2ⁿ − 1. Pour 64 disques (légende), cela dépasse l'âge de l'univers — bel exemple de croissance exponentielle.",
      },
      {
        type: "steps",
        title: "Méthode — huit dames par retour sur trace",
        items: [
          "Placer une dame sur la première colonne, ligne par ligne.",
          "Vérifier les contraintes : pas deux dames sur la même ligne, la même colonne ou la même diagonale.",
          "Si une position est valide, passer à la colonne suivante (appel récursif).",
          "Si aucune ligne ne convient, revenir en arrière : retirer la dame et essayer la ligne suivante.",
          "Quand les huit colonnes sont remplies, on a une solution : l'afficher et continuer pour les compter.",
        ],
      },
      {
        type: "table",
        title: "Comparer les coûts",
        head: ["Problème", "Stratégie", "Coût"],
        rows: [
          ["Tri rapide", "Diviser pour régner", "n log n en moyenne, n² dans le pire cas (pivot mal choisi)"],
          ["Hanoï", "Récursivité", "2ⁿ − 1 déplacements : exponentiel"],
          ["Huit dames", "Retour sur trace", "92 solutions ; exploration guidée par les contraintes"],
          ["Voyageur de commerce", "Force brute ou heuristique", "n! parcours possibles : intraitable exactement dès que n grandit"],
        ],
      },
      {
        type: "callout",
        tone: "tip",
        title: "Ce que le correcteur attend",
        text: "Nommer la stratégie (diviser pour régner, retour sur trace), donner la récursivité exacte avec ses cas de base, et savoir conclure sur le coût : pour les problèmes combinatoires, on préfère une heuristique donnant une bonne solution en temps raisonnable plutôt qu'un optimum incalculable.",
      },
    ],
    keyPoints: [
      "Tri rapide : partition autour d'un pivot, puis deux appels récursifs.",
      "Hanoï : 2ⁿ − 1 déplacements, récursivité en trois étapes.",
      "Retour sur trace = essayer, vérifier, revenir si échec.",
      "Voyageur de commerce : coût factoriel, on se contente d'heuristiques.",
    ],
    pitfalls: [
      "Oublier le cas de base n = 1 dans Hanoï.",
      "Se tromper dans l'ordre des trois appels de Hanoï (les paramètres changent de rôle).",
      "Présenter le voyageur de commerce comme résoluble exactement pour un grand nombre de villes.",
    ],
    flashcards: [
      {
        question: "Combien de déplacements pour 5 disques à Hanoï ?",
        answer: "2⁵ − 1 = 31 déplacements.",
      },
      {
        question: "Quelle est la complexité moyenne du tri rapide ?",
        answer: "n log n, avec un pire cas en n² lorsque le pivot est systématiquement le plus petit ou le plus grand.",
      },
      {
        question: "Qu'est-ce que le retour sur trace ?",
        answer:
          "Une stratégie qui construit une solution pas à pas et revient en arrière dès qu'une contrainte est violée, en explorant les autres possibilités.",
      },
    ],
    tags: ["tri rapide", "Hanoï", "huit dames", "voyageur de commerce", "récursivité"],
  },
];

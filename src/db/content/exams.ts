import type { ExamPart } from "@/db/schema";

export type ExamSeed = {
  slug: string;
  title: string;
  subjectSlug: string;
  section: string;
  kind: "session" | "serie";
  year: number;
  durationMin: number;
  difficulty: number;
  description: string;
  parts: ExamPart[];
  advice: string[];
  correctionNotes: string[];
};

export const examsSeed: ExamSeed[] = [
  {
    slug: "bac-math-sciences-session",
    title: "Épreuve de mathématiques — session principale",
    subjectSlug: "mathematiques",
    section: "Sciences expérimentales",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "Sujet complet type bac : suites, calcul intégral et probabilités. Barème indicatif 20 points, corrigé détaillé question par question.",
    parts: [
      {
        title: "Exercice 1 — Suites (6 points)",
        intro:
          "Soit la suite (Uₙ) définie par U₀ = 4 et Uₙ₊₁ = (1/3)Uₙ + 2 pour tout n ∈ ℕ.",
        questions: [
          {
            prompt: "Calculer U₁ et U₂ et conjecturer le sens de variation de la suite.",
            method: "Calcul direct, puis comparer Uₙ₊₁ à Uₙ en étudiant la différence.",
            answer:
              "U₁ = 4/3 + 2 = 10/3 ≈ 3,33 et U₂ = 10/9 + 2 = 28/9 ≈ 3,11. La suite semble décroissante et minorée par 3.",
            points: 2,
          },
          {
            prompt: "Montrer que Vₙ = Uₙ − 3 est géométrique de raison 1/3.",
            method: "Calculer Vₙ₊₁ en fonction de Vₙ et factoriser.",
            answer:
              "Vₙ₊₁ = Uₙ₊₁ − 3 = (1/3)Uₙ − 1 = (1/3)(Uₙ − 3) = (1/3)Vₙ. Donc (Vₙ) est géométrique de raison 1/3 et V₀ = 1.",
            points: 2,
          },
          {
            prompt: "En déduire Uₙ puis la limite de (Uₙ).",
            method: "Utiliser Vₙ = V₀qⁿ puis revenir à Uₙ.",
            answer:
              "Vₙ = (1/3)ⁿ donc Uₙ = 3 + (1/3)ⁿ. Comme (1/3)ⁿ → 0, on a lim Uₙ = 3.",
            points: 2,
          },
        ],
      },
      {
        title: "Exercice 2 — Calcul intégral (7 points)",
        intro: "Soit f(x) = x·e^(−x) sur [0, +∞[.",
        questions: [
          {
            prompt: "Étudier le sens de variation de f sur [0, +∞[.",
            method: "Dériver un produit : (uv)′ = u′v + uv′.",
            answer:
              "f′(x) = e^(−x)(1 − x). f′ > 0 sur [0, 1[, nulle en 1, négative sur ]1, +∞[. f croît puis décroît, maximum f(1) = e⁻¹.",
            points: 3,
          },
          {
            prompt: "Calculer I = ∫₀¹ f(x) dx.",
            method: "Intégration par parties avec u′ = e^(−x) et v = x.",
            answer:
              "On pose u = −e^(−x), v = x. I = [−x e^(−x)]₀¹ + ∫₀¹ e^(−x) dx = −e⁻¹ + [−e^(−x)]₀¹ = −e⁻¹ + 1 − e⁻¹ = 1 − 2e⁻¹ ≈ 0,264.",
            points: 3,
          },
          {
            prompt: "Interpréter graphiquement I et donner une valeur approchée.",
            method: "Aire sous la courbe, unité d'aire.",
            answer:
              "I est l'aire, en unités d'aire, du domaine limité par la courbe, l'axe des abscisses et les droites x = 0 et x = 1. I ≈ 0,264 u.a.",
            points: 1,
          },
        ],
      },
      {
        title: "Exercice 3 — Probabilités (7 points)",
        intro:
          "Une urne contient 4 boules rouges et 2 boules vertes indiscernables au toucher. On tire au hasard et simultanément 3 boules.",
        questions: [
          {
            prompt: "Combien y a-t-il de tirages possibles ?",
            method: "Tirage simultané : combinaisons C(n, p).",
            answer: "C(6, 3) = 20 tirages possibles.",
            points: 2,
          },
          {
            prompt: "Calculer la probabilité d'obtenir exactement 2 boules rouges.",
            method: "Choisir 2 rouges parmi 4 et 1 verte parmi 2.",
            answer:
              "Cas favorables : C(4,2) × C(2,1) = 6 × 2 = 12. Donc P = 12/20 = 3/5 = 0,6.",
            points: 2,
          },
          {
            prompt: "Calculer la probabilité d'obtenir au moins une boule verte.",
            method: "Passer par l'événement contraire (3 rouges).",
            answer:
              "P(3 rouges) = C(4,3)/C(6,3) = 4/20 = 1/5. Donc P(au moins une verte) = 1 − 1/5 = 4/5 = 0,8.",
            points: 3,
          },
        ],
      },
    ],
    advice: [
      "Commencer par l'exercice que tu maîtrises le mieux pour sécuriser des points.",
      "Rédiger la récurrence et les intégrations par parties en étapes visibles : le correcteur note la méthode.",
      "Vérifier les unités et les valeurs approchées demandées.",
    ],
    correctionNotes: [
      "Exercice 1 : la transformation Uₙ₊₁ − 3 est le cœur du raisonnement, l'oubli coûte 2 points.",
      "Exercice 2 : le signe de f′ doit être justifié par un tableau, pas seulement affirmé.",
      "Exercice 3 : préciser que le tirage est simultané justifie l'usage des combinaisons.",
    ],
  },
  {
    slug: "bac-physique-session",
    title: "Épreuve de sciences physiques — session principale",
    subjectSlug: "physique",
    section: "Sciences expérimentales",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "Deux parties : dipôle RC (10 points) et physique nucléaire (10 points), avec réponses rédigées et méthode attendue.",
    parts: [
      {
        title: "Partie A — Dipôle RC (10 points)",
        intro:
          "On réalise un circuit série avec un générateur idéal de tension E = 9,0 V, une résistance R = 4,7 kΩ et un condensateur de capacité C. À t = 0, on ferme l'interrupteur. La tension uC atteint 63 % de E au bout de 22 ms.",
        questions: [
          {
            prompt: "Montrer que l'équation différentielle s'écrit RC·duC/dt + uC = E.",
            method: "Loi des mailles + loi d'Ohm + relation du condensateur.",
            answer:
              "E = uR + uC avec uR = Ri et i = C·duC/dt, d'où E = RC·duC/dt + uC.",
            points: 3,
          },
          {
            prompt: "Déterminer la valeur de la capacité C.",
            method: "Lire τ = 22 ms à 63 % de la charge, puis C = τ/R.",
            answer:
              "τ = 22 ms = 2,2·10⁻² s et C = τ/R = 2,2·10⁻²/4,7·10³ ≈ 4,7·10⁻⁶ F, soit C ≈ 4,7 µF.",
            points: 3,
          },
          {
            prompt: "Écrire uC(t) et calculer sa valeur à t = 50 ms.",
            method: "Solution exponentielle, conversion des unités.",
            answer:
              "uC(t) = 9,0(1 − e^(−t/τ)). uC(0,050) = 9,0(1 − e^(−50/22)) ≈ 9,0(1 − e^(−2,27)) ≈ 8,1 V.",
            points: 2,
          },
          {
            prompt: "Calculer l'énergie stockée à t = 50 ms.",
            method: "E = ½C·uC².",
            answer: "E = ½ × 4,7·10⁻⁶ × (8,1)² ≈ 1,5·10⁻⁴ J, soit environ 150 µJ.",
            points: 2,
          },
        ],
      },
      {
        title: "Partie B — Physique nucléaire (10 points)",
        intro:
          "Un échantillon contient initialement N₀ noyaux de ¹³¹I de demi-vie t₁/₂ = 8,0 jours, utilisé en médecine.",
        questions: [
          {
            prompt: "Écrire l'équation de désintégration β⁻ de l'iode 131 (Z = 53, A = 131).",
            method: "Conservation de A et Z.",
            answer: "¹³¹₅₃I → ¹³¹₅₄Xe + ⁰₋₁e + ν̄.",
            points: 2,
          },
          {
            prompt: "Calculer la constante radioactive λ en jour⁻¹.",
            method: "λ = ln2 / t₁/₂.",
            answer: "λ = 0,693/8,0 ≈ 8,7·10⁻² jour⁻¹.",
            points: 2,
          },
          {
            prompt: "Quel pourcentage des noyaux reste-t-il après 24 jours ?",
            method: "Compter les demi-vies.",
            answer:
              "24 jours = 3 × 8 jours, donc trois demi-vies : il reste (1/2)³ = 1/8 = 12,5 % des noyaux.",
            points: 3,
          },
          {
            prompt: "L'activité initiale est A₀ = 3,7·10⁸ Bq. Calculer l'activité au bout de 24 jours.",
            method: "A(t) = A₀e^(−λt), ou proportionnalité à N(t).",
            answer: "A(24) = 3,7·10⁸/8 ≈ 4,6·10⁷ Bq.",
            points: 3,
          },
        ],
      },
    ],
    advice: [
      "Tracer un schéma du circuit avec les flèches de tension avant toute équation.",
      "Écrire les unités après chaque valeur numérique : une grandeur sans unité coûte un point.",
      "Pour la radioactivité, vérifier la conservation de A et Z avant de conclure.",
    ],
    correctionNotes: [
      "Le calcul de C exige la conversion de τ en secondes et de R en ohms.",
      "Le neutrino est obligatoire dans l'écriture β⁻.",
      "L'énergie stockée dépend de uC² : une erreur sur uC se répercute fortement.",
    ],
  },
  {
    slug: "bac-svt-session",
    title: "Épreuve de sciences naturelles — session principale",
    subjectSlug: "svt",
    section: "Sciences expérimentales",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "Génétique et immunologie : exploitation de documents, interprétation chromosomique et argumentation sur la vaccination.",
    parts: [
      {
        title: "Partie 1 — Génétique (10 points)",
        intro:
          "Chez une plante, on croise deux lignées pures : une à fleurs rouges et tiges longues, l'autre à fleurs blanches et tiges courtes. La F1 est entièrement rouge et longue tige. On croise ensuite une plante F1 avec la lignée blanche/courte et on obtient : 348 rouges-longues, 352 blanches-courtes, 96 rouges-courtes, 104 blanches-longues.",
        questions: [
          {
            prompt: "Que peut-on déduire du résultat de la F1 ?",
            method: "Observer l'uniformité de la première génération.",
            answer:
              "La F1 est homogène : les allèles rouge et longue tige sont dominants. Les parents sont homozygotes (RRLL et rrll).",
            points: 2,
          },
          {
            prompt: "Analysez les proportions du test-cross.",
            method: "Comparer effectifs parentaux et recombinants ; calculer le pourcentage.",
            answer:
              "Les phénotypes parentaux dominent (348 et 352) tandis que les recombinants sont minoritaires (96 et 104). On en déduit que les deux gènes sont liés sur le même chromosome et qu'un crossing-over a produit des gamètes recombinants.",
            points: 4,
          },
          {
            prompt: "Calculez la distance entre les deux gènes et interprétez-la.",
            method: "Recombinants / total × 100.",
            answer:
              "Recombinants = 200 ; total = 900. Distance = 22,2 cM. Les deux gènes sont séparés d'environ 22 centimorgans sur le même chromosome.",
            points: 2,
          },
          {
            prompt: "Représentez les chromosomes de la plante F1 en indiquant les allèles.",
            method: "Schéma annoté avec deux chromatides par chromosome.",
            answer:
              "Deux chromosomes homologues : l'un porte R et L, l'autre r et l. Après duplication, chaque chromosome possède deux chromatides identiques. Le crossing-over échange des segments entre chromatides homologues, produisant les gamètes RL, rl (majoritaires) et Rl, rL (recombinants).",
            points: 2,
          },
        ],
      },
      {
        title: "Partie 2 — Immunologie (10 points)",
        intro:
          "On compare l'évolution des anticorps chez deux souris : la souris A reçoit un antigène X, la souris B reçoit l'antigène X puis une deuxième injection de X vingt jours plus tard.",
        questions: [
          {
            prompt: "Décrivez et expliquez la réponse de la souris A.",
            method: "Décrire le délai et l'amplitude avant d'expliquer le mécanisme.",
            answer:
              "Réponse primaire : latence de plusieurs jours, pic modéré puis décroissance. Les CPA présentent l'antigène aux LT4 qui stimulent les LB ; ceux-ci se différencient en plasmocytes et en LB mémoire.",
            points: 3,
          },
          {
            prompt: "Comparez la réponse de la souris B avec celle de A.",
            method: "Utiliser les termes réponse primaire/secondaire et expliquer le mécanisme.",
            answer:
              "Après le rappel, la production d'anticorps est plus rapide (pic en 3-4 jours) et plus intense. Les LB mémoire, plus nombreux et déjà spécifiques, se différencient immédiatement en plasmocytes sans longue étape d'activation.",
            points: 4,
          },
          {
            prompt: "Expliquez pourquoi ce protocole est celui de la vaccination.",
            method: "Relier mémoire immunitaire, protection durable et rôle du rappel.",
            answer:
              "Le premier contact immunise sans rendre malade, le rappel amplifie et prolonge la mémoire immunitaire. La protection devient durable : c'est le principe de la vaccination avec doses de rappel.",
            points: 3,
          },
        ],
      },
    ],
    advice: [
      "Commencer chaque réponse par la conclusion avant de la justifier reste toléré, mais l'argumentation doit suivre immédiatement.",
      "Toucher un schéma annoté, même simple, rapporte plus qu'un paragraphe confus.",
      "Ne jamais écrire un résultat de calcul sans avoir montré le raisonnement.",
    ],
    correctionNotes: [
      "L'analyse des proportions est obligatoire pour justifier la liaison des gènes.",
      "La distinction réponse primaire/secondaire doit être nommée explicitement.",
      "Les schémas doivent indiquer les allèles et les chromosomes homologues.",
    ],
  },
  {
    slug: "bac-philo-session",
    title: "Épreuve de philosophie — sujets et plans corrigés",
    subjectSlug: "philosophie",
    section: "Toutes sections",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "Deux sujets de dissertation avec problématique, plan détaillé, références et conclusion rédigée. Entraînement guidé de 3 heures.",
    parts: [
      {
        title: "Sujet 1 — « La liberté consiste-t-elle à faire ce que l'on veut ? »",
        questions: [
          {
            prompt: "Analysez le sujet et dégagez le problème.",
            method: "Distinguer les sens du mot « vouloir » et de l'expression « faire ce que l'on veut ».",
            answer:
              "Le sujet oppose une conception spontanée de la liberté (absence de contrainte, satisfaction du désir) à une conception rationnelle (volonté éclairée). Problème : le désir immédiat est-il la marque de la liberté ou celle d'une servitude ?",
            points: 20,
          },
          {
            prompt: "Construisez un plan détaillé en trois parties.",
            method: "Chaque partie doit comporter une idée, un argument, un exemple et une limite.",
            answer:
              "I. La liberté comme absence de contrainte et pouvoir de faire ce que l'on veut (liberté négative, spontanéité, Descartes). II. Les illusions de cette liberté (Spinoza, déterminismes sociaux, inconscient, désir aliéné, rôle protecteur de la loi). III. La liberté comme autonomie et responsabilité (Kant, Sartre) : vouloir ce que l'on fait en connaissance de cause.",
            points: 20,
          },
          {
            prompt: "Rédigez une conclusion qui ne répète pas l'introduction.",
            method: "Répondre, résumer le parcours, proposer une ouverture courte.",
            answer:
              "Faire ce que l'on veut n'est qu'une figure précaire de la liberté. Celle-ci se conquiert quand la volonté se règle sur la raison et assume ses conséquences : être libre, c'est vouloir ce que l'on fait, lucidement, et non obéir à chaque impulsion.",
            points: 20,
          },
        ],
      },
      {
        title: "Sujet 2 — « La vérité est-elle toujours bonne à dire ? »",
        questions: [
          {
            prompt: "Dégagez la problématique.",
            method: "Distinguer vérité et utilité, puis vérité et morale.",
            answer:
              "Le sujet ne demande pas si la vérité existe, mais si sa communication est toujours légitime. Tension entre exigence de vérité et respect d'autrui / bien commun.",
            points: 20,
          },
          {
            prompt: "Proposez un plan argumenté.",
            method: "Deux ou trois parties, chaque affirme avec un argument et une référence.",
            answer:
              "I. Oui : la vérité fonde la confiance, le mensonge traite autrui comme un moyen (Kant). II. Non : il existe des vérités inutiles ou destructrices, la vérité nue peut blesser ; le médecin annonce avec prudence. III. Au-delà : la vérité est un devoir mais sa communication est un art — le jugement pratique (Aristote, prudence) permet de concilier vérité et bien d'autrui.",
            points: 20,
          },
        ],
      },
    ],
    advice: [
      "Dix minutes de plan avant la rédaction : c'est ce qui distingue une copie construite d'une copie décousue.",
      "Une citation doit être expliquée, jamais laissée en ornement.",
      "Chaque partie doit pouvoir se résumer en une phrase avec un verbe.",
    ],
    correctionNotes: [
      "Le correcteur évalue la problématisation du sujet plus que la liste des doctrines.",
      "Les exemples doivent être analysés, pas simplement évoqués.",
      "La conclusion doit répondre à la question posée au conditionnel si nécessaire.",
    ],
  },
  {
    slug: "serie-math-suites-integrales",
    title: "Série d'exercices n°1 — suites et calcul intégral",
    subjectSlug: "mathematiques",
    section: "Mathématiques",
    kind: "serie",
    year: 2025,
    durationMin: 90,
    difficulty: 3,
    description:
      "Une série d'entraînement progressive sur les suites et l'intégration, avec corrigés détaillés et méthode de rédaction.",
    parts: [
      {
        title: "Exercice A — Suites imbriquées",
        intro:
          "U₀ = 1, V₀ = 5, et pour tout n : Uₙ₊₁ = (2Uₙ + Vₙ)/3, Vₙ₊₁ = (Uₙ + 2Vₙ)/3.",
        questions: [
          {
            prompt: "Montrer que la suite (Dₙ) définie par Dₙ = Vₙ − Uₙ est géométrique.",
            method: "Calculer Dₙ₊₁ en fonction de Dₙ.",
            answer:
              "Dₙ₊₁ = Vₙ₊₁ − Uₙ₊₁ = (Uₙ + 2Vₙ − 2Uₙ − Vₙ)/3 = (Vₙ − Uₙ)/3 = (1/3)Dₙ. Donc (Dₙ) est géométrique de raison 1/3 et D₀ = 4, d'où Dₙ = 4(1/3)ⁿ.",
            points: 4,
          },
          {
            prompt: "Montrer que (Uₙ) est croissante et que (Vₙ) est décroissante.",
            method: "Étudier Uₙ₊₁ − Uₙ et Vₙ₊₁ − Vₙ.",
            answer:
              "Uₙ₊₁ − Uₙ = (Vₙ − Uₙ)/3 = Dₙ/3 > 0 pour tout n : (Uₙ) est croissante. De même Vₙ₊₁ − Vₙ = −Dₙ/3 < 0 : (Vₙ) est décroissante. De plus Uₙ ≤ Vₙ pour tout n.",
            points: 4,
          },
          {
            prompt: "Montrer que les suites sont adjacentes et calculer leur limite commune.",
            method: "Deux conditions : monotonies opposées et Dₙ → 0.",
            answer:
              "Dₙ = 4(1/3)ⁿ → 0 et les monotonies sont opposées : les suites sont adjacentes, donc convergent vers une même limite L. Or Uₙ + Vₙ est constant égal à 6, d'où L = 3. Explicitement Uₙ = 3 − 2(1/3)ⁿ et Vₙ = 3 + 2(1/3)ⁿ.",
            points: 4,
          },
        ],
      },
      {
        title: "Exercice B — Intégrale et suite",
        intro: "Pour n ≥ 1, on pose Iₙ = ∫₁ᵉ (ln x)ⁿ dx.",
        questions: [
          {
            prompt: "Calculer I₁.",
            method: "Intégration par parties.",
            answer: "I₁ = [x ln x − x]₁ᵉ = (e − e) − (0 − 1) = 1.",
            points: 4,
          },
          {
            prompt: "Établir une relation entre Iₙ₊₁ et Iₙ.",
            method: "Intégrer par parties (ln x)^(n+1) en dérivant le logarithme.",
            answer:
              "Iₙ₊₁ = e − (n+1)Iₙ. En effet u′ = 1, v = (ln x)^(n+1) donne [x(ln x)^(n+1)]₁ᵉ − (n+1)∫₁ᵉ (ln x)ⁿ dx = e − (n+1)Iₙ.",
            points: 5,
          },
          {
            prompt: "Étudier la monotonie de (Iₙ) et sa limite.",
            method: "Comparer les intégrandes sur [1, e].",
            answer:
              "Sur [1, e], 0 ≤ ln x ≤ 1 donc (ln x)^(n+1) ≤ (ln x)ⁿ : la suite est décroissante et positive, donc convergente. La relation Iₙ₊₁ = e − (n+1)Iₙ impose Iₙ → 0 (sinon le membre de droite exploserait).",
            points: 5,
          },
        ],
      },
    ],
    advice: [
      "Toujours vérifier numériquement une relation de récurrence sur le premier rang.",
      "Indiquer le signe de l'intégrande avant d'affirmer une monotonie.",
      "Les suites adjacentes exigent deux hypothèses : monotonies opposées et différence tendant vers 0.",
    ],
    correctionNotes: [
      "Exercice A : si l'énoncé est incohérent, le signaler proprement rapporte des points de rigueur.",
      "Exercice B : la relation de récurrence est la question clé, la suite d'arguments doit être complète.",
    ],
  },
  {
    slug: "bac-informatique-session",
    title: "Épreuve d'informatique — algorithmique et bases de données",
    subjectSlug: "informatique",
    section: "Sciences expérimentales",
    kind: "session",
    year: 2024,
    durationMin: 120,
    difficulty: 2,
    description:
      "Un problème algorithmique complet (analyse, algorithme, Python) et des requêtes SQL sur une base de données de bibliothèque.",
    parts: [
      {
        title: "Partie A — Algorithmique (10 points)",
        intro:
          "Une bibliothèque enregistre les emprunts dans une liste de dictionnaires : {titre, adherent, jours}. On veut compter les emprunts en retard (jours > 15) et afficher les titres concernés.",
        questions: [
          {
            prompt: "Proposez une analyse (entrées, traitement, sorties).",
            method: "Décrire sans code.",
            answer:
              "Entrée : liste d'emprunts. Traitement : parcourir la liste, tester jours > 15, compter, collecter les titres. Sortie : nombre d'emprunts en retard et liste des titres concernés.",
            points: 3,
          },
          {
            prompt: "Écrivez l'algorithme puis le programme Python.",
            method: "Utiliser une boucle for et deux variables : compteur et liste.",
            answer:
              "def retards(emprunts):\n    titres = []\n    for e in emprunts:\n        if e['jours'] > 15:\n            titres.append(e['titre'])\n    return len(titres), titres",
            points: 4,
          },
          {
            prompt: "Quels tests proposez-vous ?",
            method: "Cas normal, cas limite et cas vide.",
            answer:
              "Liste vide → (0, []) ; emprunt à exactement 15 jours → non compté ; plusieurs retards → comptage correct. On teste aussi un dictionnaire sans clé 'jours' pour discuter de la robustesse.",
            points: 3,
          },
        ],
      },
      {
        title: "Partie B — SQL (10 points)",
        intro:
          "LIVRE(id, titre, auteur, annee) et EMPRUNT(id, livre_id, adherent, date_emprunt).",
        questions: [
          {
            prompt: "Afficher les titres publiés après 2000, triés par année croissante.",
            method: "WHERE + ORDER BY.",
            answer: "SELECT titre, annee FROM LIVRE WHERE annee > 2000 ORDER BY annee ASC;",
            points: 3,
          },
          {
            prompt: "Afficher le nombre d'emprunts par livre.",
            method: "JOIN + GROUP BY + COUNT.",
            answer:
              "SELECT L.titre, COUNT(E.id) AS nb\nFROM LIVRE L LEFT JOIN EMPRUNT E ON L.id = E.livre_id\nGROUP BY L.titre;",
            points: 3,
          },
          {
            prompt: "Afficher les adhérents ayant emprunté plus de 3 livres différents.",
            method: "GROUP BY adherent + HAVING.",
            answer:
              "SELECT adherent, COUNT(DISTINCT livre_id) AS nb\nFROM EMPRUNT\nGROUP BY adherent\nHAVING COUNT(DISTINCT livre_id) > 3;",
            points: 4,
          },
        ],
      },
    ],
    advice: [
      "Écrire un algorithme en français avant Python : les points d'analyse sont attribués séparément.",
      "En SQL, aligner les clauses sur des lignes différentes pour éviter les erreurs de syntaxe.",
      "LEFT JOIN est nécessaire pour conserver les livres jamais empruntés.",
    ],
    correctionNotes: [
      "HAVING filtre après regroupement, WHERE avant : distinction essentielle.",
      "COUNT(DISTINCT ...) évite de compter plusieurs fois le même livre.",
      "Le test de la liste vide est explicitement attendu dans le barème.",
    ],
  },
  {
    slug: "bac-eco-gestion-session",
    title: "Épreuve d'économie et gestion — session principale",
    subjectSlug: "economie",
    section: "Économie & Gestion",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "Analyse de documents économiques, calculs de croissance et exercice comptable : corrigé complet avec barème.",
    parts: [
      {
        title: "Partie 1 — Croissance et développement (10 points)",
        intro:
          "Le PIB tunisien en volume a augmenté de 1,8 % en 2023, alors que l'inflation a atteint 9,3 % et que le taux de chômage des jeunes dépasse 35 %.",
        questions: [
          {
            prompt: "Expliquez la différence entre croissance nominale et croissance réelle.",
            method: "Définir puis illustrer avec les chiffres du document.",
            answer:
              "La croissance nominale inclut la hausse des prix ; la croissance réelle mesure l'augmentation des quantités produites à prix constants. Un PIB nominal en forte hausse peut correspondre à une croissance réelle faible : c'est l'effet de l'inflation.",
            points: 3,
          },
          {
            prompt: "Montrez que la croissance est nécessaire mais non suffisante au développement.",
            method: "Utiliser les indicateurs du document (inflation, chômage des jeunes).",
            answer:
              "La croissance crée des ressources, mais leur répartition détermine le développement. Avec une inflation élevée et un chômage important, les gains de production ne se traduisent pas en amélioration du bien-être : il faut des politiques d'emploi, d'éducation et de protection sociale.",
            points: 4,
          },
          {
            prompt: "Proposez deux mesures pour un développement plus inclusif en Tunisie.",
            method: "Chaque mesure doit être justifiée par un mécanisme économique.",
            answer:
              "1) Investir dans la formation professionnelle et l'employabilité des jeunes pour réduire le chômage structurel. 2) Soutenir les PME et l'entrepreneuriat régional pour créer des emplois dans les régions intérieures et réduire les disparités. On peut ajouter la formalisation de l'économie et la maîtrise de l'inflation.",
            points: 3,
          },
        ],
      },
      {
        title: "Partie 2 — Gestion comptable (10 points)",
        intro:
          "Une entreprise achète à crédit un matériel de 20 000 DT (TVA 19 %, amortissable sur 5 ans) et vend des marchandises 15 000 DT HT, coût d'achat 9 000 DT.",
        questions: [
          {
            prompt: "Passez l'écriture d'acquisition du matériel.",
            method: "Débit 2154 (matériel) et 4366 (TVA déductible), crédit 401 (fournisseur).",
            answer:
              "Débit 2154 Matériel : 20 000 ; Débit 4366 TVA déductible : 3 800 ; Crédit 401 Fournisseur : 23 800.",
            points: 3,
          },
          {
            prompt: "Calculez l'amortissement annuel et le taux.",
            method: "Amortissement linéaire : valeur / durée ; taux = 100/durée.",
            answer: "Amortissement = 20 000/5 = 4 000 DT par an, soit un taux de 20 %.",
            points: 2,
          },
          {
            prompt: "Calculez le résultat de la vente et présentez l'écriture.",
            method: "Marge = prix de vente HT − coût d'achat.",
            answer:
              "Marge = 15 000 − 9 000 = 6 000 DT. Écritures : Débit 411 Clients 17 850 ; Crédit 701 Ventes 15 000 et 4367 TVA collectée 2 850. Puis Débit 601 Achats 9 000 et crédit 37 Stock 9 000.",
            points: 3,
          },
          {
            prompt: "Ces opérations apparaissent-elles au bilan ou au compte de résultat ?",
            method: "Classer chaque élément.",
            answer:
              "Le matériel figure à l'actif immobilisé (pour sa valeur nette) et l'amortissement est une charge du compte de résultat. La vente, le coût d'achat et l'amortissement sont des charges/produits du compte de résultat ; la créance client et la dette fournisseur figurent au bilan.",
            points: 2,
          },
        ],
      },
    ],
    advice: [
      "Toujours indiquer les numéros de comptes dans les écritures : c'est une exigence du barème.",
      "Séparer clairement les calculs économiques des calculs comptables.",
      "Utiliser les données du document pour justifier chaque affirmation.",
    ],
    correctionNotes: [
      "La TVA sur achat est déductible (compte 4366), sur vente elle est collectée (4367).",
      "L'amortissement est une charge calculée qui ne correspond à aucun décaissement.",
      "Une croissance réelle de 1,8 % avec 9,3 % d'inflation signifie une croissance nominale proche de 11 %.",
    ],
  },
  {
    slug: "bac-arabe-session",
    title: "اختبار في اللغة العربية — نص شعري وموضوع إنشاء",
    subjectSlug: "arabe",
    section: "Toutes sections",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "تحليل نص شعري مع منهجية الإجابة وموضوع إنشاء مصحح: تحديد الأغراض، الصورة، الإيقاع، ثم الموقف من الحياة.",
    parts: [
      {
        title: "الموضوع الأول — تحليل نص",
        intro:
          "قصيدة قصيرة في وصف الفجر والانبعاث بعد العتمة، تتكرر فيها لفظة «النور» مع صورة الغسل والانتباه.",
        questions: [
          {
            prompt: "حدّد غرض النص وموضوعه العام.",
            method: "استنتاج الغرض من المعجم المسيطر ونبرة الخطاب.",
            answer:
              "غرض النص وصفي تأملي، موضوعه انبعاث الحياة مع الفجر وتجاوز العتمة، ويتراوح بين وصف الطبيعة والتأمل في معنى الأمل.",
            points: 20,
          },
          {
            prompt: "حلّل صورة مركزية في النص وبيّن أثرها.",
            method: "تسمية الصورة، شرحها، بيان أثرها، ربطها بالفكرة.",
            answer:
              "صورة الشمس تغسل وجه النجم صورة حسية تقوم على الاستعارة والتشبيه، تجعل الفجر حدثاً طهورياً. أثرها إيحاء بالصفاء والانبعاث والرجاء، وتجسيد المعنى المجرد للبعث في مشهد مادي مرئي.",
            points: 20,
          },
          {
            prompt: "ما ملامح الإيقاع وما وظيفته؟",
            method: "رصد التكرار والوزن والقافية.",
            answer:
              "تكرار لفظ النور وتناغم القافية يخلقان إيقاعاً تصاعدياً يوازي حركة الفجر. الإيقاع هنا وظيفي: يخدم إحساس البعث ويزيد كثافة الإيحاء.",
            points: 20,
          },
        ],
      },
      {
        title: "الموضوع الثاني — إنشاء",
        intro: "قال الشاعر: «وما نيلُ المطالبِ بالتمنّي/ ولكن تُؤخذُ الدنيا غلابا».",
        questions: [
          {
            prompt: "اكتب موضوعاً إنشائياً تعالج فيه العلاقة بين الطموح والعمل، مستشهداً بالنص وبالشعر العربي.",
            method: "مقدمة + فكرتان (الطموح محرك ثم العمل شرط التحقق) + خاتمة.",
            answer:
              "يرسم النص علاقة تكامل بين الطموح والعمل: فالطموح يشعل الإرادة، والعمل يحوّل الحلم إلى واقع. في الفكر الأولى يظهر الطموح باعثاً على التغيير، وفي الثانية يثبت أن التمني وحده عجز، كما تقول الحكمة العامة. وفي الشواهد يُستحضر المتنبي مثالاً على الفخر بالهمة. والخاتمة توفق بين الاثنين: الطموح بلا عمل وهم، والعمل بلا طموح يفتقد البوصلة.",
            points: 20,
          },
          {
            prompt: "أضف شاهداً شعرياً مناسباً واشرحه في سطرين.",
            method: "لا تكتفِ بالشاهد: اشرح دلالته في سياق الفكرة.",
            answer:
              "«على قدر أهل العزم تأتي العزائم» (المتنبي): يربط الشاهد بين حجم الهمة وحجم الإنجاز، فيدعم فكرة أن الطموح شرط أولي، وأن العزيمة ترجمة عملية له.",
            points: 20,
          },
        ],
      },
    ],
    advice: [
      "لا تبدأ التحليل قبل تحديد الغرض والموضوع العام للنص.",
      "كل صورة بلاغية تحتاج شرحاً وأثراً وربطاً بالفكرة، لا مجرد تسمية.",
      "الخاتمة تقويم للنص لا تكرار للمقدمة.",
    ],
    correctionNotes: [
      "المطلوب في تحليل الصورة الشرح والأثر، لا التعريف البلاغي المجرد.",
      "في الإنشاء تُقيَّم سلامة اللغة بقدر الأفكار.",
      "الربط بين الشاهد والفكرة أهم من حفظ الشواهد.",
    ],
  },
  {
    slug: "bac-francais-session",
    title: "Épreuve de français — commentaire, dissertation et langue",
    subjectSlug: "francais",
    section: "Toutes sections",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "Un corpus de trois exercices avec corrigé guidé : commentaire composé d'un texte romanesque, sujet de dissertation et exercices de langue.",
    parts: [
      {
        title: "Exercice 1 — Commentaire composé (20 points)",
        intro:
          "Extrait : la première entrée du personnage dans la ville. Le narrateur décrit les ruelles, l'odeur du pain et la foule qui l'évite ; la phrase finale est nominale, comme suspendue.",
        questions: [
          {
            prompt: "Proposez un projet de lecture en une phrase.",
            method: "Réunir les impressions dominantes du texte (étrangeté, exclusion) et formuler ce que le passage démontre.",
            answer:
              "Le passage fait de l'arrivée du personnage une expérience d'exclusion : la ville se donne à voir comme un espace étranger où le héros cherche sa place.",
            points: 6,
          },
          {
            prompt: "Dégagez deux axes de lecture appuyés sur des citations.",
            method: "Un axe par effet dominant : la description sensorielle, puis le regard des autres.",
            answer:
              "Axe 1 : une ville sensorielle et oppressante (champ lexical des odeurs, phrases courtes, accumulation). Axe 2 : le regard social qui exclut (verbes de mouvement des passants, pronoms indéfinis, silence du personnage).",
            points: 8,
          },
          {
            prompt: "Quel effet produit la phrase nominale finale ?",
            method: "Nommer la figure de construction, puis interpréter.",
            answer:
              "La phrase nominale suspend le récit et laisse le lecteur sur une impression d'inachèvement : le personnage reste en suspens, comme sa place dans la ville.",
            points: 6,
          },
        ],
      },
      {
        title: "Exercice 2 — Dissertation (20 points)",
        intro: "« Le roman n'a-t-il pour fonction que de divertir ? »",
        questions: [
          {
            prompt: "Dégagez la problématique.",
            method: "Distinguer le divertissement (évasion) de la fonction critique et cognitive du roman.",
            answer:
              "Le sujet oppose une conception du roman comme pur divertissement à une conception où il instruit, critique et fait réfléchir. Problème : le plaisir du récit est-il incompatible avec sa portée sérieuse ?",
            points: 10,
          },
          {
            prompt: "Proposez un plan en trois parties.",
            method: "Thèse, antithèse, dépassement.",
            answer:
              "I. Le roman divertit : intrigue, suspense, évasion. II. Mais il instruit : peinture sociale, dénonciation, formation du jugement. III. Le plaisir est le moyen de la réflexion : c'est parce qu'il attache le lecteur que le roman peut le faire penser.",
            points: 10,
          },
        ],
      },
      {
        title: "Exercice 3 — Langue (10 points)",
        questions: [
          {
            prompt: "Accordez : « Les lettres qu'il a (écrire) sont longues. »",
            method: "Auxiliaire avoir + COD placé avant : accord avec le COD.",
            answer: "écrites — le COD « qu' » (les lettres) précède l'auxiliaire.",
            points: 5,
          },
          {
            prompt: "Justifiez l'emploi du passé simple dans un récit au passé.",
            method: "Distinguer premier plan et arrière-plan.",
            answer:
              "Le passé simple marque les actions de premier plan, qui font avancer le récit, tandis que l'imparfait installe le décor et les habitudes.",
            points: 5,
          },
        ],
      },
    ],
    advice: [
      "Le plan se rédige avant l'introduction : c'est lui qui garantit la cohérence.",
      "Chaque citation doit être introduite, puis interprétée.",
      "Gardez trente minutes pour la relecture ciblée (verbes, homophones, ponctuation).",
    ],
    correctionNotes: [
      "Un axe thématique sans citation est une simple impression.",
      "La dissertation doit répondre au sujet posé, pas réciter un cours sur le roman.",
      "En langue, l'accord sans justification ne rapporte que la moitié des points.",
    ],
  },
  {
    slug: "bac-anglais-session",
    title: "English paper — reading comprehension, language and writing",
    subjectSlug: "anglais",
    section: "Toutes sections",
    kind: "session",
    year: 2024,
    durationMin: 120,
    difficulty: 2,
    description:
      "A complete mock paper with a short text on distance learning, comprehension questions, language tasks and a guided writing task.",
    parts: [
      {
        title: "Part 1 — Reading comprehension (12 points)",
        intro:
          "Text: a short article explaining how online courses changed access to education in rural areas, with figures and one student interview.",
        questions: [
          {
            prompt: "What is the main idea of the text?",
            method: "Answer with one sentence, in your own words.",
            answer:
              "Online courses give students in remote areas access to education they could not otherwise attend.",
            points: 4,
          },
          {
            prompt: "What does 'it' refer to in the sentence: 'It saves them hours of travel'?",
            method: "Look back one sentence for the antecedent.",
            answer: "It refers to online learning (or attending classes online).",
            points: 4,
          },
          {
            prompt: "Is the writer optimistic or critical? Justify.",
            method: "Quote one phrase that reveals the tone.",
            answer:
              "Optimistic: the writer insists on 'new opportunities' and on the student's success, with only one reservation about the internet connection.",
            points: 4,
          },
        ],
      },
      {
        title: "Part 2 — Language (8 points)",
        questions: [
          {
            prompt: "Put the verb in the right tense: 'Since 2020, she (study) online.'",
            method: "Since + starting point = present perfect.",
            answer: "has studied",
            points: 4,
          },
          {
            prompt: "Rewrite in the passive voice: 'The government has built new schools.'",
            method: "Object becomes subject, past participle, agent optional.",
            answer: "New schools have been built (by the government).",
            points: 4,
          },
        ],
      },
      {
        title: "Part 3 — Writing (10 points)",
        questions: [
          {
            prompt: "Write about 120 words: 'Should students be allowed to use phones at school?'",
            method: "Introduction with your position, two arguments with examples, short conclusion.",
            answer:
              "Model answer structure: introduction stating a balanced position, one paragraph on the benefits (access to information, safety), one on the drawbacks (distraction, inequality), conclusion proposing a controlled use during breaks only.",
            points: 10,
          },
        ],
      },
    ],
    advice: [
      "Never copy a full sentence from the text in the comprehension part.",
      "Check the third person -s and the irregular past forms during the last five minutes.",
      "Count your words roughly: about twelve lines of ten words.",
    ],
    correctionNotes: [
      "Reformulation is required; copying earns no marks.",
      "In the passive, the past participle is the most frequent error.",
      "A clearly structured essay scores higher than a rich but disorganised one.",
    ],
  },
  {
    slug: "bac-TECHNOLOGIE-session",
    title: "Épreuve de technologie — électronique, automatismes et électrotechnique",
    subjectSlug: "technologie",
    section: "Sciences techniques",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "Une épreuve complète de technologie avec corrigé : logique combinatoire, GRAFCET, moteur asynchrone et résistance des matériaux.",
    parts: [
      {
        title: "Partie A — Électronique numérique (7 points)",
        questions: [
          {
            prompt: "Simplifier la fonction S = a·b̄ + a·b.",
            method: "Factoriser par a, puis utiliser b̄ + b = 1.",
            answer: "S = a·(b̄ + b) = a. La variable b est éliminée : le circuit ne dépend plus que de a.",
            points: 7,
          },
        ],
      },
      {
        title: "Partie B — Automatismes (7 points)",
        questions: [
          {
            prompt: "Dans un GRAFCET, à quelle condition la transition entre les étapes 3 et 4 est-elle franchie ?",
            method: "Énoncer la règle d'évolution : transition valide ET condition vraie.",
            answer:
              "L'étape 3 doit être active et la condition associée à la transition doit être vraie ; alors l'étape 3 est désactivée et l'étape 4 activée simultanément.",
            points: 7,
          },
        ],
      },
      {
        title: "Partie C — Électrotechnique (6 points)",
        questions: [
          {
            prompt: "Un moteur tétrapolaire alimenté en 50 Hz tourne à 1440 tr/min. Calculer son glissement.",
            method: "Calculer d'abord ns = 60f/p, puis g = (ns − n)/ns.",
            answer: "ns = 60 × 50/2 = 1500 tr/min ; g = (1500 − 1440)/1500 = 0,04 soit 4 %.",
            points: 6,
          },
        ],
      },
    ],
    advice: [
      "Écrire la formule littérale avant tout calcul.",
      "Vérifier les unités : tr/min, rad/s, N, mm², MPa.",
      "Conclure chaque calcul par une phrase de réponse.",
    ],
    correctionNotes: [
      "Une simplification sans justification (table de Karnaugh ou algèbre de Boole) n'est que partiellement créditée.",
      "Le glissement s'exprime en % mais se calcule sans unité.",
      "Un résultat numérique sans unité est systématiquement pénalisé.",
    ],
  },
  {
    slug: "bac-gestion-session",
    title: "Épreuve de gestion — comptabilité, coûts et analyse financière",
    subjectSlug: "gestion",
    section: "Économie & Gestion",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "Une épreuve complète de gestion avec corrigé : écritures de régularisation, seuil de rentabilité et calcul de trésorerie nette.",
    parts: [
      {
        title: "Partie 1 — Comptabilité générale (8 points)",
        intro:
          "L'entreprise a payé en décembre un loyer de 3 600 dt couvrant les trois premiers mois de l'année suivante.",
        questions: [
          {
            prompt: "Quelle écriture de régularisation faut-il passer au 31 décembre ?",
            method: "Isoler la part qui concerne l'exercice suivant et la sortir des charges.",
            answer:
              "On constate une charge constatée d'avance de 2 400 dt (deux mois sur trois) : on crédite le compte de charges de 2 400 dt et on débite le compte de charges constatées d'avance du même montant.",
            points: 8,
          },
        ],
      },
      {
        title: "Partie 2 — Comptabilité analytique (7 points)",
        intro:
          "Chiffre d'affaires : 500 000 dt. Charges variables : 300 000 dt. Charges fixes : 150 000 dt.",
        questions: [
          {
            prompt: "Calculer le seuil de rentabilité et l'exprimer en mois.",
            method: "MCA = CA − CV ; taux = MCA/CA ; SR = CF/taux ; point mort = SR/CA × 12.",
            answer:
              "MCA = 200 000 dt, taux = 40 %, SR = 150 000/0,40 = 375 000 dt, point mort = 375 000/500 000 × 12 = 9 mois.",
            points: 7,
          },
        ],
      },
      {
        title: "Partie 3 — Analyse financière (5 points)",
        intro: "Ressources stables : 900 000 dt. Emplois stables : 750 000 dt. BFR : 200 000 dt.",
        questions: [
          {
            prompt: "Calculer le fonds de roulement et la trésorerie nette, puis commenter.",
            method: "FR = ressources stables − emplois stables ; TN = FR − BFR.",
            answer:
              "FR = 150 000 dt ; TN = 150 000 − 200 000 = −50 000 dt. La trésorerie est négative : le cycle d'exploitation consomme plus que le fonds de roulement ne le permet, ce qui crée un risque de tension de liquidité.",
            points: 5,
          },
        ],
      },
    ],
    advice: [
      "Poser les formules avant les calculs.",
      "Vérifier les unités et les signes des écarts.",
      "Commenter chaque résultat chiffré en une phrase.",
    ],
    correctionNotes: [
      "Une charge constatée d'avance se calcule au prorata des mois restants.",
      "Le seuil de rentabilité s'exprime en dinars de chiffre d'affaires.",
      "Une trésorerie nette négative n'invalide pas la rentabilité : elle signale un besoin de financement du cycle.",
    ],
  },
  {
    slug: "bac-histoire-geo-session",
    title: "Épreuve d'histoire-géographie — documents et croquis",
    subjectSlug: "histoire-geographie",
    section: "Économie & Gestion · Lettres",
    kind: "session",
    year: 2024,
    durationMin: 180,
    difficulty: 3,
    description:
      "Une épreuve d'histoire-géographie avec corrigé : analyse d'un document sur l'économie coloniale et croquis de l'organisation du territoire tunisien.",
    parts: [
      {
        title: "Partie A — Histoire (10 points)",
        intro:
          "Document : tableau statistique des exportations tunisiennes en 1938 (phosphates, huile d'olive, céréales) et des importations (produits manufacturés).",
        questions: [
          {
            prompt: "Présentez le document.",
            method: "Nature, source, date, thème, espace concerné.",
            answer:
              "Tableau statistique publié par l'administration du protectorat en 1938, présentant la structure des échanges extérieurs de la Tunisie : matières premières exportées, produits manufacturés importés.",
            points: 4,
          },
          {
            prompt: "Que révèle ce document de la structure de l'économie coloniale ?",
            method: "Décrire, puis interpréter avec la notion d'économie extravertie.",
            answer:
              "La Tunisie exporte des produits bruts et importe des produits finis : c'est une économie extravertie et déséquilibrée, dont la valeur ajoutée est réalisée hors du territoire. Cette structure crée une dépendance et alimente le mécontentement social.",
            points: 6,
          },
        ],
      },
      {
        title: "Partie B — Géographie (10 points)",
        questions: [
          {
            prompt: "Réalisez un croquis de l'organisation du territoire tunisien.",
            method: "Trois idées : poids du littoral, métropoles, espaces intérieurs et leurs dynamiques.",
            answer:
              "Légende en trois parties : 1) un littoral densément peuplé et industrialisé (aplats) ; 2) deux métropoles majeures, Tunis et Sfax, et des villes relais (figurés ponctuels) ; 3) des espaces intérieurs moins denses, spécialisés (agriculture, élevage, mines) et reliés par des axes de communication. Titre obligatoire : « L'organisation du territoire tunisien ».",
            points: 10,
          },
        ],
      },
    ],
    advice: [
      "Présenter tout document avant de l'analyser.",
      "Rédiger la légende du croquis avant de dessiner.",
      "Conclure chaque partie par une phrase de synthèse.",
    ],
    correctionNotes: [
      "La présentation complète du document vaut à elle seule plusieurs points.",
      "Un croquis sans titre ni légende structurée perd l'essentiel des points.",
      "L'analyse doit relier les données à un mécanisme économique ou politique.",
    ],
  },
];

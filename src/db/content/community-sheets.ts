import type { CommunitySheetStatus } from "@/db/schema";

export type CommunitySheetSeed = {
  slug: string;
  studentId: number;
  authorName: string;
  section: string;
  subjectSlug: string;
  period: string;
  title: string;
  summary: string;
  content: string;
  keyFormula: string;
  tags: string[];
  status: CommunitySheetStatus;
  moderationNote: string;
  likesCount: number;
};

export const communitySheetsSeed: CommunitySheetSeed[] = [
  {
    slug: "math-suites-recurrentes-4-reflexes",
    studentId: 1,
    authorName: "Ines Trabelsi",
    section: "Mathématiques",
    subjectSlug: "mathematiques",
    period: "T1",
    title: "Suites récurrentes u_(n+1) = f(u_n) : les 4 réflexes au devoir de synthèse",
    summary:
      "Le plan type en 4 étapes pour ne jamais perdre de points sur l'encadrement, la monotonie et la limite d'une suite récurrente.",
    content: `1. Récurrence d'encadrement : poser clairement la propriété P(n) : « a ≤ u_n ≤ b », vérifier l'initialisation au premier rang, puis utiliser la croissance de f sur [a, b].
2. Sens de variation : étudier le signe de u_(n+1) - u_n = f(u_n) - u_n sur l'intervalle [a, b] (souvent via la position de C_f par rapport à la droite y = x).
3. Théorème de convergence monotone : croissante + majorée ⇒ convergente ; décroissante + minorée ⇒ convergente.
4. Passage à la limite : préciser impérativement que f est continue au point limite l avant d'écrire f(l) = l.`,
    keyFormula:
      "Si (u_n) converge vers l ∈ I et si f est continue en l, alors l est solution de l'équation f(x) = x sur I.",
    tags: ["suites", "récurrence", "continuité", "limite"],
    status: "approved",
    moderationNote: "Validée · Fiche conforme au barème officiel de Mathématiques.",
    likesCount: 28,
  },
  {
    slug: "physique-dipole-rc-lecture-graphique",
    studentId: 1,
    authorName: "Mehdi Gharbi",
    section: "Sciences expérimentales",
    subjectSlug: "physique",
    period: "T1",
    title: "Dipôle RC : déterminer τ, E et C sur un oscillogramme en 30 secondes",
    summary:
      "Toutes les méthodes graphiques acceptées au Bac pour trouver la constante de temps τ sans erreur d'unité.",
    content: `• Sur la courbe de charge u_C(t) : l'asymptote horizontale donne directement la f.é.m. E du générateur.
• Méthode des 63 % (la plus fiable) : calculer 0,63 × E et lire l'abscisse correspondante t = τ (en décharge : lire l'abscisse d'ordonnée 0,37 × E).
• Méthode de la tangente à l'origine : la tangente à t = 0 coupe l'asymptote y = E exactement à l'instant t = τ.
• Vigilance unités : convertir systématiquement ms → 10⁻³ s et μF → 10⁻⁶ F avant de calculer C = τ / R !`,
    keyFormula: "τ = R · C  |  u_C(τ) = 0,63 · E (charge)  |  E_e = ½ · C · u_C²",
    tags: ["dipôle rc", "oscillogramme", "constante de temps"],
    status: "approved",
    moderationNote: "Validée · Astuces d'unités très utiles en Sciences physiques.",
    likesCount: 34,
  },
  {
    slug: "svt-brassage-genetique-arbre-decision",
    studentId: 1,
    authorName: "Salma Khelifi",
    section: "Sciences expérimentales",
    subjectSlug: "svt",
    period: "T1",
    title: "Génétique diploïde : trancher entre gènes indépendants et gènes liés",
    summary:
      "Comment exploiter immédiatement les proportions d'un test-cross pour conclure sur la localisation chromosomique.",
    content: `Face aux résultats d'un croisement-test (hybride F1 × double récessif) :
1. Quatre phénotypes équiprobables (≈ 25 %, 25 %, 25 %, 25 %) : les 2 gènes sont indépendants (brassage interchromosomique en Anaphase I).
2. Deux phénotypes parentaux très majoritaires (> 50 % ensemble) et deux phénotypes recombinés minoritaires : les 2 gènes sont liés avec crossing-over en Prophase I (brassage intrachromosomique).
3. Seulement 2 phénotypes parentaux (50 % / 50 %) : liaison absolue (absence de crossing-over, cas classique chez la drosophile mâle).`,
    keyFormula: "Distance génétique d (en cM) = (% de recombinés) = (effectif recombinés / effectif total) × 100",
    tags: ["génétique", "test-cross", "brassage", "méiose"],
    status: "approved",
    moderationNote: "Validée · Synthèse fidèle au programme de SVT.",
    likesCount: 22,
  },
  {
    slug: "info-tris-tableaux-python-comparatif",
    studentId: 1,
    authorName: "Rami Bouazizi",
    section: "Sciences de l'informatique",
    subjectSlug: "informatique",
    period: "T2",
    title: "Tri par sélection vs Tri à bulles : ne plus confondre les indices",
    summary:
      "Comparaison directe des boucles, invariants et conditions d'arrêt pour les algorithmes sur les tableaux.",
    content: `• Tri par sélection : à chaque étape i (de 0 à n - 2), on cherche l'indice pos_min du plus petit élément dans T[i .. n-1], puis on effectue UN SEUL échange entre T[i] et T[pos_min].
• Tri à bulles : on parcourt les éléments adjacents T[j] et T[j + 1] en faisant remonter le maximum ; astuce : utiliser un booléen permut pour s'arrêter dès qu'un passage ne fait aucun échange.
• Piège classique : en Python, range(a, b) s'arrête à b - 1 ! Pour atteindre l'indice n - 1, écrire range(i + 1, n).`,
    keyFormula: "Complexité dans le pire des cas : O(n²) comparaisons · Tri par sélection : au plus (n - 1) échanges.",
    tags: ["algorithmique", "python", "tableaux", "tri"],
    status: "approved",
    moderationNote: "Validée · Rappel clair sur les bornes de boucles.",
    likesCount: 19,
  },
  {
    slug: "philo-introduction-dissertation-3-temps",
    studentId: 1,
    authorName: "Nour Ben Amor",
    section: "Lettres",
    subjectSlug: "philosophie",
    period: "T1",
    title: "Réussir l'introduction de dissertation philosophique en 3 mouvements",
    summary:
      "La structure attendue au Bac tunisien pour transformer l'intitulé du sujet en véritable tension philosophique.",
    content: `1. Amorce & définition provisoire : partir d'un exemple concret ou d'une évidence commune liée aux termes clés du sujet sans réciter tout le cours.
2. Construction du paradoxe (le cœur de la note !) : montrer pourquoi la première réponse spontanée pose problème et se heurte à une objection légitime.
3. Formulation de l'enjeu et annonce souple des axes : poser la problématique centrale (« Dès lors, à quelles conditions… ? ») en mettant en lumière ce qui est en jeu (liberté, justice, vérité).`,
    keyFormula: "Opinion spontanée  ⟶  Objection conceptuelle  ⟶  Problématique & Enjeu",
    tags: ["dissertation", "méthodologie", "problématique"],
    status: "approved",
    moderationNote: "Validée · Méthode conforme aux grilles de correction.",
    likesCount: 16,
  },
  {
    slug: "eco-croissance-extensive-intensive-pgf",
    studentId: 1,
    authorName: "Amine Jaziri",
    section: "Économie et gestion",
    subjectSlug: "economie",
    period: "T2",
    title: "Croissance extensive vs intensive : repérer le rôle de la PGF dans un tableau",
    summary:
      "Comment commenter rigoureusement la contribution des facteurs travail, capital et productivité globale des facteurs.",
    content: `• Croissance extensive : repose principalement sur l'augmentation quantitative des facteurs de production utilisés (plus d'heures travaillées, plus de machines).
• Croissance intensive : repose principalement sur les gains d'efficacité mesurés par la Productivité Globale des Facteurs (PGF), fruit du progrès technique, de l'innovation et du capital humain.
• Règle de lecture : si la contribution de la PGF dépasse 50 % du taux de croissance du PIB, la croissance est à dominante intensive !`,
    keyFormula: "Taux de croissance du PIB ≈ Contribution du Travail + Contribution du Capital + PGF",
    tags: ["croissance", "pgf", "progrès technique"],
    status: "pending",
    moderationNote: "Contrôle automatique OK : Format court respecté · Formule clé renseignée.",
    likesCount: 0,
  },
];

import type { ExerciseStep } from "@/db/schema";

export type ExerciseSeed = {
  slug: string;
  subjectSlug: string;
  title: string;
  theme: string;
  difficulty: number;
  durationMin: number;
  statement: string;
  hints: string[];
  steps: ExerciseStep[];
  answer: string;
  lessonSlug: string | null;
};

export const exercisesSeed: ExerciseSeed[] = [
  {
    slug: "suite-auxiliaire",
    subjectSlug: "mathematiques",
    title: "Suite définie par Uₙ₊₁ = ½Uₙ + 3",
    theme: "Suites · suite auxiliaire",
    difficulty: 2,
    durationMin: 20,
    statement:
      "On considère la suite (Uₙ) définie par U₀ = 1 et, pour tout n ∈ ℕ, Uₙ₊₁ = ½Uₙ + 3.\n1. Calculer U₁ et U₂.\n2. Montrer que la suite (Vₙ) définie par Vₙ = Uₙ − 6 est géométrique.\n3. En déduire l'expression de Uₙ en fonction de n, puis la limite de (Uₙ).",
    hints: [
      "Cherche le point fixe : résous L = ½L + 3.",
      "Calcule Vₙ₊₁ en remplaçant Uₙ₊₁ par son expression, puis factorise par ½.",
      "Une suite géométrique de raison ½ tend vers 0 : conclus sur Uₙ.",
    ],
    steps: [
      {
        title: "1. Les premiers termes",
        content:
          "U₁ = ½ × 1 + 3 = 3,5 et U₂ = ½ × 3,5 + 3 = 4,75. La suite est croissante et semble se rapprocher de 6 : c'est une conjecture à vérifier, pas une preuve.",
      },
      {
        title: "2. La suite auxiliaire",
        content:
          "Vₙ₊₁ = Uₙ₊₁ − 6 = ½Uₙ + 3 − 6 = ½Uₙ − 3 = ½(Uₙ − 6) = ½Vₙ. Donc (Vₙ) est géométrique de raison q = ½ et de premier terme V₀ = 1 − 6 = −5.",
      },
      {
        title: "3. Terme général et limite",
        content:
          "Vₙ = −5 × (½)ⁿ. Comme Uₙ = Vₙ + 6, on obtient Uₙ = 6 − 5(½)ⁿ. Or (½)ⁿ → 0 quand n → +∞, donc Uₙ → 6. La suite converge vers 6, ce qui correspond au point fixe trouvé.",
      },
    ],
    answer: "Uₙ = 6 − 5(½)ⁿ et lim Uₙ = 6.",
    lessonSlug: "suites-numeriques",
  },
  {
    slug: "integrale-parties",
    subjectSlug: "mathematiques",
    title: "Calcul de ∫₁ᵉ x ln x dx",
    theme: "Intégration · intégration par parties",
    difficulty: 2,
    durationMin: 18,
    statement:
      "Calculer l'intégrale I = ∫₁ᵉ x·ln(x) dx.\nOn pourra poser u′(x) = x et v(x) = ln(x).",
    hints: [
      "Dérive x²/2 pour vérifier ton choix de u.",
      "La dérivée de ln x est 1/x : le produit uv′ devient un simple polynôme.",
      "Rappelle-toi que ln(e) = 1 et ln(1) = 0.",
    ],
    steps: [
      {
        title: "Choisir u′ et v",
        content:
          "On pose u′(x) = x donc u(x) = x²/2, et v(x) = ln x donc v′(x) = 1/x. Le produit uv′ = (x²/2)(1/x) = x/2 est effectivement plus simple à intégrer.",
      },
      {
        title: "Appliquer la formule",
        content:
          "I = [ (x²/2)·ln x ]₁ᵉ − ∫₁ᵉ (x²/2)(1/x) dx = [ (x²/2)·ln x − x²/4 ]₁ᵉ.",
      },
      {
        title: "Calculer aux bornes",
        content:
          "En e : (e²/2)·1 − e²/4 = e²/4. En 1 : (1/2)·0 − 1/4 = −1/4. Donc I = e²/4 + 1/4 = (e² + 1)/4.",
      },
    ],
    answer: "I = (e² + 1)/4 ≈ 2,097.",
    lessonSlug: "primitives-integrales",
  },
  {
    slug: "pyramide-binomiale",
    subjectSlug: "mathematiques",
    title: "Probabilités : tirage sans remise dans une urne",
    theme: "Probabilités",
    difficulty: 2,
    durationMin: 16,
    statement:
      "Une urne contient 3 boules blanches et 2 boules noires. On tire successivement et sans remise deux boules.\n1. Construis l'arbre pondéré.\n2. Calcule la probabilité d'obtenir deux boules de même couleur.\n3. Calcule la probabilité d'obtenir au moins une boule blanche.",
    hints: [
      "Sans remise : le second tirage dépend du premier, les probabilités changent.",
      "Deux boules de même couleur = BB ou NN : additionne les probabilités des chemins.",
      "« Au moins une blanche » se calcule plus vite par l'événement contraire.",
    ],
    steps: [
      {
        title: "1. Arbre pondéré",
        content:
          "Premier tirage : P(B) = 3/5, P(N) = 2/5. Second tirage : après B, il reste 2 blanches et 2 noires donc P(B|B) = 2/4 et P(N|B) = 2/4. Après N, il reste 3 blanches et 1 noire donc P(B|N) = 3/4 et P(N|N) = 1/4.",
      },
      {
        title: "2. Même couleur",
        content:
          "P(BB) = (3/5)(2/4) = 6/20 = 3/10. P(NN) = (2/5)(1/4) = 2/20 = 1/10. Les événements sont incompatibles, donc P(même couleur) = 3/10 + 1/10 = 4/10 = 2/5.",
      },
      {
        title: "3. Au moins une blanche",
        content:
          "L'événement contraire est « aucune blanche » : P(NN) = 1/10. Donc P(au moins une blanche) = 1 − 1/10 = 9/10.",
      },
    ],
    answer: "P(même couleur) = 2/5 et P(au moins une blanche) = 9/10.",
    lessonSlug: null,
  },
  {
    slug: "rc-constante-de-temps",
    subjectSlug: "physique",
    title: "Charge d'un condensateur : τ, équation et lecture de courbe",
    theme: "Électricité · dipôle RC",
    difficulty: 2,
    durationMin: 20,
    statement:
      "On charge un condensateur de capacité C = 1,0 µF à travers une résistance R = 10 kΩ sous une tension E = 6,0 V.\n1. Établir l'équation différentielle de uC(t).\n2. Calculer la constante de temps τ et l'exprimer en ms.\n3. Calculer la valeur de uC à t = τ puis à t = 3τ.\n4. Déterminer l'énergie stockée en fin de charge.",
    hints: [
      "Loi des mailles : E = uR + uC et uR = R·i avec i = C·duC/dt.",
      "τ = RC, attention à convertir µF en F.",
      "Si uC(τ) = 0,63E, alors à 3τ la charge est pratiquement terminée (95 %).",
      "Énergie : ½CuC².",
    ],
    steps: [
      {
        title: "1. Équation différentielle",
        content:
          "Loi des mailles : E = uR + uC = R·i + uC, avec i = C·duC/dt. D'où E = RC·duC/dt + uC, soit τ·duC/dt + uC = E. C'est une équation différentielle linéaire du premier ordre.",
      },
      {
        title: "2. Constante de temps",
        content:
          "τ = RC = 10·10³ × 1,0·10⁻⁶ = 1,0·10⁻² s = 10 ms.",
      },
      {
        title: "3. Valeurs de uC",
        content:
          "uC(t) = E(1 − e^(−t/τ)) donc uC(τ) = 6,0 × (1 − e⁻¹) = 6,0 × 0,632 ≈ 3,8 V. À t = 3τ : uC = 6,0 × (1 − e⁻³) ≈ 5,7 V (régime presque permanent).",
      },
      {
        title: "4. Énergie stockée",
        content:
          "En fin de charge uC ≈ E : E_stockée = ½CE² = 0,5 × 1,0·10⁻⁶ × 36 = 1,8·10⁻⁵ J = 18 µJ.",
      },
    ],
    answer: "τ = 10 ms, uC(τ) ≈ 3,8 V, uC(3τ) ≈ 5,7 V, énergie ≈ 18 µJ.",
    lessonSlug: "dipole-rc",
  },
  {
    slug: "radioactivite-datation",
    subjectSlug: "physique",
    title: "Désintégration β⁻ et datation au carbone 14",
    theme: "Physique nucléaire",
    difficulty: 2,
    durationMin: 18,
    statement:
      "1. Écrire l'équation de désintégration β⁻ du carbone 14 (Z = 6, A = 14).\n2. Un échantillon de bois contient 25 % du carbone 14 d'un échantillon récent. Déterminer son âge (t₁/₂ = 5 730 ans).\n3. Calculer la constante radioactive λ.",
    hints: [
      "Conservation de A et de Z ; le noyau fils est l'azote.",
      "25 % correspond à deux demi-vies successives.",
      "λ = ln2 / t₁/₂, avec t₁/₂ en secondes si on veut λ en s⁻¹ (ou en ans⁻¹).",
    ],
    steps: [
      {
        title: "1. Équation nucléaire",
        content:
          "¹⁴₆C → ¹⁴₇N + ⁰₋₁e + ν̄ (antineutrino). Vérification : A : 14 = 14 + 0 ; Z : 6 = 7 − 1. Le neutrino est indispensable à la conservation de l'énergie et de la quantité de mouvement.",
      },
      {
        title: "2. Datation",
        content:
          "N/N₀ = 0,25 = (1/2)² donc t = 2 × t₁/₂ = 2 × 5 730 = 11 460 ans. Alternative par la loi exponentielle : t = (t₁/₂/ln2)·ln(1/0,25) = 11 460 ans.",
      },
      {
        title: "3. Constante radioactive",
        content:
          "λ = ln 2 / (5 730 × 3,156·10⁷ s) ≈ 3,83·10⁻¹² s⁻¹. En ans⁻¹ : λ ≈ 1,21·10⁻⁴ an⁻¹.",
      },
    ],
    answer: "Âge ≈ 11 460 ans, λ ≈ 3,83·10⁻¹² s⁻¹.",
    lessonSlug: "noyaux-radioactivite",
  },
  {
    slug: "svt-dihybridisme-test-cross",
    subjectSlug: "svt",
    title: "Interpréter un test-cross en dihybridisme",
    theme: "Génétique · brassage",
    difficulty: 3,
    durationMin: 25,
    statement:
      "On croise une drosophile hétérozygote pour deux gènes (corps gris/g noir et ailes longues/l courtes) avec une drosophile au corps noir et aux ailes courtes. On obtient 980 descendants : 425 gris-longues, 415 noir-courtes, 72 gris-courtes, 68 noir-longues.\n1. Interprète ces résultats.\n2. Estime la distance génétique entre les deux gènes.\n3. Représente les chromosomes de la drosophile hétérozygote.",
    hints: [
      "Quatre phénotypes, mais des proportions inégales : les gènes sont liés.",
      "Les effectifs majoritaires sont les phénotypes parentaux, les minoritaires les recombinants.",
      "Distance = recombinants / total × 100.",
    ],
    steps: [
      {
        title: "1. Interprétation",
        content:
          "Les phénotypes parentaux gris-longues (425) et noir-courtes (415) sont majoritaires, les recombinants gris-courtes (72) et noir-longues (68) sont minoritaires. On en déduit que les deux gènes sont portés par la même paire de chromosomes (gènes liés) et qu'un crossing-over en prophase I a produit des gamètes recombinants.",
      },
      {
        title: "2. Distance génétique",
        content:
          "Recombinants = 72 + 68 = 140 ; total = 980. Distance = (140/980) × 100 ≈ 14,3 centimorgans. Les gènes sont donc séparés d'environ 14 cM sur le même chromosome.",
      },
      {
        title: "3. Génotypes et chromosomes",
        content:
          "On note G/g et L/l. Les allèles parentaux sont en couplage : les deux chromosomes homologues portent respectivement G-L et g-l. Le parent double récessif produit uniquement des gamètes g-l. L'échiquier donne ainsi 2 phénotypes parentaux majoritaires et 2 recombinants minoritaires, ce qui confirme la liaison.",
      },
    ],
    answer: "Gènes liés, brassage intrachromosomique, distance ≈ 14,3 cM.",
    lessonSlug: "genetique-transmission",
  },
  {
    slug: "svt-reponse-immunitaire",
    subjectSlug: "svt",
    title: "Interpréter une courbe d'anticorps après vaccination",
    theme: "Immunologie",
    difficulty: 2,
    durationMin: 18,
    statement:
      "On suit le taux d'anticorps chez une personne : après une première injection de vaccin, le taux augmente faiblement en 10 jours puis diminue. Après une deuxième injection un mois plus tard, le taux augmente fortement en 3 jours et reste élevé.\n1. Interprète la première réponse.\n2. Explique la rapidité et l'intensité de la seconde.\n3. Explique l'intérêt du rappel vaccinal et la différence avec la sérothérapie.",
    hints: [
      "Première rencontre avec l'antigène = réponse primaire, lente.",
      "La mémoire immunitaire repose sur les LB et LT mémoire.",
      "Sérothérapie = anticorps injectés directement.",
    ],
    steps: [
      {
        title: "1. Réponse primaire",
        content:
          "Après la première injection, les cellules présentatrices activent les LT4, qui stimulent le lymphocyte B spécifique. Celui-ci se multiplie (expansion clonale), se différencie en plasmocytes sécréteurs d'anticorps et en cellules mémoire. La réponse est lente (5 à 15 jours) et d'intensité modérée.",
      },
      {
        title: "2. Réponse secondaire",
        content:
          "Lors du rappel, le même antigène rencontre directement des LB mémoire déjà présents en grand nombre : il n'y a pas besoin de la longue étape d'activation initiale. D'où une production d'anticorps plus rapide (3 jours) et beaucoup plus abondante, de meilleure affinité.",
      },
      {
        title: "3. Rappel et sérothérapie",
        content:
          "Le rappel entretient la mémoire immunitaire et prolonge la protection. La vaccination est une immunisation active (l'organisme fabrique ses anticorps), durable mais non immédiate. La sérothérapie apporte des anticorps déjà préparés : protection passive, immédiate, mais de courte durée.",
      },
    ],
    answer: "Réponse primaire lente, réponse secondaire rapide et forte grâce à la mémoire ; vaccination active vs sérothérapie passive.",
    lessonSlug: "immunologie",
  },
  {
    slug: "python-maximum-moyenne",
    subjectSlug: "informatique",
    title: "Python : maximum, moyenne et notes au-dessus de la moyenne",
    theme: "Algorithmique · listes",
    difficulty: 1,
    durationMin: 15,
    statement:
      "Écrire une fonction en Python qui reçoit une liste de notes (nombres entre 0 et 20) et qui :\n1. retourne la note maximale ;\n2. retourne la moyenne ;\n3. retourne la liste des notes supérieures ou égales à la moyenne.\nPrévoir le cas d'une liste vide.",
    hints: [
      "Commence par traiter le cas liste vide, sinon la division par zéro est possible.",
      "Tu peux comparer chaque note à une variable maxi initialisée à la première note.",
      "Un second parcours est plus lisible qu'un parcours unique avec trop de conditions.",
    ],
    steps: [
      {
        title: "1. Analyse des entrées/sorties",
        content:
          "Entrée : une liste notes. Sorties : un nombre (maxi), un réel (moyenne) et une liste. Si la liste est vide, on retourne (None, None, []) pour éviter l'erreur.",
      },
      {
        title: "2. Algorithme",
        content:
          "Initialiser maxi avec notes[0]. Parcourir la liste : si une note dépasse maxi, maxi prend sa valeur. Calculer la moyenne = somme / nombre de notes. Puis parcourir la liste et ajouter à une liste résultat les notes >= moyenne.",
      },
      {
        title: "3. Programme Python",
        content:
          "def analyse(notes):\n    if len(notes) == 0:\n        return None, None, []\n    maxi = notes[0]\n    for n in notes:\n        if n > maxi:\n            maxi = n\n    moyenne = sum(notes) / len(notes)\n    bonnes = []\n    for n in notes:\n        if n >= moyenne:\n            bonnes.append(n)\n    return maxi, moyenne, bonnes\n\nprint(analyse([8, 12, 17, 9]))  # (17, 11.5, [12, 17])",
      },
      {
        title: "4. Tests",
        content:
          "Tester analyse([8, 12, 17, 9]) → (17, 11.5, [12, 17]) ; analyse([20]) → (20, 20.0, [20]) ; analyse([]) → (None, None, []). Le test de la liste vide est celui qui rapporte les points de rigueur.",
      },
    ],
    answer: "Fonction avec traitement du cas vide, recherche du maximum, moyenne et filtrage.",
    lessonSlug: "algorithmique-python",
  },
  {
    slug: "sql-eleves-section",
    subjectSlug: "informatique",
    title: "SQL : requêtes sur une base de données scolaire",
    theme: "Bases de données",
    difficulty: 2,
    durationMin: 15,
    statement:
      "Soit les tables :\nELEVE(id, nom, moyenne, section_id)\nSECTION(id, libelle)\n1. Afficher les noms des élèves ayant une moyenne supérieure ou égale à 12.\n2. Afficher la moyenne de chaque section (libellé de la section et moyenne).\n3. Afficher les élèves de la section « Sciences expérimentales », triés par moyenne décroissante.",
    hints: [
      "Pour afficher un libellé qui appartient à une autre table, il faut une jointure sur section_id = SECTION.id.",
      "« Par section » impose un GROUP BY.",
      "Le tri vient toujours après GROUP BY dans l'ordre des clauses.",
    ],
    steps: [
      {
        title: "1. Filtre simple",
        content: "SELECT nom FROM ELEVE WHERE moyenne >= 12;",
      },
      {
        title: "2. Agrégat et jointure",
        content:
          "SELECT S.libelle, AVG(E.moyenne) AS moyenne_section\nFROM ELEVE E JOIN SECTION S ON E.section_id = S.id\nGROUP BY S.libelle;",
      },
      {
        title: "3. Jointure avec condition et tri",
        content:
          "SELECT E.nom, E.moyenne\nFROM ELEVE E JOIN SECTION S ON E.section_id = S.id\nWHERE S.libelle = 'Sciences expérimentales'\nORDER BY E.moyenne DESC;",
      },
    ],
    answer: "Trois requêtes utilisant WHERE, JOIN + GROUP BY et ORDER BY.",
    lessonSlug: "bases-donnees-sql",
  },
  {
    slug: "techno-rendement-moteur",
    subjectSlug: "technologie",
    title: "Rendement d'un moteur et réducteur",
    theme: "Énergie · rendement",
    difficulty: 2,
    durationMin: 16,
    statement:
      "Un moteur électrique absorbe une puissance Pa = 1,5 kW. Il entraîne un arbre tournant à 1 500 tr/min avec un couple utile de 8 N·m.\n1. Calculer la vitesse angulaire et la puissance utile.\n2. Calculer le rendement du moteur.\n3. Le moteur entraîne un réducteur de rapport 5. Quelle est la vitesse de sortie ?",
    hints: [
      "ω = 2πn/60 avec n en tr/min.",
      "P = C·ω avec ω en rad/s et C en N·m.",
      "η = Pu/Pa (sans unité, souvent en %).",
      "Réducteur de rapport 5 : la vitesse de sortie est divisée par 5.",
    ],
    steps: [
      {
        title: "1. Puissance utile",
        content:
          "ω = 2π × 1500/60 = 157 rad/s. Pu = C·ω = 8 × 157 ≈ 1 256 W, soit environ 1,26 kW.",
      },
      {
        title: "2. Rendement",
        content: "η = Pu/Pa = 1256/1500 ≈ 0,837, soit 83,7 %. Les pertes (≈ 244 W) sont dissipées en chaleur.",
      },
      {
        title: "3. Réducteur",
        content: "ωsortie = ωentrée/5 = 157/5 = 31,4 rad/s, soit n = 300 tr/min. Le couple est augmenté d'autant (environ 40 N·m).",
      },
    ],
    answer: "Pu ≈ 1,26 kW, η ≈ 83,7 %, ωsortie ≈ 31,4 rad/s (300 tr/min).",
    lessonSlug: "chaine-energie-information",
  },
  {
    slug: "philo-liberte-plan",
    subjectSlug: "philosophie",
    title: "Dissertation guidée : « Être libre, est-ce faire ce que l'on veut ? »",
    theme: "La liberté · méthode",
    difficulty: 3,
    durationMin: 30,
    statement:
      "Construis une dissertation complète sur le sujet : « Être libre, est-ce faire ce que l'on veut ? ». Tu dois produire une introduction rédigée, un plan détaillé en trois parties et une conclusion.",
    hints: [
      "Distingue « faire ce que l'on veut » (désir immédiat) et « vouloir ce que l'on fait » (volonté éclairée).",
      "Mobilise Spinoza sur l'illusion et Kant sur l'autonomie.",
      "Le plan doit répondre à la question, pas seulement décrire des opinions.",
    ],
    steps: [
      {
        title: "Introduction rédigée (modèle)",
        content:
          "Chacun fait l'expérience de contraintes : horaires, famille, lois. Aussi est-on tenté d'assimiler la liberté à l'absence de tout obstacle, et donc au pouvoir de faire ce que l'on veut. Mais celui qui suit tous ses désirs est-il vraiment libre, ou simplement soumis à ses impulsions ? La liberté ne consiste-t-elle pas plutôt à vouloir ce que l'on fait, en connaissance de cause ? Nous verrons d'abord que la liberté semble bien être la possibilité d'agir selon son désir, avant de montrer que ce désir peut être une servitude, pour enfin définir la liberté comme autonomie et responsabilité.",
      },
      {
        title: "Plan détaillé",
        content:
          "I. Faire ce que l'on veut : une première évidence\n1. La liberté négative : absence de contrainte extérieure (exemple : sortir sans autorisation).\n2. La spontanéité et le sentiment de liberté (Descartes : la volonté est libre).\n3. Limite : ce que je veux m'est-il donné, ou imposé par mes habitudes ?\n\nII. Le désir peut être une servitude\n1. Spinoza : nous croyons être libres car nous ignorons les causes (déterminismes sociaux, inconscient).\n2. L'aliénation par la consommation et l'opinion : vouloir ce que les autres désirent.\n3. La loi n'est pas toujours l'ennemie de la liberté : Hobbes, Locke, Montesquieu, la loi protège de la domination.\n\nIII. La liberté comme autonomie et responsabilité\n1. Kant : obéir à la loi que la raison se donne à elle-même.\n2. Sartre : la liberté est une condition, elle engage la responsabilité de nos choix.\n3. Être libre, c'est vouloir ce qu'on fait après l'avoir compris : lucidité et effort sur soi.",
      },
      {
        title: "Conclusion rédigée (modèle)",
        content:
          "Faire ce que l'on veut n'est donc qu'une figure première et souvent trompeuse de la liberté. Si l'on entend par vouloir la seule impulsion du moment, la liberté se confond avec la servitude des désirs. Elle devient en revanche une conquête lorsque la volonté se règle sur la raison et assume ses conséquences : être libre, c'est moins faire tout ce que l'on veut que vouloir ce que l'on fait, lucidement et responsablement.",
      },
      {
        title: "Conseils de relecture",
        content:
          "Vérifie que chaque partie contient au moins un exemple concret et une référence expliquée. Contrôle que l'introduction annonce un problème (une tension) et non un simple thème. La conclusion répond à la question par une phrase claire.",
      },
    ],
    answer:
      "Plan dialectique : liberté comme absence de contrainte → critique du désir comme servitude → liberté comme autonomie responsable.",
    lessonSlug: "la-liberte",
  },
  {
    slug: "francais-paragraphe-commentaire",
    subjectSlug: "francais",
    title: "Rédiger un paragraphe de commentaire composé",
    theme: "Méthode du commentaire",
    difficulty: 2,
    durationMin: 20,
    statement:
      "Texte : « La ville s'éveillait lentement. Les volets claquaient comme des coups secs, les machines à café ronronnaient, et sur le trottoir les pas se pressaient, pressés d'arriver avant que la chaleur ne tombe sur les toits. »\nRédige un paragraphe de commentaire montrant comment l'écriture rend sensible le réveil de la ville.",
    hints: [
      "Repère les comparaisons, les personnifications et les sonorités.",
      "Une idée par paragraphe : ici « un réveil sonore et collectif ».",
      "Termine par l'effet produit sur le lecteur.",
    ],
    steps: [
      {
        title: "1. Repérage",
        content:
          "Comparaison « comme des coups secs », personnification « la ville s'éveillait », verbes d'action au présent de narration, allitérations en [p] et [k], énumération des bruits, rythme accéléré par la juxtaposition.",
      },
      {
        title: "2. Paragraphe rédigé (modèle)",
        content:
          "Le réveil de la ville est d'abord rendu sensible par une écriture du bruit. La comparaison « comme des coups secs » transforme les volets en percussion, tandis que la personnification « la ville s'éveillait » prête à l'espace urbain une vie organique. Les verbes de mouvement, « claquaient », « se pressaient », associés à l'énumération des sonorités, créent une accumulation qui mime l'agitation matinale. Enfin, la juxtaposition des phrases précipite le rythme, comme si le temps se resserrait avant la chaleur. Le lecteur assiste ainsi à une naissance collective : la ville n'est plus un décor, elle devient un corps qui s'ébroue.",
      },
      {
        title: "3. Auto-évaluation",
        content:
          "Vérifie : une idée directrice en ouverture, au moins deux procédés nommés et cités, une analyse (et non une paraphrase), une phrase finale sur l'effet. Les citations sont courtes et entre guillemets.",
      },
    ],
    answer:
      "Paragraphe modèle combinant comparaison, personnification, rythme et effet produit.",
    lessonSlug: "roman-personnages",
  },
  {
    slug: "english-writing-email",
    subjectSlug: "anglais",
    title: "Writing task: an email of application for a summer course",
    theme: "Writing · formal email",
    difficulty: 2,
    durationMin: 20,
    statement:
      "You have seen an advert for a two-week summer English course in London. Write a 120-word email to the school to apply. Mention your level, your motivation and ask one question about accommodation.",
    hints: [
      "Use a formal opening (Dear Sir or Madam) and closing (Yours faithfully).",
      "Structure: purpose, personal information, motivation, question, thanks.",
      "Check subject-verb agreement and prepositions (interested in + V-ing).",
    ],
    steps: [
      {
        title: "Plan and useful phrases",
        content:
          "Opening: Dear Sir or Madam, I am writing to apply for...\nIdentity: I am a 18-year-old student from Tunisia, preparing for the Baccalaureate.\nLevel: I have been studying English for seven years and I have a B2 level.\nMotivation: I would like to improve my speaking skills before university.\nQuestion: Could you please tell me whether host families are included in the price?\nClosing: I look forward to hearing from you. Yours faithfully, Ahmed Ben Ali.",
      },
      {
        title: "Model answer (≈ 130 words)",
        content:
          "Dear Sir or Madam,\n\nI am writing to apply for the two-week English course which starts on 6 July. I am an eighteen-year-old student from Tunisia, and I am currently preparing for the Baccalaureate in mathematics.\n\nI have been studying English for seven years and my level is B2. However, I would like to improve my confidence in speaking before going to university, where most of my courses will be in English. The programme of your school, with its small groups and daily workshops, seems to correspond exactly to my needs.\n\nCould you please tell me whether accommodation with a host family is included in the price and if airport transfers are provided?\n\nThank you for your time. I look forward to hearing from you.\n\nYours faithfully,\nAhmed Ben Ali",
      },
      {
        title: "Checklist",
        content:
          "Formal opening and closing, three paragraphs, at least four linkers (however, therefore, in addition), one direct question, correct tenses and no French words. Count words: between 110 and 140.",
      },
    ],
    answer: "Formal email structured in three paragraphs, B2 vocabulary, one precise question.",
    lessonSlug: "english-tenses-writing",
  },
  {
    slug: "eco-croissance-reelle",
    subjectSlug: "economie",
    title: "Croissance nominale, inflation et croissance réelle",
    theme: "Croissance · calculs",
    difficulty: 2,
    durationMin: 15,
    statement:
      "Le PIB nominal d'un pays passe de 120 milliards de dinars en 2023 à 132 milliards en 2024. L'indice des prix augmente de 6 % sur la même période.\n1. Calcule le taux de croissance nominal.\n2. Calcule le PIB réel 2024 aux prix de 2023.\n3. Détermine le taux de croissance réelle.\n4. Explique pourquoi les deux taux diffèrent.",
    hints: [
      "Taux nominal = (132 − 120)/120 × 100.",
      "PIB réel = PIB nominal / (1 + taux d'inflation).",
      "Croissance réelle = (PIB réel − 120)/120 × 100.",
    ],
    steps: [
      {
        title: "1. Croissance nominale",
        content: "t_nominal = (132 − 120)/120 × 100 = 10 %. Le PIB a augmenté de 10 % en valeur.",
      },
      {
        title: "2. PIB réel 2024",
        content: "PIB réel = 132 / 1,06 = 124,53 milliards de dinars (prix de 2023).",
      },
      {
        title: "3. Croissance réelle",
        content: "t_réel = (124,53 − 120)/120 × 100 ≈ 3,8 %. Sur les 10 % de croissance affichée, 6 points sont dus à la hausse des prix.",
      },
      {
        title: "4. Interprétation",
        content:
          "La croissance nominale intègre l'effet de l'inflation : elle surestime l'augmentation réelle des quantités produites. Pour comparer deux années, il faut raisonner à prix constants (en volume). Un pays peut afficher une croissance nominale forte tout en ayant une croissance réelle faible, voire négative si l'inflation dépasse la croissance nominale.",
      },
    ],
    answer: "10 % nominal, PIB réel ≈ 124,5 MdD, croissance réelle ≈ 3,8 %.",
    lessonSlug: "croissance-developpement",
  },
  {
    slug: "gestion-bilan-classement",
    subjectSlug: "gestion",
    title: "Construire un bilan à partir d'une liste d'éléments",
    theme: "Comptabilité · bilan",
    difficulty: 2,
    durationMin: 20,
    statement:
      "Au 31 décembre, une entreprise dispose de : matériel 80 000 DT, stocks 25 000 DT, créances clients 18 000 DT, banque 22 000 DT, caisse 3 000 DT, capital 100 000 DT, emprunt 30 000 DT, fournisseurs 15 000 DT, personnel à payer 8 000 DT.\n1. Classe les éléments en actif et passif.\n2. Calcule les totaux et vérifie l'équilibre.\n3. Détermine le résultat si les capitaux propres comprennent uniquement le capital.",
    hints: [
      "Un emprunt ou un fournisseur à qui l'on doit de l'argent est une ressource (passif).",
      "Total actif = 80 000 + 25 000 + 18 000 + 22 000 + 3 000.",
      "Capitaux propres = total passif − dettes ; résultat = capitaux propres − capital.",
    ],
    steps: [
      {
        title: "1. Classement",
        content:
          "Actif immobilisé : matériel 80 000. Actif circulant : stocks 25 000, créances clients 18 000, banque 22 000, caisse 3 000. Passif : capital 100 000, emprunt 30 000, fournisseurs 15 000, personnel 8 000.",
      },
      {
        title: "2. Équilibre",
        content:
          "Total actif = 80 000 + 25 000 + 18 000 + 22 000 + 3 000 = 148 000 DT. Total passif = 100 000 + 30 000 + 15 000 + 8 000 = 153 000 DT. Les totaux ne sont pas égaux : il manque 5 000 DT, probablement un poste d'actif oublié ou une erreur de classement.",
      },
      {
        title: "3. Résultat",
        content:
          "Si le passif complet vaut 153 000 DT et les dettes 53 000 DT, alors les capitaux propres = 100 000 DT et le résultat = 100 000 − 100 000 = 0. Dans un bilan juste, l'égalité actif = passif doit être rétablie en recherchant l'élément manquant (par exemple une créance de 5 000 DT).",
      },
    ],
    answer: "Actif 148 000 DT, passif 153 000 DT : écart de 5 000 DT à corriger ; capitaux propres = capital.",
    lessonSlug: "bilan-comptable",
  },
  {
    slug: "hg-chronologie-nationale",
    subjectSlug: "histoire-geographie",
    title: "De 1881 à 1956 : classer et expliquer les étapes",
    theme: "Histoire · Tunisie contemporaine",
    difficulty: 2,
    durationMin: 18,
    statement:
      "Classe dans l'ordre chronologique les faits suivants puis explique, en un paragraphe, le passage du réformisme à la lutte de masse : création du Néo-Destour (1934), traité du Bardo (1881), indépendance (1956), création du Destour (1920), conventions d'autonomie interne (1955).",
    hints: [
      "Le traité du Bardo est le point de départ du protectorat.",
      "1920 et 1934 marquent la structuration politique du mouvement.",
      "1955 et 1956 : deux étapes distinctes, autonomie puis indépendance.",
    ],
    steps: [
      {
        title: "1. Chronologie",
        content:
          "1881 : traité du Bardo, début du protectorat. 1920 : création du Destour. 1934 : congrès de Ksar Hellal et création du Néo-Destour. 1955 : conventions d'autonomie interne. 1956 : indépendance (20 mars).",
      },
      {
        title: "2. Paragraphe rédigé (modèle)",
        content:
          "Le mouvement national tunisien se transforme profondément entre les deux guerres. Issu du courant réformiste des Jeunes Tunisiens, le Destour de 1920 porte d'abord des revendications politiques et culturelles dans un cadre élitiste. La crise des années 1930 et l'échec de la voie négociée conduisent à la création du Néo-Destour en 1934, qui organise la mobilisation des masses, s'appuie sur les syndicats et fait de l'indépendance un objectif explicite. Après 1945, la pression internationale de la décolonisation et l'épuisement de la puissance française ouvrent la voie aux conventions de 1955 puis à l'indépendance du 20 mars 1956.",
      },
      {
        title: "3. Critère de réussite",
        content:
          "Chaque date est associée à un acteur, un fait et une portée. Le paragraphe emploie le vocabulaire historique (protectorat, autonomie interne, mobilisation de masse) et répond à la question du passage d'un courant à l'autre.",
      },
    ],
    answer: "1881 → 1920 → 1934 → 1955 → 1956, avec explication causale du changement de stratégie.",
    lessonSlug: "tunisie-mouvement-national",
  },
  {
    slug: "arabe-tahlil-soura",
    subjectSlug: "arabe",
    title: "تحليل صورة شعرية: «كَأَنَّ الشمسَ تَغسِلُ وجهَهُ»",
    theme: "البلاغة · تحليل نص",
    difficulty: 2,
    durationMin: 16,
    statement:
      "ورد في قصيدة: «كَأَنَّ الشمسَ تَغسِلُ وجهَ نَجمٍ / بِماءِ الفَجرِ فَانْتَبَهَ الوَجُودُ».\n1. حدّد نوع الصورة وبيّن أركانها.\n2. اشرح الصورة وبين أثرها النفسي.\n3. اربط الصورة بموقف الشاعر من الطبيعة.",
    hints: [
      "أداة التشبيه ظاهرة: «كأنّ».",
      "لا تكتفِ بالتسمية: اشرح القيمة المشتركة بين المشبه والمشبه به.",
      "ابحث عن الإيحاء: أمل؟ بعث؟ صفاء؟",
    ],
    steps: [
      {
        title: "1. نوع الصورة وأركانها",
        content:
          "الصورة تشبيه بليغ استعمالاً للأداة «كأنّ»: المشبه هو ذات الشاعر (أو الوجود) وهو يحسّ بالانبعاث، والمشبه به الشمس تغسل وجه نجم بماء الفجر، وأداة التشبيه «كأنّ». القرينة تقوم على استعارة الفعل «تغسل» للشمس.",
      },
      {
        title: "2. شرح الصورة وأثرها",
        content:
          "صوّر الشاعر شروق الشمس عملاً من أعمال الطهارة: فهي تغسل وجه النجم بماء الفجر، فيتجلّى المعنى في صورة حسية تختلط فيها الحركة بالماء والضوء. تبعث هذه الصورة إحساساً بالصفاء والانبعاث، وتُقيم في النفس حالة من الرجاء بعد العتمة، إذ يصبح الكون كائناً حياً يستقبل الفجر بوجه مغتسل.",
      },
      {
        title: "3. الربط بموقف الشاعر",
        content:
          "اختيار صورة الغسل والانتباه يدل على موقف متفائل من الطبيعة ومن الحياة: الشاعر لا يصف الفجر وصفاً عابراً، بل يجعل منه حدثاً وجودياً يحمل وعد البعث. وبهذا تتحول الصورة من الزخرفة البلاغية إلى وسيلة لتجسيد التجربة الشعورية.",
      },
    ],
    answer: "تشبيه بليغ بأداة «كأنّ» يوظف استعارة الغسل لإنتاج إيحاء الصفاء والانبعاث.",
    lessonSlug: "balagha-image-poetique",
  },
];

import { subjectSeeds } from "@/db/content/subjects";
import type { PeriodId, SectionName } from "@/lib/sections";

/**
 * Programme officiel de la 4ème année du secondaire (année du baccalauréat).
 *
 * Hiérarchie reprise telle qu'elle est présentée aux élèves dans les devoirs
 * de synthèse trimestriels :
 *   Filière (section du bac) → Matière → Thème / Partie → Chapitre → Trimestre
 *
 * T1 = septembre → décembre  (Devoir de synthèse N°1)
 * T2 = janvier → mars        (Devoir de synthèse N°2)
 * T3 = avril → mai           (Devoir de synthèse N°3)
 * REV = juin                 (révision générale + examen du bac)
 *
 * Les chapitres portent, quand elles existent, les références vers les fiches
 * de cours et les quiz de l'application (`lessonSlug`, `quizSlug`).
 */

export type ProgramChapter = {
  slug: string;
  title: string;
  period: PeriodId;
  lessonSlug?: string;
  quizSlug?: string;
};

export type ProgramTheme = {
  slug: string;
  title: string;
  chapters: ProgramChapter[];
};

export type ProgramSubject = {
  slug: string;
  name: string;
  /** Coefficient officiel de la matière dans la filière (ex. "×4"). */
  coefficient: string;
  /** Matière de spécialité de la filière. */
  specialty?: boolean;
  themes: ProgramTheme[];
};

export type ProgramSection = {
  section: SectionName;
  /** Ce qui caractérise la filière, en une phrase. */
  motto: string;
  /** Devoirs auxquels l'élève est confronté pendant l'année. */
  rhythm: string;
  subjects: ProgramSubject[];
};

const NAME = new Map(subjectSeeds.map((subject) => [subject.slug, subject.name]));

const ch = (
  slug: string,
  title: string,
  period: PeriodId,
  links: { lesson?: string; quiz?: string } = {},
): ProgramChapter => ({ slug, title, period, lessonSlug: links.lesson, quizSlug: links.quiz });

const th = (slug: string, title: string, chapters: ProgramChapter[]): ProgramTheme => ({
  slug,
  title,
  chapters,
});

const sub = (
  slug: string,
  coefficient: string,
  themes: ProgramTheme[],
  options: { specialty?: boolean } = {},
): ProgramSubject => ({
  slug,
  name: NAME.get(slug) ?? slug,
  coefficient,
  specialty: options.specialty,
  themes,
});

/* ------------------------------------------------------------------ */
/*  Tronc commun : matières suivies par toutes les filières            */
/* ------------------------------------------------------------------ */

const PHILO_TC = sub("philosophie", "×1", [
  th("philo-notions", "Les notions du programme", [
    ch("philo-liberte", "La liberté : définitions, problématiques et plan", "T1", {
      lesson: "la-liberte",
      quiz: "quiz-philo-liberte",
    }),
    ch("philo-verite", "La vérité : vérité-correspondance et vérité-vérification", "T1", {
      lesson: "la-verite",
    }),
    ch("philo-raison", "La raison et le réel", "T2"),
    ch("philo-etat", "L'État, la société et la justice", "T2"),
    ch("philo-morale", "La morale et le devoir", "T3"),
  ]),
  th("philo-methode", "Méthodologie de l'épreuve", [
    ch("philo-dissertation", "La dissertation philosophique : analyser, problématiser, argumenter", "T2"),
    ch("philo-commentaire", "Le commentaire de texte philosophique", "T3"),
  ]),
]);

const ARABE_TC = sub("arabe", "×1", [
  th("arabe-langue", "اللغة والقواعد", [
    ch("arabe-balagha", "البلاغة · الصورة الشعرية", "T1", {
      lesson: "balagha-image-poetique",
      quiz: "quiz-arabe-balagha",
    }),
    ch("arabe-nahw", "النحو والإعراب · مراجعة", "T2"),
    ch("arabe-tahlil", "تحليل النص الأدبي ومهارات التعبير", "T3"),
  ]),
]);

const FRANCAIS_TC = sub("francais", "×1", [
  th("francais-litterature", "Littérature et lecture", [
    ch("francais-roman", "Le roman et ses personnages : lire et commenter", "T1", {
      lesson: "roman-personnages",
      quiz: "quiz-francais-roman",
    }),
    ch("francais-poesie", "La poésie et le lyrisme", "T2"),
    ch("francais-theatre", "Le théâtre : texte et représentation", "T2"),
  ]),
  th("francais-langue", "Langue et méthode", [
    ch("francais-langue-normes", "Grammaire, conjugaison et lexique au service du sens", "T2"),
    ch("francais-essai", "L'essai argumentatif et le commentaire composé", "T3"),
  ]),
]);

const ANGLAIS_TC = sub("anglais", "×1", [
  th("anglais-langue", "Language skills", [
    ch("anglais-tenses", "English essentials: tenses, linkers and exam writing", "T1", {
      lesson: "english-tenses-writing",
      quiz: "quiz-anglais-tenses",
    }),
    ch("anglais-reading", "Reading comprehension: identifying the writer's purpose", "T2"),
    ch("anglais-writing", "Writing: the argumentative essay and formal email", "T3"),
  ]),
]);

const INFO_TC = sub("informatique", "×0.5", [
  th("info-bureautique", "Outils numériques", [
    ch("info-tableur", "Tableur : formules, fonctions et graphiques", "T1"),
    ch("info-web", "Recherche, sécurité et identité numérique", "T2"),
    ch("info-algorithme", "Algorithmique et Python : construire un programme fiable", "T3", {
      lesson: "algorithmique-python",
      quiz: "quiz-info-python",
    }),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  Mathématiques par filière (progression officielle)                 */
/* ------------------------------------------------------------------ */

const MATHS_MAT = sub(
  "mathematiques",
  "×4",
  [
    th("maths-analyse-1", "Analyse I", [
      ch("maths-suites", "Suites réelles : arithmétiques, géométriques et récurrence", "T1", {
        lesson: "suites-numeriques",
        quiz: "quiz-math-suites",
      }),
      ch("maths-limites", "Limites de fonctions", "T1"),
      ch("maths-continuite", "Continuité et théorème des valeurs intermédiaires", "T1"),
      ch("maths-derivation", "Dérivation et primitives", "T1"),
    ]),
    th("maths-analyse-2", "Analyse II", [
      ch("maths-etude", "Étude de fonctions et représentation graphique", "T2"),
      ch("maths-ln", "Fonction logarithme népérien", "T3"),
      ch("maths-exp", "Fonction exponentielle", "T3"),
      ch("maths-integrales", "Primitives et calcul intégral : le cours + la méthode", "T3", {
        lesson: "primitives-integrales",
      }),
      ch("maths-equa-diff", "Équations différentielles", "T3"),
    ]),
    th("maths-algebre", "Algèbre, arithmétique et géométrie", [
      ch("maths-complexes", "Nombres complexes et formes trigonométriques", "T2"),
      ch("maths-isometries", "Isométries et déplacements du plan", "T2"),
      ch("maths-similitudes", "Similitudes et coniques", "T2"),
      ch("maths-arithmetique", "Arithmétique dans ℤ : divisibilité et théorème de Bézout", "T3"),
    ]),
    th("maths-probas", "Probabilités et statistiques", [
      ch("maths-probas", "Probabilités conditionnelles et indépendance", "T2"),
      ch("maths-stats", "Séries statistiques à deux caractères : ajustement", "T3"),
    ]),
  ],
  { specialty: true },
);

const MATHS_SCI = sub("mathematiques", "×3", [
  th("maths-analyse", "Analyse", [
    ch("maths-suites", "Suites réelles : arithmétiques, géométriques et récurrence", "T1", {
      lesson: "suites-numeriques",
      quiz: "quiz-math-suites",
    }),
    ch("maths-limites", "Limites de fonctions", "T1"),
    ch("maths-continuite", "Continuité et théorème des valeurs intermédiaires", "T1"),
    ch("maths-derivation", "Dérivation et primitives", "T1"),
    ch("maths-etude", "Étude de fonctions et représentation graphique", "T2"),
    ch("maths-ln", "Fonction logarithme népérien", "T2"),
    ch("maths-exp", "Fonction exponentielle", "T3"),
    ch("maths-integrales", "Primitives et calcul intégral : le cours + la méthode", "T3", {
      lesson: "primitives-integrales",
    }),
  ]),
  th("maths-complexes", "Nombres complexes et probabilités", [
    ch("maths-complexes", "Nombres complexes et représentations", "T2"),
    ch("maths-probas", "Probabilités conditionnelles", "T3"),
    ch("maths-stats", "Statistiques à deux caractères", "T3"),
  ]),
]);

const MATHS_TEC = sub("mathematiques", "×3", [
  th("maths-analyse", "Analyse", [
    ch("maths-limites", "Limites et continuité", "T1"),
    ch("maths-derivation", "Dérivation et primitives", "T1"),
    ch("maths-etude", "Étude de fonctions", "T2"),
    ch("maths-integrales", "Primitives et calcul intégral : le cours + la méthode", "T3", {
      lesson: "primitives-integrales",
    }),
  ]),
  th("maths-suites", "Suites, probabilités et statistiques", [
    ch("maths-suites", "Suites réelles : arithmétiques, géométriques et récurrence", "T1", {
      lesson: "suites-numeriques",
      quiz: "quiz-math-suites",
    }),
    ch("maths-probas", "Probabilités", "T3"),
    ch("maths-stats", "Statistiques à deux caractères", "T3"),
  ]),
]);

const MATHS_ECO = sub("mathematiques", "×2", [
  th("maths-analyse", "Analyse", [
    ch("maths-limites", "Limites, continuité et dérivation", "T1"),
    ch("maths-etude", "Étude de fonctions et optimisation", "T2"),
    ch("maths-suites", "Suites réelles et modélisation", "T2", { lesson: "suites-numeriques" }),
  ]),
  th("maths-probas", "Probabilités et statistiques", [
    ch("maths-probas", "Probabilités conditionnelles", "T3"),
    ch("maths-stats", "Statistiques à deux caractères", "T3"),
  ]),
]);

const MATHS_INF = sub("mathematiques", "×3", [
  th("maths-analyse", "Analyse", [
    ch("maths-limites", "Limites et continuité", "T1"),
    ch("maths-derivation", "Dérivation et primitives", "T1"),
    ch("maths-etude", "Étude de fonctions", "T2"),
    ch("maths-ln", "Fonction logarithme népérien", "T3"),
    ch("maths-exp", "Fonction exponentielle", "T3"),
    ch("maths-integrales", "Primitives et calcul intégral : le cours + la méthode", "T3", {
      lesson: "primitives-integrales",
    }),
  ]),
  th("maths-probas", "Suites, probabilités et statistiques", [
    ch("maths-suites", "Suites réelles", "T1", { lesson: "suites-numeriques", quiz: "quiz-math-suites" }),
    ch("maths-complexes", "Nombres complexes", "T2"),
    ch("maths-probas", "Probabilités", "T3"),
    ch("maths-stats", "Statistiques à deux caractères", "T3"),
  ]),
]);

const MATHS_SPO = sub("mathematiques", "×1", [
  th("maths-analyse", "Analyse et statistiques", [
    ch("maths-suites", "Suites réelles", "T1", { lesson: "suites-numeriques" }),
    ch("maths-fonctions", "Fonctions et dérivation : applications au sport", "T1"),
    ch("maths-stats", "Statistiques à une et deux variables", "T2"),
    ch("maths-probas", "Probabilités et échantillonnage", "T3"),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  Physique par filière                                               */
/* ------------------------------------------------------------------ */

const PHYSIQUE_SCI = sub(
  "physique",
  "×4",
  [
    th("phys-evolution-electrique", "Évolution des systèmes électriques", [
      ch("phys-rc", "Le dipôle RC : charge et décharge d'un condensateur", "T1", {
        lesson: "dipole-rc",
        quiz: "quiz-physique-rc",
      }),
      ch("phys-rl", "Le dipôle RL : l'inductance et l'établissement du courant", "T1"),
      ch("phys-rlc-libre", "Oscillations électriques libres dans un circuit RLC", "T1"),
      ch("phys-rlc-force", "Oscillations électriques forcées et résonance", "T2"),
    ]),
    th("phys-evolution-mecanique", "Évolution des systèmes mécaniques", [
      ch("phys-pendule", "Le pendule élastique : oscillations mécaniques", "T2"),
      ch("phys-energie-meca", "Énergie mécanique et amortissement", "T2"),
    ]),
    th("phys-ondes", "Les ondes", [
      ch("phys-ondes-meca", "Ondes mécaniques progressives et périodiques", "T2"),
      ch("phys-ondes-em", "Ondes électromagnétiques et spectre", "T3"),
      ch("phys-lumiere", "Propagation de la lumière et diffraction", "T3"),
    ]),
    th("phys-nucleaire", "Physique atomique et nucléaire", [
      ch("phys-noyaux", "Noyaux, masse et énergie", "T3", {
        lesson: "noyaux-radioactivite",
        quiz: "quiz-physique-nucleaire",
      }),
      ch("phys-decroissance", "Décroissance radioactive et datation", "T3"),
    ]),
    th("phys-chimie", "Chimie", [
      ch("phys-avancement", "Mesure de l'avancement d'une réaction chimique", "T1"),
      ch("phys-vitesse", "Vitesse de réaction et facteurs cinétiques", "T1"),
      ch("phys-action-masse", "Loi d'action de masse et équilibre chimique", "T1"),
      ch("phys-acides-bases", "Réactions acide-base et dosage", "T2"),
      ch("phys-oxydoreduction", "Oxydoréduction et piles électrochimiques", "T3"),
    ]),
  ],
  { specialty: true },
);

const PHYSIQUE_TEC = sub("physique", "×3", [
  th("phys-electrique", "Électricité", [
    ch("phys-rc", "Le dipôle RC : charge et décharge d'un condensateur", "T1", {
      lesson: "dipole-rc",
      quiz: "quiz-physique-rc",
    }),
    ch("phys-rl", "Le dipôle RL", "T1"),
    ch("phys-rlc", "Oscillations libres dans un circuit RLC", "T2"),
    ch("phys-alternatif", "Courants alternatifs et puissance", "T2"),
  ]),
  th("phys-mecanique-ondes", "Mécanique et ondes", [
    ch("phys-pendule", "Le pendule élastique", "T2"),
    ch("phys-ondes-meca", "Ondes mécaniques progressives", "T3"),
  ]),
  th("phys-nucleaire-chimie", "Nucléaire et chimie", [
    ch("phys-noyaux", "Noyaux et radioactivité", "T3", {
      lesson: "noyaux-radioactivite",
      quiz: "quiz-physique-nucleaire",
    }),
    ch("phys-acides-bases", "Acides et bases", "T2"),
    ch("phys-oxydoreduction", "Oxydoréduction et piles", "T3"),
  ]),
]);

const PHYSIQUE_INF = sub("physique", "×2", [
  th("phys-electrique", "Électricité et ondes", [
    ch("phys-rc", "Le dipôle RC : charge et décharge d'un condensateur", "T1", {
      lesson: "dipole-rc",
      quiz: "quiz-physique-rc",
    }),
    ch("phys-rl", "Le dipôle RL", "T1"),
    ch("phys-rlc", "Oscillations libres RLC", "T2"),
    ch("phys-ondes-meca", "Ondes mécaniques progressives", "T2"),
  ]),
  th("phys-nucleaire", "Physique nucléaire", [
    ch("phys-noyaux", "Noyaux, masse et énergie", "T3", {
      lesson: "noyaux-radioactivite",
      quiz: "quiz-physique-nucleaire",
    }),
    ch("phys-decroissance", "Décroissance radioactive", "T3"),
  ]),
]);

const PHYSIQUE_SPO = sub("physique", "×1", [
  th("phys-sport", "Physique appliquée au mouvement", [
    ch("phys-rc", "Le dipôle RC : charge et décharge d'un condensateur", "T1", {
      lesson: "dipole-rc",
    }),
    ch("phys-mouvement", "Mouvement, forces et énergie", "T2"),
    ch("phys-ondes-meca", "Ondes et signal", "T3"),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  SVT                                                                */
/* ------------------------------------------------------------------ */

const SVT_SCI = sub(
  "svt",
  "×4",
  [
    th("svt-reproduction", "I. Reproduction humaine et santé", [
      ch("svt-repro-homme", "La fonction reproductrice chez l'homme", "T1"),
      ch("svt-repro-femme", "La fonction reproductrice chez la femme et le cycle ovarien", "T1"),
      ch("svt-procreation", "Procréation et maîtrise de la procréation", "T1"),
    ]),
    th("svt-genetique", "II. Génétique", [
      ch("svt-brassage", "Le brassage de l'information génétique : méiose et fécondation", "T1"),
      ch("svt-transmission", "Transmission des caractères héréditaires", "T2", {
        lesson: "genetique-transmission",
        quiz: "quiz-svt-genetique",
      }),
      ch("svt-genetique-humaine", "Génétique humaine et anomalies chromosomiques", "T2"),
    ]),
    th("svt-evolution", "III. Évolution biologique", [
      ch("svt-phylogenie", "Relations de parenté entre les êtres vivants (phylogénie)", "T2"),
      ch("svt-speciation", "La spéciation et la diversité du vivant", "T2"),
    ]),
    th("svt-neuro", "IV. Neurophysiologie", [
      ch("svt-tissu-nerveux", "Le tissu nerveux et le message nerveux", "T2"),
      ch("svt-reflexe", "Le réflexe myotatique et l'arc réflexe", "T3"),
      ch("svt-muscle", "Le muscle squelettique et la contraction", "T3"),
      ch("svt-pression", "La régulation de la pression artérielle", "T3"),
      ch("svt-hygiene-sn", "Hygiène du système nerveux", "T3"),
    ]),
    th("svt-immunite", "V. Immunité", [
      ch("svt-soi", "Le soi et le non-soi", "T3"),
      ch("svt-immunite-specifique", "L'immunité : réponses innée et acquise", "T3", {
        lesson: "immunologie",
        quiz: "quiz-svt-immunite",
      }),
      ch("svt-dysfonctionnements", "Dysfonctionnements immunitaires : allergie et SIDA", "T3"),
    ]),
  ],
  { specialty: true },
);

const SVT_SPO = sub("svt", "×3", [
  th("svt-sport", "Le corps humain et l'effort", [
    ch("svt-repro-femme", "Reproduction humaine et maîtrise de la procréation", "T1"),
    ch("svt-transmission", "Transmission des caractères héréditaires", "T2", {
      lesson: "genetique-transmission",
      quiz: "quiz-svt-genetique",
    }),
    ch("svt-reflexe", "Le réflexe myotatique et le muscle squelettique", "T2"),
    ch("svt-immunite-specifique", "L'immunité et la santé du sportif", "T3", {
      lesson: "immunologie",
      quiz: "quiz-svt-immunite",
    }),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  Technologie (Sciences de l'ingénieur)                              */
/* ------------------------------------------------------------------ */

const TECHNOLOGIE = sub(
  "technologie",
  "×3",
  [
    th("tech-systemes-logiques", "Systèmes logiques", [
      ch("tech-chaine", "Chaîne d'énergie et chaîne d'information d'un système", "T1", {
        lesson: "chaine-energie-information",
      }),
      ch("tech-binaire", "Arithmétique binaire et codage de l'information", "T1"),
      ch("tech-combinatoire", "Logique combinatoire : fonctions et simplification", "T1"),
      ch("tech-sequentielle", "Logique séquentielle : bascules et compteurs", "T1"),
    ]),
    th("tech-automatismes", "Automatismes et énergie", [
      ch("tech-grafcet", "GRAFCET et logique programmée", "T2"),
      ch("tech-api", "Automates programmables (API) et microcontrôleurs", "T2"),
      ch("tech-asservissement", "Asservissement et régulation", "T2"),
      ch("tech-triphase", "Courants monophasé et triphasé", "T2"),
    ]),
    th("tech-conversion", "Conversion d'énergie", [
      ch("tech-transfo", "Le transformateur", "T3"),
      ch("tech-moteur-async", "Le moteur asynchrone", "T3"),
      ch("tech-moteur-cc", "Le moteur à courant continu", "T3"),
      ch("tech-aop", "L'amplificateur opérationnel", "T3"),
    ]),
    th("tech-mecanique", "Génie mécanique", [
      ch("tech-liaisons", "Liaisons mécaniques et transmission de mouvement", "T2"),
      ch("tech-cotation", "Cotation, tolérance et dessin technique", "T3"),
      ch("tech-rdm", "Résistance des matériaux : contraintes et déformations", "T3"),
    ]),
  ],
  { specialty: true },
);

/* ------------------------------------------------------------------ */
/*  Informatique (algorithme + bases de données)                       */
/* ------------------------------------------------------------------ */

const ALGO = sub(
  "informatique",
  "×3",
  [
    th("info-algo-bases", "Algorithmique et programmation", [
      ch("info-python", "Algorithmique et Python : construire un programme fiable", "T1", {
        lesson: "algorithmique-python",
        quiz: "quiz-info-python",
      }),
      ch("info-tri", "Algorithmes de tri : sélection, insertion, à bulles", "T1"),
      ch("info-recherche", "Recherche séquentielle et dichotomique", "T1"),
      ch("info-recursivite", "Algorithmes récursifs", "T2"),
      ch("info-arithmetique", "Algorithmes arithmétiques : PGCD, nombres premiers", "T2"),
      ch("info-approximation", "Méthodes d'approximation : dichotomie, Newton", "T3"),
      ch("info-ihm", "Interface graphique et programmation événementielle", "T3"),
    ]),
    th("info-structures", "Structures de données", [
      ch("info-tableaux", "Tableaux et matrices", "T1"),
      ch("info-chaines", "Chaînes de caractères", "T2"),
      ch("info-fichiers", "Fichiers et enregistrements", "T3"),
    ]),
  ],
  { specialty: true },
);

const BDD = sub("informatique", "×1.5", [
  th("info-bdd", "Bases de données", [
    ch("info-modele", "Modèle relationnel : relations, clés et contraintes", "T1"),
    ch("info-mcd", "Conception : modèle conceptuel et modèle logique", "T2"),
    ch("info-algebre", "Algèbre relationnelle : sélection, projection, jointure", "T2"),
    ch("info-sql", "Bases de données relationnelles et requêtes SQL", "T3", {
      lesson: "bases-donnees-sql",
      quiz: "quiz-info-sql",
    }),
    ch("info-sql-avance", "SQL avancé : agrégats, groupes et sous-requêtes", "T3"),
  ]),
]);

const TIC = sub("informatique", "×1.5", [
  th("info-tic", "Systèmes et technologies de l'information", [
    ch("info-systeme", "Architecture matérielle et systèmes d'exploitation", "T1"),
    ch("info-reseaux", "Réseaux, internet et protocoles", "T2"),
    ch("info-securite", "Sécurité informatique et protection des données", "T3"),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  Économie & Gestion                                                  */
/* ------------------------------------------------------------------ */

const ECONOMIE = sub(
  "economie",
  "×3",
  [
    th("eco-croissance", "I. La croissance et ses facteurs", [
      ch("eco-croissance-reelle", "Croissance, développement et développement durable", "T1", {
        lesson: "croissance-developpement",
        quiz: "quiz-eco-croissance",
      }),
      ch("eco-facteurs", "Les facteurs de croissance : travail, capital, progrès technique", "T1"),
      ch("eco-mesure", "La mesure de la croissance : PIB, IDH et limites", "T1"),
    ]),
    th("eco-structures", "II. Les mutations des structures économiques", [
      ch("eco-secteurs", "Les secteurs d'activité et leur évolution", "T2"),
      ch("eco-entreprises", "Concentration, concurrence et mutations des entreprises", "T2"),
      ch("eco-emploi", "Emploi, chômage et mutations du marché du travail", "T2"),
    ]),
    th("eco-developpement-durable", "III. Le développement durable", [
      ch("eco-durable", "Les trois piliers du développement durable", "T2"),
      ch("eco-environnement", "Environnement, ressources et croissance soutenable", "T3"),
    ]),
    th("eco-mondialisation", "IV. Mondialisation et échanges internationaux", [
      ch("eco-mondialisation", "La mondialisation : acteurs, flux et firmes multinationales", "T3"),
      ch("eco-echanges", "Le commerce international et les échanges extérieurs de la Tunisie", "T3"),
      ch("eco-integration", "Intégration régionale et accords de libre-échange", "T3"),
    ]),
  ],
  { specialty: true },
);

const GESTION = sub(
  "gestion",
  "×3",
  [
    th("gest-comptabilite", "Comptabilité et information financière", [
      ch("gest-bilan", "Le bilan comptable : actif, passif et équilibre", "T1", {
        lesson: "bilan-comptable",
        quiz: "quiz-gestion-bilan",
      }),
      ch("gest-charges", "Les charges et les produits : formation du résultat", "T1"),
    ]),
    th("gest-stocks", "Gestion des stocks et des approvisionnements", [
      ch("gest-stock", "La gestion comptable des stocks", "T2"),
      ch("gest-approvisionnement", "La fonction approvisionnement et le coût de possession", "T2"),
    ]),
    th("gest-couts", "Calcul et analyse des coûts", [
      ch("gest-couts-complets", "Les coûts complets : centres d'analyse et imputation", "T2"),
      ch("gest-couts-partiels", "Les coûts partiels, le seuil de rentabilité et le coût marginal", "T3"),
      ch("gest-ecarts", "Le contrôle budgétaire et l'analyse des écarts", "T3"),
    ]),
    th("gest-marketing", "Marketing et gestion commerciale", [
      ch("gest-marche", "L'étude de marché : demande, offre et concurrence", "T2"),
      ch("gest-ventes", "La provocation des ventes : produit, prix, distribution, communication", "T3"),
    ]),
    th("gest-finance", "Gestion financière", [
      ch("gest-bilan-fonctionnel", "Le bilan fonctionnel et les ratios financiers", "T3"),
      ch("gest-financement", "Le tableau de financement et les décisions d'investissement", "T3"),
      ch("gest-rh", "La gestion des ressources humaines", "T3"),
    ]),
  ],
  { specialty: true },
);

const HG_ECO = sub("histoire-geographie", "×2", [
  th("hg-tunisie", "La Tunisie contemporaine", [
    ch("hg-protectorat", "La Tunisie de 1881 à 1956 : la construction du mouvement national", "T1", {
      lesson: "tunisie-mouvement-national",
      quiz: "quiz-hg-tunisie",
    }),
    ch("hg-independance", "La Tunisie depuis 1956 : construction de l'État et développement", "T2"),
  ]),
  th("hg-monde", "Le monde d'aujourd'hui", [
    ch("hg-mondialisation", "La mondialisation et ses effets", "T2"),
    ch("hg-espaces", "Les espaces productifs et les flux mondiaux", "T3"),
    ch("hg-cartographie", "Cartographie et analyse de documents", "T3"),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  Lettres                                                            */
/* ------------------------------------------------------------------ */

const ARABE_LETTRES = sub(
  "arabe",
  "×4",
  [
    th("arabe-sher", "الشعر", [
      ch("arabe-balagha", "البلاغة · الصورة الشعرية", "T1", {
        lesson: "balagha-image-poetique",
        quiz: "quiz-arabe-balagha",
      }),
      ch("arabe-tajdid", "الشعر العربي الحديث · مدرسة التجديد والرومانسية", "T1"),
      ch("arabe-shabi", "شعر الغزل · أبو القاسم الشابي", "T2"),
      ch("arabe-11", "الشعر الاجتماعي في العصر الحديث", "T3"),
    ]),
    th("arabe-nathr", "النثر والمسرح", [
      ch("arabe-maqala", "المقالة الأدبية والاجتماعية", "T1"),
      ch("arabe-riwaya", "الرواية العربية وأسئلة الحداثة", "T2"),
      ch("arabe-masrah", "المسرح العربي: النشأة والتطور", "T2"),
      ch("arabe-qissa", "القصة القصيرة", "T3"),
    ]),
    th("arabe-outils", "اللغة والمهارات", [
      ch("arabe-nahw", "النحو وتراكيب الجملة", "T2"),
      ch("arabe-tahlil", "تحليل النص الأدبي وبناء المقال", "T3"),
    ]),
  ],
  { specialty: true },
);

const PHILO_LETTRES = sub(
  "philosophie",
  "×4",
  [
    th("philo-notions", "Les grandes notions", [
      ch("philo-liberte", "La liberté : définitions, problématiques et plan", "T1", {
        lesson: "la-liberte",
        quiz: "quiz-philo-liberte",
      }),
      ch("philo-verite", "La vérité : vérité-correspondance et vérité-vérification", "T1", {
        lesson: "la-verite",
      }),
      ch("philo-raison", "La raison et le réel", "T2"),
      ch("philo-etat", "L'État, la société et la justice", "T2"),
      ch("philo-art", "L'art et le beau", "T3"),
      ch("philo-morale", "La morale, le devoir et le bonheur", "T3"),
    ]),
    th("philo-methode", "Méthodologie de l'épreuve", [
      ch("philo-dissertation", "La dissertation philosophique", "T2"),
      ch("philo-commentaire", "Le commentaire de texte philosophique", "T3"),
    ]),
  ],
  { specialty: true },
);

const HG_LETTRES = sub("histoire-geographie", "×3", [
  th("hg-tunisie", "La Tunisie contemporaine", [
    ch("hg-protectorat", "La Tunisie de 1881 à 1956 : la construction du mouvement national", "T1", {
      lesson: "tunisie-mouvement-national",
      quiz: "quiz-hg-tunisie",
    }),
    ch("hg-independance", "La Tunisie depuis 1956", "T2"),
  ]),
  th("hg-monde", "Histoire et géographie du monde contemporain", [
    ch("hg-guerres", "Les grands conflits mondiaux et la construction de la paix", "T2"),
    ch("hg-mondialisation", "La mondialisation et les espaces productifs", "T3"),
    ch("hg-cartographie", "Étude de documents et cartographie", "T3"),
  ]),
]);

const ISLAMIQUE_LETTRES = sub("education-islamique", "×1", [
  th("islam-valeurs", "المقاصد والقيم", [
    ch("islam-wasatiyya", "الوسطية والاعتدال: قيم الدين في حياة الفرد والمجتمع", "T1", {
      lesson: "wasatiyya-valeurs",
    }),
    ch("islam-maqasid", "مقاصد الشريعة وضروراتها الخمس", "T2"),
    ch("islam-hiwar", "حوار الحضارات والتسامح", "T3"),
    ch("islam-qadaya", "القضايا المجتمعية المعاصرة", "T3"),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  Sport                                                              */
/* ------------------------------------------------------------------ */

const SPORT_SPECIALITE = sub(
  "technologie",
  "×3",
  [
    th("sport-theorie", "Spécialité sportive · partie théorique", [
      ch("sport-anatomie", "Anatomie et physiologie de l'effort", "T1"),
      ch("sport-biomecanique", "Biomécanique du mouvement sportif", "T1"),
      ch("sport-entrainement", "Physiologie de l'entraînement et récupération", "T2"),
      ch("sport-nutrition", "Nutrition et préparation du sportif", "T2"),
      ch("sport-reglement", "Réglementation et organisation des compétitions", "T3"),
      ch("sport-pedagogie", "Pédagogie et animation sportive", "T3"),
    ]),
    th("sport-pratique", "Spécialité sportive · partie pratique", [
      ch("sport-pratique-1", "Épreuve pratique : habiletés techniques de la discipline", "T2"),
      ch("sport-pratique-2", "Épreuve pratique : situation de match et arbitrage", "T3"),
    ]),
  ],
  { specialty: true },
);

/* ------------------------------------------------------------------ */
/*  Les 7 filières du baccalauréat tunisien                            */
/* ------------------------------------------------------------------ */

export const PROGRAM: ProgramSection[] = [
  {
    section: "Mathématiques",
    motto: "La filière la plus dense en mathématiques et en physique : 4h de maths par semaine et un niveau d'abstraction élevé.",
    rhythm: "DS1 en décembre (suites, limites, continuité, dérivation) · DS2 en mars (études de fonctions, complexes, probabilités) · DS3 en mai (ln, exp, intégrales, arithmétique) · bac en juin.",
    subjects: [MATHS_MAT, PHYSIQUE_SCI, SVT_SPO, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC, INFO_TC],
  },
  {
    section: "Sciences expérimentales",
    motto: "La filière la plus demandée : physique-chimie et SVT à coefficient 4, avec les mathématiques en soutien.",
    rhythm: "DS1 en décembre (RC/RL, chimie de l'équilibre, suites) · DS2 en mars (RLC, ondes, génétique) · DS3 en mai (nucléaire, immunité, intégrales) · bac en juin.",
    subjects: [PHYSIQUE_SCI, SVT_SCI, MATHS_SCI, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC, INFO_TC],
  },
  {
    section: "Sciences techniques",
    motto: "Électricité, automatismes et mécanique : la technologie pèse autant que les maths et la physique.",
    rhythm: "DS1 en décembre (logique combinatoire et séquentielle, limites) · DS2 en mars (GRAFCET, API, triphasé, RLC) · DS3 en mai (transformateur, moteurs, AOP, intégrales) · bac en juin.",
    subjects: [TECHNOLOGIE, MATHS_TEC, PHYSIQUE_TEC, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC, INFO_TC],
  },
  {
    section: "Informatique",
    motto: "Algorithmique et bases de données au premier plan, avec un socle scientifique solide.",
    rhythm: "DS1 en décembre (algorithmes de tri, limites) · DS2 en mars (récursivité, conception de bases) · DS3 en mai (approximation, SQL, intégrales) · bac en juin.",
    subjects: [ALGO, BDD, MATHS_INF, PHYSIQUE_INF, TIC, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC],
  },
  {
    section: "Économie & Gestion",
    motto: "Économie générale et gestion comptable et financière, éclairées par l'histoire-géographie et les maths.",
    rhythm: "DS1 en décembre (croissance, bilan et charges, limites) · DS2 en mars (structures, coûts complets, étude de marché) · DS3 en mai (mondialisation, coûts partiels, financement) · bac en juin.",
    subjects: [ECONOMIE, GESTION, HG_ECO, MATHS_ECO, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC, INFO_TC],
  },
  {
    section: "Lettres",
    motto: "Arabe et philosophie à coefficient 4 : l'argumentation et l'analyse de texte sont au cœur de la filière.",
    rhythm: "DS1 en décembre (poésie et image, liberté et vérité, Tunisie 1881-1956) · DS2 en mars (roman, théâtre, raison et réel) · DS3 en mai (dissertation, commentaire, mondialisation) · bac en juin.",
    subjects: [ARABE_LETTRES, PHILO_LETTRES, HG_LETTRES, FRANCAIS_TC, ANGLAIS_TC, ISLAMIQUE_LETTRES, INFO_TC],
  },
  {
    section: "Sport",
    motto: "Le sport comme matière de spécialité, avec un socle scientifique (SVT coefficient 3) et le tronc commun.",
    rhythm: "DS1 en décembre (anatomie, reproduction, RC) · DS2 en mars (entraînement, génétique, coefficients physiques) · DS3 en mai (pédagogie, immunité, statistiques) · épreuves pratiques au 2ème et 3ème trimestre, bac en juin.",
    subjects: [SPORT_SPECIALITE, SVT_SPO, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC, MATHS_SPO, PHYSIQUE_SPO],
  },
];

/* ------------------------------------------------------------------ */
/*  Index dérivés                                                      */
/* ------------------------------------------------------------------ */

export function getProgramSection(section: string | null | undefined): ProgramSection | null {
  return PROGRAM.find((entry) => entry.section === section) ?? null;
}

export function programSubject(section: string | null | undefined, subjectSlug: string): ProgramSubject | null {
  return getProgramSection(section)?.subjects.find((subject) => subject.slug === subjectSlug) ?? null;
}

export function programSectionSubjects(section: string | null | undefined): string[] {
  return getProgramSection(section)?.subjects.map((subject) => subject.slug) ?? [];
}

export function programChapters(section: string | null | undefined) {
  return (getProgramSection(section)?.subjects ?? []).flatMap((subject) =>
    subject.themes.flatMap((theme) =>
      theme.chapters.map((chapter) => ({ subject, theme, chapter })),
    ),
  );
}

export type ProgramChapterRef = {
  section: SectionName;
  subject: ProgramSubject;
  theme: ProgramTheme;
  chapter: ProgramChapter;
};

/** Toutes les occurrences d'un chapitre, filière par filière. */
export function findChaptersByLesson(lessonSlug: string): ProgramChapterRef[] {
  return PROGRAM.flatMap((entry) =>
    entry.subjects.flatMap((subject) =>
      subject.themes.flatMap((theme) =>
        theme.chapters
          .filter((chapter) => chapter.lessonSlug === lessonSlug)
          .map((chapter) => ({ section: entry.section, subject, theme, chapter })),
      ),
    ),
  );
}

/**
 * Métadonnées de programme à persister sur chaque fiche de cours :
 * trimestre officiel et filières où la fiche est au programme.
 */
export function lessonProgramMeta(): Map<string, { period: PeriodId; sections: SectionName[] }> {
  const meta = new Map<string, { period: PeriodId; sections: SectionName[] }>();
  for (const entry of PROGRAM) {
    for (const subject of entry.subjects) {
      for (const theme of subject.themes) {
        for (const chapter of theme.chapters) {
          if (!chapter.lessonSlug) continue;
          const current = meta.get(chapter.lessonSlug);
          if (!current) {
            meta.set(chapter.lessonSlug, { period: chapter.period, sections: [entry.section] });
          } else if (!current.sections.includes(entry.section)) {
            current.sections.push(entry.section);
          }
        }
      }
    }
  }
  return meta;
}

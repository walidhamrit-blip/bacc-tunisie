import { examsSeed } from "@/db/content/exams";
import { subjectSeeds } from "@/db/content/subjects";
import type { PeriodId, SectionName } from "@/lib/sections";

/**
 * Programme officiel de la 4ème année du secondaire (année du baccalauréat).
 *
 * Hiérarchie reprise telle qu'elle est présentée aux élèves dans les devoirs
 * de synthèse trimestriels :
 *   Filière (section du bac) → Matière → Thème / Partie → Chapitre → Trimestre
 *
 * Sources de référence :
 * - Programmes officiels de la Direction générale des programmes (Ministère de
 *   l'Éducation), 4ème année secondaire, par section ;
 * - Répartition annuelle des programmes 2024-2025 et découpage trimestriel des
 *   séries et devoirs de synthèse publiés par mathinfo.tn (4ème Maths, 4ème
 *   Sciences exp., 4ème Sciences techniques, 4ème Sciences de l'informatique,
 *   4ème Économie & Gestion).
 *
 * T1 = septembre → décembre  (Devoir de contrôle N°1, Devoir de synthèse N°1)
 * T2 = janvier → mars        (Devoir de contrôle N°2, Devoir de synthèse N°2)
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
  /** Sujet corrigé associé (voir `exams.ts`). */
  examSlug?: string;
};

export type ProgramTheme = {
  slug: string;
  title: string;
  /** Volume horaire officiel du module, quand le programme le précise. */
  hours?: string;
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
  links: { lesson?: string; quiz?: string; exam?: string } = {},
): ProgramChapter => ({
  slug,
  title,
  period,
  lessonSlug: links.lesson,
  quizSlug: links.quiz,
  examSlug: links.exam,
});

const th = (
  slug: string,
  title: string,
  chapters: ProgramChapter[],
  hours?: string,
): ProgramTheme => ({ slug, title, hours, chapters });

/** Juin : révision générale et préparation de l'épreuve du baccalauréat. */
/** Mémento de révision partagé par toutes les filières qui suivent la matière. */
const MEMENTO: Record<string, string> = {
  mathematiques: "memento-mathematiques",
  physique: "memento-physique",
  philosophie: "memento-philosophie",
  arabe: "memento-arabe",
  francais: "memento-francais",
  anglais: "memento-anglais",
  informatique: "memento-informatique",
};

/**
 * Les sujets corrigés vivent dans `exams.ts` : on relie le chapitre de révision
 * à la série ou à la session déjà disponible pour la matière.
 */
const EXAM_BY_SUBJECT = new Map<string, string>();
for (const exam of examsSeed) {
  const current = EXAM_BY_SUBJECT.get(exam.subjectSlug);
  if (!current || exam.kind === "session") EXAM_BY_SUBJECT.set(exam.subjectSlug, exam.slug);
}

const revThemes = (slug: string): ProgramTheme =>
  th("revision", "Révision & bac", [
    ch(`${slug}-revision-fiches`, "Révision générale : fiches, formules et notions clés", "REV", {
      lesson: MEMENTO[slug],
    }),
    ch(`${slug}-revision-bac`, "Sujets d'examen corrigés et entraînement chronométré", "REV", {
      exam: EXAM_BY_SUBJECT.get(slug),
    }),
  ]);

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
  themes: [...themes, revThemes(slug)],
});

/* ------------------------------------------------------------------ */
/*  Tronc commun : matières suivies par toutes les filières            */
/* ------------------------------------------------------------------ */

/** Philosophie — sections scientifiques, Économie & Gestion, Informatique, Sport (coef. 1). */
const PHILO_TC = sub("philosophie", "×1", [
  th("philo-notions", "L'humain entre pluralité et unité", [
    ch("philo-ipsete", "L'ipséité et l'altérité : le soi, le corps et l'autre", "T1", { lesson: "philo-ipseite-alterite" }),
    ch("philo-conscience", "La conscience, l'inconscient et la liberté", "T1", {
      lesson: "la-liberte",
      quiz: "quiz-philo-liberte",
    }),
    ch("philo-histoire", "L'histoire, la mémoire et le temps humain", "T2", { lesson: "philo-histoire" }),
    ch("philo-singularite", "La singularité et l'universalité : identité, différence, culture", "T2", { lesson: "philo-singularite-universalite" }),
    ch("philo-langage", "La communication et les systèmes symboliques : langue, image, sacré", "T2", { lesson: "philo-communication-symbolique" }),
  ]),
  th("philo-science", "La science entre vérité et modélisation", [
    ch("philo-modelisation", "Les dimensions de la modélisation scientifique", "T3", { lesson: "philo-modelisation" }),
    ch("philo-limites-epistemologiques", "Limites épistémologiques : réduction, histoire, systèmes techniques", "T3", { lesson: "philo-limites-science" }),
    ch("philo-limites-philosophiques", "Limites philosophiques : vérité, responsabilité et sens", "T3", { lesson: "philo-limites-science" }),
  ]),
  th("philo-methode", "Méthodologie de l'épreuve", [
    ch("philo-dissertation", "La dissertation philosophique : analyser, problématiser, argumenter", "T1", { lesson: "philo-methode-dissertation" }),
    ch("philo-texte", "L'analyse de texte philosophique : dégager la thèse et l'argumentation", "T2", { lesson: "philo-analyse-texte" }),
  ]),
]);

/** Philosophie — section Lettres (coef. 4, programme le plus étendu). */
const PHILO_LETTRES = sub(
  "philosophie",
  "×4",
  [
    th("philo-humain", "I. L'humain entre pluralité et unité", [
      ch("philo-ipsete", "L'ipséité et l'altérité : le soi, le corps, l'autre", "T1", {
        lesson: "la-verite",
      }),
      ch("philo-verite", "La vérité : vérité-correspondance et vérité-vérification", "T1", {
        lesson: "la-verite",
      }),
      ch("philo-conscience", "La conscience, l'inconscient et la liberté", "T1", {
        lesson: "la-liberte",
        quiz: "quiz-philo-liberte",
      }),
      ch("philo-histoire", "L'histoire et la condition historique de l'humain", "T1"),
      ch("philo-singularite", "La singularité et l'universalité : identité, différence, culture", "T2"),
    ]),
    th("philo-communication", "II. La communication et les systèmes symboliques", [
      ch("philo-langage", "Le langage : expression, communication et pensée", "T2"),
      ch("philo-image", "L'image et le rapport au réel", "T2"),
      ch("philo-sacre", "Le sacré, le mythe et la religion", "T2"),
    ]),
    th("philo-verite", "III. La science entre vérité et modélisation", [
      ch("philo-modelisation", "Les dimensions de la modélisation scientifique", "T3"),
      ch("philo-limites-epistemologiques", "Limites épistémologiques de la science", "T3", { lesson: "philo-limites-science" }),
      ch("philo-limites-philosophiques", "Limites philosophiques : vérité, responsabilité, sens", "T3", { lesson: "philo-limites-science" }),
    ]),
    th("philo-valeurs", "IV. Les valeurs entre le relatif et l'absolu", [
      ch("philo-morale", "La morale, le devoir et le bonheur", "T3"),
      ch("philo-art", "L'art, le beau et l'expérience esthétique", "T3"),
      ch("philo-politique", "L'État, la justice et la liberté politique", "T3"),
    ]),
    th("philo-methode", "V. Méthodologie de l'épreuve", [
      ch("philo-dissertation", "La dissertation philosophique : analyser, problématiser, argumenter", "T1"),
      ch("philo-texte", "L'analyse de texte philosophique", "T2", { lesson: "philo-analyse-texte" }),
    ]),
  ],
  { specialty: true },
);

/** Arabe — sections scientifiques, Économie & Gestion, Informatique, Sport (coef. 1). */
const ARABE_TC = sub("arabe", "×1", [
  th("arabe-nathr", "النثر", [
    ch("arabe-maqala", "المقالة الأدبية والاجتماعية", "T1", { lesson: "arabe-maqala" }),
    ch("arabe-qissa", "القصة القصيرة", "T2", { lesson: "arabe-qissa" }),
    ch("arabe-riwaya", "الرواية العربية وأسئلة الحداثة", "T2", { lesson: "arabe-riwaya" }),
  ]),
  th("arabe-sher", "الشعر", [
    ch("arabe-balagha", "البلاغة · الصورة الشعرية", "T1", {
      lesson: "balagha-image-poetique",
      quiz: "quiz-arabe-balagha",
    }),
    ch("arabe-tajdid", "الشعر العربي الحديث بين التجديد والكلاسيكية", "T1", { lesson: "arabe-tajdid" }),
  ]),
  th("arabe-outils", "اللغة والنحو", [
    ch("arabe-nahw", "النحو والإعراب · مراجعة وتراكيب", "T2", { lesson: "arabe-nahw" }),
    ch("arabe-tahlil", "تحليل النص الأدبي وبناء المقال", "T3", { lesson: "arabe-tahlil-nas" }),
  ]),
]);

/** Arabe — section Lettres (coef. 4). */
const ARABE_LETTRES = sub(
  "arabe",
  "×4",
  [
    th("arabe-sher-1", "I. الشعر العربي الحديث", [
      ch("arabe-balagha", "البلاغة · الصورة الشعرية", "T1", {
        lesson: "balagha-image-poetique",
        quiz: "quiz-arabe-balagha",
      }),
      ch("arabe-tajdid", "مدرسة التجديد والرومانسية · أبو القاسم الشابي", "T1"),
      ch("arabe-shabi", "شعر الغزل والصور الشعرية · الشابي", "T1"),
      ch("arabe-11", "الشعر الاجتماعي والسياسي في العصر الحديث", "T2"),
    ]),
    th("arabe-nathr-1", "II. النثر", [
      ch("arabe-maqala", "المقالة الأدبية", "T1", { lesson: "arabe-maqala" }),
      ch("arabe-maqala-siyasiyya", "المقالة السياسية والاجتماعية", "T2", { lesson: "arabe-maqala" }),
      ch("arabe-qissa", "القصة القصيرة", "T2"),
      ch("arabe-riwaya", "الرواية العربية وأسئلة الحداثة", "T2"),
    ]),
    th("arabe-masrah", "III. المسرح", [
      ch("arabe-masrah-nash", "المسرح العربي: النشأة والتطور", "T2"),
      ch("arabe-masrah-hadith", "المسرح العربي الحديث: قضايا ورهانات", "T3"),
    ]),
    th("arabe-texte", "IV. النصوص والحجاج", [
      ch("arabe-texte-hijaji", "النص الحجاجي وبناء الرأي", "T3"),
      ch("arabe-texte-falsafi", "النص الفكري: القراءة والتحليل", "T3"),
    ]),
    th("arabe-outils", "V. اللغة والمهارات", [
      ch("arabe-nahw", "النحو وتراكيب الجملة", "T1", { lesson: "arabe-nahw" }),
      ch("arabe-sarf", "الصرف والاشتقاق", "T1"),
      ch("arabe-balagha-tahlil", "البلاغة وتحليل الصورة", "T2"),
      ch("arabe-tahlil", "تحليل النص الأدبي وبناء المقال", "T3"),
    ]),
  ],
  { specialty: true },
);

/** Français — toutes les sections (coef. 1, sauf Lettres). */
const FRANCAIS_TC = sub("francais", "×1", [
  th("francais-roman", "Le roman", [
    ch("francais-roman", "Le roman et ses personnages : lire et commenter", "T1", { lesson: "roman-personnages", quiz: "quiz-francais-roman" }),
    ch("francais-roman-analyse", "Narrateur, point de vue et construction du personnage", "T1", { lesson: "francais-roman-personnage" }),
    ch("francais-roman-theme", "Thèmes, contexte et portée d'une œuvre romanesque", "T2", { lesson: "francais-roman-theme-oeuvre" }),
  ]),
  th("francais-methode", "Méthodologie et langue", [
    ch("francais-commentaire", "Le commentaire composé : axes et rédaction", "T2", { lesson: "francais-commentaire-compose" }),
    ch("francais-essai", "L'essai argumentatif : thèse, arguments, exemples", "T3", { lesson: "francais-essai-argumentatif" }),
    ch("francais-langue-normes", "Grammaire, conjugaison et lexique au service du sens", "T2", { lesson: "francais-langue-normes" }),
  ]),
]);

/** Français — section Lettres (coef. 1,5). */
const FRANCAIS_LETTRES = sub("francais", "×2", [
  th("francais-roman", "Le roman", [
    ch("francais-roman", "Le roman et ses personnages : lire et commenter", "T1", {
      lesson: "roman-personnages",
      quiz: "quiz-francais-roman",
    }),
    ch("francais-roman-analyse", "Narrateur, point de vue et construction du personnage", "T1"),
  ]),
  th("francais-poesie-theatre", "La poésie et le théâtre", [
    ch("francais-poesie", "La poésie et le lyrisme", "T2"),
    ch("francais-theatre", "Le théâtre : texte et représentation", "T2"),
  ]),
  th("francais-methode", "Méthodologie et langue", [
    ch("francais-commentaire", "Le commentaire composé", "T2", { lesson: "francais-commentaire-compose" }),
    ch("francais-dissertation", "La dissertation littéraire", "T3", { lesson: "francais-essai-argumentatif" }),
    ch("francais-essai", "L'essai argumentatif", "T3", { lesson: "francais-essai-argumentatif" }),
    ch("francais-langue-normes", "Grammaire, conjugaison et lexique", "T1", { lesson: "francais-langue-normes" }),
  ]),
]);

/** Anglais — toutes les sections. */
const ANGLAIS_TC = sub("anglais", "×1", [
  th("anglais-langue", "Language skills", [
    ch("anglais-tenses", "English essentials: tenses, linkers and exam writing", "T1", {
      lesson: "english-tenses-writing",
      quiz: "quiz-anglais-tenses",
    }),
    ch("anglais-reading", "Reading comprehension: identifying the writer's purpose", "T1", { lesson: "english-reading-comprehension" }),
    ch("anglais-vocabulary", "Vocabulary building: education, science and society", "T2", { lesson: "english-vocabulary-building" }),
  ]),
  th("anglais-writing", "Writing and language", [
    ch("anglais-writing", "Writing: the argumentative essay and formal email", "T2", { lesson: "english-writing-essay" }),
    ch("anglais-grammar", "Grammar and language in context", "T3", { lesson: "english-grammar-context" }),
  ]),
]);

/** Anglais — section Lettres (coef. 1,5). */
const ANGLAIS_LETTRES = sub("anglais", "×2", [
  th("anglais-langue", "Language skills", [
    ch("anglais-tenses", "English essentials: tenses, linkers and exam writing", "T1", {
      lesson: "english-tenses-writing",
      quiz: "quiz-anglais-tenses",
    }),
    ch("anglais-reading", "Reading comprehension: identifying the writer's purpose", "T1", { lesson: "english-reading-comprehension" }),
    ch("anglais-vocabulary", "Vocabulary building: literature, culture and society", "T2", { lesson: "english-vocabulary-building" }),
  ]),
  th("anglais-writing", "Writing and language", [
    ch("anglais-writing", "Writing: the argumentative essay and formal email", "T2", { lesson: "english-writing-essay" }),
    ch("anglais-grammar", "Grammar and language in context", "T2"),
    ch("anglais-literature", "Literary texts: reading and commenting", "T3"),
  ]),
]);

/** Informatique — tronc commun scientifique, Économie & Gestion et Lettres (coef. 0,5). */
const INFO_TC = sub("informatique", "×1", [
  th("info-algorithmique", "Algorithmique et programmation", [
    ch("info-python", "Algorithmique et Python : construire un programme fiable", "T1", {
      lesson: "algorithmique-python",
      quiz: "quiz-info-python",
    }),
    ch("info-modules", "Sous-programmes et analyse modulaire", "T1"),
    ch("info-tri-recherche", "Algorithmes de tri et de recherche", "T2"),
  ]),
  th("info-donnees", "Données et tableur", [
    ch("info-tableur", "Tableur : formules, fonctions et graphiques", "T1", {
      lesson: "tableur-formules-graphiques",
    }),
    ch("info-bdd", "Bases de données et requêtes : recherche, sélection, ajout, mise à jour", "T2"),
  ]),
  th("info-citoyennete", "Culture numérique", [
    ch("info-web", "Recherche, sécurité et identité numérique", "T3"),
  ]),
]);

/** Éducation physique — matière de spécialité de la section Sport. */
const SPORT_SPECIALITE = sub(
  "education-physique",
  "×3",
  [
    th("sport-theorie", "Partie théorique · sciences du sport", [
      ch("sport-anatomie", "Anatomie et physiologie de l'effort", "T1"),
      ch("sport-biomecanique", "Biomécanique du mouvement sportif", "T1"),
      ch("sport-physiologie", "Physiologie de l'entraînement, filières énergétiques et récupération", "T2"),
      ch("sport-nutrition", "Nutrition, hydratation et préparation du sportif", "T2"),
      ch("sport-pedagogie", "Pédagogie, didactique et animation sportive", "T3"),
      ch("sport-reglement", "Réglementation, arbitrage et organisation des compétitions", "T3"),
      ch("sport-sante", "Sport, santé et prévention des blessures", "T3"),
    ]),
    th("sport-pratique", "Partie pratique · spécialité sportive", [
      ch("sport-pratique-1", "Épreuve pratique : habiletés techniques de la discipline", "T2"),
      ch("sport-pratique-2", "Épreuve pratique : situation de match et arbitrage", "T3"),
    ]),
  ],
  { specialty: true },
);

/* ------------------------------------------------------------------ */
/*  Mathématiques par filière (répartition officielle par trimestre)   */
/* ------------------------------------------------------------------ */

/** 4ème Mathématiques (coef. 4) — répartition mathinfo.tn / programme officiel. */
const MATHS_MAT = sub(
  "mathematiques",
  "×4",
  [
    th("maths-analyse-1", "Analyse : continuité, limites, dérivation", [
      ch("maths-continuite", "Continuité et limites : rappels et théorème des valeurs intermédiaires", "T1", { lesson: "continuite-tvi-bijection" }),
      ch("maths-derivation", "Dérivabilité, théorème des accroissements finis et applications", "T1", { lesson: "derivabilite-taf" }),
      ch("maths-fonctions-reciproques", "Fonctions continues et strictement monotones · fonctions réciproques", "T1", { lesson: "fonctions-reciproques" }),
      ch("maths-suites", "Suites réelles : convergence, suites récurrentes, suites adjacentes", "T1", {
        lesson: "suites-numeriques",
        quiz: "quiz-math-suites",
      }),
      ch("maths-etude", "Étude de fonctions et représentation graphique", "T2", { lesson: "etude-fonctions-complete" }),
    ]),
    th("maths-integration", "Primitives, intégrales et équations différentielles", [
      ch("maths-primitives", "Primitives d'une fonction continue", "T2", { lesson: "primitives-calcul" }),
      ch("maths-integrales", "Intégrales : calcul, intégration par parties, aire et valeur moyenne", "T2", {
        lesson: "primitives-integrales",
      }),
      ch("maths-ln", "Fonction logarithme népérien", "T2", { lesson: "fonction-logarithme" }),
      ch("maths-exp", "Fonction exponentielle", "T3", { lesson: "fonction-exponentielle" }),
      ch("maths-equa-diff", "Équations différentielles y' = ay + b et y'' + ω²y = 0", "T3", { lesson: "equations-differentielles" }),
    ]),
    th("maths-algebre", "Algèbre, arithmétique et géométrie de l'espace", [
      ch("maths-complexes", "Nombres complexes : forme algébrique, module, argument et ensembles de points", "T2", { lesson: "nombres-complexes" }),
      ch("maths-equations-complexes", "Équations du second degré à coefficients complexes", "T2", { lesson: "equations-complexes" }),
      ch("maths-arithmetique", "Arithmétique dans ℤ : division euclidienne, congruences, PGCD, Bézout, Gauss, Fermat", "T1", { lesson: "arithmetique-z" }),
      ch("maths-produit-espace", "Produit scalaire et produit vectoriel dans l'espace", "T1", { lesson: "espace-droites-plans" }),
      ch("maths-espace", "Droites et plans de l'espace, équations cartésiennes et sphère", "T2", { lesson: "espace-droites-plans" }),
    ]),
    th("maths-probas", "Probabilités et statistiques", [
      ch("maths-probas", "Probabilités : dénombrement, probabilité conditionnelle, indépendance", "T2", { lesson: "probabilites-conditionnelles" }),
      ch("maths-variables", "Variables aléatoires : loi de probabilité, espérance et écart-type", "T2", { lesson: "probabilites-conditionnelles" }),
      ch("maths-binomiale", "Loi binomiale", "T3", { lesson: "probabilites-conditionnelles" }),
      ch("maths-stats", "Séries statistiques à deux caractères : ajustement affine", "T3", { lesson: "statistiques-deux-caracteres" }),
    ]),
  ],
  { specialty: true },
);

/** 4ème Sciences expérimentales (coef. 3). */
const MATHS_SCI = sub("mathematiques", "×3", [
  th("maths-analyse", "Analyse", [
    ch("maths-continuite", "Continuité et limites", "T1", { lesson: "continuite-tvi-bijection" }),
    ch("maths-derivation", "Dérivabilité et théorème des accroissements finis", "T1", { lesson: "derivabilite-taf" }),
    ch("maths-suites", "Suites réelles : convergence et suites récurrentes", "T1", {
      lesson: "suites-numeriques",
      quiz: "quiz-math-suites",
    }),
    ch("maths-etude", "Étude de fonctions et représentation graphique", "T2", { lesson: "etude-fonctions-complete" }),
    ch("maths-primitives", "Primitives", "T2", { lesson: "primitives-calcul" }),
  ]),
  th("maths-integration", "Intégrales et fonctions usuelles", [
    ch("maths-integrales", "Calcul intégral : intégration par parties et aires", "T2", {
      lesson: "primitives-integrales",
    }),
    ch("maths-ln", "Fonction logarithme népérien", "T2", { lesson: "fonction-logarithme" }),
    ch("maths-exp", "Fonction exponentielle", "T3", { lesson: "fonction-exponentielle" }),
  ]),
  th("maths-algebre", "Algèbre et géométrie", [
    ch("maths-complexes", "Nombres complexes et interprétation géométrique", "T2", { lesson: "nombres-complexes" }),
    ch("maths-espace", "Produit scalaire dans l'espace, droites, plans et sphère", "T3", { lesson: "espace-droites-plans" }),
  ]),
  th("maths-probas", "Probabilités et statistiques", [
    ch("maths-probas", "Probabilités conditionnelles et indépendance", "T3", { lesson: "probabilites-conditionnelles" }),
    ch("maths-variables", "Variables aléatoires et loi binomiale", "T3", { lesson: "probabilites-conditionnelles" }),
    ch("maths-stats", "Séries statistiques à deux caractères", "T3", { lesson: "statistiques-deux-caracteres" }),
  ]),
]);

/** 4ème Sciences techniques (coef. 3). */
const MATHS_TEC = sub("mathematiques", "×3", [
  th("maths-analyse", "Analyse", [
    ch("maths-continuite", "Continuité et limites", "T1", { lesson: "continuite-tvi-bijection" }),
    ch("maths-derivation", "Dérivabilité et théorème des accroissements finis", "T1", { lesson: "derivabilite-taf" }),
    ch("maths-fonctions-reciproques", "Fonctions réciproques", "T1"),
    ch("maths-etude", "Étude de fonctions", "T2", { lesson: "etude-fonctions-complete" }),
    ch("maths-primitives", "Primitives", "T2", { lesson: "primitives-calcul" }),
    ch("maths-integrales", "Calcul intégral : intégration par parties et aires", "T3", {
      lesson: "primitives-integrales",
    }),
    ch("maths-ln", "Fonction logarithme népérien", "T2", { lesson: "fonction-logarithme" }),
    ch("maths-exp", "Fonction exponentielle", "T3", { lesson: "fonction-exponentielle" }),
  ]),
  th("maths-geometrie", "Géométrie de l'espace", [
    ch("maths-vecteurs-espace", "Calcul vectoriel : déterminant, vecteurs directeurs, points coplanaires", "T1"),
    ch("maths-droites-plans", "Intersections de droites et de plans dans l'espace", "T2", { lesson: "espace-droites-plans" }),
    ch("maths-produit-vectoriel", "Produit scalaire, produit vectoriel et produit mixte", "T2", { lesson: "espace-droites-plans" }),
    ch("maths-sphere", "Équations de droites, de plans et de sphères", "T2", { lesson: "espace-droites-plans" }),
  ]),
  th("maths-probas", "Suites, probabilités et statistiques", [
    ch("maths-suites", "Suites réelles : arithmétiques, géométriques et récurrentes", "T3", {
      lesson: "suites-numeriques",
      quiz: "quiz-math-suites",
    }),
    ch("maths-probas", "Probabilités conditionnelles et variables aléatoires", "T2", { lesson: "probabilites-conditionnelles" }),
    ch("maths-stats", "Statistiques à deux caractères", "T3", { lesson: "statistiques-deux-caracteres" }),
  ]),
]);

/** 4ème Sciences de l'informatique (coef. 3). */
const MATHS_INF = sub("mathematiques", "×3", [
  th("maths-analyse", "Analyse", [
    ch("maths-continuite", "Continuité : rappels, TVI et bijection", "T1", { lesson: "continuite-tvi-bijection" }),
    ch("maths-derivation", "Dérivabilité et théorème des accroissements finis", "T1", { lesson: "derivabilite-taf" }),
    ch("maths-suites", "Suites réelles", "T1", { lesson: "suites-numeriques", quiz: "quiz-math-suites" }),
    ch("maths-fonctions-reciproques", "Fonctions réciproques", "T2", { lesson: "fonctions-reciproques" }),
    ch("maths-etude", "Étude de fonctions", "T2", { lesson: "etude-fonctions-complete" }),
    ch("maths-primitives", "Primitives", "T2", { lesson: "primitives-calcul" }),
    ch("maths-ln", "Fonction logarithme népérien", "T2", { lesson: "fonction-logarithme" }),
    ch("maths-exp", "Fonction exponentielle", "T3", { lesson: "fonction-exponentielle" }),
    ch("maths-integrales", "Calcul intégral", "T3", { lesson: "primitives-integrales" }),
  ]),
  th("maths-algebre", "Algèbre et arithmétique", [
    ch("maths-complexes", "Nombres complexes : formes algébrique et trigonométrique", "T1", { lesson: "nombres-complexes" }),
    ch("maths-equations-complexes", "Équations à coefficients complexes", "T1", { lesson: "equations-complexes" }),
    ch("maths-arithmetique", "Arithmétique : congruences, PGCD, Bézout et systèmes", "T1", { lesson: "arithmetique-z" }),
  ]),
  th("maths-probas", "Probabilités et statistiques", [
    ch("maths-probas", "Probabilités conditionnelles", "T3", { lesson: "probabilites-conditionnelles" }),
    ch("maths-stats", "Statistiques à deux caractères", "T2", { lesson: "statistiques-deux-caracteres" }),
  ]),
]);

/** 4ème Économie & Gestion (coef. 2). */
const MATHS_ECO = sub("mathematiques", "×2", [
  th("maths-analyse", "Analyse", [
    ch("maths-continuite", "Continuité et limites", "T1", { lesson: "continuite-tvi-bijection" }),
    ch("maths-derivation", "Dérivabilité et théorème des accroissements finis", "T1", { lesson: "derivabilite-taf" }),
    ch("maths-fonctions-reciproques", "Fonctions réciproques", "T1"),
    ch("maths-primitives", "Primitives", "T1"),
    ch("maths-etude", "Étude de fonctions et optimisation", "T1", { lesson: "etude-fonctions-complete" }),
    ch("maths-ln", "Fonction logarithme népérien", "T2", { lesson: "fonction-logarithme" }),
    ch("maths-exp", "Fonction exponentielle", "T2"),
    ch("maths-integrales", "Calcul intégral", "T2", { lesson: "primitives-integrales" }),
  ]),
  th("maths-suites-probas", "Suites, probabilités et statistiques", [
    ch("maths-suites", "Suites réelles et modélisation", "T3", { lesson: "suites-numeriques" }),
    ch("maths-probas", "Probabilités conditionnelles et variables aléatoires", "T2", { lesson: "probabilites-conditionnelles" }),
    ch("maths-graphes", "Graphes : vocabulaire, chaîne eulérienne et coloration", "T2", { lesson: "graphes-euleriens" }),
    ch("maths-stats", "Statistiques à un et deux caractères", "T1", { lesson: "statistiques-deux-caracteres" }),
  ]),
]);

/** 4ème Sport (coef. 1). */
const MATHS_SPO = sub("mathematiques", "×1", [
  th("maths-analyse", "Analyse", [
    ch("maths-continuite", "Continuité et limites", "T1", { lesson: "continuite-tvi-bijection" }),
    ch("maths-derivation", "Dérivabilité et étude de fonctions", "T1", { lesson: "derivabilite-taf" }),
    ch("maths-primitives", "Primitives et calcul intégral", "T2"),
    ch("maths-ln-exp", "Fonctions logarithme et exponentielle", "T2", { lesson: "fonction-logarithme" }),
  ]),
  th("maths-stats", "Suites, statistiques et probabilités", [
    ch("maths-suites", "Suites réelles", "T3", { lesson: "suites-numeriques" }),
    ch("maths-stats", "Statistiques à une et deux variables", "T2", { lesson: "statistiques-deux-caracteres" }),
    ch("maths-probas", "Probabilités", "T3", { lesson: "probabilites-conditionnelles" }),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  Sciences physiques par filière                                     */
/* ------------------------------------------------------------------ */

/** 4ème Mathématiques (coef. 4). */
const PHYSIQUE_MAT = sub(
  "physique",
  "×4",
  [
    th("phys-electrique", "Évolution des systèmes électriques", [
      ch("phys-rc", "Le dipôle RC : charge et décharge d'un condensateur", "T1", {
        lesson: "dipole-rc",
        quiz: "quiz-physique-rc",
      }),
      ch("phys-rl", "Le dipôle RL", "T1", { lesson: "dipole-rl" }),
      ch("phys-rlc-libre", "Oscillations libres dans un circuit RLC", "T1", { lesson: "oscillations-rlc-libres" }),
      ch("phys-rlc-force", "Oscillations électriques forcées et résonance", "T2"),
      ch("phys-puissance", "Puissance en régime sinusoïdal et facteur de puissance", "T2"),
    ]),
    th("phys-mecanique", "Évolution des systèmes mécaniques", [
      ch("phys-pendule", "Le pendule élastique : oscillations mécaniques", "T2"),
      ch("phys-energie-meca", "Énergie mécanique et amortissement", "T2"),
      ch("phys-rotation", "Mouvement de rotation d'un solide autour d'un axe fixe", "T2"),
    ]),
    th("phys-ondes", "Les ondes", [
      ch("phys-ondes-meca", "Ondes mécaniques progressives et périodiques", "T2"),
      ch("phys-ondes-em", "Ondes électromagnétiques et spectre", "T3"),
      ch("phys-diffraction", "Diffraction de la lumière", "T3"),
    ]),
    th("phys-nucleaire", "Physique nucléaire", [
      ch("phys-noyaux", "Noyaux, masse et énergie", "T3", {
        lesson: "noyaux-radioactivite",
        quiz: "quiz-physique-nucleaire",
      }),
      ch("phys-decroissance", "Décroissance radioactive et datation", "T3", { lesson: "decroissance-radioactive" }),
    ]),
    th("phys-chimie", "Chimie", [
      ch("phys-avancement", "Mesure de l'avancement d'une réaction chimique", "T1"),
      ch("phys-vitesse", "Vitesse de réaction et facteurs cinétiques", "T1"),
      ch("phys-action-masse", "Loi d'action de masse et équilibre chimique", "T1"),
      ch("phys-acides-bases", "Réactions acide-base et dosage", "T2"),
      ch("phys-oxydoreduction", "Oxydoréduction et piles électrochimiques", "T3"),
      ch("phys-electrolyse", "Électrolyse et applications industrielles", "T3"),
    ]),
  ],
  { specialty: true },
);

/** 4ème Sciences expérimentales (coef. 4). */
const PHYSIQUE_SCI = sub(
  "physique",
  "×4",
  [
    th("phys-electrique", "Évolution des systèmes électriques", [
      ch("phys-rc", "Le dipôle RC : charge et décharge d'un condensateur", "T1", {
        lesson: "dipole-rc",
        quiz: "quiz-physique-rc",
      }),
      ch("phys-rl", "Le dipôle RL : l'inductance et l'établissement du courant", "T1", { lesson: "dipole-rl" }),
      ch("phys-rlc-libre", "Oscillations électriques libres dans un circuit RLC", "T1"),
      ch("phys-rlc-force", "Oscillations électriques forcées et résonance", "T2"),
      ch("phys-puissance", "Puissance en régime sinusoïdal", "T2"),
    ]),
    th("phys-mecanique", "Évolution des systèmes mécaniques", [
      ch("phys-pendule", "Le pendule élastique", "T2"),
      ch("phys-energie-meca", "Énergie mécanique et amortissement", "T2"),
      ch("phys-rotation", "Rotation d'un solide autour d'un axe fixe", "T2"),
    ]),
    th("phys-ondes", "Les ondes", [
      ch("phys-ondes-meca", "Ondes mécaniques progressives et périodiques", "T2"),
      ch("phys-ondes-em", "Ondes électromagnétiques et spectre", "T3"),
      ch("phys-lumiere", "Propagation de la lumière et diffraction", "T3"),
    ]),
    th("phys-nucleaire", "Physique nucléaire", [
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

/** 4ème Sciences techniques (coef. 3). */
const PHYSIQUE_TEC = sub("physique", "×3", [
  th("phys-electrique", "Électricité", [
    ch("phys-rc", "Le dipôle RC : charge et décharge d'un condensateur", "T1", {
      lesson: "dipole-rc",
      quiz: "quiz-physique-rc",
    }),
    ch("phys-rl", "Le dipôle RL", "T1", { lesson: "dipole-rl" }),
    ch("phys-rlc", "Oscillations libres dans un circuit RLC", "T2", { lesson: "oscillations-rlc-libres" }),
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

/** 4ème Sciences de l'informatique (coef. 2). */
const PHYSIQUE_INF = sub("physique", "×2", [
  th("phys-electrique", "Électricité et ondes", [
    ch("phys-rc", "Le dipôle RC : charge et décharge d'un condensateur", "T1", {
      lesson: "dipole-rc",
      quiz: "quiz-physique-rc",
    }),
    ch("phys-rl", "Le dipôle RL", "T1", { lesson: "dipole-rl" }),
    ch("phys-rlc", "Oscillations libres RLC", "T2", { lesson: "oscillations-rlc-libres" }),
    ch("phys-ondes-meca", "Ondes mécaniques progressives", "T2", { lesson: "ondes-mecaniques" }),
  ]),
  th("phys-nucleaire", "Physique nucléaire", [
    ch("phys-noyaux", "Noyaux, masse et énergie", "T3", {
      lesson: "noyaux-radioactivite",
      quiz: "quiz-physique-nucleaire",
    }),
    ch("phys-decroissance", "Décroissance radioactive", "T3", { lesson: "decroissance-radioactive" }),
  ]),
]);

/** 4ème Sport (coef. 1). */
const PHYSIQUE_SPO = sub("physique", "×1", [
  th("phys-sport", "Physique appliquée au mouvement", [
    ch("phys-rc", "Le dipôle RC : charge et décharge d'un condensateur", "T1", {
      lesson: "dipole-rc",
    }),
    ch("phys-mouvement", "Mouvement, forces et énergie", "T2"),
    ch("phys-ondes-meca", "Ondes et signal", "T3"),
    ch("phys-oxydoreduction", "Oxydoréduction et piles", "T2"),
    ch("phys-acides-bases", "Acides et bases", "T3"),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  Sciences naturelles (SVT)                                          */
/* ------------------------------------------------------------------ */

/** 4ème Sciences expérimentales (coef. 4) — programme officiel complet. */
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

/** 4ème Mathématiques (coef. 1) — biologie humaine et génétique. */
const SVT_MAT = sub("svt", "×1", [
  th("svt-humain", "Biologie humaine", [
    ch("svt-repro-humaine", "Reproduction humaine et maîtrise de la procréation", "T1"),
    ch("svt-immunite", "L'immunité et la santé", "T2", {
      lesson: "immunologie",
      quiz: "quiz-svt-immunite",
    }),
    ch("svt-neuro", "Le système nerveux et le réflexe myotatique", "T3"),
  ]),
  th("svt-genetique", "Génétique", [
    ch("svt-transmission", "Transmission des caractères héréditaires", "T2", {
      lesson: "genetique-transmission",
      quiz: "quiz-svt-genetique",
    }),
    ch("svt-genetique-humaine", "Génétique humaine et anomalies chromosomiques", "T3"),
  ]),
]);

/** 4ème Sport (coef. 3) — sciences biologiques appliquées à l'effort. */
const SVT_SPO = sub(
  "svt",
  "×3",
  [
    th("svt-sport", "Sciences biologiques et effort physique", [
      ch("svt-repro", "Reproduction humaine et maîtrise de la procréation", "T1"),
      ch("svt-transmission", "Transmission des caractères héréditaires et génétique", "T2", {
        lesson: "genetique-transmission",
        quiz: "quiz-svt-genetique",
      }),
      ch("svt-neuro-muscle", "Système nerveux, réflexe myotatique et muscle squelettique", "T2"),
      ch("svt-immunite", "Immunité et santé du sportif", "T3", {
        lesson: "immunologie",
        quiz: "quiz-svt-immunite",
      }),
      ch("svt-metabolisme", "Métabolisme énergétique et adaptation à l'effort", "T3"),
      ch("svt-nutrition", "Nutrition du sportif et équilibre alimentaire", "T3"),
    ]),
  ],
  { specialty: true },
);

/* ------------------------------------------------------------------ */
/*  Sciences de l'ingénieur / Technologie (Sciences techniques)         */
/* ------------------------------------------------------------------ */

const TECHNOLOGIE = sub(
  "technologie",
  "×3 (+ TP ×1)",
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
/*  Sciences de l'informatique (4ème SI)                               */
/* ------------------------------------------------------------------ */

const INFO_SPECIALITE = sub(
  "informatique",
  "×3 (Algo. : écrit 2 + pratique 1) · ×3 (BDD & TIC)",
  [
    th(
      "info-algo",
      "Algorithmique & programmation",
      [
        ch("info-records", "Enregistrements, vecteurs d'enregistrements et fichiers", "T1", { lesson: "enregistrements-fichiers" }),
        ch("info-fichiers", "Fichiers textes et fichiers typés : création, lecture, mise à jour", "T1", { lesson: "info-fichiers-typed" }),
        ch("info-recursivite", "Récursivité : définition et applications", "T1", { lesson: "recursivite" }),
        ch("info-tri", "Algorithmes de tri : insertion et tri Shell", "T1", { lesson: "tri-insertion-shell" }),
        ch("info-suites-recurrentes", "Algorithmes récurrents d'ordre 2 et plus", "T2", { lesson: "algorithmes-recurrents" }),
        ch("info-arithmetique", "Algorithmes d'arithmétique : PGCD récursif, divisibilité, Fibonacci, base, C(n,p)", "T2", { lesson: "algorithmes-arithmetique" }),
        ch("info-approximation", "Algorithmes d'approximation : point fixe, constantes, calcul d'aires", "T3", { lesson: "algorithmes-approximation" }),
        ch("info-avances", "Algorithmes avancés : tri rapide, tour de Hanoi, huit dames, voyageur de commerce", "T3", { lesson: "algorithmes-avances" }),
      ],
      "118 h",
    ),
    th(
      "info-bdd",
      "Bases de données",
      [
        ch("info-modele", "Modèle relationnel : relations, clés et contraintes", "T1", { lesson: "modele-relationnel" }),
        ch("info-mcd", "Conception : modèle conceptuel (entités-relations) et modèle logique", "T2", { lesson: "conception-bdd" }),
        ch("info-algebre", "Algèbre relationnelle : sélection, projection, jointure", "T2", { lesson: "algebre-relationnelle" }),
        ch("info-sql", "Requêtes SQL : recherche, sélection, ajout et mise à jour", "T3", {
          lesson: "bases-donnees-sql",
          quiz: "quiz-info-sql",
        }),
        ch("info-sql-avance", "SQL avancé : agrégats, groupes et sous-requêtes", "T3", { lesson: "sql-requetes-avancees", quiz: "quiz-info-sql" }),
      ],
      "45 h",
    ),
    th(
      "info-tic",
      "TIC · systèmes, réseaux et web",
      [
        ch("info-collaboration", "Outils de collaboration : réseau local, forums, visioconférence", "T1", { lesson: "tic-collaboration-systemes" }),
        ch("info-systeme", "Systèmes d'exploitation et architecture matérielle", "T1", { lesson: "info-systemes-exploitation" }),
        ch("info-reseaux", "Réseaux informatiques : topologies et services", "T2", { lesson: "info-reseaux" }),
        ch("info-web", "Pages web et langages de script : données échangées à distance", "T2", { lesson: "web-dynamique-publication" }),
        ch("info-animation", "Production électronique avancée : animation et multimédia", "T3", { lesson: "web-dynamique-publication" }),
        ch("info-publication", "Publication de sites web : hébergement, référencement, sécurisation", "T3", { lesson: "web-dynamique-publication" }),
      ],
      "50 h",
    ),
  ],
  { specialty: true },
);

/* ------------------------------------------------------------------ */
/*  Économie & Gestion                                                 */
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
    th("eco-politiques", "V. Les politiques économiques", [
      ch("eco-role-etat", "Le rôle de l'État dans l'économie", "T3"),
      ch("eco-monetaire", "Politique monétaire, inflation et rôle de la BCT", "T3"),
      ch("eco-budgetaire", "Politique budgétaire et finances publiques", "T3"),
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
      ch("gest-compte-resultat", "Le compte de résultat et les états financiers", "T1"),
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
      ch("gest-ventes", "La politique commerciale : produit, prix, distribution, communication", "T3"),
    ]),
    th("gest-finance", "Gestion financière", [
      ch("gest-bilan-fonctionnel", "Le bilan fonctionnel et les ratios financiers", "T3"),
      ch("gest-financement", "Le tableau de financement et les décisions d'investissement", "T3"),
      ch("gest-rh", "La gestion des ressources humaines", "T3"),
    ]),
  ],
  { specialty: true },
);

/* ------------------------------------------------------------------ */
/*  Histoire-Géographie                                                 */
/* ------------------------------------------------------------------ */

const HG_ECO = sub("histoire-geographie", "×2", [
  th("hg-tunisie", "La Tunisie contemporaine", [
    ch("hg-protectorat", "La Tunisie de 1881 à 1956 : la construction du mouvement national", "T1", {
      lesson: "tunisie-mouvement-national",
      quiz: "quiz-hg-tunisie",
    }),
    ch("hg-economie-coloniale", "L'économie et la société tunisiennes sous le protectorat", "T1"),
    ch("hg-independance", "La Tunisie depuis 1956 : construction de l'État et développement", "T2"),
    ch("hg-tunisie-actuelle", "La Tunisie aujourd'hui : population, villes et activités", "T2"),
  ]),
  th("hg-monde", "Le monde d'aujourd'hui", [
    ch("hg-guerres", "Les grands conflits mondiaux et la construction de la paix", "T1"),
    ch("hg-mondialisation", "La mondialisation et ses effets", "T2"),
    ch("hg-espaces", "Les espaces productifs et les flux mondiaux", "T3"),
    ch("hg-maghreb", "Le Maghreb et l'intégration régionale", "T3"),
    ch("hg-cartographie", "Cartographie et analyse de documents", "T3"),
  ]),
]);

const HG_LETTRES = sub(
  "histoire-geographie",
  "×3",
  [
    th("hg-tunisie", "La Tunisie contemporaine", [
      ch("hg-protectorat", "La Tunisie de 1881 à 1956 : la construction du mouvement national", "T1", {
        lesson: "tunisie-mouvement-national",
        quiz: "quiz-hg-tunisie",
      }),
      ch("hg-economie-coloniale", "L'économie et la société tunisiennes sous le protectorat", "T1"),
      ch("hg-independance", "La Tunisie depuis 1956 : État, développement et mutations sociales", "T2"),
      ch("hg-tunisie-actuelle", "La Tunisie aujourd'hui : population, villes et activités", "T2"),
      ch("hg-transition", "La Tunisie après 2011 : transition politique et défis économiques", "T3"),
    ]),
    th("hg-monde", "Histoire et géographie du monde contemporain", [
      ch("hg-guerres", "Les grands conflits mondiaux et la construction de la paix", "T1"),
      ch("hg-mondialisation", "La mondialisation et les espaces productifs", "T2"),
      ch("hg-espaces", "Les échanges mondiaux et les pôles de la puissance", "T3"),
      ch("hg-cartographie", "Étude de documents et cartographie", "T3"),
    ]),
  ],
  { specialty: true },
);

/* ------------------------------------------------------------------ */
/*  Pensée islamique (section Lettres)                                 */
/* ------------------------------------------------------------------ */

const ISLAMIQUE_LETTRES = sub("education-islamique", "×1", [
  th("islam-valeurs", "المقاصد والقيم", [
    ch("islam-wasatiyya", "الوسطية والاعتدال: قيم الدين في حياة الفرد والمجتمع", "T1", {
      lesson: "wasatiyya-valeurs",
    }),
    ch("islam-maqasid", "مقاصد الشريعة وضروراتها الخمس", "T1"),
    ch("islam-hiwar", "حوار الحضارات والتسامح", "T2"),
    ch("islam-qadaya", "القضايا المجتمعية المعاصرة", "T2"),
    ch("islam-aqida", "العقيدة الإسلامية وأثرها في السلوك", "T2"),
    ch("islam-akhlaq", "الأخلاق الإسلامية وقيم المواطنة", "T3"),
  ]),
]);

/* ------------------------------------------------------------------ */
/*  Coefficients spécifiques à la section Sport                        */
/* ------------------------------------------------------------------ */

/** Retire le thème de révision (ajouté automatiquement par `sub`) avant réutilisation. */
const sansRevision = (themes: ProgramTheme[]): ProgramTheme[] =>
  themes.filter((theme) => theme.slug !== "revision");

/** Philosophie en section Sport : coefficient 1,5. */
const PHILO_SPO = sub("philosophie", "×1,5", sansRevision(PHILO_TC.themes));
/** Français en section Sport : coefficient 1,5. */
const FRANCAIS_SPO = sub("francais", "×1,5", sansRevision(FRANCAIS_TC.themes));
/** Anglais en section Sport : coefficient 1,5. */
const ANGLAIS_SPO = sub("anglais", "×1,5", sansRevision(ANGLAIS_TC.themes));

/* ------------------------------------------------------------------ */
/*  Les 7 filières du baccalauréat tunisien                            */
/* ------------------------------------------------------------------ */

export const PROGRAM: ProgramSection[] = [
  {
    section: "Mathématiques",
    motto: "La filière la plus dense en mathématiques (coef. 4) et en sciences physiques (coef. 4), avec un niveau d'abstraction élevé.",
    rhythm: "DS1 en décembre (continuité, dérivation, arithmétique, suites, complexes, RC/RL, cinétique chimique) · DS2 en mars (fonctions réciproques, primitives, intégrales, ln, probabilités, RLC, ondes) · DS3 en mai (exponentielle, équations différentielles, binomiale, statistiques, nucléaire) · bac en juin.",
    subjects: [MATHS_MAT, PHYSIQUE_MAT, SVT_MAT, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC, INFO_TC],
  },
  {
    section: "Sciences expérimentales",
    motto: "La filière la plus demandée : sciences physiques et sciences naturelles à coefficient 4, mathématiques à coefficient 3.",
    rhythm: "DS1 en décembre (RC/RL, chimie de l'équilibre, reproduction, brassage génétique, continuité, suites) · DS2 en mars (RLC, ondes, génétique, phylogénie, primitives, complexes) · DS3 en mai (nucléaire, immunité, neurophysiologie, exponentielles, intégrales, probabilités) · bac en juin.",
    subjects: [PHYSIQUE_SCI, SVT_SCI, MATHS_SCI, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC, INFO_TC],
  },
  {
    section: "Sciences techniques",
    motto: "Électricité, automatismes et mécanique : la technologie pèse autant que les maths et la physique (coef. 3 chacune).",
    rhythm: "DS1 en décembre (logique combinatoire et séquentielle, continuité, dérivation) · DS2 en mars (GRAFCET, API, triphasé, RLC, produit vectoriel) · DS3 en mai (transformateur, moteurs, AOP, intégrales, statistiques) · bac en juin.",
    subjects: [TECHNOLOGIE, MATHS_TEC, PHYSIQUE_TEC, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC, INFO_TC],
  },
  {
    section: "Informatique",
    motto: "Algorithmique (coef. 3) et bases de données au premier plan, avec un socle scientifique solide (maths coef. 3, physique coef. 2).",
    rhythm: "DS1 en décembre (enregistrements et fichiers, tris, arithmétique, continuité, complexes) · DS2 en mars (récursivité, conception de bases, algèbre relationnelle, ln, probabilités) · DS3 en mai (approximation, algorithmes avancés, SQL, intégrales, statistiques) · bac en juin.",
    subjects: [INFO_SPECIALITE, MATHS_INF, PHYSIQUE_INF, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC],
  },
  {
    section: "Économie & Gestion",
    motto: "Économie générale et gestion comptable et financière (coef. 3 chacune), éclairées par l'histoire-géographie et les maths.",
    rhythm: "DS1 en décembre (croissance, bilan et charges, limites et dérivation, Tunisie 1881-1956) · DS2 en mars (structures économiques, coûts complets, étude de marché, ln et exponentielles, probabilités) · DS3 en mai (mondialisation, coûts partiels, financement, intégrales, suites) · bac en juin.",
    subjects: [ECONOMIE, GESTION, HG_ECO, MATHS_ECO, PHILO_TC, ARABE_TC, FRANCAIS_TC, ANGLAIS_TC, INFO_TC],
  },
  {
    section: "Lettres",
    motto: "Arabe et philosophie à coefficient 4 : l'argumentation, l'analyse de texte et la dissertation sont au cœur de la filière.",
    rhythm: "DS1 en décembre (poésie et image, ipséité et altérité, Tunisie 1881-1956, langue arabe) · DS2 en mars (roman, théâtre, communication et systèmes symboliques, Tunisie depuis 1956) · DS3 en mai (dissertation, commentaire, valeurs, mondialisation) · bac en juin.",
    subjects: [ARABE_LETTRES, PHILO_LETTRES, HG_LETTRES, FRANCAIS_LETTRES, ANGLAIS_LETTRES, ISLAMIQUE_LETTRES, INFO_TC],
  },
  {
    section: "Sport",
    motto: "L'éducation physique comme spécialité (coef. 3, dont 2,5 à l'épreuve pratique) et les sciences biologiques (coef. 3).",
    rhythm: "DS1 en décembre (anatomie, biomécanique, reproduction, RC, continuité) · DS2 en mars (entraînement, nutrition, génétique, neuro-muscle, primitives) · DS3 en mai (pédagogie, réglementation, immunité, métabolisme, probabilités) · épreuves pratiques aux 2ème et 3ème trimestres, bac en juin.",
    subjects: [SPORT_SPECIALITE, SVT_SPO, MATHS_SPO, PHYSIQUE_SPO, PHILO_SPO, ARABE_TC, FRANCAIS_SPO, ANGLAIS_SPO],
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

const PERIOD_RANK: Record<PeriodId, number> = { T1: 1, T2: 2, T3: 3, REV: 4 };

/**
 * Retourne le(s) trimestre(s) où une fiche est évaluée :
 * - si une filière est sélectionnée, renvoie uniquement le trimestre de cette filière ;
 * - sinon, renvoie tous les trimestres où cette fiche apparaît dans le programme officiel.
 */
export function lessonPeriodsForFilter(
  lessonSlug: string,
  section?: string | null,
  fallbackPeriod?: string,
): PeriodId[] {
  const refs = findChaptersByLesson(lessonSlug);
  const filteredRefs = section ? refs.filter((ref) => ref.section === section) : refs;

  if (filteredRefs.length > 0) {
    const unique = Array.from(new Set(filteredRefs.map((ref) => ref.chapter.period)));
    return unique.sort((a, b) => PERIOD_RANK[a] - PERIOD_RANK[b]);
  }

  const fb = (fallbackPeriod as PeriodId | undefined) ?? "T1";
  return [fb in PERIOD_RANK ? fb : "T1"];
}

/** Trimestre principal à afficher pour une fiche dans le contexte d'une filière (ou au plus tôt). */
export function lessonDisplayPeriod(
  lessonSlug: string,
  section?: string | null,
  fallbackPeriod?: string,
): PeriodId {
  return lessonPeriodsForFilter(lessonSlug, section, fallbackPeriod)[0] ?? "T1";
}

/**
 * Métadonnées de programme à persister sur chaque fiche de cours :
 * trimestre officiel (en priorisant la matière de spécialité / le trimestre le plus tôt)
 * et filières où la fiche est au programme.
 */
export function lessonProgramMeta(): Map<string, { period: PeriodId; sections: SectionName[] }> {
  const meta = new Map<string, { period: PeriodId; specialty: boolean; sections: SectionName[] }>();
  for (const entry of PROGRAM) {
    for (const subject of entry.subjects) {
      for (const theme of subject.themes) {
        for (const chapter of theme.chapters) {
          if (!chapter.lessonSlug) continue;
          const isSpecialty = Boolean(subject.specialty);
          const current = meta.get(chapter.lessonSlug);
          if (!current) {
            meta.set(chapter.lessonSlug, {
              period: chapter.period,
              specialty: isSpecialty,
              sections: [entry.section],
            });
          } else {
            if (!current.sections.includes(entry.section)) {
              current.sections.push(entry.section);
            }
            const shouldPromotePeriod =
              (isSpecialty && !current.specialty) ||
              (isSpecialty === current.specialty &&
                PERIOD_RANK[chapter.period] < PERIOD_RANK[current.period]);
            if (shouldPromotePeriod) {
              current.period = chapter.period;
              current.specialty = isSpecialty;
            }
          }
        }
      }
    }
  }
  return new Map(
    Array.from(meta.entries()).map(([slug, { period, sections }]) => [slug, { period, sections }]),
  );
}

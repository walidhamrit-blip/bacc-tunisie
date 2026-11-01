import type { CorrectionAnalysis, CorrectionExercise, QuizQuestion } from "@/db/schema";
import { exams as examsTable, exercises as exercisesTable, lessons as lessonsTable } from "@/db/schema";

type Lesson = typeof lessonsTable.$inferSelect;
type Exercise = typeof exercisesTable.$inferSelect;
type Exam = typeof examsTable.$inferSelect;

const QUESTION_VERBS: { pattern: RegExp; method: string }[] = [
  {
    pattern: /\b(montrer|démontrer|prouver|vérifier|بيّن|أثبت)\b/i,
    method:
      "Pour une démonstration : pars de l'expression de départ donnée par l'énoncé, transforme-la pas à pas et écris explicitement le résultat attendu. Chaque égalité doit être justifiée.",
  },
  {
    pattern: /\b(calculer|déterminer|trouver|احسب|حدّد)\b/i,
    method:
      "Pour un calcul : écris d'abord la formule littérale, remplace ensuite par les valeurs avec leurs unités, puis donne le résultat avec un nombre de chiffres significatifs raisonnable.",
  },
  {
    pattern: /\b(déduire|en déduire|استنتج)\b/i,
    method:
      "Pour une déduction : cite explicitement le résultat de la question précédente et explique en une phrase le lien logique avant de conclure.",
  },
  {
    pattern: /\b(étudier|dresser|tableau|منحنى|ادرس)\b/i,
    method:
      "Pour une étude : construis un tableau de valeurs ou de signes, puis conclus par une phrase qui résume la variation ou le comportement observé.",
  },
  {
    pattern: /\b(interpréter|expliquer|commenter|علّل|فسّر)\b/i,
    method:
      "Pour une interprétation : commence par nommer le phénomène ou la loi en jeu, puis explique le mécanisme en une phrase, et termine par une conclusion reliée à l'énoncé.",
  },
  {
    pattern: /\b(justifier|argumenter|discuter|برّر)\b/i,
    method:
      "Pour une justification : affirme ta réponse, donne un argument (loi, donnée, calcul) puis un exemple. Sans argument explicite, les points de justification ne sont pas attribués.",
  },
  {
    pattern: /\b(représenter|tracer|schéma|dessiner|ارسم)\b/i,
    method:
      "Pour un schéma : nomme les grandeurs et les unités, indique les légendes et les flèches de sens. Un schéma annoté, même simple, rapporte plus qu'un paragraphe confus.",
  },
  {
    pattern: /\b(comparer|classer|ordonner|قارن)\b/i,
    method:
      "Pour une comparaison : utilise un tableau à deux colonnes (points communs / différences) puis conclus sur le critère demandé.",
  },
];

const SUBJECT_METHODS: Record<string, string[]> = {
  mathematiques: [
    "Écris toujours le domaine de définition avant toute étude de fonction.",
    "Une conjecture n'est pas une preuve : rédige une démonstration (récurrence, calcul, absurde).",
    "Vérifie ton résultat sur un cas simple ou avec la calculatrice quand c'est possible.",
  ],
  physique: [
    "Fais un schéma du montage avec les conventions de signe avant d'écrire les lois.",
    "Écris les relations littérales, fais l'application numérique puis donne l'unité.",
    "Vérifie l'ordre de grandeur du résultat (puissance de dix).",
  ],
  svt: [
    "Exploite les documents dans l'ordre : décrire, comparer, interpréter.",
    "Chaque conclusion doit être reliée à une observation précise du document.",
    "Les schémas fonctionnels annotés sont attendus (brassage, synapse, complexe immun).",
  ],
  informatique: [
    "Analyse entrées / traitement / sorties avant de coder.",
    "Prévois les cas limites : liste vide, valeur nulle, donnée absente.",
    "En SQL, respecte l'ordre SELECT, FROM, WHERE, GROUP BY, ORDER BY.",
  ],
  technologie: [
    "Nomme précisément chaque constituant et sa fonction dans la chaîne.",
    "Relie chaque solution technique à une contrainte du cahier des charges.",
    "Vérifie les unités : rad/s, N·m, W et rendement sans unité.",
  ],
  philosophie: [
    "Dégage d'abord le problème posé par le sujet, pas seulement son thème.",
    "Chaque partie : thèse, argument, exemple, référence expliquée.",
    "La conclusion répond à la question posée en une phrase claire.",
  ],
  arabe: [
    "حدّد الغرض والموضوع العام قبل الشروع في التحليل.",
    "كل صورة بلاغية تحتاج إلى شرح وأثر وربط بالفكرة.",
    "لا تكتفِ بسرد الشواهد دون شرح دلالتها.",
  ],
  francais: [
    "Repère les procédés avant d'interpréter : lexique, syntaxe, figures, énonciation.",
    "Chaque citation doit être courte, entre guillemets et analysée.",
    "Relie toujours le procédé à un effet produit sur le lecteur.",
  ],
  anglais: [
    "Read the question twice and underline the key words before writing.",
    "Use clear linkers (however, therefore, moreover) between your ideas.",
    "Check subject-verb agreement and tenses at the end.",
  ],
  "histoire-geographie": [
    "Chaque fait doit être daté, attribué à un acteur et relié à une portée.",
    "Organise ta réponse en trois idées annoncées clairement.",
    "Exploite le vocabulaire historique et géographique attendu.",
  ],
  "education-islamique": [
    "حدّد نوع النص ومصدره ثم اشرح مفرداته.",
    "استخرج القيم والمقاصد وربطها بالواقع.",
    "ادعم كل حكم بدليل من النص أو من السنة.",
  ],
  economie: [
    "Définis la notion avant de calculer, puis indique l'unité de ton résultat.",
    "Illustre chaque mécanisme économique par un exemple tunisien concret.",
    "Nuance systématiquement : identifie une limite de l'analyse.",
  ],
  gestion: [
    "Classe les éléments dans un tableau avant d'écrire les écritures.",
    "Indique le numéro de compte pour chaque débit et chaque crédit.",
    "Vérifie l'équilibre : total actif = total passif.",
  ],
};

const GENERIC_METHOD = [
  "Recopie les données de l'énoncé dans un tableau : valeurs, unités et grandeurs inconnues.",
  "Identifie la notion du cours mobilisée (elle est en général dans le titre de l'exercice).",
  "Rédige la solution en étapes numérotées : formule, remplacement, calcul, conclusion.",
  "Termine par une phrase de réponse qui reprend les mots de la question.",
];

const ARABIC_VERBS: { pattern: RegExp; method: string }[] = [
  {
    pattern: /(بيّن|أثبت|برهن)/,
    method: "للتبرير: انطلق من المعطيات، ووظّف القاعدة أو النص، ثم اكتب النتيجة صراحة مع التعليل.",
  },
  {
    pattern: /(احسب|حدّد|جد)/,
    method: "للحساب: اكتب العلاقة الحرفية أولاً، ثم التعويض العددي بالأرقام، ثم النتيجة مع الوحدة.",
  },
  {
    pattern: /(حلّل|فسّر|علّل)/,
    method: "للتحليل: اذكر الظاهرة، اشرح آليتها، ثم اربطها بالمعطى وأثرها في المعنى.",
  },
  {
    pattern: /(استنتج)/,
    method: "للاستنتاج: أشر إلى النتيجة السابقة، وبيّن العلاقة المنطقية، ثم صغ الاستنتاج بوضوح.",
  },
];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\u0600-\u06ff ]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokens(text: string): string[] {
  return normalize(text)
    .split(" ")
    .filter((word) => word.length >= 4);
}

function extractNumbers(text: string): string[] {
  const matches = text.match(/-?\d+(?:[.,]\d+)?\s?(?:%|cm|mm|km|m|kg|g|s|ms|min|h|V|mV|A|mA|Ω|kΩ|F|µF|nF|J|kJ|W|kW|N|N·m|rad\/s|tr\/min|DT|dinars?|ans?|jours?|Bq|°C)?/gi);
  if (!matches) return [];
  return Array.from(new Set(matches.map((value) => value.trim()))).slice(0, 10);
}

type ExerciseBlock = { label: string; body: string };

function splitExercises(text: string): ExerciseBlock[] {
  const marker = /(?:^|\n)\s*((?:exercice|تمرين|activité|partie|problème|série|sujet)\s*[n°º]?\s*\d*[^\n]{0,70})/gi;
  const positions: { index: number; label: string }[] = [];
  let match: RegExpExecArray | null;
  while ((match = marker.exec(text))) {
    positions.push({ index: match.index, label: match[1].trim().slice(0, 80) });
  }

  if (positions.length === 0) {
    return [{ label: "Énoncé joint", body: text.trim() }];
  }

  const blocks: ExerciseBlock[] = [];
  positions.forEach((position, index) => {
    const next = positions[index + 1];
    const body = text.slice(position.index, next ? next.index : text.length).trim();
    if (body.length > 25) {
      blocks.push({ label: position.label.replace(/\s+/g, " "), body });
    }
  });

  return blocks.slice(0, 6);
}

function splitQuestions(body: string): string[] {
  const lines = body.split(/\n/).map((line) => line.trim()).filter(Boolean);
  const questions: string[] = [];
  for (const line of lines) {
    if (/^(?:\d{1,2}\s*[\).\-–]|[a-d]\s*[\).]|[ivx]{1,3}\s*[\).]|[-•])\s+/.test(line)) {
      questions.push(line.replace(/^(?:\d{1,2}\s*[\).\-–]|[a-d]\s*[\).]|[ivx]{1,3}\s*[\).]|[-•])\s+/, "").slice(0, 220));
    } else if (line.includes("?") && line.length > 25) {
      questions.push(line.slice(0, 220));
    }
  }
  return questions.slice(0, 8);
}

function matchLessons(text: string, lessons: Lesson[]): Lesson[] {
  const normalized = normalize(text);
  const textTokens = new Set(tokens(text));
  return lessons
    .map((lesson) => {
      let score = 0;
      const candidates = [...lesson.tags, ...tokens(lesson.title), ...tokens(lesson.chapter)];
      for (const candidate of candidates) {
        const normalizedCandidate = normalize(candidate);
        if (normalizedCandidate.length < 4) continue;
        if (normalized.includes(normalizedCandidate)) score += 3;
        else if (textTokens.has(normalizedCandidate)) score += 2;
      }
      return { lesson, score };
    })
    .filter((row) => row.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map((row) => row.lesson);
}

function matchExercises(text: string, library: Exercise[]): Exercise[] {
  const normalized = normalize(text);
  const textTokens = new Set(tokens(text));
  return library
    .map((exercise) => {
      let score = 0;
      for (const candidate of [...tokens(exercise.theme), ...tokens(exercise.title)]) {
        const value = normalize(candidate);
        if (value.length < 4) continue;
        if (normalized.includes(value)) score += 2;
        else if (textTokens.has(value)) score += 1;
      }
      return { exercise, score };
    })
    .filter((row) => row.score > 1)
    .sort((a, b) => b.score - a.score)
    .slice(0, 2)
    .map((row) => row.exercise);
}

export type AnalysisInput = {
  text: string;
  subjectSlug: string;
  subjectName: string;
  section: string;
  instruction: string;
  lessons: Lesson[];
  exercises: Exercise[];
  exams: Exam[];
  quizzes: { slug: string; title: string; questions: QuizQuestion[] }[];
  lessonHints?: { title: string; text: string }[];
};

export function analyzeSheet(input: AnalysisInput): CorrectionAnalysis {
  const text = input.text.trim();
  const warnings: string[] = [];

  if (text.length < 60) {
    warnings.push(
      "Le texte récupéré est très court. Ajoute l'énoncé complet (copié-collé) pour que le guide de correction soit exploitable.",
    );
  }

  const blocks = splitExercises(text);
  const matchedLessons = matchLessons(text, input.lessons);
  const matchedExercises = matchExercises(text, input.exercises);
  const numbers = extractNumbers(text);
  const subjectMethod = SUBJECT_METHODS[input.subjectSlug] ?? GENERIC_METHOD;

  const totalQuestions = blocks.reduce((sum, block) => sum + Math.max(splitQuestions(block.body).length, 1), 0);
  const hasArabic = /[\u0600-\u06ff]/.test(text);

  const exercises: CorrectionExercise[] = blocks.map((block, index) => {
    const questions = splitQuestions(block.body);
    const blockLessons = matchLessons(block.body, input.lessons);
    const lessonsForBlock = blockLessons.length > 0 ? blockLessons : matchedLessons;
    const notions =
      lessonsForBlock.length > 0
        ? lessonsForBlock.map((lesson) => lesson.title)
        : [input.subjectName];

    const methodSet = new Set<string>();
    for (const verb of QUESTION_VERBS) {
      if (verb.pattern.test(block.body)) methodSet.add(verb.method);
    }
    if (hasArabic) {
      for (const verb of ARABIC_VERBS) {
        if (verb.pattern.test(block.body)) methodSet.add(verb.method);
      }
    }
    for (const step of subjectMethod.slice(0, 2)) methodSet.add(step);
    if (methodSet.size === 0) methodSet.add(GENERIC_METHOD[Math.min(index, GENERIC_METHOD.length - 1)]);

    const rappels = lessonsForBlock.flatMap((lesson) =>
      lesson.keyPoints.slice(0, 2).map((point) => ({ title: lesson.title, text: point })),
    );
    const vigilance = Array.from(
      new Set([
        ...lessonsForBlock.flatMap((lesson) => lesson.pitfalls.slice(0, 1)),
        ...(hasArabic
          ? ["لا تنسَ الاستشهاد بالنص وتوظيف المصطلح المناسب في الإجابة."]
          : ["Ne laisse aucune question sans réponse : une piste de méthode rapporte des points."]),
      ]),
    ).slice(0, 4);

    const questionWeight = Math.max(questions.length, 1);
    const bareme = Math.max(
      3,
      Math.round((20 * questionWeight) / Math.max(totalQuestions, 1)),
    );

    return {
      label: block.label,
      excerpt: block.body.replace(/\s+/g, " ").slice(0, 240),
      questions: questions.length > 0 ? questions : [block.body.replace(/\s+/g, " ").slice(0, 160)],
      notions,
      methode: Array.from(methodSet).slice(0, 4),
      rappels: rappels.slice(0, 4),
      vigilance,
      bareme: Math.min(bareme, 20),
    };
  });

  const detectedNotions = Array.from(
    new Set([
      ...matchedLessons.map((lesson) => lesson.chapter),
      ...exercises.flatMap((exercise) => exercise.notions),
    ]),
  ).slice(0, 6);

  const relatedLessonSlugs = matchedLessons.map((lesson) => lesson.slug);
  const relatedExerciseSlugs = matchedExercises.map((exercise) => exercise.slug);
  const quiz = input.quizzes[0];

  const nextSteps = [
    relatedLessonSlugs[0]
      ? `Relis la fiche « ${matchedLessons[0].title} » et note les 3 points clés avant de reprendre l'exercice.`
      : `Commence par la fiche de cours de ${input.subjectName} pour identifier les notions utilisées.`,
    relatedExerciseSlugs[0]
      ? `Refais l'exercice corrigé « ${matchedExercises[0].title} » : il utilise la même méthode.`
      : "Refais un exercice corrigé de la même notion pour vérifier que la méthode est acquise.",
    quiz ? `Passe le quiz « ${quiz.title} » pour mesurer ta maîtrise, puis reviens au PDF.` : "Termine par un quiz de 5 questions sur la notion.",
    input.instruction.trim().length > 0
      ? `Consigne personnelle prise en compte : « ${input.instruction.trim().slice(0, 120)} ».`
      : "Ajoute une consigne (par exemple « explique la question 2 plus lentement ») pour adapter le guide.",
  ];

  const numbersSentence =
    numbers.length > 0 ? ` Données numériques repérées : ${numbers.join(", ")}.` : "";

  const summary = `Guide de correction pour ${input.subjectName}${
    input.section ? ` (${input.section})` : ""
  } : ${exercises.length} bloc(s) repéré(s), ${totalQuestions} question(s) identifiée(s).${numbersSentence} Le corrigé est organisé en méthode, rappels de cours et points de vigilance pour que tu puisses refaire chaque question seul.`;

  return {
    engine: "guide-pedagogique",
    summary,
    detectedNotions,
    exercises,
    nextSteps,
    relatedLessonSlugs,
    relatedExerciseSlugs,
    warnings,
  };
}

type AiExercise = Partial<CorrectionExercise>;
type AiPayload = {
  summary?: string;
  detectedNotions?: string[];
  exercises?: AiExercise[];
  nextSteps?: string[];
};

function sanitizeStringArray(value: unknown, fallback: string[]): string[] {
  if (!Array.isArray(value)) return fallback;
  const rows = value.filter((item): item is string => typeof item === "string" && item.trim().length > 0);
  return rows.length > 0 ? rows.slice(0, 6) : fallback;
}

export async function enhanceWithAi(
  input: AnalysisInput,
  base: CorrectionAnalysis,
): Promise<CorrectionAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || input.text.trim().length < 80) return base;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: AbortSignal.timeout(25000),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.3,
        response_format: { type: "json_object" },
        messages: [
          {
            role: "system",
            content:
              "Tu es un professeur de lycée tunisien. À partir d'un énoncé d'exercices, produis un corrigé guidé en français (sauf si l'énoncé est en arabe), pédagogique et progressif, sans inventer de données manquantes. Réponds uniquement en JSON.",
          },
          {
            role: "user",
            content: `Matière: ${input.subjectName}. Section: ${input.section}. Consigne de l'élève: ${
              input.instruction || "aucune"
            }.\nÉnoncé:\n${input.text.slice(0, 7000)}\n\nRéponds avec ce format JSON: {"summary": string, "detectedNotions": string[], "exercises": [{"label": string, "excerpt": string, "questions": string[], "notions": string[], "methode": string[], "rappels": [{"title": string, "text": string}], "vigilance": string[], "bareme": number}], "nextSteps": string[]}`,
          },
        ],
      }),
    });

    if (!response.ok) return base;
    const payload = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const content = payload.choices?.[0]?.message?.content;
    if (!content) return base;
    const parsed = JSON.parse(content) as AiPayload;
    if (!parsed.exercises || !Array.isArray(parsed.exercises) || parsed.exercises.length === 0) {
      return base;
    }

    const exercises: CorrectionExercise[] = parsed.exercises.slice(0, 8).map((item, index) => {
      const fallback = base.exercises[index] ?? base.exercises[0];
      const rappels = Array.isArray(item.rappels)
        ? item.rappels
            .filter((rappel): rappel is { title: string; text: string } =>
              Boolean(rappel && typeof rappel.title === "string" && typeof rappel.text === "string"),
            )
            .slice(0, 4)
        : fallback?.rappels ?? [];
      return {
        label: typeof item.label === "string" && item.label ? item.label : `Exercice ${index + 1}`,
        excerpt: typeof item.excerpt === "string" ? item.excerpt : fallback?.excerpt ?? "",
        questions: sanitizeStringArray(item.questions, fallback?.questions ?? []),
        notions: sanitizeStringArray(item.notions, fallback?.notions ?? [input.subjectName]),
        methode: sanitizeStringArray(item.methode, fallback?.methode ?? GENERIC_METHOD),
        rappels,
        vigilance: sanitizeStringArray(item.vigilance, fallback?.vigilance ?? []),
        bareme:
          typeof item.bareme === "number" && Number.isFinite(item.bareme)
            ? Math.round(item.bareme)
            : fallback?.bareme ?? 10,
      };
    });

    return {
      ...base,
      engine: "assistant-ia",
      summary: typeof parsed.summary === "string" && parsed.summary ? parsed.summary : base.summary,
      detectedNotions: sanitizeStringArray(parsed.detectedNotions, base.detectedNotions),
      exercises,
      nextSteps: sanitizeStringArray(parsed.nextSteps, base.nextSteps),
    };
  } catch {
    return base;
  }
}

export { SUBJECT_METHODS, GENERIC_METHOD };

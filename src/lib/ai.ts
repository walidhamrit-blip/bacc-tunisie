import { db } from "@/db";
import { aiConversations, aiMessages, students } from "@/db/schema";
import { and, desc, eq } from "drizzle-orm";
import { getStudent, listLessons } from "@/lib/data";
import type { Lesson } from "@/lib/data";
import type { LessonBlock } from "@/db/schema";

/* ============================================================
   Moteur pédagogique local (RAG sans appel réseau externe)
   ============================================================ */

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[àáâäæãåā]/g, "a")
    .replace(/[èéêëē]/g, "e")
    .replace(/[ìíîï]/g, "i")
    .replace(/[òóôöō]/g, "o")
    .replace(/[ùúûü]/g, "u")
    .replace(/[ç]/g, "c")
    .replace(/[^a-z0-9\s]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function tokenize(text: string): string[] {
  return normalize(text).split(/\s+/).filter(Boolean);
}

type IndexedLesson = Lesson & { text: string };

let lessonIndex: IndexedLesson[] | null = null;

async function buildLessonIndex(): Promise<IndexedLesson[]> {
  if (lessonIndex) return lessonIndex;
  const lessons = await listLessons();
  lessonIndex = lessons.map((lesson) => {
    const blocksText = lesson.blocks.map((block) => blockText(block)).join(" ");
    const text = [
      lesson.title,
      lesson.chapter,
      lesson.summary,
      lesson.objectives.join(" "),
      blocksText,
      lesson.keyPoints.join(" "),
      lesson.pitfalls.join(" "),
      lesson.flashcards.map((c) => c.question + " " + c.answer).join(" "),
      lesson.tags.join(" "),
    ].join(" ");
    return { ...lesson, text };
  });
  return lessonIndex;
}

function scoreLesson(lesson: IndexedLesson, queryTokens: string[]): number {
  const textTokens = tokenize(lesson.text);
  let score = 0;
  for (const token of queryTokens) {
    if (token.length < 3) continue;
    const count = textTokens.filter((t) => t === token).length;
    if (count > 0) score += count;
    // bonus si le mot apparaît dans le titre ou le chapitre
    if (tokenize(lesson.title + " " + lesson.chapter).includes(token)) score += 2;
  }
  return score;
}

export async function searchLessons(query: string, limit = 5): Promise<IndexedLesson[]> {
  const lessons = await buildLessonIndex();
  const queryTokens = tokenize(query);
  const scored = lessons
    .map((lesson) => ({ lesson, score: scoreLesson(lesson, queryTokens) }))
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.lesson);
  return scored;
}

function blockText(b: LessonBlock): string {
  switch (b.type) {
    case "table":
      return `Tableau «${b.title ?? ""}»: ${b.head.join(" / ")} ${b.rows.map((r: string[]) => r.join(" / ")).join("; ")}`;
    case "list":
    case "steps":
      return `${b.title ?? ""}: ${b.items.join("; ")}`;
    case "callout":
      return `[${b.tone}] ${b.title}: ${b.text}`;
    case "formula":
      return `${b.title ?? ""}: ${b.expression} ${b.note ?? ""}`;
    default:
      return `${(b as { title?: string; text: string }).title ?? ""}: ${(b as { text: string }).text}`;
  }
}

export function blockToText(blocks: LessonBlock[]): string[] {
  return blocks.map(blockText);
}

export function lessonContext(lesson: IndexedLesson): string {
  const parts = [
    `Matière: ${lesson.subjectSlug}`,
    `Fiche: ${lesson.title} (${lesson.chapter})`,
    `Résumé: ${lesson.summary}`,
    ...blockToText(lesson.blocks),
    `Notions clés: ${lesson.keyPoints.join("; ")}`,
    `Erreurs à éviter: ${lesson.pitfalls.join("; ")}`,
  ];
  return parts.filter(Boolean).join("\n");
}

/**
 * Génère une réponse pédagogique en français à partir des extraits récupérés.
 * Aucun appel réseau n'est effectué : c'est un moteur de restitution guidée par les cours du site.
 */
export async function generateAnswer(message: string): Promise<{
  answer: string;
  sources: { subjectSlug: string; title: string; chapter: string }[];
}> {
  const lessons = await searchLessons(message, 6);

  if (lessons.length === 0) {
    return {
      answer:
        "Je n'ai pas trouvé de fiche de cours qui corresponde à ta question sur ce site. Essaie de reformuler avec des mots-clés du programme (par exemple : « suites », « dérivée », « photosynthèse », « bilan comptable »), ou consulte directement les fiches de cours par matière.",
      sources: [],
    };
  }

  const contextParts = lessons.map((lesson) => lessonContext(lesson)).join("\n\n---\n\n");

  const answer = `Voici ce que je te propose, à partir des fiches de cours disponibles sur Bac Coach :

${contextParts}

--- 

Comment t'aider maintenant ? Dis-moi :
1. Quelle notion tu veux approfondir parmi celles ci-dessus ;
2. Quel exercice tu bloques (je peux te donner la méthode pas à pas) ;
3. Si tu veux un quiz rapide sur l'un de ces chapitres.

Les réponses sont basées sur les fiches pédagogiques du programme tunisien (terminale). Pour un sujet très précis ou un corrigé de copie, utilise l'outil « Corriger un PDF » depuis la page d'accueil.`;

  const sources = lessons.map((lesson) => ({
    subjectSlug: lesson.subjectSlug,
    title: lesson.title,
    chapter: lesson.chapter,
  }));

  return { answer, sources };
}

/* ============================================================
   Gestion des conversations (liée au compte étudiant)
   ============================================================ */

export async function getOrCreateStudent() {
  return getStudent();
}

export async function listConversations(studentId: number) {
  return db
    .select()
    .from(aiConversations)
    .where(eq(aiConversations.studentId, studentId))
    .orderBy(desc(aiConversations.updatedAt));
}

export async function createConversation(studentId: number, title: string) {
  const [row] = await db
    .insert(aiConversations)
    .values({ studentId, title })
    .returning();
  return row;
}

export async function getConversation(id: number, studentId: number) {
  const rows = await db
    .select()
    .from(aiConversations)
    .where(and(eq(aiConversations.id, id), eq(aiConversations.studentId, studentId)))
    .limit(1);
  return rows[0] ?? null;
}

export async function addMessage(conversationId: number, role: "user" | "assistant", content: string) {
  const [row] = await db
    .insert(aiMessages)
    .values({ conversationId, role, content })
    .returning();
  await db
    .update(aiConversations)
    .set({ updatedAt: new Date() })
    .where(eq(aiConversations.id, conversationId));
  return row;
}

export async function getMessages(conversationId: number) {
  return db
    .select()
    .from(aiMessages)
    .where(eq(aiMessages.conversationId, conversationId))
    .orderBy(aiMessages.createdAt);
}

export async function ensureConversation(studentId: number, conversationId: number | null) {
  if (conversationId) {
    const existing = await getConversation(conversationId, studentId);
    if (existing) return existing;
  }
  const [student] = await db.select().from(students).limit(1);
  const target = student ?? (await getOrCreateStudent());
  return createConversation(target.id, "Nouvelle conversation");
}

import { eq } from "drizzle-orm";
import { db } from "@/db";
import { corrections, exams, exercises, lessons, quizzes } from "@/db/schema";
import { analyzeSheet, enhanceWithAi, type AnalysisInput } from "@/lib/analysis";
import { getStudent, getSubject } from "@/lib/data";
import { extractPdfText } from "@/lib/pdf";
import { isSection, normalizeSection } from "@/lib/sections";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Vercel limite le corps des requêtes à ~4,5 Mo : on reste sous cette marge.
const MAX_FILE_SIZE = 4 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const subjectSlug = String(formData.get("subjectSlug") ?? "").trim();
    const section = normalizeSection(String(formData.get("section") ?? ""));
    const instruction = String(formData.get("instruction") ?? "").trim().slice(0, 400);
    const pastedText = String(formData.get("text") ?? "").trim();
    const fileEntry = formData.get("file");
    const file = fileEntry instanceof File && fileEntry.size > 0 ? fileEntry : null;

    const subject = await getSubject(subjectSlug);
    if (!subject) {
      return Response.json({ error: "Choisis une matière valide." }, { status: 400 });
    }
    if (file && file.size > MAX_FILE_SIZE) {
      return Response.json(
        { error: "Le PDF dépasse 4 Mo. Compresse-le ou colle l'énoncé dans la zone de texte." },
        { status: 413 },
      );
    }

    let extracted = "";
    let pageCount = 0;
    const warnings: string[] = [];
    let fileName: string | null = null;
    let fileSize = 0;

    if (file) {
      fileName = file.name.slice(0, 180);
      fileSize = file.size;
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);
      if (!buffer.subarray(0, 5).toString("latin1").includes("%PDF")) {
        return Response.json({ error: "Le fichier joint n'est pas un PDF valide." }, { status: 400 });
      }
      const extraction = extractPdfText(buffer);
      extracted = extraction.text;
      pageCount = extraction.pageCount;
      warnings.push(...extraction.warnings);
    }

    const sourceText = [extracted, pastedText].filter((part) => part.length > 0).join("\n\n").trim();

    if (sourceText.length < 30) {
      return Response.json(
        {
          error:
            "Aucun texte exploitable : le PDF est peut-être scanné. Colle l'énoncé dans la zone de texte puis relance.",
        },
        { status: 422 },
      );
    }

    const [lessonRows, exerciseRows, examRows, quizRows] = await Promise.all([
      db.select().from(lessons).where(eq(lessons.subjectSlug, subject.slug)),
      db.select().from(exercises).where(eq(exercises.subjectSlug, subject.slug)),
      db.select().from(exams).where(eq(exams.subjectSlug, subject.slug)),
      db
        .select({ slug: quizzes.slug, title: quizzes.title, questions: quizzes.questions })
        .from(quizzes)
        .where(eq(quizzes.subjectSlug, subject.slug)),
    ]);

    const input: AnalysisInput = {
      text: sourceText,
      subjectSlug: subject.slug,
      subjectName: subject.name,
      section: isSection(section) ? section : "",
      instruction,
      lessons: lessonRows,
      exercises: exerciseRows,
      exams: examRows,
      quizzes: quizRows,
    };

    const base = analyzeSheet(input);
    const analysis = await enhanceWithAi(input, base);
    analysis.warnings = [...warnings, ...analysis.warnings];

    const student = await getStudent();
    const [saved] = await db
      .insert(corrections)
      .values({
        studentId: student.id,
        subjectSlug: subject.slug,
        section,
        fileName,
        fileSize,
        pageCount,
        sourceText: sourceText.slice(0, 30000),
        instruction,
        status: "analysé",
        analysis,
      })
      .returning({ id: corrections.id });

    return Response.json({ id: saved.id });
  } catch (error) {
    console.error("correction error", error);
    return Response.json(
      { error: "Une erreur est survenue pendant l'analyse. Réessaie en collant l'énoncé." },
      { status: 500 },
    );
  }
}

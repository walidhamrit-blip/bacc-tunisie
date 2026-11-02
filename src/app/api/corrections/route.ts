import { supabase as sb } from "@/db";
import { corrections, exams, exercises, lessons, quizzes } from "@/db/schema";
import { analyzeSheet, enhanceWithAi, type AnalysisInput } from "@/lib/analysis";
import { getStudent, getSubject } from "@/lib/data";
import { extractPdfText } from "@/lib/pdf";
import { isSection, normalizeSection } from "@/lib/sections";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILE_SIZE = 12 * 1024 * 1024;

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
      return Response.json({ error: "Le PDF dépasse 12 Mo." }, { status: 413 });
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

    const lessonRes = await sb.from("lessons").select("*").eq("subject_slug", subject.slug);
    const exerciseRes = await sb.from("exercises").select("*").eq("subject_slug", subject.slug);
    const examRes = await sb.from("exams").select("*").eq("subject_slug", subject.slug);
    const quizRes = await sb.from("quizzes").select("slug, title, questions").eq("subject_slug", subject.slug);
    const lessonRows = lessonRes.data ?? [];
    const exerciseRows = exerciseRes.data ?? [];
    const examRows = examRes.data ?? [];
    const quizRows = quizRes.data ?? [];

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
    const { data: saved } = await sb
      .from("corrections")
      .insert({
        student_id: student.id,
        subject_slug: subject.slug,
        section,
        file_name: fileName,
        file_size: fileSize,
        page_count: pageCount,
        source_text: sourceText.slice(0, 30000),
        instruction,
        status: "analysé",
        analysis,
      })
      .select("id");

    return Response.json({ id: saved?.[0]?.id });
  } catch (error) {
    console.error("correction error", error);
    return Response.json(
      { error: "Une erreur est survenue pendant l'analyse. Réessaie en collant l'énoncé." },
      { status: 500 },
    );
  }
}

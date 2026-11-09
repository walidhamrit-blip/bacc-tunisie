import Link from "next/link";
import {
  ErrorNotebookClient,
  type AllowedSubjectOption,
  type SerializedErrorCard,
} from "@/components/error-notebook-client";
import { PageHeader, PageShell } from "@/components/ui";
import { getStudent, listErrorCards, listSubjects } from "@/lib/data";
import { normalizeSection } from "@/lib/sections";
import { isLockedStudent } from "@/lib/student-session";

export const dynamic = "force-dynamic";

export default async function CarnetErreursPage() {
  const student = await getStudent();
  const locked = isLockedStudent(student);
  const activeSection = normalizeSection(student.section);

  const [rawCards, sectionSubjects] = await Promise.all([
    listErrorCards(),
    listSubjects(activeSection),
  ]);

  const subjectBySlug = new Map(sectionSubjects.map((sub) => [sub.slug, sub]));

  const allowedSubjects: AllowedSubjectOption[] = sectionSubjects.map((sub) => ({
    slug: sub.slug,
    name: sub.name,
    icon: sub.icon,
  }));

  const serializedCards: SerializedErrorCard[] = rawCards.map((card) => {
    const sub = subjectBySlug.get(card.subjectSlug);
    return {
      id: card.id,
      subjectSlug: card.subjectSlug,
      subjectName: sub?.name ?? card.subjectSlug,
      subjectIcon: sub?.icon ?? "📘",
      subjectAccent: sub?.accent ?? "#c8102e",
      sourceType: card.sourceType,
      sourceSlug: card.sourceSlug,
      sourceTitle: card.sourceTitle,
      prompt: card.prompt,
      wrongAnswer: card.wrongAnswer,
      correctAnswer: card.correctAnswer,
      explanation: card.explanation,
      errorCategory: card.errorCategory,
      boxLevel: card.boxLevel,
      easeFactorPermille: card.easeFactorPermille,
      intervalDays: card.intervalDays,
      repetitions: card.repetitions,
      lapsesCount: card.lapsesCount,
      mastered: card.mastered,
      nextReviewAtIso: card.nextReviewAt.toISOString(),
    };
  });

  return (
    <PageShell>
      <PageHeader
        eyebrow="Mémorisation"
        title="Carnet d'erreurs"
        description={
          <p>Transforme tes erreurs en cartes de révision, reprogrammées au bon moment pour ne pas les oublier.</p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/quiz" className="btn btn-ghost btn-sm">
              Quiz interactifs
            </Link>
            <Link href="/evaluation" className="btn btn-ghost btn-sm">
              Mon niveau
            </Link>
            <Link href="/mon-compte" className="btn btn-ghost btn-sm">
              {locked ? `🔒 ${activeSection}` : "🔒 Mon compte (1 section)"}
            </Link>
          </div>
        }
      />

      <ErrorNotebookClient
        initialCards={serializedCards}
        allowedSubjects={allowedSubjects}
        studentName={student.name}
        activeSection={activeSection}
        isLocked={locked}
        serverNowIso={new Date().toISOString()}
      />
    </PageShell>
  );
}

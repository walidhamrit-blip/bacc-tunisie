import Link from "next/link";
import {
  BacBlancSimulator,
  type BacBlancQuestion,
  type BacBlancSubjectOption,
} from "@/components/bac-blanc-simulator";
import { EmptyState, PageHeader, PageShell } from "@/components/ui";
import { getDashboard, listQuizzes, listSubjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function BacBlancPage() {
  const [subjects, quizzes, dashboard] = await Promise.all([
    listSubjects(),
    listQuizzes(),
    getDashboard(),
  ]);

  const subjectBySlug = new Map(subjects.map((subject) => [subject.slug, subject]));

  const simulatorQuestions: BacBlancQuestion[] = quizzes.flatMap((quiz) => {
    const subject = subjectBySlug.get(quiz.subjectSlug);
    return quiz.questions.map((question, qIndex) => ({
      id: `${quiz.slug}-${qIndex}`,
      quizSlug: quiz.slug,
      quizTitle: quiz.title,
      subjectSlug: quiz.subjectSlug,
      subjectName: subject?.name ?? quiz.subjectSlug,
      subjectShortName: subject?.shortName ?? quiz.subjectSlug,
      prompt: question.prompt,
      choices: question.choices,
      answerIndex: question.answerIndex,
      explanation: question.explanation,
    }));
  });

  const subjectOptions: BacBlancSubjectOption[] = subjects.map((subject) => ({
    slug: subject.slug,
    name: subject.name,
    shortName: subject.shortName,
    sections: subject.sections,
  }));

  return (
    <PageShell>
      <PageHeader
        eyebrow="Simulateur d'examen · Mode chronométré"
        title="Bac Blanc chronométré"
        description={
          <p>
            Passe une série de questions en conditions réelles d&apos;examen : compte à rebours actif, navigation libre
            entre les questions, aucun corrigé dévoilé pendant l&apos;épreuve et bilan complet noté sur 20 à la fin du
            chrono.
          </p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/examens" className="btn btn-ghost btn-sm">
              Sujets d&apos;annales
            </Link>
            <Link href="/quiz" className="btn btn-ghost btn-sm">
              Quiz classiques
            </Link>
          </div>
        }
      />

      {simulatorQuestions.length === 0 ? (
        <EmptyState
          title="Aucune question disponible pour le moment"
          text="Les questions du simulateur Bac Blanc seront chargées dès que la banque de quiz est prête."
          action={{ href: "/cours", label: "Voir les fiches de cours" }}
        />
      ) : (
        <BacBlancSimulator
          questions={simulatorQuestions}
          subjects={subjectOptions}
          defaultSection={dashboard.student.section}
        />
      )}
    </PageShell>
  );
}

import Link from "next/link";
import {
  StudentAccountPanel,
  type SectionSubjectPreview,
} from "@/components/student-account-panel";
import { PageHeader, PageShell } from "@/components/ui";
import { PROGRAM } from "@/db/content/program";
import { getStudentSessionInfo } from "@/lib/data";
import { SECTIONS } from "@/lib/sections";

export const dynamic = "force-dynamic";

export default async function MonComptePage() {
  const { student, sessionStatus } = await getStudentSessionInfo();

  const sectionPreviews: SectionSubjectPreview[] = SECTIONS.map((section) => {
    const entry = PROGRAM.find((item) => item.section === section);
    const subjectsList = entry?.subjects ?? [];
    return {
      section,
      subjectCount: subjectsList.length,
      topSubjects: subjectsList
        .slice(0, 3)
        .map((sub) => `${sub.name} (${sub.coefficient})`),
    };
  });

  return (
    <PageShell>
      <PageHeader
        eyebrow="Espace élève individuel · Anti-partage de compte"
        title={
          !student.isDemo && student.sectionLocked
            ? "Mon abonnement & mon Code Élève"
            : "Inscription personnelle (1 seule section)"
        }
        description={
          <p>
            Chaque inscription sur <strong className="text-[var(--ink)]">Bac Coach Tunisie</strong>{" "}
            est strictement individuelle : elle débloque l&apos;intégralité des cours, flashcards,
            simulateurs Bac Blanc et corrigés PDF pour{" "}
            <strong className="text-[var(--ink)]">une seule section officielle</strong> et jusqu&apos;à
            2 appareils personnels.
          </p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/evaluation" className="btn btn-ghost btn-sm">
              Mon niveau
            </Link>
            <Link href="/cours" className="btn btn-ghost btn-sm">
              Cours
            </Link>
          </div>
        }
      />

      <StudentAccountPanel
        student={{
          id: student.id,
          name: student.name,
          email: student.email ?? "",
          lycee: student.lycee ?? "",
          section: student.section,
          sectionLocked: student.sectionLocked ?? false,
          syncCode: student.syncCode ?? null,
          deviceCount: (student.deviceTokens ?? []).length,
          isDemo: student.isDemo,
          xpPoints: student.xpPoints ?? 0,
          streakDays: student.streakDays ?? 0,
        }}
        sessionStatus={sessionStatus}
        sectionPreviews={sectionPreviews}
      />
    </PageShell>
  );
}

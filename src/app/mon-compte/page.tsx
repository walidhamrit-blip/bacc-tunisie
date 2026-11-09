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
        eyebrow="Mon compte"
        title={
          !student.isDemo && student.sectionLocked
            ? "Mon compte et mon Code Élève"
            : "Créer mon compte"
        }
        description={
          <p>Un compte individuel, lié à une seule section officielle et utilisable sur 2 appareils.</p>
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

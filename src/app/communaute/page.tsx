import { cookies } from "next/headers";
import Link from "next/link";
import {
  CommunitySheetsBoard,
  type CommunitySubjectInfo,
} from "@/components/community-sheets-board";
import { PageHeader, PageShell } from "@/components/ui";
import { getCommunitySpaceData, getStudent, listSubjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function CommunautePage() {
  const [student, subjects, cookieStore] = await Promise.all([
    getStudent(),
    listSubjects(),
    cookies(),
  ]);

  const voterKey = cookieStore.get("bac_voter")?.value ?? `student-${student.id}`;
  const communityData = await getCommunitySpaceData(voterKey);

  const subjectInfos: CommunitySubjectInfo[] = subjects.map((subject) => ({
    slug: subject.slug,
    name: subject.name,
    shortName: subject.shortName,
    accent: subject.accent,
  }));

  return (
    <PageShell>
      <PageHeader
        eyebrow="Communauté"
        title="Fiches de la communauté"
        description={
          <p>Consulte les fiches partagées par d&apos;autres élèves et publie les tiennes.</p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/cours" className="btn btn-ghost btn-sm">
              Cours officiels
            </Link>
            <Link href="/flashcards" className="btn btn-ghost btn-sm">
              Flashcards
            </Link>
          </div>
        }
      />

      <CommunitySheetsBoard
        approvedSheets={communityData.approvedSheets}
        pendingSheets={communityData.pendingSheets}
        likedSheetIds={communityData.likedSheetIds}
        subjects={subjectInfos}
        defaultAuthorName={student.name}
        defaultSection={student.section}
      />
    </PageShell>
  );
}

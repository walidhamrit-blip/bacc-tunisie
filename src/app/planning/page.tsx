import Link from "next/link";
import { PageHeader, PageShell } from "@/components/ui";
import { WeeklyPlannerClient } from "@/components/weekly-planner-client";
import { getOrCreateStudyPlan, getStudent } from "@/lib/data";
import { normalizeSection } from "@/lib/sections";
import { isLockedStudent } from "@/lib/student-session";

export const dynamic = "force-dynamic";

export default async function PlanningPage() {
  const [student, plan] = await Promise.all([
    getStudent(),
    getOrCreateStudyPlan(),
  ]);

  const locked = isLockedStudent(student);
  const activeSection = normalizeSection(plan.section || student.section);

  return (
    <PageShell>
      <PageHeader
        eyebrow="Planification adaptative · Coefficients officiels × Niveau × SRS"
        title="Planning Hebdomadaire Intelligent"
        description={
          <p>
            Ton emploi du temps sur <strong className="text-[var(--ink)]">7 jours</strong> est
            généré sur mesure pour ta section en croisant les{" "}
            <strong className="text-[var(--ink)]">coefficients officiels du Bac</strong>, tes
            matières les plus fragiles et tes cartes à réviser dans le{" "}
            <strong className="text-[var(--ink)]">Carnet d&apos;Erreurs SRS</strong>.
          </p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/organisation" className="btn btn-ghost btn-sm">
              ⏱ Minuteur Pomodoro
            </Link>
            <Link href="/carnet-erreurs" className="btn btn-ghost btn-sm">
              🧠 Carnet SRS
            </Link>
            <Link href="/mon-compte" className="btn btn-ghost btn-sm">
              {locked ? `🔒 ${activeSection}` : "🔒 Mon compte (1 section)"}
            </Link>
          </div>
        }
      />

      <WeeklyPlannerClient
        studentName={student.name}
        activeSection={activeSection}
        isLocked={locked}
        weekLabel={plan.weekLabel}
        initialWeekdayMinutes={plan.dailyMinutesWeekday}
        initialWeekendMinutes={plan.dailyMinutesWeekend}
        initialRhythm={plan.preferredRhythm}
        initialSlots={plan.slots}
        planUpdatedAtIso={plan.updatedAt.toISOString()}
      />
    </PageShell>
  );
}

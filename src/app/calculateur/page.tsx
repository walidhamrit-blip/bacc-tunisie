import Link from "next/link";
import {
  BacCalculatorClient,
  type SavedSimulationSummary,
} from "@/components/bac-calculator-client";
import { PageHeader, PageShell } from "@/components/ui";
import { getDashboard, listBacSimulations } from "@/lib/data";
import { normalizeSection } from "@/lib/sections";
import { isLockedStudent } from "@/lib/student-session";

export const dynamic = "force-dynamic";

export default async function CalculateurPage({
  searchParams,
}: {
  searchParams: Promise<{ section?: string }>;
}) {
  const params = await searchParams;
  const [dashboard, rawSimulations] = await Promise.all([
    getDashboard(),
    listBacSimulations(),
  ]);
  const student = dashboard.student;

  const locked = isLockedStudent(student);
  const activeSection = locked
    ? normalizeSection(student.section)
    : normalizeSection(params.section ?? student.section);

  const projectionsBySlug: Record<string, number> = {};
  for (const proj of dashboard.mentionPrediction.subjectProjections) {
    projectionsBySlug[proj.subjectSlug] = proj.estimatedNote20;
  }

  const savedSimulations: SavedSimulationSummary[] = rawSimulations.map((sim) => ({
    id: sim.id,
    label: sim.label,
    section: sim.section,
    notes: sim.notes ?? {},
    optionEnabled: sim.optionEnabled,
    optionName: sim.optionName,
    optionNote20: (sim.optionNoteHundredths ?? 1200) / 100,
    sportDispense: sim.sportDispense,
    mg20: (sim.mgHundredths ?? 0) / 100,
    fgScore: (sim.fgHundredths ?? 0) / 100,
    mentionLabel: sim.mentionLabel,
    createdAtIso: sim.createdAt.toISOString(),
  }));

  return (
    <PageShell>
      <PageHeader
        eyebrow="Mes outils"
        title="Calculateur de moyenne & score FG"
        description={
          <p>Calcule ta moyenne du bac et ton score de la Formule Globale (FG) selon les règles officielles.</p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/evaluation" className="btn btn-ghost btn-sm">
              Mon niveau &amp; Mention
            </Link>
            <Link href="/mon-compte" className="btn btn-ghost btn-sm">
              {locked ? `🔒 ${activeSection}` : "🔒 Mon compte (1 section)"}
            </Link>
          </div>
        }
      />

      <BacCalculatorClient
        initialSection={activeSection}
        isLocked={locked}
        studentName={student.name}
        projectionsBySlug={projectionsBySlug}
        savedSimulations={savedSimulations}
      />
    </PageShell>
  );
}

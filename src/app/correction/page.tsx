import Link from "next/link";
import { CorrectionForm } from "@/components/correction-form";
import { PageHeader, PageShell, Callout } from "@/components/ui";
import { getDashboard, listCorrections, listSubjects } from "@/lib/data";
import { SECTIONS } from "@/lib/sections";
import { isLockedStudent } from "@/lib/student-session";

export const dynamic = "force-dynamic";

export default async function CorrectionPage({
  searchParams,
}: {
  searchParams: Promise<{ matiere?: string }>;
}) {
  const params = await searchParams;
  const [subjects, dashboard, corrections] = await Promise.all([
    listSubjects(),
    getDashboard(),
    listCorrections(),
  ]);

  const locked = isLockedStudent(dashboard.student);
  const allowedSections: readonly string[] = locked
    ? [dashboard.student.section]
    : SECTIONS;

  return (
    <PageShell>
      <PageHeader
        eyebrow="Correction assistée"
        title="Corriger un PDF d'exercices"
        description={
          <p>Dépose un PDF d&apos;exercices : repérage des questions, méthode, rappels de cours et pièges à éviter.</p>
        }
        actions={
          <>
            <Link href="/exercices" className="btn btn-ghost btn-sm">
              Exercices déjà corrigés
            </Link>
            <Link href="/evaluation" className="btn btn-ghost btn-sm">
              Mon niveau
            </Link>
          </>
        }
      />

      <div className="grid gap-5 lg:grid-cols-[1.35fr_0.65fr]">
        <CorrectionForm
          subjects={subjects.map((subject) => ({ slug: subject.slug, name: subject.name }))}
          sections={allowedSections}
          defaultSection={dashboard.student.section}
          defaultSubject={params.matiere}
        />

        <aside className="space-y-4">
          <section className="card p-5">
            <p className="eyebrow">Comment ça marche</p>
            <ol className="mt-2.5 space-y-3">
              {[
                ["1. Tu joins le PDF", "Feuille d'exercices, devoir de maison, sujet d'entraînement (4 Mo max)."],
                ["2. Lecture du document", "Le texte est extrait automatiquement (hors ligne, sans envoi à un tiers)."],
                ["3. Repérage pédagogique", "Exercices, questions, notions du cours et verbes de consigne sont identifiés."],
                ["4. Guide de correction", "Méthode par question, rappels de cours, pièges et prochaines étapes."],
              ].map(([title, text]) => (
                <li key={title}>
                  <p className="text-sm font-semibold text-[var(--ink)]">{title}</p>
                  <p className="text-xs leading-relaxed text-[var(--ink-soft)]">{text}</p>
                </li>
              ))}
            </ol>
          </section>

          <Callout tone="warn" title="Un corrigé guidé, pas une note officielle">
            Ce guide t&apos;explique la méthode et les notions. Il ne remplace pas la correction de ton professeur et ne
            garantit pas le barème exact. Vérifie toujours la rédaction avec ton enseignant.
          </Callout>

          <section className="card border-[var(--line)] bg-[var(--surface-subtle)] p-5">
            <p className="eyebrow">Astuce pour un meilleur résultat</p>
            <p className="mt-1.5 text-sm text-[var(--ink-soft)]">
              Si le PDF est une photo scannée, le texte n&apos;est pas lisible : copie-colle l&apos;énoncé dans la zone
              de texte. Tu peux aussi préciser la question qui te bloque pour obtenir une explication ciblée.
            </p>
          </section>
        </aside>
      </div>

      {corrections.length > 0 ? (
        <section className="card mt-6 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="eyebrow">Historique</p>
              <h2 className="display text-lg font-semibold text-[var(--ink)]">Mes corrections récentes</h2>
            </div>
            <span className="badge badge-slate">{corrections.length}</span>
          </div>
          <ul className="mt-3 grid gap-2 sm:grid-cols-2">
            {corrections.map((correction) => (
              <li key={correction.id}>
                <Link
                  href={`/correction/${correction.id}`}
                  className="flex items-center justify-between gap-3 rounded-xl border border-[var(--line)] p-3 transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-hover)]"
                >
                  <span className="min-w-0">
                    <span className="block truncate text-sm font-semibold text-[var(--ink)]">
                      {correction.fileName ?? "Énoncé collé"}
                    </span>
                    <span className="block text-xs text-[var(--ink-soft)]">
                      {correction.analysis?.exercises.length ?? 0} exercice(s) · {correction.status}
                    </span>
                  </span>
                  <span className="badge badge-blue">
                    {new Date(correction.createdAt).toLocaleDateString("fr-FR", { day: "2-digit", month: "short" })}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </PageShell>
  );
}

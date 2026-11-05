import Link from "next/link";
import { OrganisationTools, type OrganisationSubjectOption } from "@/components/organisation-tools";
import { PageHeader, PageShell } from "@/components/ui";
import { getDashboard, listSubjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export default async function OrganisationPage() {
  const [subjects, dashboard] = await Promise.all([listSubjects(), getDashboard()]);

  const sectionSubjects = subjects.filter(
    (subject) => subject.sections.length === 0 || subject.sections.includes(dashboard.student.section),
  );
  const subjectOptions: OrganisationSubjectOption[] = (
    sectionSubjects.length > 0 ? sectionSubjects : subjects
  ).map((subject) => ({
    slug: subject.slug,
    name: subject.name,
    shortName: subject.shortName,
  }));

  return (
    <PageShell>
      <PageHeader
        eyebrow="Organisation & régularité · Méthode Pomodoro & Calendrier"
        title="Rythme tes révisions jusqu'au jour J"
        description={
          <p>
            Alterne <strong className="text-[var(--ink)]">25 minutes de concentration</strong> et{" "}
            <strong className="text-[var(--ink)]">5 minutes de pause</strong> avec alerte sonore automatique, tout en
            gardant sous les yeux le <strong className="text-[var(--ink)]">compte à rebours J-J</strong> avant le coup
            d&apos;envoi des épreuves nationales du Baccalauréat.
          </p>
        }
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <Link href="/planning" className="btn btn-primary btn-sm">
              📅 Mon Planning 7 jours →
            </Link>
            <Link href="/flashcards" className="btn btn-ghost btn-sm">
              Flashcards (5 min)
            </Link>
            <Link href="/bac-blanc" className="btn btn-ghost btn-sm">
              Bac Blanc chronométré
            </Link>
          </div>
        }
      />

      <OrganisationTools
        subjects={subjectOptions}
        studentSection={dashboard.student.section}
      />

      <section className="mt-8 grid gap-4 md:grid-cols-3">
        <div className="card p-5">
          <span className="badge badge-brand">Bloc 1 · 25 min</span>
          <h2 className="display mt-3 text-lg font-semibold text-[var(--ink)]">
            Comprendre &amp; ficher
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Consacre ton premier Pomodoro à relire une fiche de cours avec une feuille blanche à côté pour noter les
            formules et théorèmes clés sans regarder l&apos;écran.
          </p>
          <Link href="/cours" className="mt-3 inline-block text-xs font-semibold text-[var(--brand)]">
            Ouvrir les fiches de cours →
          </Link>
        </div>

        <div className="card p-5">
          <span className="badge badge-green">Bloc 2 · 25 min</span>
          <h2 className="display mt-3 text-lg font-semibold text-[var(--ink)]">
            Résoudre sans le corrigé
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Après tes 5 minutes de pause, attaque un exercice type Bac sur papier avant de déplier les étapes de
            correction : c&apos;est l&apos;effort de recherche qui fixe la méthode.
          </p>
          <Link href="/exercices" className="mt-3 inline-block text-xs font-semibold text-[var(--brand)]">
            Aller aux exercices corrigés →
          </Link>
        </div>

        <div className="card p-5">
          <span className="badge badge-blue">Bloc 3 · 25 min</span>
          <h2 className="display mt-3 text-lg font-semibold text-[var(--ink)]">
            Vérifier la mémorisation
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-[var(--ink-soft)]">
            Termine ta séance du soir par une série de Flashcards, ton Carnet SRS ou un mini Bac Blanc chronométré pour valider tes acquis.
          </p>
          <Link href="/carnet-erreurs" className="mt-3 inline-block text-xs font-semibold text-[var(--brand)]">
            Réviser mon Carnet SRS →
          </Link>
        </div>
      </section>
    </PageShell>
  );
}

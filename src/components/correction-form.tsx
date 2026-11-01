"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

type SubjectOption = { slug: string; name: string };

export function CorrectionForm({
  subjects,
  sections,
  defaultSection,
  defaultSubject,
}: {
  subjects: SubjectOption[];
  sections: readonly string[];
  defaultSection: string;
  defaultSubject?: string;
}) {
  const router = useRouter();
  const [subjectSlug, setSubjectSlug] = useState(defaultSubject ?? subjects[0]?.slug ?? "mathematiques");
  const [section, setSection] = useState(defaultSection);
  const [text, setText] = useState("");
  const [instruction, setInstruction] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!file && text.trim().length < 30) {
      setError("Joins un PDF ou colle l'énoncé (au moins 30 caractères).");
      return;
    }
    if (file && file.size > 12 * 1024 * 1024) {
      setError("Le fichier dépasse 12 Mo. Réduis sa taille ou colle le texte.");
      return;
    }

    const formData = new FormData();
    formData.set("subjectSlug", subjectSlug);
    formData.set("section", section);
    formData.set("instruction", instruction);
    formData.set("text", text);
    if (file) formData.set("file", file);

    setLoading(true);
    try {
      const response = await fetch("/api/corrections", { method: "POST", body: formData });
      const payload = (await response.json()) as { id?: number; error?: string };
      if (!response.ok || !payload.id) {
        setError(payload.error ?? "La correction a échoué. Réessaie dans un instant.");
        return;
      }
      router.push(`/correction/${payload.id}`);
      router.refresh();
    } catch {
      setError("Impossible de joindre le serveur. Vérifie ta connexion.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="card p-5 sm:p-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-[var(--ink)]">Matière</span>
          <select className="select" value={subjectSlug} onChange={(event) => setSubjectSlug(event.target.value)}>
            {subjects.map((subject) => (
              <option key={subject.slug} value={subject.slug}>
                {subject.name}
              </option>
            ))}
          </select>
        </label>
        <label className="block text-sm">
          <span className="mb-1.5 block font-semibold text-[var(--ink)]">Ta section</span>
          <select className="select" value={section} onChange={(event) => setSection(event.target.value)}>
            {sections.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </label>
      </div>

      <label className="mt-4 block text-sm">
        <span className="mb-1.5 block font-semibold text-[var(--ink)]">PDF de l&apos;exercice</span>
        <span className="flex cursor-pointer flex-col items-center justify-center gap-1 rounded-2xl border border-dashed border-[#cbbda4] bg-[#fdfbf6] px-4 py-7 text-center transition hover:border-[var(--brand)]">
          <svg viewBox="0 0 24 24" width="26" height="26" fill="none" aria-hidden>
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8l-5-5Z" stroke="var(--brand)" strokeWidth="1.7" strokeLinejoin="round" />
            <path d="M14 3v5h5M9 13h6M9 17h4" stroke="var(--brand)" strokeWidth="1.7" strokeLinecap="round" />
          </svg>
          <span className="text-sm font-semibold text-[var(--ink)]">
            {file ? file.name : "Déposer un PDF (12 Mo max)"}
          </span>
          <span className="text-xs text-[var(--ink-soft)]">
            Le texte du PDF est lu automatiquement. Si le document est scanné, colle l&apos;énoncé ci-dessous.
          </span>
          <input
            type="file"
            name="file"
            accept="application/pdf,.pdf"
            className="sr-only"
            onChange={(event) => setFile(event.target.files?.[0] ?? null)}
          />
        </span>
      </label>

      <label className="mt-4 block text-sm">
        <span className="mb-1.5 block font-semibold text-[var(--ink)]">
          Énoncé collé (recommandé pour une correction détaillée)
        </span>
        <textarea
          className="textarea"
          value={text}
          onChange={(event) => setText(event.target.value)}
          placeholder={"Exemple :\nExercice 1 : Soit la suite U(n) définie par U0 = 2 et U(n+1) = 3U(n) - 4...\n1) Calculer U1 et U2.\n2) Montrer que V(n) = U(n) - 2 est géométrique."}
        />
      </label>

      <label className="mt-4 block text-sm">
        <span className="mb-1.5 block font-semibold text-[var(--ink)]">Ce que tu veux comprendre (optionnel)</span>
        <input
          className="input"
          value={instruction}
          onChange={(event) => setInstruction(event.target.value)}
          placeholder="Ex. : je bloque sur la question 2, explique la méthode lentement"
        />
      </label>

      {error ? (
        <p className="mt-4 rounded-xl border border-[#f0c9ce] bg-[#fff5f6] px-3 py-2 text-sm text-[var(--brand-dark)]">
          {error}
        </p>
      ) : null}

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="max-w-xs text-xs text-[var(--ink-soft)]">
          Le PDF n&apos;est pas conservé : seul le texte extrait et le guide de correction sont enregistrés.
        </p>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              Analyse en cours…
            </>
          ) : (
            <>
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden>
                <path d="m5 13 4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              Corriger et m&apos;expliquer
            </>
          )}
        </button>
      </div>
    </form>
  );
}

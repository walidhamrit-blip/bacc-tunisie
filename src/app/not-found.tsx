import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <span className="badge badge-brand">Erreur 404</span>
      <h1 className="display mt-4 text-4xl font-semibold text-[var(--ink)]">
        Cette page n&apos;existe pas (encore).
      </h1>
      <p className="mt-3 max-w-lg text-sm text-[var(--ink-soft)]">
        Le contenu que tu cherches a peut-être été déplacé. Reviens aux matières pour retrouver les fiches, exercices
        corrigés, séries et quiz de ton programme.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        <Link href="/matieres" className="btn btn-primary">
          Toutes les matières
        </Link>
        <Link href="/correction" className="btn btn-ghost">
          Corriger un PDF
        </Link>
      </div>
    </div>
  );
}

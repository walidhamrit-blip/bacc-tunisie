"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="fr">
      <body style={{ fontFamily: "system-ui, sans-serif", background: "#fbf7ef", color: "#15201c" }}>
        <div style={{ maxWidth: 520, margin: "15vh auto", padding: 32, background: "#fff", border: "1px solid #e7dfd1", borderRadius: 16 }}>
          <h1 style={{ fontSize: 22, marginBottom: 12 }}>Une erreur est survenue</h1>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "#47534d" }}>
            L&apos;application n&apos;a pas pu charger ses données. Vérifie la variable{" "}
            <code>DATABASE_URL</code> du déploiement, puis réessaie.
          </p>
          {error.digest ? (
            <p style={{ fontSize: 12, color: "#47534d", marginTop: 12 }}>Référence : {error.digest}</p>
          ) : null}
          <button
            type="button"
            onClick={reset}
            style={{ marginTop: 20, padding: "8px 16px", borderRadius: 8, border: "none", background: "#15201c", color: "#fff", cursor: "pointer" }}
          >
            Réessayer
          </button>
        </div>
      </body>
    </html>
  );
}

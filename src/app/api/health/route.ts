import { sql } from "drizzle-orm";
import { db } from "@/db";
import { ensureSchema, ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Diagnostic de déploiement (Vercel + Neon).
 * - 200 `{ ok: true }` : base joignable et schéma prêt.
 * - 500 `{ ok: false, reason, hint }` : configuration manquante ou base injoignable.
 */
export async function GET() {
  const env = {
    DATABASE_URL: Boolean(process.env.DATABASE_URL),
    POSTGRES_URL: Boolean(process.env.POSTGRES_URL),
    OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY),
    node: process.version,
  };

  if (!env.DATABASE_URL && !env.POSTGRES_URL) {
    return Response.json(
      {
        ok: false,
        step: "env",
        reason: "DATABASE_URL (ou POSTGRES_URL) n'est pas définie sur ce déploiement.",
        hint:
          "Vercel > ton projet > Settings > Environment Variables : ajoute DATABASE_URL = chaîne Neon « pooled » (...-pooler...?sslmode=require), coche Production/Preview/Development, puis Redeploy.",
        env,
      },
      { status: 500 },
    );
  }

  try {
    await db.execute(sql`select 1`);
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        ok: false,
        step: "connection",
        reason: `Connexion à Postgres impossible : ${message}`,
        hint:
          "Vérifie que l'URL Neon est bien l'endpoint « pooled » et qu'elle contient sslmode=require. Sur Neon, une base suspendue se réveille en quelques secondes : réessaie.",
        env,
      },
      { status: 500 },
    );
  }

  try {
    await ensureSchema();
    await ensureSeeded();
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      {
        ok: false,
        step: "schema",
        reason: `Création du schéma / du contenu échouée : ${message}`,
        hint: "Lance `npm run db:push` en local avec la même DATABASE_URL, puis recharge cette page.",
        env,
      },
      { status: 500 },
    );
  }

  try {
    const [{ lessons, subjects }] = (
      await db.execute<{ lessons: number; subjects: number }>(
        sql`select (select count(*)::int from "lessons") as lessons, (select count(*)::int from "subjects") as subjects`,
      )
    ).rows;

    return Response.json({
      ok: true,
      database: "neon/postgres",
      schema: "ready",
      content: { subjects, lessons },
      env,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    return Response.json(
      { ok: false, step: "query", reason: message, env },
      { status: 500 },
    );
  }
}

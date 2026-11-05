import { sql } from "drizzle-orm";
import { db, resolveDatabaseRuntimeInfo } from "@/db";
import { lessons, subjects } from "@/db/schema";
import { ensureSchema, ensureSeeded } from "@/db/seed";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

/**
 * Diagnostic de déploiement (Cloudflare Workers + Neon, ou Vercel + Neon).
 * - 200 `{ ok: true }` : base joignable et schéma prêt.
 * - 500 `{ ok: false, reason, hint }` : configuration manquante ou base injoignable.
 */
export async function GET() {
  let detectedDriver: string | null = null;
  let hasDatabaseBinding = false;
  try {
    const info = resolveDatabaseRuntimeInfo();
    detectedDriver = info.driver;
    hasDatabaseBinding = Boolean(info.connectionString);
  } catch {
    hasDatabaseBinding = false;
  }

  const env = {
    DATABASE_URL: Boolean(process.env.DATABASE_URL) || hasDatabaseBinding,
    POSTGRES_URL: Boolean(process.env.POSTGRES_URL),
    OPENAI_API_KEY: Boolean(process.env.OPENAI_API_KEY),
    driver: detectedDriver ?? "none",
    node: typeof process !== "undefined" ? process.version : "edge",
  };

  if (!hasDatabaseBinding) {
    return Response.json(
      {
        ok: false,
        step: "env",
        reason: "DATABASE_URL (ou binding HYPERDRIVE) n'est pas définie sur ce déploiement.",
        hint:
          "Sur Cloudflare Workers : Workers & Pages > bacc-tunisie > Settings > Variables and Secrets > Add Secret DATABASE_URL = chaîne Neon PostgreSQL (...-pooler...?sslmode=require), puis redéploie.",
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
          "Vérifie que DATABASE_URL pointe bien vers ta base PostgreSQL Neon avec sslmode=require. Sur Neon, une base en veille se réveille en quelques secondes : réessaie.",
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
    const [[lessonRow], [subjectRow]] = await Promise.all([
      db.select({ count: sql<number>`count(*)::int` }).from(lessons),
      db.select({ count: sql<number>`count(*)::int` }).from(subjects),
    ]);

    return Response.json({
      ok: true,
      database: detectedDriver === "neon-http" ? "neon-serverless-http" : "postgres",
      schema: "ready",
      content: {
        subjects: subjectRow?.count ?? 0,
        lessons: lessonRow?.count ?? 0,
      },
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

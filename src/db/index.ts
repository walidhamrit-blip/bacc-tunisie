import { drizzle } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";

/**
 * Connexion PostgreSQL compatible Vercel + Neon.
 *
 * - Le pool est créé *paresseusement* : importer ce module ne lève plus
 *   d'erreur pendant `next build` si DATABASE_URL est absent.
 * - Sur Neon, l'URL doit être celle du endpoint *pooled* (`...-pooler...`)
 *   pour les fonctions serverless. Le SSL est forcé pour les hôtes Neon.
 * - `max` est volontairement bas : chaque lambda Vercel ne doit ouvrir que
 *   quelques connexions, sinon Neon sature ses connexions.
 */

function resolveConnectionString(): string {
  const url = process.env.DATABASE_URL ?? process.env.POSTGRES_URL ?? "";
  if (!url) {
    throw new Error(
      "DATABASE_URL is required — ajoute la chaîne de connexion Neon dans les variables d'environnement (Vercel > Settings > Environment Variables).",
    );
  }
  return url;
}

function buildPoolConfig(): PoolConfig {
  const connectionString = resolveConnectionString();
  const isNeon = /neon\.tech|neon\.build/.test(connectionString);
  const hasSslParam = /[?&]sslmode=/.test(connectionString);

  return {
    connectionString,
    max: Number(process.env.PG_POOL_MAX ?? 3),
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 15_000,
    allowExitOnIdle: true,
    application_name: "bacc-tunisie",
    ...(isNeon && !hasSslParam ? { ssl: { rejectUnauthorized: false } } : {}),
  };
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDb?: ReturnType<typeof drizzle>;
};

function getPool(): Pool {
  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    globalForDb.__arenaNextJsPostgresqlPool = new Pool(buildPoolConfig());
    // Évite de faire planter le process sur une coupure réseau transitoire.
    globalForDb.__arenaNextJsPostgresqlPool.on("error", (error) => {
      console.error("[db] erreur de connexion inattendue", error);
    });
  }
  return globalForDb.__arenaNextJsPostgresqlPool;
}

function getDb() {
  if (!globalForDb.__arenaNextJsPostgresqlDb) {
    globalForDb.__arenaNextJsPostgresqlDb = drizzle(getPool());
  }
  return globalForDb.__arenaNextJsPostgresqlDb;
}

export const pool: Pool = new Proxy({} as Pool, {
  get(_target, property, receiver) {
    return Reflect.get(getPool(), property, receiver);
  },
});

export const db: ReturnType<typeof drizzle> = new Proxy({} as ReturnType<typeof drizzle>, {
  get(_target, property, receiver) {
    return Reflect.get(getDb(), property, receiver);
  },
});

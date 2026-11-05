import { neon } from "@neondatabase/serverless";
import { drizzle as drizzleNeon } from "drizzle-orm/neon-http";
import { drizzle as drizzlePg, type NodePgDatabase } from "drizzle-orm/node-postgres";
import { Pool, type PoolConfig } from "pg";

/**
 * Connexion PostgreSQL hybride compatible :
 * 1. **Cloudflare Workers + Neon Serverless** (pilote HTTP `@neondatabase/serverless` sans socket TCP persistant, zéro saturation de pool, compatible plan gratuit Cloudflare).
 * 2. **Cloudflare Hyperdrive** (binding `HYPERDRIVE` optionnel).
 * 3. **Vercel + Neon** et **PostgreSQL local / Docker** (`pg.Pool`).
 *
 * L'initialisation reste strictement paresseuse (`Proxy`) afin que `next build`
 * et `opennextjs-cloudflare build` compilent sans exiger `DATABASE_URL` au build.
 */

type CloudflareContextHolder = {
  env?: {
    DATABASE_URL?: string;
    POSTGRES_URL?: string;
    HYPERDRIVE?: { connectionString?: string };
  };
};

function readCloudflareEnv(): CloudflareContextHolder["env"] {
  try {
    const sym = Symbol.for("__cloudflare-context__");
    const holder = (globalThis as Record<symbol, CloudflareContextHolder | undefined>)[sym];
    return holder?.env;
  } catch {
    return undefined;
  }
}

export function resolveDatabaseRuntimeInfo(): {
  connectionString: string;
  driver: "neon-http" | "hyperdrive-pg" | "node-pg";
} {
  const cfEnv = readCloudflareEnv();
  const hyperdriveUrl = cfEnv?.HYPERDRIVE?.connectionString?.trim() ?? "";
  if (hyperdriveUrl) {
    return {
      connectionString: hyperdriveUrl,
      driver: "hyperdrive-pg",
    };
  }

  const rawUrl = (
    process.env.DATABASE_URL ??
    process.env.POSTGRES_URL ??
    cfEnv?.DATABASE_URL ??
    cfEnv?.POSTGRES_URL ??
    ""
  ).trim();

  if (!rawUrl) {
    throw new Error(
      "DATABASE_URL est requise — ajoute la chaîne de connexion PostgreSQL Neon dans les variables d'environnement (Cloudflare Workers > Settings > Variables and Secrets, ou Vercel > Settings > Environment Variables).",
    );
  }

  const isNeonHost = /neon\.tech|neon\.build/i.test(rawUrl);
  if (isNeonHost && process.env.FORCE_NODE_PG !== "1") {
    return {
      connectionString: rawUrl,
      driver: "neon-http",
    };
  }

  return {
    connectionString: rawUrl,
    driver: "node-pg",
  };
}

function buildPoolConfig(connectionString: string, maxConnections: number): PoolConfig {
  const isNeon = /neon\.tech|neon\.build/i.test(connectionString);
  const hasSslParam = /[?&]sslmode=/i.test(connectionString);

  return {
    connectionString,
    max: maxConnections,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 15_000,
    allowExitOnIdle: true,
    application_name: "bacc-tunisie",
    ...(isNeon && !hasSslParam ? { ssl: { rejectUnauthorized: false } } : {}),
  };
}

const globalForDb = globalThis as typeof globalThis & {
  __arenaNextJsPostgresqlPool?: Pool;
  __arenaNextJsPostgresqlDb?: NodePgDatabase<Record<string, never>>;
  __arenaNeonHttpUrl?: string;
  __arenaNeonHttpDb?: NodePgDatabase<Record<string, never>>;
};

function getPool(): Pool {
  const { connectionString, driver } = resolveDatabaseRuntimeInfo();
  if (driver === "hyperdrive-pg") {
    // Sur Cloudflare Hyperdrive, chaque requête crée un client léger géré par le proxy Edge.
    return new Pool(buildPoolConfig(connectionString, 1));
  }

  if (!globalForDb.__arenaNextJsPostgresqlPool) {
    const max = Number(process.env.PG_POOL_MAX ?? 3);
    globalForDb.__arenaNextJsPostgresqlPool = new Pool(
      buildPoolConfig(connectionString, max),
    );
    globalForDb.__arenaNextJsPostgresqlPool.on("error", (error) => {
      console.error("[db] erreur de connexion inattendue", error);
    });
  }
  return globalForDb.__arenaNextJsPostgresqlPool;
}

function getDb(): NodePgDatabase<Record<string, never>> {
  const { connectionString, driver } = resolveDatabaseRuntimeInfo();

  if (driver === "neon-http") {
    if (
      !globalForDb.__arenaNeonHttpDb ||
      globalForDb.__arenaNeonHttpUrl !== connectionString
    ) {
      const sqlClient = neon(connectionString);
      globalForDb.__arenaNeonHttpUrl = connectionString;
      globalForDb.__arenaNeonHttpDb = drizzleNeon(
        sqlClient,
      ) as unknown as NodePgDatabase<Record<string, never>>;
    }
    return globalForDb.__arenaNeonHttpDb;
  }

  if (driver === "hyperdrive-pg") {
    return drizzlePg(getPool());
  }

  if (!globalForDb.__arenaNextJsPostgresqlDb) {
    globalForDb.__arenaNextJsPostgresqlDb = drizzlePg(getPool());
  }
  return globalForDb.__arenaNextJsPostgresqlDb;
}

export const pool: Pool = new Proxy({} as Pool, {
  get(_target, property, receiver) {
    return Reflect.get(getPool(), property, receiver);
  },
});

export const db: NodePgDatabase<Record<string, never>> = new Proxy(
  {} as NodePgDatabase<Record<string, never>>,
  {
    get(_target, property, receiver) {
      return Reflect.get(getDb(), property, receiver);
    },
  },
);

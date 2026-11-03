import { config } from "dotenv";
import { defineConfig } from "drizzle-kit";

config({ path: ".env.local" });
config({ path: ".env" });

const url = process.env.DATABASE_URL;

if (!url) {
  throw new Error(
    "DATABASE_URL manquant. Copie .env.example vers .env.local et colle la chaîne de connexion Neon (endpoint pooled).",
  );
}

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/db/schema.ts",
  out: "./drizzle",
  dbCredentials: { url },
  verbose: true,
  strict: false,
});

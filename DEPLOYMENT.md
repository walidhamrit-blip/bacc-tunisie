# Déploiement sur Cloudflare Workers + Base PostgreSQL Neon (Recommandé)

> **Pourquoi GitHub Pages ne convient pas à Bac Coach Tunisie ?**
> GitHub Pages n'héberge que des fichiers HTML/CSS/JS statiques : il ne peut exécuter ni les **Server Actions** (inscription mono-section, quiz, SRS, planning), ni les **API Routes** (`/api/corrections`, `/api/health`), ni les **cookies sécurisés** (`bac_student_code`), ni se connecter à une **base de données**.

L'application est désormais **nativement configurée pour Cloudflare Workers** via `@opennextjs/cloudflare` (`wrangler.jsonc` + `open-next.config.ts`) et utilise le pilote **HTTP Serverless de Neon (`@neondatabase/serverless`)** dans `src/db/index.ts`.

---

## 1. Quelle est la base de données appropriée avec Cloudflare ?

La base idéale est **Neon Serverless PostgreSQL** (plan gratuit généreux, région **AWS `eu-central-1` Frankfurt** très rapide depuis la Tunisie) :
- **Zéro réécriture SQL** : nos 12 tables PostgreSQL (`jsonb`, `serial`, `timestamp with time zone`, Drizzle ORM) fonctionnent telles quelles.
- **Pilote Edge HTTP (`@neondatabase/serverless`)** : chaque requête SQL transite en HTTPS (`fetch`) depuis l'Edge Cloudflare vers Neon sans socket TCP bloquant ni limite de connexions, **100 % compatible avec le plan gratuit Cloudflare Workers**.
- **Auto-migration & auto-seed** : dès la première visite sur ton URL Cloudflare, l'application crée automatiquement les 12 tables et insère tout le programme officiel tunisien !
- *(Option avancée supportée)* : si tu attaches un binding **Cloudflare Hyperdrive** nommé `HYPERDRIVE`, `src/db/index.ts` le détecte aussi automatiquement.

### Créer ta base Neon en 2 minutes

1. Ouvre [console.neon.tech](https://console.neon.tech) → **New Project** :
   - **Project name** : `bacc-tunisie`
   - **Region** : `AWS Europe (Frankfurt) — eu-central-1`
2. Clique sur **Connect** → coche **Connection pooling** → copie l'URL qui ressemble à :
   ```text
   postgresql://neondb_owner:MOT_DE_PASSE@ep-xxxx-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
   ```

---

## 2. Publier sur Cloudflare Workers (via GitHub automatique ou CLI)

### Option A — Déploiement automatique GitHub dans le Dashboard Cloudflare (Recommandé)

1. Connecte-toi sur [dash.cloudflare.com](https://dash.cloudflare.com) → **Compute (Workers & Pages)** → sélectionne ton service **`bacc-tunisie`** (ou **Create** → **Import a repository** → `walidhamrit-blip/bacc-tunisie`).
2. Dans **Settings → Builds** (Workers Builds), vérifie les commandes :
   - **Build command** : *(laisser vide, car `wrangler.jsonc` exécute déjà automatiquement `npm run cf:build`)* — ou mettre `npx @opennextjs/cloudflare build` si tu préfères l'expliciter.
   - **Deploy command** : `npx wrangler deploy`
   - **Non-production branch deploy command** : `npx wrangler versions upload`
3. Dans **Settings → Variables and Secrets** → clique sur **+ Add** :
   - **Type** : `Secret` (ou `Text`)
   - **Variable name** : `DATABASE_URL`
   - **Value** : colle ta chaîne PostgreSQL **Neon** (`postgresql://...-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require`)
   - *(Optionnel)* Ajoute `OPENAI_API_KEY` si tu veux enrichir la correction PDF par IA.
4. Clique sur **Deploy** (ou pousse un commit sur `main`) !
5. Désactive GitHub Pages dans ton dépôt GitHub (**Settings → Pages → Source : None**) pour éviter toute confusion.

### Option B — Déploiement direct depuis ton terminal

```bash
# 1. Authentification Cloudflare (une seule fois)
npx wrangler login

# 2. Enregistrer le secret DATABASE_URL sur le Worker bacc-tunisie
npx wrangler secret put DATABASE_URL
# -> Colle ton URL Neon postgresql://...-pooler...?sslmode=require

# 3. Compiler avec OpenNext et déployer sur Cloudflare Workers
npm run cf:deploy
```

---

## 3. Vérifier ton déploiement Cloudflare

Ouvre `https://bacc-tunisie.<ton-sous-domaine>.workers.dev/api/health` :

```json
{
  "ok": true,
  "database": "neon-serverless-http",
  "schema": "ready",
  "content": { "subjects": 13, "lessons": 19 }
}
```

- Si `"step": "env"` apparaît : ajoute `DATABASE_URL` dans **Cloudflare > bacc-tunisie > Settings > Variables and Secrets**, puis relance un déploiement.

---

## 4. Compatibilité conservée avec Vercel + Développement local

La même base de code reste **100 % compatible avec Vercel** (`npm run build`) et avec une base PostgreSQL locale (`npm run dev`) :
- Si `DATABASE_URL` contient `neon.tech`, `src/db/index.ts` utilise automatiquement `@neondatabase/serverless` (`neon-http`).
- Sinon (PostgreSQL local `127.0.0.1`, Docker ou Supabase), `src/db/index.ts` bascule automatiquement sur le pool `node-postgres` (`pg`).

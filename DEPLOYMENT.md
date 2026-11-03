# Déploiement sur Vercel + base Neon

Guide pas à pas pour publier l'application Bac Coach Tunisie (Next.js 16 + PostgreSQL/Drizzle)
sur **Vercel** avec une base **Neon**.

---

## 1. Créer la base de données Neon

1. Va sur [console.neon.tech](https://console.neon.tech) → **New Project**
   - Nom : `bacc-tunisie`
   - Région : `AWS eu-central-1` (Frankfurt) — la plus proche de la Tunisie
   - Version Postgres : 17 (par défaut)
2. Dans le tableau de bord du projet → **Connect** → onglet **Pooled connection**
   - Coche « Connection pooling »
   - Copie la chaîne, elle ressemble à :
     ```
     postgresql://neondb_owner:XXXX@ep-cool-name-123456-pooler.eu-central-1.aws.neon.tech/neondb?sslmode=require
     ```
   - ⚠️ Utilise **l'URL pooled** (le host contient `-pooler`). L'URL directe sature les
     connexions quand Vercel crée plusieurs instances de fonction.

## 2. Créer les tables dans Neon

Les tables sont créées à partir du schéma Drizzle (`src/db/schema.ts`).
Une migration SQL de référence est déjà versionnée dans `drizzle/0000_init.sql`.

### Option A — depuis ta machine (recommandé)

```bash
cp .env.example .env.local
# colle la chaîne Neon pooled dans DATABASE_URL, puis :
npm install
npm run db:push       # crée / met à jour les tables (drizzle-kit push)
```

### Option B — SQL direct

Ouvre la console SQL de Neon et colle le contenu de `drizzle/0000_init.sql`.

> Le contenu pédagogique (matières, cours, exercices, examens, quiz) et l'élève de démo
> sont insérés **automatiquement au premier chargement** de l'application
> (`ensureSeeded()` dans `src/db/seed.ts`). Rien d'autre à faire.

## 3. Déployer sur Vercel

### Via l'intégration Neon (le plus simple)

1. Sur [vercel.com/new](https://vercel.com/new), importe le dépôt GitHub `bacc-tunisie`.
2. Framework détecté : **Next.js** (aucune commande de build à changer).
3. Avant de cliquer sur *Deploy*, va dans **Storage → Neon** (ou *Integrations → Neon*),
   connecte ton compte Neon et sélectionne le projet `bacc-tunisie`.
   Vercel injecte alors automatiquement `DATABASE_URL` (et `POSTGRES_URL`, etc.).
4. **Deploy**.

### Manuellement

Si tu préfères ne pas passer par l'intégration, ajoute la variable d'environnement à la main :

| Clé | Valeur | Environnements |
| --- | --- | --- |
| `DATABASE_URL` | chaîne Neon **pooled** (`...-pooler...?sslmode=require`) | Production, Preview, Development |
| `PG_POOL_MAX` | `3` (optionnel) | tous |
| `OPENAI_API_KEY` | clé OpenAI (optionnel) | tous |

Puis **Redeploy**, car Vercel n'applique pas les variables à un déploiement déjà construit.

## 4. Vérifier que ça marche

- `https://<ton-projet>.vercel.app/api/health` → doit répondre `{"ok":true}`
  (une réponse 500 = `DATABASE_URL` absente ou endpoint Neon injoignable).
- La page d'accueil doit afficher les matières et le tableau de bord de l'élève de démo.

## 5. Points d'attention spécifiques à ce projet

- **Taille des PDF** : Vercel limite le corps d'une requête à ~4,5 Mo. La limite du
  formulaire de correction est donc fixée à **4 Mo** (`src/app/api/corrections/route.ts`).
  Au-delà, l'utilisateur est invité à coller l'énoncé.
- **Durée des fonctions** : la correction d'un PDF appelle éventuellement l'IA avec un
  timeout de 25 s. Sur le plan Hobby, la durée max d'une fonction est de 60 s : c'est bon.
- **Connexions** : le pool est créé de façon paresseuse (`src/db/index.ts`) avec `max: 3`
  et SSL forcé pour Neon. Importer le module ne casse plus le `next build`.
- **API OpenAI (optionnelle)** : sans `OPENAI_API_KEY`, la correction fonctionne avec le
  guide pédagogique local (`analyzeSheet`). Avec la clé, elle est enrichie par `gpt-4o-mini`.

## 6. Commandes utiles

```bash
npm run db:push       # applique le schéma sur la base ciblée par DATABASE_URL
npm run db:generate   # génère une migration après modification du schéma
npm run db:studio     # explorateur de données Drizzle
npm run typecheck
npm run build
```

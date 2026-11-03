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

**L'application crée elle-même ses tables au premier chargement** (`ensureSchema()` dans
`src/db/seed.ts` exécute un schéma idempotent, `IF NOT EXISTS`). Tu peux donc déployer
directement sur une base Neon vide : au premier hit, les 11 tables sont créées puis le
contenu pédagogique (13 matières, 18 cours, exercices, examens, quiz) et l'élève de démo
sont insérés.

Si tu préfères maîtriser la migration depuis ta machine :

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

## 4. Vérifier que ça marche — et diagnostiquer

Ouvre `https://<ton-projet>.vercel.app/api/health`. C'est un diagnostic complet :

| Réponse | Signification | Solution |
| --- | --- | --- |
| `{"ok":true,"schema":"ready","content":{...}}` | Tout va bien | — |
| `{"ok":false,"step":"env"}` | `DATABASE_URL` absente du déploiement | Ajouter la variable **puis Redeploy** |
| `{"ok":false,"step":"connection"}` | URL Neon fausse / base injoignable | Utiliser l'URL *pooled* + `sslmode=require` |
| `{"ok":false,"step":"schema"}` | Schéma non créable | Lancer `npm run db:push` avec la même URL |

En cas d'erreur, les pages affichent désormais un écran explicite (avec bouton « Réessayer »
et lien vers `/api/health`) au lieu de « This page couldn't load ».

> ⚠️ **Cause n°1 du message « This page couldn't load » sur Vercel** : le projet a été déployé
> sans `DATABASE_URL`. Ajouter la variable ne suffit pas — il faut **Redeploy**, car les
> variables d'environnement sont figées au moment du build pour les fonctions déjà déployées.

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

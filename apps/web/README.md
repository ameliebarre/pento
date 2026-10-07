# Pento

Squelette d'application e-commerce en Next.js (App Router, route handlers et server actions),
Prisma (PostgreSQL) et Tailwind CSS.

## Stack

- **Next.js 16** — App Router, route handlers (`src/app/api/**/route.ts`) et server actions
  (`src/actions/**`) pour le front comme le backend.
- **Prisma** — ORM + client, connecté à PostgreSQL.
- **Tailwind CSS v4** + **shadcn/ui** pour les composants.
- **Auth.js (NextAuth v5)** — authentification par email/mot de passe (Credentials), adaptateur
  Prisma, sessions JWT.
- **Prettier** + **ESLint** (config Next.js + `eslint-config-prettier`).
- **Docker Compose** pour lancer PostgreSQL en local.

## Démarrer

1. Copier les variables d'environnement :

   ```bash
   cp .env.example .env
   ```

   Générer un vrai secret pour Auth.js :

   ```bash
   npx auth secret
   ```

2. Lancer la base de données locale :

   ```bash
   docker compose up -d
   ```

3. Installer les dépendances (génère aussi le client Prisma via `postinstall`) :

   ```bash
   npm install
   ```

4. Appliquer le schéma et peupler quelques produits de démo :

   ```bash
   npm run db:migrate
   npm run db:seed
   ```

5. Lancer le serveur de développement :

   ```bash
   npm run dev
   ```

   Ouvrir [http://localhost:3000](http://localhost:3000).

## Scripts disponibles

| Script                 | Description                                   |
| ---------------------- | ---------------------------------------------- |
| `npm run dev`           | Serveur de développement Next.js               |
| `npm run build`         | Build de production                            |
| `npm run start`         | Démarre le build de production                 |
| `npm run lint`          | ESLint                                         |
| `npm run format`        | Formate le code avec Prettier                  |
| `npm run format:check`  | Vérifie le formatage sans modifier les fichiers|
| `npm run db:migrate`    | Applique les migrations Prisma (dev)           |
| `npm run db:generate`   | Régénère le client Prisma                      |
| `npm run db:seed`       | Peuple la base avec des données de démo        |
| `npm run db:studio`     | Ouvre Prisma Studio                            |

## Structure du projet

```
prisma/
  schema.prisma       # Modèles Auth.js + e-commerce (Product, Category, Cart, Order...)
  seed.ts              # Données de démo
src/
  actions/             # Server actions ("use server") : panier, auth
  app/
    api/products/      # Exemple de route handler (GET /api/products)
    product/[slug]/     # Page produit (server component + server action)
    cart/                # Page panier
    login/, signup/      # Formulaires (client components + useActionState)
  auth.ts              # Configuration Auth.js (Credentials + adaptateur Prisma)
  components/          # Composants applicatifs + shadcn/ui (src/components/ui)
  generated/prisma/    # Client Prisma généré (ignoré par git)
  lib/prisma.ts        # Singleton PrismaClient
```

## Notes

- Le générateur Prisma configuré (`prisma-client`) écrit le client dans `src/generated/prisma`,
  régénéré automatiquement après `npm install` (`postinstall`) et à chaque changement de schéma
  (`npm run db:generate`).
- Pour ajouter des providers OAuth (Google, GitHub...), complétez `src/auth.ts` et les variables
  d'environnement correspondantes.
- `docker-compose.yml` fournit une base Postgres locale (`pento` / `pento` / `pento_dev`,
  exposée sur le port hôte `5434` pour éviter les conflits avec d'autres instances Postgres
  déjà présentes sur `5432`/`5433`) — adaptez `DATABASE_URL` si vous utilisez une base managée
  (Neon, Supabase, Vercel Postgres...) ou si le port `5434` est lui aussi pris.

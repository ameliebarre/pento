---
name: deploy-vercel
description: Deploy the current web application to Vercel safely. Use when the user asks to deploy, publish, or configure a project on Vercel, including first-time Vercel setup, environment variables, preview/production deployments, or deployment troubleshooting.
---

# Deploy to Vercel

Guidance for deploying `apps/web` (Next.js + Payload CMS + Prisma) to Vercel safely, without skipping the steps that keep the database and migrations in sync.

## Before deploying

- Confirm which environment you're targeting (preview vs. production) — never assume production from an ambiguous request. If unclear, ask.
- Check `apps/web/.env.example` / `.env.test.example` for the full list of required environment variables (database URL, auth secrets, Cloudinary, email provider, etc.) and confirm they're set in the Vercel project settings for that environment before triggering a build.
- Treat `.vercelignore` as the source of truth for what should never ship: it currently excludes `.env`, `.env.test`, `.claude`, `claude.md`, `media`, and `tsconfig.tsbuildinfo`. Don't remove entries from it without checking why they were added.

## Build behavior

The production build runs via the `vercel-build` script (`apps/web/package.json`), not plain `next build`:

```
tsx scripts/wait-for-db.ts && PAYLOAD_CONFIG_PATH=payload.config.ts payload migrate && tsx scripts/migrate-with-retry.ts && next build --webpack
```

This means every deploy:
1. Waits for the database to accept connections (`wait-for-db.ts`).
2. Runs Payload's own migrations.
3. Runs the Prisma migration step with retry (`migrate-with-retry.ts`).
4. Only then builds the Next.js app (Webpack, not the default Turbopack build).

Do not bypass this script to "speed up" a deploy — a build without the migration steps can boot the app against a schema it doesn't match.

## Environment variables

- Keep preview and production environment variables in sync in shape (same keys), but never reuse a production database URL for preview deployments — preview builds still run migrations.
- Secrets (auth secrets, API keys, database URLs) are configured in the Vercel project dashboard, never committed — if asked to "add" an env var, that means adding it in Vercel's settings, not writing it into a tracked `.env*` file.

## Monorepo note

This repo is structured as a monorepo (`apps/web`, with `apps/medusa` planned). When configuring the Vercel project, the **Root Directory** setting must point at `apps/web`, and install/build commands should run from there (or via the root `turbo` scripts filtered to `apps/web`) — a Vercel project pointed at the repo root will not find `apps/web/package.json` correctly without this.

## After deploying

- Verify the deployment against the actual app (not just "build succeeded"): hit a page that reads from the database and one that reads from Payload to confirm both the Prisma and Payload migration steps actually applied.
- For a failed deploy, check the Vercel build logs for which of the four build steps failed (db wait, Payload migrate, Prisma migrate, Next build) before guessing at a fix — each has a different failure mode.

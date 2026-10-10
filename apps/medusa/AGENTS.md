# AGENTS.md

## Overview

`apps/medusa` is the Medusa backend (`@medusajs/medusa` 2.21.2) for the Pento monorepo, owning the e-commerce domain: products, designers, tags, stock, and inventory. There is no separate storefront app here: `apps/web` (Next.js) is the storefront and calls this backend's Store API.

**This app manages its own dependencies, deliberately outside the root npm workspace.** Only `apps/web` is listed in the root `package.json`'s `workspaces`. Medusa's internal package graph (`@medusajs/framework`, `modules-sdk`, `orchestration`, `query`, `workflows-sdk`, etc.) has circular peer relationships that npm cannot cleanly hoist into a single flat tree shared with an unrelated app (`apps/web`) — attempting that produced duplicate, unresolvable copies of `@medusajs/utils` and broke the Medusa CLI (`Cannot find module '@medusajs/utils'`). Keeping this app's install isolated (its own `node_modules`, its own `package-lock.json`) avoids that class of problem entirely and matches how `create-medusa-app` ships it upstream.

## Directory structure

```text
apps/medusa/
├── medusa-config.ts          # Medusa config: DB URL, CORS, secrets, modules
├── integration-tests/        # setup.js (Jest setupFiles) and http/*.spec.ts suites
├── docker-compose.yml        # Local Postgres for this app only (port 5435)
└── src/
    ├── admin/                # Admin dashboard extensions (widgets/, i18n/, routes)
    ├── api/                  # API routes: api/store/*, api/admin/* (file-based)
    ├── jobs/                 # Scheduled jobs
    ├── links/                # Module links between modules
    ├── migration-scripts/    # Data migration scripts
    ├── modules/              # Custom modules (service + models + migrations)
    ├── subscribers/          # Event subscribers
    └── workflows/            # Workflows and workflow steps
```

## Package manager and workspace

This app has its **own** `package-lock.json` and `node_modules`, separate from the repo root's. After cloning or pulling changes that touch `apps/medusa/package.json`, run `npm install` from inside `apps/medusa` (or `npm run medusa:install` from the repo root) — don't expect `npm install` at the repo root to install or update this app's dependencies; it only manages `apps/web`.

## Commands

From the **repo root** (`/Users/ameliebarre/web/pento`), a few pass-through scripts are available:

```bash
npm run medusa:install      # npm install, scoped to apps/medusa
npm run medusa:dev          # dev server (http://localhost:9000, admin at /app)
npm run medusa:lint         # medusa lint
npm run medusa:test         # unit tests
```

Everything else needs `cd apps/medusa` first — this app is not reachable through the root's `turbo dev`/`build`/`lint`/`test` (those only cover `apps/web`):

```bash
cd apps/medusa
npm exec medusa db:generate <module-name>   # generate migrations for a custom module
npm exec medusa db:migrate                  # run migrations
npm exec medusa user -e admin@test.com -p supersecret
```

Test commands (backend only):

```bash
cd apps/medusa
npm run test:unit                      # **/src/**/__tests__/**/*.unit.spec.ts
npm run test:integration:modules       # **/src/modules/*/__tests__/**
npm run test:integration:http          # **/integration-tests/http/*.spec.ts
```

## Local database

This app has its **own** Postgres, separate from `apps/web`'s, started independently:

```bash
cd apps/medusa && docker compose up -d   # Postgres on localhost:5435
```

`apps/web` uses port 5434 for its own Postgres — these two databases are never shared. `DATABASE_URL` in `apps/medusa/.env` points at `localhost:5435`.

## Node version

Medusa 2.21.2 requires Node `>=22.22.0` (`engines` in `package.json`). If the active local Node is older, dependency installs will show `EBADENGINE` warnings and the dev server may behave unpredictably — check `node -v` and switch (nvm/asdf/fnm) before debugging anything else that looks like a runtime issue.

## Medusa Skills & MCP Server

Strongly recommended — they give documentation-backed answers instead of guesses about Medusa APIs:

**Agentic skills** ([docs](https://docs.medusajs.com/learn/introduction/build-with-llms-ai/agentic-skills)) — if `medusa-dev` skills are listed as available, load them *before* writing code:
- `building-with-medusa` — any backend work: modules, API routes, workflows, data models, module links
- `building-admin-dashboard-customizations` — anything under `src/admin`
- `db-generate` / `db-migrate` / `new-user` — the DB and user commands above

If not installed, suggest:
```bash
/plugin marketplace add medusajs/medusa-agent-skills
/plugin install medusa-dev@medusa
```

**MCP server** ([docs](https://docs.medusajs.com/learn/introduction/build-with-llms-ai/mcp-server)) — prefer it over web search or memory for any Medusa API/config/upgrade question:
```bash
claude mcp add --transport http medusa https://docs.medusajs.com/mcp
```

## Code style

- **Must satisfy `@medusajs/eslint-plugin`'s recommended config** (`eslint.config.ts`). Its rules encode Medusa framework requirements — correct route/workflow/module shapes, not just cosmetics. Never disable a `@medusajs/*` rule to make lint pass; fix the code.
- No semicolons. Double quotes, 2-space indent.
- Files: kebab-case. Types/classes: PascalCase. Functions/variables: camelCase. DB columns: snake_case.
- No emojis in code, comments, or commit messages.

## Conventions

- **Routing is file-based.** A store endpoint is `src/api/store/<path>/route.ts` exporting `GET`/`POST`/etc. Don't add a router or register routes manually.
- **Business logic belongs in workflows**, not in route handlers. Routes resolve and run a workflow; workflows compose steps.
- Data consumed by `apps/web` goes through this backend's Store API — don't reach into this app's database directly from `apps/web`, and don't reintroduce product/designer/tag/stock data into `apps/web`'s own Prisma schema (that data now lives here).

## Common mistakes

- Running `npm install` at the repo root expecting it to update this app's dependencies — it won't; it only manages `apps/web`. Install from inside `apps/medusa`.
- Assuming this app shares a database or CORS origin with `apps/web` — they're independent (ports 5434 vs 5435).
- Editing a custom module's model without running `npm exec medusa db:generate <module>` from inside `apps/medusa` — the migration is missing and the change silently never applies.
- Writing raw SQL or importing DB clients directly instead of going through module services / workflows.
- Calling the Medusa Store API from `apps/web` without the publishable API key; requests fail with a publishable-key error, not an obvious 401.
- Running test tasks without a reachable Postgres on port 5435 — integration suites need a live DB (`docker compose up -d` first).
- Silencing `@medusajs/*` ESLint rules instead of fixing the underlying pattern.

## Off-limits

- `.medusa/`, `dist/`, `.turbo/` — build output, regenerated.
- This app's `package-lock.json` — never hand-edit; change it only as a side effect of `npm install`/`npm add` run from inside `apps/medusa`.
- `.env` — never commit, print, or copy secret values out of it. Edit `.env.template` instead when documenting a new variable.
- Existing migrations in `src/modules/*/migrations/` — add a new migration rather than rewriting one that may already have run.
- Don't run destructive DB commands (drops, resets) against a database with real data without explicit confirmation.

---
name: code-quality
description: Pento — React & Next.js Code Quality Skill. Use when reviewing, writing, or refactoring React/Next.js code in this repo to keep it consistent with the project's conventions.
---

# Pento — React & Next.js Code Quality Skill

Apply these conventions when writing or reviewing code in `apps/web`. The app is Next.js (App Router) + Payload CMS + Prisma + better-auth, styled with Tailwind v4 and shadcn/base-ui components. Lint/format are enforced via `eslint-config-next` + `eslint-config-prettier` and Prettier with `prettier-plugin-tailwindcss` (see `apps/web/eslint.config.mjs`, `apps/web/.prettierrc.json`).

## Project structure

- Feature code lives under `src/features/<feature>/` (e.g. `cart`, `products`, `home`), split into `components/`, `server/`, `utils/`, `types.ts`, `constants.ts`. Keep new code inside the matching feature folder instead of dumping everything in `components/`.
- Shared, cross-feature code goes in `src/lib/` (data access, auth, email, rate limiting) and `src/globals/` (Payload globals).
- Routes live in `src/app/(app)/...` for the storefront and `src/app/(payload)/...` for the CMS admin/API — don't mix concerns across these route groups.

## Components

- Default to Server Components. Only add `"use client"` to the smallest leaf component that actually needs state, effects, or browser APIs — never to a whole page for one interactive widget.
- Co-locate a component's test next to it as `*.test.tsx` (see `product-card.test.tsx`, `price-filters.test.tsx`) using Testing Library + Vitest, not snapshot tests for interactive behavior.
- Prefer composition over config-prop explosion: a component with many boolean props controlling unrelated behavior should usually be split.
- Use existing shared primitives (shadcn/base-ui components, `cn`/`tailwind-merge` via `src/lib/utils.ts`) instead of re-implementing buttons, dialogs, or form controls.

## Data & server logic

- Server-only data fetching/mutations belong in `server/` files within the feature (e.g. `get-product-page-data.ts`, `build-product-filters.ts`), not inline in page components, so they can be unit tested without rendering.
- Validate and narrow external input (search params, form data, webhook payloads) before passing it into Prisma/Payload calls — don't trust `searchParams` or form values to already match the expected shape.
- Keep Prisma/Payload queries close to the feature that uses them; avoid a God `lib/db.ts` with unrelated queries for every feature.

## Styling

- Use Tailwind utility classes directly; let `prettier-plugin-tailwindcss` handle class ordering — don't hand-sort classes or fight the formatter.
- Use `cn()` (from `src/lib/utils.ts`) to merge conditional classes instead of string concatenation or template literals with ternaries inline in JSX.
- Reuse existing design tokens/spacing scale rather than introducing one-off pixel values.

## Testing

- Run `npm run test` (Vitest) for unit/component tests and `npm run lint` before considering a change done.
- New utility functions (`utils/`, `server/`) should ship with a corresponding `.test.ts` covering the edge cases they handle (empty input, boundary values), following the existing pattern in `features/products`.
- Don't mock what you don't have to — prefer testing through the real function with realistic fixtures over mocking internals.

## General hygiene

- No unused components/exports — if a component like the former `ProductShowcase` is no longer referenced, delete it rather than leaving dead code.
- Keep commit-sized diffs focused: a refactor, a fix, and a feature addition should be separate commits/PRs, matching the existing commit history style (`feat(...)`, `fix(...)`, `refactor(...)`, `chore(...)`).
- Prefer `redirect()`/`<Link>` over client-side navigation in Server Components (see the `nextjs-server-navigation` skill) and keep route handlers thin, delegating logic to `server/` modules.

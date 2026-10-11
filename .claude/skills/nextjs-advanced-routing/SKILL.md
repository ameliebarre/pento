---
name: nextjs-advanced-routing
description: Guide for Next.js App Router routing patterns beyond basic pages — route groups, dynamic and catch-all segments, and per-segment loading/error boundaries. Use when adding new routes, reorganizing the app directory, or deciding between a dynamic segment, a catch-all, and a route group.
---

# Next.js Advanced Routing (App Router)

Patterns for structuring routes under `src/app` in this repo. Ground any new route in the existing structure rather than introducing a new convention ad hoc.

## Route groups — separating concerns without affecting the URL

A folder wrapped in parentheses (`(name)`) groups routes without adding a path segment. This repo uses two top-level groups:

- `src/app/(app)/...` — the storefront (products, cart, auth pages). Has its own `loading.tsx`/`error.tsx` boundaries at the group root so a failure in one storefront page doesn't take down the Payload admin.
- `src/app/(payload)/...` — Payload CMS admin UI and its API routes, kept isolated from the storefront's layout/providers.

Use a new route group when a set of routes needs a different root layout, different providers, or an independent loading/error boundary — not just for cosmetic folder organization.

## Dynamic segments

A folder named `[param]` captures one path segment as a variable, available via `params` in the page/layout. Example: `src/app/(app)/products/[category]/page.tsx` renders a category page for any `category` value and reads it out of `params.category` server-side to fetch the matching products.

- Validate the param against known values (or handle the "not found" case with `notFound()`) rather than assuming it's always valid — a user can type any string into the URL.
- Keep the data-fetching for a dynamic segment in the feature's `server/` module (see `features/products/server/get-product-page-data.ts`) so the page component stays thin.

## Catch-all and optional catch-all segments

- `[...slug]` (catch-all) matches one or more segments, e.g. `src/app/(payload)/api/[...slug]/route.ts` forwards any nested API path to Payload's own router — use this when you're delegating routing to something else rather than enumerating every possible path yourself.
- `[[...segments]]` (optional catch-all, double brackets) matches zero or more segments, e.g. `src/app/(payload)/admin/[[...segments]]/page.tsx` renders Payload's admin UI including its own root (`/admin`) with no extra segments.

Reach for a catch-all only when the nested routing is actually owned by another router/library (as with Payload here). For routes you own yourself, prefer explicit folders/dynamic segments — they're easier to reason about and to add per-route loading/error boundaries to.

## Per-segment loading and error boundaries

Add `loading.tsx` and `error.tsx` at the route-group or route level (not just at the app root) so a slow or failing section doesn't blank the entire app:

- `loading.tsx` renders instantly while the segment's Server Components stream in — keep it a lightweight skeleton matching the page's actual layout, not a generic spinner, so it doesn't cause a layout jump.
- `error.tsx` must be a Client Component (`"use client"`) — it receives `error` and `reset()` and should offer a way to retry rather than just displaying the error.

## Middleware vs. routing

Cross-cutting rules that apply to a set of routes regardless of their structure (auth gating, redirects) belong in middleware (`src/proxy.ts`) with the relevant paths added to `config.matcher`, not duplicated as a check at the top of each page component. Reserve route-level code for logic specific to that route.

## Checklist before adding a route

- Does it need its own layout/providers/error boundary distinct from its siblings? → new route group.
- Does it vary by a single known identifier (slug, category, id)? → dynamic segment `[param]`.
- Is the nested routing actually delegated to another router/library? → catch-all `[...param]` or optional catch-all `[[...param]]`.
- Is this an access-control or redirect rule shared across many routes? → middleware, not per-page logic.

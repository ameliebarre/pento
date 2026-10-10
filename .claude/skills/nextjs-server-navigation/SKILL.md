---
name: nextjs-server-navigation
description: Guide for implementing navigation in Next.js Server Components using the Link component and redirect() function. Covers the difference between server and client navigation methods. Use when adding links, redirects, or navigation logic in server components without converting them to client components unnecessarily.
---

# Next.js Server Component Navigation

Navigation inside a Server Component should never require adding `"use client"`. Reach for one of the two server-safe primitives below instead of `useRouter`/`useNavigation`, which only exist on the client.

## `<Link>` for user-triggered navigation

Use `next/link`'s `<Link>` for anything the user clicks to move to another route (nav items, product cards, pagination, "view details"). It works in Server Components as-is, prefetches the target route, and degrades to a normal anchor tag without JS.

```tsx
import Link from "next/link";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/products/${product.category}/${product.slug}`}>
      {product.name}
    </Link>
  );
}
```

- Build hrefs from real data (category/slug/filters), not string concatenation that can produce an invalid path — see `features/products/utils/build-filter-href.ts` and `build-page-href.ts` for the pattern used in this repo to construct filter/pagination URLs.
- For a link that should look like a button, style the `<Link>` itself (or wrap it) — don't put a `<button onClick={...}>` with a client-side `router.push` where a plain link would do.

## `redirect()` for server-decided navigation

Use `redirect()` from `next/navigation` when the server itself decides the user shouldn't be on this route — e.g. no session, invalid state, after a successful server action. It can be called directly inside a Server Component, a Server Action, or a Route Handler.

```tsx
import { redirect } from "next/navigation";
import { getSession } from "@/lib/get-session";

export default async function ProfilePage() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  // ...
}
```

- `redirect()` throws internally — don't wrap the call in a `try/catch` that would swallow it, and don't put code after an unconditional `redirect()` expecting it to run.
- For redirects based on auth state across many routes (not just one page), prefer middleware (see `src/proxy.ts`, which redirects unauthenticated requests to `/login` for routes matched in `config.matcher`) instead of repeating the same check in every page.

## When a client component is actually needed

Only reach for `useRouter()` (from `next/navigation`, client-side) when navigation must happen in response to client-only state that a Server Component can't see — e.g. closing a modal and navigating away in the same interaction, or navigating after a client-side form validation step. Keep that component as small as possible and pass data into it as props rather than converting its parent page to a client component.

## Checklist before adding navigation logic

- Is this triggered by a user click with no server decision involved? → `<Link>`.
- Is this the server deciding the user needs to be elsewhere (auth, validation, post-mutation)? → `redirect()` in the Server Component/Action.
- Does the same redirect rule apply to a whole group of routes? → middleware (`src/proxy.ts`), add the path to `config.matcher` rather than duplicating the check.
- Only if none of the above fit, and the trigger is genuinely client-only state → a small client component with `useRouter()`.

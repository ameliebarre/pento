---
name: web-design-guidelines
description: Review UI code for Web Interface Guidelines compliance. Use when asked to "review my UI", "check accessibility", "audit design", "review UX", or "check my site against best practices".
---

# Web Design Guidelines Audit

Audit UI code (React/Next.js components, Tailwind classes, shadcn/base-ui usage) against the checklist below. Read the actual component and page files involved — don't guess from names. Report findings grouped by category, each with the file:line, what's wrong, and the concrete fix. Skip categories that genuinely don't apply (e.g. no forms on the page) rather than padding the report.

## Accessibility

- Every interactive element (`button`, link, custom `div`/`span` acting as one) is reachable by keyboard and has a visible focus state — never `outline-none` without a replacement focus ring.
- Images have meaningful `alt` text; purely decorative images use `alt=""`.
- Icon-only buttons have an `aria-label` or visually-hidden text describing the action.
- Color is never the only signal for state (error, success, selected) — pair it with an icon, text, or shape change.
- Text contrast meets at least WCAG AA (4.5:1 for body text, 3:1 for large text) in both light and dark themes if the app supports both.
- Headings follow a logical, non-skipping hierarchy (`h1` → `h2` → `h3`) per page/route.
- Form inputs have an associated `<label>` (or `aria-labelledby`); placeholder text is not used as a label substitute.
- Modals/drawers (e.g. the cart drawer) trap focus while open, restore focus on close, and are dismissible with `Escape`.
- Disable `spellcheck` on email/password fields; keep it enabled on free-text fields.

## Interaction & feedback

- Every async action (submit, add to cart, delete) has a loading state and the trigger is disabled while pending — no double-submits.
- Destructive actions (remove item, delete account) require confirmation before executing.
- Errors are shown inline near the field/action that caused them, in plain language, not just logged to console or shown as a generic toast.
- Empty states explain what's missing and offer a next action, rather than a blank area.
- Hover/active/focus/disabled states are all defined for clickable elements — don't rely on the browser default for one of them while customizing the others.

## Layout & responsiveness

- No fixed pixel widths that can overflow on small viewports; prefer `max-w-*`, `min-w-0`, and `flex`/`grid` with wrapping.
- Long dynamic content (product names, email addresses) truncates (`truncate`, `line-clamp-*`) instead of breaking layout.
- Touch targets are at least ~44×44px on mobile; check icon buttons and small links specifically.
- Sticky/fixed headers don't overlap content below them (check scroll padding / `scroll-margin-top` for anchored sections).
- Horizontal scrolling only happens inside an explicit `overflow-x-auto` container (tables, carousels), never on the page body.

## Content & typography

- Line length for body copy stays readable (roughly 60–80 characters); avoid full-bleed paragraphs on wide screens.
- Headings and buttons use sentence case consistently; avoid random ALL CAPS unless it's a deliberate, repeated pattern (e.g. small eyebrow labels).
- Button/link text describes the action in active voice ("Add to cart", not "Submit" or "OK").
- Numeric data (prices, counts) is formatted consistently (locale, currency, decimal places) across the app.

## Motion

- Animations respect `prefers-reduced-motion`.
- Entrance/scroll-triggered animations are used deliberately (one orchestrated moment), not applied uniformly to every card/section by default.
- Transitions have a purpose (showing what changed) rather than decorating static content.

## Performance-affecting UI patterns

- Images use `next/image` (or equivalent sizing/`loading="lazy"`) rather than raw `<img>` for anything below the fold.
- Client components (`"use client"`) are scoped to the smallest subtree that actually needs interactivity — don't convert a whole page to a client component for one button.
- Large lists are paginated, virtualized, or infinite-scrolled rather than rendered in full when they can grow unbounded.

## How to report

For each finding: file path + line, a one-line description of the problem, and the smallest fix that resolves it (a class change, an added `aria-*` attribute, a state hook) — not a rewrite. If a pattern repeats across many files (e.g. missing focus rings on every icon button), say so once and list the affected files, rather than repeating the same finding per file.

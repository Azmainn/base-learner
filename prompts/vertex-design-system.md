# Implement the Vertex design system

## Goal

Turn `design/vertex-designsystem.png` into the foundation every later page builds on: design tokens in Tailwind v4, the two brand fonts, and a small set of reusable UI primitives that reproduce sections 06–13 of the board exactly. Add one preview route so the result can be checked against the image.

## Skills and docs read

- `AGENTS.md` (sections 3, 5, 6, 13, 14).
- `node_modules/next/dist/docs/01-app/01-getting-started/13-fonts.md` (`next/font/google`, CSS variables on `<html>`).
- `node_modules/next/dist/docs/01-app/01-getting-started/11-css.md` (Tailwind v4 via `@import "tailwindcss"`).
- No Sanity/Clerk/PostHog skill applies; this task touches no data, auth, or analytics.

## Code inspected

- `package.json`: Next 16.4.3, React 19.3, Tailwind v4 through `@tailwindcss/turbopack` (wired in `next.config.ts`), no component or icon libraries.
- `app/globals.css`: create-next-app defaults (Geist, dark-mode media query, Arial body).
- `app/layout.tsx`: loads Geist and Geist Mono, uses `LayoutProps<"/">`.
- `app/page.tsx`: create-next-app starter. Not touched in this task.
- `design/`: also has home, course, lesson, and search references. Those come later; this task only does the system.

## Decisions and assumptions

1. **Tokens live in `app/globals.css` under `@theme`**, so they become Tailwind utilities (`bg-primary-500`, `text-neutral-700`, `rounded-md`, `shadow-md`, `font-display`, `text-display-1` …). No `tailwind.config` file (v4 style).
   - Colors: primary 500 `#F97316`, 400 `#FB923C`, 300 `#FDBA74`, 200 `#FED7AA`, 100 `#FFEEE5`; neutral 900 `#0F172A`, 700 `#334155`, 500 `#64748B`, 300 `#CBD5E1`, 200 `#E2E8F0`, 100 `#F1F5F9`, 50 `#FAFAFC`; white `#FFFFFF`. Badge accent colors (lesson badge's slate-blue) are taken from the image.
   - Type scale as `--text-*` with line heights: display-1 48/56, display-2 36/44, heading-1 28/36, heading-2 22/30, heading-3 18/26, body-lg 16/24, body 14/20, small 12/16.
   - Fonts: `--font-display` = Playfair Display, `--font-sans` = Inter.
   - Radius: xs 4, sm 8, md 12, lg 16, xl 24, full.
   - Shadows: sm `0 1px 2px 0 rgba(15,23,42,.05)`, md `0 4px 12px -2px rgba(15,23,42,.08)`, lg `0 12px 24px -4px rgba(15,23,42,.10)`, xl `0 20px 40px -8px rgba(15,23,42,.12)`.
   - Spacing: Tailwind's default 4px base already matches the board (4…64), so no override.
2. **Fonts via `next/font/google`** (Inter + Playfair Display) replacing Geist, exposed as CSS variables on `<html>`. Self-hosted, no runtime Google requests.
3. **Light theme only.** The board has no dark variant, so the create-next-app dark-mode block is removed and `body` gets the neutral-50 background and neutral-900 text.
4. **Icons are hand-written inline SVG components** (24px grid, 2px stroke, round caps) with `outline` and `filled` variants for the nine board icons (bell, search, play, file, bookmark, chart, clock, user, chevron-right), plus the few extras the cards, nav, and principles use (external-link, folder, chevron-left, chevron-down, eye, grid, target, accessibility, lock, check-circle, loader). No icon dependency, because no library ships the matching filled set.
5. **Components are server-safe presentational components** (no `"use client"`) except where interaction needs it (`Select` uses a native `<select>`, so it stays server-safe too). They take `className` for composition and use a tiny local `cn()` helper rather than adding `clsx`/`tailwind-merge`.
6. **Preview route `app/design-system/page.tsx`** renders every token and component in the board's 14 sections, so the result can be compared side by side with the image. It's a dev reference, not a learner feature; it can be deleted later.
7. **Repo layout:** the Next app currently sits at the repo root, not in a `web/` workspace (AGENTS.md section 5). This task stays at the root and doesn't move anything; the split belongs in its own scaffolding task.

## Files to touch

- `app/globals.css`: replace with the Vertex tokens and base styles.
- `app/layout.tsx`: Inter + Playfair Display, metadata title "BaseLearner".
- `components/ui/cn.ts`: class joiner.
- `components/ui/icons.tsx`: icon set (outline/filled).
- `components/ui/button.tsx`: `primary | secondary | tertiary | text`, sizes `md | lg`, default/hover/disabled states, optional trailing icon, renders `<a>` (via `next/link`) when given `href`.
- `components/ui/input.tsx`: search/text input with leading search icon and optional `⌘K` kbd hint.
- `components/ui/select.tsx`: native select styled per the board.
- `components/ui/badge.tsx`: `video | lesson | popular`.
- `components/ui/status.tsx`: `in-progress | completed | now-playing | locked`.
- `components/ui/progress-bar.tsx`: bar + "N% complete" label, accessible `role="progressbar"`.
- `components/ui/cards.tsx`: `CourseCard`, `LessonVideoCard`, `LessonCard`, `ResourceCard` (props only, no data fetching).
- `components/ui/navigation.tsx`: `Logo`, `NavLinks` (active state), `Breadcrumbs`, `Pagination`.
- `app/design-system/page.tsx`: preview page.

## Requirements

- Match the board exactly: colors, sizes, radii, shadows, type, spacing, and the default/hover/disabled button states.
- Button: height 44px, padding 0 16px (lg) / 0 12px (md), radius 12px, Inter Medium 14–16px. Hover darkens primary; disabled uses primary-200/300 tones as shown.
- Input/Select: height 44px, radius 12px, 1px `#E2E8F0` border, padding 0 16px, focus border `#FB923C`, visible focus ring for keyboard users.
- Cards use white surface, neutral-200 border, radius per board, and the board's shadow.
- Responsive to mobile: the preview page stacks its grid; cards and nav wrap sensibly. Desktop stays exact.
- Accessibility: icons are `aria-hidden` unless labelled; pagination and breadcrumbs use `nav` + `aria-label` + `aria-current`; disabled buttons set `disabled` / `aria-disabled`.

## Security considerations

No data, secrets, tokens, or network calls. Fonts are self-hosted by `next/font`. No new runtime dependencies.

## Acceptance criteria

- Tailwind utilities exist for every token on the board and render the listed values.
- Headings use Playfair Display and body text uses Inter across the app.
- `/design-system` shows all 14 sections, and they visually match `design/vertex-designsystem.png` at desktop width.
- At 375px, `/design-system` has no horizontal scroll.
- Typecheck, lint, and build pass.

## Checks

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run dev` and load `/design-system`

## Manual test steps

1. `npm run dev`, open `http://localhost:3000/design-system`.
2. Compare each section against `design/vertex-designsystem.png`.
3. Hover each button variant; tab to the input/select and confirm the orange focus border.
4. Narrow the window to ~375px; confirm sections stack and nothing scrolls horizontally.

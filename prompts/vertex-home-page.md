# Implement the Vertex home page

## Goal

Reproduce `design/vertex-home.png` as the site's home route (`/`). It has a top nav (logo, Courses, My Learning, bell, avatar), a hero (eyebrow badge, Playfair headline, subcopy, Explore Courses CTA, a large search bar with a ⌘K hint), an "All Courses" grid of three course cards, a "new courses every week" divider, and the decorative orange bar band at the bottom. Build it with the Vertex design system that's already committed.

## Skills and docs read

- `AGENTS.md` (sections 3, 5, 7, 11, 13).
- `node_modules/next/dist/docs/01-app/03-api-reference/02-components/form.md`: `next/form` with a string action does a client-side GET navigation to `/search?q=…`.
- Fonts and CSS docs were already read for the design system task.
- Sanity skills aren't used yet, because no Sanity workspace exists (see decision 2).

## Code inspected

- `app/globals.css` tokens (primary/neutral, display/heading scale, radii, shadows).
- `components/ui/*`: `Logo`, `NavLinks`, `Input` (search + shortcut), `ButtonLink`, `CourseCard`, and the icons (`BellIcon`, `UserIcon`, `ChartIcon`, `ClockIcon`, `FileIcon`, `SearchIcon`).
- `app/page.tsx`: still the create-next-app starter, which gets replaced.
- `app/layout.tsx`: root layout with fonts; no header.

## Decisions and assumptions

1. **Route group `app/(site)/`** with a `layout.tsx` that renders the shared site chrome: the bordered center column with diagonal-hatched gutters and the `SiteHeader`. The home page moves to `app/(site)/page.tsx`. `/design-system` stays outside the group, without the chrome. Later catalog/course/lesson pages drop into the same group.
2. **Course data is a typed static module for now** (`lib/courses.ts`, three courses exactly as in the image). Its shape matches the future Sanity query (title, slug, summary, level, duration, module count, icon image), so swapping in a server-only Sanity fetch later changes only that one function. No Sanity, token, or env work in this task.
3. **Course icons** are local SVGs in `public/courses/` (Next.js "N", Docker whale, "TS"), rendered with `next/image`. Later they come from the course cover image in Sanity.
4. **Course card:** the home card is larger than the design-system `CourseCard` (72px icon, Playfair title, roomier padding, meta row under a divider). I'll add a `size="lg"` variant to the existing `CourseCard` instead of creating a new component. The meta row shows a file icon for modules, as in the image.
5. **Search bar:** a client component `HomeSearch` wraps `next/form` (`action="/search"`, input `name="q"`) in the large hero style (64px tall, 16px radius, subtle shadow, bordered ⌘K key). ⌘K / Ctrl+K focuses it. `/search` doesn't exist yet, so submitting lands on a 404 until the search task. This is expected. No LLM/MCP call happens in the browser.
6. **Links:** "Explore Courses" and "View all courses" go to `/courses`, nav links to `/courses` and `/my-learning`, and cards to `/courses/[slug]`. Those routes come in later tasks, so they 404 for now.
7. **Header auth area:** Clerk isn't wired yet. The bell is presentational (AGENTS.md section 7), and the avatar shows a neutral placeholder circle with the user icon instead of the photo in the mockup. It becomes Clerk's `UserButton` in the auth task. "Courses" isn't shown as active on the home page, which matches the image.
8. **Decorative bottom band:** pure CSS. Absolutely positioned vertical bars with a primary-300 to transparent gradient, `aria-hidden`, and heights/positions matched to the image. It hides the outer bars on small screens.
9. **No analytics yet.** PostHog's catalog-view event belongs to the analytics task.

## Files to touch

- `app/page.tsx`: delete (replaced by the route-group page).
- `app/(site)/layout.tsx`: site chrome (gutters + header).
- `app/(site)/page.tsx`: home page.
- `components/site-header.tsx`: logo, nav links, bell, avatar placeholder.
- `components/home-search.tsx`: client search form with ⌘K.
- `components/ui/cards.tsx`: add the `size="lg"` variant to `CourseCard`.
- `lib/courses.ts`: typed static course list and `getCourses()`.
- `public/courses/nextjs.svg`, `docker.svg`, `typescript.svg`: course icons.
- `public/next.svg`, `vercel.svg`, `file.svg`, `globe.svg`, `window.svg`: delete the unused starter assets.

## Requirements

- Desktop matches the image: centered ~965px bordered column, header 96px with a bottom border, eyebrow badge (primary-100 bg, primary-200 border, tracking-widest, small caps), headline Playfair ~64/72px in two lines, body-lg subcopy in neutral-700, primary CTA with an arrow and a soft orange shadow, search bar ~745px wide, section divider, "All Courses" in Playfair heading-1 with a "View all courses →" text link, a three-column grid of cards, a star divider line, and the bottom bar band.
- Responsive: the headline scales down (about 40px on mobile), the cards stack to one column at the small breakpoint and two at medium, the nav links stay visible, and the search bar goes full width. No horizontal scroll at 375px.
- Accessibility: one `h1`, a labelled search input, the decorative band `aria-hidden`, a bell button with `aria-label="Notifications"`, and an avatar with `aria-label="Account"`.

## Security considerations

No secrets, tokens, or network calls. The search form only navigates (GET) to `/search?q=`. The browser never calls the MCP or the LLM.

## Acceptance criteria

- `/` renders the home page matching `design/vertex-home.png` at desktop width.
- ⌘K / Ctrl+K focuses the search; Enter navigates to `/search?q=<text>`.
- `/design-system` still renders, without the site header.
- At 375px, nothing scrolls horizontally.
- Typecheck, lint, and build pass.

## Checks

- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run dev`, load `/` and `/design-system`

## Manual test steps

1. `npm run dev`, open `http://localhost:3000/`.
2. Compare with `design/vertex-home.png` side by side.
3. Press ⌘K (Ctrl+K on Windows): the search input focuses. Type "caching" and press Enter: the URL becomes `/search?q=caching` (a 404 for now is expected).
4. Hover the CTA, "View all courses", and the cards.
5. Narrow to ~375px: the cards stack, the headline shrinks, and nothing scrolls sideways.
6. Open `/design-system`: it's unchanged and has no header.

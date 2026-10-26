# Set up Clerk authentication

## Goal

Add Clerk to the web app, linked to the Clerk application the user already chose in the Clerk Dashboard (`app_3LD5aWqBw03iBjqjco4QHOLP7Ua`). Browsing stays public. The header gets real auth controls: a sign-in button when signed out, and Clerk's `UserButton` in place of the avatar placeholder when signed in. Put the protection boundary in `proxy.ts` so later features (progress API, My Learning) can gate their routes there.

## Skills and docs read

- `AGENTS.md` sections 2, 3, 5, 6, 7, 12, 13.
- Clerk setup instructions (the pasted `clerk-setup` flow), including the dashboard-selected application note.
- `.agents/skills/clerk-nextjs-patterns` template (`proxy.ts` with `clerkMiddleware` and the standard matcher).
- `node_modules/next/dist/docs/01-app/01-getting-started/16-proxy.md`: in Next 16, Middleware is called **Proxy** and lives in root `proxy.ts`.

## Code inspected

- `package.json`: Next 16.4.3, React 19.3, npm (`package-lock.json`). No auth packages.
- No existing auth: no `proxy.ts`/`middleware.ts`, no sessions, no auth routes. So no migration is needed.
- `next.config.ts`: `cacheComponents: true`. Any request-reading auth UI must therefore sit inside `<Suspense>`, or `next build` fails.
- `app/layout.tsx`: root layout with fonts and `<body>`, no providers.
- `components/site-header.tsx`: bell plus a placeholder avatar `<span>` (40px, 52px at `sm`) marked "Placeholder until Clerk's UserButton is wired".
- `.gitignore`: ignores `.env*`, so `.env.example` needs an exception.
- No `components.json`, so the shadcn step does not apply.
- Env files were deliberately **not** read.

## Decisions and assumptions

1. **Use the existing Clerk app.** Run `npx -y clerk@latest init --app app_3LD5aWqBw03iBjqjco4QHOLP7Ua --no-skills` from the repo root.
   - `--no-skills`: Clerk's skills are already installed in `.agents/skills`.
   - Do not pass `--framework`/`--pm` (existing project, so let init detect them).
   - **Prerequisite:** this targets an account-level app, so the user must first run `npx -y clerk@latest auth login` in their own terminal. Without it, the run stops and we do not fall back to accountless.
2. **Current SDK (`@clerk/nextjs`, Core 3).** Fresh install, so:
   - `ClerkProvider` goes **inside `<body>`**.
   - Use `<Show when=…>` (not `SignedIn`/`SignedOut`).
   - `auth()` is always awaited.
3. **`proxy.ts` at the root** with `clerkMiddleware` and the standard matcher. If init writes `middleware.ts`, rename it to `proxy.ts` (Next 16 convention). Add a `createRouteMatcher` list of protected routes:
   - It starts with `/my-learning(.*)` (per-user page) and `/api/progress(.*)` (future progress writes), both calling `auth.protect()`.
   - Everything else stays public.
4. **Header controls** (`components/site-header.tsx`), inside one `<Suspense>` whose fallback is the current placeholder avatar, so there is no layout shift:
   - Signed in: `UserButton` sized to the existing avatar (40px, 52px at `sm`).
   - Signed out: `SignInButton mode="modal"` wrapping the existing `Button` component in its small/secondary style. No new styling, since the design only shows the signed-in avatar.
5. **Sign-in/up pages.** If init creates catch-all `sign-in`/`sign-up` routes, keep them and wrap `<SignIn />`/`<SignUp />` in `<Suspense>` (required with `cacheComponents`). Otherwise the modal is enough and no pages are added.
6. **Env.**
   - Init writes the keys to the env file it detects (`.env.local`). I won't read or print it.
   - Add a committed `.env.example` listing `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=` and `CLERK_SECRET_KEY=` (empty values).
   - Add `!.env.example` to `.gitignore`.
7. **Out of scope:** progress storage, webhooks/user sync, Organizations, PostHog identify. Those belong to their own tasks.

## Files expected to touch

- `package.json`, `package-lock.json`: `@clerk/nextjs` (via init).
- `proxy.ts`: new.
- `app/layout.tsx`: `ClerkProvider` inside `<body>`.
- `components/site-header.tsx`: auth controls.
- `app/sign-in/[[...sign-in]]/page.tsx`, `app/sign-up/[[...sign-up]]/page.tsx`: only if init creates them (Suspense-wrapped).
- `.env.example`: new. `.gitignore`: add the exception.
- `.env.local`: written by the CLI, never read or committed.

## Requirements

- `CLERK_SECRET_KEY` is never imported or referenced in client code. Only the `NEXT_PUBLIC_` key reaches the browser.
- Protection happens in `proxy.ts`, not in client code.
- `next build` passes with `cacheComponents: true`, with no uncached request data outside Suspense.
- On desktop the header layout matches the current design: same avatar size and position.

## Security considerations

- Secret key stays server-only, and env files stay gitignored.
- No client-side gating is relied on for protected routes.
- Free preview remains a label, not access control.

## Acceptance criteria

- Signed out: the header shows "Sign in", and the home page renders publicly.
- Signing in through the modal replaces the button with the `UserButton` avatar.
- Visiting `/my-learning` while signed out redirects to sign-in. (The page itself doesn't exist yet, so after sign-in it 404s, which is expected.)
- `clerk doctor` reports no errors.

## Checks to run

- `npx -y clerk@latest doctor`
- `npx tsc --noEmit`
- `npm run lint`
- `npm run build`
- `npm run dev`, then load `/` and confirm the header controls render.

## Manual test steps

1. In your own terminal: `npx -y clerk@latest auth login` (before I run init).
2. `npm run dev` and open http://localhost:3000. Confirm "Sign in" appears top-right.
3. Click "Sign in", then sign up with your email. Confirm the avatar (`UserButton`) appears in its place.
4. Open the avatar menu, sign out, and confirm the button returns.
5. Signed out, visit http://localhost:3000/my-learning and confirm you're redirected to sign-in.

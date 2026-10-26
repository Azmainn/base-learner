import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Browsing is public; only per-learner surfaces are gated (AGENTS.md §7).
const isProtectedRoute = createRouteMatcher([
  "/my-learning(.*)",
  "/api/progress(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) await auth.protect();
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};

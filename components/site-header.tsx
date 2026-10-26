import { Show, SignInButton, UserButton } from "@clerk/nextjs";
import { Suspense } from "react";
import { Button } from "@/components/ui/button";
import { BellIcon, UserIcon } from "@/components/ui/icons";
import { Logo, NavLinks } from "@/components/ui/navigation";

const links = [
  { href: "/courses", label: "Courses" },
  { href: "/my-learning", label: "My Learning" },
];

const avatarSize = "size-10 sm:size-[52px]";

function AvatarPlaceholder() {
  return (
    <span
      aria-label="Account"
      role="img"
      className={`flex ${avatarSize} items-center justify-center rounded-full border-2 border-white bg-neutral-200 text-neutral-500 shadow-md`}
    >
      <UserIcon filled size={24} />
    </span>
  );
}

export function SiteHeader({ active }: { active?: string }) {
  return (
    <header className="flex flex-wrap items-center justify-between gap-x-4 gap-y-3 border-b border-neutral-200/70 px-4 py-4 sm:h-24 sm:flex-nowrap sm:px-10 sm:py-0">
      <div className="contents sm:flex sm:items-center sm:gap-16">
        <Logo className="[&_span]:text-[22px] sm:[&_span]:text-[24px]" />
        {/* Below sm the nav drops to its own row under the logo. */}
        <NavLinks
          links={links}
          active={active}
          className="order-last w-full gap-6 sm:order-none sm:w-auto sm:gap-11"
        />
      </div>
      <div className="flex items-center gap-3 sm:gap-6">
        {/* Presentational until notifications exist (AGENTS.md §7). */}
        <button
          type="button"
          aria-label="Notifications"
          className="rounded-full p-1.5 text-neutral-900 transition-colors hover:bg-neutral-100"
        >
          <BellIcon size={22} />
        </button>
        {/* Auth state reads the request, so it streams in behind the placeholder (cacheComponents). */}
        <Suspense fallback={<AvatarPlaceholder />}>
          <Show when="signed-out">
            <SignInButton mode="modal">
              <Button variant="secondary" size="md">
                Sign in
              </Button>
            </SignInButton>
          </Show>
          <Show when="signed-in">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: `${avatarSize} border-2 border-white shadow-md`,
                },
              }}
            />
          </Show>
        </Suspense>
      </div>
    </header>
  );
}

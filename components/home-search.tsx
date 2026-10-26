"use client";

import Form from "next/form";
import { useEffect, useRef } from "react";
import { SearchIcon } from "@/components/ui/icons";

export function HomeSearch() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        inputRef.current?.focus();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  return (
    <Form action="/search" role="search" className="relative w-full">
      <SearchIcon
        size={26}
        className="pointer-events-none absolute top-1/2 left-6 -translate-y-1/2 text-neutral-700"
      />
      <input
        ref={inputRef}
        type="search"
        name="q"
        required
        aria-label="Search your learning"
        placeholder="Ask anything about your learning..."
        className="h-[72px] w-full rounded-lg border border-neutral-200 bg-white pr-6 pl-[68px] text-body-lg text-neutral-900 shadow-md outline-none transition-colors placeholder:text-neutral-500 focus:border-primary-400 focus-visible:ring-4 focus-visible:ring-primary-100 sm:h-[84px] sm:pr-24 sm:text-[20px]"
      />
      <kbd className="pointer-events-none absolute top-1/2 right-6 hidden h-10 -translate-y-1/2 items-center rounded-sm border border-neutral-200 bg-white px-3 font-sans text-body-lg text-neutral-900 sm:inline-flex">
        ⌘ K
      </kbd>
    </Form>
  );
}

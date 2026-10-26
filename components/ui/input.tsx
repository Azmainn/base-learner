import type { InputHTMLAttributes } from "react";
import { cn } from "./cn";
import { SearchIcon } from "./icons";

export const fieldClasses =
  "h-11 w-full rounded-md border border-neutral-200 bg-white px-4 text-body text-neutral-900 placeholder:text-neutral-500 outline-none transition-colors focus:border-primary-400 focus-visible:ring-2 focus-visible:ring-primary-100";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  search?: boolean;
  shortcut?: string;
};

export function Input({ search, shortcut, className, ...props }: InputProps) {
  return (
    <div className={cn("relative", className)}>
      {search ? (
        <SearchIcon
          size={18}
          className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-neutral-700"
        />
      ) : null}
      <input
        type={search ? "search" : "text"}
        className={cn(fieldClasses, search && "pl-11", shortcut && "pr-14")}
        {...props}
      />
      {shortcut ? (
        <kbd className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 font-sans text-small font-semibold text-neutral-900">
          {shortcut}
        </kbd>
      ) : null}
    </div>
  );
}

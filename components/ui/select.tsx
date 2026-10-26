import type { SelectHTMLAttributes } from "react";
import { cn } from "./cn";
import { ChevronDownIcon } from "./icons";
import { fieldClasses } from "./input";

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & {
  options: Array<{ value: string; label: string }>;
};

export function Select({ options, className, ...props }: SelectProps) {
  return (
    <div className={cn("relative", className)}>
      <select className={cn(fieldClasses, "appearance-none pr-11 font-medium")} {...props}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <ChevronDownIcon
        size={18}
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-neutral-900"
      />
    </div>
  );
}

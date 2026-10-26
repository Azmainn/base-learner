import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "./cn";

type Variant = "primary" | "secondary" | "tertiary" | "text";
type Size = "md" | "lg";

const base =
  "inline-flex h-11 items-center justify-center gap-2 rounded-md text-body font-medium whitespace-nowrap transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-400 disabled:cursor-not-allowed aria-disabled:pointer-events-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-primary-500 text-white hover:bg-primary-600 disabled:bg-primary-200 disabled:text-primary-100 aria-disabled:bg-primary-200 aria-disabled:text-primary-100",
  secondary:
    "border border-primary-500 bg-white text-primary-500 hover:border-primary-600 hover:bg-primary-100 hover:text-primary-600 disabled:border-primary-200 disabled:bg-white disabled:text-primary-300 aria-disabled:border-primary-200 aria-disabled:text-primary-300",
  tertiary:
    "border border-neutral-200 bg-white text-neutral-900 hover:border-neutral-300 hover:bg-neutral-50 disabled:text-neutral-300 aria-disabled:text-neutral-300",
  text: "h-auto text-primary-500 hover:text-primary-600 disabled:text-primary-200 aria-disabled:text-primary-200",
};

const sizes: Record<Size, string> = {
  md: "px-3",
  lg: "px-4",
};

type StyleProps = {
  variant?: Variant;
  size?: Size;
  icon?: ReactNode;
  className?: string;
  children: ReactNode;
};

function buttonClasses({ variant = "primary", size = "lg", className }: StyleProps) {
  return cn(base, variants[variant], variant !== "text" && sizes[size], className);
}

export function Button({
  variant,
  size,
  icon,
  className,
  children,
  ...props
}: StyleProps & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      type="button"
      className={buttonClasses({ variant, size, className, children })}
      {...props}
    >
      {children}
      {icon}
    </button>
  );
}

export function ButtonLink({
  href,
  disabled,
  variant,
  size,
  icon,
  className,
  children,
}: StyleProps & { href: string; disabled?: boolean }) {
  const classes = buttonClasses({ variant, size, className, children });
  if (disabled) {
    return (
      <a aria-disabled="true" className={classes}>
        {children}
        {icon}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {children}
      {icon}
    </Link>
  );
}

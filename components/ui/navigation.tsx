import Link from "next/link";
import { cn } from "./cn";
import { ChevronLeftIcon, ChevronRightIcon, VertexLogoMark } from "./icons";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("inline-flex items-center gap-2", className)}>
      <VertexLogoMark size={26} className="text-primary-500" />
      <span className="text-heading-3 font-semibold tracking-tight text-neutral-900">Vertex</span>
    </Link>
  );
}

export function NavLinks({
  links,
  active,
  className,
}: {
  links: Array<{ href: string; label: string }>;
  active?: string;
  className?: string;
}) {
  return (
    <nav aria-label="Main" className={cn("flex items-center gap-8", className)}>
      {links.map((link) => {
        const isActive = link.href === active;
        return (
          <Link
            key={link.href}
            href={link.href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "text-body font-medium transition-colors",
              isActive ? "text-primary-500" : "text-neutral-900 hover:text-primary-500",
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function Breadcrumbs({
  items,
  className,
}: {
  items: Array<{ label: string; href?: string }>;
  className?: string;
}) {
  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex flex-wrap items-center gap-2 text-small text-neutral-500">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={`${item.label}-${i}`} className="flex items-center gap-2">
              {item.href && !isLast ? (
                <Link href={item.href} className="hover:text-neutral-900">
                  {item.label}
                </Link>
              ) : (
                <span aria-current={isLast ? "page" : undefined}>{item.label}</span>
              )}
              {!isLast ? <ChevronRightIcon size={14} className="text-neutral-500" /> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function pageList(current: number, total: number): Array<number | "…"> {
  if (total <= 5) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 3) return [1, 2, 3, "…", total];
  if (current >= total - 2) return [1, "…", total - 2, total - 1, total];
  return [1, "…", current, "…", total];
}

export function Pagination({
  current,
  total,
  hrefFor,
  className,
}: {
  current: number;
  total: number;
  hrefFor: (page: number) => string;
  className?: string;
}) {
  const cell =
    "inline-flex size-8 items-center justify-center rounded-sm text-small font-medium text-neutral-900 transition-colors";
  const arrow = (page: number, label: string, icon: React.ReactNode) =>
    page < 1 || page > total ? (
      <span aria-disabled="true" className={cn(cell, "text-neutral-300")}>
        {icon}
      </span>
    ) : (
      <Link href={hrefFor(page)} aria-label={label} className={cn(cell, "hover:bg-neutral-100")}>
        {icon}
      </Link>
    );

  return (
    <nav aria-label="Pagination" className={className}>
      <ul className="flex items-center gap-3">
        <li>{arrow(current - 1, "Previous page", <ChevronLeftIcon size={16} />)}</li>
        {pageList(current, total).map((page, i) => (
          <li key={`${page}-${i}`}>
            {page === "…" ? (
              <span className={cn(cell, "text-neutral-500")}>…</span>
            ) : page === current ? (
              <span
                aria-current="page"
                className={cn(cell, "border border-primary-400 bg-primary-100 text-primary-600")}
              >
                {page}
              </span>
            ) : (
              <Link href={hrefFor(page)} className={cn(cell, "hover:bg-neutral-100")}>
                {page}
              </Link>
            )}
          </li>
        ))}
        <li>{arrow(current + 1, "Next page", <ChevronRightIcon size={16} />)}</li>
      </ul>
    </nav>
  );
}

import { cn } from "./cn";

export function ProgressBar({
  value,
  showLabel = true,
  className,
}: {
  value: number;
  showLabel?: boolean;
  className?: string;
}) {
  const pct = Math.round(Math.min(100, Math.max(0, value)));
  return (
    <div className={cn("flex items-center gap-6", className)}>
      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={pct}
        aria-label="Progress"
        className="h-1.5 flex-1 overflow-hidden rounded-full bg-neutral-100"
      >
        <div className="h-full rounded-full bg-primary-500" style={{ width: `${pct}%` }} />
      </div>
      {showLabel ? (
        <span className="shrink-0 text-small text-neutral-700">
          <span className="font-semibold text-neutral-900">{pct}%</span> complete
        </span>
      ) : null}
    </div>
  );
}

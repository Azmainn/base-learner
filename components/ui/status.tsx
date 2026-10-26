import { cn } from "./cn";
import { CheckCircleIcon, LockIcon, PlayCircleIcon, ProgressCircleIcon } from "./icons";

type Kind = "in-progress" | "completed" | "now-playing" | "locked";

const config: Record<Kind, { label: string; icon: React.ReactNode }> = {
  "in-progress": {
    label: "In Progress",
    icon: <ProgressCircleIcon size={18} className="text-primary-500" />,
  },
  completed: {
    label: "Completed",
    icon: <CheckCircleIcon size={18} className="text-success-600" />,
  },
  "now-playing": {
    label: "Now Playing",
    icon: <PlayCircleIcon filled size={18} className="text-primary-500" />,
  },
  locked: {
    label: "Locked",
    icon: <LockIcon size={18} className="text-neutral-900" />,
  },
};

export function Status({
  kind,
  label,
  className,
}: {
  kind: Kind;
  label?: string;
  className?: string;
}) {
  const { label: defaultLabel, icon } = config[kind];
  return (
    <span className={cn("inline-flex items-center gap-2 text-small font-medium text-neutral-900", className)}>
      {icon}
      {label ?? defaultLabel}
    </span>
  );
}

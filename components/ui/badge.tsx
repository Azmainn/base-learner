import { cn } from "./cn";

type Tone = "video" | "lesson" | "popular";

const tones: Record<Tone, string> = {
  video: "border-primary-200 bg-primary-100 text-primary-600",
  lesson: "border-lesson-200 bg-lesson-50 text-lesson-600",
  popular: "border-primary-200 bg-primary-100 text-primary-600",
};

const labels: Record<Tone, string> = {
  video: "Video",
  lesson: "Lesson",
  popular: "Popular",
};

export function Badge({
  tone,
  children,
  className,
}: {
  tone: Tone;
  children?: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 items-center rounded-xs border px-2 text-[11px] leading-none font-semibold tracking-wider uppercase",
        tones[tone],
        className,
      )}
    >
      {children ?? labels[tone]}
    </span>
  );
}

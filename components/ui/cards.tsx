import Link from "next/link";
import type { ReactNode } from "react";
import { Badge } from "./badge";
import { cn } from "./cn";
import {
  ChartIcon,
  ClockIcon,
  ExternalLinkIcon,
  FileIcon,
  FolderIcon,
  PlayCircleIcon,
} from "./icons";

const surface = "rounded-md border border-neutral-200 bg-white shadow-sm";

function Meta({ icon, children }: { icon: ReactNode; children: ReactNode }) {
  return (
    <span className="inline-flex items-center gap-1.5 text-small text-neutral-700">
      {icon}
      {children}
    </span>
  );
}

function Dot() {
  return <span aria-hidden className="size-1 rounded-full bg-neutral-500" />;
}

export function CourseCard({
  href,
  title,
  summary,
  icon,
  level,
  duration,
  modules,
  size = "md",
  className,
}: {
  href: string;
  title: string;
  summary: string;
  icon: ReactNode;
  level: string;
  duration: string;
  modules: number;
  size?: "md" | "lg";
  className?: string;
}) {
  if (size === "lg") {
    return (
      <Link
        href={href}
        className={cn(
          "flex flex-col rounded-lg border border-neutral-200 bg-white px-6 pt-8 pb-6 shadow-sm transition-shadow hover:shadow-lg",
          className,
        )}
      >
        <div className="size-[72px] overflow-hidden rounded-sm">{icon}</div>
        <h3 className="mt-6 font-display text-[22px] leading-[30px] font-normal text-neutral-900">
          {title}
        </h3>
        <p className="mt-4 text-body leading-6 text-neutral-700">{summary}</p>
        <div className="mt-auto flex items-center justify-between gap-2 border-t border-neutral-100 pt-5 [&>span]:gap-1.5 [&>span]:text-[10px] [&>span]:whitespace-nowrap">
          <Meta icon={<ChartIcon size={13} />}>{level}</Meta>
          <Meta icon={<ClockIcon size={13} />}>{duration}</Meta>
          <Meta icon={<FileIcon size={13} />}>{modules} modules</Meta>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(surface, "flex flex-col gap-6 p-5 transition-shadow hover:shadow-md", className)}
    >
      <div className="flex gap-4">
        <div className="flex size-10 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-neutral-900 text-white">
          {icon}
        </div>
        <div>
          <h3 className="text-body font-semibold text-neutral-900">{title}</h3>
          <p className="mt-1 text-small text-neutral-500">{summary}</p>
        </div>
      </div>
      <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2">
        <Meta icon={<ChartIcon size={14} />}>{level}</Meta>
        <Meta icon={<ClockIcon size={14} />}>{duration}</Meta>
        <Meta icon={<FolderIcon size={14} />}>{modules} modules</Meta>
      </div>
    </Link>
  );
}

export function LessonVideoCard({
  href,
  title,
  description,
  lessonLabel,
  duration,
  startLabel,
  className,
}: {
  href: string;
  title: string;
  description: string;
  lessonLabel: string;
  duration: string;
  startLabel: string;
  className?: string;
}) {
  return (
    <article className={cn(surface, "flex flex-col gap-3 p-4", className)}>
      <Badge tone="video" className="self-start" />
      <h3 className="text-body font-semibold text-neutral-900">{title}</h3>
      <p className="text-small text-neutral-700">{description}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
        <span className="inline-flex items-center gap-2 text-small text-neutral-700">
          {lessonLabel}
          <Dot />
          {duration}
        </span>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-small font-medium text-primary-500 hover:text-primary-600"
        >
          <PlayCircleIcon size={16} />
          Watch from {startLabel}
        </Link>
      </div>
    </article>
  );
}

export function LessonCard({
  href,
  title,
  description,
  moduleLabel,
  className,
}: {
  href: string;
  title: string;
  description: string;
  moduleLabel: string;
  className?: string;
}) {
  return (
    <article className={cn(surface, "flex flex-col gap-3 p-4", className)}>
      <Badge tone="lesson" className="self-start" />
      <h3 className="text-body font-semibold text-neutral-900">{title}</h3>
      <p className="text-small text-neutral-700">{description}</p>
      <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-2">
        <span className="text-small text-neutral-700">{moduleLabel}</span>
        <Link
          href={href}
          className="inline-flex items-center gap-1.5 text-small font-medium text-primary-500 hover:text-primary-600"
        >
          View lesson
          <ExternalLinkIcon size={16} />
        </Link>
      </div>
    </article>
  );
}

export function ResourceCard({
  href,
  title,
  description,
  type,
  size,
  className,
}: {
  href: string;
  title: string;
  description: string;
  type: string;
  size?: string;
  className?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(surface, "flex flex-col gap-6 p-4 transition-shadow hover:shadow-md", className)}
    >
      <div className="flex gap-4">
        <FileIcon size={22} className="shrink-0 text-neutral-900" />
        <div>
          <h3 className="text-body font-semibold text-neutral-900">{title}</h3>
          <p className="mt-1 text-small text-neutral-700">{description}</p>
        </div>
      </div>
      <div className="mt-auto flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-small text-neutral-700">
          {type}
          {size ? (
            <>
              <Dot />
              {size}
            </>
          ) : null}
        </span>
        <ExternalLinkIcon size={16} className="text-primary-500" />
      </div>
    </a>
  );
}

import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CourseCard, LessonCard, LessonVideoCard, ResourceCard } from "@/components/ui/cards";
import { cn } from "@/components/ui/cn";
import {
  AccessibilityIcon,
  BellIcon,
  BookmarkIcon,
  ChartIcon,
  ChevronRightIcon,
  ClockIcon,
  ExternalLinkIcon,
  EyeIcon,
  FileIcon,
  GridIcon,
  PlayCircleIcon,
  SearchIcon,
  TargetIcon,
  UserIcon,
  VertexLogoMark,
} from "@/components/ui/icons";
import { Input } from "@/components/ui/input";
import { Breadcrumbs, Logo, NavLinks, Pagination } from "@/components/ui/navigation";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Select } from "@/components/ui/select";
import { Status } from "@/components/ui/status";

export const metadata: Metadata = {
  title: "Design System · Vertex",
};

const primary = [
  { name: "Primary 500", hex: "#F97316", className: "bg-primary-500" },
  { name: "Primary 400", hex: "#FB923C", className: "bg-primary-400" },
  { name: "Primary 300", hex: "#FDBA74", className: "bg-primary-300" },
  { name: "Primary 200", hex: "#FED7AA", className: "bg-primary-200" },
  { name: "Primary 100", hex: "#FFEEE5", className: "bg-primary-100" },
];

const neutral = [
  { name: "Neutral 900", hex: "#0F172A", className: "bg-neutral-900" },
  { name: "Neutral 700", hex: "#334155", className: "bg-neutral-700" },
  { name: "Neutral 500", hex: "#64748B", className: "bg-neutral-500" },
  { name: "Neutral 300", hex: "#CBD5E1", className: "bg-neutral-300" },
  { name: "Neutral 200", hex: "#E2E8F0", className: "bg-neutral-200" },
  { name: "Neutral 100", hex: "#F1F5F9", className: "bg-neutral-100" },
  { name: "Neutral 50", hex: "#FAFAFC", className: "bg-neutral-50 border border-neutral-200" },
  { name: "White", hex: "#FFFFFF", className: "bg-white border border-neutral-200" },
];

const typeScale = [
  ["Display 1", "font-display text-[17px] font-medium", "Playfair Display", "48 / 56", "Bold", "Page titles"],
  ["Display 2", "font-display text-[15px] font-medium", "Playfair Display", "36 / 44", "Bold", "Section titles"],
  ["Heading 1", "", "Inter", "28 / 36", "Semi Bold", "Card titles"],
  ["Heading 2", "", "Inter", "22 / 30", "Semi Bold", "Sub section"],
  ["Heading 3", "", "Inter", "18 / 26", "Medium", "Small titles"],
  ["Body Large", "", "Inter", "16 / 24", "Regular", "Body copy"],
  ["Body", "", "Inter", "14 / 20", "Regular", "Supporting text"],
  ["Small", "", "Inter", "12 / 16", "Regular", "Captions, meta"],
] as const;

const spacing = [
  [4, "0.25rem"],
  [8, "0.5rem"],
  [12, "0.75rem"],
  [16, "1rem"],
  [24, "1.5rem"],
  [32, "2rem"],
  [40, "2.5rem"],
  [48, "3rem"],
  [64, "4rem"],
] as const;

const radii = [
  ["4px", "xs", "rounded-xs"],
  ["8px", "sm", "rounded-sm"],
  ["12px", "md", "rounded-md"],
  ["16px", "lg", "rounded-lg"],
  ["24px", "xl", "rounded-xl"],
  ["Full", "circle", "rounded-full"],
] as const;

const shadows = [
  ["Sm", "0 1px 2px 0", "rgba(15, 23, 42, 0.05)", "shadow-sm"],
  ["Md", "0 4px 12px -2px", "rgba(15, 23, 42, 0.08)", "shadow-md"],
  ["Lg", "0 12px 24px -4px", "rgba(15, 23, 42, 0.10)", "shadow-lg"],
  ["Xl", "0 20px 40px -8px", "rgba(15, 23, 42, 0.12)", "shadow-xl"],
] as const;

const icons = [
  BellIcon,
  SearchIcon,
  PlayCircleIcon,
  FileIcon,
  BookmarkIcon,
  ChartIcon,
  ClockIcon,
  UserIcon,
  ChevronRightIcon,
];

const principles = [
  { icon: EyeIcon, title: "Clarity First", body: "Every element should communicate clearly." },
  { icon: GridIcon, title: "Consistency", body: "Use components and patterns consistently across the platform." },
  { icon: TargetIcon, title: "Focus & Calm", body: "Remove noise and help learners focus on what matters." },
  { icon: AccessibilityIcon, title: "Accessible", body: "Design with accessibility and inclusivity in mind." },
];

function Panel({
  number,
  title,
  className,
  children,
}: {
  number: string;
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("rounded-lg bg-white/70 p-6", className)}>
      <h2 className="mb-5 flex items-center gap-4 text-small font-semibold tracking-[0.12em] text-neutral-900 uppercase">
        <span className="text-primary-500">{number}</span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function Label({ children }: { children: ReactNode }) {
  return <p className="mb-3 text-small font-medium text-neutral-900">{children}</p>;
}

function Specs({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="mt-6">
      <Label>{title}</Label>
      <ul className="list-disc space-y-1 pl-5 text-[11px] leading-4 text-neutral-700 marker:text-neutral-500">
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

function Swatch({ name, hex, className }: { name: string; hex: string; className: string }) {
  return (
    <div>
      <div className={cn("h-11 w-full rounded-xs", className)} />
      <p className="mt-2 text-[11px] leading-4 text-neutral-700">{name}</p>
      <p className="text-[11px] leading-4 text-neutral-700">{hex}</p>
    </div>
  );
}

export default function DesignSystemPage() {
  return (
    <main className="mx-auto w-full max-w-[1024px] space-y-3 bg-[#fbf9f8] p-3 sm:p-4">
      {/* Intro + 01 Colors */}
      <div className="grid gap-3 rounded-lg bg-white/70 lg:grid-cols-[300px_1fr]">
        <div className="p-6 lg:border-r lg:border-neutral-100">
          <div className="flex items-center gap-2">
            <VertexLogoMark size={36} className="text-primary-500" />
            <span className="text-heading-1 font-semibold tracking-tight">Vertex</span>
          </div>
          <h1 className="mt-6 font-display text-[38px] leading-[1.15] font-medium">Design System</h1>
          <p className="mt-5 text-body leading-[1.6] text-neutral-700">
            A unified design language for Vertex learning platform. Clean, modern and focused on
            clarity, consistency and intuitive learning experiences.
          </p>
          <p className="mt-8 text-[10px] tracking-[0.12em] text-neutral-700 uppercase">
            Version 1.0 <span className="mx-2">•</span> May 2025
          </p>
        </div>
        <Panel number="01" title="Colors" className="bg-transparent">
          <Label>Primary</Label>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-5 sm:gap-7">
            {primary.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
          <div className="mt-5">
            <Label>Neutral</Label>
          </div>
          <div className="grid grid-cols-4 gap-4 sm:grid-cols-8 sm:gap-6">
            {neutral.map((c) => (
              <Swatch key={c.name} {...c} />
            ))}
          </div>
        </Panel>
      </div>

      {/* 02 Typography + 03 Type scale */}
      <div className="grid gap-3 lg:grid-cols-[416px_1fr]">
        <Panel number="02" title="Typography">
          <div className="space-y-6">
            <div className="flex items-center gap-12">
              <span className="w-24 font-display text-[52px] leading-none">Ag</span>
              <div>
                <p className="font-display text-heading-3 font-normal">Playfair Display</p>
                <p className="mt-2 text-small text-neutral-700">
                  Elegant <span className="mx-1 text-primary-500">•</span> Readable{" "}
                  <span className="mx-1 text-primary-500">•</span> Timeless
                </p>
              </div>
            </div>
            <div className="flex items-center gap-12">
              <span className="w-24 text-[50px] leading-none">Ag</span>
              <div>
                <p className="text-heading-3 font-normal">Inter</p>
                <p className="mt-2 text-small text-neutral-700">
                  Clean <span className="mx-1 text-primary-500">•</span> Modern{" "}
                  <span className="mx-1 text-primary-500">•</span> Highly legible
                </p>
              </div>
            </div>
          </div>
        </Panel>
        <Panel number="03" title="Type Scale">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[480px] text-left text-[10px] text-neutral-700">
              <thead>
                <tr className="text-neutral-900">
                  {["Style", "Font", "Size / Line Height", "Weight", "Use"].map((h) => (
                    <th key={h} className="pb-3 font-normal">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {typeScale.map(([style, cls, font, size, weight, use]) => (
                  <tr key={style}>
                    <td className={cn("py-1 text-small text-neutral-900", cls)}>{style}</td>
                    <td className="py-1">{font}</td>
                    <td className="py-1">{size}</td>
                    <td className="py-1">{weight}</td>
                    <td className="py-1">{use}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      {/* 04 Spacing + 05 Radius & shadows */}
      <div className="grid gap-3 lg:grid-cols-[524px_1fr]">
        <Panel number="04" title="Spacing System">
          <p className="-mt-2 text-small">Base unit: 4px</p>
          <div className="mt-8 flex flex-wrap items-end justify-between gap-y-6">
            {spacing.map(([px, rem]) => (
              <div key={px} className="flex w-12 flex-col items-center gap-3">
                <div className="flex h-12 items-end">
                  <div
                    className="rounded-xs bg-primary-200/70"
                    style={{ width: Math.max(6, px * 0.55), height: Math.max(6, px * 0.65) }}
                  />
                </div>
                <div className="text-center text-[10px] leading-4">
                  <p className="text-small text-neutral-900">{px}</p>
                  <p className="text-neutral-700">({rem})</p>
                </div>
              </div>
            ))}
          </div>
        </Panel>
        <Panel number="05" title="Radius & Shadows">
          <Label>Radius</Label>
          <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
            {radii.map(([value, name, cls]) => (
              <div key={name} className="flex flex-col items-center gap-2">
                <div className={cn("size-9 border border-neutral-200 bg-white", cls)} />
                <p className="text-center text-[10px] leading-4 text-neutral-700">
                  {value}
                  <br />({name})
                </p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <Label>Shadows</Label>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {shadows.map(([name, offset, color, cls]) => (
              <div key={name} className={cn("rounded-sm bg-white p-3", cls)}>
                <p className="text-small font-medium text-neutral-900">{name}</p>
                <p className="mt-2 text-[9px] leading-4 text-neutral-700">
                  {offset}
                  <br />
                  {color}
                </p>
              </div>
            ))}
          </div>
        </Panel>
      </div>

      {/* 06 Icons + 07 Buttons + 08 Inputs */}
      <div className="grid gap-3 lg:grid-cols-[308px_1fr_224px]">
        <Panel number="06" title="Icons">
          <Label>Outline Style</Label>
          <div className="flex flex-wrap justify-between gap-3 text-neutral-900">
            {icons.map((Icon, i) => (
              <Icon key={i} size={18} />
            ))}
          </div>
          <div className="mt-6">
            <Label>Filled Style</Label>
          </div>
          <div className="flex flex-wrap justify-between gap-3 text-neutral-900">
            {icons.map((Icon, i) => (
              <Icon key={i} size={18} filled />
            ))}
          </div>
          <Specs
            title="Icon Specs"
            items={["24x24px grid", "2px stroke width (outline)", "Rounded line caps", "Consistent optical balance"]}
          />
        </Panel>
        <Panel number="07" title="Buttons">
          <div className="overflow-x-auto">
            <div className="grid min-w-[400px] grid-cols-[56px_repeat(4,auto)] items-center gap-x-4 gap-y-3">
              <span />
              {["Primary", "Secondary", "Tertiary", "Text"].map((h) => (
                <span key={h} className="text-small text-neutral-700">
                  {h}
                </span>
              ))}
              {(["Default", "Hover", "Disabled"] as const).map((state) => {
                const disabled = state === "Disabled";
                const hover = state === "Hover";
                return [
                  <span key={`${state}-label`} className="text-small text-neutral-900">
                    {state}
                  </span>,
                  <Button
                    key={`${state}-p`}
                    size="md"
                    disabled={disabled}
                    className={cn("h-9 text-small", hover && "bg-primary-600")}
                  >
                    Get Started
                  </Button>,
                  <Button
                    key={`${state}-s`}
                    variant="secondary"
                    size="md"
                    disabled={disabled}
                    className={cn("h-9 text-small", hover && "border-primary-600 bg-primary-100 text-primary-600")}
                  >
                    Explore Courses
                  </Button>,
                  <Button
                    key={`${state}-t`}
                    variant="tertiary"
                    size="md"
                    disabled={disabled}
                    className={cn("h-9 text-small", hover && "border-neutral-300 bg-neutral-50")}
                    icon={<ExternalLinkIcon size={14} />}
                  >
                    View Lesson
                  </Button>,
                  <Button
                    key={`${state}-x`}
                    variant="text"
                    disabled={disabled}
                    className={cn("justify-start text-small", hover && "text-primary-600")}
                    icon={<PlayCircleIcon size={14} />}
                  >
                    Watch Video
                  </Button>,
                ];
              })}
            </div>
          </div>
          <Specs
            title="Button Specs"
            items={[
              "Height: 44px (default)",
              "Padding: 0 16px (lg), 0 12px (md)",
              "Radius: 12px",
              "Font: Inter Medium (14–16px)",
            ]}
          />
        </Panel>
        <Panel number="08" title="Inputs">
          <Label>Search / Text Input</Label>
          <Input search shortcut="⌘ K" placeholder="Search anything..." aria-label="Search" />
          <div className="mt-5">
            <Label>Select</Label>
          </div>
          <Select
            aria-label="Sort by"
            defaultValue="relevant"
            options={[
              { value: "relevant", label: "Most Relevant" },
              { value: "newest", label: "Newest" },
            ]}
          />
          <Specs
            title="Field Specs"
            items={[
              "Height: 44px",
              "Radius: 12px",
              "Border: 1px solid #E2E8F0",
              "Padding: 0 16px",
              "Focus: Border color #FB923C",
            ]}
          />
        </Panel>
      </div>

      {/* 09 Badges + 10 Status + 11 Progress */}
      <div className="grid gap-3 lg:grid-cols-[308px_1fr_1fr]">
        <Panel number="09" title="Badges / Tags">
          <div className="grid grid-cols-3 gap-3">
            {(["video", "lesson", "popular"] as const).map((tone) => (
              <div key={tone}>
                <p className="mb-3 text-small capitalize text-neutral-900">{tone}</p>
                <Badge tone={tone} />
              </div>
            ))}
          </div>
        </Panel>
        <Panel number="10" title="Status / Indicators">
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Status kind="in-progress" />
            <Status kind="completed" />
            <Status kind="now-playing" />
            <Status kind="locked" />
          </div>
        </Panel>
        <Panel number="11" title="Progress Bar">
          <ProgressBar value={35} />
        </Panel>
      </div>

      {/* 12 Cards */}
      <Panel number="12" title="Cards">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col">
            <p className="mb-2 text-small text-neutral-700">Course Card</p>
            <CourseCard
              href="#"
              title="Next.js for Production"
              summary="Build scalable, high-performance web applications with Next.js."
              icon={<span className="text-heading-3 font-semibold">N</span>}
              level="Intermediate"
              duration="18h 24m"
              modules={12}
              className="flex-1"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-small text-neutral-700">Lesson Card (Video)</p>
            <LessonVideoCard
              href="#"
              title="Data Fetching in Server Components"
              description="Learn how to fetch data on the server using async/await and Next.js best practices."
              lessonLabel="Lesson 5.1"
              duration="12:45"
              startLabel="12:45"
              className="flex-1"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-small text-neutral-700">Lesson Card (Lesson)</p>
            <LessonCard
              href="#"
              title="Data Fetching & Caching"
              description="Explore different data fetching methods in Next.js and how to cache and revalidate data for optimal performance."
              moduleLabel="Module 5"
              className="flex-1"
            />
          </div>
          <div className="flex flex-col">
            <p className="mb-2 text-small text-neutral-700">Resource Card</p>
            <ResourceCard
              href="#"
              title="Caching and Revalidation Guide"
              description="Deep dive into Next.js caching strategies."
              type="PDF"
              size="1.2 MB"
              className="flex-1"
            />
          </div>
        </div>
      </Panel>

      {/* 13 Navigation */}
      <Panel number="13" title="Navigation">
        <div className="grid items-center gap-6 lg:grid-cols-[300px_1fr_auto]">
          <div className="flex flex-wrap items-center gap-12">
            <Logo />
            <NavLinks
              active="/courses"
              links={[
                { href: "/courses", label: "Courses" },
                { href: "/my-learning", label: "My Learning" },
              ]}
            />
          </div>
          <div>
            <p className="mb-3 text-small text-neutral-700">Breadcrumbs</p>
            <Breadcrumbs
              items={[
                { label: "All Courses", href: "/courses" },
                { label: "Next.js for Production", href: "#" },
                { label: "Data Fetching & Caching" },
              ]}
            />
          </div>
          <div>
            <p className="mb-3 text-small text-neutral-700">Pagination</p>
            <Pagination current={1} total={8} hrefFor={(page) => `?page=${page}`} />
          </div>
        </div>
      </Panel>

      {/* 14 Principles */}
      <section className="grid items-center gap-6 rounded-lg bg-white/70 p-6 sm:grid-cols-2 lg:grid-cols-[140px_repeat(4,1fr)]">
        <h2 className="flex items-center gap-4 text-small font-semibold tracking-[0.12em] uppercase">
          <span className="text-primary-500">14</span>
          Principles
        </h2>
        {principles.map(({ icon: Icon, title, body }) => (
          <div key={title} className="flex items-start gap-4">
            <Icon size={30} className="shrink-0 text-neutral-700" />
            <div>
              <p className="text-small font-medium text-neutral-900">{title}</p>
              <p className="text-[11px] leading-4 text-neutral-700">{body}</p>
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}

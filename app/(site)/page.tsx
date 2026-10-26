import Image from "next/image";
import Link from "next/link";
import { HomeSearch } from "@/components/home-search";
import { ButtonLink } from "@/components/ui/button";
import { CourseCard } from "@/components/ui/cards";
import { ArrowRightIcon, StarIcon } from "@/components/ui/icons";
import { getCourses } from "@/lib/courses";

// Decorative bottom band: [left %, width %, height px, opacity]
const bars: Array<[number, number, number, number]> = [
  [0, 8, 90, 0.75],
  [7.5, 6.5, 120, 0.85],
  [13.5, 4.5, 150, 0.95],
  [18, 6, 190, 1],
  [24, 9, 135, 0.75],
  [33, 5, 100, 0.6],
  [49, 4, 70, 0.35],
  [52, 9, 85, 0.7],
  [61, 7.5, 115, 0.85],
  [68.5, 5.5, 150, 0.95],
  [74, 6.5, 190, 1],
  [80.5, 5.5, 95, 0.8],
  [86, 4, 135, 0.75],
  [90, 10, 170, 0.95],
];

export default async function HomePage() {
  const courses = await getCourses();

  return (
    <main className="relative flex flex-1 flex-col">
      <section className="flex flex-col items-center border-b border-neutral-200/70 px-4 pt-16 pb-14 text-center sm:px-10 sm:pt-[68px]">
        <span className="rounded-sm border border-primary-200 bg-primary-100/70 px-3.5 py-2.5 text-[11px] leading-none font-semibold tracking-[0.2em] text-primary-600 uppercase sm:text-small sm:tracking-[0.22em]">
          Intelligent Learning
        </span>
        <h1 className="mt-8 font-display text-[40px] leading-[1.15] font-normal tracking-[-0.02em] text-neutral-900 sm:text-[64px] sm:leading-[72px]">
          Search your learning
          <br />
          in plain English.
        </h1>
        <p className="mt-7 max-w-[480px] text-body-lg leading-[1.65] text-neutral-700 sm:text-[19px] sm:leading-[33px]">
          Vertex understands what you want to learn and finds the exact lessons across all your
          courses.
        </p>
        <ButtonLink
          href="/courses"
          icon={<ArrowRightIcon size={22} />}
          className="mt-9 h-[60px] gap-5 rounded-sm px-6 text-body-lg font-normal shadow-[0_8px_20px_-6px_rgba(249,115,22,0.55)] sm:text-[19px]"
        >
          Explore Courses
        </ButtonLink>
        <div className="mt-11 w-full max-w-[746px]">
          <HomeSearch />
        </div>
      </section>

      <section className="px-4 pt-14 sm:px-[52px]" aria-labelledby="all-courses">
        <div className="flex items-end justify-between gap-4">
          <h2 id="all-courses" className="font-display text-heading-1 font-normal text-neutral-900">
            All Courses
          </h2>
          <Link
            href="/courses"
            className="inline-flex items-center gap-3 text-body-lg text-primary-500 transition-colors hover:text-primary-600"
          >
            View all courses
            <ArrowRightIcon size={20} />
          </Link>
        </div>
        <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <CourseCard
              key={course.slug}
              size="lg"
              href={`/courses/${course.slug}`}
              title={course.title}
              summary={course.summary}
              level={course.level}
              duration={course.duration}
              modules={course.moduleCount}
              icon={
                <Image src={course.icon.src} alt={course.icon.alt} width={72} height={72} />
              }
              className="sm:min-h-[372px]"
            />
          ))}
        </div>
      </section>

      <div className="flex items-center gap-6 px-4 pt-16 sm:gap-8 sm:px-[52px]">
        <span className="h-px flex-1 bg-neutral-200" />
        <p className="flex items-center gap-4 text-body text-neutral-700 sm:text-body-lg">
          <StarIcon size={24} className="shrink-0 text-primary-500" />
          New courses and lessons added every week.
        </p>
        <span className="h-px flex-1 bg-neutral-200" />
      </div>

      <div aria-hidden className="relative mt-6 h-[190px] overflow-hidden">
        {bars.map(([left, width, height, opacity], i) => (
          <span
            key={i}
            className="absolute bottom-0 bg-gradient-to-t from-primary-400/80 via-primary-300/60 to-transparent max-sm:[&:nth-child(-n+3)]:hidden"
            style={{ left: `${left}%`, width: `${width}%`, height, opacity }}
          />
        ))}
      </div>
    </main>
  );
}

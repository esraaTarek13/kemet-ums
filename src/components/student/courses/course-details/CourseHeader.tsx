"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import HeaderSkeleton from "@/components/ui/skeletons/HeaderSkeleton";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function CourseHeader({ courseId }: { courseId: string }) {
  const { data, isError, isPending } = useStudentCourseDetails(courseId);
  const course = data?.course;

  if (isPending) return <HeaderSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load course." />;

  return (
    <section
      aria-label={
        course ? `${course.course_name} course header` : "Course header"
      }
      className="space-y-5 md:space-y-6"
    >
      {/* breadcrumb nav */}
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-1 flex-wrap items-center">
          <li>
            <Link
              href="/student/courses"
              className="font-bold text-xs text-text-secondary/70"
            >
              My Courses
            </Link>
          </li>
          <li aria-hidden="true">
            <IoIosArrowForward className="text-text-secondary/70" />
          </li>
          <li aria-current="page" className="font-bold text-xs text-accent">
            {course?.course_code} — {course?.course_name}
          </li>
        </ol>
      </nav>

      {/* course info card */}
      <div className="card flex flex-col sm:flex-row items-center gap-4 md:gap-5 lg:gap-6">
        <div
          aria-hidden="true"
          className="bg-bg-subtle border border-primary/10 rounded-lg py-4 md:py-6 px-2 w-fit h-fit"
        >
          <p className="font-bold text-accent text-base md:text-lg lg:text-xl">
            {course?.course_code}
          </p>
        </div>

        <div className="space-y-2 sm:space-y-1">
          <div className="flex items-center gap-1.5 lg:gap-3 flex-wrap">
            <h3 className="header-title">{course?.course_name}</h3>
            {/* course type badge */}
            <span className="bg-accent px-2 md:px-3 py-0.5 md:py-1 rounded-full font-bold text-[10px] text-text-white uppercase">
              {course?.course_type}
            </span>
          </div>

          {/* room, days, time — full label on wrapper, children decorative */}
          <div
            aria-label={`Room ${course?.room}, ${course?.days?.join(" ")} from ${course?.start_time.slice(0, 5)} to ${course?.end_time.slice(0, 5)}`}
            className="flex items-center gap-1 md:gap-3 flex-wrap"
          >
            <span
              aria-hidden="true"
              className="header-subtitle text-text-secondary/80"
            >
              {course?.room}
            </span>
            <div
              aria-hidden="true"
              className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
            />
            <div aria-hidden="true" className="flex gap-1">
              {course?.days.map((day) => (
                <span
                  key={day}
                  className="header-subtitle text-text-secondary/80"
                >
                  {day}
                </span>
              ))}
            </div>
            <div
              aria-hidden="true"
              className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
            />
            <span
              aria-hidden="true"
              className="header-subtitle text-text-secondary/80"
            >
              {course?.start_time.slice(0, 5)} – {course?.end_time.slice(0, 5)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useStudentCourseDetails } from "@/hooks/student/useStudentCourseDetails";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function CourseHeader({ courseId }: { courseId: string }) {
  const { data, isError, isPending } = useStudentCourseDetails(courseId);
  const course = data?.course;

  if (isError) return <ErrorMessage content="Failed to load course." />;

  return (
    <section className="space-y-5 md:space-y-6">
      <div className="flex gap-1 flex-wrap">
        <Link
          href={"/student/courses"}
          className="font-bold text-xs text-text-secondary/70"
        >
          My Courses
        </Link>
        <IoIosArrowForward className="text-text-secondary/70" />
        <p className="font-bold text-xs text-accent">
          {course?.course_code ?? "—"} — {course?.course_name ?? "—"}
        </p>
      </div>

      <section className="card flex gap-4 md:gap-5 lg:gap-6">
        <div className="bg-bg-subtle border border-primary/10 rounded-lg py-4 md:py-6 px-2 h-fit">
          <p className="font-bold text-accent text-base md:text-lg lg:text-xl">
            {course?.course_code ?? "—"}
          </p>
        </div>
        <div className="space-y-2 sm:space-y-1">
          <div className="flex items-center gap-1.5 lg:gap-3 flex-wrap">
            <h3 className="header-title">{course?.course_name ?? "—"}</h3>
            <div className="flex gap-1.5 md:gap-3 h-fit">
              <span className="bg-accent px-2 md:px-3 py-0.5 md:py-1 rounded-full font-bold text-[10px] text-text-white uppercase">
                {course?.course_type ?? "—"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-1 md:gap-3 flex-wrap">
            <span className="header-subtitle text-text-secondary/80">
              {course?.room ?? "—"}
            </span>
            <div className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full" />
            <div className="flex gap-1">
              {course?.days.map((day) => (
                <span
                  key={day}
                  className="header-subtitle text-text-secondary/80"
                >
                  {day ?? "—"}
                </span>
              ))}
            </div>
            <div className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full" />
            <span className="header-subtitle text-text-secondary/80">
              {course?.start_time && course?.end_time
                ? `${course.start_time.slice(0, 5)} – ${course.end_time.slice(0, 5)}`
                : "—"}
            </span>
          </div>
        </div>
      </section>
    </section>
  );
}

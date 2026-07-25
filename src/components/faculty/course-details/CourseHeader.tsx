"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import HeaderSkeleton from "@/components/ui/skeletons/HeaderSkeleton";
import { useFacultyCourseDetail } from "@/hooks/faculty/courses/queries/useFacultyCourseDetail";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface CourseHeaderProps {
  courseId: string;
}

export default function CourseHeader({ courseId }: CourseHeaderProps) {
  const { data, isPending, isError } = useFacultyCourseDetail(courseId);
  const courseDetail = data?.course;

  if (isPending) return <HeaderSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load course." />;

  return (
    <section
      aria-label={
        courseDetail
          ? `${courseDetail.course_name} course header`
          : "Course header"
      }
      className="space-y-5 md:space-y-6"
    >
      {/* breadcrumb nav */}
      <nav aria-label="Breadcrumb">
        <ol className="flex gap-1 flex-wrap items-center">
          <li className="mb-1">
            <Link
              href="/faculty/courses"
              className="font-bold text-xs text-text-secondary/70"
            >
              My Courses
            </Link>
          </li>
          <li aria-hidden="true">
            <IoIosArrowForward className="text-text-secondary/70 text-sm" />
          </li>
          <li aria-current="page" className="font-bold text-xs text-accent">
            {courseDetail?.course_code} — {courseDetail?.course_name}
          </li>
        </ol>
      </nav>

      <div className="card flex flex-col lg:flex-row justify-between gap-4 lg:items-center">
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-5 lg:gap-6">
          <div
            aria-hidden="true"
            className="bg-bg-subtle border border-primary/10 rounded-lg py-4 md:py-6 px-2 w-fit h-fit"
          >
            <p className="font-bold text-accent text-base md:text-lg lg:text-xl">
              {courseDetail?.course_code}
            </p>
          </div>

          <div className="space-y-2 sm:space-y-1">
            <div className="flex items-center justify-center sm:justify-start gap-1.5 lg:gap-3 flex-wrap">
              <h3 className="header-title">{courseDetail?.course_name}</h3>
              {/* course type badge */}
              <span className="bg-primary/10 px-2 md:px-3 py-0.5 md:py-1 rounded-full font-bold text-[10px] text-accent uppercase">
                {courseDetail?.status}
              </span>
            </div>

            {/*semester, room, days, time — full label on wrapper, children decorative */}
            <div
              aria-label={`Room ${courseDetail?.room}, ${courseDetail?.schedule}`}
              className="flex items-center justify-center sm:justify-start gap-1 md:gap-3 flex-wrap"
            >
              <span
                aria-hidden="true"
                className="header-subtitle text-text-secondary/80"
              >
                {courseDetail?.semester}
              </span>
              <div
                aria-hidden="true"
                className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
              />
              <span
                aria-hidden="true"
                className="header-subtitle text-text-secondary/80"
              >
                {courseDetail?.room}
              </span>
              <div
                aria-hidden="true"
                className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
              />
              <span
                aria-hidden="true"
                className="header-subtitle text-text-secondary/80"
              >
                {courseDetail?.schedule}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-2 w-full lg:w-fit ">
          <Link
            href={`/faculty/courses/${courseDetail?.offering_id}/grades`}
            className="btn btn-dark w-full lg:w-auto flex items-center justify-center py-2"
          >
            Grades
          </Link>
        </div>
      </div>
    </section>
  );
}

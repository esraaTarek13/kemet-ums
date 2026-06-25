"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { useStudentDashboardCourses } from "@/hooks/student/useDashboard";
import CourseCard from "../shared/CourseCard";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";

export default function Courses() {
  const { data: courses, isPending, isError } = useStudentDashboardCourses();

  if (isPending)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <CourseCardSkeleton />
      </div>
    );
  if (isError) return <ErrorMessage content="Failed to load courses." />;

  return (
    <section aria-label="My courses" className="w-full space-y-5 lg:space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="title">My Courses</h3>
        {/* shortcut to the full courses page */}
        <Link
          href="/student/courses"
          aria-label="View all my courses"
          className="group flex gap-2 items-center text-text-secondary transition duration-200 px-2"
        >
          <span className="text-xs md:text-sm">View All</span>
          <FaArrowRight
            aria-hidden="true"
            className="text-sm shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {/* render enrolled courses, or notify if none exist */}
        {courses?.length ? (
          courses.map((course) => (
            <CourseCard key={course.offering_id} course={course} />
          ))
        ) : (
          <p
            role="status"
            aria-live="polite"
            className="text-text-muted col-span-full text-center py-10"
          >
            No courses found.
          </p>
        )}
      </div>
    </section>
  );
}

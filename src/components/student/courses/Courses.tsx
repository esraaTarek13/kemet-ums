"use client";

import { FILTER_COURSES } from "@/data/student/filterCourses";
import { useStudentCourses } from "@/hooks/student/useStudentCourses";
import CourseCard from "../shared/CourseCard";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";

export default function Courses() {
  const {
    data: courses,
    filter,
    setFilter,
    isError,
    isPending,
  } = useStudentCourses();

  if (isPending)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <CourseCardSkeleton />
      </div>
    );
  if (isError) return <ErrorMessage content="Failed to load courses." />;

  return (
    <section aria-label="My courses" className="space-y-5 md:space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <h2 className="title text-xl md:text-2xl lg:text-3xl">My Courses</h2>

        {/* status filter: All / In Progress / Completed */}
        <div
          role="group"
          aria-label="Filter courses by status"
          className="w-fit bg-bg-filter p-1 rounded-xl"
        >
          {FILTER_COURSES.map((course) => (
            <button
              key={course}
              type="button"
              aria-pressed={filter === course}
              onClick={() => setFilter(course)}
              className={`text-xs lg:text-sm uppercase py-2 px-4 md:px-6 rounded-xl cursor-pointer ${
                filter === course
                  ? "bg-accent text-text-white"
                  : "text-text-muted"
              }`}
            >
              {course}
            </button>
          ))}
        </div>
      </div>

      {/* course grid — empty state if no results */}
      {courses.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pt-3">
          {courses.map((course) => (
            <CourseCard key={course.offering_id} course={course} />
          ))}
        </div>
      ) : (
        <p
          role="status"
          aria-live="polite"
          className="text-text-muted col-span-full text-center py-10"
        >
          No courses found.
        </p>
      )}
    </section>
  );
}

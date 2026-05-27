"use client";

import { FILTER_COURSES } from "@/data/student/filterCourses";
import { useStudentCourses } from "@/hooks/student/useStudentCourses";
import CourseCard from "../shared/CourseCard";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import ErrorMessage from "@/components/ui/ErrorMessage";

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
        <CourseCardSkeleton length={4} />
      </div>
    );

  if (isError) return <ErrorMessage content="Failed to load courses." />;

  return (
    <section className="space-y-5 md:space-y-6">
      <div className="flex flex-col md:flex-row justify-between gap-3">
        <h2 className="title text-xl md:text-2xl lg:text-3xl">My Courses</h2>
        <div className="w-fit bg-bg-filter p-1 rounded-xl">
          {FILTER_COURSES.map((course) => (
            <button
              key={course}
              type="button"
              onClick={() => setFilter(course)}
              className={`text-xs lg:text-sm uppercase py-2 px-4 md:px-6 rounded-xl cursor-pointer ${
                filter === course
                  ? "bg-accent text-text-white"
                  : "text-text-muted"
              }`}
            >
              {course.replace("_", " ")}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 pt-3">
        {courses && courses.length > 0 ? (
          courses.map((course) => (
            <CourseCard key={course.course_id} {...course} />
          ))
        ) : (
          <p className="text-text-muted col-span-full text-center py-10">
            No courses found.
          </p>
        )}
      </div>
    </section>
  );
}

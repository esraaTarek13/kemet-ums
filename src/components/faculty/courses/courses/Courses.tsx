"use client";
import { useFacultyCourses } from "@/hooks/faculty/useFacultyCourses";
import CourseCard from "./CourseCard";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";

export default function Courses() {
  const { data: courses, isPending, isError } = useFacultyCourses();

  if (isPending)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <CourseCardSkeleton />
      </div>
    );
  if (isError) return <ErrorMessage content="Failed to load courses." />;

  return (
    <section aria-label="My courses" className="space-y-5 md:space-y-6">
      <h3 className="title">My Courses</h3>
      {courses?.length > 0 ? (
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses?.map((course) => (
            <li key={course.offering_id}>
              <CourseCard course={course} />
            </li>
          ))}
        </ul>
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

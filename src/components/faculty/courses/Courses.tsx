"use client";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import CourseCard from "./CourseCard";
import { useState } from "react";
import SemesterYearSelect from "../../ui/shared/SemesterYearSelect";
import { useFacultyCourses } from "@/hooks/faculty/courses/queries/useFacultyCourses";

export default function Courses() {
  const [semester, setSemester] = useState("");

  const {
    data: courses,
    isPending,
    isError,
  } = useFacultyCourses(semester || undefined);

  if (isPending)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        <CourseCardSkeleton />
      </div>
    );
  if (isError) return <ErrorMessage content="Failed to load courses." />;

  return (
    <section aria-label="My courses" className="space-y-5 md:space-y-6">
      <div className="flex items-center gap-4 flex-wrap">
        <h3 className="title">My Courses</h3>
        <SemesterYearSelect
          semester={semester}
          onSemesterChange={setSemester}
        />
      </div>

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

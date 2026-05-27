"use client";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import ErrorMessage from "@/components/ui/ErrorMessage";
import CourseCardSkeleton from "@/components/ui/skeletons/CourseCardSkeleton";
import { useStudentDashboard } from "@/hooks/student/useDashboard";
import CourseCard from "../shared/CourseCard";

export default function Courses() {
  const { data, isPending, isError } = useStudentDashboard();
  const courses = data?.courses;

  if (isPending)
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        <CourseCardSkeleton length={4} />
      </div>
    );

  if (isError)
    return <ErrorMessage content="Failed to load courses." />;

  return (
    <section className="w-full space-y-5 lg:space-y-6">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 className="title">My Courses</h3>
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

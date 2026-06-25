import ProgressBar from "@/components/ui/shared/ProgressBar";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import type { StudentCourse } from "@/types";

interface CourseCardProps {
  course: StudentCourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <article aria-label={`${course.course_name} course card`} className="card">
      {/* code + type badges */}
      <div
        aria-hidden="true"
        className="flex items-center justify-between gap-2 mb-6 lg:mb-8"
      >
        <p className="bg-primary/5 py-1 px-2 rounded-xs text-text-primary text-[10px]">
          {course.course_code}
        </p>
        <p className="bg-bg-filter py-1 px-2 rounded-xs text-text-subtle text-[10px] uppercase">
          {course.course_type}
        </p>
      </div>

      <h5 className="font-semibold text-text-primary text-base md:text-lg">
        {course.course_name}
      </h5>

      {/* instructor · room */}
      <div aria-hidden="true" className="text-text-subtle text-xs mb-4">
        <span>{course.faculty_name}</span>
        <span className="w-1.5 h-1.5 bg-text-subtle rounded-full mx-1 align-middle inline-block" />
        <span>{course.room}</span>
      </div>

      {/* progress bar — aria-label carries accessible name for screen readers */}
      <div className="relative">
        <p
          aria-hidden="true"
          className="text-text-primary text-xs absolute inset-0"
        >
          Completion
        </p>
        <ProgressBar
          value={course.completion}
          aria-label={`${course.course_name} completion: ${course.completion}%`}
          progressClass="bg-accent"
          textClass="text-accent"
        />
      </div>

      {/* course details link */}
      <Link
        href={`/student/courses/${course.offering_id}`}
        aria-label={`Continue ${course.course_name}`}
        className="group flex items-center gap-2 text-accent mt-6 transition duration-200"
      >
        <span className="font-bold text-xs">Continue</span>
        <FaArrowRight
          aria-hidden="true"
          className="text-sm shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}

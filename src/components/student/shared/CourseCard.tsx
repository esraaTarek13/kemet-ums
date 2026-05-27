import ProgressBar from "@/components/ui/ProgressBar";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { StudentCourse, StudentDashboardCourse } from "@/types";

type CourseCardProps = StudentCourse | StudentDashboardCourse;

export default function CourseCard({
  course_id,
  course_type,
  course_code,
  course_name,
  faculty_name,
  room,
  completion,
}: CourseCardProps) {
  return (
    <div className="card">
      <div className="flex items-center justify-between gap-2 mb-6 lg:mb-8">
        <p className="bg-primary/5 py-1 px-2 rounded-xs text-text-primary text-[10px]">
          {course_code}
        </p>
        <p className="bg-bg-filter py-1 px-2 rounded-xs text-text-subtle text-[10px] uppercase">
          {course_type}
        </p>
      </div>

      <h5 className="font-semibold text-text-primary text-base md:text-lg">
        {course_name}
      </h5>
      <div className="text-text-subtle text-xs mb-4">
        <span>{faculty_name}</span>
        <span className="w-1.5 h-1.5 bg-text-subtle rounded-full mx-1 align-middle inline-block"></span>
        <span>{room}</span>
      </div>

      <div className="relative">
        <p className="text-text-primary text-xs absolute inset-0">Completion</p>
        <ProgressBar
          value={completion}
          progressClass="bg-accent"
          textClass="text-accent"
        />
      </div>

      <Link
        href={`/student/courses/${course_id}`}
        className="group flex items-center gap-2 text-accent mt-6 transition duration-200"
      >
        <span className="font-bold text-xs">Continue</span>
        <FaArrowRight
          aria-hidden="true"
          className="text-sm shrink-0 transition-transform duration-200 group-hover:translate-x-1"
        />
      </Link>
    </div>
  );
}

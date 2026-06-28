import ProgressBar from "@/components/ui/shared/ProgressBar";
import { FacultyCourse } from "@/types";
import Link from "next/link";

interface CourseCardProps {
  course: FacultyCourse;
}

export default function CourseCard({ course }: CourseCardProps) {
  return (
    <div className="card space-y-3">
      <div className="flex items-center justify-between gap-2">
        <p className="text-text-primary text-[10px] uppercase bg-primary/5 py-1 px-2 rounded-sm">
          {course.course_code}
        </p>
        <p className="text-accent text-[10px] uppercase bg-accent/10 py-1 px-2 rounded-sm">
          {course.status}
        </p>
      </div>

      <div>
        <h5 className="text-text-primary font-bold text-sm md:text-lg">
          {course.course_name}
        </h5>
        <div className="flex items-center gap-2 flex-wrap text-text-secondary text-xs">
          <span>{course.schedule}</span>
          <div
            aria-hidden="true"
            className="h-1.5 w-1.5 rounded-full bg-text-secondary"
          ></div>
          <span>{course.room}</span>
        </div>
      </div>
      
      <div className="relative">
        <p className="text-xs text-text-primary absolute bottom-3">
          Completion
        </p>
        <ProgressBar
          value={course.completion_percentage}
          progressClass="bg-accent"
          textClass="text-text-primary"
        />
      </div>

      <Link
        href={`/faculty/courses/${course.offering_id}`}
        className="btn btn-dark w-full flex items-center justify-center py-2.5 text-xs"
      >
        MANAGE
      </Link>
    </div>
  );
}

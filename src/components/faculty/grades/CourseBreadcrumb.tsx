import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface CourseBreadcrumbProps {
  courseId: string;
  courseCode: string;
}

export default function CourseBreadcrumb({
  courseId,
  courseCode,
}: CourseBreadcrumbProps) {
  return (
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

        <Link
          href={`/faculty/courses/${courseId}`}
          className="font-bold text-xs text-text-secondary/70"
        >
          {courseCode}
        </Link>

        <li aria-hidden="true">
          <IoIosArrowForward className="text-text-secondary/70 text-sm" />
        </li>

        <li aria-current="page" className="font-bold text-xs text-accent">
          Grades
        </li>
      </ol>
    </nav>
  );
}

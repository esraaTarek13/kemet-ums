import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface CourseBreadcrumbProps {
  courseCode: string;
  courseName: string;
}

export default function CourseBreadcrumb({
  courseCode,
  courseName,
}: CourseBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-1 flex-wrap items-center">
        <li className="mb-1">
          <Link
            href="/student/courses"
            className="font-bold text-xs text-text-secondary/70"
          >
            My Courses
          </Link>
        </li>
        <li aria-hidden="true">
          <IoIosArrowForward className="text-text-secondary/70" />
        </li>
        <li aria-current="page" className="font-bold text-xs text-accent">
          {courseCode} — {courseName}
        </li>
      </ol>
    </nav>
  );
}

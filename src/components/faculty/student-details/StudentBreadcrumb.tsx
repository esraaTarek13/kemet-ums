import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function StudentBreadcrumb({studentCode}: {studentCode: string}) {
  return (
      <nav aria-label="Breadcrumb">
      <ol className="flex gap-1 flex-wrap items-center">
        <li className="mb-1">
          <Link
            href="/faculty/students"
            className="font-bold text-xs text-text-secondary/70"
          >
            My Students
          </Link>
        </li>

        <li aria-hidden="true">
          <IoIosArrowForward className="text-text-secondary/70 text-sm" />
        </li>

        <li aria-current="page" className="font-bold text-xs text-accent">
          {studentCode}
        </li>
      </ol>
    </nav>
  )
}

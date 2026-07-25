import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

export default function CourseBreadcrumb({
  coursesCode,
}: {
  coursesCode: string | undefined;
}) {
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/admin";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-1 flex-wrap items-center">
        <li className="mb-1">
          <Link
            href={`${base}/courses`}
            className="font-bold text-xs text-text-secondary/70"
          >
            My Courses
          </Link>
        </li>

        <li aria-hidden="true">
          <IoIosArrowForward className="text-text-secondary/70 text-sm" />
        </li>

        <li aria-current="page" className="font-bold text-xs text-accent">
          {coursesCode}
        </li>
      </ol>
    </nav>
  );
}

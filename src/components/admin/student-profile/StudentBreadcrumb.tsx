import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface StudentBreadcrumbProps {
  studentCode: string;
}
export default function StudentBreadcrumb({
  studentCode,
}: StudentBreadcrumbProps) {
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/admin";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-1 flex-wrap items-center">
        <li className="mb-1">
          <Link
            href={`${base}/students`}
            className="font-bold text-xs text-text-secondary/70"
          >
            Students
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
  );
}

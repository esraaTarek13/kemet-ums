import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface FacultyBreadcrumbProps {
  facultyCode: string;
}
export default function FacultyBreadcrumb({
  facultyCode,
}: FacultyBreadcrumbProps) {
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/admin";

  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-1 flex-wrap items-center">
        <li className="mb-1">
          <Link
            href={`${base}/faculty`}
            className="font-bold text-xs text-text-secondary/70"
          >
            Faculty
          </Link>
        </li>

        <li aria-hidden="true">
          <IoIosArrowForward className="text-text-secondary/70 text-sm" />
        </li>

        <li aria-current="page" className="font-bold text-xs text-accent">
          {facultyCode}
        </li>
      </ol>
    </nav>
  );
}

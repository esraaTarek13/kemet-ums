import Link from "next/link";
import { IoIosArrowForward } from "react-icons/io";

interface AdminBreadcrumbProps {
  adminCode: string | undefined;
}

export default function AdminBreadcrumb({ adminCode }: AdminBreadcrumbProps) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex gap-1 flex-wrap items-center">
        <li className="mb-1">
          <Link
            href="/super-admin/admins"
            className="font-bold text-xs text-text-secondary/70"
          >
            Admins
          </Link>
        </li>

        <li aria-hidden="true">
          <IoIosArrowForward className="text-text-secondary/70 text-sm" />
        </li>

        <li aria-current="page" className="font-bold text-xs text-accent">
          {adminCode}
        </li>
      </ol>
    </nav>
  );
}

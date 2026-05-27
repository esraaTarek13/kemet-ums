"use client";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { ROLE_BASE_ROUTES } from "@/data/roles";
import { statusStyles } from "@/data/statusStyles";
import { useRecentStudents } from "@/hooks/admin/useDashboard";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function RecentStudents() {
  // Fetch recent students data
  const { data: res, isPending, isError } = useRecentStudents();

  // Get current user and resolve their base route
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/";
  const style = statusStyles;

  if (isPending) {
    return <TableSkeleton rows={5} cols={5} />;
  }

  if (isError)
    return <ErrorMessage content="Failed to load student records." />;

  return (
    <section className="min-w-full border border-bg-bar rounded-xl overflow-hidden">
      {/* Card header */}
      <div className="w-full flex items-center justify-between gap-2 flex-wrap bg-accent p-4 md:p-6 text-text-white">
        <h3 className="title text-text-white">Recent Student Records</h3>
        <Link
          href={`${base}/students`}
          aria-label="View all my courses"
          className="group flex gap-2 items-center text-text-white transition duration-200 pr-2"
        >
          <span className="text-xs md:text-sm">View All</span>
          <FaArrowRight
            aria-hidden="true"
            className="text-sm shrink-0 transition-transform duration-200 group-hover:translate-x-1"
          />
        </Link>
      </div>

      {/* Scrollable table wrapper */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto w-0 min-w-full ">
          <table className="w-full">
            <thead className="bg-bg-search-input">
              <tr className="uppercase text-text-subtle font-semibold text-[10px] md:text-xs">
                <th className="py-2 md:py-4 px-4 md:px-6 text-left">Id</th>
                <th className="py-2 md:py-4 px-4 md:px-6 text-left">Name</th>
                <th className="py-2 md:py-4 px-4 md:px-6 text-left">
                  Department
                </th>
                <th className="py-2 md:py-4 px-4 md:px-6 text-left">GPA</th>
                <th className="py-2 md:py-4 px-4 md:px-6 text-left">Status</th>
              </tr>
            </thead>

            <tbody className="bg-bg-card">
              {res?.map((row) => (
                <tr key={row.id} className="border-t border-text-subtle/50">
                  <td className="whitespace-nowrap font-medium text-accent text-xs md:text-sm py-4 md:py-6 px-4 md:px-6 text-left">
                    #{row.student_code}
                  </td>
                  <td className="whitespace-nowrap font-semibold text-text-primary text-xs md:text-sm py-4 md:py-6 px-4 md:px-6 text-left">
                    {row.full_name}
                  </td>
                  <td className="whitespace-nowrap text-text-primary text-xs md:text-sm py-4 md:py-6 px-4 md:px-6 text-left">
                    {row.department}
                  </td>
                  <td className="whitespace-nowrap font-bold text-text-primary text-xs md:text-sm py-4 md:py-6 px-4 md:px-6 text-left">
                    {row.gpa}
                  </td>

                  {/* Status badge with dynamic style based on status value */}
                  <td className="py-4 md:py-6 px-4 md:px-6">
                    <span
                      className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold whitespace-nowrap ${
                        style[row.status] ??
                        "text-text-subtle bg-bg-search-input border border-text-subtle/30"
                      }`}
                    >
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

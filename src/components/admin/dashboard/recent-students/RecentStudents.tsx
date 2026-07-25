import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Small";
import { RECENT_STUDENTS_COLUMNS } from "@/data/admin/recentStudent";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useRecentStudents } from "@/hooks/admin/dashboard/queries/useRecentStudents";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { useMemo } from "react";
import { FaArrowRight } from "react-icons/fa";

export default function RecentStudents() {
  // Get current user and resolve their base route
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/";
  const { data: recentStudents, isPending, isError } = useRecentStudents();

  const tableData = useMemo(
    () => ({
      nodes: (recentStudents ?? []).map((s) => ({ ...s, id: s.id })),
    }),
    [recentStudents],
  );

  return (
    <section aria-label="Recent Students" className="min-w-full w-0">
      <div className="rounded-lg overflow-hidden border border-bg-bar">
        {/* Card header */}
        <div className="w-full flex items-center justify-between gap-2 flex-wrap bg-accent p-4 md:p-6 text-text-white">
          <h3 className="title text-text-white">Recent Student Records</h3>
          <Link
            href={`${base}/students`}
            aria-label="View all students"
            className="group flex gap-2 items-center text-text-white transition duration-200 pr-2"
          >
            <span className="text-xs md:text-sm">View All</span>
            <FaArrowRight
              aria-hidden="true"
              className="text-sm shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>

        {/* Table content */}
        {isPending ? (
          <TableSkeleton />
        ) : isError ? (
          <ErrorMessage content="Failed to load student records." />
        ) : tableData.nodes.length === 0 ? (
          <p className="text-center text-text-subtle py-8">No Students yet.</p>
        ) : (
          <Table tableData={tableData} columns={RECENT_STUDENTS_COLUMNS} />
        )}
      </div>
    </section>
  );
}

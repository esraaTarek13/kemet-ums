import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Small";
import { RECENT_STUDENTS_COLUMNS } from "@/data/admin/recentStudent";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";
import { useRecentStudents } from "@/hooks/admin/useDashboard";
import { useAuthStore } from "@/stores/authStore";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function RecentStudentsInner() {
  const { data: recentStudents, isPending, isError } = useRecentStudents();

  // Get current user and resolve their base route
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/";

  if (isPending) {
    return <TableSkeleton />;
  }

  if (isError)
    return <ErrorMessage content="Failed to load student records." />;

  if (recentStudents.length === 0) {
    return (
      <p className="text-center text-text-subtle py-8">No Students yet.</p>
    );
  }

  const tableData = {
    nodes: recentStudents.map((s) => ({ ...s, id: s.id })),
  };

  return (
    <div className="rounded-lg overflow-hidden border border-bg-bar">
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

      <Table tableData={tableData} columns={RECENT_STUDENTS_COLUMNS} />
    </div>
  );
}

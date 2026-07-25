import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Small";
import { COLUMNS } from "@/data/faculty/recentStudentRecords";
import { useFacultyDashboardCourses } from "@/hooks/faculty/dashboard/queries/useFacultyDashboardCourses";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function ActiveCourses() {
  const { data, isPending, isError } = useFacultyDashboardCourses();

  if (isPending) return <TableSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load recent student records." />;

  if (data?.length === 0) {
    return (
      <p className="text-center text-text-subtle py-8">
        No active courses available yet.
      </p>
    );
  }

  const tableData = {
    nodes: data?.map((s) => ({ ...s, id: s.offering_id })) ?? [],
  };

  return (
    <section aria-label="Active courses" className="min-w-full w-0">
      <div
        role="region"
        aria-label="active courses table"
        className="overflow-x-hidden rounded-xl"
      >
        <div className="flex items-center justify-between gap-2 flex-wrap bg-accent p-4 md:p-6 rounded-t-xl">
          <h3 className="title text-text-white">Active Courses</h3>
          <Link
            href="/faculty/courses"
            aria-label="View all courses"
            className="group flex gap-2 items-center text-text-white/80 transition duration-200 px-2"
          >
            <span className="text-xs md:text-sm">View All</span>
            <FaArrowRight
              aria-hidden="true"
              className="text-sm shrink-0 transition-transform duration-200 group-hover:translate-x-1"
            />
          </Link>
        </div>
        <Table tableData={tableData} columns={COLUMNS} />
      </div>
    </section>
  );
}

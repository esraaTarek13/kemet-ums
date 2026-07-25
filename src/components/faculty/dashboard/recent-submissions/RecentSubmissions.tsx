"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import Table from "@/components/ui/tables/Table.Small";
import { COLUMNS } from "@/data/faculty/recentSubmissions";
import { useFacultyRecentSubmissions } from "@/hooks/faculty/dashboard/queries/useFacultyRecentSubmissions";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default function RecentSubmissions() {
  const { data, isPending, isError } = useFacultyRecentSubmissions();

  if (isPending) return <TableSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load recent submissions." />;

  if (data?.length === 0) {
    return (
      <p className="text-center text-text-subtle py-8">
        No recent submissions available yet.
      </p>
    );
  }

  const tableData = {
    nodes: data?.map((r) => ({ ...r, id: r.submission_id })) ?? [],
  };

  return (
    <section aria-label="Recent submissions" className="min-w-full w-0">
      <div
        role="region"
        aria-label="recent submissions table"
        className="overflow-x-hidden rounded-xl"
      >
        <div className="flex items-center justify-between gap-2 flex-wrap bg-accent p-4 md:p-6 rounded-t-xl">
          <h3 className="title text-text-white">Recent Submissions</h3>
          <Link
            href="/faculty/assignments"
            aria-label="View all assignments"
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

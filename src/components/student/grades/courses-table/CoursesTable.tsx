"use client";

import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import Table from "@/components/ui/tables/Table.Small";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { COLUMNS } from "@/data/student/grades";
import { useGradesTable } from "@/hooks/student/grades/useGradesTable";

export default function CoursesTable() {
  const { isPending, isError, tableData } = useGradesTable();

  if (isPending) return <TableSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load grades." />;

  if (tableData.nodes.length === 0) {
    return (
      <p className="text-center text-xs md:text-sm text-text-subtle py-8">
        No grades available yet.
      </p>
    );
  }

  return (
    <section className="min-w-full w-0">
      <div
        role="region"
        aria-label="Course grades table"
        className="rounded-xl overflow-hidden"
      >
        <Table tableData={tableData} columns={COLUMNS} />
      </div>
    </section>
  );
}

"use client";
import { useStudentGrades } from "@/hooks/student/useStudentGrades";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import Table from "@/components/ui/tables/Table.Small";
import { COLUMNS } from "@/data/student/grades";

export default function CoursesTableInner() {
  const { data, isPending, isError } = useStudentGrades();

  if (isPending) return <TableSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load grades." />;

  const grades = data?.courses ?? [];
  const tableData = {
    nodes: grades
      .sort((a, b) => {
        if (a.status === "active" && b.status !== "active") return -1;
        if (a.status !== "active" && b.status === "active") return 1;
        return 0;
      })
      .map((g) => ({ ...g, id: g.enrollment_id })),
  };

  if (grades.length === 0) {
    return (
      <p className="text-center text-text-subtle py-8">
        No grades available yet.
      </p>
    );
  }

  return (
    <div
      role="region"
      aria-label="Course grades table"
      className="rounded-xl overflow-hidden"
    >
      <Table tableData={tableData} columns={COLUMNS} />
    </div>
  );
}

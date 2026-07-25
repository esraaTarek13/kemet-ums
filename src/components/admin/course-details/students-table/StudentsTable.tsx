import Table from "@/components/ui/tables/Table.Small";
import { COURSE_STUDENTS_COLUMNS } from "@/data/admin/courseStudentColumns";
import { EnrolledStudent } from "@/types";
import { useMemo } from "react";

interface StudentsTableProps {
  students: EnrolledStudent[] | undefined;
}

export default function StudentsTable({ students }: StudentsTableProps) {
  const tableData = useMemo(
    () => ({
      nodes: (students ?? []).map((s) => ({ ...s, id: s.student_id })),
    }),
    [students],
  );

  return (
    <section
      aria-label="Students"
      className="min-w-full w-0 h-fit card p-0 overflow-hidden"
    >
      <h4 className="title p-4">Enrolled Students</h4>

      {tableData.nodes.length === 0 ? (
        <p className="text-center text-xs md:text-sm text-text-subtle py-8">
          No Students yet.
        </p>
      ) : (
        <Table tableData={tableData} columns={COURSE_STUDENTS_COLUMNS} />
      )}
    </section>
  );
}

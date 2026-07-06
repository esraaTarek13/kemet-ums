import Table from "@/components/ui/tables/Table.Small";
import { STUDENT_COURSES_COLUMNS } from "@/data/faculty/studentCoursesColumns";
import { FacultyStudentCourse } from "@/types";
import { useMemo } from "react";

interface StudentTableProps {
  courses?: FacultyStudentCourse[];
}
export default function StudentTableInner({ courses }: StudentTableProps) {

  const tableData = useMemo(
    () => ({
      nodes: (courses ?? []).map((c) => ({ ...c, id: c.enrollment_id })),
    }),
    [courses],
  );

  return (
    <section className="border border-bg-bar rounded-xl overflow-hidden">
      {tableData.nodes.length === 0 ? (
        <p className="text-center text-text-subtle py-8">No Courses found.</p>
      ) : (
        <Table tableData={tableData} columns={STUDENT_COURSES_COLUMNS} />
      )}
    </section>
  );
}

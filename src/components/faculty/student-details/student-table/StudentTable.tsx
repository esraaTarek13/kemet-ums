import Table from "@/components/ui/tables/Table.Small";
import { STUDENT_COURSES_COLUMNS } from "@/data/faculty/studentCoursesColumns";
import { FacultyStudentCourse } from "@/types";
import { useMemo } from "react";

interface StudentTableProps {
  courses?: FacultyStudentCourse[];
}
export default function StudentTable({ courses }: StudentTableProps) {
  const tableData = useMemo(
    () => ({
      nodes: (courses ?? []).map((c) => ({ ...c, id: c.enrollment_id })),
    }),
    [courses],
  );

  return (
    <section aria-label="Student" className="min-w-full w-0">
      <div className="border border-bg-bar rounded-xl overflow-hidden">
        {tableData.nodes.length === 0 ? (
          <p className="text-center text-text-subtle py-8">No Courses found.</p>
        ) : (
          <Table tableData={tableData} columns={STUDENT_COURSES_COLUMNS} />
        )}
      </div>
    </section>
  );
}

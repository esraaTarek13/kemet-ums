import Table from "@/components/ui/tables/Table.Small";
import { STUDENT_COURSES_COLUMNS } from "@/data/admin/coursesStudentProfileColumns";
import { StudentEnrolledCourse } from "@/types";
import { useMemo } from "react";
import { BiSolidBookOpen } from "react-icons/bi";
import EnrollStudentModal from "../add-courses/EnrollStudentModal";

interface EnrolledCoursesTableProps {
  courses: StudentEnrolledCourse[];
  studentName: string;
  studentId: string;
}

export default function EnrolledCoursesTable({
  courses,
  studentName,
  studentId,
}: EnrolledCoursesTableProps) {
  const tableData = useMemo(
    () => ({
      nodes: (courses ?? [])
        .map((c) => ({ ...c, id: c.offering_id, studentId }))
        .sort((a, b) => {
          if (a.status === "active" && b.status !== "active") return -1;
          if (a.status !== "active" && b.status === "active") return 1;
          return 0;
        }),
    }),
    [courses, studentId],
  );

  return (
    <section
      aria-label="Enrolled Courses"
      className="min-w-full w-0 h-fit card p-0 overflow-hidden"
    >
      <div className="flex justify-between items-center gap-2 flex-wrap p-4">
        <h4 className="flex items-center gap-1.5">
          <BiSolidBookOpen className="text-text-secondary text-xl md:text-2xl shrink-0" />
          <span className="text-accent text-sm md:text-lg font-bold">
            All Enrolled Courses
          </span>
        </h4>

        <EnrollStudentModal studentId={studentId} studentName={studentName} />
      </div>

      {tableData.nodes.length === 0 ? (
        <p className="text-center text-xs md:text-sm text-text-subtle py-8">
          No Courses yet.
        </p>
      ) : (
        <Table tableData={tableData} columns={STUDENT_COURSES_COLUMNS} />
      )}
    </section>
  );
}

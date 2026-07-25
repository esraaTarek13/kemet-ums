import Table from "@/components/ui/tables/Table.Small";
import { FACULTY_COURSES_COLUMNS } from "@/data/admin/facultyCoursesColumns";
import { FacultyAssignedCourse } from "@/types";
import { useMemo } from "react";
import { BiSolidBookOpen } from "react-icons/bi";
import AssignedCoursesModal from "../assigned-courses-modal/AssignedCoursesModal";

interface AssignedCoursesTableProps {
  courses: FacultyAssignedCourse[];
  facultyId: string;
  facultyName: string;
  department: string;
}

export default function AssignedCoursesTable({
  courses,
  facultyId,
  facultyName,
  department,
}: AssignedCoursesTableProps) {
  const tableData = useMemo(
    () => ({
      // Defensive fallback in case courses is ever null/undefined from the API
      nodes: (courses ?? []).map((c) => ({ ...c, id: c.offering_id })),
    }),
    [courses],
  );

  return (
    <section className="grow card p-0 overflow-hidden min-w-full w-0">
      <div className="flex justify-between items-center gap-2 flex-wrap p-4">
        <h4 className="flex items-center gap-1.5">
          <BiSolidBookOpen className="text-text-secondary text-xl md:text-2xl shrink-0" />
          <span className="text-accent text-sm md:text-lg font-bold">
            Assigned Courses
          </span>
        </h4>

        <AssignedCoursesModal
          facultyId={facultyId}
          facultyName={facultyName}
          department={department}
        />
      </div>

      {tableData.nodes.length === 0 ? (
        <p className="text-center text-xs md:text-sm text-text-subtle py-8">
          No Courses yet.
        </p>
      ) : (
        <Table tableData={tableData} columns={FACULTY_COURSES_COLUMNS} />
      )}
    </section>
  );
}

import DropCourseButton from "@/components/admin/student-profile/DropCourseButton";
import StatusBadge from "@/components/ui/shared/StatusBadge";
import { StudentEnrolledCourse } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";

export type StudentCourseRow = StudentEnrolledCourse & {
  id: string;
  studentId: string;
};

export const STUDENT_COURSES_COLUMNS: Column<StudentCourseRow>[] = [
  {
    label: "Code",
    renderCell: (item: StudentCourseRow) => item.course_code ?? "—",
  },
  {
    label: "Course Name",
    renderCell: (item: StudentCourseRow) => item.course_name ?? "—",
  },
  {
    label: "Credits",
    renderCell: (item: StudentCourseRow) => item.credits ?? "—",
  },
  {
    label: "Semester",
    renderCell: (item: StudentCourseRow) => item.semester ?? "—",
  },
  {
    label: "Academic Year",
    renderCell: (item: StudentCourseRow) => item.academic_year ?? "—",
  },
  {
    label: "Grade",
    renderCell: (item: StudentCourseRow) => item.grade ?? "—",
  },
  {
    label: "Status",
    renderCell: (item: StudentCourseRow) =>
      item.status ? <StatusBadge status={item.status} /> : "—",
  },
  {
    label: "Actions",
    renderCell: (item: StudentCourseRow) =>
      item.status === "active" ? (
        <DropCourseButton
          enrollmentId={item.enrollment_id}
          studentId={item.studentId}
          courseName={item.course_name}
          hasGrade={item.grade !== null}
        />
      ) : (
        "—"
      ),
  },
];

import StatusBadge from "@/components/ui/shared/StatusBadge";
import { FacultyStudentCourse } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";

export type FacultyStudentCourseRow = FacultyStudentCourse & { id: string };

export const STUDENT_COURSES_COLUMNS: Column<FacultyStudentCourseRow>[] = [
  {
    label: "Code",
    renderCell: (item: FacultyStudentCourseRow) => item.course_code ?? "—",
  },
  {
    label: "Semester",
    renderCell: (item: FacultyStudentCourseRow) => item.semester ?? "—",
  },
  {
    label: "Attendance",
    renderCell: (item: FacultyStudentCourseRow) =>
      item.attendance_rate != null ? `${item.attendance_rate}%` : "—",
  },
  {
    label: "Quiz",
    renderCell: (item: FacultyStudentCourseRow) => item.quiz ?? "—",
  },
  {
    label: "Midterm",
    renderCell: (item: FacultyStudentCourseRow) => item.midterm ?? "—",
  },
  {
    label: "Final",
    renderCell: (item: FacultyStudentCourseRow) => item.final ?? "—",
  },
  {
    label: "Grade",
    renderCell: (item: FacultyStudentCourseRow) => item.grade ?? "—",
  },
  {
    label: "Submissions",
    renderCell: (item: FacultyStudentCourseRow) => item.submission_count ?? 0,
  },
  {
    label: "Status",
    renderCell: (item: FacultyStudentCourseRow) => (
      <StatusBadge status={item.enrollment_status} />
    ),
  },
];

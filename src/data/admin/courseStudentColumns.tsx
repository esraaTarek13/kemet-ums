import StatusBadge from "@/components/ui/shared/StatusBadge";
import { EnrolledStudent } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";

export type CourseStudentRow = EnrolledStudent & { id: string };

export const COURSE_STUDENTS_COLUMNS: Column<CourseStudentRow>[] = [
  {
    label: "Student Name",
    renderCell: (item: CourseStudentRow) => item.full_name ?? "—",
  },
  {
    label: "ID",
    renderCell: (item: CourseStudentRow) => item.student_code ?? "—",
  },
  {
    label: "Year",
    renderCell: (item: CourseStudentRow) =>
      item.year ? `Y${item.year}` : "—",
  },
  {
    label: "GPA",
    renderCell: (item: CourseStudentRow) => {
      const gpa = item.gpa ?? 0;
      const gpaClass = gpa < 2 ? "text-denger" : "text-text-primary";
      return <span className={`font-semibold ${gpaClass}`}>{gpa}</span>;
    },
  },
  {
    label: "Status",
    renderCell: (item: CourseStudentRow) =>
      item.status ? <StatusBadge status={item.status} /> : "—",
  },
];
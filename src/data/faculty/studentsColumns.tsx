import ProgressBar from "@/components/ui/shared/ProgressBar";
import StatusBadge from "@/components/ui/shared/StatusBadge";
import { FacultyStudent } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";

export type StudentRow = FacultyStudent & { id: string };

export const STUDENTS_COLUMNS: Column<StudentRow>[] = [
  {
    label: "Student Name",
    renderCell: (item: StudentRow) => (
      <span className="font-semibold">{item.full_name ?? "—"}</span>
    ),
  },
  {
    label: "ID",
    renderCell: (item: StudentRow) => (
      <span className="text-text-muted">{item.student_code ?? "—"}</span>
    ),
  },
  {
    label: "Course",
    renderCell: (item: StudentRow) => item.course_code ?? "—",
  },
  {
    label: "Attendance",
    renderCell: (item: StudentRow) => {
      const rate = item.attendance_rate ?? 0;
      const progressClass =
        rate >= 75 ? "bg-accent" : rate >= 50 ? "bg-[#C084A0]" : "bg-[#E8A0A0]";
      const textClass =
        rate >= 75
          ? "text-accent"
          : rate >= 50
            ? "text-[#C084A0]"
            : "text-[#E8A0A0]";

      return (
        <div className="min-w-25">
          <ProgressBar
            value={rate}
            progressClass={progressClass}
            textClass={textClass}
          />
        </div>
      );
    },
  },
  {
    label: "Grade",
    renderCell: (item: StudentRow) => (
      <span className="font-semibold text-accent">{item.grade ?? "—"}</span>
    ),
  },
  {
    label: "Status",
    renderCell: (item: StudentRow) =>
      item.enrollment_status ? (
        <StatusBadge status={item.enrollment_status} />
      ) : (
        "—"
      ),
  },
];

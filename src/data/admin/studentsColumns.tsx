import ProgressBar from "@/components/ui/shared/ProgressBar";
import StatusBadge from "@/components/ui/shared/StatusBadge";
import { AdminStudent } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";
import { FaEye } from "react-icons/fa6";

export type StudentRow = AdminStudent & { id: string };

export const getStudentsColumns = (
  onView: (id: string) => void,
): Column<StudentRow>[] => [
  {
    label: "Student Name",
    renderCell: (item: StudentRow) => item.full_name ?? "—",
    select: true,
  },
  {
    label: "ID",
    renderCell: (item: StudentRow) => item.student_code ?? "—",
  },
  {
    label: "Department",
    renderCell: (item: StudentRow) => item.department ?? "—",
  },
  {
    label: "Year",
    renderCell: (item: StudentRow) =>
      item.academic_year ? `Y${item.academic_year}` : "—",
  },
  {
    label: "Credits",
    renderCell: (item: StudentRow) => {
      const rate = item.credits_completed ?? 0;
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
    label: "GPA",
    renderCell: (item: StudentRow) => {
      const gpa = item.gpa ?? 0;
      const gpaClass = gpa < 2 ? "text-[#E8A0A0]" : "text-text-primary";
      return <span className={`font-semibold ${gpaClass}`}>{gpa}</span>;
    },
  },
  {
    label: "Status",
    renderCell: (item: StudentRow) =>
      item.status ? <StatusBadge status={item.status} /> : "—",
  },
  {
    label: "Actions",
    renderCell: (item: StudentRow) => (
      <button
        type="button"
        onClick={() => onView(item.id)}
        className="text-text-secondary hover:text-accent/90 transition-colors cursor-pointer ml-4"
        aria-label="View student details"
      >
        <FaEye size={16} />
      </button>
    ),
  },
];

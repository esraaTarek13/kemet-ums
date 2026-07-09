import ProgressBar from "@/components/ui/shared/ProgressBar";
import { DepartmentPerformance } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";

export type DepartmentRow = DepartmentPerformance & { id: string };

function getRateClasses(rate: number) {
  const progressClass =
    rate >= 75 ? "bg-accent" : rate >= 50 ? "bg-[#C084A0]" : "bg-[#E8A0A0]";
  const textClass =
    rate >= 75
      ? "text-accent"
      : rate >= 50
        ? "text-[#C084A0]"
        : "text-[#E8A0A0]";
  return { progressClass, textClass };
}

export const DEPARTMENT_PERFORMANCE_COLUMNS: Column<DepartmentRow>[] = [
  {
    label: "Department",
    renderCell: (item: DepartmentRow) => item.department ?? "—",
  },
  {
    label: "Students",
    renderCell: (item: DepartmentRow) => item.students ?? "—",
  },
  {
    label: "Avg GPA",
    renderCell: (item: DepartmentRow) =>
      item.avg_gpa != null ? item.avg_gpa.toFixed(2) : "—",
  },
  {
    label: "Pass Rate",
    renderCell: (item: DepartmentRow) => {
      const rate = item.pass_rate ?? 0;
      const { progressClass, textClass } = getRateClasses(rate);
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
    label: "Completion Rate",
    renderCell: (item: DepartmentRow) => {
      const rate = item.completion_rate ?? 0;
      const { progressClass, textClass } = getRateClasses(rate);
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
];

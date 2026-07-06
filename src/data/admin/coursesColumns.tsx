import ProgressBar from "@/components/ui/shared/ProgressBar";
import StatusBadge from "@/components/ui/shared/StatusBadge";
import { AdminCourse } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";
import { HiOutlineDotsVertical } from "react-icons/hi";

export type CourseRow = AdminCourse & { id: string };

export const COURSES_COLUMNS: Column<CourseRow>[] = [
  {
    label: "Course Name",
    renderCell: (item: CourseRow) => item.course_name ?? "—",
    select: true,
  },
  {
    label: "Code",
    renderCell: (item: CourseRow) => item.course_code ?? "—",
  },
  {
    label: "Department",
    renderCell: (item: CourseRow) => item.department ?? "—",
  },
  {
    label: "Credits",
    renderCell: (item: CourseRow) => item.credits ?? "—",
  },
  {
    label: "Faculty",
    renderCell: (item: CourseRow) => item.faculty_name ?? "—",
  },
  {
    label: "Enrolled",
    renderCell: (item: CourseRow) => {
      const rate = item.enrolled_count ?? 0;
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
    label: "Status",
    renderCell: (item: CourseRow) =>
      item.status ? <StatusBadge status={item.status} /> : "—",
  },
  {
    label: "Actions",
    renderCell: () => (
      <button
        type="button"
        className="p-1 rounded hover:bg-bg-filter text-text-muted cursor-pointer"
        aria-label="Actions"
      >
        <HiOutlineDotsVertical className="text-lg" />
      </button>
    ),
  },
];

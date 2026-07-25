import ProgressBar from "@/components/ui/shared/ProgressBar";
import StatusBadge from "@/components/ui/shared/StatusBadge";
import { AdminCourse } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";
import { FaEye } from "react-icons/fa6";

export type CourseRow = AdminCourse & { id: string };

export const getCoursesColumns = (
  onView: (id: string) => void,
): Column<CourseRow>[] => [
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
    renderCell: (item: CourseRow) => (
      <button
        type="button"
        onClick={() => onView(item.offering_id)}
        className="text-text-secondary hover:text-accent/90 transition-colors cursor-pointer ml-4"
        aria-label="View course details"
      >
        <FaEye size={16} />
      </button>
    ),
  },
];

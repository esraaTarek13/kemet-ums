import StatusBadge from "@/components/ui/shared/StatusBadge";
import { AdminFaculty } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";
import { FaEye } from "react-icons/fa6";

export type FacultyRow = AdminFaculty & { id: string };

export const getFacultyColumns = (
  onView: (id: string) => void,
): Column<FacultyRow>[] => [
  {
    label: "Faculty Name",
    renderCell: (item: FacultyRow) => item.full_name ?? "—",
    select: true,
  },
  {
    label: "ID",
    renderCell: (item: FacultyRow) => item.faculty_code ?? "—",
  },
  {
    label: "Department",
    renderCell: (item: FacultyRow) => item.department ?? "—",
  },
  {
    label: "Rank",
    renderCell: (item: FacultyRow) => item.rank ?? "—",
  },
  {
    label: "Type",
    renderCell: (item: FacultyRow) =>
      item.employment_type ? item.employment_type.replace("_", " ") : "—",
  },
  {
    label: "Courses",
    renderCell: (item: FacultyRow) => item.courses_count ?? 0,
  },
  {
    label: "Students",
    renderCell: (item: FacultyRow) => item.students_count ?? 0,
  },
  {
    label: "Status",
    renderCell: (item: FacultyRow) =>
      item.status ? <StatusBadge status={item.status} /> : "—",
  },
  {
    label: "Actions",
    renderCell: (item: FacultyRow) => (
      <button
        type="button"
        onClick={() => onView(item.id)}
        className="text-text-secondary hover:text-accent/90 transition-colors cursor-pointer ml-4"
        aria-label="View faculty details"
      >
        <FaEye size={16} />
      </button>
    ),
  },
];
import StatusBadge from "@/components/ui/shared/StatusBadge";
import { RecentStudent } from "@/types";

export const RECENT_STUDENTS_COLUMNS = [
  {
    label: "ID",
    renderCell: (item: RecentStudent) => `#${item.student_code}`,
  },
  {
    label: "Name",
    renderCell: (item: RecentStudent) => item.full_name,
  },
  {
    label: "Department",
    renderCell: (item: RecentStudent) => item.department,
  },
  {
    label: "Year",
    renderCell: (item: RecentStudent) => `Year ${item.academic_year}`,
  },
  {
    label: "Status",
    renderCell: (item: RecentStudent) => <StatusBadge status={item.status} />,
  },
];
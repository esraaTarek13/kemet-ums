import StatusBadge from "@/components/ui/shared/StatusBadge";
import { FacultyCourse } from "@/types";

export const COLUMNS = [
  { label: "Code", renderCell: (item: FacultyCourse) => item.course_code },
  {
    label: "Course Name",
    renderCell: (item: FacultyCourse) => item.course_name ?? "—",
  },
  {
    label: "Enrolled",
    renderCell: (item: FacultyCourse) =>
      item.enrolled_count
        ? `${item.enrolled_count} ${item.enrolled_count === 1 ? "Student" : "Students"}`
        : "—",
  },
  { label: "Room", renderCell: (item: FacultyCourse) => item.room ?? "—" },
  {
    label: "Status",
    renderCell: (item: FacultyCourse) =>
      item.status ? <StatusBadge status={item.status} /> : "—",
  },
];

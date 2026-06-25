import StatusBadge from "@/components/ui/shared/StatusBadge";
import { GradesCourse } from "@/types";

export const COLUMNS = [
  { label: "Code", renderCell: (item: GradesCourse) => item.course_code },
  {
    label: "Credits",
    renderCell: (item: GradesCourse) => `${item.credits} cr`,
  },
  { label: "Quiz", renderCell: (item: GradesCourse) => item.quiz ?? "—" },
  { label: "Midterm", renderCell: (item: GradesCourse) => item.midterm ?? "—" },
  { label: "Final", renderCell: (item: GradesCourse) => item.final ?? "—" },
  { label: "Grade", renderCell: (item: GradesCourse) => item.grade ?? "—" },
  {
    label: "Status",
    renderCell: (item: GradesCourse) => <StatusBadge status={item.status} />,
  },
];
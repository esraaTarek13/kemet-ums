import StatusBadge from "@/components/ui/shared/StatusBadge";
import { FacultyRecentSubmission } from "@/types";
import { format } from "date-fns";

export const COLUMNS = [
  {
    label: "Student Name",
    renderCell: (item: FacultyRecentSubmission) => item.student_name ?? "—",
  },
  {
    label: "Course",
    renderCell: (item: FacultyRecentSubmission) => item.course_code ?? "—",
  },
  {
    label: "Submitted",
    renderCell: (item: FacultyRecentSubmission) =>
      item.submitted_at ? format(new Date(item.submitted_at), "d MMM") : "—",
  },
  {
    label: "Grade",
    renderCell: (item: FacultyRecentSubmission) => item.grade ?? "—",
  },
  {
    label: "Status",
    renderCell: (item: FacultyRecentSubmission) =>
      item.status ? <StatusBadge status={item.status} /> : "—",
  },
];

import { formatSchedule } from "@/lib/utils/admin/formatSchedule";
import { FacultyAssignedCourse } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";

export type FacultyCourseRow = FacultyAssignedCourse & { id: string };

export const FACULTY_COURSES_COLUMNS: Column<FacultyCourseRow>[] = [
  {
    label: "Code",
    renderCell: (item: FacultyCourseRow) => item.course_code ?? "—",
  },
  {
    label: "Course Name",
    renderCell: (item: FacultyCourseRow) => item.course_name ?? "—",
  },
  {
    label: "Credits",
    renderCell: (item: FacultyCourseRow) => item.credits ?? "—",
  },
  {
    label: "Enrolled",
    renderCell: (item: FacultyCourseRow) =>
      item.enrolled_count != null && item.max_students != null
        ? `${item.enrolled_count} / ${item.max_students}`
        : "—",
  },
  {
    label: "Schedule",
    renderCell: (item) => formatSchedule(item),
  },
];

import { FacultyStudent } from "@/types";
import { FilterConfig } from "@/types/shared/filterConfig";

export function mapToStudentFilters(students?: FacultyStudent[]): FilterConfig[] {
  const courseOptions = [...new Set(students?.map((s) => s.course_code).filter(Boolean) ?? [])];
  const gradeOptions = [...new Set(students?.map((s) => s.grade).filter(Boolean) ?? [])];

  return [
    { key: "course", placeholder: "All Courses", options: courseOptions },
    { key: "grade", placeholder: "All Grades", options: gradeOptions },
  ];
}
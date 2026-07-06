import { FilterConfig } from "@/types";

const COURSE_STATIC_FILTERS: FilterConfig[] = [
  { key: "status", placeholder: "Status", options: ["active", "inactive"] },
];

export function buildCourseFilters(departments: string[] = []): FilterConfig[] {
  return [
    {
      key: "department",
      placeholder: "Department",
      options: departments,
    },
    ...COURSE_STATIC_FILTERS,
  ];
}

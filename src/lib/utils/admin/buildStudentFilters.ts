import { FilterConfig } from "@/types";

const STUDENT_STATIC_FILTERS: FilterConfig[] = [
  { key: "year", placeholder: "Year", options: ["1", "2", "3", "4"] },
  {
    key: "status",
    placeholder: "Status",
    options: ["active", "at_risk", "graduated", "suspended"],
  },
];

export function buildStudentFilters(
  departments: string[] = [],
): FilterConfig[] {
  return [
    {
      key: "department",
      placeholder: "Department",
      options: departments,
    },
    ...STUDENT_STATIC_FILTERS,
  ];
}

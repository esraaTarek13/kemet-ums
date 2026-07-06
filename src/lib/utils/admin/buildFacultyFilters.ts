import { FilterConfig } from "@/types";

const FACULTY_STATIC_FILTERS: FilterConfig[] = [
  {
    key: "rank",
    placeholder: "Rank",
    options: [
      "professor",
      "associate_professor",
      "assistant_professor",
      "lecturer",
    ],
  },
  {
    key: "status",
    placeholder: "Status",
    options: ["active", "inactive", "on_leave"],
  },
];

export function buildFacultyFilters(
  departments: string[] = [],
): FilterConfig[] {
  return [
    {
      key: "department",
      placeholder: "Department",
      options: departments,
    },
    ...FACULTY_STATIC_FILTERS,
  ];
}

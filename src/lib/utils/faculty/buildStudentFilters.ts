import { FilterConfig } from "@/types";

type Offering = {
  offering_id: string;
  course_code: string;
};

const STUDENT_STATIC_FILTERS: FilterConfig[] = [
  {
    key: "status",
    placeholder: "Status",
    options: ["active", "completed"],
  },
];

export function buildStudentFilters(
  offerings: Offering[] = [],
): FilterConfig[] {
  const courseOptions = offerings.map((o) => ({
    value: o.offering_id,
    label: o.course_code,
  }));

  return [
    { key: "course", placeholder: "Courses", options: courseOptions },
    ...STUDENT_STATIC_FILTERS,
  ];
}

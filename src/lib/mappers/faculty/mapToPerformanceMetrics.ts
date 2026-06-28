import { FacultyPerformanceIndex } from "@/types";

export function mapToPerformanceMetrics(data?: FacultyPerformanceIndex) {
  return [
    {
      label: "Student Performance",
      value: data?.student_performance ?? 0,
      textClass: "text-success",
      progressClass: "bg-success",
    },
    {
      label: "Assignment Completion",
      value: data?.assignment_completion ?? 0,
      textClass: "text-accent",
      progressClass: "bg-accent",
    },
  ];
}
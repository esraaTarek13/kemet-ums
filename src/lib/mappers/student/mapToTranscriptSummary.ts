import { StudentGrades } from "@/types";

export function mapToTranscriptSummary(data?: StudentGrades) {
  return [
    {
      label: "Total Credits",
      value: data?.total_credits ?? "0",
      valueClassName: "text-primary text-xl md:text-2xl lg:text-3xl",
    },
    {
      label: "Semester GPA",
      value: data?.semester_gpa ?? "0",
      valueClassName: "text-primary text-xl md:text-2xl lg:text-3xl",
    },
    {
      label: "Standing",
      value: data?.standing ?? "",
      valueClassName: "text-success bg-success-bg py-1 px-3",
    },
  ];
}
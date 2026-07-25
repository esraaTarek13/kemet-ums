import { FiTrendingUp, FiBarChart2 } from "react-icons/fi";
import { ReportsSummary } from "@/types"; 

export function mapToReportsSummary(data: ReportsSummary) {
  return [
    {
      key: "academic_performance",
      label: "Academic Performance",
      subtitle: `GPA ${data.avg_gpa.toFixed(2)} / 4.0`,
      value: data.pass_rate,
      icon: FiTrendingUp,
      iconClass: "text-success",
      progressClass: "bg-accent",
      textClass: "text-accent",
    },
    {
      key: "completion_rate",
      label: "Completion Rate",
      subtitle: "Overall Campus",
      value: data.completion_rate,
      icon: FiBarChart2,
      iconClass: "text-text-subtle",
      progressClass: "bg-text-secondary",
      textClass: "text-accent",
    },
  ];
}
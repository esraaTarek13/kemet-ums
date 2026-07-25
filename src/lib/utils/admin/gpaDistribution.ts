import { GPA_RANGES } from "@/data/admin/gpa";
import { GpaBarItem, GpaDistribution } from "@/types";

export function buildGpaChartData(gpa?: GpaDistribution) {
  const chartData: GpaBarItem[] = GPA_RANGES.map(({ key, label }) => ({
    key,
    label,
    value: gpa?.[key] ?? 0,
  }));

  const totalStudents = chartData.reduce((sum, item) => sum + item.value, 0);

  const chartSummary = chartData
    .map(
      (item) =>
        `${item.label}: ${item.value} student${item.value === 1 ? "" : "s"}`,
    )
    .join(", ");

  return { chartData, totalStudents, chartSummary };
}

import { StudentGrades } from "@/types"; 

const SEMESTER_ORDER: Record<string, number> = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
};

export function buildGpaTrendChartData(
  gpaTrend: StudentGrades["gpa_trend"] | undefined,
) {
  const chartData = (gpaTrend ?? [])
    .slice()
    .sort((a, b) => {
      const [semNameA, yearA] = a.semester.split(" ");
      const [semNameB, yearB] = b.semester.split(" ");

      if (yearA !== yearB) return Number(yearA) - Number(yearB);

      return (
        (SEMESTER_ORDER[semNameA] ?? 99) - (SEMESTER_ORDER[semNameB] ?? 99)
      );
    })
    .map((item) => ({
      label: item.semester
        .replace("Fall", "F")
        .replace("Spring", "S")
        .replace("Summer", "Su"),
      gpa: item.gpa,
    }));

  // Text summary for screen readers, since the chart SVG isn't accessible
  const chartSummary = chartData
    .map((item) => `${item.label}: ${item.gpa.toFixed(2)}`)
    .join(", ");

  return { chartData, chartSummary };
}
import { EnrollmentTrendItem } from "@/types";

const SEMESTER_ORDER: Record<string, number> = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
};

export interface EnrollmentChartData {
  label: string;
  fullLabel: string;
  count: number;
}

export function formatEnrollmentTrend(
  trend: EnrollmentTrendItem[] | undefined,
): EnrollmentChartData[] {
  return (trend ?? [])
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
        .replace("Fall", "Fall ")
        .split(" ")[0]
        .toUpperCase()
        .slice(0, 3),
      fullLabel: item.semester,
      count: item.count,
    }));
}

export function getEnrollmentChartSummary(data: EnrollmentChartData[]): string {
  return data
    .map((item) => `${item.fullLabel}: ${item.count} students`)
    .join(", ");
}

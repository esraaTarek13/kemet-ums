"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import GpaTrendChartSkeleton from "@/components/ui/skeletons/GpaTrendChartSkeleton";
import { useStudentGrades } from "@/hooks/student/useStudentGrades";
import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts";

const SEMESTER_ORDER: Record<string, number> = {
  Spring: 1,
  Summer: 2,
  Fall: 3,
};

export default function GpaTrendChart() {
  const { data, isPending, isError } = useStudentGrades();

  if (isPending) return <GpaTrendChartSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load GPA trend." />;

  const chartData = (data?.gpa_trend ?? [])
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

  return (
    <div className="card h-full lg:h-fit w-full lg:w-65 p-4 md:p-6 rounded-xl">
      <p className="text-text-secondary text-sm uppercase tracking-wider mb-2">
        GPA Trend
      </p>

      {chartData.length === 0 ? (
        <p className="text-text-subtle text-sm py-8 text-center">
          No GPA history yet.
        </p>
      ) : (
        <div role="img" aria-label={`GPA trend by semester: ${chartSummary}`}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="label" tick={{ fontSize: 10 }} />
              <Bar
                dataKey="gpa"
                fill="var(--color-accent)"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}

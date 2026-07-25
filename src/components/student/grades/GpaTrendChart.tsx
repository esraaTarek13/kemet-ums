"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import GpaTrendChartSkeleton from "@/components/ui/skeletons/GpaTrendChartSkeleton";
import { useStudentGrades } from "@/hooks/student/grades/queries/useStudentGrades";
import { buildGpaTrendChartData } from "@/lib/utils/student/buildGpaTrendChartData";
import { useMemo } from "react";
import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts";

export default function GpaTrendChart() {
  const { data, isPending, isError } = useStudentGrades();

  const { chartData, chartSummary } = useMemo(
    () => buildGpaTrendChartData(data?.gpa_trend),
    [data],
  );

  if (isPending) return <GpaTrendChartSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load GPA trend." />;

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
          <ResponsiveContainer width="100%" height={180}>
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

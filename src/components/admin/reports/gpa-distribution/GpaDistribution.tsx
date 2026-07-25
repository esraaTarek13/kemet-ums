"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import GpaTrendChartSkeleton from "@/components/ui/skeletons/GpaTrendChartSkeleton";
import { GPA_BAR_COLOR } from "@/data/admin/gpa";
import { useAdminReports } from "@/hooks/admin/report/queries/useAdminReports";
import { buildGpaChartData } from "@/lib/utils/admin/gpaDistribution";
import { Bar, BarChart, XAxis, ResponsiveContainer } from "recharts";

export default function GpaDistribution() {
  const { data, isPending, isError } = useAdminReports();
  console.log(data);

  if (isPending) return <GpaTrendChartSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load GPA distribution." />;

  const { chartData, totalStudents, chartSummary } = buildGpaChartData(
    data?.gpa_distribution,
  );

  return (
    <section className="card h-full w-full md:w-80">
      <h4 className="text-text-secondary text-sm md:text-base font-bold mb-2">
        GPA Distribution
      </h4>

      {totalStudents === 0 ? (
        <p className="text-text-subtle text-sm py-8 text-center">
          No GPA data yet.
        </p>
      ) : (
        <div role="img" aria-label={`GPA distribution: ${chartSummary}`}>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={chartData}>
              <XAxis dataKey="label" tick={{ fontSize: 10 }} />
              <Bar dataKey="value" fill={GPA_BAR_COLOR} radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </section>
  );
}

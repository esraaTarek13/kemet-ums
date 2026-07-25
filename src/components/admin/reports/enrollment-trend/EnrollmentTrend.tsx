"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { EnrollmentSkeleton } from "@/components/ui/skeletons/EnrollmentSkeleton";
import { useAdminReports } from "@/hooks/admin/report/queries/useAdminReports";
import AreaTrendChart from "@/components/ui/charts/AreaTrendChart";
import {
  formatEnrollmentTrend,
  getEnrollmentChartSummary,
} from "@/lib/utils/admin/enrollmentTrend";

export default function EnrollmentTrend() {
  const { data, isPending, isError } = useAdminReports();

  if (isPending) return <EnrollmentSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load enrollment trend." />;

  const chartData = formatEnrollmentTrend(data?.enrollment_trend);
  const chartSummary = getEnrollmentChartSummary(chartData);

  return (
    <section className="card grow min-w-[50%]">
      <h4 className="text-text-secondary text-sm md:text-base font-bold mb-2">
        Enrollment Trend
      </h4>

      {chartData.length === 0 ? (
        <p className="text-text-subtle text-sm py-8 text-center">
          No enrollment data yet.
        </p>
      ) : (
        <div
          role="img"
          aria-label={`Enrollment trend by semester: ${chartSummary}`}
        >
          <AreaTrendChart
            data={chartData}
            xAxisKey="label"
            dataKey="count"
            gradientId="reportEnrollGradient"
            strokeWidth={2}
            tooltipFormatter={(value) => [`${value} students`, "Enrollment"]}
            tooltipLabelFormatter={(_, payload) =>
              payload?.[0]?.payload?.fullLabel ?? ""
            }
          />
        </div>
      )}
    </section>
  );
}

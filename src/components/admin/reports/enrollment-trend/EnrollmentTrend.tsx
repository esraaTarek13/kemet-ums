"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { EnrollmentSkeleton } from "@/components/ui/skeletons/EnrollmentSkeleton";
import { useAdminReports } from "@/hooks/admin/useAdminReports";
import {
  formatEnrollmentTrend,
  getEnrollmentChartSummary,
} from "@/lib/utils/admin/reportEnrollmentTrend";
import EnrollmentChart from "./EnrollmentChart";

export default function EnrollmentTrend() {
  const { data, isPending, isError } = useAdminReports();

  if (isPending) return <EnrollmentSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load enrollment trend." />;

  const chartData = formatEnrollmentTrend(data?.enrollment_trend);
  const chartSummary = getEnrollmentChartSummary(chartData);

  return (
    <section className="card grow">
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
          <EnrollmentChart data={chartData} />
        </div>
      )}
    </section>
  );
}

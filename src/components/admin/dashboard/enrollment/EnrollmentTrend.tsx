"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { EnrollmentSkeleton } from "@/components/ui/skeletons/EnrollmentSkeleton";
import AreaTrendChart from "@/components/ui/charts/AreaTrendChart";
import { useEnrollmentTrend } from "@/hooks/admin/dashboard/queries/useEnrollmentTrend";
import { getDateRange } from "@/lib/utils/admin/dashboardEnrollment";

export default function EnrollmentTrend() {
  const { data, isError, isPending } = useEnrollmentTrend();
  const dateRange = getDateRange(data);

  if (isPending) return <EnrollmentSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load enrollment data." />;

  return (
    <section
      aria-labelledby="enrollment-title"
      className="w-full min-h-50 md:min-h-62 lg:min-h-75 card space-y-4 lg:space-y-6"
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <h3 id="enrollment-title" className="title">
          Enrollment Overview
        </h3>

        <p
          aria-live="polite"
          aria-label={`Showing enrollment data for ${dateRange}`}
          className="bg-bg-filter py-1 px-2 md:px-3 rounded-full text-[10px] md:text-xs uppercase"
        >
          {dateRange}
        </p>
      </div>

      {/* Delegated to separate component for clarity */}
      <AreaTrendChart
        data={data}
        xAxisKey="month"
        dataKey="count"
        gradientId="dashboardEnrollGradient"
        xAxisTickFormatter={(value) => value.toUpperCase()}
      />
    </section>
  );
}

"use client";
import StatCard from "@/components/ui/dashboard/StatCard";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { useAdminReports } from "@/hooks/admin/report/queries/useAdminReports";
import { mapToAdminReportStats } from "@/lib/mappers/admin/mapToAdminReportStats";

export default function ReportsStats() {
  const { data, isPending, isError } = useAdminReports();
  const statsData = data?.stats;

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;

  const stats = mapToAdminReportStats(statsData);

  return (
    <section
      aria-label="Admin Student statistics"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4"
    >
      {stats?.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

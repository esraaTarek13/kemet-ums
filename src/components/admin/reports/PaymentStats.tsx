"use client";
import StatCard from "@/components/ui/dashboard/StatCard";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { useFinancialReportsSummary } from "@/hooks/admin/report/queries/useFinancialReportsSummary";
import { mapToPaymentStats } from "@/lib/mappers/admin/mapToPaymentStats";

interface PaymentStatsProps {
  semester: string;
  academicYear: string;
}

export default function PaymentStats({
  semester,
  academicYear,
}: PaymentStatsProps) {
  const { data, isPending, isError } = useFinancialReportsSummary({
    semester,
    academicYear,
  });

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;

  const stats = mapToPaymentStats(data);

  return (
    <section
      aria-label="Payment statistics"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

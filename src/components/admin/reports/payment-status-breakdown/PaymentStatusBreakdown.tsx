"use client";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { usePaymentStatusBreakdown } from "@/hooks/admin/report/queries/usePaymentStatusBreakdown";
import { mapToPaymentStatusChart } from "@/lib/mappers/admin/mapToPaymentStatusChart";
import DonutChart from "@/components/ui/charts/DonutChart";
import DonutChartSkeleton from "@/components/ui/skeletons/DonutChartSkeleton";

interface PaymentStatusBreakdownProps {
  semester: string;
  academicYear: string;
}

export default function PaymentStatusBreakdown({
  semester,
  academicYear,
}: PaymentStatusBreakdownProps) {
  const { data, isPending, isError } = usePaymentStatusBreakdown({
    semester,
    academicYear,
  });

  if (isPending) return <DonutChartSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load payment status." />;

  if (!data || data.total_students === 0) {
    return (
      <div className="card space-y-5">
        <h4 className="title">Payment Status Breakdown</h4>
        <p className="text-text-secondary text-xs md:text-sm">
          No data for this semester.
        </p>
      </div>
    );
  }

  const chartData = mapToPaymentStatusChart(data);

  return (
    <div className="card space-y-5">
      <h4 className="title">Payment Status Breakdown</h4>

      <DonutChart data={chartData} centerValue="100%" centerLabel="Total" />

      <div className="flex justify-center items-center gap-4 flex-wrap text-xs">
        {chartData.map((entry) => (
          <div key={entry.name} className="flex items-center gap-1.5">
            <span
              className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-text-secondary">
              {entry.name} ({entry.value}%)
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

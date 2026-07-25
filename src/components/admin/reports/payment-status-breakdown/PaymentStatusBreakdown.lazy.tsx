"use client";
import dynamic from "next/dynamic";
import DonutChartSkeleton from "@/components/ui/skeletons/DonutChartSkeleton";

const PaymentStatusBreakdown = dynamic(
  () => import("./PaymentStatusBreakdown"),
  {
    loading: () => <DonutChartSkeleton />,
    ssr: false,
  }
);

export default PaymentStatusBreakdown;
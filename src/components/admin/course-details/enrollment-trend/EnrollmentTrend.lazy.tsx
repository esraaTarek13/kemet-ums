"use client"
import DonutChartSkeleton from "@/components/ui/skeletons/DonutChartSkeleton";
import dynamic from "next/dynamic";

const EnrollmentTrend = dynamic(() => import("./EnrollmentTrend"), {
  loading: () => <DonutChartSkeleton />,
  ssr: false,
});

export default EnrollmentTrend;

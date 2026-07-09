"use client";
import dynamic from "next/dynamic";
import GpaTrendChartSkeleton from "@/components/ui/skeletons/GpaTrendChartSkeleton";

const GpaDistribution = dynamic(
  () => import("./GpaDistribution"),
  {
    loading: () => <GpaTrendChartSkeleton />,
    ssr: false,
  }
);

export default GpaDistribution;
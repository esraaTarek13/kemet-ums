"use client"
import { EnrollmentSkeleton } from "@/components/ui/skeletons/EnrollmentSkeleton";
import dynamic from "next/dynamic";

const EnrollmentTrend = dynamic(() => import("./EnrollmentTrend"), {
  loading: () => <EnrollmentSkeleton />,
  ssr: false,
});

export default EnrollmentTrend;

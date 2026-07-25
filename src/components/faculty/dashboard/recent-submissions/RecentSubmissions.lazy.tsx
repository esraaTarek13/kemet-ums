"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const RecentSubmissions = dynamic(() => import("./RecentSubmissions"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default RecentSubmissions;

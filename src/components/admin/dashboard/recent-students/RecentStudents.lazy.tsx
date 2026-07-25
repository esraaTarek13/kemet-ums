"use client"
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const RecentStudents = dynamic(() => import("./RecentStudents"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default RecentStudents;

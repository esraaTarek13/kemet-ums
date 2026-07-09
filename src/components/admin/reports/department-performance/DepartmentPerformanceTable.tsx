"use client";

import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const DepartmentPerformanceTableInner = dynamic(
  () => import("./DepartmentPerformanceTableInner"),
  {
    ssr: false,
    loading: () => <TableSkeleton />,
  },
);

export default function DepartmentPerformanceTable() {
  return (
    <section aria-label="Department Performance">
      <DepartmentPerformanceTableInner />
    </section>
  );
}

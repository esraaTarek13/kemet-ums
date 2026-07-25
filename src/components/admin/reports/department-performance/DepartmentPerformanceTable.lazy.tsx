"use client"
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const DepartmentPerformanceTable = dynamic(() => import("./DepartmentPerformanceTable"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default DepartmentPerformanceTable;

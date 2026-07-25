"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const StudentTable = dynamic(() => import("./StudentTable"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default StudentTable;

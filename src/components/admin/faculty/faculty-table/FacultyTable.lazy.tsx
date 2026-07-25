"use client"
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const FacultyTable = dynamic(() => import("./FacultyTable"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default FacultyTable;

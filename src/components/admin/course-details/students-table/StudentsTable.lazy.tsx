"use client"
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const StudentsTable = dynamic(() => import("./StudentsTable"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default StudentsTable;

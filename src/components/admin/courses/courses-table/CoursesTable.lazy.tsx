"use client"
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const CoursesTable = dynamic(() => import("./CoursesTable"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default CoursesTable;

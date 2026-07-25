"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const EnrolledCoursesTable = dynamic(() => import("./EnrolledCoursesTable"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default EnrolledCoursesTable;

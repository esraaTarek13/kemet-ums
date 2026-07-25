"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

// ssr: false — table relies on client-only libs/interactions, avoids hydration mismatch
const AssignedCoursesTable = dynamic(() => import("./AssignedCoursesTable"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default AssignedCoursesTable;
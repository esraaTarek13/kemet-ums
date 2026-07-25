"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const ActiveCourses = dynamic(() => import("./ActiveCourses"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default ActiveCourses;

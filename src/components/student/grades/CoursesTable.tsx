"use client";
import dynamic from "next/dynamic";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";

// table-library relies on browser APIs, so disable SSR for this component
const CoursesTableInner = dynamic(() => import("./CoursesTableInner"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function CoursesTable() {
  return (
    <div className="min-w-full w-0">
      <CoursesTableInner />
    </div>
  );
}
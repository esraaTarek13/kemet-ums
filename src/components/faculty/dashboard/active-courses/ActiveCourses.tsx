"use client";
import dynamic from "next/dynamic";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";

// table-library relies on browser APIs, so disable SSR for this component
const ActiveCoursesInner = dynamic(
  () => import("./ActiveCoursesInner"),
  {
    ssr: false,
    loading: () => <TableSkeleton />,
  },
);

export default function ActiveCourses() {
  return (
    <section aria-label="Active courses" className="min-w-full w-0">
      <ActiveCoursesInner />
    </section>
  );
}

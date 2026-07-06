"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const CoursesTableInner = dynamic(() => import("./CoursesTableInner"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function CoursesTable() {
  return (
    <section aria-label="Courses"  className="flex flex-col gap-5 md:gap-6 min-w-full w-0">
      <CoursesTableInner />
    </section>
  );
}

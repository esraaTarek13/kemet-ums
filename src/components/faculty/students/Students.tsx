"use client";
import dynamic from "next/dynamic";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";

// table-library relies on browser APIs, so disable SSR for this component
const StudentsInner = dynamic(() => import("./StudentsInner"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function Students() {
  return (
    <section aria-label="Students" className="flex flex-col gap-5 md:gap-6 min-w-full w-0">
      <StudentsInner />
    </section>
  );
}
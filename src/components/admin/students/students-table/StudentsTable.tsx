"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const StudentsTableInner = dynamic(() => import("./StudentsTableInner"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function StudentsTable() {
  return (
    <section aria-label="Students" className="flex flex-col gap-5 md:gap-6 min-w-full w-0">
      <StudentsTableInner />
    </section>
  );
}

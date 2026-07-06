"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const FacultyTableInner = dynamic(() => import("./FacultyTableInner"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function FacultyTable() {
  return (
    <section aria-label="Faculty"  className="flex flex-col gap-5 md:gap-6 min-w-full w-0">
      <FacultyTableInner />
    </section>
  );
}

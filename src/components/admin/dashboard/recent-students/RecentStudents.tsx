"use client";
import dynamic from "next/dynamic";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";

// table-library relies on browser APIs, so disable SSR for this component
const RecentStudentsInner = dynamic(() => import("./RecentStudentsInner"), {
    ssr: false,
    loading: () => <TableSkeleton />,
})

export default function RecentStudents() {
  return (
    <section aria-label="Recent Students" className="min-w-full w-0 ">
      <RecentStudentsInner />
    </section>
  );
}

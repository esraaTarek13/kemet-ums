"use client";

import dynamic from "next/dynamic";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";

// table-library relies on browser APIs, so disable SSR for this component
const GradesInner = dynamic(() => import("./GradesInner"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function GradesSection({ courseId }: { courseId: string }) {
  return (
    <section
      aria-label="Grades"
      className="min-w-full w-0 space-y-3"
    >
      <GradesInner courseId={courseId} />
    </section>
  );
}

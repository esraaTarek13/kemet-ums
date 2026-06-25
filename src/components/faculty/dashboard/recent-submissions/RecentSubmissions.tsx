"use client";
import dynamic from "next/dynamic";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";

// table-library relies on browser APIs, so disable SSR for this component
const RecentSubmissionsInner = dynamic(() => import("./RecentSubmissionsInner"), {
    ssr: false,
    loading: () => <TableSkeleton />,
})

export default function RecentSubmissions() {
  return (
    <section aria-label="Recent submissions" className="min-w-full w-0">
      <RecentSubmissionsInner />
    </section>
  );
}

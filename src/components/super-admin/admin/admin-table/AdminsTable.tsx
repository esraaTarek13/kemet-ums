"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const AdminsTableInner = dynamic(() => import("./AdminsTableInner"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

export default function AdminsTable() {
  return (
    <section
      aria-label="Admins"
      className="flex flex-col gap-5 md:gap-6 min-w-full w-0"
    >
      <AdminsTableInner />
    </section>
  );
}

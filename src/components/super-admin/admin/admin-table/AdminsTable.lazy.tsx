"use client"
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import dynamic from "next/dynamic";

const AdminsTable = dynamic(() => import("./AdminsTable"), {
  loading: () => <TableSkeleton />,
  ssr: false,
});

export default AdminsTable;

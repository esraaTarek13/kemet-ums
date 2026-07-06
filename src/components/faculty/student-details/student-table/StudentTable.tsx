"use client";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import { FacultyStudentCourse } from "@/types";
import dynamic from "next/dynamic";

const StudentTableInner = dynamic(() => import("./StudentTableInner"), {
  ssr: false,
  loading: () => <TableSkeleton />,
});

interface StudentTableProps {
  courses?: FacultyStudentCourse[];
}

export default function StudentTable({ courses }: StudentTableProps) {
  return (
    <section aria-label="Student" className="min-w-full w-0">
      <StudentTableInner courses={courses ?? []} />
    </section>
  );
}

"use client";

import { useFacultyStudentProfile } from "@/hooks/faculty/students/useFacultyStudents";
import StudentHeader from "./StudentHeader";
import StatCards from "./StatCards";
import { mapToStudentProfileStats } from "@/lib/mappers/faculty/mapToStudentProfileStats";
import StudentTable from "./student-table/StudentTable.lazy";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import HeaderSkeleton from "@/components/ui/skeletons/HeaderSkeleton";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import StudentBreadcrumb from "./StudentBreadcrumb";

interface studentSectionProps {
  studentId: string;
}

export default function StudentSection({ studentId }: studentSectionProps) {
  const {
    data: student,
    isPending,
    isError,
  } = useFacultyStudentProfile(studentId);

  if (isPending) {
    return (
      <div className="flex flex-col gap-5 md:gap-6">
        <HeaderSkeleton />
        <StatCardSkeleton />
        <TableSkeleton />
      </div>
    );
  }

  if (isError || !student) {
    return <ErrorMessage content="Failed to load student profile." />;
  }

  const stats = mapToStudentProfileStats(student);

  return (
    <>
      <div className="space-y-3">
        <StudentBreadcrumb studentCode={student?.student_code} />
        <StudentHeader student={student} />
      </div>
      <StatCards stats={stats} />
      <StudentTable courses={student?.courses} />
    </>
  );
}

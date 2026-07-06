"use client";
import StatCard from "@/components/ui/dashboard/StatCard";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { useAdminStudentsStats } from "@/hooks/admin/useAdminStudents";
import { mapToAdminStudentStats } from "@/lib/mappers/admin/mapToAdminStudentStats";

export default function StudentsStats() {
  const { data, isPending, isError } = useAdminStudentsStats();

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;
  const stats = mapToAdminStudentStats(data);

  return (
    <section
      aria-label="Admin Student statistics"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats?.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

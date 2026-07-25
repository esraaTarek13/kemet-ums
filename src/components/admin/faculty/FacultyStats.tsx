"use client";
import StatCard from "@/components/ui/dashboard/StatCard";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { useAdminFacultyStats } from "@/hooks/admin/faculty/queries/useaAminFacultyStats";
import { mapToAdminFacultyStats } from "@/lib/mappers/admin/mapToAdminFacultyStats";

export default function FacultyStats() {
  const { data, isPending, isError } = useAdminFacultyStats();

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;
  const stats = mapToAdminFacultyStats(data);
  return (
    <section
      aria-label="Admin Faculty statistics"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats?.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

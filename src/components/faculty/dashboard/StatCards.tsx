"use client";
import StatCard from "@/components/ui/dashboard/StatCard";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { useFacultyDashboardStats } from "@/hooks/faculty/useDashboard";
import { mapToStudentStats } from "@/lib/mappers/faculty/statCardMappers";

export default function StatCards() {
  const { data, isPending, isError } = useFacultyDashboardStats();
  const stats = mapToStudentStats(data);

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;

  return (
    <section
      aria-label="Student statistics"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

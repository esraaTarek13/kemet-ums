"use client";

import StatCard from "@/components/ui/dashboard/StatCard";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import { useDashboardStats } from "@/hooks/admin/useDashboard";
import { mapToStudentStats } from "@/lib/mappers/admin/statCardMappers";

export default function StatCards() {
  const { data, isPending, isError } = useDashboardStats();
   const stats = mapToStudentStats(data);

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;

  return (
    <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

"use client";
import StatCard from "@/components/ui/dashboard/StatCard";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { useAdminCoursesStats } from "@/hooks/admin/courses/queries/useAdminCoursesStats";
import { mapToAdminCoursesStats } from "@/lib/mappers/admin/mapToAdminCoursesStats";

export default function CoursesStats() {
  const { data, isPending, isError } = useAdminCoursesStats();

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;
  const stats = mapToAdminCoursesStats(data);
  
  return (
    <section
      aria-label="Admin Faculty statistics"
      className="grid grid-cols-1 md:grid-cols-3 gap-4"
    >
      {stats?.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

"use client";

import StatCard from "@/components/ui/dashboard/StatCard";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { useAdminStats } from "@/hooks/super-admin/useAdmins";
import { mapToAdminsStats } from "@/lib/mappers/super-admin/mapToAdminsStats";

export default function AdminStats() {
  const { data, isPending, isError } = useAdminStats();

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;

  const stats = mapToAdminsStats(data);

  return (
    <section
      aria-label="Admin Faculty statistics"
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats?.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

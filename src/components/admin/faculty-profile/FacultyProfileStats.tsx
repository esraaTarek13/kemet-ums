import StatCard from "@/components/ui/dashboard/StatCard";
import { mapToAdminFacultyProfileStats } from "@/lib/mappers/admin/mapToAdminFacultyProfileStats";
import { FacultyProfileStats as FacultyProfileStatsData } from "@/types";

interface FacultyProfileStatsProps {
  facultyStats: FacultyProfileStatsData;
}

export default function FacultyProfileStats({
  facultyStats,
}: FacultyProfileStatsProps) {
  const stats = mapToAdminFacultyProfileStats(facultyStats);

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

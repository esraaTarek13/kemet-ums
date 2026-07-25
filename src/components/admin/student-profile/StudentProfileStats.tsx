import StatCard from "@/components/ui/dashboard/StatCard";
import { mapToAdminStudentProfileStats } from "@/lib/mappers/admin/mapToAdminStudentProfileStats";
import { StudentProfileStats as StudentProfileStatsData } from "@/types";

interface StudentProfileStatsProps {
  studentStats: StudentProfileStatsData;
}

export default function StudentProfileStats({
  studentStats,
}: StudentProfileStatsProps) {
  const stats = mapToAdminStudentProfileStats(studentStats);

  return (
    <section
      aria-label="Admin Faculty statistics"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
    >
      {stats?.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

import StatCard from "@/components/ui/dashboard/StatCard";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import StatCardSkeleton from "@/components/ui/skeletons/StatCardSkeleton";
import { useAdminAnnouncements } from "@/hooks/admin/announcements/useAnnouncements";
import { mapToAdminAnnouncementsStats } from "@/lib/mappers/admin/mapToAnnouncementsStats";

export default function AnnouncementsStats() {
  const { data, isPending, isError } = useAdminAnnouncements();
  const statsData = data?.stats;

  if (isPending) return <StatCardSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load statistics." />;
  const stats = mapToAdminAnnouncementsStats(statsData);
  
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

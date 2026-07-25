import { getAdminAnnouncements } from "@/lib/services/admin/announcements";
import { AnnouncementStatusFilter } from "@/types";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { adminAnnouncementsKeys } from "./queryKeys";

export function useAdminAnnouncements(status?: AnnouncementStatusFilter) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: adminAnnouncementsKeys.list(status),
    queryFn: () => getAdminAnnouncements(status),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}

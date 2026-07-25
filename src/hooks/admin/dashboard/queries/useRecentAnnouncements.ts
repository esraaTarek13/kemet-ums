import { getRecentAnnouncements } from "@/lib/services/admin/dashboard";
import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./queryKeys";

export function useRecentAnnouncements(limit = 3) {
  return useQuery({
    queryKey: dashboardKeys.announcements(limit),
    queryFn: () => getRecentAnnouncements(limit),
    staleTime: 1000 * 60 * 10, // 10 min
  });
}

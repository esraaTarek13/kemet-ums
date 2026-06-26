import { useQuery } from "@tanstack/react-query";
import { getAnnouncements } from "@/lib/services/shared/announcements";

export function useAnnouncements() {
  return useQuery({
    queryKey: ["announcements"],
    queryFn: getAnnouncements,
    staleTime: 1000 * 60 * 5,
  });
}

import { getRecentStudents } from "@/lib/services/admin/dashboard";
import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./queryKeys";

export function useRecentStudents(limit = 5) {
  return useQuery({
    queryKey: dashboardKeys.recentStudents(limit),
    queryFn: () => getRecentStudents(limit),
    staleTime: 1000 * 60 * 2, // 2 min
  });
}

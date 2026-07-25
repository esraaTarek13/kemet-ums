import { getDashboardStats } from "@/lib/services/admin/dashboard";
import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./queryKeys";

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

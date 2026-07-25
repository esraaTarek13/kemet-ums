import { getReportsSummary } from "@/lib/services/admin/dashboard";
import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./queryKeys";

export function useReportsSummary() {
  return useQuery({
    queryKey: dashboardKeys.reportsSummary(),
    queryFn: getReportsSummary,
    staleTime: 1000 * 60 * 10, // 10 min
  });
}

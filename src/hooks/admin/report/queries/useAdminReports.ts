import { useQuery } from "@tanstack/react-query";
import { getAdminReports } from "@/lib/services/admin/reports";
import { adminReportsKeys } from "./queryKeys";

export function useAdminReports() {
  return useQuery({
    queryKey: adminReportsKeys.overview(),
    queryFn: getAdminReports,
    staleTime: 1000 * 60 * 10,
  });
}

import { useQuery } from "@tanstack/react-query";
import { getAdminReports } from "@/lib/services/admin/reports";

export function useAdminReports() {
  return useQuery({
    queryKey: ["admin-reports"],
    queryFn: getAdminReports,
    staleTime: 1000 * 60 * 10,
  });
}

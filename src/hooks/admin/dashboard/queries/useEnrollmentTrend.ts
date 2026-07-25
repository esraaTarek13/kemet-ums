import { getEnrollmentTrend } from "@/lib/services/admin/dashboard";
import { useQuery } from "@tanstack/react-query";
import { dashboardKeys } from "./queryKeys";

export function useEnrollmentTrend() {
  return useQuery({
    queryKey: dashboardKeys.enrollmentTrend(),
    queryFn: getEnrollmentTrend,
    staleTime: 1000 * 60 * 15,
  });
}

import { getAdminStudentsStats } from "@/lib/services/admin/students";
import { useQuery } from "@tanstack/react-query";
import { adminStudentsKeys } from "./queryKeys";

export function useAdminStudentsStats() {
  return useQuery({
    queryKey: adminStudentsKeys.stats(),
    queryFn: getAdminStudentsStats,
    staleTime: 1000 * 60 * 5,
  });
}

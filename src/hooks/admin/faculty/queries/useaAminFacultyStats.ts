import { getAdminFacultyStats } from "@/lib/services/admin/faculty";
import { useQuery } from "@tanstack/react-query";
import { adminFacultyKeys } from "./queryKeys";

export function useAdminFacultyStats() {
  return useQuery({
    queryKey: adminFacultyKeys.stats(),
    queryFn: getAdminFacultyStats,
    staleTime: 1000 * 60 * 5,
  });
}
import { getAdminCoursesStats } from "@/lib/services/admin/courses";
import { useQuery } from "@tanstack/react-query";
import { adminCoursesKeys } from "./queryKeys";

export function useAdminCoursesStats() {
  return useQuery({
    queryKey: adminCoursesKeys.stats(),
    queryFn: getAdminCoursesStats,
    staleTime: 1000 * 60 * 5,
  });
}

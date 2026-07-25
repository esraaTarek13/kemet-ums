import { getStudentDashboardStats } from "@/lib/services/student/dashboard";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { studentDashboardKeys } from "./queryKeys";

export function useStudentDashboardStats() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: studentDashboardKeys.stats(user?.id),
    queryFn: () => getStudentDashboardStats(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}

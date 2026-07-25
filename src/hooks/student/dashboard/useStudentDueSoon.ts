import { getStudentDueSoon } from "@/lib/services/student/dashboard";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { studentDashboardKeys } from "./queryKeys";

export function useStudentDueSoon(limit = 5) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: studentDashboardKeys.dueSoon(user?.id, limit),
    queryFn: () => getStudentDueSoon(user?.id ?? "", limit),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
  });
}

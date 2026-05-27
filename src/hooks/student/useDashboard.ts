import { useQuery } from "@tanstack/react-query";
import { getStudentDashboard } from "@/lib/services/student/dashboard";
import { useAuthStore } from "@/stores/authStore";

const studentDashboardKeys = {
  all: ["student-dashboard"] as const,
  dashboard: (id: string) => [...studentDashboardKeys.all, id] as const,
};

export function useStudentDashboard() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: studentDashboardKeys.dashboard(user?.id ?? ""),
    queryFn: () => getStudentDashboard(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, 
  });
}

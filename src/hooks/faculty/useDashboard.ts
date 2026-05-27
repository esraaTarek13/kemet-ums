import { useQuery } from "@tanstack/react-query";
import { getFacultyDashboard } from "@/lib/services/faculty/dashboard";
import { useAuthStore } from "@/stores/authStore";

const facultyDashboardKeys = {
  all: ["faculty-dashboard"] as const,
  dashboard: (id: string) => [...facultyDashboardKeys.all, id] as const,
};

export function useFacultyDashboard() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: facultyDashboardKeys.dashboard(user?.id ?? ""),
    queryFn: () => getFacultyDashboard(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

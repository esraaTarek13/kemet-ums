import { useQuery } from "@tanstack/react-query";
import { getStudentDashboard } from "@/lib/services/student/dashboard";
import { useAuthStore } from "@/stores/authStore";

export function useStudentDashboard() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["student-dashboard", user?.id ?? ""],
    queryFn: () => getStudentDashboard(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

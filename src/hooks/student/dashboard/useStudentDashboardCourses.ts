import { getStudentDashboardCourses } from "@/lib/services/student/dashboard";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { studentDashboardKeys } from "./queryKeys";

export function useStudentDashboardCourses() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: studentDashboardKeys.courses(user?.id),
    queryFn: () => getStudentDashboardCourses(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}

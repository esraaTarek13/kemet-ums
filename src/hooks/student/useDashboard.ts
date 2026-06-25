import { useQuery } from "@tanstack/react-query";
import {
  getStudentDashboardStats,
  getStudentDashboardCourses,
  getStudentDueSoon,
} from "@/lib/services/student/dashboard";
import { useAuthStore } from "@/stores/authStore";

export function useStudentDashboardStats() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["student-dashboard", "stats", user?.id],
    queryFn: () => getStudentDashboardStats(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useStudentDashboardCourses() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["student-dashboard", "courses", user?.id],
    queryFn: () => getStudentDashboardCourses(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useStudentDueSoon(limit = 5) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["student-dashboard", "due-soon", user?.id, limit],
    queryFn: () => getStudentDueSoon(user?.id ?? "", limit),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
  });
}
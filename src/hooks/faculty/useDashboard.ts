import { useQuery } from "@tanstack/react-query";
import {
  getFacultyDashboardStats,
  getFacultyRecentSubmissions,
  getFacultyPerformanceIndex,
  getActiveFacultyCourses,
} from "@/lib/services/faculty/dashboard";
import { useAuthStore } from "@/stores/authStore";

export function useFacultyDashboardStats() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-dashboard", "stats", user?.id],
    queryFn: () => getFacultyDashboardStats(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}

export function useFacultyRecentSubmissions(limit = 5) {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-dashboard", "recent-submissions", user?.id, limit],
    queryFn: () => getFacultyRecentSubmissions(user?.id ?? "", limit),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 2,
  });
}

export function useFacultyPerformanceIndex() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-dashboard", "performance", user?.id],
    queryFn: () => getFacultyPerformanceIndex(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 10,
  });
}

export function useFacultyDashboardCourses() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-courses", user?.id],
    queryFn: () => getActiveFacultyCourses(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}
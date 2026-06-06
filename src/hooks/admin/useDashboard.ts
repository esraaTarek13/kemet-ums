import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getRecentStudents,
  getRecentAnnouncements,
  getEnrollmentTrend,
  getReportsSummary,
} from "@/lib/services/admin/dashboard";

// Keys for cache invalidation
export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  recentStudents: (limit?: number) =>
    [...dashboardKeys.all, "recent-students", limit] as const,
  announcements: (limit?: number) =>
    [...dashboardKeys.all, "announcements", limit] as const,
  enrollmentTrend: (page = 0) =>
    [...dashboardKeys.all, "enrollment-trend", page] as const,
  reportsSummary: () => [...dashboardKeys.all, "reports-summary"] as const,
};

export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

export function useRecentStudents(limit = 5) {
  return useQuery({
    queryKey: dashboardKeys.recentStudents(limit),
    queryFn: () => getRecentStudents(limit),
    staleTime: 1000 * 60 * 2, // 2 min
  });
}

export function useRecentAnnouncements(limit = 3) {
  return useQuery({
    queryKey: dashboardKeys.announcements(limit),
    queryFn: () => getRecentAnnouncements(limit),
    staleTime: 1000 * 60 * 10, // 10 min
  });
}

export function useEnrollmentTrend(page = 0) {
  return useQuery({
    queryKey: dashboardKeys.enrollmentTrend(page),
    queryFn: () => getEnrollmentTrend(page),
    staleTime: 1000 * 60 * 15, // 15 min
  });
}

export function useReportsSummary() {
  return useQuery({
    queryKey: dashboardKeys.reportsSummary(),
    queryFn: getReportsSummary,
    staleTime: 1000 * 60 * 10, // 10 min
  });
}
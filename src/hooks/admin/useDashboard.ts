import { useQuery } from "@tanstack/react-query";
import {
  getDashboardStats,
  getRecentStudents,
  getRecentAnnouncements,
  getEnrollmentTrend,
  getReportsSummary,
} from "@/lib/services/admin/dashboard";

// ─── Query Keys ───────────────────────────────────────────────────────────────
/** Centralized query keys for cache management & invalidation */
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

// ─── Hooks ────────────────────────────────────────────────────────────────────

/** Fetches top-level dashboard stats (students, faculty, courses, etc.) — refreshes every 5 min */
export function useDashboardStats() {
  return useQuery({
    queryKey: dashboardKeys.stats(),
    queryFn: getDashboardStats,
    staleTime: 1000 * 60 * 5,
  });
}

/** Fetches the most recently enrolled students — refreshes every 2 min */
export function useRecentStudents(limit = 5) {
  return useQuery({
    queryKey: dashboardKeys.recentStudents(limit),
    queryFn: () => getRecentStudents(limit),
    staleTime: 1000 * 60 * 2,
  });
}

/** Fetches active announcements ordered by latest — refreshes every 10 min */
export function useRecentAnnouncements(limit = 3) {
  return useQuery({
    queryKey: dashboardKeys.announcements(limit),
    queryFn: () => getRecentAnnouncements(limit),
    staleTime: 1000 * 60 * 10,
  });
}

/** Fetches monthly enrollment trend data for the chart — refreshes every 15 min */
export function useEnrollmentTrend(page = 0) {
  return useQuery({
    queryKey: dashboardKeys.enrollmentTrend(page),
    queryFn: () => getEnrollmentTrend(page),
    staleTime: 1000 * 60 * 15,
  });
}

/** Fetches academic performance & attendance rates for the reports section — refreshes every 10 min */
export function useReportsSummary() {
  return useQuery({
    queryKey: dashboardKeys.reportsSummary(),
    queryFn: getReportsSummary,
    staleTime: 1000 * 60 * 10,
  });
}

export const dashboardKeys = {
  all: ["dashboard"] as const,
  stats: () => [...dashboardKeys.all, "stats"] as const,
  recentStudents: (limit?: number) =>
    [...dashboardKeys.all, "recent-students", limit] as const,
  announcements: (limit?: number) =>
    [...dashboardKeys.all, "announcements", limit] as const,
  enrollmentTrend: () => [...dashboardKeys.all, "enrollment-trend"] as const,
  reportsSummary: () => [...dashboardKeys.all, "reports-summary"] as const,
};

export const studentDashboardKeys = {
  all: ["student", "dashboard"] as const,
  stats: (userId?: string) =>
    [...studentDashboardKeys.all, "stats", userId] as const,
  courses: (userId?: string) =>
    [...studentDashboardKeys.all, "courses", userId] as const,
  dueSoon: (userId?: string, limit?: number) =>
    [...studentDashboardKeys.all, "due-soon", userId, limit] as const,
};
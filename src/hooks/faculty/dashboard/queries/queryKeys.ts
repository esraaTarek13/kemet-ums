export const facultyDashboardKeys = {
    all: ["faculty", "dashboard"] as const,
    stats: (userId?: string) =>
        [...facultyDashboardKeys.all, "stats", userId] as const,
    recentSubmissions: (userId?: string, limit?: number) =>
        [...facultyDashboardKeys.all, "recent-submissions", userId, limit] as const,
    performance: (userId?: string) =>
        [...facultyDashboardKeys.all, "performance", userId] as const,
    courses: (userId?: string) =>
        [...facultyDashboardKeys.all, "courses", userId] as const,
};
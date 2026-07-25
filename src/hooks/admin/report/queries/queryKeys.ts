export const adminReportsKeys = {
  all: ["admin", "reports"] as const,
  overview: () => [...adminReportsKeys.all, "overview"] as const,
  summary: (semester: string, academicYear: string) =>
    [...adminReportsKeys.all, "summary", semester, academicYear] as const,
  byDepartment: (semester: string, academicYear: string) =>
    [...adminReportsKeys.all, "by-department", semester, academicYear] as const,
  statusBreakdown: (semester: string, academicYear: string) =>
    [
      ...adminReportsKeys.all,
      "status-breakdown",
      semester,
      academicYear,
    ] as const,
};

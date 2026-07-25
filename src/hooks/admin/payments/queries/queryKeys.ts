export const adminPaymentsKeys = {
  all: ["admin", "payments"] as const,
  studentSearch: (query: string) =>
    [...adminPaymentsKeys.all, "student-search", query] as const,
  summary: (studentId: string, semester: string, academicYear: string) =>
    [
      ...adminPaymentsKeys.all,
      "summary",
      studentId,
      semester,
      academicYear,
    ] as const,
};

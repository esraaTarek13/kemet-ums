export const adminStudentsKeys = {
  all: ["admin", "students"] as const,
  stats: () => [...adminStudentsKeys.all, "stats"] as const,
  list: (filters?: {
    department?: string;
    status?: string;
    year?: number;
    search?: string;
    page?: number;
    pageSize?: number;
  }) => [...adminStudentsKeys.all, "list", filters] as const,
  detail: (studentId: string) =>
    [...adminStudentsKeys.all, "detail", studentId] as const,
  profileDetail: (studentId: string) =>
    [...adminStudentsKeys.all, "profile-detail", studentId] as const,
  paymentStatus: (studentId: string) =>
    [...adminStudentsKeys.all, "payment-status", studentId] as const,
  paymentHistory: (studentId: string) =>
    [...adminStudentsKeys.all, "payment-history", studentId] as const,
  transcript: (studentId: string) =>
    [...adminStudentsKeys.all, "transcript", studentId] as const,
  availableOfferings: (studentId: string, search: string) =>
    [
      ...adminStudentsKeys.all,
      "available-offerings",
      studentId,
      search,
    ] as const,
};

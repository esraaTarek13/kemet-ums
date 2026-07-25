export const adminCoursesKeys = {
  all: ["admin", "courses"] as const,
  stats: () => [...adminCoursesKeys.all, "stats"] as const,
  list: (filters?: {
    department?: string;
    status?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }) => [...adminCoursesKeys.all, "list", filters] as const,
  detail: (offeringId: string) =>
    [...adminCoursesKeys.all, "detail", offeringId] as const,
};

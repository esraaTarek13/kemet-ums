export const adminFacultyKeys = {
  all: ["admin", "faculty"] as const,
  stats: () => [...adminFacultyKeys.all, "stats"] as const,
  list: (filters?: {
    department?: string;
    status?: string;
    rank?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }) => [...adminFacultyKeys.all, "list", filters] as const,
  detail: (facultyId: string) =>
    [...adminFacultyKeys.all, "detail", facultyId] as const,
  profileDetail: (facultyId: string) =>
    [...adminFacultyKeys.all, "profile-detail", facultyId] as const,
  assignableOfferings: (department: string, facultyId: string) =>
    [
      ...adminFacultyKeys.all,
      "assignable-offerings",
      department,
      facultyId,
    ] as const,
};

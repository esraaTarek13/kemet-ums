export const superAdminAdminsKeys = {
  all: ["super-admin", "admins"] as const,
  stats: () => [...superAdminAdminsKeys.all, "stats"] as const,
  list: (filters?: { search?: string; page?: number; pageSize?: number }) =>
    [...superAdminAdminsKeys.all, "list", filters] as const,
  detail: (adminId: string) =>
    [...superAdminAdminsKeys.all, "detail", adminId] as const,
};

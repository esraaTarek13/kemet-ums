import { getAdminAdmins, getAdminStats } from "@/lib/services/super-admin/admins";
import { useQuery } from "@tanstack/react-query";

export function useAdminStats() {
  return useQuery({
    queryKey: ["admin-stats"],
    queryFn: getAdminStats,
    staleTime: 1000 * 60 * 5,
  });
}

export function useAdminAdmins(filters?: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: ["admin-admins", filters],
    queryFn: () => getAdminAdmins(filters),
    staleTime: 1000 * 60 * 2,
  });
}

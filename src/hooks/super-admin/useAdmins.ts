import { getAdminAdmins } from "@/lib/services/super-admin/admins";
import { useQuery } from "@tanstack/react-query";

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

import { getAdminAdmins } from "@/lib/services/super-admin/admins";
import { useQuery } from "@tanstack/react-query";
import { superAdminAdminsKeys } from "./queryKeys";

export function useAdminAdmins(filters?: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  return useQuery({
    queryKey: superAdminAdminsKeys.list(filters),
    queryFn: () => getAdminAdmins(filters),
    staleTime: 1000 * 60 * 2,
  });
}

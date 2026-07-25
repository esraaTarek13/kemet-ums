import { useQuery } from "@tanstack/react-query";
import { superAdminAdminsKeys } from "./queryKeys";
import { getAdminProfileDetail } from "@/lib/services/super-admin/adminProfile";

export function useAdminProfileDetail(adminId: string) {
  return useQuery({
    queryKey: superAdminAdminsKeys.detail(adminId),
    queryFn: () => getAdminProfileDetail(adminId),
    enabled: !!adminId,
  });
}

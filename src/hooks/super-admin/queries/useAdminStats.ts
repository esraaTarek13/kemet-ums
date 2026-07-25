import { getAdminStats } from "@/lib/services/super-admin/admins";
import { useQuery } from "@tanstack/react-query";
import { superAdminAdminsKeys } from "./queryKeys";

export function useAdminStats() {
  return useQuery({
    queryKey: superAdminAdminsKeys.stats(),
    queryFn: getAdminStats,
    staleTime: 1000 * 60 * 5,
  });
}

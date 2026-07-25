import { getAdminProfile } from "@/lib/services/admin/proflie";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";
import { adminProfileKeys } from "./queryKeys";

export function useAdminProfile() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: adminProfileKeys.detail(user?.id),
    queryFn: () => getAdminProfile(),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 10,
  });
}

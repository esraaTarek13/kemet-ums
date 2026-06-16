import { getFacultyProfile } from "@/lib/services/faculty/profile";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export function useFacultyProfile() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["profile", user?.id],
    queryFn: () => getFacultyProfile(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 10,
  });
}

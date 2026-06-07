import { getStudentProfile } from "@/lib/services/student/Profile";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export function useStudentProfile() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["student-profile", user?.id],
    queryFn: () => getStudentProfile(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 10,
  });
}
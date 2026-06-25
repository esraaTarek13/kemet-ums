import { useQuery } from "@tanstack/react-query";
import { getFacultySchedule } from "@/lib/services/faculty/schedule";
import { useAuthStore } from "@/stores/authStore";

export function useFacultySchedule() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["faculty-schedule", user?.id],
    queryFn: () => getFacultySchedule(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 10,
  });
}
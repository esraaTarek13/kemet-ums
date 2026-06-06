import { getStudentSchedule } from "@/lib/services/student/schedule";
import { useAuthStore } from "@/stores/authStore";
import { useQuery } from "@tanstack/react-query";

export function useSchedule() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["student-schedule", user?.id ?? ""],
    queryFn: () => getStudentSchedule(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5, // 5 min
  });
}

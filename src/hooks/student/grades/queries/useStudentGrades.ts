import { useQuery } from "@tanstack/react-query";
import { getStudentGrades } from "@/lib/services/student/grades";
import { useAuthStore } from "@/stores/authStore";

export function useStudentGrades() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["student-grades", user?.id],
    queryFn: () => getStudentGrades(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 10,
  });
}

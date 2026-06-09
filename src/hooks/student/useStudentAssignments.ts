import { useQuery } from "@tanstack/react-query";
import { getStudentAssignments } from "@/lib/services/student/assignments";
import { useAuthStore } from "@/stores/authStore";

export function useStudentAssignments() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: ["student-assignments", user?.id],
    queryFn: () => getStudentAssignments(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 1000 * 60 * 5,
  });
}
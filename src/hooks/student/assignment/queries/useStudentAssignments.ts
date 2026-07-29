import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getStudentAssignments } from "@/lib/services/student/assignments";
import { studentAssignmentsKeys } from "./queryKeys";

export function useStudentAssignments() {
  const { user } = useAuthStore();

  return useQuery({
    queryKey: studentAssignmentsKeys.list(user?.id),
    queryFn: () => getStudentAssignments(user?.id ?? ""),
    enabled: !!user?.id,
    staleTime: 0,
  });
}

import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getAssignmentSubmissions } from "@/lib/services/faculty/assignments";
import { facultyAssignmentsKeys } from "./queryKeys";

export function useAssignmentSubmissions(assignmentId: string) {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyAssignmentsKeys.submissions(assignmentId),
        queryFn: () => getAssignmentSubmissions(user?.id ?? "", assignmentId),
        enabled: !!user?.id && !!assignmentId,
        staleTime: 1000 * 60 * 2,
    });
}
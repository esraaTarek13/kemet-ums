import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyAssignments } from "@/lib/services/faculty/assignments";
import { facultyAssignmentsKeys } from "./queryKeys";

export function useFacultyAssignments(search?: string) {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyAssignmentsKeys.list(user?.id, search),
        queryFn: () => getFacultyAssignments(user?.id ?? "", search),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 2,
    });
}
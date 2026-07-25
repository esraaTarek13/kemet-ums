import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyGrades } from "@/lib/services/faculty/grades";
import { facultyGradesKeys } from "./queryKeys";

export function useFacultyGrades(offeringId: string) {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyGradesKeys.list(user?.id, offeringId),
        queryFn: () => getFacultyGrades(user?.id ?? "", offeringId),
        enabled: !!user?.id && !!offeringId,
        staleTime: 1000 * 60 * 2,
    });
}
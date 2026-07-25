import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyAllStudents } from "@/lib/services/faculty/students";
import { facultyStudentsKeys } from "./queryKeys";

export function useFacultyAllStudents(filters?: {
    offeringId?: string;
    status?: string;
    search?: string;
    page?: number;
    pageSize?: number;
}) {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyStudentsKeys.list(user?.id, filters),
        queryFn: () => getFacultyAllStudents(user?.id ?? "", filters),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5,
    });
}
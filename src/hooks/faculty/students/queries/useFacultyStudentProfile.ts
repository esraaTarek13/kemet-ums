import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyStudentProfile } from "@/lib/services/faculty/students";
import { facultyStudentsKeys } from "./queryKeys";

export function useFacultyStudentProfile(studentId: string) {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyStudentsKeys.profile(user?.id, studentId),
        queryFn: () => getFacultyStudentProfile(user?.id ?? "", studentId),
        enabled: !!user?.id && !!studentId,
        staleTime: 1000 * 60 * 5,
    });
}
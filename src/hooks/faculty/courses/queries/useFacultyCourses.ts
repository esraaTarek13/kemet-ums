import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyCourses } from "@/lib/services/faculty/courses";
import { facultyCoursesKeys } from "./queryKeys";

export function useFacultyCourses(semester?: string, academicYear?: string) {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyCoursesKeys.list(user?.id, semester, academicYear),
        queryFn: () => getFacultyCourses(user?.id ?? "", semester, academicYear),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5,
    });
}
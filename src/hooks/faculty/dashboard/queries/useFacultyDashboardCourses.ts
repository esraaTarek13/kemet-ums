import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getActiveFacultyCourses } from "@/lib/services/faculty/dashboard";
import { facultyDashboardKeys } from "./queryKeys";

export function useFacultyDashboardCourses() {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyDashboardKeys.courses(user?.id),
        queryFn: () => getActiveFacultyCourses(user?.id ?? ""),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5,
    });
}
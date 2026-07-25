import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyRecentSubmissions } from "@/lib/services/faculty/dashboard";
import { facultyDashboardKeys } from "./queryKeys";

export function useFacultyRecentSubmissions(limit = 5) {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyDashboardKeys.recentSubmissions(user?.id, limit),
        queryFn: () => getFacultyRecentSubmissions(user?.id ?? "", limit),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 2,
    });
}
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyDashboardStats } from "@/lib/services/faculty/dashboard";
import { facultyDashboardKeys } from "./queryKeys";

export function useFacultyDashboardStats() {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyDashboardKeys.stats(user?.id),
        queryFn: () => getFacultyDashboardStats(user?.id ?? ""),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 5,
    });
}
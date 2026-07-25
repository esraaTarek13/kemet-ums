import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyPerformanceIndex } from "@/lib/services/faculty/dashboard";
import { facultyDashboardKeys } from "./queryKeys";

export function useFacultyPerformanceIndex() {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyDashboardKeys.performance(user?.id),
        queryFn: () => getFacultyPerformanceIndex(user?.id ?? ""),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 10,
    });
}
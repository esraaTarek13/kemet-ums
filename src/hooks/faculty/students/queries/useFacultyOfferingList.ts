import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyOfferingList } from "@/lib/services/faculty/students";
import { facultyStudentsKeys } from "./queryKeys";

export function useFacultyOfferingList() {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyStudentsKeys.offeringList(user?.id),
        queryFn: () => getFacultyOfferingList(user?.id ?? ""),
        enabled: !!user?.id,
        staleTime: 1000 * 60 * 10,
    });
}
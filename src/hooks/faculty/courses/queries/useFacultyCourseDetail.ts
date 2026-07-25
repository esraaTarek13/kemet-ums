import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/stores/authStore";
import { getFacultyCourseDetail } from "@/lib/services/faculty/courses";
import { facultyCoursesKeys } from "./queryKeys";

export function useFacultyCourseDetail(offeringId: string) {
    const { user } = useAuthStore();

    return useQuery({
        queryKey: facultyCoursesKeys.detail(user?.id, offeringId),
        queryFn: () => getFacultyCourseDetail(user?.id ?? "", offeringId),
        enabled: !!user?.id && !!offeringId,
        staleTime: 1000 * 60 * 5,
    });
}
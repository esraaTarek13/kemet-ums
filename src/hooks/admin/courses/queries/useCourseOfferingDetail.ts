import { getCourseOfferingDetail } from "@/lib/services/admin/courseDetail";
import { useQuery } from "@tanstack/react-query";
import { adminCoursesKeys } from "./queryKeys";

export function useCourseOfferingDetail(offeringId: string) {
  return useQuery({
    queryKey: adminCoursesKeys.detail(offeringId),
    queryFn: () => getCourseOfferingDetail(offeringId),
    enabled: Boolean(offeringId),
    staleTime: 1000 * 60 * 2,
  });
}

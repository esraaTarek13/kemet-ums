import { useQuery } from "@tanstack/react-query";
import { getAvailableOfferingsForEnrollment } from "@/lib/services/admin/studentProfile";
import { adminStudentsKeys } from "./queryKeys";

export function useAvailableOfferingsForEnrollment(
  studentId: string,
  search: string,
  enabled: boolean,
) {
  return useQuery({
    queryKey: adminStudentsKeys.availableOfferings(studentId, search),
    queryFn: () => getAvailableOfferingsForEnrollment(studentId, search),
    enabled,
  });
}

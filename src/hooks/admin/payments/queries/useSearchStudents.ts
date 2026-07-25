import { useQuery } from "@tanstack/react-query";
import { searchStudentsForPayment } from "@/lib/services/admin/payments";
import { adminPaymentsKeys } from "./queryKeys";

export function useSearchStudents(query: string) {
  return useQuery({
    queryKey: adminPaymentsKeys.studentSearch(query),
    queryFn: () => searchStudentsForPayment(query),
    enabled: query.trim().length >= 2,
  });
}

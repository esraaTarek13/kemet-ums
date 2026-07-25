
import { useQuery } from "@tanstack/react-query";
import { getStudentPaymentHistory } from "@/lib/services/admin/studentProfile";
import { adminStudentsKeys } from "./queryKeys";

export function useStudentPaymentHistory(studentId: string, enabled = true) {
  return useQuery({
    queryKey: adminStudentsKeys.paymentHistory(studentId),
    queryFn: () => getStudentPaymentHistory(studentId),
    enabled: Boolean(studentId) && enabled,
  });
}
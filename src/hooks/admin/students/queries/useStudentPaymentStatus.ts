
import { useQuery } from "@tanstack/react-query";
import { getStudentCurrentPaymentStatus } from "@/lib/services/admin/studentProfile";
import { adminStudentsKeys } from "./queryKeys";

export function useStudentPaymentStatus(studentId: string) {
  return useQuery({
    queryKey: adminStudentsKeys.paymentStatus(studentId),
    queryFn: () => getStudentCurrentPaymentStatus(studentId),
    enabled: Boolean(studentId),
  });
}
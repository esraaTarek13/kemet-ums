import { useQuery } from "@tanstack/react-query";
import { getStudentFinancialSummary } from "@/lib/services/admin/payments";
import { adminPaymentsKeys } from "./queryKeys";
import { FinancialSummaryParams } from "@/types";

export function useStudentFinancialSummary(params: FinancialSummaryParams) {
  return useQuery({
    queryKey: adminPaymentsKeys.summary(
      params.studentId,
      params.semester,
      params.academicYear,
    ),
    queryFn: () => getStudentFinancialSummary(params),
    enabled: Boolean(
      params.studentId && params.semester && params.academicYear,
    ),
  });
}

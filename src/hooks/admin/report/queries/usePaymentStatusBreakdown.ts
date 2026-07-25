import { useQuery } from "@tanstack/react-query";
import { getPaymentStatusBreakdown } from "@/lib/services/admin/reports";
import { adminReportsKeys } from "./queryKeys";
import { FinancialReportsParams } from "@/types";

export function usePaymentStatusBreakdown(params: FinancialReportsParams) {
  return useQuery({
    queryKey: adminReportsKeys.statusBreakdown(
      params.semester,
      params.academicYear,
    ),
    queryFn: () => getPaymentStatusBreakdown(params),
    enabled: Boolean(params.semester && params.academicYear),
  });
}

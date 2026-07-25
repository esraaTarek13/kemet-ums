import { useQuery } from "@tanstack/react-query";
import { getPaymentsByDepartment } from "@/lib/services/admin/reports";
import { adminReportsKeys } from "./queryKeys";
import { FinancialReportsParams } from "@/types";

export function usePaymentsByDepartment(params: FinancialReportsParams) {
  return useQuery({
    queryKey: adminReportsKeys.byDepartment(
      params.semester,
      params.academicYear,
    ),
    queryFn: () => getPaymentsByDepartment(params),
    enabled: Boolean(params.semester && params.academicYear),
  });
}

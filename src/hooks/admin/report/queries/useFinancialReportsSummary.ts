import { useQuery } from "@tanstack/react-query";
import { getFinancialReportsSummary } from "@/lib/services/admin/reports";
import { adminReportsKeys } from "./queryKeys";
import { FinancialReportsParams } from "@/types";

export function useFinancialReportsSummary(params: FinancialReportsParams) {
  return useQuery({
    queryKey: adminReportsKeys.summary(params.semester, params.academicYear),
    queryFn: () => getFinancialReportsSummary(params),
    enabled: Boolean(params.semester && params.academicYear),
  });
}

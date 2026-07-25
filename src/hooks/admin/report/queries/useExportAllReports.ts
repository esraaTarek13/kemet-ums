import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { FinancialReportsParams } from "@/types";
import {
  getAdminReports,
  getFinancialReportsSummary,
  getPaymentsByDepartment,
  getPaymentStatusBreakdown,
} from "@/lib/services/admin/reports";
import { generateReportsPdf } from "@/lib/utils/super-admin/generateReportsPdf";

export function useExportAllReports() {
  return useMutation({
    mutationFn: async (params: FinancialReportsParams) => {
      const [
        adminReports,
        financialSummary,
        departmentPayments,
        paymentStatus,
      ] = await Promise.all([
        getAdminReports(),
        getFinancialReportsSummary(params),
        getPaymentsByDepartment(params),
        getPaymentStatusBreakdown(params),
      ]);

      generateReportsPdf({
        semester: params.semester,
        academicYear: params.academicYear,
        adminReports,
        financialSummary,
        departmentPayments,
        paymentStatus,
      });
    },
    onSuccess: () => {
      toast.success("Reports exported successfully");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Failed to export reports");
    },
  });
}

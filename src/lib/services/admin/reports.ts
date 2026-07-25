import { supabase } from "@/lib/supabase/client";
import {
  AdminReportsResponse,
  FinancialReportsSummary,
  DepartmentPayment,
  PaymentStatusBreakdown,
  FinancialReportsParams,
} from "@/types";

export async function getAdminReports(): Promise<AdminReportsResponse> {
  const { data, error } = await supabase.rpc("get_admin_reports");
  if (error) throw new Error(error.message);
  return data as AdminReportsResponse;
}

export async function getFinancialReportsSummary(
  params: FinancialReportsParams,
): Promise<FinancialReportsSummary> {
  const { data, error } = await supabase.rpc("get_financial_reports_summary", {
    p_semester: params.semester,
    p_academic_year: params.academicYear,
  });
  if (error) throw new Error(error.message);
  return data as FinancialReportsSummary;
}

export async function getPaymentsByDepartment(
  params: FinancialReportsParams,
): Promise<DepartmentPayment[]> {
  const { data, error } = await supabase.rpc("get_payments_by_department", {
    p_semester: params.semester,
    p_academic_year: params.academicYear,
  });
  if (error) throw new Error(error.message);
  return data as DepartmentPayment[];
}

export async function getPaymentStatusBreakdown(
  params: FinancialReportsParams,
): Promise<PaymentStatusBreakdown> {
  const { data, error } = await supabase.rpc("get_payment_status_breakdown", {
    p_semester: params.semester,
    p_academic_year: params.academicYear,
  });
  if (error) throw new Error(error.message);
  return data as PaymentStatusBreakdown;
}

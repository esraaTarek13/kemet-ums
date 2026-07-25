import {
  StudentFinancialSummary,
  StudentSearchResult,
  RecordPaymentParams,
  FinancialSummaryParams,
} from "@/types";
import { supabase } from "@/lib/supabase/client";



export async function searchStudentsForPayment(
  query: string,
): Promise<StudentSearchResult[]> {
  const { data, error } = await supabase.rpc("search_students", {
    p_query: query,
    p_limit: 10,
  });
  if (error) throw new Error(error.message);
  return data as StudentSearchResult[];
}

export async function getStudentFinancialSummary(
  params: FinancialSummaryParams,
): Promise<StudentFinancialSummary> {
  const { data, error } = await supabase.rpc("get_student_financial_summary", {
    p_student_id: params.studentId,
    p_semester: params.semester,
    p_academic_year: params.academicYear,
  });
  if (error) throw new Error(error.message);
  return data as StudentFinancialSummary;
}

export async function recordStudentPayment(
  params: RecordPaymentParams,
): Promise<StudentFinancialSummary> {
  const { data, error } = await supabase.rpc("record_student_payment", {
    p_student_id: params.studentId,
    p_amount: params.amount,
    p_semester: params.semester,
    p_academic_year: params.academicYear,
    p_notes: params.notes ?? null,
  });
  if (error) throw new Error(error.message);
  return data as StudentFinancialSummary;
}

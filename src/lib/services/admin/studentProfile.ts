import {
  StudentProfileDetail,
  StudentTranscript,
  AvailableOfferingsResponse,
  StudentPaymentHistory,
  StudentPaymentStatus,
} from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function getStudentProfileDetail(
  studentId: string,
): Promise<StudentProfileDetail> {
  const { data, error } = await supabase.rpc("get_student_profile_detail", {
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentProfileDetail;
}

export async function getAvailableOfferingsForEnrollment(
  studentId: string,
  search: string,
): Promise<AvailableOfferingsResponse> {
  const { data, error } = await supabase.rpc(
    "get_available_offerings_for_enrollment",
    { p_student_id: studentId, p_search: search || null },
  );
  if (error) throw new Error(error.message);
  return data as AvailableOfferingsResponse;
}

export async function getStudentTranscript(
  studentId: string,
): Promise<StudentTranscript> {
  const { data, error } = await supabase.rpc("get_student_transcript", {
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentTranscript;
}

export async function dropStudentEnrollment(
  enrollmentId: string,
): Promise<{ success: boolean; enrollment_id: string }> {
  const { data, error } = await supabase.rpc("drop_student_enrollment", {
    p_enrollment_id: enrollmentId,
  });
  if (error) throw new Error(error.message);
  return data as { success: boolean; enrollment_id: string };
}

export async function getStudentCurrentPaymentStatus(
  studentId: string,
): Promise<StudentPaymentStatus> {
  const { data, error } = await supabase.rpc(
    "get_student_current_payment_status",
    { p_student_id: studentId },
  );
  if (error) throw new Error(error.message);
  return data as StudentPaymentStatus;
}

export async function getStudentPaymentHistory(
  studentId: string,
): Promise<StudentPaymentHistory> {
  const { data, error } = await supabase.rpc(
    "get_student_payment_history",
    { p_student_id: studentId },
  );
  if (error) throw new Error(error.message);
  return data as StudentPaymentHistory;
}
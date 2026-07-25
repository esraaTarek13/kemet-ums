import { supabase } from "@/lib/supabase/client";
import type {
  CreateStudentPayload,
  UpdateStudentProfileParams,
} from "@/types";

interface CreateStudentResponse {
  id: string;
  email: string;
  full_name: string;
  student_code: string;
}

// Create a new student (auth user + profile + student row)
export async function createStudent(
  payload: CreateStudentPayload,
): Promise<CreateStudentResponse> {
  const res = await fetch("/api/admin/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Failed to create student");
  }

  return data.student;
}

export async function enrollStudentInOfferings(params: {
  studentId: string;
  offeringIds: string[];
}): Promise<{ success: boolean; enrolled_count: number }> {
  const { data, error } = await supabase.rpc("enroll_student_in_offerings", {
    p_student_id: params.studentId,
    p_offering_ids: params.offeringIds,
  });
  if (error) throw new Error(error.message);
  return data as { success: boolean; enrolled_count: number };
}

export async function updateStudentProfile(
  params: UpdateStudentProfileParams,
): Promise<{ success: boolean }> {
  const { data, error } = await supabase.rpc("update_student_profile", {
    p_student_id: params.studentId,
    p_phone: params.phone ?? null,
    p_nationality: params.nationality ?? null,
    p_address: params.address ?? null,
    p_department: params.department ?? null,
    p_expected_graduation: params.expectedGraduation ?? null,
    p_status: params.status ?? null,
  });
  if (error) throw new Error(error.message);
  return data as { success: boolean };
}

export async function deleteStudent(
  studentId: string,
): Promise<{ success: boolean }> {
  const response = await fetch(`/api/admin/students/${studentId}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? "Failed to delete student");
  return result;
}

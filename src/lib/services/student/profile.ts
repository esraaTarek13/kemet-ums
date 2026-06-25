import { supabase } from "@/lib/supabase/client";
import { StudentProfileResponse } from "@/types";

export async function getStudentProfile(
  studentId: string,
): Promise<StudentProfileResponse> {
  const { data, error } = await supabase.rpc("get_student_profile", {
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentProfileResponse;
}
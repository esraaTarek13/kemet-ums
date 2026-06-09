import { supabase } from "@/lib/supabase/client";

export async function getStudentProfile(studentId: string) {
  const { data, error } = await supabase.rpc("get_student_profile", {
    student_uuid: studentId,
  });
  if (error) throw new Error(error.message);
  return data;
}
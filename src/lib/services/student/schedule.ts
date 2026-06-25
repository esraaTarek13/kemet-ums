import { supabase } from "@/lib/supabase/client";
import { StudentSchedule } from "@/types";

export async function getStudentSchedule(
  studentId: string,
): Promise<StudentSchedule[]> {
  const { data, error } = await supabase.rpc("get_student_schedule", {
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentSchedule[];
}
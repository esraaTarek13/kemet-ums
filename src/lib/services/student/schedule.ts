import { supabase } from "@/lib/supabase/client";
import { StudentSchedule } from "@/types";

export async function getStudentSchedule(
  studentId: string,
): Promise<StudentSchedule[]> {
  const { data, error } = await supabase.rpc("get_student_schedule", {
    student_uuid: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentSchedule[];
}
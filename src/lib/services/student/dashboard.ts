import { supabase } from "@/lib/supabase/client";
import { StudentDashboard } from "@/types";

export async function getStudentDashboard(
  studentId: string,
): Promise<StudentDashboard> {
  const { data, error } = await supabase.rpc("get_student_dashboard", {
    student_uuid: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentDashboard;
}

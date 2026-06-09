import { supabase } from "@/lib/supabase/client";
import { StudentAssignments } from "@/types";

export async function getStudentAssignments(
  studentId: string,
): Promise<StudentAssignments> {
  const { data, error } = await supabase.rpc("get_student_assignments", {
    student_uuid: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentAssignments;
}
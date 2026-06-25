import { supabase } from "@/lib/supabase/client";
import { StudentGrades } from "@/types";

export async function getStudentGrades(studentId: string): Promise<StudentGrades> {
  const { data, error } = await supabase.rpc("get_student_grades", {
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentGrades;
}
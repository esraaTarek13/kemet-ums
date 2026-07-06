import { supabase } from "@/lib/supabase/client";
import { FacultyGradesResponse } from "@/types";

export async function getFacultyGrades(
  facultyId: string,
  offeringId: string,
): Promise<FacultyGradesResponse> {
  const { data, error } = await supabase.rpc("get_faculty_grades", {
    p_faculty_id: facultyId,
    p_offering_id: offeringId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyGradesResponse;
}

export async function updateStudentGrade(
  facultyId: string,
  enrollmentId: string,
  grades: { quiz?: number; midterm?: number; final?: number },
): Promise<{ success: boolean; grade: string }> {
  const { data, error } = await supabase.rpc("update_student_grade", {
    p_faculty_id: facultyId,
    p_enrollment_id: enrollmentId,
    p_quiz: grades.quiz ?? null,
    p_midterm: grades.midterm ?? null,
    p_final: grades.final ?? null,
  });
  if (error) throw new Error(error.message);
  return data as { success: boolean; grade: string };
}

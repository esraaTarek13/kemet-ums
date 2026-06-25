import { supabase } from "@/lib/supabase/client";
import { FacultySubmission } from "@/types";

export async function getFacultySubmissions(assignmentId: string): Promise<FacultySubmission[]> {
  const { data, error } = await supabase.rpc("get_faculty_submissions", {
    p_assignment_id: assignmentId,
  });
  if (error) throw new Error(error.message);
  return data as FacultySubmission[];
}

export async function gradeSubmission(
  submissionId: string,
  grade: string,
  feedback?: string,
) {
  const { data, error } = await supabase.rpc("grade_submission", {
    p_submission_id: submissionId,
    p_grade: grade,
    p_feedback: feedback ?? null,
  });
  if (error) throw new Error(error.message);
  return data;
}
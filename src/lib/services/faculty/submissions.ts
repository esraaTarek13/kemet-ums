import { supabase } from "@/lib/supabase/client";

export async function gradeSubmission(
  submissionId: string,
  grade: number,
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

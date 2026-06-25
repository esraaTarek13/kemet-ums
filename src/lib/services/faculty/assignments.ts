import { supabase } from "@/lib/supabase/client";

export async function addAssignment(
  offeringId: string,
  title: string,
  description: string,
  dueDate: string,
  maxGrade: number,
): Promise<void> {
  const { error } = await supabase.rpc("add_assignment", {
    p_offering_id: offeringId,
    p_title: title,
    p_description: description,
    p_due_date: dueDate,
    p_max_grade: maxGrade,
  });
  if (error) throw new Error(error.message);
}

export async function deleteAssignment(assignmentId: string): Promise<void> {
  const { error } = await supabase.rpc("delete_assignment", {
    p_assignment_id: assignmentId,
  });
  if (error) throw new Error(error.message);
}
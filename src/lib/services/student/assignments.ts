import { supabase } from "@/lib/supabase/client";
import { StudentAssignments } from "@/types";

export async function getStudentAssignments(
  studentId: string,
): Promise<StudentAssignments> {
  const { data, error } = await supabase.rpc("get_student_assignments", {
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentAssignments;
}

export async function submitAssignment(
  assignmentId: string,
  studentId: string,
  file: File,
): Promise<void> {
  // Delete old file if exists (handles extension change)
  const { data: existing } = await supabase.storage
    .from("submissions")
    .list(studentId, { search: assignmentId });

  if (existing && existing.length > 0) {
    await supabase.storage
      .from("submissions")
      .remove(existing.map((f) => `${studentId}/${f.name}`));
  }

  const ext = file.name.split(".").pop();
  const path = `${studentId}/${assignmentId}.${ext}`;

  const { error: uploadError } = await supabase.storage
    .from("submissions")
    .upload(path, file, { upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage
    .from("submissions")
    .getPublicUrl(path);

  const { error: insertError } = await supabase.from("submissions").upsert(
    {
      assignment_id: assignmentId,
      student_id: studentId,
      file_url: urlData.publicUrl,
      file_name: file.name,
      file_size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      file_type: file.name.split(".").pop(),
      status: "pending",
      submitted_at: new Date().toISOString(),
    },
    { onConflict: "assignment_id,student_id" },
  );

  if (insertError) throw new Error(insertError.message);
}

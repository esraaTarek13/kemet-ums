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

export async function submitAssignment(
  assignmentId: string,
  studentId: string,
  file: File,
): Promise<void> {
  // Path format: studentId/assignmentId.ext — ensures unique file per student per assignment
  const path = `${studentId}/${assignmentId}.${file.name.split(".").pop()}`;

  // upsert: overwrites if student resubmits the same assignment
  const { error: uploadError } = await supabase.storage
    .from("submissions")
    .upload(path, file, { upsert: true });

  if (uploadError) throw new Error(uploadError.message);

  const { data: urlData } = supabase.storage
    .from("submissions")
    .getPublicUrl(path);

  // onConflict: handles resubmission by updating the existing row
  const { error: insertError } = await supabase.from("submissions").upsert(
    {
      assignment_id: assignmentId,
      student_id: studentId,
      file_url: urlData.publicUrl,
      file_name: file.name,
      // Convert bytes to MB with 1 decimal place
      file_size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
      file_type: file.name.split(".").pop(),
      status: "pending",
      submitted_at: new Date().toISOString(),
    },
    { onConflict: "assignment_id,student_id" },
  );

  if (insertError) throw new Error(insertError.message);
}

import { supabase } from "@/lib/supabase/client";
import { AssignmentFormData, AssignmentSubmission, FacultyAssignmentFull, UpdateAssignmentData } from "@/types";

export async function getFacultyAssignments(
  facultyId: string,
  search?: string,
): Promise<FacultyAssignmentFull[]> {
  const { data, error } = await supabase.rpc("get_faculty_assignments", {
    p_faculty_id: facultyId,
    p_search:     search ?? null,
  });
  if (error) throw new Error(error.message);
  return data as FacultyAssignmentFull[];
}

async function uploadAssignmentFile(offeringId: string, file: File) {
  const ext = file.name.split(".").pop();
  const path = `${offeringId}/${Date.now()}-${file.name}`;

  const { error } = await supabase.storage
    .from("materials")
    .upload(path, file);

  if (error) throw new Error(error.message);

  const { data: urlData } = supabase.storage.from("materials").getPublicUrl(path);

  return {
    file_url:  urlData.publicUrl,
    file_name: file.name,
    file_size: `${(file.size / 1024 / 1024).toFixed(1)} MB`,
    file_type: ext ?? "",
  };
}

export async function addAssignment(offeringId: string, data: AssignmentFormData): Promise<void> {
  let fileData = {};
  if (data.file) {
    const uploaded = await uploadAssignmentFile(offeringId, data.file);
    fileData = { p_file_url: uploaded.file_url, p_file_name: uploaded.file_name, p_file_size: uploaded.file_size, p_file_type: uploaded.file_type };
  }
  const { error } = await supabase.rpc("add_assignment", {
    p_offering_id: offeringId,
    p_title:       data.title,
    p_description: data.description,
    p_due_date:    data.dueDate,
    p_max_grade:   data.maxGrade,
    ...fileData,
  });
  if (error) throw new Error(error.message);
}

export async function updateAssignment(data: UpdateAssignmentData): Promise<void> {
  let fileData = {};
  if (data.file) {
    const uploaded = await uploadAssignmentFile(data.assignmentId, data.file);
    fileData = { p_file_url: uploaded.file_url, p_file_name: uploaded.file_name, p_file_size: uploaded.file_size, p_file_type: uploaded.file_type };
  }
  const { error } = await supabase.rpc("update_assignment", {
    p_assignment_id: data.assignmentId,
    p_title:         data.title,
    p_description:   data.description,
    p_due_date:      data.dueDate,
    p_max_grade:     data.maxGrade,
    ...fileData,
  });
  if (error) throw new Error(error.message);
}

export async function deleteAssignment(assignmentId: string): Promise<void> {
  const { error } = await supabase.rpc("delete_assignment", {
    p_assignment_id: assignmentId,
  });
  if (error) throw new Error(error.message);
}

export async function getAssignmentSubmissions(
  facultyId: string,
  assignmentId: string,
): Promise<AssignmentSubmission[]> {
  const { data, error } = await supabase.rpc("get_assignment_submissions", {
    p_faculty_id:    facultyId,
    p_assignment_id: assignmentId,
  });
  if (error) throw new Error(error.message);
  return data as AssignmentSubmission[];
}
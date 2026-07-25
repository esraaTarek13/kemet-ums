import type {
  CreateFacultyPayload,
} from "@/types";
import { UpdateFacultyProfileParams } from "@/types";
import { supabase } from "@/lib/supabase/client";

interface CreateFacultyResponse {
  id: string;
  email: string;
  full_name: string;
  faculty_code: string;
}

// Create a new faculty member (auth user + profile + faculty row)
export async function createFaculty(
  payload: CreateFacultyPayload,
): Promise<CreateFacultyResponse> {
  const res = await fetch("/api/admin/faculty", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Failed to create faculty member");
  }

  return data.faculty;
}

export async function updateFacultyProfile(
  params: UpdateFacultyProfileParams,
): Promise<{ success: boolean }> {
  const { data, error } = await supabase.rpc("update_faculty_profile", {
    p_faculty_id: params.facultyId,
    p_phone: params.phone ?? null,
    p_nationality: params.nationality ?? null,
    p_address: params.address ?? null,
    p_rank: params.rank ?? null,
    p_employment_type: params.employmentType ?? null,
    p_specialization: params.specialization ?? null,
    p_office_location: params.officeLocation ?? null,
    p_publications: params.publications ?? null,
    p_status: params.status ?? null,
    p_office_hours: params.officeHours ?? null,
  });
  if (error) throw new Error(error.message);
  return data as { success: boolean };
}

export async function assignCoursesToFaculty(
  facultyId: string,
  offeringIds: string[],
): Promise<{
  success: boolean;
  assigned_count: number;
  failed_count: number;
  errors: { offering_id: string; error: string }[];
}> {
  const { data, error } = await supabase.rpc("assign_courses_to_faculty", {
    p_faculty_id: facultyId,
    p_offering_ids: offeringIds,
  });
  if (error) throw new Error(error.message);
  return data as {
    success: boolean;
    assigned_count: number;
    failed_count: number;
    errors: { offering_id: string; error: string }[];
  };
}

export async function deleteFaculty(
  facultyId: string,
): Promise<{ success: boolean }> {
  const response = await fetch(`/api/admin/faculty/${facultyId}`, {
    method: "DELETE",
  });
  const result = await response.json();
  if (!response.ok) throw new Error(result.error ?? "Failed to delete faculty");
  return result;
}

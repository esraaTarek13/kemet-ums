import { supabase } from "@/lib/supabase/client";
import { FacultyProfileResponse } from "@/types";

export async function getFacultyProfile(facultyId: string): Promise<FacultyProfileResponse> {
  const { data, error } = await supabase.rpc("get_faculty_profile", {
    p_faculty_id: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyProfileResponse;
}
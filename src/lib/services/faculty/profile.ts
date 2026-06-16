import { supabase } from "@/lib/supabase/client";
import { FacultyProfileResponse } from "@/types";

export async function getFacultyProfile(
  facultyUuid: string
): Promise<FacultyProfileResponse> {
  const { data, error } = await supabase.rpc('get_faculty_profile', {
    faculty_uuid: facultyUuid,
  });
 
  if (error) {
    throw new Error(error.message);
  }
 
  return data as FacultyProfileResponse;
}
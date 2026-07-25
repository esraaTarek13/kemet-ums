import { AssignableOfferingsResponse, FacultyProfileDetail } from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function getFacultyProfileDetail(
  facultyId: string,
): Promise<FacultyProfileDetail> {
  const { data, error } = await supabase.rpc("get_faculty_profile_detail", {
    p_faculty_id: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyProfileDetail;
}

export async function getAssignableOfferings(
  department: string,
  facultyId: string,
): Promise<AssignableOfferingsResponse> {
  const { data, error } = await supabase.rpc("get_assignable_offerings", {
    p_department: department,
    p_faculty_id: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as AssignableOfferingsResponse;
}

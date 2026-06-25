import { supabase } from "@/lib/supabase/client";
import { FacultyStudent } from "@/types";

export async function getFacultyStudents(offeringId: string): Promise<FacultyStudent[]> {
  const { data, error } = await supabase.rpc("get_faculty_students", {
    p_offering_id: offeringId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyStudent[];
}
import { supabase } from "@/lib/supabase/client";
import { FacultyDashboard } from "@/types";

export async function getFacultyDashboard(
  facultyId: string,
): Promise<FacultyDashboard> {
  const { data, error } = await supabase.rpc("get_faculty_dashboard", {
    faculty_uuid: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyDashboard;
}
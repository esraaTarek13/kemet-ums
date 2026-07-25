import { FacultyOption } from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function getFacultyByDepartment(
  department: string,
): Promise<FacultyOption[]> {
  const { data, error } = await supabase.rpc("get_faculty_by_department", {
    p_department: department,
  });
  if (error) throw new Error(error.message);
  return data as FacultyOption[];
}

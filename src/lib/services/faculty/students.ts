import { supabase } from "@/lib/supabase/client";
import { FacultyStudent } from "@/types";

export async function getFacultyAllStudents(facultyId: string): Promise<FacultyStudent[]> {
  const { data, error } = await supabase.rpc("get_faculty_all_students", {
    p_faculty_id: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyStudent[];
}
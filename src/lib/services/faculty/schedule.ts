import { supabase } from "@/lib/supabase/client";
import { FacultyScheduleEvent } from "@/types";

export async function getFacultySchedule(facultyId: string): Promise<FacultyScheduleEvent[]> {
  const { data, error } = await supabase.rpc("get_faculty_schedule", {
    faculty_uuid: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyScheduleEvent[];
}
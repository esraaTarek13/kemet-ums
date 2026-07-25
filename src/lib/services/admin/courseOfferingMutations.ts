import { UpdateCourseOfferingParams } from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function updateCourseOffering(
  params: UpdateCourseOfferingParams,
): Promise<{ success: boolean; offering_id: string }> {
  const { data, error } = await supabase.rpc("update_course_offering", {
    p_offering_id: params.offeringId,
    p_faculty_id: params.facultyId ?? null,
    p_semester: params.semester ?? null,
    p_academic_year: params.academicYear ?? null,
    p_day_of_week: params.dayOfWeek ?? null,
    p_start_time: params.startTime ?? null,
    p_end_time: params.endTime ?? null,
    p_room: params.room ?? null,
    p_max_students: params.maxStudents ?? null,
    p_status: params.status ?? null,
  });
  if (error) throw new Error(error.message);
  return data as { success: boolean; offering_id: string };
}

export async function deleteCourseOffering(
  offeringId: string,
): Promise<{ success: boolean }> {
  const { data, error } = await supabase.rpc("delete_course_offering", {
    p_offering_id: offeringId,
  });
  if (error) throw new Error(error.message);
  return data as { success: boolean };
}

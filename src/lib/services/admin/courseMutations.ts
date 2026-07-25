import { supabase } from "@/lib/supabase/client";
import { buildSemesterValue } from "@/lib/utils/shared/semester";
import type { CreateCoursePayload } from "@/types";

interface CreateCourseResponse {
  success: boolean;
  course_id: string;
  offering_id: string;
}

export async function createCourse(
  payload: CreateCoursePayload,
): Promise<CreateCourseResponse> {
  const { data, error } = await supabase.rpc("create_course_catalog_entry", {
    p_course_code: payload.course_code,
    p_course_name: payload.course_name,
    p_department: payload.department,
    p_credits: payload.credits,
    p_price: payload.price,
    p_faculty_id: payload.faculty_id,
    p_semester: buildSemesterValue(payload.term, payload.academic_year),
    p_academic_year: payload.academic_year,
    p_day_of_week: payload.day_of_week,
    p_start_time: payload.start_time,
    p_end_time: payload.end_time,
    p_room: payload.room,
    p_max_students: payload.max_students,
    p_course_type: payload.course_type,
    p_description: payload.description ?? null,
  });

  if (error) throw new Error(error.message);

  return data as CreateCourseResponse;
}
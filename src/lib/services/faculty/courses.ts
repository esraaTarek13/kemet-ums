import { supabase } from "@/lib/supabase/client";
import { FacultyCourse, FacultyCourseDetail } from "@/types";

export async function getFacultyCourses(
  facultyId: string,
  semester?: string,
  academicYear?: string,
): Promise<FacultyCourse[]> {
  const { data, error } = await supabase.rpc("get_faculty_courses", {
    p_faculty_id: facultyId,
    p_semester: semester ?? null,
    p_academic_year: academicYear ?? null,
  });
  if (error) throw new Error(error.message);
  return data as FacultyCourse[];
}

export async function getFacultyCourseDetail(
  facultyId: string,
  offeringId: string,
): Promise<FacultyCourseDetail> {
  const { data, error } = await supabase.rpc("get_faculty_course_detail", {
    p_faculty_id: facultyId,
    p_offering_id: offeringId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyCourseDetail;
}

export async function updateCourseCompletion(
  offeringId: string,
  completion: number,
): Promise<void> {
  const { error } = await supabase.rpc("update_course_completion", {
    p_offering_id: offeringId,
    p_completion: completion,
  });
  if (error) throw new Error(error.message);
}

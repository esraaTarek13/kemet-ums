import { supabase } from "@/lib/supabase/client";
import { StudentCourse, StudentCourseDetails } from "@/types";

export async function getStudentCourses(
  studentId: string,
  status?: "active" | "completed",
): Promise<StudentCourse[]> {
  const { data, error } = await supabase.rpc("get_student_courses", {
    p_student_id: studentId,
    p_course_status: status ?? null,
  });
  if (error) throw new Error(error.message);
  return data as StudentCourse[];
}

export async function getStudentCourseDetails(
  studentId: string,
  offeringId: string,
): Promise<StudentCourseDetails> {
  const { data, error } = await supabase.rpc("get_student_course_detail", {
    p_student_id: studentId,
    p_offering_id: offeringId,
  });
  if (error) throw new Error(error.message);
  return data as StudentCourseDetails;
}
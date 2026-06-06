import { supabase } from "@/lib/supabase/client";
import { StudentCourse, StudentCourseDetails } from "@/types";

export async function getStudentCourses(
  studentId: string,
  status?: "in_progress" | "completed",
): Promise<StudentCourse[]> {
  const { data, error } = await supabase.rpc("get_student_courses", {
    student_uuid: studentId,
    course_status: status ?? null,
  });
  if (error) throw new Error(error.message);
  return data as StudentCourse[];
}

export async function getStudentCourseDetails(
  studentId: string,
  courseId: string,
): Promise<StudentCourseDetails> {
  const { data, error } = await supabase.rpc("get_student_course_details", {
    student_uuid: studentId,
    course_uuid: courseId,
  });
  if (error) throw new Error(error.message);
  return data as StudentCourseDetails;
}

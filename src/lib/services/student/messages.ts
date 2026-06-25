import { supabase } from "@/lib/supabase/client";
import { CourseMessagesData, CourseThread } from "@/types";

export async function getStudentMessages(
  studentId: string,
): Promise<CourseThread[]> {
  const { data, error } = await supabase.rpc("get_student_messages", {
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as CourseThread[];
}

export async function getStudentCourseMessages(
  studentId: string,
  courseId: string,
): Promise<CourseMessagesData> {
  const { data, error } = await supabase.rpc("get_course_messages", {
    p_student_id: studentId,
    p_course_id: courseId,
  });
  if (error) throw new Error(error.message);
  return data as CourseMessagesData;
}
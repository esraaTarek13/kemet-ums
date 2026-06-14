import { supabase } from "@/lib/supabase/client";
import { CourseMessagesData, CourseThread } from "@/types";

export async function getStudentMessages(
  studentId: string
): Promise<CourseThread[]> {
  const { data, error } = await supabase.rpc("get_student_messages", {
    student_uuid: studentId,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getStudentCourseMessages(
  studentId: string,
  courseId: string
): Promise<CourseMessagesData> {
  const { data, error } = await supabase.rpc("get_course_messages", {
    student_uuid: studentId,
    course_uuid: courseId,
  });
  if (error) throw new Error(error.message);
  return data;
}
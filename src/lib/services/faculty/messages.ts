import { supabase } from "@/lib/supabase/client";
import { CourseThread, CourseMessagesData } from "@/types";

export async function getFacultyMessages(facultyId: string): Promise<CourseThread[]> {
  const { data, error } = await supabase.rpc("get_faculty_messages", {
    p_faculty_id: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as CourseThread[];
}

export async function getFacultyCourseMessages(
  facultyId: string,
  courseId: string,
): Promise<CourseMessagesData> {
  const { data, error } = await supabase.rpc("get_faculty_course_messages", {
    p_faculty_id: facultyId,
    p_course_id: courseId,
  });
  if (error) throw new Error(error.message);
  return data as CourseMessagesData;
}
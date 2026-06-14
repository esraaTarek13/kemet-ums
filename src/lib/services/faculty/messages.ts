import { supabase } from "@/lib/supabase/client";
import { CourseMessagesData, CourseThread } from "@/types";

export async function getFacultyMessages(
  facultyId: string
): Promise<CourseThread[]> {
  const { data, error } = await supabase.rpc("get_faculty_messages", {
    faculty_uuid: facultyId,
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function getFacultyCourseMessages(
  facultyId: string,
  courseId: string
): Promise<CourseMessagesData> {
  const { data, error } = await supabase.rpc("get_faculty_course_messages", {
    faculty_uuid: facultyId,
    course_uuid: courseId,
  });
  if (error) throw new Error(error.message);
  return data;
}
import { supabase } from "@/lib/supabase/client";
import {
  StudentDashboardStats,
  StudentCourse,
  DueSoonItem,
} from "@/types";

export async function getStudentDashboardStats(
  studentId: string,
): Promise<StudentDashboardStats> {
  const { data, error } = await supabase.rpc("get_student_dashboard_stats", {
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentDashboardStats;
}

export async function getStudentDashboardCourses(
  studentId: string,
): Promise<StudentCourse[]> {
  const { data, error } = await supabase.rpc("get_student_dashboard_courses", {
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as StudentCourse[];
}

export async function getStudentDueSoon(
  studentId: string,
  limit = 5,
): Promise<DueSoonItem[]> {
  const { data, error } = await supabase.rpc("get_student_due_soon", {
    p_student_id: studentId,
    p_limit: limit,
  });
  if (error) throw new Error(error.message);
  return data as DueSoonItem[];
}
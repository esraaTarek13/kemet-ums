import { supabase } from "@/lib/supabase/client";
import { FacultyCourse, FacultyDashboardStats, FacultyPerformanceIndex, FacultyRecentSubmission } from "@/types";


export async function getFacultyDashboardStats(facultyId: string): Promise<FacultyDashboardStats> {
  const { data, error } = await supabase.rpc("get_faculty_dashboard_stats", {
    p_faculty_id: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyDashboardStats;
}

export async function getActiveFacultyCourses(
  facultyId: string,
): Promise<FacultyCourse[]> {
  const { data, error } = await supabase.rpc("get_faculty_active_courses", {
    p_faculty_id: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyCourse[];
}

export async function getFacultyRecentSubmissions(
  facultyId: string,
  limit = 5,
): Promise<FacultyRecentSubmission[]> {
  const { data, error } = await supabase.rpc("get_faculty_recent_submissions", {
    p_faculty_id: facultyId,
    p_limit: limit,
  });
  if (error) throw new Error(error.message);
  return data as FacultyRecentSubmission[];
}

export async function getFacultyPerformanceIndex(facultyId: string): Promise<FacultyPerformanceIndex> {
  const { data, error } = await supabase.rpc("get_faculty_performance_index", {
    p_faculty_id: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyPerformanceIndex;
}
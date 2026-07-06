import { supabase } from "@/lib/supabase/client";
import { AdminCourse, AdminCoursesStats } from "@/types";

export async function getAdminCoursesStats(): Promise<AdminCoursesStats> {
  const { data, error } = await supabase.rpc("get_admin_courses_stats");
  if (error) throw new Error(error.message);
  return data as AdminCoursesStats;
}

export async function getAdminCourses(filters?: {
  department?: string;
  status?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const { data, error } = await supabase.rpc("get_admin_courses", {
    p_department: filters?.department ?? null,
    p_status: filters?.status ?? null,
    p_search: filters?.search ?? null,
    p_page: filters?.page ?? 1,
    p_page_size: filters?.pageSize ?? 8,
  });
  if (error) throw new Error(error.message);
  const res = data as {
    total_count: number;
    total_pages: number;
    courses: AdminCourse[];
  };
  return {
    total_count: res.total_count,
    total_pages: res.total_pages,
    data: res.courses,
  };
}

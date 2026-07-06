import { supabase } from "@/lib/supabase/client";
import { AdminFaculty, AdminFacultyStats } from "@/types";

export async function getAdminFacultyStats(): Promise<AdminFacultyStats> {
  const { data, error } = await supabase.rpc("get_admin_faculty_stats");
  if (error) throw new Error(error.message);
  return data as AdminFacultyStats;
}

export async function getAdminFaculty(filters?: {
  department?: string;
  status?: string;
  rank?: string;
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const { data, error } = await supabase.rpc("get_admin_faculty", {
    p_department: filters?.department ?? null,
    p_status: filters?.status ?? null,
    p_rank: filters?.rank ?? null,
    p_search: filters?.search ?? null,
    p_page: filters?.page ?? 1,
    p_page_size: filters?.pageSize ?? 7,
  });
  if (error) throw new Error(error.message);
  const res = data as {
    total_count: number;
    total_pages: number;
    faculty: AdminFaculty[];
  };
  return {
    total_count: res.total_count,
    total_pages: res.total_pages,
    data: res.faculty,
  };
}

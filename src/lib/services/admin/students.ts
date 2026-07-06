import { supabase } from "@/lib/supabase/client";
import {  AdminListResponse, AdminStudent, AdminStudentsStats } from "@/types";

export async function getAdminStudentsStats(): Promise<AdminStudentsStats> {
  const { data, error } = await supabase.rpc("get_admin_students_stats");
  if (error) throw new Error(error.message);
  return data as AdminStudentsStats;
}

export async function getAdminStudents(filters?: {
  department?: string;
  status?: string;
  year?: number;
  search?: string;
  page?: number;
  pageSize?: number;
}): Promise<AdminListResponse<AdminStudent>> {
  const { data, error } = await supabase.rpc("get_admin_students", {
    p_department: filters?.department ?? null,
    p_status:     filters?.status ?? null,
    p_year:       filters?.year ?? null,
    p_search:     filters?.search ?? null,
    p_page:       filters?.page ?? 1,
    p_page_size:  filters?.pageSize ?? 7,
  });
  if (error) throw new Error(error.message);
  const res = data as { total_count: number; total_pages: number; students: AdminStudent[] };
  return { total_count: res.total_count, total_pages: res.total_pages, data: res.students };
}

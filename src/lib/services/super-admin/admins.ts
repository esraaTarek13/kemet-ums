import { supabase } from "@/lib/supabase/client";
import { AdminsStats, AdminUser } from "@/types";

export async function getAdminStats(): Promise<AdminsStats> {
  const { data, error } = await supabase.rpc("get_admin_stats");
  if (error) throw new Error(error.message);
  return data as AdminsStats;
}

export async function getAdminAdmins(filters?: {
  search?: string;
  page?: number;
  pageSize?: number;
}) {
  const { data, error } = await supabase.rpc("get_admin_admins", {
    p_search: filters?.search ?? null,
    p_page: filters?.page ?? 1,
    p_page_size: filters?.pageSize ?? 7,
  });
  if (error) throw new Error(error.message);
  const res = data as {
    total_count: number;
    total_pages: number;
    admins: AdminUser[];
  };
  return {
    total_count: res.total_count,
    total_pages: res.total_pages,
    data: res.admins,
  };
}

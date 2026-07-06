import { supabase } from "@/lib/supabase/client";
import { AdminUser } from "@/types";

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

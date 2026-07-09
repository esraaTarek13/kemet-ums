import { supabase } from "@/lib/supabase/client";
import { AdminReportsResponse } from "@/types";

export async function getAdminReports(): Promise<AdminReportsResponse> {
  const { data, error } = await supabase.rpc("get_admin_reports");
  if (error) throw new Error(error.message);
  return data as AdminReportsResponse;
}

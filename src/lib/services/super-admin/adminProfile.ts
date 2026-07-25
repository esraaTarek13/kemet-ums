import { supabase } from "@/lib/supabase/client";
import type { AdminProfileDetail } from "@/types";
import { UpdateAdminByAdminPayload } from "@/validation/updateAdminByAdmin.schema";

export async function getAdminProfileDetail(
  adminId: string,
): Promise<AdminProfileDetail> {
  const { data, error } = await supabase.rpc("get_admin_profile_detail", {
    p_admin_id: adminId,
  });
  if (error) throw new Error(error.message);
  return data as AdminProfileDetail;
}

export async function updateAdminProfile(
  adminId: string,
  payload: UpdateAdminByAdminPayload,
): Promise<AdminProfileDetail> {
  const res = await fetch(`/api/super-admin/admins/${adminId}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      full_name: payload.full_name,
      phone: payload.phone,
      nationality: payload.nationality,
      address: payload.address,
      status: payload.status,
    }),
  });

  const json = await res.json();

  if (!res.ok) {
    throw new Error(json.error ?? "Failed to update admin profile");
  }

  return json.admin as AdminProfileDetail;
}

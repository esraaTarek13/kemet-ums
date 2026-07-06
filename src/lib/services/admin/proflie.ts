import { supabase } from "@/lib/supabase/client";
import {
  AdminProfileResponse,
  UpdateAdminProfilePayload,
  UpdateAdminProfileResponse,
} from "@/types";

export async function getAdminProfile(): Promise<AdminProfileResponse> {
  const { data, error } = await supabase.rpc("get_admin_profile");
  if (error) throw new Error(error.message);
  return data as AdminProfileResponse;
}

export async function updateAdminProfile(
  payload: UpdateAdminProfilePayload,
): Promise<UpdateAdminProfileResponse> {
  const { data, error } = await supabase.rpc("update_admin_profile", {
    p_full_name: payload.full_name ?? null,
    p_phone: payload.phone ?? null,
    p_address: payload.address ?? null,
  });
  if (error) throw new Error(error.message);
  return data as UpdateAdminProfileResponse;
}

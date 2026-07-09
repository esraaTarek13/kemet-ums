import { supabase } from "@/lib/supabase/client";
import {
  AdminAnnouncementsResponse,
  AnnouncementStatusFilter,
  CreateAnnouncementPayload,
  CreateAnnouncementResponse,
  DeleteAnnouncementResponse,
  UpdateAnnouncementPayload,
  UpdateAnnouncementResponse,
} from "@/types";

export async function getAdminAnnouncements(
  status?: AnnouncementStatusFilter,
): Promise<AdminAnnouncementsResponse> {
  const { data, error } = await supabase.rpc("get_admin_announcements", {
    p_status: status ?? null,
  });
  if (error) throw new Error(error.message);
  return data as AdminAnnouncementsResponse;
}

export async function createAnnouncement(
  payload: CreateAnnouncementPayload,
): Promise<CreateAnnouncementResponse> {
  const { data, error } = await supabase.rpc("create_announcement", {
    p_title: payload.title,
    p_content: payload.content,
    p_audience: payload.audience ?? "all",
    p_priority: payload.priority ?? "normal",
    p_status: payload.status ?? "active",
  });
  if (error) throw new Error(error.message);
  return data as CreateAnnouncementResponse;
}

export async function updateAnnouncement(
  payload: UpdateAnnouncementPayload,
): Promise<UpdateAnnouncementResponse> {
  const { data, error } = await supabase.rpc("update_announcement", {
    p_id: payload.id,
    p_title: payload.title ?? null,
    p_content: payload.content ?? null,
    p_audience: payload.audience ?? null,
    p_priority: payload.priority ?? null,
    p_status: payload.status ?? null,
  });
  if (error) throw new Error(error.message);
  return data as UpdateAnnouncementResponse;
}

export async function deleteAnnouncement(
  id: string,
): Promise<DeleteAnnouncementResponse> {
  const { data, error } = await supabase.rpc("delete_announcement", {
    p_id: id,
  });
  if (error) throw new Error(error.message);
  return data as DeleteAnnouncementResponse;
}

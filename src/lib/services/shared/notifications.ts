import { supabase } from "@/lib/supabase/client";
import { NotificationsResponse } from "@/types";

export async function getNotifications(
  limit = 20,
): Promise<NotificationsResponse> {
  const { data, error } = await supabase.rpc("get_notifications", {
    p_limit: limit,
  });
  if (error) throw new Error(error.message);
  return data as NotificationsResponse;
}

export async function markNotificationsRead(ids?: string[]): Promise<void> {
  const { error } = await supabase.rpc("mark_notifications_read", {
    p_notification_ids: ids ?? null,
  });
  if (error) throw new Error(error.message);
}

import { supabase } from "@/lib/supabase/client";
import { Announcement } from "@/types";

export async function getAnnouncements(): Promise<Announcement[]> {
  const { data, error } = await supabase.rpc("get_announcements");
  if (error) throw new Error(error.message);
  return data as Announcement[];
}
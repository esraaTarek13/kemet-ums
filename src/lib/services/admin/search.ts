import { supabase } from "@/lib/supabase/client";
import { AdminSearchResults } from "@/types";

export async function searchUniversity(term: string): Promise<AdminSearchResults> {
  const { data, error } = await supabase.rpc("search_admin_portal", {
    p_query: term,
  });
  if (error) throw new Error(error.message);
  return data as AdminSearchResults;
}
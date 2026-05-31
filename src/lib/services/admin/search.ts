import { supabase } from "@/lib/supabase/client";
import { AdminSearchResults } from "@/types";

// Supports pagination via limit/offset
export async function searchUniversity(
  term: string,
  limit = 10,
  offset = 0,
): Promise<AdminSearchResults> {
  const { data, error } = await supabase.rpc("search_university", {
    search_term: term,
    result_limit: limit,
    result_offset: offset,
  });
  if (error) throw new Error(error.message);
  return data as AdminSearchResults;
}

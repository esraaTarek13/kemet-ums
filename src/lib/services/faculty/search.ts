import { supabase } from "@/lib/supabase/client";
import { FacultySearchResults } from "@/types";

// Calls search_faculty_portal RPC; supports pagination via limit/offset
export async function searchFaculty(
  term: string,
  limit = 10,
  offset = 0,
): Promise<FacultySearchResults> {
  const { data, error } = await supabase.rpc("search_faculty_portal", {
    search_term: term,
    result_limit: limit,
    result_offset: offset,
  });
  if (error) throw new Error(error.message);
  return data as FacultySearchResults;
}

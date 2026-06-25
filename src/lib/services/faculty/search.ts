import { supabase } from "@/lib/supabase/client";
import { FacultySearchResults } from "@/types";

export async function searchFaculty(term: string): Promise<FacultySearchResults> {
  const { data, error } = await supabase.rpc("search_faculty_portal", {
    p_query: term,
  });
  if (error) throw new Error(error.message);
  return data as FacultySearchResults;
}
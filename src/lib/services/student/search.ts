import { supabase } from "@/lib/supabase/client";
import { StudentSearchResults } from "@/types";

export async function searchStudent(
  term: string,
  limit = 10,
  offset = 0,
): Promise<StudentSearchResults> {
  const { data, error } = await supabase.rpc("search_student_portal", {
    search_term: term,
    result_limit: limit,
    result_offset: offset,
  });
  if (error) throw new Error(error.message);
  return data as StudentSearchResults;
}
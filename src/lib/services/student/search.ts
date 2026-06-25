import { supabase } from "@/lib/supabase/client";
import { StudentSearchResults } from "@/types";

export async function searchStudent(term: string): Promise<StudentSearchResults> {
  const { data, error } = await supabase.rpc("search_student_portal", {
    p_query: term,
  });
  if (error) throw new Error(error.message);
  return data as StudentSearchResults;
}
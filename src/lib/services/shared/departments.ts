import { supabase } from "@/lib/supabase/client";

export async function getDepartments(
  entity: "courses" | "faculty" | "students" = "courses",
): Promise<string[]> {
  const { data, error } = await supabase.rpc("get_departments", {
    p_entity: entity,
  });
  if (error) throw new Error(error.message);
  return data as string[];
}

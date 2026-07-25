import { AcademicYearOption } from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function getSemesters(): Promise<AcademicYearOption[]> {
  const { data, error } = await supabase
    .from("course_offerings")
    .select("semester")
    .order("semester", { ascending: false });
  if (error) throw new Error(error.message);

  const uniqueSemesters = Array.from(
    new Set((data ?? []).map((row) => row.semester)),
  );

  return uniqueSemesters.map((s) => ({ label: s, value: s }));
}

import { AcademicYearOption } from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function getAcademicYears(): Promise<AcademicYearOption[]> {
  const { data, error } = await supabase
    .from("course_offerings")
    .select("academic_year")
    .order("academic_year", { ascending: false });
  if (error) throw new Error(error.message);

  const uniqueYears = Array.from(
    new Set((data ?? []).map((row) => row.academic_year)),
  );

  return uniqueYears.map((year) => ({ label: year, value: year }));
}
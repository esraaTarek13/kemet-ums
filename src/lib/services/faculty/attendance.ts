import { supabase } from "@/lib/supabase/client";
import { FacultyAttendanceRecord } from "@/types";

export async function getFacultyAttendance(offeringId: string): Promise<FacultyAttendanceRecord[]> {
  const { data, error } = await supabase.rpc("get_faculty_attendance", {
    p_offering_id: offeringId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyAttendanceRecord[];
}

export async function markAttendance(
  enrollmentId: string,
  date: string,
  status: "present" | "absent" | "late",
) {
  const { error } = await supabase
    .from("attendance")
    .upsert(
      { enrollment_id: enrollmentId, date, status },
      { onConflict: "enrollment_id,date" },
    );
  if (error) throw new Error(error.message);
}


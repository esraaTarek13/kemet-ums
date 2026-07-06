import { FacultyOfferingFilter, FacultyStudent, FacultyStudentProfile } from "@/types";
import { supabase } from "@/lib/supabase/client";

export async function getFacultyAllStudents(
  facultyId: string,
  filters?: {
    offeringId?: string;
    status?: string;
    search?: string;
    page?: number;
    pageSize?: number;
  }
) {
  const { data, error } = await supabase.rpc("get_faculty_all_students", {
    p_faculty_id:  facultyId,
    p_offering_id: filters?.offeringId ?? null,
    p_status:      filters?.status ?? null,
    p_search:      filters?.search ?? null,
    p_page:        filters?.page ?? 1,
    p_page_size:   filters?.pageSize ?? 10,
  });
  if (error) throw new Error(error.message);
  const res = data as { total_count: number; total_pages: number; students: FacultyStudent[] };
  return { total_count: res.total_count, total_pages: res.total_pages, data: res.students };
}

export async function getFacultyOfferingList(
  facultyId: string,
): Promise<FacultyOfferingFilter[]> {
  const { data, error } = await supabase.rpc("get_faculty_offering_list", {
    p_faculty_id: facultyId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyOfferingFilter[];
}

export async function getFacultyStudentProfile(
  facultyId: string,
  studentId: string,
): Promise<FacultyStudentProfile> {
  const { data, error } = await supabase.rpc("get_faculty_student_profile", {
    p_faculty_id: facultyId,
    p_student_id: studentId,
  });
  if (error) throw new Error(error.message);
  return data as FacultyStudentProfile;
}
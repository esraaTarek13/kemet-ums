export interface AdminFacultyStats {
  total_faculty: number;
  full_time: number;
  part_time: number;
  departments: number;
}

export interface AdminFaculty {
  id: string;
  faculty_code: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  department: string;
  rank: string;
  employment_type: "full_time" | "part_time";
  status: "active" | "inactive" | "on_leave";
  courses_count: number;
  students_count: number;
}

export type {
  CreateFacultyFormValues,
  CreateFacultyPayload,
} from "@/validation/createFaculty.schema";

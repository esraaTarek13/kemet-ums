export interface FacultyProfileHeader {
  faculty_id: string;
  faculty_code: string;
  full_name: string;
  avatar_url: string | null;
  status: string;
  department: string;
  rank: string | null;
  employment_type: string | null;
  specialization: string | null;
  publications: number;
  office_location: string | null;
  join_date: string | null;
  email: string | null;
  phone: string | null;
  nationality: string | null;
  address: string | null;
  office_hours: string | null;
}

export interface FacultyProfileStats {
  courses_count: number;
  total_students: number;
  experience_years: number;
  pass_rate: number | null;
  academic_standing:
    | "Good Standing"
    | "Satisfactory"
    | "Needs Improvement"
    | "No Data";
}

export interface FacultyAssignedCourse {
  offering_id: string;
  course_code: string;
  course_name: string;
  credits: number;
  enrolled_count: number;
  max_students: number;
  schedule: string | null;
  day_of_week: string[] | null;
  start_time: string | null;
  end_time: string | null;
}

export interface FacultyProfileDetail {
  header: FacultyProfileHeader;
  stats: FacultyProfileStats;
  courses: FacultyAssignedCourse[];
}

export interface UpdateFacultyProfileParams {
  facultyId: string;
  phone?: string;
  nationality?: string;
  address?: string;
  rank?: string;
  employmentType?: string;
  specialization?: string;
  officeLocation?: string;
  officeHours?: string;
  publications?: number;
  status?: string;
}

export interface AssignableOffering {
  offering_id: string;
  course_code: string;
  course_name: string;
  semester: string;
  academic_year: string;
  day_of_week: string[];
  start_time: string;
  end_time: string;
  current_faculty_name: string | null;
}

export interface FacultyScheduleSlot {
  offering_id: string;
  semester: string;
  academic_year: string;
  day_of_week: string[];
  start_time: string;
  end_time: string;
}

export interface AssignableOfferingsResponse {
  offerings: AssignableOffering[];
  current_load: number;
  max_load: number;
  current_schedule: FacultyScheduleSlot[];
}

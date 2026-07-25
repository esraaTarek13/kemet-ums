export interface StudentProfileHeader {
  student_id: string;
  student_code: string;
  full_name: string;
  avatar_url: string | null;
  status: string;
  department: string;
  academic_year: number;
  email: string | null;
  phone: string | null;
  nationality: string | null;
  address: string | null;
  date_of_birth: string | null;
  enrollment_date: string | null;
  expected_graduation: string | null;
  clearance_status: string;
}

export interface StudentProfileStats {
  gpa: number | null;
  credits_completed: number;
  credits_required: number;
  credits_left: number;
  progress_pct: number;
  standing: "Excellent" | "Good" | "Satisfactory" | "Probation" | "No Data";
}

export interface StudentEnrolledCourse {
  enrollment_id: string;
  offering_id: string;
  course_code: string;
  course_name: string;
  credits: number;
  grade: string | null;
  status: "active" | "suspended" | "at_risk" | "graduated";
  semester: string;
  academic_year: string;
}

export interface StudentProfileDetail {
  header: StudentProfileHeader;
  stats: StudentProfileStats;
  courses: StudentEnrolledCourse[];
}

export interface EnrollStudentParams {
  studentId: string;
  offeringId: string;
}

export interface UpdateStudentProfileParams {
  studentId: string;
  phone?: string;
  nationality?: string;
  address?: string;
  department?: string;
  expectedGraduation?: string;
  status?: string;
}

export interface TranscriptCourse {
  course_code: string;
  course_name: string;
  credits: number;
  grade: string | null;
  status: string;
}

export interface TranscriptSemester {
  semester: string;
  academic_year: string;
  semester_gpa: number | null;
  courses: TranscriptCourse[];
}

export interface StudentTranscript {
  header: {
    full_name: string;
    student_code: string;
    department: string;
    enrollment_date: string | null;
  };
  overall_gpa: number | null;
  semesters: TranscriptSemester[];
}

export interface OfferingScheduleSlot {
  offering_id: string;
  semester: string;
  academic_year: string;
  day_of_week: string[];
  start_time: string;
  end_time: string;
}

export interface AvailableOffering {
  offering_id: string;
  course_code: string;
  course_name: string;
  credits: number;
  semester: string;
  academic_year: string;
  faculty_name: string | null;
  max_students: number;
  enrolled_count: number;
  day_of_week: string[];
  start_time: string;
  end_time: string;
  schedule: string | null;
}

export interface AvailableOfferingsResponse {
  offerings: AvailableOffering[];
  current_schedule: OfferingScheduleSlot[];
  max_credits: number;
  current_credits: number;
}

export interface DropEnrollmentParams {
  enrollmentId: string;
  studentId: string;
}
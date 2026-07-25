export interface CourseOfferingDetail {
  offering_id: string;
  course_id: string;
  course_code: string;
  course_name: string;
  department: string;
  credits: number;
  semester: string;
  academic_year: string;
  day_of_week: string[] | undefined;
  start_time: string | undefined;
  end_time: string | undefined;
  room: string | null;
  status: string;
  max_students: number;
  faculty_name: string | null;
  faculty_id: string | null;
  enrolled_count: number;
  capacity_pct: number;
}

export interface EnrolledStudent {
  student_id: string;
  full_name: string;
  student_code: string;
  year: number;
  gpa: number;
  status: "stable" | "at_risk";
}

export interface CourseOfferingDetailResponse {
  course: CourseOfferingDetail;
  students: EnrolledStudent[];
}

export interface UpdateCourseOfferingParams {
  offeringId: string;
  facultyId?: string;
  semester?: string;
  academicYear?: string;
  dayOfWeek?: string[];
  startTime?: string;
  endTime?: string;
  room?: string;
  maxStudents?: number;
  status?: string;
}

export interface FacultyOption {
  value: string;
  label: string;
}
export interface AdminCoursesStats {
  total_courses: number;
  active_enrollment: number;
  total_enrollments: number;
}

export interface AdminCourse {
  course_id: string;
  offering_id: string | null;
  course_code: string;
  course_name: string;
  department: string;
  credits: number;
  status: "active" | "inactive" | "archived";
  faculty_name: string | null;
  schedule: string | null;
  enrolled_count: number;
  max_students: number | null;
  completion_percentage: number | null;
}


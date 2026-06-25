export interface FacultyDashboardStats {
  total_courses: number;
  total_students: number;
  pending_grading: number;
  avg_attendance: number;
}

export interface FacultyRecentSubmission {
  submission_id: string;
  student_name: string;
  course_code: string;
  submitted_at: string;
  grade: string | null;
  status: "submitted" | "graded" | "late";
}

export interface FacultyPerformanceIndex {
  student_performance: number;
  assignment_completion: number;
}
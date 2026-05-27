export interface FacultyDashboard {
  active_courses: number;
  total_students: number;
  pending_grading: number;
  this_week_classes: number;
  courses: FacultyCourse[];
  recent_submissions: RecentSubmission[];
  schedule: FacultyScheduleItem[];
  performance_index: PerformanceIndex;
}

export interface FacultyCourse {
  course_id: string;
  course_code: string;
  course_name: string;
  schedule: string;
  room: string;
  enrolled_count: number;
  capacity: number;
  status: string;
}

export interface RecentSubmission {
  submission_id: string;
  student_name: string;
  course_code: string;
  submitted_at: string;
  grade: number | null;
  status: "pending" | "graded" | "late";
}

export interface FacultyScheduleItem {
  course_code: string;
  course_name: string;
  schedule: string;
  room: string;
}

export interface PerformanceIndex {
  student_performance: number;
  assignment_completion: number;
}
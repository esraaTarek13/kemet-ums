export interface StudentDashboard {
  enrolled_courses: number;
  gpa: number;
  pending_tasks: number;
  upcoming_exams: number;
  attendance_rate: number;
  courses: StudentDashboardCourse[];
  due_soon: DueSoonItem[];
  schedule: ScheduleItem[];
}

export interface StudentDashboardCourse {
  course_id: string;
  course_code: string;
  course_name: string;
  course_type: "core" | "stem" | "lang" | "hist" | "design" | "elective";
  department: string;
  credits: number;
  schedule: string;
  room: string;
  semester: string;
  completion: number;
  faculty_name: string;
}

export interface DueSoonItem {
  assignment_id: string;
  title: string;
  course_name: string;
  faculty_name: string;
  due_date: string;
  status: "not_submitted" | "pending" | "graded" | "late";
}

export interface ScheduleItem {
  course_code: string;
  course_name: string;
  days: string[];
  start_time: string;
  end_time: string;
  room: string;
  faculty_name: string;
  term_start: string;
  term_end: string;
}

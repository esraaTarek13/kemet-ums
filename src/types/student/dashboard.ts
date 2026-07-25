export interface StudentDashboardStats {
  enrolled_courses: number;
  gpa: number;
  balance_due: number;
  attendance_rate: number;
}

export interface DueSoonItem {
  assignment_id: string;
  title: string;
  course_name: string;
  faculty_name: string;
  due_date: string;
  status: "not_submitted";
}
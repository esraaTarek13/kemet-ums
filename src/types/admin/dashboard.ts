import { IconType } from "react-icons";

export type DashboardStats = {
  total_students: number;
  active_students: number;
  at_risk_students: number;
  suspended_students: number;
  graduated_students: number;
  total_faculty: number;
  active_faculty: number;
  fulltime_faculty: number;
  parttime_faculty: number;
  total_courses: number;
  active_courses: number;
  departments: number;
  total_enrollments: number;
  active_enrollments: number;
  pending_announcements: number;
};

export type RecentStudent = {
  id: string;
  student_code: string;
  full_name: string;
  email: string;
  department: string;
  academic_year: number;
  gpa: number;
  status: "active" | "suspended" | "at_risk" | "graduated";
  enrollment_date: string;
  avatar_url: string | null;
};

export type Announcement = {
  id: string;
  admin_id: string;
  title: string;
  content: string;
  audience: "all" | "students" | "faculty";
  priority: "normal" | "important" | "urgent";
  status: "active" | "scheduled" | "expired";
  created_at: string;
};

export interface EnrollmentTrend {
  month: string;
  count: number;
}

export interface EnrollmentTrendResponse {
  data: EnrollmentTrend[];
  total_pages: number;
  current_page: number;
  has_next: boolean;
  has_prev: boolean;
}

export type ReportsSummary = {
  academic_performance: number;
  attendance_rate: number;
  current_semester: string | null;
  academic_year: string | null;
};

export interface StatCardProps {
  label: string;
  value: number | undefined ;
  icon: IconType;
  description?: string;
  descriptionColor?: "default" | "success" | "warning" | "danger";
  trend?: string;
}

export interface AdminStudentsStats {
  total_students: number;
  active: number;
  suspended: number;
  at_risk: number;
  graduated: number;
}

export interface AdminStudent {
  id: string;
  student_code: string;
  full_name: string;
  department: string;
  academic_year: number;
  credits_completed: number;
  max_credits: number;
  gpa: number;
  status: "active" | "suspended" | "at_risk" | "graduated";
  avatar_url: string | null;
}

export interface AdminListResponse<T> {
  total_count: number;
  total_pages: number;
  data: T[];
}











export interface ReportsStats {
  total_enrollment: number;
  avg_gpa: number;
  completion_rate: number;
  faculty_student_ratio: string;
  attendance_rate: number;
  graduation_rate: number;
}

export interface EnrollmentTrendItem {
  semester: string;
  academic_year: string;
  count: number;
}

export interface GpaDistribution {
  below_2: number;
  "2_to_2_5": number;
  "2_5_to_3": number;
  "3_to_3_5": number;
  "3_5_to_4": number;
}

export interface DepartmentPerformance {
  department: string;
  students: number;
  avg_gpa: number;
  pass_rate: number;
  completion_rate: number;
}

export interface AdminReportsResponse {
  stats: ReportsStats;
  enrollment_trend: EnrollmentTrendItem[];
  gpa_distribution: GpaDistribution;
  department_performance: DepartmentPerformance[];
}

export type GpaBarKey = keyof GpaDistribution;

export interface GpaBarItem {
  key: GpaBarKey;
  label: string;
  value: number;
}

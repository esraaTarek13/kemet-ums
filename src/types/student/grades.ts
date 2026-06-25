export interface GradesCourse {
  course_id: string;
  course_name: string;
  course_code: string;
  faculty_name: string;
  credits: number;
  midterm: number | null;
  final: number | null;
  quiz: number | null;
  grade: string | null;
  status: "active" | "completed" | "dropped";
}

export interface GpaTrendItem {
  semester: string;
  academic_year: string;
  gpa: number;
}

export interface StudentGrades {
  cumulative_gpa: number;
  standing: "Excellent" | "Good" | "Satisfactory" | "At Risk";
  total_credits: number;
  semester_gpa: number;
  cohort_percentile: number;
  courses: GradesCourse[];
  gpa_trend: GpaTrendItem[];
}
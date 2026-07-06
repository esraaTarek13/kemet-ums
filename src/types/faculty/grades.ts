export interface FacultyGradeStudent {
  enrollment_id: string;
  student_id: string;
  student_code: string;
  full_name: string;
  avatar_url: string | null;
  quiz: number | null;
  midterm: number | null;
  final: number | null;
  grade: string | null;
}

export interface FacultyGradesResponse {
  course_code: string;
  course_name: string;
  semester: string;
  academic_year: string;
  total_students: number;
  can_enter_midterm: boolean;
  can_enter_final: boolean;
  midterm_date: string | null;
  final_date: string | null;
  students: FacultyGradeStudent[];
}

export interface UpdateGradeData {
  enrollmentId: string;
  quiz?: number;
  midterm?: number;
  final?: number;
}

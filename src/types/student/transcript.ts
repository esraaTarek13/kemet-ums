export interface Course {
  course_code: string;
  course_name: string;
  credits: number;
  faculty_name: string;
  quiz: number | null;
  midterm: number | null;
  final: number | null;
  grade: string | null;
  status: "active" | "completed" | "dropped";
}

export interface TranscriptData {
  cumulative_gpa: number;
  semester_gpa: number;
  total_credits: number;
  standing: string;
  courses: Course[];
}
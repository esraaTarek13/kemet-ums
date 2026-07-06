import { TableNode } from "@table-library/react-table-library/types/table";

export interface FacultyStudent extends TableNode {
  enrollment_id: string;
  student_id: string;
  student_code: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  department: string;
  student_status: string;
  enrollment_status: "active" | "completed";
  offering_id: string;
  course_code: string;
  course_name: string;
  grade: string | null;
  attendance_rate: number | null;
}

export interface FacultyStudentsResponse {
  total_count: number;
  total_pages: number;
  students: FacultyStudent[];
}

export interface FacultyOfferingFilter {
  offering_id: string;
  course_code: string;
  course_name: string;
}

export interface FacultyStudentCourse {
  enrollment_id: string;
  offering_id: string;
  course_code: string;
  course_name: string;
  semester: string;
  academic_year: number;
  enrollment_status: "active" | "completed";
  grade: string | null;
  midterm: number | null;
  final: number | null;
  quiz: number | null;
  attendance_rate: number;
  submission_count: number;
}

export interface FacultyStudentProfile {
  student_id: string;
  student_code: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  department: string;
  academic_year: number;
  status: "active" | "at_risk";
  overall_gpa: number;
  overall_attendance: number;
  courses: FacultyStudentCourse[];
}
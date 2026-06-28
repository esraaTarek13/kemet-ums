import { TableNode } from "@table-library/react-table-library/types/table";

export interface FacultyStudent extends TableNode {
  enrollment_id: string;
  student_id: string;
  student_code: string;
  full_name: string;
  email: string;
  avatar_url: string | null;
  department: string;
  enrollment_status: "active" | "completed";
  offering_id: string;
  course_code: string;
  course_name: string;
  grade: string | null;
  attendance_rate: number | null;
}
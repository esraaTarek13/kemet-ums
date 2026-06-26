export interface FacultyStudent {
  id: string;
  student_id: string;
  student_code: string;
  full_name: string;
  email: string;
  department: string;
  status: 'active'| 'completed';
  grade: string | null;
  attendance_percentage: number | null;
}
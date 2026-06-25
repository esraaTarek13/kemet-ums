export interface FacultyAttendanceRecord {
  enrollment_id: string;
  student_code: string;
  full_name: string;
  date: string;
  status: "present" | "absent" | "late";
}
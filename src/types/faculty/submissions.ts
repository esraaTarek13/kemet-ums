export interface FacultySubmission {
  submission_id: string;
  student_id: string;
  student_code: string;
  full_name: string;
  submitted_at: string;
  file_url: string | null;
  file_name: string | null;
  file_type: string | null;
  status: string;
  grade: string | null;
  feedback: string | null;
}
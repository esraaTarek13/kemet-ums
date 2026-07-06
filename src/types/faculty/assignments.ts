export interface AssignmentFormData {
  title: string;
  description: string;
  dueDate: string;
  maxGrade: number;
  file?: File;
}

export interface UpdateAssignmentData extends AssignmentFormData {
  assignmentId: string;
}

export interface FacultyAssignment {
  id: string;
  title: string;
  description: string | null;
  due_date: string;
  max_grade: number;
  status: string;
  submission_count: number;
  graded_count: number;
  file_url: string | null;
  file_name: string | null;
  file_size: string | null;
  file_type: string | null;
}

export interface FacultyAssignmentFull {
  assignment_id: string;
  title: string;
  description: string | null;
  due_date: string;
  max_grade: number;
  status: string;
  course_code: string;
  course_name: string;
  offering_id: string;
  file_url: string | null;
  file_name: string | null;
  file_type: string | null;
  file_size: string | null;
  submission_count: number;
  graded_count: number;
  total_students: number;
}

export interface AssignmentSubmission {
  submission_id: string;
  student_id: string;
  student_code: string;
  full_name: string;
  avatar_url: string | null;
  submitted_at: string;
  file_url: string | null;
  file_name: string | null;
  file_type: string | null;
  file_size: string | null;
  status: string;
  grade: number | null;
  feedback: string | null;
}
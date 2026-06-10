export type AssignmentStatus =
  "not_submitted" | "overdue" | "pending" | "graded";

export interface Assignment {
  assignment_id: string;
  title: string;
  due_date: string;
  max_grade: number;
  course_name: string;
  course_code: string;
  status: AssignmentStatus;
  grade: number | null;
  feedback: string | null;
  submitted_at: string | null;
  file_url: string | null;
  file_name: string | null;
  file_size: string | null;
  file_type: string | null;
}

export interface StudentAssignments {
  all: Assignment[];
  not_submitted: Assignment[];
  overdue: Assignment[];
  pending: Assignment[];
  graded: Assignment[];
}

export interface Material {
  id: string;
  title: string;
  file_url: string;
  file_type: "pdf" | "doc" | "docx";
  file_size: string;
  created_at: string;
}

export interface SubmissionDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  grade: number | null;
  maxGrade: number | null;
  submittedAt: string | null;
  feedback: string | null;
  fileUrl: string | null ;
  fileName: string | null;
  fileSize: string | null;
  fileType: string | null;
}

export interface SubmitModalProps {
  isOpen: boolean;
  onClose: () => void;
  assignmentId: string;
}

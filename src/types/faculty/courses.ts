import { BadgeStatus } from "@/components/ui/shared/StatusBadge";

export interface FacultyCourse {
  course_id: string;
  offering_id: string;
  course_code: string;
  course_name: string;
  department: string;
  credits: number;
  semester: string;
  academic_year: string;
  schedule: string | null;
  day_of_week: string[] | null;
  start_time: string | null;
  end_time: string | null;
  room: string | null;
  enrolled_count: number;
  max_students: number;
  status: BadgeStatus;
  completion_percentage: number;
}

export interface FacultyCourseDetail {
  course: {
    course_id: string;
    offering_id: string;
    course_code: string;
    course_name: string;
    department: string;
    credits: number;
    semester: string;
    academic_year: string;
    schedule: string | null;
    day_of_week: string[] | null;
    start_time: string | null;
    end_time: string | null;
    room: string | null;
    max_students: number;
    status: string;
    completion_percentage: number;
  };
  assignments: FacultyAssignment[];
  materials: FacultyMaterial[];
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
}

export interface FacultyMaterial {
  id: string;
  title: string;
  file_url: string;
  file_type: string | null;
  file_size: number | null;
  created_at: string;
}
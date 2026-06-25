export type FilterStatus = "all" | "active" | "completed";

export interface StudentCourse {
  course_id: string;
  offering_id: string;
  course_code: string;
  course_name: string;
  course_type: "core" | "stem" | "lang" | "hist" | "design" | "elective";
  department: string;
  credits: number;
  schedule: string;
  room: string;
  semester: string;
  completion: number;
  status?: "active" | "completed" | "dropped";
  faculty_name: string;
}

export interface StudentCourseDetails {
  course: {
    course_id: string;
    offering_id: string;
    course_code: string;
    course_name: string;
    course_type: string;
    department: string;
    credits: number;
    semester: string;
    academic_year: string;
    schedule: string | null;
    day_of_week: string[] | null;
    start_time: string | null;
    end_time: string | null;
    room: string | null;
    completion_percentage: number;
    faculty_name: string;
    faculty_rank: string | null;
    faculty_email: string | null;
    faculty_avatar: string | null;
    faculty_specialization: string | null;
    faculty_office_hours: string | null;
  };
  assignments: {
    total: number;
    completed: number;
    list: {
      id: string;
      title: string;
      description: string | null;
      due_date: string;
      max_grade: number;
      status: "not_submitted" | "submitted" | "graded" | "overdue";
      grade: number | null;
      feedback: string | null;
    }[];
  };
  attendance: {
    present: number;
    absent: number;
    late: number;
    total: number;
    rate: number;
  };
  materials: {
    id: string;
    title: string;
    file_url: string;
    file_type: string | null;
    file_size: string | null;
    created_at: string;
  }[];
  grade: {
    midterm: number | null;
    final: number | null;
    quiz: number | null;
    grade: string | null;
  } | null;
}
export type FilterStatus = "all" | "in_progress" | "completed";

export interface StudentCourse {
  course_id: string;
  course_code: string;
  course_name: string;
  course_type: "core" | "stem" | "lang" | "hist" | "design" | "elective";
  department: string;
  credits: number;
  schedule: string;
  room: string;
  semester: string;
  completion: number;
  status: "in_progress" | "completed" | "dropped";
  faculty_name: string;
}

export interface StudentCourseDetails {
  course: {
    course_id: string;
    course_code: string;
    course_name: string;
    course_type: "core" | "stem" | "lang" | "hist" | "design" | "elective";
    department: string;
    credits: number;
    schedule: string;
    room: string;
    semester: string;
    days: string[];
    start_time: string;
    end_time: string;
    completion: number;
  };
  faculty: {
    full_name: string;
    email: string;
    avatar_url: string | null;
    specialization: string;
    office_location: string;
    rank: string;
  };
  grade: {
    midterm: number | null;
    final: number | null;
    grade: string | null;
  } | null;
  assignments: {
    total: number;
    completed: number;
  };
  attendance: {
    total: number;
    present: number;
    rate: number;
  };
  materials: {
    id: string;
    title: string;
    file_url: string;
    file_type: "pdf";
    file_size: string;
    created_at: string;
  }[];
}

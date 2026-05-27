export interface FacultySearchStudent {
  id: string;
  student_code: string;
  full_name: string;
  email: string;
  department: string;
  status: string;
}

export interface FacultySearchCourse {
  id: string;
  course_code: string;
  course_name: string;
  enrolled_count: number;
  status: string;
}

export interface FacultySearchResults {
  students: FacultySearchStudent[] | null;
  courses: FacultySearchCourse[] | null;
}
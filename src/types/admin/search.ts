export interface SearchStudent {
  id: string;
  student_code: string;
  full_name: string;
  email: string;
  department: string;
  status: string;
}

export interface SearchFaculty {
  id: string;
  faculty_code: string;
  full_name: string;
  email: string;
  department: string;
  rank: string;
}

export interface SearchCourse {
  id: string;
  course_code: string;
  course_name: string;
  department: string;
  status: string;
}

export interface AdminSearchResults {
  students: SearchStudent[] | null;
  faculty: SearchFaculty[] | null;
  courses: SearchCourse[] | null;
}

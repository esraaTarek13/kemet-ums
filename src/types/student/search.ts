export interface StudentSearchCourse {
  id: string;
  course_code: string;
  course_name: string;
  department: string;
  faculty_name: string;
  room: string;
  schedule: string;
}

export interface StudentSearchFaculty {
  id: string;
  faculty_code: string;
  full_name: string;
  email: string;
  department: string;
  rank: string;
}

export interface StudentSearchResults {
  courses: StudentSearchCourse[] | null;
  faculty: StudentSearchFaculty[] | null;
}

export interface StudentSearchCourse {
  id: string;
  course_code: string;
  course_name: string;
  department: string;
  faculty_name: string;
  room: string;
  schedule: string;
}

export interface StudentSearchResults {
  courses: StudentSearchCourse[] | null;
}
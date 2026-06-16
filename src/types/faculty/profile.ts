export interface FacultyProfileResponse {
  profile: {
    id: string;
    full_name: string;
    email: string;
    phone: string | null;
    nationality: string | null;
    address: string | null;
    avatar_url: string | null;
    created_at: string;
    password_changed_at: string;
  };
  faculty: {
    faculty_code: string;
    department: string;
    rank: string;
    employment_type: string;
    specialization: string;
    publications: number;
    office_location: string;
    join_date: string;
    max_courses: number;
    status: string;
  };
}
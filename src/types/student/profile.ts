export interface StudentProfileResponse {
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
  student: {
    student_code: string;
    department: string;
    academic_year: number;
    date_of_birth: string;
    enrollment_date: string;
    expected_graduation: string;
    max_credits: number;
    transfer_credits: number;
    status: string;
    clearance_status: string;
  };
}
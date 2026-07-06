export interface AdminProfileResponse {
  id: string;
  role: "admin" | "super_admin";
  full_name: string;
  email: string;
  phone: string | null;
  nationality: string | null;
  address: string | null;
  avatar_url: string | null;
  created_at: string;
  password_changed_at: string | null;
}

export interface UpdateAdminProfilePayload {
  full_name?: string;
  phone?: string;
  address?: string;
}

export interface UpdateAdminProfileResponse {
  success: boolean;
}
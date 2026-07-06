export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  role: "admin" | "super_admin";
  created_at: string;
}







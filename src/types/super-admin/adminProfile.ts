export interface AdminProfileDetail {
  id: string;
  admin_code: string;
  full_name: string;
  email: string;
  phone: string | null;
  nationality: string | null;
  address: string | null;
  join_date: string | null;
  status: "active" | "suspended";
  avatar_url: string | null;
}
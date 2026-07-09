export interface AdminsStats {
  total_admins: number;
  active: number;
  suspended: number;
  unspecified: number;
}
export interface AdminUser {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  avatar_url: string | null;
  role: "admin" | "super_admin";
  created_at: string;
}

export type {
  CreateAdminFormValues,
  CreateAdminPayload,
} from "@/validation/createAdmin.schema";





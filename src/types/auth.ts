/** Permission levels across the system. */
export type Role = "super_admin" | "admin" | "faculty" | "student";

/** Roles available on the login form. */
export type LoginRole = "student" | "faculty" | "admin";

/** Core user object. */
export interface User {
  id: string;
  email: string;
  full_name: string;
  role: Role;
  avatar_url?: string;
  phone?: string;
  nationality?: string;
  address?: string;
  created_at?: string;
}

/** Global auth store — state + actions. */
export interface AuthStore {
  user: User | null;
  isLoading: boolean;
  setUser: (user: User | null) => void;
  setLoading: (loading: boolean) => void;
  logout: () => void;
}

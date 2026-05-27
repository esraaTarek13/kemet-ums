// Base route for each user role — append paths as needed (e.g. /profile, /dashboard)
export const ROLE_BASE_ROUTES: Record<string, string> = {
  student: "/student",
  faculty: "/faculty",
  admin: "/admin",
  super_admin: "/super-admin",
};
import { LoginRole } from "@/types";

/** Role options rendered in the login form toggle. */
export const ROLE_BUTTONS: { label: string; value: LoginRole }[] = [
  { label: "Student", value: "student" },
  { label: "Faculty", value: "faculty" },
  { label: "Admin", value: "admin" },
];

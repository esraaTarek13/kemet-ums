import type { CreateAdminPayload } from "@/types";

interface CreateAdminResponse {
  id: string;
  email: string;
  full_name: string;
  admin_code: string;
}

// Create a new admin (auth user + profile + admin row)
export async function createAdmin(
  payload: CreateAdminPayload,
): Promise<CreateAdminResponse> {
  const res = await fetch("/api/super-admin/admins", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Failed to create admin");
  }

  return data.admin;
}

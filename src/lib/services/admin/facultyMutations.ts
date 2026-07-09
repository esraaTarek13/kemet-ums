import type { CreateFacultyPayload } from "@/types";

interface CreateFacultyResponse {
  id: string;
  email: string;
  full_name: string;
  faculty_code: string;
}

// Create a new faculty member (auth user + profile + faculty row)
export async function createFaculty(
  payload: CreateFacultyPayload,
): Promise<CreateFacultyResponse> {
  const res = await fetch("/api/admin/faculty", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Failed to create faculty member");
  }

  return data.faculty;
}

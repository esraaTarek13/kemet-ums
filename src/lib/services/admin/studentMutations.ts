import type { CreateStudentPayload } from "@/types";

interface CreateStudentResponse {
  id: string;
  email: string;
  full_name: string;
  student_code: string;
}

// Create a new student (auth user + profile + student row)
export async function createStudent(
  payload: CreateStudentPayload,
): Promise<CreateStudentResponse> {
  const res = await fetch("/api/admin/students", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error ?? "Failed to create student");
  }

  return data.student;
}
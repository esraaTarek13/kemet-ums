import { z } from "zod";

export const createStudentSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().min(2, "Full name is required"),
  department: z.string().min(1, "Department is required"),
  academic_year: z
    .string()
    .min(1, "Academic year is required")
    .transform((val) => Number(val))
    .pipe(z.number().int().min(1).max(6)),
  phone: z.string().min(1, "Phone number is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().min(1, "Address is required"),
  date_of_birth: z.string().min(1, "Date of birth is required"),
  enrollment_date: z.string().optional(),
  expected_graduation: z.string().optional(),
  max_credits: z
    .string()
    .min(1, "Max credits is required")
    .transform((val) => Number(val))
    .pipe(z.number().int().min(1)),
});

// Input: raw string values as they come from form fields
// Output: coerced/transformed values as sent to the API
export type CreateStudentFormValues = z.input<typeof createStudentSchema>;
export type CreateStudentPayload = z.output<typeof createStudentSchema>;
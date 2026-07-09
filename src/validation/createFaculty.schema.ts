import { z } from "zod";

export const createFacultySchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().min(2, "Full name is required"),
  department: z.string().min(1, "Department is required"),
  phone: z.string().min(1, "Phone number is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().min(1, "Address is required"),
  rank: z.string().min(1, "Rank is required"),
  employment_type: z.string().min(1, "Employment type is required"),
  specialization: z.string().min(1, "Specialization is required"),
  office_location: z.string().min(1, "Office location is required"),
  office_hours: z.string().min(1, "Office hours is required"),
  join_date: z.string().min(1, "Join date is required"),
  max_courses: z
    .string()
    .min(1, "Max courses is required")
    .transform((val) => Number(val))
    .pipe(z.number().int().min(1)),
  publications: z
    .string()
    .min(1, "Publications count is required")
    .transform((val) => Number(val))
    .pipe(z.number().int().min(0)),
});

export type CreateFacultyFormValues = z.input<typeof createFacultySchema>;
export type CreateFacultyPayload = z.output<typeof createFacultySchema>;

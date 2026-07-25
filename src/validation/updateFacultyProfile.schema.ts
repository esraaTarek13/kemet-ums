import { z } from "zod";

export const updateFacultyProfileSchema = z.object({
  phone: z.string().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
  rank: z.string().optional(),
  employment_type: z.string().optional(),
  specialization: z.string().optional(),
  office_location: z.string().optional(),
  publications: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(
      z
        .number({ message: "Publications must be a number" })
        .min(0, "Publications cannot be negative")
        .optional(),
    ),
  status: z.string().optional(),
  office_hours: z.string().min(1, "Office hours is required"),
});

export type UpdateFacultyProfileFormValues = z.input<
  typeof updateFacultyProfileSchema
>;
export type UpdateFacultyProfilePayload = z.output<
  typeof updateFacultyProfileSchema
>;

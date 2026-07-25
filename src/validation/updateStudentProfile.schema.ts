import { z } from "zod";

export const updateStudentProfileSchema = z.object({
  phone: z.string().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
  department: z.string().optional(),
  expected_graduation: z.string().optional(),
  status: z.string().optional(),
});

export type UpdateStudentProfileFormValues = z.input<
  typeof updateStudentProfileSchema
>;
export type UpdateStudentProfilePayload = z.output<
  typeof updateStudentProfileSchema
>;

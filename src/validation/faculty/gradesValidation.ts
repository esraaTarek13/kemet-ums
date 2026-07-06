import { z } from "zod";

const gradeValueSchema = z
  .number({ message: "Must be a number" })
  .min(0, "Grade cannot be less than 0")
  .max(100, "Grade cannot exceed 100")
  .optional();

export const gradesFormSchema = z.object({
  grades: z.record(
    z.string(), // enrollment_id
    z.object({
      quiz: gradeValueSchema,
      midterm: gradeValueSchema,
      final: gradeValueSchema,
    }),
  ),
});

export type GradesFormValues = z.infer<typeof gradesFormSchema>;

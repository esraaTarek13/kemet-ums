import { z } from "zod";

export const getSubmissionGradeSchema = (maxGrade: number) =>
  z.object({
    grade: z
      .number({ message: "Grade must be a number" })
      .min(0, "Grade cannot be negative")
      .max(maxGrade, `Grade cannot exceed ${maxGrade}`),
    feedback: z
      .string()
      .max(1000, "Feedback cannot exceed 1000 characters")
      .optional(),
  });

export type SubmissionGradeFormValues = z.infer<
  ReturnType<typeof getSubmissionGradeSchema>
>;

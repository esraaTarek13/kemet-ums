import { z } from "zod";

export const enrollStudentSchema = z.object({
  offering_ids: z.array(z.string()).min(1, "Please select at least one course"),
});

export type EnrollStudentFormValues = z.input<typeof enrollStudentSchema>;
export type EnrollStudentPayload = z.output<typeof enrollStudentSchema>;

import { z } from "zod";

export const assignCourseSchema = z.object({
  offering_ids: z.array(z.string()).min(1, "Please select at least one course"),
});

export type AssignCourseFormValues = z.input<typeof assignCourseSchema>;
export type AssignCoursePayload = z.output<typeof assignCourseSchema>;

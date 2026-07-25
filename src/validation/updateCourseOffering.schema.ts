import { z } from "zod";

export const updateCourseOfferingSchema = z.object({
  faculty_id: z.string().optional(),
  room: z.string().optional(),
  max_students: z
    .string()
    .optional()
    .transform((val) => (val ? Number(val) : undefined))
    .pipe(
      z
        .number({ message: "Max students must be a number" })
        .positive("Max students must be greater than zero")
        .optional(),
    ),
  status: z.string().optional(),
});

export type UpdateCourseOfferingFormValues = z.input<
  typeof updateCourseOfferingSchema
>;
export type UpdateCourseOfferingPayload = z.output<
  typeof updateCourseOfferingSchema
>;

import { z } from "zod";

export const updateAnnouncementSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title is too long")
    .optional()
    .or(z.literal("")),
  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters")
    .max(2000, "Content is too long")
    .optional()
    .or(z.literal("")),
  audience: z.enum(["all", "students", "faculty"]).optional(),
  priority: z.enum(["normal", "important", "urgent"]).optional(),
  status: z.enum(["active", "scheduled", "expired"]).optional(),
});

export type UpdateAnnouncementFormValues = z.infer<
  typeof updateAnnouncementSchema
>;

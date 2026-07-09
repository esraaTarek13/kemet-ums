import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(150, "Title is too long"),
  content: z
    .string()
    .trim()
    .min(10, "Content must be at least 10 characters")
    .max(2000, "Content is too long"),
  audience: z.enum(["all", "students", "faculty"]).default("all"),
  priority: z.enum(["normal", "important", "urgent"]).default("normal"),
  status: z.enum(["active", "scheduled", "expired"]).default("active"),
});

export type CreateAnnouncementFormValues = z.input<
  typeof createAnnouncementSchema
>;

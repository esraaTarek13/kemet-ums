import { z } from "zod";

export const editProgressSchema = z.object({
  completion_percentage: z
    .number({ message: "Please enter a valid number" })
    .min(0, "Cannot be less than 0")
    .max(100, "Cannot be more than 100"),
});

export type EditProgressFormData = z.infer<typeof editProgressSchema>;
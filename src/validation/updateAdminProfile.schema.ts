import { z } from "zod";

export const updateAdminProfileSchema = z.object({
  full_name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name is too long")
    .optional()
    .or(z.literal("")),
  phone: z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "Invalid phone number")
    .optional()
    .or(z.literal("")),
  address: z
    .string()
    .trim()
    .max(255, "Address is too long")
    .optional()
    .or(z.literal("")),
});

export type UpdateAdminProfileFormValues = z.infer<
  typeof updateAdminProfileSchema
>;

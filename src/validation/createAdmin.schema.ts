import { z } from "zod";

export const createAdminSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  full_name: z.string().min(2, "Full name is required"),
  phone: z.string().optional(),
  nationality: z.string().optional(),
  address: z.string().optional(),
  join_date: z.string().optional(),
});

export type CreateAdminFormValues = z.input<typeof createAdminSchema>;
export type CreateAdminPayload = z.output<typeof createAdminSchema>;

import { z } from "zod";

export const updateAdminByAdminSchema = z.object({
  full_name: z.string().min(2, "Full name is required"),
  phone: z.string().min(1, "Phone number is required"),
  nationality: z.string().min(1, "Nationality is required"),
  address: z.string().min(1, "Address is required"),
  status: z.enum(["active", "suspended"]),
});

export type UpdateAdminByAdminFormValues = z.input<
  typeof updateAdminByAdminSchema
>;
export type UpdateAdminByAdminPayload = z.output<
  typeof updateAdminByAdminSchema
>;

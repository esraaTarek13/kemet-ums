import { z } from "zod";

export const recordPaymentSchema = z.object({
  amount: z
    .string()
    .min(1, "Amount is required")
    .transform((val) => Number(val))
    .pipe(
      z
        .number({ message: "Amount must be a number" })
        .positive("Amount must be greater than zero"),
    ),
  notes: z.string().optional(),
});

export type RecordPaymentFormValues = z.input<typeof recordPaymentSchema>;
export type RecordPaymentPayload = z.output<typeof recordPaymentSchema>;
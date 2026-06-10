import { z } from "zod";

// ─── Login ────────────────────────────────────────────────────────────────────
export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters"),
  role: z.enum(["student", "faculty", "admin"]),
});
export type LoginSchema = z.infer<typeof loginSchema>;

// ─── Forgot Password ──────────────────────────────────────────────────────────
export const forgotPasswordSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email address"),
});
export type ForgotPasswordSchema = z.infer<typeof forgotPasswordSchema>;

// ─── OTP ─────────────────────────────────────────────────────────────────────
export const otpSchema = z.object({
  otp: z.string().length(8, "OTP must be 8 digits"),
});
export type OtpSchema = z.infer<typeof otpSchema>;

// ─── Reset Password ───────────────────────────────────────────────────────────
export const resetPasswordSchema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
export type ResetPasswordSchema = z.infer<typeof resetPasswordSchema>;


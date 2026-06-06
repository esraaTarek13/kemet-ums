"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { ForgotPasswordSchema, OtpSchema } from "@/validation/auth/schema";
import {
  forgotPassword,
  verifyOtp,
} from "@/lib/services/auth/password.service";

export function useForgotPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ForgotPasswordSchema) => forgotPassword(data.email),
    onSuccess: (_, variables) => {
      // Stored for verify-otp and resend steps
      Cookies.set("reset-email", variables.email);
      toast.success("OTP sent to your email!");
      router.replace("/verify-otp");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });
}

export function useVerifyOtp() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: OtpSchema) =>
      verifyOtp(Cookies.get("reset-email") ?? "", data.otp),
    onSuccess: () => {
      Cookies.remove("reset-email");
      // Checked by middleware to allow /reset-password access
      Cookies.set("password-reset-verified", "true");
      toast.success("OTP verified successfully!");
      router.replace("/reset-password");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });
}

// Uses email stored during useForgotPassword
export function useResendOtp() {
  return useMutation({
    mutationFn: () => forgotPassword(Cookies.get("reset-email") ?? ""),
    onSuccess: () => {
      toast.success("OTP resent successfully!");
    },
    onError: (err: Error) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });
}
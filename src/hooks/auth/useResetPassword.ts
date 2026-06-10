"use client";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { ResetPasswordSchema } from "@/validation/auth.schema";
import { resetPassword } from "@/lib/services/auth/password";

export function useResetPassword() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: ResetPasswordSchema) => resetPassword(data.password),

    // Redirect to login after successful reset
    onSuccess: () => {
      Cookies.remove("password-reset-verified");
      toast.success("Password reset successfully!");
      router.replace("/login");
    },

    onError: (err: Error) => {
      toast.error(err?.message ?? "Something went wrong");
    },
  });
}

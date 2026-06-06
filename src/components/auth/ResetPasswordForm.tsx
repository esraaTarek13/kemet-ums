"use client";
import { useForm } from "react-hook-form";
import AuthBtn from "../ui/AuthBtn";
import Input from "../ui/Input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  resetPasswordSchema,
  type ResetPasswordSchema,
} from "@/validation/auth/schema";
import { useResetPassword } from "@/hooks/auth/useResetPassword";

/** Reset password form — validates and submits new password with confirmation. */
export default function ResetPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordSchema>({
    resolver: zodResolver(resetPasswordSchema),
  });
  const { mutate } = useResetPassword();

  return (
    <form
      className="px-8"
      noValidate
      aria-label="Reset password form"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <h3 className="auth-title">Reset Password</h3>
      <p className="auth-subtitle">Please enter your new credentials below.</p>

      <div className="mt-10 space-y-5 lg:space-y-6">
        <Input
          type="password"
          label="New Password"
          placeholder="Enter your new password"
          {...register("password")}
          error={errors.password?.message}
        />
        <Input
          type="password"
          label="Confirm New Password"
          placeholder="Confirm your new password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />
        <AuthBtn content="Update Password" />
      </div>
    </form>
  );
}

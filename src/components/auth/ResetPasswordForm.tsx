"use client";
import AuthBtn from "../ui/shared/AuthBtn";
import Input from "../ui/shared/Input";
import { useResetPasswordForm } from "@/hooks/auth/useResetPasswordForm";

/** Reset password form — validates and submits new password with confirmation. */
export default function ResetPasswordForm() {
  const { register, errors, onSubmit } = useResetPasswordForm();

  return (
    <form
      className="px-8"
      noValidate
      aria-label="Reset password form"
      onSubmit={onSubmit}
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

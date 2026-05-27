"use client";
import Link from "next/link";
import Input from "../ui/Input";
import { FaArrowLeft } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordSchema,
  type ForgotPasswordSchema,
} from "@/validation/auth/schema";
import { useForgotPassword } from "@/hooks/auth/useForgotPassword";
import AuthBtn from "../ui/AuthBtn";

/** Forgot password form — collects email and sends OTP. */
export default function ForgotPasswordForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordSchema>({
    resolver: zodResolver(forgotPasswordSchema),
  });
  const { mutate } = useForgotPassword();

  return (
    <form
      className="px-8"
      noValidate
      aria-label="Forgot password form"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <h3 className="auth-title">Forgot Password</h3>
      <p className="auth-subtitle">
        Enter your credentials to receive a security code.
      </p>

      <div className="mt-10 space-y-5 lg:space-y-6">
        <Input
          type="email"
          label="Enter your Email"
          placeholder="e.g. j.doe@kemet.edu"
          {...register("email")}
          error={errors.email?.message}
        />
        <AuthBtn content="Send OTP" />
      </div>

      {/* Divider & back link */}
      <div className="flex flex-col items-center">
        <div className="h-px w-24 bg-bg-bar mt-10" aria-hidden="true" />
        <Link
          href="/login"
          aria-label="Back to login page"
          className="group flex items-center gap-3 text-accent py-6 transition-all duration-300"
        >
          <FaArrowLeft
            aria-hidden="true"
            className="text-sm md:text-base transition-transform duration-300 group-hover:-translate-x-1"
          />
          <span className="font-bold text-sm md:text-base">Back to Login</span>
        </Link>
      </div>
    </form>
  );
}

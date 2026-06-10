"use client";
import Link from "next/link";
import AuthBtn from "../ui/AuthBtn";
import { FaArrowLeft } from "react-icons/fa";
import { FaArrowRotateRight } from "react-icons/fa6";
import { OTPInput } from "input-otp";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { otpSchema, type OtpSchema } from "@/validation/auth.schema";
import { useResendOtp, useVerifyOtp } from "@/hooks/auth/useForgotPassword";

export default function VerifyOtpForm() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<OtpSchema>({
    resolver: zodResolver(otpSchema),
  });

  const { mutate } = useVerifyOtp();
  const { mutate: resend, isPending: isResending } = useResendOtp();

  return (
    <form
      className="px-8"
      noValidate
      aria-label="OTP verification form"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <h3 className="auth-title">Verify Your Identity</h3>
      <p className="auth-subtitle max-w-80 lg:max-w-100">
        We've sent a 8-digit authentication code to your registered academic
        email.
      </p>

      <div className="mt-10 space-y-5 lg:space-y-6">
        {/* OTP input */}
        <Controller
          name="otp"
          control={control}
          render={({ field }) => (
            <OTPInput
              maxLength={8}
              value={field.value}
              onChange={field.onChange}
              autoFocus
              aria-label="Enter your 8-digit OTP code"
              render={({ slots }) => (
                <div
                  className="flex gap-3 justify-center"
                  role="group"
                  aria-label="OTP digits"
                >
                  {slots.map((slot, i) => (
                    <div
                      key={i}
                      aria-label={`Digit ${i + 1}`}
                      className={`w-6 lg:w-10 h-8 lg:h-14 border bg-bg-input rounded-lg flex items-center justify-center text-text-subtle/80 text-xs md:text-sm lg:text-base ${
                        slot.isActive
                          ? "border-accent ring-1 ring-accent/50 shadow-[0_0_10px_#4a1b26]"
                          : "border-bg-bar"
                      }`}
                    >
                      {slot.char ?? ""}
                    </div>
                  ))}
                </div>
              )}
            />
          )}
        />
        {errors.otp && (
          <p role="alert" className="text-red-500 text-xs">
            {errors.otp.message}
          </p>
        )}

        <AuthBtn content="Verify Code" />
      </div>

      {/* Resend & back link */}
      <div className="flex flex-col items-center">
        <button
          type="button"
          onClick={() => resend()}
          disabled={isResending}
          aria-label={isResending ? "Resending OTP code" : "Resend OTP code"}
          className="group flex items-center gap-3 text-text-secondary mt-10 cursor-pointer disabled:opacity-50"
        >
          <FaArrowRotateRight
            aria-hidden="true"
            className={`text-sm md:text-base transition duration-300 ${isResending ? "animate-spin" : "group-hover:rotate-180"}`}
          />
          <span className="font-medium text-sm md:text-base">
            {isResending ? "Resending..." : "Didn't receive the code? Resend"}
          </span>
        </button>

        <div className="h-px w-24 bg-bg-bar mt-6" aria-hidden="true" />

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

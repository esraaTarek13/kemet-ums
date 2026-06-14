"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { LoginRole } from "@/types/shared/auth";
import AuthBtn from "../ui/AuthBtn";
import Input from "../ui/Input";
import { useState } from "react";
import Link from "next/link";
import { ROLE_BUTTONS } from "@/data/auth";
import { loginSchema, LoginSchema } from "@/validation/auth.schema";
import { useLogin } from "@/hooks/auth/useLogin";

/** Login form with role switcher, email/password fields */
export default function LoginForm() {
  const [selectedRole, setSelectedRole] = useState<LoginRole>("student");

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    defaultValues: { role: "student" },
  });
  const { mutate } = useLogin();

  return (
    <form
      className="px-8"
      noValidate
      aria-label="Login form"
      onSubmit={handleSubmit((data) => mutate(data))}
    >
      <h3 className="auth-title">Welcome Back</h3>
      <p className="auth-subtitle">Please login to access your portal</p>

      {/* Role switcher */}
      <div
        role="group"
        aria-label="Select your role"
        className="bg-bg-input p-1 mt-6 md:mt-8 lg:mt-10 rounded-xl"
      >
        {ROLE_BUTTONS.map((btn) => (
          <button
            key={btn.value}
            type="button"
            aria-pressed={selectedRole === btn.value}
            aria-label={`Login as ${btn.label}`}
            onClick={() => {
              setSelectedRole(btn.value);
              setValue("role", btn.value);
            }}
            className={`${selectedRole === btn.value ? "bg-accent text-text-white" : "bg-bg-input text-text-secondary"} py-2 px-4 md:px-6 rounded-xl font-bold text-xs md:text-sm cursor-pointer`}
          >
            {btn.label}
          </button>
        ))}
      </div>

      <div className="mt-10 space-y-5 lg:space-y-6">
        <Input
          type="email"
          label="Email"
          placeholder="e.g. j.doe@kemet.edu"
          {...register("email")}
          error={errors.email?.message}
        />
        <Input
          type="password"
          label="Password"
          placeholder="Enter your password"
          {...register("password")}
          error={errors.password?.message}
        />

        {/* Remember me & forgot password */}
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-xs md:text-sm text-text-secondary font-medium cursor-pointer">
            <input
              type="checkbox"
              className="outline-accent accent-accent"
            />
            Remember me
          </label>
          <Link
            href="/forgot-password"
            aria-label="Forgot your password?"
            className="font-bold text-accent text-[10px] md:text-xs uppercase"
          >
            Forgot Password?
          </Link>
        </div>

        <AuthBtn content="Login" />
      </div>
    </form>
  );
}

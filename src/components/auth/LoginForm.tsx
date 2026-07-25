"use client";
import AuthBtn from "../ui/shared/AuthBtn";
import Input from "../ui/shared/Input";
import Link from "next/link";
import { ROLE_BUTTONS } from "@/data/shared/auth";
import { useLoginForm } from "@/hooks/auth/useLoginForm";

/** Login form with role switcher, email/password fields */
export default function LoginForm() {
  const { register, errors, selectedRole, selectRole, onSubmit } =
    useLoginForm();

  return (
    <form
      className="px-8"
      noValidate
      aria-label="Login form"
      onSubmit={onSubmit}
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
            onClick={() => selectRole(btn.value)}
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
            <input type="checkbox" className="outline-accent accent-accent" />
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

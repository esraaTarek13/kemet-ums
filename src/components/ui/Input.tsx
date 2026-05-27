"use client";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { forwardRef, useId, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

/** Reusable input with label, error message, and password toggle. */
const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);
    const id = useId();
    const errorId = `${id}-error`;

    const isPassword = props.type === "password";
    const inputType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : props.type;

    return (
      <div className="flex flex-col gap-2 md:gap-3">
        <label
          htmlFor={id}
          className="font-bold text-[10px] md:text-xs text-text-secondary uppercase"
        >
          {label}
        </label>

        <div className="flex justify-between items-center bg-bg-input rounded-lg p-3 md:p-4 text-text-subtle/80 border border-transparent focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/50 focus-within:shadow-[0_0_10px_#4a1b26]">
          <input
            ref={ref}
            id={id}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className="text-xs md:text-sm lg:text-base outline-none bg-transparent"
            {...props}
            type={inputType}
          />

          {/* Password visibility toggle */}
          {isPassword && (
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <FaEyeSlash aria-hidden="true" />
              ) : (
                <FaEye aria-hidden="true" />
              )}
            </button>
          )}
        </div>

        {/* Validation error */}
        {error && (
          <p id={errorId} role="alert" className="text-red-500 text-xs">
            {error}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;

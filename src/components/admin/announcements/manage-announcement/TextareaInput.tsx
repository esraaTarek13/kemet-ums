"use client";
import TextareaAutosize from "react-textarea-autosize";
import { forwardRef, useId } from "react";
import { TextareaAutosizeProps } from "react-textarea-autosize";

interface TextareaInputProps extends TextareaAutosizeProps {
  label: string;
  error?: string;
}

/** Reusable auto-resizing textarea with label and error message. */
const TextareaInput = forwardRef<HTMLTextAreaElement, TextareaInputProps>(
  ({ label, error, id: idProp, ...props }, ref) => {
    // Prefer a caller-provided id (keeps external refs/tests stable),
    // fall back to a generated one so label/error stay linked either way
    const generatedId = useId();
    const id = idProp ?? generatedId;
    const errorId = `${id}-error`;

    return (
      <div className="flex flex-col gap-2 md:gap-3">
        <label
          htmlFor={id}
          className="font-bold text-[10px] md:text-xs text-text-secondary uppercase"
        >
          {label}
        </label>

        <TextareaAutosize
          ref={ref}
          id={id}
          autoComplete="off"
          minRows={1}
          maxRows={4}
          aria-invalid={!!error}
          aria-describedby={error ? errorId : undefined}
          className="w-full inline-block bg-bg-input rounded-lg p-2 md:p-3 text-text-muted text-xs md:text-sm lg:text-base border border-transparent focus-within:border-accent focus-within:ring-1 focus-within:ring-accent/50 focus-within:shadow-[0_0_10px_#4a1b26] outline-none resize-none cursor-auto"
          {...props}
        />

        {error && (
          <p id={errorId} role="alert" className="text-red-500 text-xs">
            {error}
          </p>
        )}
      </div>
    );
  },
);

TextareaInput.displayName = "TextareaInput";
export default TextareaInput;

import { TbFileUpload } from "react-icons/tb";
import { LuFileCheck } from "react-icons/lu";
import {
  FieldValues,
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
  Path,
} from "react-hook-form";

interface FileSubmissionProps<T extends FieldValues> {
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  watch: UseFormWatch<T>;
  isPending: boolean;
  submitLabel?: string;
  isOptional?: boolean;
}

export default function FileSubmission<T extends FieldValues>({
  register,
  errors,
  watch,
  isPending,
  submitLabel = "Submit Assignment",
  isOptional,
}: FileSubmissionProps<T>) {
  const watchedFiles = watch("file" as Path<T>);
  const selectedFile = (watchedFiles as FileList)?.[0];
  const hasError = !!errors.file;

  return (
    <>
      <div className="space-y-2 my-6">
        <p className="text-text-secondary text-xs uppercase">
          file submission{" "}
          {isOptional && <span className="normal-case">(Optional)</span>}
        </p>
        <label
          htmlFor="file"
          className="flex flex-col justify-center items-center gap-4 py-6 md:py-8 lg:py-10 border border-dashed border-[#C4A8824D] cursor-pointer"
        >
          {/* sr-only keeps input focusable/keyboard-accessible, unlike display:none */}
          <input
            type="file"
            id="file"
            accept=".pdf,.doc,.docx"
            disabled={isPending}
            aria-invalid={hasError}
            aria-describedby={hasError ? "file-error" : undefined}
            className="sr-only"
            {...register("file" as Path<T>)}
          />
          <span className="bg-accent/10 py-3 px-3.5 rounded-xl">
            {selectedFile ? (
              <LuFileCheck
                aria-hidden="true"
                className="text-accent text-3xl md:text-5xl shrink-0"
              />
            ) : (
              <TbFileUpload
                aria-hidden="true"
                className="text-accent text-3xl md:text-5xl shrink-0"
              />
            )}
          </span>
          <div>
            {selectedFile ? (
              <p className="text-sm md:text-base lg:text-lg text-primary font-semibold text-center">
                {selectedFile.name}
              </p>
            ) : (
              <>
                <p className="text-sm md:text-base lg:text-lg text-primary font-semibold text-center">
                  Click to upload your file
                </p>
                <p className="text-xs md:text-sm text-text-muted text-center">
                  Accepted formats: PDF, DOC, DOCX
                </p>
              </>
            )}
          </div>
        </label>
        {hasError && (
          <p id="file-error" role="alert" className="text-red-500 text-xs">
            {errors.file?.message as string}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap pt-6 border-t border-border">
        <span className="font-bold text-[10px] md:text-xs text-text-muted uppercase">
          Max File Size: 25MB
        </span>
        <button
          type="submit"
          disabled={isPending}
          className="btn btn-dark disabled:opacity-50 py-2"
        >
          {isPending ? "Submitting..." : submitLabel}
        </button>
      </div>
    </>
  );
}

import { TbFileUpload } from "react-icons/tb";
import { FileSubmissionProps } from "@/types";
import { LuFileCheck } from "react-icons/lu";

export default function FileSubmission({
  register,
  errors,
  watch,
  isPending,
}: FileSubmissionProps) {
  const watchedFiles = watch("file");
  const selectedFile = watchedFiles?.[0];

  return (
    <>
      <div className="space-y-2 my-8">
        <p className="text-text-secondary text-xs uppercase">file submission</p>
        <label
          htmlFor="file"
          className="flex flex-col justify-center items-center gap-4 py-6 md:py-8 lg:py-10 border border-dashed border-[#C4A8824D] cursor-pointer"
        >
          <input
            type="file"
            id="file"
            accept=".pdf,.doc,.docx"
            className="hidden"
            {...register("file")}
          />
          <span className="bg-accent/10 py-3 px-3.5 rounded-xl">
            {selectedFile ? (
              <LuFileCheck className="text-accent text-3xl md:text-5xl shrink-0" />
            ) : (
              <TbFileUpload className="text-accent text-3xl md:text-5xl shrink-0" />
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
        {errors.file && (
          <p role="alert" className="text-red-500 text-xs">
            {errors.file.message as string}
          </p>
        )}
      </div>

      <div className="flex items-center justify-between gap-2 flex-wrap pt-6 border-t border-border text-end">
        <span className="font-bold text-[10px] md:text-xs text-text-muted uppercase">
          Max File Size: 25MB
        </span>
        <button
          type="submit"
          disabled={isPending}
          className="btn-dark bg-accent border border-accent rounded-md font-semibold text-text-white text-sm md:text-base py-2 px-5 md:px-8 cursor-pointer disabled:opacity-50"
        >
          {isPending ? "Submitting..." : "Submit Assignment"}
        </button>
      </div>
    </>
  );
}

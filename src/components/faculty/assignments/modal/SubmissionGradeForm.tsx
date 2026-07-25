import { useAssignmentGradingContext } from "./AssignmentGradingContext";
import { useGradeSubmissionForm } from "@/hooks/faculty/assignments/useGradeSubmissionForm";
import TextareaAutosize from "react-textarea-autosize";
import { MdOutlineGrade, MdOutlineRateReview } from "react-icons/md";

interface SubmissionGradeFormProps {
  submissionId: string;
  grade: number | null;
  feedback: string | null;
  isGraded: boolean;
  onSaved: () => void;
}

export default function SubmissionGradeForm({
  submissionId,
  grade,
  feedback,
  isGraded,
  onSaved,
}: SubmissionGradeFormProps) {
  const { assignmentId, maxGrade } = useAssignmentGradingContext();

  const { register, handleSubmit, errors, isPending, onSubmit } =
    useGradeSubmissionForm({
      assignmentId,
      submissionId,
      maxGrade,
      grade,
      feedback,
      onSaved,
    });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
      <div className="flex flex-col gap-1">
        <label
          htmlFor={`grade-${submissionId}`}
          className="font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider"
        >
          Grade
        </label>
        <div className="flex items-center gap-2 card p-2 md:p-3">
          <MdOutlineGrade
            aria-hidden="true"
            className="text-text-subtle/90 shrink-0 text-lg"
          />
          <input
            id={`grade-${submissionId}`}
            type="number"
            autoComplete="off"
            disabled={isPending}
            placeholder={isGraded ? "Update grade" : `Out of ${maxGrade}`}
            {...register("grade", { valueAsNumber: true })}
            className="w-full text-xs md:text-sm text-text-primary tracking-wider outline-none bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        {errors.grade && (
          <p
            id={`grade-error-${submissionId}`}
            role="alert"
            className="text-xs text-danger mt-1"
          >
            {errors.grade.message}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label
          htmlFor={`feedback-${submissionId}`}
          className="font-bold text-[10px] md:text-xs text-text-secondary uppercase tracking-wider"
        >
          Feedback
        </label>
        <div className="flex gap-2 card p-2 md:p-3">
          <MdOutlineRateReview
            aria-hidden="true"
            className="text-text-subtle/90 shrink-0 text-lg md:mt-1"
          />
          <TextareaAutosize
            id={`feedback-${submissionId}`}
            autoComplete="off"
            disabled={isPending}
            minRows={1}
            maxRows={4}
            placeholder={
              isGraded ? "Update feedback" : "Write feedback for the student"
            }
            {...register("feedback")}
            className="inline-block w-full bg-transparent text-xs md:text-sm text-text-primary tracking-wider outline-none resize-none cursor-auto disabled:opacity-50 disabled:cursor-not-allowed"
          />
        </div>
        {errors.feedback && (
          <p
            id={`feedback-error-${submissionId}`}
            role="alert"
            className="text-xs text-danger mt-1"
          >
            {errors.feedback.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="btn btn-dark py-2 w-full disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Saving..." : isGraded ? "Update" : "Save"}
      </button>
    </form>
  );
}

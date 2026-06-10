import { statusConfig, LABELS } from "@/data/student/assignments";
import { Assignment } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import SubmitModal from "./SubmitModal";
import SubmissionDetailsModal from "./SubmissionDetailsModal";

interface AssignmentItemProps {
  assignment: Assignment;
}

/** Derives submission state flags from the assignment label */
function getAssignmentState(label: string) {
  return {
    isLate: label === LABELS.LATE,
    isSubmitted: label !== LABELS.NOT_SUBMITTED,
  };
}

export default function AssignmentItem({ assignment }: AssignmentItemProps) {
  // Fallback to "pending" if status is unrecognized
  const config = statusConfig[assignment.status] ?? statusConfig["pending"];
  const { icon: Icon, label, textClass, bgClass } = config;
  const { isLate, isSubmitted } = getAssignmentState(label);

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const dueText = `Due ${formatDistanceToNow(new Date(assignment.due_date), {
    addSuffix: true,
  })}`;

  // Accessible button label based on submission state
  const buttonLabel = isLate
    ? `${assignment.title} - submission closed`
    : isSubmitted
      ? `View submission for ${assignment.title}`
      : `Submit ${assignment.title} now`;

  return (
    <li
      role="listitem"
      className="flex flex-col md:flex-row justify-between md:items-center gap-6 bg-bg-card border-t-4 md:border-t-0 md:border-l-4 rounded-lg p-4 md:p-6 border-accent"
    >
      <div className="flex md:items-center gap-4 md:gap-6">
        <div
          aria-hidden="true"
          className={`p-2 rounded-lg h-fit ${isLate ? bgClass : "bg-bg-filter"}`}
        >
          <Icon
            className={`text-2xl shrink-0 ${isLate ? textClass : "text-text-subtle"}`}
          />
        </div>

        <div className="space-y-2">
          <div className="flex flex-col md:flex-row md:items-center gap-2 lg:gap-3">
            <h5
              aria-label={assignment.title}
              title={assignment.title}
              className="text-text-primary font-bold md:text-lg max-w-40 lg:max-w-fit truncate cursor-pointer"
            >
              {assignment.title}
            </h5>
            <span
              className={`w-fit text-[10px] font-bold uppercase rounded-sm px-2 py-0.5 ${textClass} ${bgClass}`}
            >
              {label}
            </span>
          </div>

          <div className="flex items-center gap-2 md:gap-3 flex-wrap">
            <p className="text-accent font-semibold text-xs md:text-sm">
              {assignment.course_code}
            </p>
            <p className="text-xs md:text-sm text-text-secondary">{dueText}</p>
          </div>
        </div>
      </div>

      <button
        type="button"
        disabled={isLate}
        aria-disabled={isLate}
        aria-label={buttonLabel}
        onClick={() =>
          isSubmitted ? setIsDetailsOpen(true) : setIsSubmitOpen(true)
        }
        className={`${
          isLate
            ? "disabled:opacity-50 text-text-primary bg-bg-card"
            : isSubmitted
              ? "text-text-white bg-accent btn-dark"
              : "text-text-primary bg-bg-card btn-light"
        } w-full md:max-w-50 border border-border rounded-lg py-2.5 px-4 md:px-6 font-semibold text-sm md:text-base cursor-pointer`}
      >
        {isLate
          ? "Submission Closed"
          : isSubmitted
            ? "View Submission"
            : "Submit Now"}
      </button>

      <SubmitModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        assignmentId={assignment.assignment_id}
      />
      <SubmissionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        grade={assignment.grade}
        maxGrade={assignment.max_grade}
        submittedAt={assignment.submitted_at}
        feedback={assignment.feedback}
        fileUrl={assignment.file_url}
        fileName={assignment.file_name}
        fileSize={assignment.file_size}
        fileType={assignment.file_type}
      />
    </li>
  );
}

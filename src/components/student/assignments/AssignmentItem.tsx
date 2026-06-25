import { statusConfig } from "@/data/student/assignments";
import * as Tooltip from "@radix-ui/react-tooltip";
import { Assignment } from "@/types";
import { formatDistanceToNow } from "date-fns";
import { useState } from "react";
import SubmitModal from "./modals/SubmitModal";
import SubmissionDetailsModal from "./modals/SubmissionDetailsModal";
import { TbUpload } from "react-icons/tb";
import { FaClipboardCheck } from "react-icons/fa";
import AssignmentDetailsModal from "./modals/AssignmentDetailsModal";

interface AssignmentItemProps {
  assignment: Assignment;
}

function getAssignmentState(assignment: Assignment) {
  return {
    isLate: assignment.status === "overdue",
    isSubmitted:
      assignment.status === "pending" || assignment.status === "graded",
  };
}

export default function AssignmentItem({ assignment }: AssignmentItemProps) {
  const config = statusConfig[assignment.status] ?? statusConfig["pending"];
  const { icon: Icon, label, textClass, bgClass } = config;
  const { isLate, isSubmitted } = getAssignmentState(assignment);

  const [isSubmitOpen, setIsSubmitOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isAssignmentDetailsOpen, setIsAssignmentDetailsOpen] = useState(false);

  const dueText = `Due ${formatDistanceToNow(new Date(assignment.due_date), {
    addSuffix: true,
  })}`;

  const buttonLabel = isLate
    ? `${assignment.title} - submission closed`
    : isSubmitted
      ? `View submission for ${assignment.title}`
      : `Submit ${assignment.title} now`;

  const tooltipText = isLate
    ? "Submission Closed"
    : isSubmitted
      ? "View Submission"
      : "Submit Now";

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

      <div className="flex gap-2 items-stretch">
        <button
          type="button"
          aria-label={`View assignment details for ${assignment.title}`}
          className="btn btn-dark min-w-fit w-full"
          onClick={() => setIsAssignmentDetailsOpen(true)}
        >
          View Assignment
        </button>

        <Tooltip.Root>
          <Tooltip.Trigger asChild>
            <button
              type="button"
              disabled={isLate}
              aria-disabled={isLate}
              aria-label={buttonLabel}
              onClick={() =>
                isSubmitted ? setIsDetailsOpen(true) : setIsSubmitOpen(true)
              }
              className={`btn px-4 text-xl shrink-0 ${
                isLate
                  ? "text-text-primary bg-bg-card cursor-no-drop opacity-50"
                  : isSubmitted
                    ? "btn-dark"
                    : "text-text-primary bg-bg-card btn-light"
              }`}
            >
              {isSubmitted ? <FaClipboardCheck /> : <TbUpload />}
            </button>
          </Tooltip.Trigger>
          <Tooltip.Portal>
            <Tooltip.Content
              className="bg-bg-card text-text-primary text-xs font-semibold px-3 py-1.5 rounded-md border border-border shadow-md z-50"
              sideOffset={6}
            >
              {tooltipText}
              <Tooltip.Arrow className="fill-border" />
            </Tooltip.Content>
          </Tooltip.Portal>
        </Tooltip.Root>
      </div>

      <AssignmentDetailsModal
        isOpen={isAssignmentDetailsOpen}
        onClose={() => setIsAssignmentDetailsOpen(false)}
        assignment={assignment}
      />
      <SubmitModal
        isOpen={isSubmitOpen}
        onClose={() => setIsSubmitOpen(false)}
        assignmentId={assignment.assignment_id}
      />
      <SubmissionDetailsModal
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onResubmit={() => {
          setIsDetailsOpen(false);
          setIsSubmitOpen(true);
        }}
        assignment={assignment}
      />
    </li>
  );
}

import * as Tooltip from "@radix-ui/react-tooltip";
import { Assignment } from "@/types";
import { TbUpload } from "react-icons/tb";
import { FaClipboardCheck } from "react-icons/fa";
import SubmitModal from "./modals/SubmitModal";
import SubmissionDetailsModal from "./modals/SubmissionDetailsModal";
import AssignmentDetailsModal from "./modals/AssignmentDetailsModal";
import { useAssignmentItem } from "@/hooks/student/assignment/useAssignmentItem";

interface AssignmentItemProps {
  assignment: Assignment;
}

export default function AssignmentItem({ assignment }: AssignmentItemProps) {
  const {
    config,
    isLate,
    isSubmitted,
    dueText,
    buttonLabel,
    tooltipText,
    isSubmitOpen,
    isDetailsOpen,
    isAssignmentDetailsOpen,
    setIsSubmitOpen,
    setIsDetailsOpen,
    setIsAssignmentDetailsOpen,
    handleActionClick,
    handleResubmit,
  } = useAssignmentItem({ assignment });

  const { icon: Icon, label, textClass, bgClass } = config;

  return (
    <li
      role="listitem"
      className="flex flex-col md:flex-row justify-between md:items-center gap-6 card-top-border md:border-t-0 md:border-l-4 border-accent"
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
              onClick={handleActionClick}
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
        onResubmit={handleResubmit}
        assignment={assignment}
      />
    </li>
  );
}

import { useState } from "react";
import { statusConfig } from "@/data/student/assignments";
import { Assignment } from "@/types";
import { formatDistanceToNow } from "date-fns";

interface UseAssignmentItemParams {
  assignment: Assignment;
}

export function useAssignmentItem({ assignment }: UseAssignmentItemParams) {
  const config = statusConfig[assignment.status] ?? statusConfig["pending"];

  const isLate = assignment.status === "overdue";
  const isSubmitted =
    assignment.status === "pending" || assignment.status === "graded";

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

  function handleActionClick() {
    if (isSubmitted) setIsDetailsOpen(true);
    else setIsSubmitOpen(true);
  }

  function handleResubmit() {
    setIsDetailsOpen(false);
    setIsSubmitOpen(true);
  }

  return {
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
  };
}

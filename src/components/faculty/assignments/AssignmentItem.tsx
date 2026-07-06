import StatusBadge, { BadgeStatus } from "@/components/ui/shared/StatusBadge";
import { FacultyAssignmentFull } from "@/types";
import { format } from "date-fns";
import { useState } from "react";
import { LuUsers } from "react-icons/lu";
import { MdDateRange, MdOutlineTaskAlt } from "react-icons/md";
import { PiClipboardText } from "react-icons/pi";
import { AssignmentGradingProvider } from "./modal/AssignmentGradingContext";
import GradeSubmissionsModal from "./modal/GradeSubmissionsModal";

interface AssignmentItemProps {
  assignment: FacultyAssignmentFull;
}

export default function AssignmentItem({ assignment }: AssignmentItemProps) {
  const [isGradeModalOpen, setIsGradeModalOpen] = useState(false);

  return (
    <li className="card-top-border lg:border-t-0 lg:border-l-4 border-accent flex flex-col lg:flex-row lg:items-center justify-between gap-5">
      <div className="flex gap-4 md:gap-6">
        <div
          aria-hidden="true"
          className="bg-pending/5 p-2 rounded-lg border border-pending/15 h-fit mt-2"
        >
          <PiClipboardText className="text-pending text-xl md:text-2xl lg:text-3xl shrink-0 " />
        </div>

        <div className="space-y-1">
          <div className="flex flex-col md:flex-row md:items-center gap-2 lg:gap-3">
            <h5
              title={assignment.title}
              className="text-text-primary font-bold md:text-lg line-clamp-1"
            >
              {assignment.title}
            </h5>
            <p className="flex items-center gap-1">
              <span className="w-fit flex items-center justify-center px-3 py-1 bg-accent/10 rounded-lg text-accent text-[10px] md:text-xs font-bold uppercase">
                {assignment.course_code}
              </span>
              <StatusBadge status={assignment.status as BadgeStatus} />
            </p>
          </div>

          <p className="text-sm md:text-base text-text-muted line-clamp-1">
            {assignment.description}
          </p>

          <div className="flex gap-2 md:gap-4 items-center flex-wrap mt-2">
            <p className="flex items-center gap-1.5 text-text-subtle text-xs md:text-sm">
              <MdDateRange aria-hidden="true" className="shrink-0" />
              <span>
                due {format(new Date(assignment.due_date), "MMM dd - yyyy")}
              </span>
            </p>

            <div
              aria-hidden="true"
              className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
            />

            <p className="flex items-center gap-1.5 text-text-subtle text-xs md:text-sm">
              <LuUsers aria-hidden="true" className="shrink-0" />
              <span>{assignment.total_students || 0} Students</span>
            </p>

            <div
              aria-hidden="true"
              className="h-1.5 w-1.5 bg-text-secondary/50 rounded-full"
            />

            <p className="flex items-center gap-1.5 text-text-subtle text-xs md:text-sm">
              <MdOutlineTaskAlt aria-hidden="true" className="shrink-0" />
              <span>{assignment.submission_count || 0} submissions</span>
            </p>
          </div>
        </div>
      </div>

      <button
        type="button"
        onClick={() => setIsGradeModalOpen(true)}
        aria-label={`Grade submissions for ${assignment.title}`}
        className="btn btn-dark py-2 min-w-fit w-full lg:w-fit"
      >
        Grade submissions
      </button>

      {isGradeModalOpen && (
        <AssignmentGradingProvider
          assignmentId={assignment.assignment_id}
          maxGrade={assignment.max_grade}
        >
          <GradeSubmissionsModal
            title={assignment.title}
            isOpen={isGradeModalOpen}
            onClose={() => setIsGradeModalOpen(false)}
          />
        </AssignmentGradingProvider>
      )}
    </li>
  );
}

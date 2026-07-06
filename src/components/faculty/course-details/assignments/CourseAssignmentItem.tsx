"use client";
import { CourseAssignment } from "@/types";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { FaRegFileAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  MdOutlineDateRange,
  MdOutlineEdit,
  MdOutlineFileUpload,
} from "react-icons/md";
import { TbClipboardCheck } from "react-icons/tb";
import EditAssignmentModal from "./EditAssignmentModal";
import * as Tooltip from "@radix-ui/react-tooltip";

interface CourseAssignmentItemProps {
  assignment: CourseAssignment;
  onDelete: () => void;
}

// Parses the date as UTC and formats it without converting to local time,
// so a due date set as "Aug 5" always displays as "Aug 5" regardless of
// the viewer's timezone.
function formatDueDate(dateString: string) {
  const date = parseISO(dateString);
  const utcDate = new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
  );
  return format(utcDate, "MMM d, yyyy");
}

export default function CourseAssignmentItem({
  assignment,
  onDelete,
}: CourseAssignmentItemProps) {
  const [editAssignmentOpen, setEditAssignmentOpen] = useState(false);
  const isLocked = assignment.graded_count > 0;
  return (
    <li className="bg-bg-navbar rounded-sm p-2.5 md:p-4">
      <div className="flex gap-4 justify-between sm:items-center">
        <div className="flex gap-4">
          <div className="h-fit bg-bg-subtle border border-primary/10 rounded-sm p-1.5 md:p-3.5 mt-1">
            <FaRegFileAlt
              aria-hidden="true"
              className="text-primary/50 text-xl md:text-4xl shrink-0"
            />
          </div>
          <div>
            <h6 className="text-text-primary font-bold text-sm sm:text-base md:text-lg line-clamp-1">
              {assignment.title}
            </h6>
            <p className="text-text-muted text-xs md:text-sm line-clamp-2">
              {assignment.description}
            </p>
          </div>
        </div>

        <Tooltip.Provider delayDuration={200}>
          <div className="flex flex-col sm:flex-row items-center gap-2 md:gap-4">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  disabled={isLocked}
                  onClick={() => !isLocked && setEditAssignmentOpen(true)}
                  aria-label={`Edit ${assignment.title}`}
                  className="bg-text-secondary/20 p-1.5 md:p-2 rounded-sm cursor-pointer self-end sm:self-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <MdOutlineEdit
                    aria-hidden="true"
                    className="text-text-secondary text-lg md:text-2xl shrink-0"
                  />
                </button>
              </Tooltip.Trigger>
              {isLocked && (
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-bg-card border border-border text-accent text-xs px-3 py-1.5 rounded-md shadow-md max-w-50 text-center"
                    sideOffset={5}
                  >
                    Can&apos;t edit: some submissions are already graded
                    <Tooltip.Arrow className="fill-border" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>

            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button
                  type="button"
                  disabled={isLocked}
                  onClick={() => !isLocked && onDelete()}
                  aria-label={`Delete ${assignment.title}`}
                  className="bg-danger-bg p-1.5 md:p-2 rounded-sm cursor-pointer self-end sm:self-center disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  <FaRegTrashCan
                    aria-hidden="true"
                    className="text-danger text-lg md:text-2xl shrink-0"
                  />
                </button>
              </Tooltip.Trigger>
              {isLocked && (
                <Tooltip.Portal>
                  <Tooltip.Content
                    className="bg-bg-card border border-border text-accent text-xs px-3 py-1.5 rounded-md shadow-md max-w-50 text-center"
                    sideOffset={5}
                  >
                    Can&apos;t delete: some submissions are already graded
                    <Tooltip.Arrow className="fill-border" />
                  </Tooltip.Content>
                </Tooltip.Portal>
              )}
            </Tooltip.Root>
          </div>
        </Tooltip.Provider>
      </div>

      <div className="flex gap-2 md:gap-3 flex-wrap mt-3">
        <p className="flex gap-1 items-center text-text-secondary/80 text-xs md:text-sm">
          <MdOutlineDateRange aria-hidden="true" />
          <span>Due {formatDueDate(assignment.due_date)}</span>
        </p>
        <p className="flex gap-1 items-center text-text-secondary/80 text-xs md:text-sm">
          <MdOutlineFileUpload aria-hidden="true" />
          <span>{assignment.submission_count} submissions</span>
        </p>
        <p className="flex gap-1 items-center text-text-secondary/80 text-xs md:text-sm">
          <TbClipboardCheck aria-hidden="true" />
          <span>{assignment.graded_count} graded</span>
        </p>
        <p className="bg-success-bg text-success text-xs rounded-full px-2 min-w-fit">
          <span className="sr-only">Max grade:</span>
          {assignment.max_grade} pts
        </p>
      </div>

      <EditAssignmentModal
        assignment={assignment}
        isOpen={editAssignmentOpen}
        onClose={() => setEditAssignmentOpen(false)}
      />
    </li>
  );
}

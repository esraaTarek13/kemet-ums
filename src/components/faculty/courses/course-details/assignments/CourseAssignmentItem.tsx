"use client";
import { FacultyAssignment } from "@/types";
import { format, parseISO } from "date-fns";
import { FaRegFileAlt } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";
import {
  MdOutlineDateRange,
  MdOutlineEdit,
  MdOutlineFileUpload,
} from "react-icons/md";
import { TbClipboardCheck } from "react-icons/tb";

interface CourseAssignmentItemProps {
  assignment: FacultyAssignment;
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
  return (
    <li className="bg-bg-navbar rounded-sm p-2.5 md:p-4">
      <div className="flex gap-2 justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="bg-bg-subtle border border-primary/10 rounded-sm p-1.5 md:p-3.5">
            <FaRegFileAlt
              aria-hidden="true"
              className="text-primary/50 text-xl md:text-4xl shrink-0"
            />
          </div>
          <div>
            <h6 className="text-text-primary font-bold text-sm sm:text-base md:text-lg">
              {assignment.title}
            </h6>
            <p className="text-text-muted text-xs md:text-sm w-25 md:w-60 lg:w-100 truncate">
              {assignment.description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <button
            type="button"
            className="bg-text-secondary/20 p-2 rounded-sm cursor-pointer self-end sm:self-center"
          >
            <MdOutlineEdit
              aria-hidden="true"
              className="text-text-secondary text-xl md:text-2xl shrink-0"
            />
          </button>
          
          <button
            type="button"
            onClick={onDelete}
            aria-label={`Delete ${assignment.title}`}
            className="bg-danger-bg p-2 rounded-sm cursor-pointer self-end sm:self-center"
          >
            <FaRegTrashCan
              aria-hidden="true"
              className="text-danger text-xl md:text-2xl shrink-0"
            />
          </button>
        </div>
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
    </li>
  );
}

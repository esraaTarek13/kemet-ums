import { AssignmentSubmission } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import SubmissionGradeForm from "./SubmissionGradeForm";

interface StudentSubmissionItemProps {
  student: AssignmentSubmission;
}
export default function StudentSubmissionItem({
  student,
}: StudentSubmissionItemProps) {
  const [isInputsOpen, setIsInputOpen] = useState(false);
  const isGraded = student.grade !== null && student.grade !== undefined;

  return (
    <li className="bg-pending/5 px-4 py-2 rounded-xl">
      <button
        type="button"
        onClick={() => setIsInputOpen(!isInputsOpen)}
        aria-expanded={isInputsOpen}
        aria-controls={`submission-form-${student.submission_id}`}
        className="w-full flex justify-between items-center cursor-pointer text-left"
      >
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0 overflow-hidden">
            {student.avatar_url ? (
              <Image
                src={student.avatar_url}
                alt=""
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-sm font-medium text-accent"
                aria-hidden="true"
              >
                {student.full_name.charAt(0)}
              </span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex gap-3 items-center">
              <p className="text-sm font-medium truncate">
                {student.full_name}
              </p>
              <span
                className={
                  isGraded
                    ? "text-success text-[10px] md:text-xs font-medium"
                    : "text-pending text-[10px] md:text-xs font-medium"
                }
              >
                {isGraded ? "Graded" : "Pending"}
              </span>
            </div>
            <p className="text-[10px] md:text-xs text-text-secondary capitalize">
              {student.student_code}
            </p>
          </div>
        </div>

        <span
          className="text-text-secondary text-base md:text-lg shrink-0"
          aria-hidden="true"
        >
          {isInputsOpen ? <IoIosArrowDown /> : <IoIosArrowForward />}
        </span>
      </button>

      {isInputsOpen && (
        <div
          id={`submission-form-${student.submission_id}`}
          className="pt-3 mt-3 border-t border-border"
        >
          <SubmissionGradeForm
            submissionId={student.submission_id}
            grade={student.grade}
            feedback={student.feedback}
            isGraded={isGraded}
            onSaved={() => setIsInputOpen(false)}
          />
        </div>
      )}
    </li>
  );
}

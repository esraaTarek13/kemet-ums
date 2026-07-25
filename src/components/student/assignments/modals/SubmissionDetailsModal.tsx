import * as Dialog from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { IoClose } from "react-icons/io5";
import { TfiMedall } from "react-icons/tfi";
import { Material, SubmissionDetailsModalProps } from "@/types";
import { getGradeRank } from "@/lib/utils/shared/getGradeRank";
import CourseMaterialItem from "@/components/ui/shared/CourseMaterialItem";

export default function SubmissionDetailsModal({
  isOpen,
  onClose,
  onResubmit,
  assignment,
}: SubmissionDetailsModalProps) {
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />

        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Dialog.Title className="title">Submission Details</Dialog.Title>
            <Dialog.Close asChild>
              <button
                type="button"
                aria-label="Close modal"
                className="text-text-subtle text-2xl cursor-pointer"
              >
                <IoClose aria-hidden="true" />
              </button>
            </Dialog.Close>
          </div>

          {/* Grade summary — rank derived client-side from grade/maxGrade */}
          <div className="text-center py-4 md:py-6 space-y-1">
            <h4 className="text-text-primary text-lg md:text-xl">
              {assignment.grade ?? 0}/{assignment.max_grade ?? 0} points
            </h4>
            <p className="text-text-secondary text-sm">
              {getGradeRank(assignment.grade, assignment.max_grade)}
            </p>
          </div>

          {/* Decorative divider */}
          <div className="flex items-center gap-3">
            <hr className="flex-1 border-border" />
            <TfiMedall className="text-border text-lg shrink-0" />
            <hr className="flex-1 border-border" />
          </div>

          {/* Instructor feedback */}
          <article className="bg-bg-navbar border border-[#C4A8821A] rounded-lg p-4 md:p-5 space-y-3 my-4 md:my-6">
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <p className="text-text-secondary text-xs uppercase">
                instructor feedback
              </p>
              <p className="text-text-subtle text-xs">
                {assignment.submitted_at
                  ? format(new Date(assignment.submitted_at), "MMM dd, yyyy")
                  : "—"}
              </p>
            </div>
            <p className="text-text-primary text-sm">
              {assignment.feedback ?? "No feedback provided yet."}
            </p>
          </article>

          {/* Submitted file */}
          {assignment.sub_file_url && (
            <>
              <CourseMaterialItem
                material={{
                  id: "submission",
                  title: assignment.sub_file_name ?? "Submission",
                  file_url: assignment.sub_file_url,
                  file_type: (assignment.sub_file_type ??
                    "pdf") as Material["file_type"],
                  file_size: assignment.sub_file_size ?? "",
                  created_at: assignment.submitted_at ?? "",
                }}
              />
              {new Date(assignment.due_date) > new Date() && (
                <button
                  type="button"
                  aria-label={`Re-submit ${assignment.title}`}
                  onClick={onResubmit}
                  className="btn btn-dark w-full mt-3"
                >
                  Re-submit
                </button>
              )}
            </>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

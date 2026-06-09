import * as Dialog from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { IoClose } from "react-icons/io5";
import { TfiMedall } from "react-icons/tfi";
import CourseMaterialsList from "../shared/CourseMaterialsList";
import { Material, SubmissionDetailsModalProps } from "@/types";
import { getGradeRank } from "@/utils/getGradeRank";

export default function SubmissionDetailsModal({
  isOpen,
  onClose,
  grade,
  maxGrade,
  submittedAt,
  feedback,
  fileUrl,
  fileName,
  fileSize,
  fileType,
}: SubmissionDetailsModalProps) {
  // Normalize submission file into Material shape for reuse with CourseMaterialsList
  const submissionFile: Material[] = fileUrl
    ? [
        {
          id: "submission",
          title: fileName ?? "Submission",
          file_url: fileUrl,
          file_type: (fileType ?? "pdf") as Material["file_type"],
          file_size: fileSize ?? "",
          created_at: submittedAt ?? "",
        },
      ]
    : [];

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />

        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-full max-w-lg"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Dialog.Title className="title">Submission Details</Dialog.Title>
            {/* Dialog.Close handles closing + accessibility — no need for manual onClick */}
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
              {grade ?? 0}/{maxGrade ?? 0} points
            </h4>
            <p className="text-text-secondary text-sm">
              {getGradeRank(grade, maxGrade)}
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
                {submittedAt
                  ? format(new Date(submittedAt), "MMM dd, yyyy")
                  : "—"}
              </p>
            </div>
            <p className="text-text-primary text-sm">{feedback ?? "No feedback provided yet."}</p>
          </article>

          {/* Submitted file — empty state handled inside CourseMaterialsList */}
          <CourseMaterialsList materials={submissionFile} />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

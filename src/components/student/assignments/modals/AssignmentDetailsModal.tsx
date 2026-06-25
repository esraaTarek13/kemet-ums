import CourseMaterialItem from "@/components/ui/shared/CourseMaterialItem";
import { AssignmentDetailsModalProps, Material } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import { format } from "date-fns";
import { IoClose } from "react-icons/io5";

export default function AssignmentDetailsModal({
  isOpen,
  onClose,
  assignment,
}: AssignmentDetailsModalProps) {
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
            <Dialog.Title className="title">Assignment Details</Dialog.Title>
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

          {/* Meta info */}
          <div className="grid grid-cols-2 gap-3 my-4 md:my-6">
            <div className="bg-bg-filter rounded-lg p-3">
              <p className="text-text-secondary text-xs uppercase mb-1">
                Course
              </p>
              <p className="text-text-primary text-sm font-semibold">
                {assignment.course_code}
              </p>
            </div>
            <div className="bg-bg-filter rounded-lg p-3">
              <p className="text-text-secondary text-xs uppercase mb-1">
                Max Grade
              </p>
              <p className="text-text-primary text-sm font-semibold">
                {assignment.max_grade} pts
              </p>
            </div>
          </div>

          {/* Instructions */}
          {assignment.description && (
            <article className="bg-bg-navbar border border-[#C4A8821A] rounded-lg p-4 md:p-5 space-y-3 my-4 md:my-6">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <p className="text-text-secondary text-xs uppercase">
                  instructions
                </p>
                <p className="text-text-subtle text-xs">
                  Due{" "}
                  {assignment.due_date
                    ? format(new Date(assignment.due_date), "MMM dd")
                    : "—"}
                </p>
              </div>
              <p className="text-text-primary text-sm">
                {assignment.description ?? "No instructions provided."}
              </p>
            </article>
          )}

          {/* Attached File */}
          {assignment.file_url && (
            <CourseMaterialItem
              material={{
                id: assignment.assignment_id,
                title: assignment.file_name ?? "Assignment",
                file_url: assignment.file_url,
                file_type: (assignment.file_type ??
                  "pdf") as Material["file_type"],
                file_size: assignment.file_size ?? "",
                created_at: "",
              }}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { useAssignmentGradingContext } from "./AssignmentGradingContext";
import StudentSubmissionItem from "./StudentSubmissionItem";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import MiniCardSkeleton from "@/components/ui/skeletons/MiniCardSkeleton";
import { useAssignmentSubmissions } from "@/hooks/faculty/assignments/queries/useAssignmentSubmissions";

interface GradeSubmissionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export default function GradeSubmissionsModal({
  isOpen,
  onClose,
  title,
}: GradeSubmissionsModalProps) {
  const { assignmentId } = useAssignmentGradingContext();
  const {
    data: students,
    isPending,
    isError,
  } = useAssignmentSubmissions(assignmentId);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />

        <Dialog.Content
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-5 border-b border-border shrink-0">
            <Dialog.Title className="title">Grade submissions</Dialog.Title>
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

          <div className="my-4 md:my-5 space-y-3 md:space-y-4 overflow-y-auto flex-1 min-h-0 pr-1">
            <h5 className="title text-text-primary">{title}</h5>

            {isPending ? (
              <MiniCardSkeleton />
            ) : isError ? (
              <ErrorMessage content="Failed to load submissions." />
            ) : students?.length === 0 ? (
              <p
                role="status"
                aria-live="polite"
                className="text-text-muted text-xs md:text-sm col-span-full text-center py-10"
              >
                No students have submitted this assignment yet.
              </p>
            ) : (
              <ul className="space-y-2 md:space-y-3">
                {students?.map((student) => (
                  <StudentSubmissionItem
                    key={student.student_id}
                    student={student}
                  />
                ))}
              </ul>
            )}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

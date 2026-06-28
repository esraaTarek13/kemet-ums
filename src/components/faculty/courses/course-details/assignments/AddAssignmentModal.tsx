import { memo } from "react";
import { useAddAssignmentForm } from "../../../../../hooks/faculty/useAddAssignmentForm";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import TextareaAutosize from "react-textarea-autosize";

interface AddAssignmentModalProps {
  offeringId: string;
  isOpen: boolean;
  onClose: () => void;
}

// Memoized to avoid re-renders when parent state changes unrelated to this modal
const AddAssignmentModal = memo(function AddAssignmentModal({
  offeringId,
  isOpen,
  onClose,
}: AddAssignmentModalProps) {
  const { register, handleSubmit, errors, isPending, onSubmit, handleClose } =
    useAddAssignmentForm(offeringId, onClose);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg"
        >
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Dialog.Title className="title">Add New Assignment</Dialog.Title>
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

          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="my-6 space-y-3">
              <div className="space-y-2">
                <label
                  htmlFor="addAssignmentTitle"
                  className="text-text-secondary text-xs uppercase"
                >
                  Title
                </label>
                <input
                  type="text"
                  id="addAssignmentTitle"
                  disabled={isPending}
                  autoComplete="off"
                  placeholder="e.g. Midterm Essay"
                  aria-invalid={!!errors.title}
                  aria-describedby={
                    errors.title ? "addAssignmentTitle-error" : undefined
                  }
                  {...register("title")}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
                />
                {errors.title && (
                  <p
                    id="addAssignmentTitle-error"
                    role="alert"
                    className="text-red-500 text-xs"
                  >
                    {errors.title.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="addAssignmentDescription"
                  className="text-text-secondary text-xs uppercase"
                >
                  Description
                </label>
                <TextareaAutosize
                  minRows={1}
                  maxRows={4}
                  id="addAssignmentDescription"
                  disabled={isPending}
                  autoComplete="off"
                  placeholder="e.g. Write a 5-page essay on..."
                  aria-invalid={!!errors.description}
                  aria-describedby={
                    errors.description
                      ? "addAssignmentDescription-error"
                      : undefined
                  }
                  {...register("description")}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-none cursor-auto"
                />
                {errors.description && (
                  <p
                    id="addAssignmentDescription-error"
                    role="alert"
                    className="text-red-500 text-xs"
                  >
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="addAssignmentDueDate"
                  className="text-text-secondary text-xs uppercase"
                >
                  Due Date
                </label>
                <input
                  type="date"
                  id="addAssignmentDueDate"
                  disabled={isPending}
                  autoComplete="off"
                  aria-invalid={!!errors.dueDate}
                  aria-describedby={
                    errors.dueDate ? "addAssignmentDueDate-error" : undefined
                  }
                  {...register("dueDate")}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
                />
                {errors.dueDate && (
                  <p
                    id="addAssignmentDueDate-error"
                    role="alert"
                    className="text-red-500 text-xs"
                  >
                    {errors.dueDate.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="addAssignmentMaxGrade"
                  className="text-text-secondary text-xs uppercase"
                >
                  Max Grade
                </label>
                <input
                  type="number"
                  id="addAssignmentMaxGrade"
                  disabled={isPending}
                  placeholder="e.g. 100"
                  autoComplete="off"
                  aria-invalid={!!errors.maxGrade}
                  aria-describedby={
                    errors.maxGrade ? "addAssignmentMaxGrade-error" : undefined
                  }
                  {...register("maxGrade", { valueAsNumber: true })}
                  className="w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
                />
                {errors.maxGrade && (
                  <p
                    id="addAssignmentMaxGrade-error"
                    role="alert"
                    className="text-red-500 text-xs"
                  >
                    {errors.maxGrade.message}
                  </p>
                )}
              </div>
            </div>

            <div className="pt-6 border-t border-border text-end">
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-dark disabled:opacity-50 py-2"
              >
                {isPending ? "Adding..." : "Add Assignment"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default AddAssignmentModal;

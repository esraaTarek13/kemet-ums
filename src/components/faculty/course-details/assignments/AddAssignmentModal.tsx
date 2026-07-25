import { memo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import AssignmentFields from "./AssignmentFields";
import FileSubmission from "@/components/ui/shared/FileSubmission";
import { useAddAssignmentForm } from "@/hooks/faculty/assignments/useAddAssignmentForm";

interface AddAssignmentModalProps {
  offeringId: string;
  isOpen: boolean;
  onClose: () => void;
}

const AddAssignmentModal = memo(function AddAssignmentModal({
  offeringId,
  isOpen,
  onClose,
}: AddAssignmentModalProps) {
  const {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    handleClose,
    watch,
  } = useAddAssignmentForm(offeringId, onClose);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg max-h-[90vh] flex flex-col"
        >
          <div className="flex items-center justify-between pb-5 border-b border-border shrink-0">
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

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="my-6 space-y-3 overflow-y-auto flex-1 pr-1">
              <AssignmentFields
                register={register}
                errors={errors}
                isPending={isPending}
                
              />

              <FileSubmission
                register={register}
                errors={errors}
                watch={watch}
                isPending={isPending}
                submitLabel="Add Assignment"
                isOptional={true}
              />
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default AddAssignmentModal;

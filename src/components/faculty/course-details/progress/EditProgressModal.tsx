import { memo } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import Input from "@/components/ui/shared/Input";
import { useEditProgressForm } from "@/hooks/faculty/courses/useEditProgressForm";

interface EditProgressModalProps {
  offeringId: string;
  isOpen: boolean;
  onClose: () => void;
}

const EditProgressModal = memo(function EditProgressModal({
  offeringId,
  isOpen,
  onClose,
}: EditProgressModalProps) {
  const { register, handleSubmit, errors, isPending, onSubmit, handleClose } =
    useEditProgressForm(offeringId, onClose);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg"
        >
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Dialog.Title className="title">
              Edit Course Completion
            </Dialog.Title>
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
            <div className="my-6">
              <Input
                type="number"
                label="Completion Percentage"
                placeholder="0 - 100"
                autoComplete="off"
                autoFocus
                disabled={isPending}
                error={errors.completion_percentage?.message}
                {...register("completion_percentage", {
                  valueAsNumber: true,
                })}
              />
            </div>

            <div className="pt-6 border-t border-border text-end">
              <button
                type="submit"
                disabled={isPending}
                className="btn btn-dark disabled:opacity-50 py-2"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default EditProgressModal;

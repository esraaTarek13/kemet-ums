import { memo } from "react";
import Input from "@/components/ui/shared/Input";
import FileSubmission from "@/components/ui/shared/FileSubmission";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { useAddMaterialForm } from "@/hooks/faculty/courses/useAddMaterialForm";

interface AddMaterialsModalProps {
  offeringId: string;
  isOpen: boolean;
  onClose: () => void;
}

const AddMaterialsModal = memo(function AddMaterialsModal({
  offeringId,
  isOpen,
  onClose,
}: AddMaterialsModalProps) {
  const {
    register,
    handleSubmit,
    watch,
    errors,
    isPending,
    onSubmit,
    handleClose,
  } = useAddMaterialForm(offeringId, onClose);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg"
        >
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Dialog.Title className="title">Add New Material</Dialog.Title>
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
            {/* Title field — specific to materials, not part of the shared FileSubmission component */}
            <div className="mt-6">
              <Input
                type="text"
                label="Material Title"
                placeholder="e.g. Week 1 — Syllabus"
                disabled={isPending}
                autoComplete="off"
                error={errors.title?.message}
                {...register("title")}
              />
            </div>

            <FileSubmission
              register={register}
              errors={errors}
              watch={watch}
              isPending={isPending}
              submitLabel="Add Material"
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
});

export default AddMaterialsModal;

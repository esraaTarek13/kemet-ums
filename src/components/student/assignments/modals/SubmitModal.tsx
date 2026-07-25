"use client";

import FileSubmission from "@/components/ui/shared/FileSubmission";
import { SubmitModalProps } from "@/types";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { useSubmitModalForm } from "@/hooks/student/assignment/useSubmitModalForm";

export default function SubmitModal({
  isOpen,
  onClose,
  assignmentId,
}: SubmitModalProps) {
  const { register, errors, watch, isPending, onSubmit, handleClose } =
    useSubmitModalForm({ assignmentId, onSuccess: onClose });

  return (
    <Dialog.Root
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) handleClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg"
        >
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Dialog.Title className="title">Submit Assignment</Dialog.Title>
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

          <form onSubmit={onSubmit} noValidate>
            <FileSubmission
              register={register}
              errors={errors}
              watch={watch}
              isPending={isPending}
            />
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { CiEdit } from "react-icons/ci";
import { IoClose } from "react-icons/io5";
import UpdateAdminProfileForm from "./UpdateAdminProfileForm";
import { useAdminEditForm } from "@/hooks/super-admin/useAdminEditForm";
import { AdminProfileDetail } from "@/types";

interface UpdateAdminProfileModalProps {
  admin: AdminProfileDetail;
}

export default function UpdateAdminProfileModal({
  admin,
}: UpdateAdminProfileModalProps) {
  const [open, setOpen] = useState(false);
  const { register, control, errors, isPending, onSubmit } = useAdminEditForm({
    admin,
    onSuccess: () => setOpen(false),
  });

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="btn btn-dark h-fit w-full lg:w-auto flex items-center justify-center gap-1.5 py-2"
        >
          <CiEdit aria-hidden="true" className="shrink-0 text-sm md:text-lg" />
          <span>Edit Details</span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between pb-5 border-b border-border shrink-0">
            <Dialog.Title className="title">Edit Admin Details</Dialog.Title>
            <Dialog.Description className="sr-only">
              Update this admin&apos;s profile information
            </Dialog.Description>
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
            onSubmit={onSubmit}
            noValidate
            className="flex flex-col flex-1 min-h-0"
          >
            <div className="w-full my-6 space-y-5 overflow-y-auto flex-1 pr-2">
              <UpdateAdminProfileForm
                register={register}
                control={control}
                errors={errors}
              />
            </div>

            <div className="pt-6 border-t border-border mt-6 text-end">
              <button
                type="submit"
                disabled={isPending}
                className="btn-dark btn py-2 disabled:opacity-50"
              >
                {isPending ? "Saving..." : "Save Changes"}
              </button>
            </div>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

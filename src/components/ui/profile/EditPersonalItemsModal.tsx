"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { useUpdateAdminProfile } from "@/hooks/admin/useAdminProfile";
import {
  UpdateAdminProfileFormValues,
  updateAdminProfileSchema,
} from "@/validation/updateAdminProfile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { IoClose } from "react-icons/io5";
import Input from "../shared/Input";

interface EditPersonalItemsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EditPersonalItemsModal({
  isOpen,
  onClose,
}: EditPersonalItemsModalProps) {
  const { mutate, isPending } = useUpdateAdminProfile();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<UpdateAdminProfileFormValues>({
    resolver: zodResolver(updateAdminProfileSchema),
  });

  // Clear form fields whenever the modal closes (X, Escape, outside click, or success)
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = (values: UpdateAdminProfileFormValues) => {
    mutate(
      {
        full_name: values.full_name || undefined,
        phone: values.phone || undefined,
        address: values.address || undefined,
      },
      { onSuccess: onClose },
    );
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />

        <Dialog.Content
          aria-describedby={undefined}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-md"
        >
          <div className="flex items-center justify-between pb-5 border-b border-border">
            <Dialog.Title className="title">Edit Information</Dialog.Title>

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

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-5 md:mt-7 space-y-4"
          >
            <Input
              label="Full Name"
              type="text"
              placeholder="e.g. John Doe"
              error={errors.full_name?.message}
              {...register("full_name")}
            />
            <Input
              label="Phone Number"
              type="text"
              placeholder="e.g. 01012345678"
              error={errors.phone?.message}
              {...register("phone")}
            />
            <Input
              label="Address"
              type="text"
              placeholder="e.g. 12 Tahrir St, Cairo"
              error={errors.address?.message}
              {...register("address")}
            />

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

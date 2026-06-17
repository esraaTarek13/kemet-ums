"use client";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import Input from "@/components/ui/shared/Input";
import { useChangePassword } from "@/hooks/shared/useChangePassword";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  changePasswordSchema,
  ChangePasswordSchema,
} from "@/validation/profile.schema";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChangePasswordModal({
  isOpen,
  onClose,
}: ChangePasswordModalProps) {
  const { mutate, isPending } = useChangePassword();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ChangePasswordSchema>({
    resolver: zodResolver(changePasswordSchema),
  });

  // Clear form fields whenever the modal closes (X, Escape, outside click, or success)
  useEffect(() => {
    if (!isOpen) reset();
  }, [isOpen, reset]);

  const onSubmit = (data: ChangePasswordSchema) => {
    mutate(data, {
      onSuccess: onClose,
    });
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
            <Dialog.Title className="title">Change Password</Dialog.Title>

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
              label="Current Password"
              type="password"
              placeholder="Current password"
              error={errors.currentPassword?.message}
              {...register("currentPassword")}
            />
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              error={errors.password?.message}
              {...register("password")}
            />
            <Input
              label="Confirm Password"
              type="password"
              placeholder="Re-enter password"
              error={errors.confirmPassword?.message}
              {...register("confirmPassword")}
            />

            <div className="pt-6 border-t border-border mt-6 text-end">
              <button
                type="submit"
                disabled={isPending}
                className="btn-dark bg-accent border border-accent rounded-md font-semibold text-text-white text-sm md:text-base py-2 px-5 md:px-8 cursor-pointer disabled:opacity-50"
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

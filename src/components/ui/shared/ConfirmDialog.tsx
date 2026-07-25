"use client";

import { ConfirmDialogProps } from "@/types";
import * as AlertDialog from "@radix-ui/react-alert-dialog";

export default function ConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmLabel = "Confirm",
  cancelLabel,
  isLoading = false,
  variant = "danger",
}: ConfirmDialogProps) {
  function handleOpenChange(next: boolean) {
    if (isLoading) return;
    onOpenChange(next);
  }

  const confirmClasses =
    variant === "danger"
      ? "bg-red-700 hover:bg-red-800"
      : variant === "warning"
        ? "bg-amber-600 hover:bg-amber-700"
        : "bg-primary hover:bg-primary-dark";

  return (
    <AlertDialog.Root open={open} onOpenChange={handleOpenChange}>
      <AlertDialog.Portal>
        <AlertDialog.Overlay className="fixed inset-0 bg-black/40 z-50" />

        <AlertDialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 card shadow-lg z-50 w-[90vw] max-w-sm">
          <AlertDialog.Title className="font-bold text-text-primary">
            {title}
          </AlertDialog.Title>

          <AlertDialog.Description className="text-sm text-text-secondary mt-2">
            {description}
          </AlertDialog.Description>

          <div className="flex justify-end gap-3 mt-4">
            {cancelLabel && (
              <AlertDialog.Cancel asChild>
                <button
                  type="button"
                  disabled={isLoading}
                  className="px-4 py-2 text-sm rounded-lg text-text-secondary hover:bg-bg-input disabled:opacity-50 cursor-pointer"
                >
                  {cancelLabel}
                </button>
              </AlertDialog.Cancel>
            )}

            <AlertDialog.Action asChild>
              <button
                type="button"
                disabled={isLoading}
                aria-busy={isLoading}
                aria-label={`Confirm ${confirmLabel}`}
                onClick={onConfirm}
                className={`px-4 py-2 text-sm rounded-lg text-white disabled:opacity-50 cursor-pointer ${confirmClasses}`}
              >
                {isLoading ? "Loading…" : confirmLabel}
              </button>
            </AlertDialog.Action>
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}

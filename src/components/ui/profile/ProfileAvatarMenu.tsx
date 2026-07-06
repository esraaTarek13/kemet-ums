"use client";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import {
  useDeleteAvatar,
  useUpdateAvatar,
} from "@/hooks/shared/useUpdateAvatar";
import { LuPencil } from "react-icons/lu";
import { useCallback, useRef, useState } from "react";

export default function ProfileAvatarMenu({
  hasAvatar,
}: {
  hasAvatar: boolean;
}) {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: update, isPending: isUpdating } = useUpdateAvatar();
  const { mutate: remove, isPending: isRemoving } = useDeleteAvatar();

  const isPending = isUpdating || isRemoving;

  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) update(file);
      // Reset so selecting the same file again still triggers onChange
      e.target.value = "";
    },
    [update],
  );

  const handleRemove = useCallback(() => {
    remove();
  }, [remove]);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Edit profile picture"
          disabled={isPending}
          className="absolute -right-2 -bottom-1 z-50 bg-primary border-4 border-bg-card p-1 md:p-2 rounded-full cursor-pointer disabled:opacity-50"
        >
          <LuPencil aria-hidden="true" className="shrink-0 text-text-white " />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="bg-bg-card border border-border rounded-lg shadow-xl py-1 w-36 z-50"
        >
          {/* Trigger the hidden input via ref — works for both mouse and keyboard */}
          <DropdownMenu.Item
            onSelect={() => fileInputRef.current?.click()}
            className="flex items-center px-4 py-2 text-text-primary text-sm cursor-pointer hover:bg-bg-bar outline-none"
          >
            {hasAvatar ? "Change Photo" : "Upload Photo"}
          </DropdownMenu.Item>

          {hasAvatar && (
            <DropdownMenu.Item
              onSelect={handleRemove}
              className="flex items-center px-4 py-2 text-sm text-error cursor-pointer hover:bg-bg-bar outline-none"
            >
              Remove Photo
            </DropdownMenu.Item>
          )}
        </DropdownMenu.Content>
      </DropdownMenu.Portal>

      {/* Purely programmatic — not part of tab order, triggered via ref */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        tabIndex={-1}
        aria-hidden="true"
        className="sr-only"
        onChange={handleUpload}
      />
    </DropdownMenu.Root>
  );
}

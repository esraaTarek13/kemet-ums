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
  const { mutate: update } = useUpdateAvatar();
  const { mutate: remove } = useDeleteAvatar();

  const handleUpload = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) update(file);
      setOpen(false);
    },
    [update],
  );

  const handleRemove = useCallback(() => {
    remove();
    setOpen(false);
  }, [remove]);

  return (
    <DropdownMenu.Root open={open} onOpenChange={setOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          aria-label="Edit profile picture"
          className="absolute -right-2 -bottom-1 z-50 bg-primary border-4 border-bg-card p-2 rounded-full cursor-pointer"
        >
          <LuPencil aria-hidden="true" className="shrink-0 text-text-white" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="bg-bg-card border border-border rounded-lg shadow-xl py-1 w-36 z-50"
        >
          {/* e.preventDefault() keeps the menu open so the file input can receive the click */}
          <DropdownMenu.Item
            onSelect={(e) => e.preventDefault()}
            className="flex items-center px-4 py-2 text-text-primary text-sm cursor-pointer hover:bg-bg-bar outline-none"
          >
            <label className="w-full cursor-pointer">
              {hasAvatar ? "Change Photo" : "Upload Photo"}
              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                className="hidden"
                onChange={handleUpload}
              />
            </label>
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
    </DropdownMenu.Root>
  );
}

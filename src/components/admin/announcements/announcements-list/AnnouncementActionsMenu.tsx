"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { HiDotsVertical } from "react-icons/hi";
import { FiEdit2, FiTrash2 } from "react-icons/fi";

interface AnnouncementActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function AnnouncementActionsMenu({
  onEdit,
  onDelete,
}: AnnouncementActionsMenuProps) {
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger asChild>
        <button
          type="button"
          className="text-sm md:text-lg text-accent shrink-0 outline-none cursor-pointer"
          aria-label="Announcement actions"
        >
          <HiDotsVertical />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={8}
          className="bg-bg-card border border-border rounded-lg shadow-lg py-1 min-w-35 z-50"
        >
          <DropdownMenu.Item
            onSelect={onEdit}
            className="flex items-center gap-2 px-3 py-2 text-xs md:text-sm text-text-muted font-medium hover:bg-primary/10 cursor-pointer outline-none rounded-md mx-1"
          >
            <FiEdit2 className="shrink-0" />
            Edit
          </DropdownMenu.Item>

          <DropdownMenu.Item
            onSelect={onDelete}
            className="flex items-center gap-2 px-3 py-2 text-xs md:text-sm text-accent font-medium hover:bg-border/20 cursor-pointer outline-none rounded-md mx-1"
          >
            <FiTrash2 className="shrink-0" />
            Delete
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

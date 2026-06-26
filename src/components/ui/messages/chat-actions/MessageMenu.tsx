"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { LuInfo } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";

interface MessageMenuProps {
  isMine: boolean;
  content: string | null;
  onEditOpen: () => void;
  onDeleteOpen: () => void;
  onInfoOpen: () => void;
}

export default function MessageMenu({
  isMine,
  content,
  onEditOpen,
  onDeleteOpen,
  onInfoOpen,
}: MessageMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  if (!isMine) return null;

  return (
    <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
      <DropdownMenu.Trigger asChild>
        <button
          aria-label="Message options"
          className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer shrink-0 outline-none"
        >
          <IoIosArrowDown className="text-text-white/80" aria-hidden="true" />
        </button>
      </DropdownMenu.Trigger>

      <DropdownMenu.Portal>
        <DropdownMenu.Content
          align="end"
          sideOffset={5}
          onCloseAutoFocus={(e) => e.preventDefault()}
          className="min-w-35 bg-bg-card border border-bg-bar rounded-lg shadow-lg p-1 z-50 text-text-primary text-sm"
        >
          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              setTimeout(() => onInfoOpen(), 0);
            }}
            className="flex gap-2 items-center px-3 py-2 rounded-md cursor-pointer outline-none hover:bg-accent/10 data-highlighted:bg-accent/10"
          >
            <LuInfo />
            <span>Message info</span>
          </DropdownMenu.Item>

          {content && (
            <DropdownMenu.Item
              onSelect={(e) => {
                e.preventDefault();
                setTimeout(() => onEditOpen(), 0);
              }}
              className="flex gap-2 items-center px-3 py-2 rounded-md cursor-pointer outline-none hover:bg-accent/10 data-highlighted:bg-accent/10"
            >
              <MdOutlineModeEditOutline />
              <span>Edit</span>
            </DropdownMenu.Item>
          )}

          <DropdownMenu.Separator className="h-px bg-border my-1" />

          <DropdownMenu.Item
            onSelect={(e) => {
              e.preventDefault();
              setTimeout(() => onDeleteOpen(), 0);
            }}
            className="flex gap-2 items-center px-3 py-2 rounded-md cursor-pointer outline-none text-danger hover:bg-danger-bg/10 data-highlighted:bg-red-500/10"
          >
            <RiDeleteBin6Line />
            <span>Delete</span>
          </DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}

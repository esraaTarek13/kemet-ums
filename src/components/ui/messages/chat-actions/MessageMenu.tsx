"use client";

import { useState } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";
import { LuInfo } from "react-icons/lu";
import { RiDeleteBin6Line } from "react-icons/ri";
import { MdOutlineModeEditOutline } from "react-icons/md";
import EditMessage from "./EditMessage";
import DeleteMessage from "./DeleteMessage";

interface MessageMenuProps {
  isMine: boolean;
  messageId: string;
  content: string | null;
}

export default function MessageMenu({
  isMine,
  messageId,
  content,
}: MessageMenuProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  if (!isMine) return null;

  return (
    <>
      <DropdownMenu.Root open={menuOpen} onOpenChange={setMenuOpen}>
        <DropdownMenu.Trigger asChild>
          <button className="opacity-0 group-hover:opacity-100 transition-opacity duration-150 cursor-pointer shrink-0 outline-none">
            <IoIosArrowDown className="text-text-white/80" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Portal>
          <DropdownMenu.Content
            align="end"
            sideOffset={5}
            className="min-w-35 bg-bg-card border border-bg-bar rounded-lg shadow-lg p-1 z-50 text-text-primary text-sm"
          >
            <DropdownMenu.Item className="flex gap-2 items-center px-3 py-2 rounded-md cursor-pointer outline-none hover:bg-accent/10 data-highlighted:bg-accent/10">
              <LuInfo />
              <span>Message info</span>
            </DropdownMenu.Item>

            {content && (
              <DropdownMenu.Item
                onSelect={() => setEditOpen(true)}
                className="flex gap-2 items-center px-3 py-2 rounded-md cursor-pointer outline-none hover:bg-accent/10 data-highlighted:bg-accent/10"
              >
                <MdOutlineModeEditOutline />
                <span>Edit</span>
              </DropdownMenu.Item>
            )}

            <DropdownMenu.Separator className="h-px bg-border my-1" />

            <DropdownMenu.Item
              onSelect={() => setDeleteOpen(true)}
              className="flex gap-2 items-center px-3 py-2 rounded-md cursor-pointer outline-none text-danger hover:bg-danger-bg/10 data-highlighted:bg-red-500/10"
            >
              <RiDeleteBin6Line />
              <span>Delete</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>

      {/* Mount only when needed to avoid unnecessary renders */}
      {editOpen && content && (
        <EditMessage
          messageId={messageId}
          content={content}
          open={editOpen}
          onOpenChange={setEditOpen}
        />
      )}

      {deleteOpen && (
        <DeleteMessage
          messageId={messageId}
          open={deleteOpen}
          onOpenChange={setDeleteOpen}
        />
      )}
    </>
  );
}

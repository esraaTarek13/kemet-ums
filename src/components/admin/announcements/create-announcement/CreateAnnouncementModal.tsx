"use client";
import { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { FiPlus } from "react-icons/fi";
import CreateAnnouncementForm from "./CreateAnnouncementForm";

export default function CreateAnnouncementModal() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {/* Mobile-only trigger (desktop uses the inline CreateAnnouncement form) */}
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="btn btn-dark flex items-center justify-center gap-2 py-2 lg:hidden"
          aria-label="Create Announcement"
        >
          <FiPlus className="text-sm md:text-xl shrink-0" aria-hidden="true" />
          <span className="text-sm md:text-base hidden sm:block">
            Create Announcement
          </span>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg max-h-[90vh] flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between pb-5 border-b border-border shrink-0">
            <Dialog.Title className="title">Create Announcement</Dialog.Title>
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

          <div className="mt-6">
            <CreateAnnouncementForm onSuccess={() => setOpen(false)} />
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import { AdminAnnouncement } from "@/types";
import EditAnnouncementForm from "./EditAnnouncementForm";

interface EditAnnouncementModalProps {
  announcement: AdminAnnouncement | null;
  onOpenChange: (open: boolean) => void;
}

export default function EditAnnouncementModal({
  announcement,
  onOpenChange,
}: EditAnnouncementModalProps) {
  return (
    <Dialog.Root open={!!announcement} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 h-full bg-black/50 z-50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 card-top-border w-[90%] max-w-lg max-h-[90vh] flex flex-col">
          <div className="flex items-center justify-between pb-5 border-b border-border shrink-0">
            <Dialog.Title className="title">Edit Announcement</Dialog.Title>
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

          <EditAnnouncementForm
            announcement={announcement}
            onSuccess={() => onOpenChange(false)}
          />
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

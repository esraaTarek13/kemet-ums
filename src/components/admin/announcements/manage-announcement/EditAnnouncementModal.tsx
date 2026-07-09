"use client";

import Input from "@/components/ui/shared/Input";
import * as Dialog from "@radix-ui/react-dialog";
import { IoClose } from "react-icons/io5";
import TextareaInput from "./TextareaInput";
import { Controller } from "react-hook-form";
import SelectInput from "../../../ui/shared/SelectInput";
import {
  audienceOptions,
  priorityOptions,
} from "@/data/admin/announcementOptions";
import { AdminAnnouncement } from "@/types";
import { useEditAnnouncementForm } from "@/hooks/admin/announcements/useUpdateAnnouncement";

interface EditAnnouncementModalProps {
  announcement: AdminAnnouncement | null;
  onOpenChange: (open: boolean) => void;
}

export default function EditAnnouncementModal({
  announcement,
  onOpenChange,
}: EditAnnouncementModalProps) {
  const { register, handleSubmit, control, errors, isPending, onSubmit } =
    useEditAnnouncementForm(announcement, () => onOpenChange(false));

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

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="my-6 space-y-6">
              <Input
                label="announcement title"
                type="text"
                placeholder="Enter announcement title"
                error={errors.title?.message}
                {...register("title")}
              />

              <TextareaInput
                label="Content"
                placeholder="Enter announcement details..."
                error={errors.content?.message}
                {...register("content")}
              />

              <div className="flex gap-4 items-center w-full">
                <Controller
                  control={control}
                  name="audience"
                  render={({ field }) => (
                    <SelectInput
                      label="Audience"
                      options={audienceOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
                <Controller
                  control={control}
                  name="priority"
                  render={({ field }) => (
                    <SelectInput
                      label="Priority"
                      options={priorityOptions}
                      value={field.value}
                      onChange={field.onChange}
                    />
                  )}
                />
              </div>
            </div>

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

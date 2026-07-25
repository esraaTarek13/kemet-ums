"use client";

import Input from "@/components/ui/shared/Input";
import { Controller } from "react-hook-form";
import {
  audienceOptions,
  priorityOptions,
} from "@/data/admin/announcementOptions";
import { AdminAnnouncement } from "@/types";
import { useEditAnnouncementForm } from "@/hooks/admin/announcements/useEditAnnouncementForm";
import TextareaInput from "@/components/ui/shared/TextareaInput";
import SelectInput from "@/components/ui/shared/SelectInput";

interface EditAnnouncementFormProps {
  announcement: AdminAnnouncement | null;
  onSuccess: () => void;
}

export default function EditAnnouncementForm({
  announcement,
  onSuccess,
}: EditAnnouncementFormProps) {
  const { register, handleSubmit, control, errors, isPending, onSubmit } =
    useEditAnnouncementForm(announcement, onSuccess);

  return (
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
  );
}
"use client";
import Input from "@/components/ui/shared/Input";
import { MdOutlineEditNote } from "react-icons/md";
import {
  audienceOptions,
  priorityOptions,
} from "@/data/admin/announcementOptions";
import { Controller } from "react-hook-form";
import { useAnnouncementForm } from "@/hooks/admin/announcements/useCreateAnnouncementForm";
import TextareaInput from "@/components/ui/shared/TextareaInput";
import SelectInput from "@/components/ui/shared/SelectInput";

interface CreateAnnouncementProps {
  onSuccess?: () => void;
}

export default function CreateAnnouncementForm({
  onSuccess,
}: CreateAnnouncementProps) {
  const { register, handleSubmit, control, errors, isPending, onSubmit } =
    useAnnouncementForm(onSuccess);

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      aria-labelledby="create-announcement-heading"
      className="lg:bg-bg-card lg:border lg:border-bg-bar lg:rounded-xl lg:p-5 space-y-6"
    >
      <h2
        id="create-announcement-heading"
        className="hidden lg:flex items-center gap-2"
      >
        <MdOutlineEditNote
          aria-hidden="true"
          className="text-text-secondary text-2xl shrink-0 mt-1"
        />
        <span className="title">Create Announcement</span>
      </h2>

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
              error={errors.audience?.message}
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
              error={errors.priority?.message}
            />
          )}
        />
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="btn btn-dark w-full"
      >
        {isPending ? "Publishing..." : "Publish Now"}
      </button>

      <p className="text-[10px] text-text-subtle pt-6 border-t border-border-card">
        Announcements will be visible across student dashboards and campus
        portals within 15 minutes of publishing.
      </p>
    </form>
  );
}

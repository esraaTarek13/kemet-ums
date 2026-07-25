import {
  UpdateAnnouncementFormValues,
  updateAnnouncementSchema,
} from "@/validation/updateAnnouncement.schema";
import { AdminAnnouncement } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useUpdateAnnouncement } from "./queries/useUpdateAnnouncement";

export function useEditAnnouncementForm(
  announcement: AdminAnnouncement | null,
  onSuccess: () => void,
) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<UpdateAnnouncementFormValues>({
    resolver: zodResolver(updateAnnouncementSchema),
  });

  useEffect(() => {
    if (announcement) {
      reset({
        title: announcement.title,
        content: announcement.content,
        audience: announcement.audience,
        priority: announcement.priority,
      });
    }
  }, [announcement, reset]);

  const { mutate: updateAnnouncement, isPending } = useUpdateAnnouncement();

  const onSubmit = useCallback(
    (data: UpdateAnnouncementFormValues) => {
      if (!announcement) return;
      updateAnnouncement({ id: announcement.id, ...data }, { onSuccess });
    },
    [announcement, updateAnnouncement, onSuccess],
  );

  return {
    register,
    handleSubmit,
    control,
    errors,
    isPending,
    onSubmit,
  };
}

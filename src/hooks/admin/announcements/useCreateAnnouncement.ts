import { useCreateAnnouncement as useCreateAnnouncementMutation } from "./useAnnouncements";
import {
  CreateAnnouncementFormValues,
  createAnnouncementSchema,
} from "@/validation/createAnnouncement.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function useAnnouncementForm(onSuccess?: () => void) {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<CreateAnnouncementFormValues>({
    resolver: zodResolver(createAnnouncementSchema),
    defaultValues: {
      audience: "all",
      priority: "normal",
    },
  });

  const { mutate: createAnnouncement, isPending } =
    useCreateAnnouncementMutation();

  const onSubmit = useCallback(
    (data: CreateAnnouncementFormValues) => {
      createAnnouncement(data, {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      });
    },
    [createAnnouncement, reset, onSuccess],
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

"use client";

import { useCreateAdmin as useCreateAdminMutation } from "./queries/useCreateAdmin";
import {
  CreateAdminFormValues,
  CreateAdminPayload,
  createAdminSchema,
} from "@/validation/createAdmin.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

export function useCreateAdminForm(onSuccess?: () => void) {
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateAdminFormValues, unknown, CreateAdminPayload>({
    resolver: zodResolver(createAdminSchema),
  });

  const { mutate: createAdmin, isPending } = useCreateAdminMutation();

  const onSubmit = handleSubmit((data) => {
    createAdmin(data, {
      onSuccess: () => {
        reset();
        onSuccess?.();
      },
    });
  });

  return {
    register,
    control,
    errors,
    isPending,
    onSubmit,
  };
}

"use client";

import { useCreateFaculty as useCreateFacultyMutation } from "./useCreateFaculty";
import {
  CreateFacultyFormValues,
  CreateFacultyPayload,
  createFacultySchema,
} from "@/validation/createFaculty.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDepartments } from "@/hooks/shared/useDepartments";

export function useCreateFacultyForm(onSuccess?: () => void) {
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateFacultyFormValues, unknown, CreateFacultyPayload>({
    resolver: zodResolver(createFacultySchema),
    defaultValues: {
      max_courses: "4",
      publications: "0",
    },
  });

  const { mutate: createFaculty, isPending } = useCreateFacultyMutation();

  const { data: departments = [] } = useDepartments("faculty");
  const departmentOptions = departments.map((dept) => ({
    label: dept,
    value: dept,
  }));

  const onSubmit = handleSubmit((data) => {
    createFaculty(data, {
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
    departmentOptions,
  };
}

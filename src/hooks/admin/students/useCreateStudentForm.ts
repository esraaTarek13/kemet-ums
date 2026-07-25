"use client";

import { useCreateStudent as useCreateStudentMutation } from "./queries/useCreateStudent";
import {
  CreateStudentFormValues,
  CreateStudentPayload,
  createStudentSchema,
} from "@/validation/createStudent.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDepartments } from "@/hooks/shared/useDepartments";

export function useCreateStudentForm(onSuccess?: () => void) {
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateStudentFormValues, unknown, CreateStudentPayload>({
    resolver: zodResolver(createStudentSchema),
    defaultValues: {
      max_credits: "18",
    },
  });

  const { mutate: createStudent, isPending } = useCreateStudentMutation();

  const { data: departments = [] } = useDepartments("courses");
  const departmentOptions = departments.map((dept) => ({
    label: dept,
    value: dept,
  }));

  const onSubmit = handleSubmit((data) => {
    createStudent(data, {
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
"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  submitAssignmentSchema,
  SubmitFormValues,
} from "@/validation/student.submitFile.schema";
import { useSubmitAssignment } from "@/hooks/student/assignment/queries/useSubmitAssignment";

interface UseSubmitModalFormParams {
  assignmentId: string;
  onSuccess?: () => void;
}

export function useSubmitModalForm({
  assignmentId,
  onSuccess,
}: UseSubmitModalFormParams) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<SubmitFormValues>({
    resolver: zodResolver(submitAssignmentSchema),
  });

  const { mutate: submitAssignment, isPending } = useSubmitAssignment();

  const onSubmit = handleSubmit((data) => {
    submitAssignment(
      { assignmentId, file: data.file[0] },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      },
    );
  });

  function handleClose() {
    reset();
    onSuccess?.();
  }

  return {
    register,
    errors,
    watch,
    isPending,
    onSubmit,
    handleClose,
  };
}
"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  EnrollStudentFormValues,
  EnrollStudentPayload,
  enrollStudentSchema,
} from "@/validation/enrollStudent.schema";
import { useEnrollStudent } from "./queries/useEnrollStudent";

interface UseEnrollStudentFormParams {
  studentId: string;
  onSuccess?: () => void;
}

export function useEnrollStudentForm({
  studentId,
  onSuccess,
}: UseEnrollStudentFormParams) {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<EnrollStudentFormValues, unknown, EnrollStudentPayload>({
    resolver: zodResolver(enrollStudentSchema),
    defaultValues: {
      offering_ids: [],
    },
  });

  const { mutate: enrollStudent, isPending } = useEnrollStudent();

  const onSubmit = handleSubmit((data) => {
    enrollStudent(
      {
        studentId,
        offeringIds: data.offering_ids,
      },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      },
    );
  });

  return { control, errors, isPending, onSubmit };
}

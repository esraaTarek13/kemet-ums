"use client";

import { useRecordPayment as useRecordPaymentMutation } from "./queries/useRecordPayment";
import {
  RecordPaymentFormValues,
  RecordPaymentPayload,
  recordPaymentSchema,
} from "@/validation/recordPayment.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

interface UseRecordPaymentFormParams {
  studentId: string;
  semester: string;
  academicYear: string;
  onSuccess?: () => void;
}

export function useRecordPaymentForm({
  studentId,
  semester,
  academicYear,
  onSuccess,
}: UseRecordPaymentFormParams) {
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<RecordPaymentFormValues, unknown, RecordPaymentPayload>({
    resolver: zodResolver(recordPaymentSchema),
    defaultValues: {
      notes: "",
    },
  });

  const { mutate: recordPayment, isPending } = useRecordPaymentMutation();

  const onSubmit = handleSubmit((data) => {
    recordPayment(
      {
        studentId,
        amount: data.amount,
        semester,
        academicYear,
        notes: data.notes || undefined,
      },
      {
        onSuccess: () => {
          reset();
          onSuccess?.();
        },
      },
    );
  });

  return {
    register,
    control,
    errors,
    isPending,
    onSubmit,
  };
}

import { useAddAssignment } from "@/hooks/faculty/useAssignments";
import {
  AddAssignmentFormValues,
  addAssignmentSchema,
} from "@/validation/faculty/submitFile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function useAddAssignmentForm(offeringId: string, onClose: () => void) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddAssignmentFormValues>({
    resolver: zodResolver(addAssignmentSchema),
  });

  const { mutate: addAssignment, isPending } = useAddAssignment(offeringId);

  // Resets form state and notifies parent to close
  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmit = useCallback(
    (data: AddAssignmentFormValues) => {
      addAssignment(
        {
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          maxGrade: data.maxGrade,
          file: data.file?.[0],
        },
        { onSuccess: handleClose },
      );
    },
    [addAssignment, handleClose],
  );

  return {
    register,
    handleSubmit,
    errors,
    isPending,
    onSubmit,
    handleClose,
    watch,
  };
}

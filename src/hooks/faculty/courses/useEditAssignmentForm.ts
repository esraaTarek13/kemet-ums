import {
  AddAssignmentFormValues,
  addAssignmentSchema,
} from "@/validation/faculty.submitFile.schema";
import { FacultyAssignment } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";
import { format, parseISO } from "date-fns";
import { useUpdateAssignment } from "../assignments/queries/useUpdateAssignment";

export function useEditAssignmentForm(
  assignment: FacultyAssignment,
  onClose: () => void,
) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<AddAssignmentFormValues>({
    resolver: zodResolver(addAssignmentSchema),
    defaultValues: {
      title: assignment.title,
      description: assignment.description ?? "",
      dueDate: format(parseISO(assignment.due_date), "yyyy-MM-dd"),
      maxGrade: assignment.max_grade,
    },
  });

  const { mutate: updateAssignment, isPending } = useUpdateAssignment();

  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmit = useCallback(
    (data: AddAssignmentFormValues) => {
      updateAssignment(
        {
          assignmentId: assignment.id,
          title: data.title,
          description: data.description,
          dueDate: data.dueDate,
          maxGrade: data.maxGrade,
          file: data.file?.[0],
        },
        { onSuccess: handleClose },
      );
    },
    [updateAssignment, handleClose, assignment.id],
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

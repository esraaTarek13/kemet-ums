import { useUpdateCourseCompletion } from "@/hooks/faculty/useFacultyCourses";
import {
  EditProgressFormData,
  editProgressSchema,
} from "@/validation/progress.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback } from "react";
import { useForm } from "react-hook-form";

export function useEditProgressForm(offeringId: string, onClose: () => void) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProgressFormData>({
    resolver: zodResolver(editProgressSchema),
  });

  const { mutate: updateCourseCompletion, isPending } =
    useUpdateCourseCompletion();

  // Resets form state and notifies parent to close
  const handleClose = useCallback(() => {
    reset();
    onClose();
  }, [reset, onClose]);

  const onSubmit = useCallback(
    (data: EditProgressFormData) => {
      updateCourseCompletion(
        { offeringId, completion: data.completion_percentage },
        { onSuccess: handleClose },
      );
    },
    [updateCourseCompletion, handleClose, offeringId],
  );

  return { register, handleSubmit, errors, isPending, onSubmit, handleClose };
}

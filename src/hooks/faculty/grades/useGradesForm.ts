import { useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/authStore";
import {
  gradesFormSchema,
  GradesFormValues,
} from "@/validation/gradesValidation";
import { useUpdateStudentGrade } from "./queries/useUpdateStudentGrade";

export function useGradesForm(courseId: string) {
  const { mutateAsync, isPending: isUpdating } = useUpdateStudentGrade();
  const { user } = useAuthStore();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<GradesFormValues>({
    resolver: zodResolver(gradesFormSchema),
  });

  const onSubmit: SubmitHandler<GradesFormValues> = async (values) => {
    const updates: Promise<unknown>[] = [];

    Object.entries(values.grades ?? {}).forEach(([enrollmentId, grades]) => {
      const payload: {
        enrollmentId: string;
        quiz?: number;
        midterm?: number;
        final?: number;
      } = { enrollmentId };

      if (grades.quiz !== undefined) payload.quiz = grades.quiz;
      if (grades.midterm !== undefined) payload.midterm = grades.midterm;
      if (grades.final !== undefined) payload.final = grades.final;

      const hasChange =
        payload.quiz !== undefined ||
        payload.midterm !== undefined ||
        payload.final !== undefined;

      if (hasChange) {
        updates.push(mutateAsync(payload));
      }
    });

    if (updates.length === 0) {
      toast("No changes to save");
      return;
    }

    try {
      await Promise.all(updates);
      queryClient.invalidateQueries({
        queryKey: ["faculty-grades", user?.id, courseId],
      });
      toast.success("Grades updated successfully");
    } catch {
      toast.error("Failed to update some grades");
    }
  };

  return {
    isUpdating,
    register,
    errors,
    handleSubmit,
    onSubmit,
  };
}

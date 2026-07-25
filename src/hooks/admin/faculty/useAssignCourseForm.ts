"use client";
import {
  AssignCourseFormValues,
  AssignCoursePayload,
  assignCourseSchema,
} from "@/validation/assignCourse.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAssignCourse } from "./queries/useAssignCourse";

interface UseAssignCourseFormParams {
  facultyId: string;
  onSuccess?: () => void;
}

export function useAssignCourseForm({
  facultyId,
  onSuccess,
}: UseAssignCourseFormParams) {
  const {
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<AssignCourseFormValues, unknown, AssignCoursePayload>({
    resolver: zodResolver(assignCourseSchema),
    defaultValues: {
      offering_ids: [],
    },
  });

  const { mutate: assignCourses, isPending } = useAssignCourse();

  const onSubmit = handleSubmit((data) => {
    assignCourses(
      {
        offeringIds: data.offering_ids,
        facultyId,
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
    control,
    errors,
    isPending,
    onSubmit,
  };
}

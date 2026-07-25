"use client";
import {
  UpdateCourseOfferingFormValues,
  UpdateCourseOfferingPayload,
  updateCourseOfferingSchema,
} from "@/validation/updateCourseOffering.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CourseOfferingDetail } from "@/types";
import { useUpdateCourseOffering } from "./queries/useUpdateCourseOffering";

interface UseUpdateCourseOfferingFormParams {
  offering: CourseOfferingDetail;
  onSuccess?: () => void;
}

export function useUpdateCourseOfferingForm({
  offering,
  onSuccess,
}: UseUpdateCourseOfferingFormParams) {
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<
    UpdateCourseOfferingFormValues,
    unknown,
    UpdateCourseOfferingPayload
  >({
    resolver: zodResolver(updateCourseOfferingSchema),
    defaultValues: {
      faculty_id: offering.faculty_id ?? "",
      room: offering.room ?? "",
      max_students: String(offering.max_students ?? ""),
      status: offering.status,
    },
  });

  const { mutate: updateCourseOffering, isPending } = useUpdateCourseOffering();

  const onSubmit = handleSubmit((data) => {
    updateCourseOffering(
      {
        offeringId: offering.offering_id,
        facultyId: data.faculty_id || undefined,
        room: data.room || undefined,
        maxStudents: data.max_students,
        status: data.status || undefined,
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

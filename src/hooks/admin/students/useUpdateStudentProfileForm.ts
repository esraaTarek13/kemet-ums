"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useUpdateStudentProfile } from "./queries/useUpdateStudentProfile";
import {
  UpdateStudentProfileFormValues,
  UpdateStudentProfilePayload,
  updateStudentProfileSchema,
} from "@/validation/updateStudentProfile.schema";
import { useDepartments } from "@/hooks/shared/useDepartments";

interface UseUpdateStudentProfileFormProps {
  studentId: string;
  defaultValues?: Partial<UpdateStudentProfileFormValues>;
  onSuccess?: () => void;
}

export function useUpdateStudentProfileForm({
  studentId,
  defaultValues,
  onSuccess,
}: UseUpdateStudentProfileFormProps) {
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<
    UpdateStudentProfileFormValues,
    unknown,
    UpdateStudentProfilePayload
  >({
    resolver: zodResolver(updateStudentProfileSchema),
    defaultValues,
  });

  const { mutate: updateStudentProfile, isPending } = useUpdateStudentProfile();

  const { data: departments = [] } = useDepartments("courses");
  const departmentOptions = departments.map((dept) => ({
    label: dept,
    value: dept,
  }));

  const onSubmit = handleSubmit((data) => {
    updateStudentProfile(
      { studentId, ...data },
      {
        onSuccess: () => {
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
    departmentOptions,
  };
}

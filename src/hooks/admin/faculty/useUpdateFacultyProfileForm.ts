"use client";
import {
  UpdateFacultyProfileFormValues,
  UpdateFacultyProfilePayload,
  updateFacultyProfileSchema,
} from "@/validation/updateFacultyProfile.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { FacultyProfileHeader } from "@/types";
import { useUpdateFacultyProfile } from "./queries/useUpdateFacultyProfile";

interface UseUpdateFacultyProfileFormParams {
  faculty: FacultyProfileHeader;
  onSuccess?: () => void;
}

export function useUpdateFacultyProfileForm({
  faculty,
  onSuccess,
}: UseUpdateFacultyProfileFormParams) {
  const {
    register,
    control,
    reset,
    formState: { errors },
    handleSubmit,
  } = useForm<
    UpdateFacultyProfileFormValues,
    unknown,
    UpdateFacultyProfilePayload
  >({
    resolver: zodResolver(updateFacultyProfileSchema),
    defaultValues: {
      phone: faculty.phone ?? "",
      nationality: faculty.nationality ?? "",
      address: faculty.address ?? "",
      rank: faculty.rank ?? "",
      employment_type: faculty.employment_type ?? "",
      specialization: faculty.specialization ?? "",
      office_location: faculty.office_location ?? "",
      office_hours: faculty.office_hours ?? "",
      publications: String(faculty.publications ?? ""),
      status: faculty.status,
    },
  });

  const { mutate: updateFacultyProfile, isPending } = useUpdateFacultyProfile();

  const onSubmit = handleSubmit((data) => {
    updateFacultyProfile(
      {
        facultyId: faculty.faculty_id,
        phone: data.phone || undefined,
        nationality: data.nationality || undefined,
        address: data.address || undefined,
        rank: data.rank || undefined,
        employmentType: data.employment_type || undefined,
        specialization: data.specialization || undefined,
        officeLocation: data.office_location || undefined,
        officeHours: data.office_hours || undefined,
        publications: data.publications,
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

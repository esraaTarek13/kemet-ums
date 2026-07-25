import Input from "@/components/ui/shared/Input";
import SelectInput from "@/components/ui/shared/SelectInput";
import { Controller } from "react-hook-form";
import type { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import type {
  UpdateFacultyProfileFormValues,
  UpdateFacultyProfilePayload,
} from "@/validation/updateFacultyProfile.schema";
import {
  employmentTypeOptions,
  rankOptions,
} from "@/data/admin/facultyOptions";
import { FACULTY_STATUS_OPTIONS } from "@/data/admin/facultyStatusOptions";

interface UpdateFacultyProfileFormProps {
  register: UseFormRegister<UpdateFacultyProfileFormValues>;
  control: Control<
    UpdateFacultyProfileFormValues,
    unknown,
    UpdateFacultyProfilePayload
  >;
  errors: FieldErrors<UpdateFacultyProfileFormValues>;
}

export default function UpdateFacultyProfileForm({
  register,
  control,
  errors,
}: UpdateFacultyProfileFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Phone"
          placeholder="e.g. +20 100 1234567"
          error={errors.phone?.message}
          {...register("phone")}
        />

        <Input
          label="Nationality"
          placeholder="e.g. Egyptian"
          error={errors.nationality?.message}
          {...register("nationality")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Address"
          placeholder="e.g. 12 Nile St, Cairo"
          error={errors.address?.message}
          {...register("address")}
        />

        <Controller
          control={control}
          name="rank"
          render={({ field }) => (
            <SelectInput
              label="Rank"
              placeholder="Select rank"
              options={rankOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.rank?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Specialization"
          placeholder="e.g. AI & Machine Learning"
          error={errors.specialization?.message}
          {...register("specialization")}
        />

        <Input
          label="Office Location"
          placeholder="e.g. Block B, Room 105"
          error={errors.office_location?.message}
          {...register("office_location")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          control={control}
          name="employment_type"
          render={({ field }) => (
            <SelectInput
              label="Employment Type"
              placeholder="Select employment type"
              options={employmentTypeOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.employment_type?.message}
            />
          )}
        />

        <Input
          label="Publications"
          type="text"
          placeholder="e.g. 8"
          error={errors.publications?.message}
          {...register("publications")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Office Hours"
          type="text"
          placeholder="Sun & Tue, 10:00 - 12:00"
          error={errors.office_hours?.message}
          {...register("office_hours")}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <SelectInput
              label="Status"
              placeholder="Select status"
              options={FACULTY_STATUS_OPTIONS}
              value={field.value}
              onChange={field.onChange}
              error={errors.status?.message}
            />
          )}
        />
      </div>
    </>
  );
}

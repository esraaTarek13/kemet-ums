import Input from "@/components/ui/shared/Input";
import SelectInput from "@/components/ui/shared/SelectInput";
import { STUDENT_STATUS_OPTIONS } from "@/data/admin/studentStatusOptions";
import {
  UpdateStudentProfileFormValues,
  UpdateStudentProfilePayload,
} from "@/validation/updateStudentProfile.schema";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

interface UpdateStudentProfileFormProps {
  register: UseFormRegister<UpdateStudentProfileFormValues>;
  control: Control<
    UpdateStudentProfileFormValues,
    unknown,
    UpdateStudentProfilePayload
  >;
  errors: FieldErrors<UpdateStudentProfileFormValues>;
  departmentOptions: { label: string; value: string }[];
}

export default function UpdateStudentProfileForm({
  register,
  control,
  errors,
  departmentOptions,
}: UpdateStudentProfileFormProps) {
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
          name="department"
          render={({ field }) => (
            <SelectInput
              label="Department"
              placeholder="Select department"
              options={departmentOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.department?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Expected Graduation"
          type="date"
          placeholder="e.g. 2026-06-30"
          error={errors.expected_graduation?.message}
          {...register("expected_graduation")}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <SelectInput
              label="Status"
              placeholder="Select status"
              options={STUDENT_STATUS_OPTIONS}
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

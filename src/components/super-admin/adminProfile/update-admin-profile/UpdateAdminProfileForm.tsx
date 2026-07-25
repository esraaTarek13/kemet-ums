import Input from "@/components/ui/shared/Input";
import SelectInput from "@/components/ui/shared/SelectInput";
import { ADMIN_STATUS_OPTIONS } from "@/data/super-admin/adminStatusOptions";
import {
  UpdateAdminByAdminFormValues,
  UpdateAdminByAdminPayload,
} from "@/validation/updateAdminByAdmin.schema";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

interface UpdateAdminProfileFormProps {
  register: UseFormRegister<UpdateAdminByAdminFormValues>;
  control: Control<
    UpdateAdminByAdminFormValues,
    unknown,
    UpdateAdminByAdminPayload
  >;
  errors: FieldErrors<UpdateAdminByAdminFormValues>;
}

export default function UpdateAdminProfileForm({
  register,
  control,
  errors,
}: UpdateAdminProfileFormProps) {
  return (
    <>
      <Input
        label="Full Name"
        placeholder="e.g. Abdelrahman Tarek"
        error={errors.full_name?.message}
        {...register("full_name")}
      />

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
          placeholder="e.g. 9th Street, Maadi, Cairo"
          error={errors.address?.message}
          {...register("address")}
        />

        <Controller
          control={control}
          name="status"
          render={({ field }) => (
            <SelectInput
              label="Status"
              placeholder="Select status"
              options={ADMIN_STATUS_OPTIONS}
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

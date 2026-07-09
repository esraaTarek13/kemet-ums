import Input from "@/components/ui/shared/Input";
import SelectInput from "@/components/ui/shared/SelectInput";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type {
  CreateStudentFormValues,
  CreateStudentPayload,
} from "@/validation/createStudent.schema";
import { yearOptions } from "@/data/admin/addStudentOptions";

interface AddStudentFormProps {
  register: UseFormRegister<CreateStudentFormValues>;
  control: Control<CreateStudentFormValues, unknown, CreateStudentPayload>;
  errors: FieldErrors<CreateStudentFormValues>;
  departmentOptions: { label: string; value: string }[];
}

export default function AddStudentForm({
  register,
  control,
  errors,
  departmentOptions,
}: AddStudentFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Full Name"
          type="text"
          placeholder="John Doe"
          error={errors.full_name?.message}
          {...register("full_name")}
        />
        <Input
          label="Phone Number"
          type="text"
          placeholder="+20 100 123 4567"
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Email Address"
          type="email"
          placeholder="j.thorne@kemet.edu"
          error={errors.email?.message}
          {...register("email")}
        />
        <Input
          label="Password"
          type="password"
          placeholder="Initial password"
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Date of Birth"
          type="text"
          placeholder="mm/dd/yyyy"
          error={errors.date_of_birth?.message}
          {...register("date_of_birth")}
        />
        <Controller
          name="academic_year"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Year"
              placeholder="Select year"
              options={yearOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.academic_year?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nationality"
          type="text"
          placeholder="Egyptian"
          error={errors.nationality?.message}
          {...register("nationality")}
        />
        <Input
          label="Residential Address"
          type="text"
          placeholder="Street Address, City, State, ZIP"
          error={errors.address?.message}
          {...register("address")}
        />
      </div>

       <Controller
        name="department"
        control={control}
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
    </>
  );
}

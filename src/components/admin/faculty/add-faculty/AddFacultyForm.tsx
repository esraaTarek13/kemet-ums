import Input from "@/components/ui/shared/Input";
import SelectInput from "@/components/ui/shared/SelectInput";
import {
  employmentTypeOptions,
  rankOptions,
} from "@/data/admin/facultyOptions";
import { CreateFacultyFormValues, CreateFacultyPayload } from "@/types";
import {
  Control,
  Controller,
  FieldErrors,
  UseFormRegister,
} from "react-hook-form";

interface AddFacultyFormProps {
  register: UseFormRegister<CreateFacultyFormValues>;
  control: Control<CreateFacultyFormValues, unknown, CreateFacultyPayload>;
  errors: FieldErrors<CreateFacultyFormValues>;
  departmentOptions: { label: string; value: string }[];
}

export default function AddFacultyForm({
  register,
  control,
  errors,
  departmentOptions,
}: AddFacultyFormProps) {
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <Input
          label="Office Location"
          type="text"
          placeholder="Building A, Room 204"
          error={errors.office_location?.message}
          {...register("office_location")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Controller
          name="rank"
          control={control}
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
        <Controller
          name="employment_type"
          control={control}
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
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Specialization"
          type="text"
          placeholder="Machine Learning"
          error={errors.specialization?.message}
          {...register("specialization")}
        />
        <Input
          label="Office Hours"
          type="text"
          placeholder="Sun & Tue, 10:00 - 12:00"
          error={errors.office_hours?.message}
          {...register("office_hours")}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Join Date"
          type="text"
          placeholder="mm/dd/yyyy"
          error={errors.join_date?.message}
          {...register("join_date")}
        />
        <Input
          label="Max Courses"
          type="text"
          placeholder="4"
          error={errors.max_courses?.message}
          {...register("max_courses")}
        />
      </div>
    </>
  );
}

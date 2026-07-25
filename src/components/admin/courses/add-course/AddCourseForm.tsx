import Input from "@/components/ui/shared/Input";
import SelectInput from "@/components/ui/shared/SelectInput";
import {
  Controller,
  type Control,
  type FieldErrors,
  type UseFormRegister,
} from "react-hook-form";
import type {
  CreateCourseFormValues,
  CreateCoursePayload,
} from "@/validation/createCourse.schema";
import { courseTypeOptions } from "@/data/admin/courseTypeOptions";
import DayOfWeekCheckboxes from "@/components/ui/shared/DayOfWeekCheckboxes";

interface AddCourseFormProps {
  register: UseFormRegister<CreateCourseFormValues>;
  control: Control<CreateCourseFormValues, unknown, CreateCoursePayload>;
  errors: FieldErrors<CreateCourseFormValues>;
  departmentOptions: { label: string; value: string }[];
  facultyOptions: { label: string; value: string }[];
  academicYearOptions: { label: string; value: string }[];
  termOptions: { label: string; value: string }[];
}

export default function AddCourseForm({
  register,
  control,
  errors,
  departmentOptions,
  facultyOptions,
  academicYearOptions,
  termOptions,
}: AddCourseFormProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Course Code"
          type="text"
          placeholder="CS101"
          error={errors.course_code?.message}
          {...register("course_code")}
        />
        <Input
          label="Course Name"
          type="text"
          placeholder="Introduction to Programming"
          error={errors.course_name?.message}
          {...register("course_name")}
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
        <Controller
          name="course_type"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Course Type"
              placeholder="Select course type"
              options={courseTypeOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.course_type?.message}
            />
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Credits"
          type="text"
          placeholder="3"
          error={errors.credits?.message}
          {...register("credits")}
        />
        <Input
          label="Price (EGP)"
          type="text"
          placeholder="1500"
          error={errors.price?.message}
          {...register("price")}
        />
      </div>

      <Input
        label="Description"
        type="text"
        placeholder="Course description"
        error={errors.description?.message}
        {...register("description")}
      />

      <div className="border-t border-text-peach mt-8 pt-6 space-y-5 relative">
        <p className="font-bold text-[10px] md:text-xs text-[#C4A882] tracking-wider uppercase absolute -top-2 bg-bg-card pr-10">
          Offering Details
        </p>

        <Controller
          name="faculty_id"
          control={control}
          render={({ field }) => (
            <SelectInput
              label="Faculty"
              placeholder="Select department first"
              options={facultyOptions}
              value={field.value}
              onChange={field.onChange}
              error={errors.faculty_id?.message}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Controller
            name="term"
            control={control}
            render={({ field }) => (
              <SelectInput
                label="Term"
                placeholder="Select term"
                options={termOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.term?.message}
              />
            )}
          />
          <Controller
            name="academic_year"
            control={control}
            render={({ field }) => (
              <SelectInput
                label="Academic Year"
                placeholder="Select year"
                options={academicYearOptions}
                value={field.value}
                onChange={field.onChange}
                error={errors.academic_year?.message}
              />
            )}
          />
        </div>

        <Controller
          name="day_of_week"
          control={control}
          render={({ field }) => (
            <DayOfWeekCheckboxes
              value={field.value ?? []}
              onChange={field.onChange}
              error={errors.day_of_week?.message}
            />
          )}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Start Time"
            type="time"
            error={errors.start_time?.message}
            {...register("start_time")}
          />
          <Input
            label="End Time"
            type="time"
            error={errors.end_time?.message}
            {...register("end_time")}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Room"
            type="text"
            placeholder="e.g. Room C302"
            error={errors.room?.message}
            {...register("room")}
          />
          <Input
            label="Max Students"
            type="text"
            placeholder="30"
            error={errors.max_students?.message}
            {...register("max_students")}
          />
        </div>
      </div>
    </>
  );
}
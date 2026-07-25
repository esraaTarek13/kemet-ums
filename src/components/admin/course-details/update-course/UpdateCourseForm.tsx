import Input from "@/components/ui/shared/Input";
import SelectInput from "@/components/ui/shared/SelectInput";
import { Controller } from "react-hook-form";
import type { UseFormRegister, Control, FieldErrors } from "react-hook-form";
import { useFacultyByDepartment } from "@/hooks/admin/courses/queries/useFacultyByDepartment";
import { COURSE_OFFERING_STATUS_OPTIONS } from "@/data/admin/courseOfferingStatusOptions";
import type {
  UpdateCourseOfferingFormValues,
  UpdateCourseOfferingPayload,
} from "@/validation/updateCourseOffering.schema";

interface UpdateCourseFormProps {
  department: string;
  register: UseFormRegister<UpdateCourseOfferingFormValues>;
  control: Control<
    UpdateCourseOfferingFormValues,
    unknown,
    UpdateCourseOfferingPayload
  >;
  errors: FieldErrors<UpdateCourseOfferingFormValues>;
}

export default function UpdateCourseForm({
  department,
  register,
  control,
  errors,
}: UpdateCourseFormProps) {
  const { data: facultyOptions = [], isPending } = useFacultyByDepartment(department);

  return (
    <div className="space-y-5">
      <Controller
        control={control}
        name="faculty_id"
        render={({ field }) => (
          <SelectInput
            label="Faculty"
            placeholder={isPending ? "Loading faculty..." : "Select faculty"}
            options={facultyOptions}
            value={field.value}
            onChange={field.onChange}
            error={errors.faculty_id?.message}
          />
        )}
      />

      <Input
        label="Room"
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

      <Controller
        control={control}
        name="status"
        render={({ field }) => (
          <SelectInput
            label="Status"
            placeholder="Select status"
            options={COURSE_OFFERING_STATUS_OPTIONS}
            value={field.value}
            onChange={field.onChange}
            error={errors.status?.message}
          />
        )}
      />
    </div>
  );
}

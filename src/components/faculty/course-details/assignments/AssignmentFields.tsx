import Input from "@/components/ui/shared/Input";
import { AddAssignmentFormValues } from "@/validation/faculty.submitFile.schema";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import TextareaAutosize from "react-textarea-autosize";

interface AssignmentModalProps {
  register: UseFormRegister<AddAssignmentFormValues>;
  errors: FieldErrors<AddAssignmentFormValues>;
  isPending: boolean;
}

export default function AssignmentFields({
  register,
  errors,
  isPending,
}: AssignmentModalProps) {
  return (
    <>
      <Input
        type="text"
        label="Title"
        placeholder="e.g. Midterm Essay"
        disabled={isPending}
        autoComplete="off"
        error={errors.title?.message}
        {...register("title")}
      />

      <div className="space-y-2">
        <label
          htmlFor="addAssignmentDescription"
          className="text-text-secondary text-xs uppercase"
        >
          Description
        </label>
        <TextareaAutosize
          minRows={1}
          maxRows={4}
          id="addAssignmentDescription"
          disabled={isPending}
          autoComplete="off"
          placeholder="e.g. Write a 5-page essay on..."
          aria-invalid={!!errors.description}
          aria-describedby={
            errors.description ? "addAssignmentDescription-error" : undefined
          }
          {...register("description")}
          className="w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent resize-none cursor-auto"
        />
        {errors.description && (
          <p
            id="addAssignmentDescription-error"
            role="alert"
            className="text-red-500 text-xs"
          >
            {errors.description.message}
          </p>
        )}
      </div>

      <Input
        type="date"
        label="Due Date"
        disabled={isPending}
        autoComplete="off"
        error={errors.dueDate?.message}
        {...register("dueDate")}
      />

      <Input
        type="number"
        label="Max Grade"
        placeholder="e.g. 100"
        disabled={isPending}
        autoComplete="off"
        error={errors.maxGrade?.message}
        {...register("maxGrade", { valueAsNumber: true })}
      />
    </>
  );
}

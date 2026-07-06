import { AddAssignmentFormValues } from "@/validation/faculty/submitFile.schema";
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
      <div className="space-y-2">
        <label
          htmlFor="addAssignmentTitle"
          className="text-text-secondary text-xs uppercase"
        >
          Title
        </label>
        <input
          type="text"
          id="addAssignmentTitle"
          disabled={isPending}
          autoComplete="off"
          placeholder="e.g. Midterm Essay"
          aria-invalid={!!errors.title}
          aria-describedby={
            errors.title ? "addAssignmentTitle-error" : undefined
          }
          {...register("title")}
          className="w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
        />
        {errors.title && (
          <p
            id="addAssignmentTitle-error"
            role="alert"
            className="text-red-500 text-xs"
          >
            {errors.title.message}
          </p>
        )}
      </div>

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

      <div className="space-y-2">
        <label
          htmlFor="addAssignmentDueDate"
          className="text-text-secondary text-xs uppercase"
        >
          Due Date
        </label>
        <input
          type="date"
          id="addAssignmentDueDate"
          disabled={isPending}
          autoComplete="off"
          aria-invalid={!!errors.dueDate}
          aria-describedby={
            errors.dueDate ? "addAssignmentDueDate-error" : undefined
          }
          {...register("dueDate")}
          className="w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
        />
        {errors.dueDate && (
          <p
            id="addAssignmentDueDate-error"
            role="alert"
            className="text-red-500 text-xs"
          >
            {errors.dueDate.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <label
          htmlFor="addAssignmentMaxGrade"
          className="text-text-secondary text-xs uppercase"
        >
          Max Grade
        </label>
        <input
          type="number"
          id="addAssignmentMaxGrade"
          disabled={isPending}
          placeholder="e.g. 100"
          autoComplete="off"
          aria-invalid={!!errors.maxGrade}
          aria-describedby={
            errors.maxGrade ? "addAssignmentMaxGrade-error" : undefined
          }
          {...register("maxGrade", { valueAsNumber: true })}
          className="w-full border border-border rounded-md px-3 py-2 text-sm text-text-primary outline-none focus:border-accent"
        />
        {errors.maxGrade && (
          <p
            id="addAssignmentMaxGrade-error"
            role="alert"
            className="text-red-500 text-xs"
          >
            {errors.maxGrade.message}
          </p>
        )}
      </div>
    </>
  );
}

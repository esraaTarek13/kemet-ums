import { FacultyGradeStudent } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";
import { GradesFormValues } from "@/validation/gradesValidation";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import Image from "next/image";

export type GradeRow = FacultyGradeStudent & { id: string };

type GradesColumnsOptions = {
  canEnterMidterm: boolean;
  canEnterFinal: boolean;
  register: UseFormRegister<GradesFormValues>;
  errors: FieldErrors<GradesFormValues>;
};

// Converts empty/invalid input to undefined so optional zod fields work correctly.
function toOptionalNumber(value: unknown): number | undefined {
  if (value === "" || value === null || value === undefined) return undefined;
  const num = Number(value);
  return Number.isNaN(num) ? undefined : num;
}

export function getGradesColumns({
  canEnterMidterm,
  canEnterFinal,
  register,
  errors,
}: GradesColumnsOptions): Column<GradeRow>[] {
  return [
    {
      label: "Student Name",
      renderCell: (item: GradeRow) => (
        <div className="flex gap-2 items-center">
          <div className="w-9 h-9 rounded-full bg-accent/20 flex items-center justify-center shrink-0 overflow-hidden">
            {item.avatar_url ? (
              <Image
                src={item.avatar_url}
                alt={item.full_name}
                width={36}
                height={36}
                className="w-full h-full object-cover"
              />
            ) : (
              <span
                className="text-sm font-medium text-accent"
                aria-hidden="true"
              >
                {item.full_name.charAt(0)}
              </span>
            )}
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-xs md:text-sm font-bold text-text-primary">
              {item.full_name ?? "—"}
            </p>
            <span className="text-xs text-text-subtle">
              {item.student_code ?? "—"}
            </span>
          </div>
        </div>
      ),
    },
    {
      label: "Quiz",
      renderCell: (item: GradeRow) => {
        const fieldError = errors.grades?.[item.enrollment_id]?.quiz;
        return (
          <div className="flex flex-col gap-1">
            <input
              type="number"
              min={0}
              max={100}
              defaultValue={item.quiz ?? ""}
              aria-label={`Quiz grade for ${item.full_name}`}
              aria-invalid={!!fieldError}
              {...register(`grades.${item.enrollment_id}.quiz`, {
                setValueAs: toOptionalNumber,
              })}
              className={`inline-block w-16 px-2 py-1 bg-bg-card border rounded-md text-xs md:text-sm text-text-primary outline-none ${
                fieldError ? "border-red-400" : "border-border"
              }`}
            />
            {fieldError && (
              <span className="text-[10px] text-red-500">
                {fieldError.message}
              </span>
            )}
          </div>
        );
      },
    },
    {
      label: "Midterm",
      renderCell: (item: GradeRow) => {
        const fieldError = errors.grades?.[item.enrollment_id]?.midterm;
        return (
          <div className="flex flex-col gap-1">
            <input
              type="number"
              min={0}
              max={100}
              defaultValue={item.midterm ?? ""}
              disabled={!canEnterMidterm}
              aria-disabled={!canEnterMidterm}
              aria-label={`Midterm grade for ${item.full_name}`}
              aria-invalid={!!fieldError}
              {...register(`grades.${item.enrollment_id}.midterm`, {
                setValueAs: toOptionalNumber,
                disabled: !canEnterMidterm,
              })}
              className={`inline-block w-16 px-2 py-1 bg-bg-card border rounded-md text-xs md:text-sm text-text-primary outline-none ${
                fieldError ? "border-red-400" : "border-border"
              } ${
                !canEnterMidterm
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            />
            {fieldError && (
              <span className="text-[10px] text-red-500">
                {fieldError.message}
              </span>
            )}
          </div>
        );
      },
    },
    {
      label: "Final",
      renderCell: (item: GradeRow) => {
        const fieldError = errors.grades?.[item.enrollment_id]?.final;
        return (
          <div className="flex flex-col gap-1">
            <input
              type="number"
              min={0}
              max={100}
              defaultValue={item.final ?? ""}
              disabled={!canEnterFinal}
              aria-disabled={!canEnterFinal}
              aria-label={`Final grade for ${item.full_name}`}
              aria-invalid={!!fieldError}
              {...register(`grades.${item.enrollment_id}.final`, {
                setValueAs: toOptionalNumber,
                disabled: !canEnterFinal,
              })}
              className={`inline-block w-16 px-2 py-1 bg-bg-card border rounded-md text-xs md:text-sm text-text-primary outline-none ${
                fieldError ? "border-red-400" : "border-border"
              } ${
                !canEnterFinal
                  ? "opacity-50 cursor-not-allowed pointer-events-none"
                  : ""
              }`}
            />
            {fieldError && (
              <span className="text-[10px] text-red-500">
                {fieldError.message}
              </span>
            )}
          </div>
        );
      },
    },
    {
      label: "Grade",
      renderCell: (item: GradeRow) => item.grade ?? "—",
    },
  ];
}

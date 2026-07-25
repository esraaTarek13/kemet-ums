"use client";
import type { Control, FieldErrors } from "react-hook-form";
import type {
  EnrollStudentFormValues,
  EnrollStudentPayload,
} from "@/validation/enrollStudent.schema";
import { useEnrollCourseFields } from "@/hooks/admin/students/useEnrollCourseFields";
import MiniCardSkeleton from "@/components/ui/skeletons/MiniCardSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import SearchInput from "@/components/ui/shared/SearchInput";
import CourseOfferingRow from "./CourseOfferingRow";

interface EnrollCourseFieldsProps {
  studentId: string;
  control: Control<EnrollStudentFormValues, unknown, EnrollStudentPayload>;
  errors: FieldErrors<EnrollStudentFormValues>;
  search: string;
}

export default function EnrollCourseFields({
  studentId,
  control,
  errors,
  search,
}: EnrollCourseFieldsProps) {
  const { items, remainingCredits, maxCredits, isPending, isError, toggle } =
    useEnrollCourseFields({ studentId, search, control });

  if (isPending) return <MiniCardSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load available courses" />;

  return (
    <>
      {!isPending && !isError && (
        <p className="text-xs md:text-sm text-text-secondary py-3">
          {remainingCredits > 0 ? (
            <>
              You can add up to
              <span className="font-bold text-accent px-1">
                {remainingCredits}
              </span>
              more credit{remainingCredits !== 1 && "s"} this semester (max{" "}
              {maxCredits})
            </>
          ) : (
            <span className="font-semibold text-danger text-xs md:text-sm">
              Credit limit reached for this semester ({maxCredits} max).
            </span>
          )}
        </p>
      )}

      <div className="space-y-1">
        {!isPending && !isError && items.length === 0 && (
          <p className="text-text-secondary text-xs md:text-sm text-center py-6">
            No available courses found.
          </p>
        )}

        {errors.offering_ids && (
          <p role="alert" className="text-red-500 text-xs pt-1">
            {errors.offering_ids.message}
          </p>
        )}

        {items.map((offering) => (
          <CourseOfferingRow
            key={offering.offering_id}
            offering={offering}
            onToggle={() => toggle(offering.offering_id, offering.canToggle)}
          />
        ))}
      </div>
    </>
  );
}

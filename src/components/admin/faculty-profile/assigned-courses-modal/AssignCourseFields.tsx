import type { Control, FieldErrors } from "react-hook-form";
import type {
  AssignCourseFormValues,
  AssignCoursePayload,
} from "@/validation/assignCourse.schema";
import { useAssignCourseFields } from "@/hooks/admin/faculty/useAssignCourseFields";
import MiniCardSkeleton from "@/components/ui/skeletons/MiniCardSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";
import OfferingRow from "./OfferingRow";

interface AssignCourseFieldsProps {
  department: string;
  facultyId: string;
  control: Control<AssignCourseFormValues, unknown, AssignCoursePayload>;
  errors: FieldErrors<AssignCourseFormValues>;
}

export default function AssignCourseFields({
  department,
  facultyId,
  control,
  errors,
}: AssignCourseFieldsProps) {
  const {
    items,
    currentLoad,
    maxLoad,
    remainingSlots,
    isPending,
    isError,
    toggle,
  } = useAssignCourseFields({ department, facultyId, control });

  if (isPending) return <MiniCardSkeleton />;
  if (isError)
    return <ErrorMessage content="Failed to load assignable courses" />;

  return (
    <>
      <p className="text-xs md:text-sm text-text-secondary pb-3">
        {remainingSlots > 0 ? (
          <>
            You can assign up to
            <span className="font-bold text-accent px-1">{remainingSlots}</span>
            more course{remainingSlots !== 1 && "s"} ({currentLoad}/{maxLoad}
            currently assigned)
          </>
        ) : (
          <span className="font-semibold text-danger text-xs md:text-sm">
            This faculty member has reached the maximum of {maxLoad} courses.
            Unassign a course first.
          </span>
        )}
      </p>

      {items.length === 0 && (
        <p className="text-text-secondary text-xs md:text-sm text-center py-6">
          No assignable courses found in this department.
        </p>
      )}

      {errors.offering_ids && (
        <p role="alert" className="text-red-500 text-xs pt-1">
          {errors.offering_ids.message}
        </p>
      )}

      {items.map((offering) => (
        <OfferingRow
          key={offering.offering_id}
          offering={offering}
          onToggle={() => toggle(offering.offering_id, offering.canToggle)}
        />
      ))}
    </>
  );
}

import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";
import type {
  AssignCourseFormValues,
  AssignCoursePayload,
} from "@/validation/assignCourse.schema";
import { useAssignableOfferings } from "@/hooks/admin/faculty/queries/useAssignableOfferings";
import { useOfferingSelection } from "@/hooks/admin/faculty/useOfferingSelection";

interface UseAssignCourseFieldsParams {
  department: string;
  facultyId: string;
  control: Control<AssignCourseFormValues, unknown, AssignCoursePayload>;
}

export function useAssignCourseFields({
  department,
  facultyId,
  control,
}: UseAssignCourseFieldsParams) {
  const { data, isPending, isError } = useAssignableOfferings(
    department,
    facultyId,
  );

  const {
    field: { value, onChange },
  } = useController({ control, name: "offering_ids" });

  const offerings = data?.offerings ?? [];
  const currentLoad = data?.current_load ?? 0;
  const maxLoad = data?.max_load ?? 5;
  const currentSchedule = data?.current_schedule ?? [];
  const remainingSlots = Math.max(maxLoad - currentLoad, 0);
  const selected = value ?? [];

  const items = useOfferingSelection(
    offerings,
    currentSchedule,
    selected,
    remainingSlots,
  );

  function toggle(offeringId: string, canToggle: boolean) {
    if (!canToggle) return;

    const isCurrentlySelected = selected.includes(offeringId);

    onChange(
      isCurrentlySelected
        ? selected.filter((id) => id !== offeringId)
        : [...selected, offeringId],
    );
  }

  return {
    items,
    currentLoad,
    maxLoad,
    remainingSlots,
    isPending,
    isError,
    toggle,
  };
}

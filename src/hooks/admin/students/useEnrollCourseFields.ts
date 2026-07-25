import { useController } from "react-hook-form";
import type { Control } from "react-hook-form";
import type {
  EnrollStudentFormValues,
  EnrollStudentPayload,
} from "@/validation/enrollStudent.schema";
import { useStudentOfferingSelection } from "@/hooks/admin/students/useStudentOfferingSelection";
import { useAvailableOfferingsForEnrollment } from "./queries/useAvailableOfferingsForEnrollment";

interface UseEnrollCourseFieldsParams {
  studentId: string;
  search: string;
  control: Control<EnrollStudentFormValues, unknown, EnrollStudentPayload>;
}

export function useEnrollCourseFields({
  studentId,
  search,
  control,
}: UseEnrollCourseFieldsParams) {
  const { data, isPending, isError } = useAvailableOfferingsForEnrollment(
    studentId,
    search,
    true,
  );

  const {
    field: { value, onChange },
  } = useController({ control, name: "offering_ids" });

  const offerings = data?.offerings ?? [];
  const currentSchedule = data?.current_schedule ?? [];
  const maxCredits = data?.max_credits ?? 0;
  const currentCredits = data?.current_credits ?? 0;
  const selected = value ?? [];

  const items = useStudentOfferingSelection(
    offerings,
    currentSchedule,
    selected,
    currentCredits,
    maxCredits,
  );

  const selectedCredits = items
    .filter((o) => o.isSelected)
    .reduce((sum, o) => sum + o.credits, 0);
  const remainingCredits = maxCredits - currentCredits - selectedCredits;

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
    maxCredits,
    currentCredits,
    remainingCredits,
    isPending,
    isError,
    toggle,
  };
}

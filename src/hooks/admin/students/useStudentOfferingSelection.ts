import { useMemo } from "react";
import { hasScheduleConflict } from "@/lib/utils/admin/scheduleConflict";
import { AvailableOffering, OfferingScheduleSlot } from "@/types";

export interface OfferingWithStudentSelectionState extends AvailableOffering {
  isSelected: boolean;
  hasConflict: boolean;
  isFull: boolean;
  exceedsCreditLimit: boolean;
  isDisabled: boolean;
  canToggle: boolean;
}

export function useStudentOfferingSelection(
  offerings: AvailableOffering[],
  currentSchedule: OfferingScheduleSlot[],
  selected: string[],
  currentCredits: number,
  maxCredits: number,
) {
  return useMemo(() => {
    const offeringsMap = new Map(offerings.map((o) => [o.offering_id, o]));

    const selectedCredits = selected.reduce((sum, id) => {
      const o = offeringsMap.get(id);
      return sum + (o?.credits ?? 0);
    }, 0);

    const remainingCredits = maxCredits - currentCredits - selectedCredits;

    return offerings.map((offering) => {
      const isSelected = selected.includes(offering.offering_id);
      const isFull = offering.enrolled_count >= offering.max_students;

      const conflictsWithCurrent = currentSchedule.some((slot) =>
        hasScheduleConflict(slot, offering),
      );
      const conflictsWithSelection = selected.some((id) => {
        if (id === offering.offering_id) return false;
        const other = offeringsMap.get(id);
        return other ? hasScheduleConflict(other, offering) : false;
      });

      const hasConflict = conflictsWithCurrent || conflictsWithSelection;
      const exceedsCreditLimit =
        !isSelected && offering.credits > remainingCredits;
      const isDisabled =
        isFull || exceedsCreditLimit || (!isSelected && hasConflict);

      return {
        ...offering,
        isSelected,
        hasConflict,
        isFull,
        exceedsCreditLimit,
        isDisabled,
        canToggle: isSelected || !isDisabled,
      };
    });
  }, [offerings, currentSchedule, selected, currentCredits, maxCredits]);
}

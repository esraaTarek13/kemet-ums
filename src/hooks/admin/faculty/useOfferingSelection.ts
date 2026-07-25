import { useMemo } from "react";
import { hasScheduleConflict } from "@/lib/utils/admin/scheduleConflict";
import { AssignableOffering, FacultyScheduleSlot } from "@/types";

export interface OfferingWithSelectionState extends AssignableOffering {
  isSelected: boolean;
  hasConflict: boolean;
  isDisabled: boolean;
  atLimit: boolean;
  canToggle: boolean;
}

export function useOfferingSelection(
  offerings: AssignableOffering[],
  currentSchedule: FacultyScheduleSlot[],
  selected: string[],
  remainingSlots: number,
): OfferingWithSelectionState[] {
  return useMemo(() => {
    const atLimit = selected.length >= remainingSlots;

    const offeringsMap = new Map(offerings.map((o) => [o.offering_id, o]));

    return offerings.map((offering) => {
      const isSelected = selected.includes(offering.offering_id);

      const conflictsWithCurrent = currentSchedule.some((slot) =>
        hasScheduleConflict(slot, offering),
      );
      const conflictsWithSelection = selected.some((id) => {
        if (id === offering.offering_id) return false;
        const other = offeringsMap.get(id);
        return other ? hasScheduleConflict(other, offering) : false;
      });

      const hasConflict = conflictsWithCurrent || conflictsWithSelection;
      const isAtLimit = !isSelected && atLimit;
      const isDisabled = isAtLimit || (!isSelected && hasConflict);

      return {
        ...offering,
        isSelected,
        hasConflict,
        atLimit: isAtLimit,
        isDisabled,
        canToggle: isSelected || !isDisabled,
      };
    });
  }, [offerings, currentSchedule, selected, remainingSlots]);
}

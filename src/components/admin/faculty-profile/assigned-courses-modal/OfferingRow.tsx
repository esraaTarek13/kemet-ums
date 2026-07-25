import type { OfferingWithSelectionState } from "@/hooks/admin/faculty/useOfferingSelection";

interface OfferingRowProps {
  offering: OfferingWithSelectionState;
  onToggle: () => void;
}

export default function OfferingRow({ offering, onToggle }: OfferingRowProps) {
  const inputId = `offering-${offering.offering_id}`;

  return (
    <label
      htmlFor={inputId}
      className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl border-l-4 transition-colors ${
        offering.isDisabled
          ? "opacity-80 cursor-not-allowed border-transparent"
          : "cursor-pointer"
      } ${
        offering.isSelected
          ? "bg-bg-input border-accent"
          : "border-transparent hover:bg-bg-input"
      }`}
    >
      <span>
        <span className="font-bold text-accent text-xs md:text-sm">
          {offering.course_code}
          <span className="font-medium text-text-primary pl-1.5">
            {offering.course_name}
          </span>
        </span>

        {offering.current_faculty_name && (
          <span className="block text-xs text-text-secondary">
            Currently: {offering.current_faculty_name}
          </span>
        )}

        {!offering.isSelected && !offering.atLimit && offering.hasConflict && (
          <span className="block text-xs text-danger">
            Schedule conflict with an existing course
          </span>
        )}
      </span>

      <input
        id={inputId}
        type="checkbox"
        checked={offering.isSelected}
        disabled={offering.isDisabled}
        onChange={onToggle}
        className="outline-accent accent-accent md:w-4 md:h-4"
      />
    </label>
  );
}

import type { OfferingWithStudentSelectionState } from "@/hooks/admin/students/useStudentOfferingSelection";

interface CourseOfferingRowProps {
  offering: OfferingWithStudentSelectionState;
  onToggle: () => void;
}

export default function CourseOfferingRow({
  offering,
  onToggle,
}: CourseOfferingRowProps) {
  const inputId = `offering-${offering.offering_id}`;

  const warningMessage = offering.isSelected
    ? null
    : offering.isFull
      ? null 
      : offering.exceedsCreditLimit
        ? "Exceeds your remaining credit limit"
        : offering.hasConflict
          ? "Schedule conflict with an existing course"
          : null;

  return (
    <label
      htmlFor={inputId}
      className={`w-full flex items-center justify-between text-left px-4 py-3 rounded-xl border-l-4 transition-colors ${
        offering.isDisabled
          ? "opacity-50 cursor-not-allowed border-transparent"
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

        <span className="block text-xs text-text-secondary">
          {offering.credits}cr
          {offering.faculty_name ? ` · ${offering.faculty_name}` : ""}
          {offering.schedule ? ` · ${offering.schedule}` : ""}
          {offering.isFull ? " · Full" : ""}
        </span>

        {warningMessage && (
          <span className="block text-xs text-danger">{warningMessage}</span>
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

interface ClearButtonProps {
  onClear: () => void;
  className?: string;
}

export default function ClearButton({ onClear, className }: ClearButtonProps) {
  return (
    <button
      type="button"
      onClick={onClear}
      className={`text-text-secondary text-xs md:text-sm font-bold cursor-pointer ${className ?? ""}`}
    >
      Clear All
    </button>
  );
}
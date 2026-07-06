interface ClearButtonProps {
  onClear: () => void;
  className?: string;
}

export default function ClearButton({ onClear, className }: ClearButtonProps) {
  return (
    <button
      type="button"
      onClick={onClear}
      className={`min-w-fit text-text-secondary text-xs lg:text-sm font-bold cursor-pointer ${className ?? ""}`}
    >
      Clear All
    </button>
  );
}
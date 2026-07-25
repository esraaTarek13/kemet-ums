import { DAY_OF_WEEK_OPTIONS } from "@/data/admin/dayOfWeekOptions";

interface DayOfWeekCheckboxesProps {
  value: string[];
  onChange: (value: string[]) => void;
  error?: string;
}

export default function DayOfWeekCheckboxes({
  value,
  onChange,
  error,
}: DayOfWeekCheckboxesProps) {
  function toggleDay(day: string) {
    onChange(
      value.includes(day) ? value.filter((d) => d !== day) : [...value, day],
    );
  }

  return (
    <div className="flex flex-col gap-2 md:gap-3">
      <label className="font-bold text-[10px] md:text-xs text-text-secondary uppercase">
        Days
      </label>
      <div className="w-full flex gap-2 flex-wrap">
        {DAY_OF_WEEK_OPTIONS.map((day) => (
          <button
            key={day.value}
            type="button"
            onClick={() => toggleDay(day.value)}
            className={`px-3 py-1.5 rounded-md text-xs md:text-sm border cursor-pointer grow ${
              value.includes(day.value)
                ? "bg-accent text-white border-accent"
                : "bg-bg-input text-text-muted border-transparent"
            }`}
          >
            {day.label}
          </button>
        ))}
      </div>
      {error && (
        <span className="text-red-500 text-[10px] md:text-xs">{error}</span>
      )}
    </div>
  );
}
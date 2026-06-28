import { FilterBarProps } from "@/types/shared/filterConfig";
import { IoFilterSharp } from "react-icons/io5";
import FilterDropdown from "./FilterDropdown";
import ClearButton from "./ClearButton";

export default function FilterBar({
  filters,
  selectedValues,
  onChange,
  onClear,
}: FilterBarProps) {
  return (
    <div className="h-fit flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-bg-filter border-t-4 sm:border-t-0 sm:border-l-4 border-text-secondary py-4 px-6 md:px-8 rounded-lg">
      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <div className="flex items-center justify-between">
          <p className="flex gap-1.5 md:gap-3 items-center">
            <IoFilterSharp className="shrink-0 text-sm md:text-lg text-text-subtle" />
            <span className="text-accent text-xs md:text-sm font-bold min-w-fit">
              Filter By:
            </span>
          </p>
          <ClearButton onClear={onClear} className="sm:hidden" />
        </div>

        {filters.map((filter) => (
          <FilterDropdown
            key={filter.key}
            filterKey={filter.key}
            placeholder={filter.placeholder}
            options={filter.options}
            value={selectedValues[filter.key] ?? ""}
            onChange={onChange}
          />
        ))}
      </div>

      <ClearButton onClear={onClear} className="hidden sm:block" />
    </div>
  );
}

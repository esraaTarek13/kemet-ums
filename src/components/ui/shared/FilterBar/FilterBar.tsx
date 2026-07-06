import { FilterBarProps } from "@/types/shared/filterConfig";
import { IoFilterSharp } from "react-icons/io5";
import FilterDropdown from "./FilterDropdown";
import ClearButton from "./ClearButton";
import SearchInput from "./search/SearchInput";

export default function FilterBar({
  filters,
  selectedValues,
  onChange,
  onClear,
  searchValue,
  onSearchChange,
}: FilterBarProps) {
  return (
    <div className="h-fit flex flex-col lg:flex-row lg:items-center justify-between gap-3 bg-bg-filter border-t-4 lg:border-t-0 lg:border-l-4 border-text-secondary py-4 px-6 md:px-8 rounded-lg">
      <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4">
        <div className="flex items-center justify-between min-w-fit">
          <p className="flex gap-1.5 md:gap-3 items-center">
            <IoFilterSharp className="shrink-0 text-sm md:text-lg text-text-subtle" />
            <span className="text-accent text-xs md:text-sm font-bold min-w-fit">
              Filter By:
            </span>
          </p>
          <ClearButton onClear={onClear} className="lg:hidden" />
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

        <SearchInput value={searchValue} onChange={onSearchChange} />
      </div>

      <ClearButton onClear={onClear} className="hidden lg:block" />
    </div>
  );
}

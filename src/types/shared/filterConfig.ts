export type FilterOption = string | { label: string; value: string };

export interface FilterConfig {
  key: string;
  placeholder: string;
  options: (FilterOption | null)[];
}

export interface FilterBarProps {
  filters: FilterConfig[];
  selectedValues: Record<string, string>;
  onChange: (key: string, value: string) => void;
  onClear: () => void;
  searchValue: string;
  onSearchChange: (value: string) => void;
}
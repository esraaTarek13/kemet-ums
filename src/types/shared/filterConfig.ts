export interface FilterConfig {
  key: string;
  placeholder: string;
  options: (string | null)[];
}

export interface FilterBarProps {
  filters: FilterConfig[];
  selectedValues: Record<string, string>;  // ← required مش optional
  onChange: (key: string, value: string) => void;
  onClear: () => void;
}
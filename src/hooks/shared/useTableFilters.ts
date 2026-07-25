import { useState } from "react";

export function useTableFilters<T extends Record<string, string>>(initial: T) {
  const [filters, setFilters] = useState<T>(initial);
  const [page, setPage] = useState(0);
  const [search, setSearch] = useState("");

  function handleFilterChange(key: string, value: string) {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setPage(0);
  }

  function handleFilterClear() {
    setFilters(initial);
    setPage(0);
  }

  function handleSearchChange(value: string) {
    setSearch(value);
    setPage(0);
  }

  return { filters, page, search, setPage, handleFilterChange, handleFilterClear, handleSearchChange };
}
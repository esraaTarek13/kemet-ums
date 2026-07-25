"use client";

import { useState } from "react";
import { useSearchStudents } from "./queries/useSearchStudents";
import { StudentSearchResult } from "@/types";

interface UseStudentSearchPopoverParams {
  onSelectStudent: (student: StudentSearchResult) => void;
}

export function useStudentSearchPopover({
  onSelectStudent,
}: UseStudentSearchPopoverParams) {
  const [query, setQuery] = useState("");
  const [dismissed, setDismissed] = useState(false);
  const [prevQuery, setPrevQuery] = useState(query);

  // Reset "dismissed" whenever the query changes (valid render-time state sync,
  // same pattern used in SearchInput to sync local state with an external value)
  if (query !== prevQuery) {
    setPrevQuery(query);
    setDismissed(false);
  }

  const { data: results = [], isFetching } = useSearchStudents(query);

  const open = query.trim().length >= 2 && !dismissed;

  const handleOpenChange = (next: boolean) => {
    if (!next) {
      setDismissed(true);
      setQuery("");
    }
  };

  const handleSelect = (student: StudentSearchResult) => {
    onSelectStudent(student);
    setQuery("");
  };

  return {
    query,
    setQuery,
    results,
    isFetching,
    open,
    handleOpenChange,
    handleSelect,
  };
}

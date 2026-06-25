"use client";
import { useState, useCallback } from "react";
import SearchInput from "@/components/ui/shared/SearchInput";
import SearchResults from "./search-results/SearchResults";
import { useStudentSearch } from "@/hooks/student/useSearch";

export default function Search() {
  const [term, setTerm] = useState("");
  const { data: res, isPending, isError } = useStudentSearch(term);

  const showResults = term.trim().length >= 2;

  const handleClose = useCallback(() => setTerm(""), []);

  return (
    <SearchInput
      value={term}
      onChange={setTerm}
      onClose={handleClose}
      results={
        showResults ? (
          <SearchResults
            data={res}
            loading={isPending}
            isError={isError}
            onClose={handleClose}
          />
        ) : null
      }
    />
  );
}

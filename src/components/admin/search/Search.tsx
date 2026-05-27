"use client";
import { useState, useCallback } from "react";
import { useSearch } from "@/hooks/admin/useSearch";
import SearchResults from "./SearchResults";
import SearchInput from "@/components/ui/SearchInput";

export default function Search() {
  const [term, setTerm] = useState("");
  const { data: res, isPending, isError } = useSearch(term);
  const showResults = term.trim().length >= 2;

  const handleClose = useCallback(() => setTerm(""), []);

  return (
    <SearchInput
      value={term}
      onChange={setTerm}
      onClose={handleClose}
      results={
        showResults ? (
          <SearchResults data={res} loading={isPending} isError={isError} onClose={handleClose} />
        ) : null
      }
    />
  );
}

"use client";

import SearchInput from "@/components/ui/shared/SearchInput";
import { useCallback, useState } from "react";
import SearchResults from "./search-results/SearchResults";
import { useFacultySearch } from "@/hooks/faculty/useSearch";


export default function Search() {
  const [term, setTerm] = useState("");
  const { data: res, isPending, isError } = useFacultySearch(term);
  
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

"use client";

import * as Popover from "@radix-ui/react-popover";
import SearchInput from "@/components/ui/shared/FilterBar/search/SearchInput";
import { StudentSearchResult } from "@/types";
import SelectedStudentCard from "./SelectedStudentCard";
import { useStudentSearchPopover } from "@/hooks/admin/payments/useStudentSearchPopover";

interface StudentSearchProps {
  selectedStudent: StudentSearchResult | null;
  onSelectStudent: (student: StudentSearchResult | null) => void;
}

export default function StudentSearch({
  selectedStudent,
  onSelectStudent,
}: StudentSearchProps) {
  const {
    query,
    setQuery,
    results,
    isFetching,
    open,
    handleOpenChange,
    handleSelect,
  } = useStudentSearchPopover({ onSelectStudent });

  if (selectedStudent) {
    return (
      <SelectedStudentCard
        student={selectedStudent}
        onChange={() => onSelectStudent(null)}
      />
    );
  }

  return (
    <Popover.Root open={open} onOpenChange={handleOpenChange}>
      <Popover.Anchor asChild>
        <div>
          <SearchInput
            value={query}
            onChange={setQuery}
            placeholder="Search by student name or code..."
            bgColor="bg-bg-filter"
          />
        </div>
      </Popover.Anchor>

      <Popover.Portal>
        <Popover.Content
          onOpenAutoFocus={(e) => e.preventDefault()}
          className="w-(--radix-popover-trigger-width) card p-2 rounded-lg shadow-md z-50"
          sideOffset={4}
        >
          {isFetching && (
            <p className="text-text-secondary text-xs md:text-sm text-center py-3">
              Searching...
            </p>
          )}

          {!isFetching && results.length > 0 && (
            <div className="max-h-64 overflow-y-auto pr-2">
              {results.map((student) => (
                <button
                  key={student.id}
                  type="button"
                  onClick={() => handleSelect(student)}
                  className="w-full px-3 py-2 md:py-3 rounded-lg text-left hover:bg-primary/10 "
                >
                  <span className="font-medium text-xs md:text-sm">
                    {student.full_name}
                  </span>{" "}
                  <span className="text-text-secondary text-[10px] md:text-xs">
                    — {student.student_code}
                  </span>
                </button>
              ))}
            </div>
          )}

          {!isFetching && results.length === 0 && (
            <p className="text-text-secondary text-xs md:text-sm text-center py-3">
              No students found
            </p>
          )}
        </Popover.Content>
      </Popover.Portal>
    </Popover.Root>
  );
}

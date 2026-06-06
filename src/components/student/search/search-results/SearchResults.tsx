"use client";
import type {
  StudentSearchResults,
  StudentSearchCourse,
  StudentSearchFaculty,
} from "@/types";
import { FiBook, FiUsers, FiAlertCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import SearchSection from "./SearchSection";
import ResultItem from "./ResultItem";

const STUDENT_BASE = "/student";

interface SearchResultsProps {
  data: StudentSearchResults | undefined;
  loading: boolean;
  isError: boolean;
  onClose: () => void;
}

export default function SearchResults({
  data,
  loading,
  isError,
  onClose,
}: SearchResultsProps) {
  const router = useRouter();

  if (loading)
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-4 text-text-subtle text-sm text-center"
      >
        Searching...
      </div>
    );

  if (isError)
    return (
      <div
        role="alert"
        className="p-4 text-sm text-center flex items-center justify-center gap-2 text-red-500"
      >
        <FiAlertCircle aria-hidden="true" />
        Something went wrong. Try again.
      </div>
    );

  const hasCourses = !!data?.courses?.length;
  const hasFaculty = !!data?.faculty?.length;

  if (!hasCourses && !hasFaculty)
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-4 text-text-subtle text-sm text-center"
      >
        No results found.
      </div>
    );

  // navigate and dismiss search
  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

  return (
    <div
      role="list"
      aria-label="Search results"
      className="flex flex-col gap-3 py-2 max-h-80 overflow-y-auto"
    >
      {hasCourses && (
        <SearchSection title="Courses" icon={<FiBook aria-hidden="true" />}>
          {data?.courses?.map((course: StudentSearchCourse) => (
            <ResultItem
              key={course.id}
              title={course.course_name}
              subtitle={`${course.course_code} · ${course.faculty_name}`}
              onClick={() =>
                handleNavigate(`${STUDENT_BASE}/courses/${course.id}`)
              }
            />
          ))}
        </SearchSection>
      )}

      {hasFaculty && (
        <SearchSection title="Faculty" icon={<FiUsers aria-hidden="true" />}>
          {data?.faculty?.map((f: StudentSearchFaculty) => (
            <ResultItem
              key={f.id}
              title={f.full_name}
              subtitle={`${f.faculty_code} · ${f.department}`}
              onClick={() => handleNavigate(`${STUDENT_BASE}/faculty/${f.id}`)}
            />
          ))}
        </SearchSection>
      )}
    </div>
  );
}

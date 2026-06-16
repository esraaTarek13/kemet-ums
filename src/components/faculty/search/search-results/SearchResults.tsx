"use client";

import {
  FacultySearchCourse,
  FacultySearchResults,
  FacultySearchStudent,
} from "@/types";
import { useRouter } from "next/navigation";
import { FiAlertCircle, FiBook, FiUser } from "react-icons/fi";
import SearchSection from "./SearchSection";
import ResultItem from "./ResultItem";

const FACULTY_BASE = "/faculty";

interface SearchResultsProps {
  data: FacultySearchResults | undefined;
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

  // navigate and dismiss search
  const handleNavigate = (path: string) => {
    router.push(path);
    onClose();
  };

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
  const hasStudents = !!data?.students?.length;

  if (!hasCourses && !hasStudents)
    return (
      <div
        role="status"
        aria-live="polite"
        className="p-4 text-text-subtle text-sm text-center"
      >
        No results found.
      </div>
    );

  return (
    <div
      role="list"
      aria-label="Search results"
      className="flex flex-col gap-3 py-2 max-h-80 overflow-y-auto"
    >
      {hasCourses ? (
        <SearchSection title="Courses" icon={<FiBook aria-hidden="true" />}>
          {data?.courses?.map((course: FacultySearchCourse) => (
            <ResultItem
              key={course.id}
              title={course.course_name}
              subtitle={`${course.course_code} · ${course.enrolled_count} students`}
              onClick={() =>
                handleNavigate(`${FACULTY_BASE}/courses/${course.id}`)
              }
            />
          ))}
        </SearchSection>
      ) : null}

      {hasStudents ? (
        <SearchSection title="Students" icon={<FiUser aria-hidden="true" />}>
          {data?.students?.map((student: FacultySearchStudent) => (
            <ResultItem
              key={student.id}
              title={student.full_name}
              subtitle={`${student.department} · ${student.student_code}`}
              onClick={() =>
                handleNavigate(`${FACULTY_BASE}/students/${student.id}`)
              }
            />
          ))}
        </SearchSection>
      ) : null}
    </div>
  );
}

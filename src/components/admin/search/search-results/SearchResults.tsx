"use client";

import {
  AdminSearchResults,
  SearchStudent,
  SearchFaculty,
  SearchCourse,
} from "@/types";
import { FiUser, FiBook, FiUsers, FiAlertCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";
import SearchSection from "./SearchSection";
import ResultItem from "./ResultItem";
import { useAuthStore } from "@/stores/authStore";
import { ROLE_BASE_ROUTES } from "@/data/shared/roles";

interface Props {
  data: AdminSearchResults | undefined;
  loading: boolean;
  isError: boolean;
  onClose: () => void;
}

export default function SearchResults({
  data,
  loading,
  isError,
  onClose,
}: Props) {
  const router = useRouter();
  const { user } = useAuthStore();
  const base = ROLE_BASE_ROUTES[user?.role ?? ""] ?? "/";

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

  const hasStudents = !!data?.students?.length;
  const hasFaculty = !!data?.faculty?.length;
  const hasCourses = !!data?.courses?.length;

  if (!hasStudents && !hasFaculty && !hasCourses)
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
      {hasStudents && (
        <SearchSection title="Students" icon={<FiUser aria-hidden="true" />}>
          {data!.students!.map((s: SearchStudent) => (
            <ResultItem
              key={s.id}
              title={s.full_name}
              subtitle={`${s.student_code} · ${s.department}`}
              onClick={() => handleNavigate(`${base}/students/${s.id}`)}
            />
          ))}
        </SearchSection>
      )}

      {hasFaculty && (
        <SearchSection title="Faculty" icon={<FiUsers aria-hidden="true" />}>
          {data!.faculty!.map((f: SearchFaculty) => (
            <ResultItem
              key={f.id}
              title={f.full_name}
              subtitle={`${f.faculty_code} · ${f.department}`}
              onClick={() => handleNavigate(`${base}/faculty/${f.id}`)}
            />
          ))}
        </SearchSection>
      )}

      {hasCourses && (
        <SearchSection title="Courses" icon={<FiBook aria-hidden="true" />}>
          {data!.courses!.map((c: SearchCourse) => (
            <ResultItem
              key={c.offering_id}
              title={c.course_name}
              subtitle={`${c.course_code} · ${c.department}`}
              onClick={() => handleNavigate(`${base}/courses/${c.offering_id}`)}
            />
          ))}
        </SearchSection>
      )}
    </div>
  );
}

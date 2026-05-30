"use client";
import type {
  StudentSearchResults,
  StudentSearchCourse,
  StudentSearchFaculty,
} from "@/types";
import { FiBook, FiUsers, FiAlertCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

// base path for all student routes
const STUDENT_BASE = "/student";

interface Props {
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
}: Props) {
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

  // navigate to result and dismiss search
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
        <Section title="Courses" icon={<FiBook aria-hidden="true" />}>
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
        </Section>
      )}

      {hasFaculty && (
        <Section title="Faculty" icon={<FiUsers aria-hidden="true" />}>
          {data?.faculty?.map((f: StudentSearchFaculty) => (
            <ResultItem
              key={f.id}
              title={f.full_name}
              subtitle={`${f.faculty_code} · ${f.department}`}
              onClick={() => handleNavigate(`${STUDENT_BASE}/faculty/${f.id}`)}
            />
          ))}
        </Section>
      )}
    </div>
  );
}

// groups results under a labeled section header
function Section({
  title,
  icon,
  children,
}: {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <div role="group" aria-label={title}>
      <div
        aria-hidden="true"
        className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-text-subtle uppercase tracking-wider"
      >
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

// single result row — navigates on click
function ResultItem({
  title,
  subtitle,
  onClick,
}: {
  title: string;
  subtitle: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="listitem"
      aria-label={`${title} — ${subtitle}`}
      onClick={onClick}
      className="w-full flex flex-col px-4 py-2 hover:bg-accent/10 cursor-pointer transition-colors text-left"
    >
      <span className="text-xs md:text-sm text-text-primary font-medium">
        {title}
      </span>
      <span aria-hidden="true" className="text-xs text-text-subtle">
        {subtitle}
      </span>
    </button>
  );
}

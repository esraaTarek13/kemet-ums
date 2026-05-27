"use client";
import {
  StudentSearchResults,
  StudentSearchCourse,
  StudentSearchFaculty,
} from "@/types";
import { FiBook, FiUsers, FiAlertCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

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
  const base = "/student";

  if (loading)
    return (
      <div className="p-4 text-text-subtle text-sm text-center">
        Searching...
      </div>
    );

  if (isError)
    return (
      <div className="p-4 text-sm text-center flex items-center justify-center gap-2 text-red-500">
        <FiAlertCircle /> Something went wrong. Try again.
      </div>
    );

  const hasCourses = !!data?.courses?.length;
  const hasFaculty = !!data?.faculty?.length;

  if (!hasCourses && !hasFaculty) {
    return (
      <div className="p-4 text-text-subtle text-sm text-center">
        No results found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 py-2 max-h-80 overflow-y-auto">
      {hasCourses && (
        <Section title="Courses" icon={<FiBook />}>
          {data!.courses!.map((course: StudentSearchCourse) => (
            <ResultItem
              key={course.id}
              title={course.course_name}
              subtitle={`${course.course_code} · ${course.faculty_name}`}
              onClick={() => {
                router.push(`${base}/courses/${course.id}`);
                onClose();
              }}
            />
          ))}
        </Section>
      )}
      {hasFaculty && (
        <Section title="Faculty" icon={<FiUsers />}>
          {data!.faculty!.map((f: StudentSearchFaculty) => (
            <ResultItem
              key={f.id}
              title={f.full_name}
              subtitle={`${f.faculty_code} · ${f.department}`}
              onClick={() => {
                router.push(`${base}/faculty/${f.id}`);
                onClose();
              }}
            />
          ))}
        </Section>
      )}
    </div>
  );
}

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
    <div>
      <div className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-text-subtle uppercase tracking-wider">
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}

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
    <div
      onClick={onClick}
      className="flex flex-col px-4 py-2 hover:bg-accent/10 cursor-pointer transition-colors"
    >
      <span className="text-xs md:text-sm text-text-primary font-medium">
        {title}
      </span>
      <span className="text-xs text-text-subtle">{subtitle}</span>
    </div>
  );
}

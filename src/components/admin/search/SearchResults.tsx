"use client";
import {
  AdminSearchResults,
  SearchStudent,
  SearchFaculty,
  SearchCourse,
} from "@/types";
import { FiUser, FiBook, FiUsers, FiAlertCircle } from "react-icons/fi";
import { useRouter } from "next/navigation";

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
  const base = "/admin";

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

  const hasStudents = !!data?.students?.length;
  const hasFaculty = !!data?.faculty?.length;
  const hasCourses = !!data?.courses?.length;

  if (!hasStudents && !hasFaculty && !hasCourses) {
    return (
      <div className="p-4 text-text-subtle text-sm text-center">
        No results found.
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 py-2 max-h-80 overflow-y-auto">
      {hasStudents && (
        <Section title="Students" icon={<FiUser />}>
          {data!.students!.map((s: SearchStudent) => (
            <ResultItem
              key={s.id}
              title={s.full_name}
              subtitle={`${s.student_code} · ${s.department}`}
              onClick={() => {
                router.push(`${base}/students/${s.id}`);
                onClose();
              }}
            />
          ))}
        </Section>
      )}
      {hasFaculty && (
        <Section title="Faculty" icon={<FiUsers />}>
          {data!.faculty!.map((f: SearchFaculty) => (
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
      {hasCourses && (
        <Section title="Courses" icon={<FiBook />}>
          {data!.courses!.map((c: SearchCourse) => (
            <ResultItem
              key={c.id}
              title={c.course_name}
              subtitle={`${c.course_code} · ${c.department}`}
              onClick={() => {
                router.push(`${base}/courses/${c.id}`);
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

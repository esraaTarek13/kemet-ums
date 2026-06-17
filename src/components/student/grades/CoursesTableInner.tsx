"use client";
import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { useStudentGrades } from "@/hooks/student/useStudentGrades";
import { GradesCourse } from "@/types";
import { TableSkeleton } from "@/components/ui/skeletons/TableSkeleton";
import ErrorMessage from "@/components/ui/shared/ErrorMessage";

const StatusBadge = ({ status }: { status: string }) => {
  const isCompleted = status === "completed";
  return (
    <span
      className={`flex items-center justify-center px-2 py-1 rounded-sm text-xs font-semibold ${
        isCompleted
          ? "text-success bg-success-bg"
          : "text-text-secondary/80 bg-bg-filter"
      }`}
    >
      {status}
    </span>
  );
};

const COLUMNS = [
  { label: "Code", renderCell: (item: GradesCourse) => item.course_code },
  {
    label: "Credits",
    renderCell: (item: GradesCourse) => `${item.credits} cr`,
  },
  { label: "Quiz", renderCell: (item: GradesCourse) => item.quiz ?? "—" },
  { label: "Midterm", renderCell: (item: GradesCourse) => item.midterm ?? "—" },
  { label: "Final", renderCell: (item: GradesCourse) => item.final ?? "—" },
  { label: "Grade", renderCell: (item: GradesCourse) => item.grade ?? "—" },
  {
    label: "Status",
    renderCell: (item: GradesCourse) => <StatusBadge status={item.status} />,
  },
];

export default function CoursesTableInner() {
  const { data, isPending, isError } = useStudentGrades();
  const grades = data?.courses ?? [];

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: minmax(120px, 20%) minmax(100px, 12%) minmax(90px, 12%) minmax(110px, 12%) minmax(90px, 12%) minmax(100px, 12%) minmax(120px, 20%);
        background: var(--color-bg-card);
        border: 1px solid var(--color-bg-bar);
        border-radius: var(--radius-xl);
      `,
      HeaderRow: `
        background-color: var(--color-bg-bar);
        color: var(--color-text-secondary);
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
      `,
      HeaderCell: `
        padding: 16px 24px;
        border-bottom: 1px solid var(--color-border);
      `,
      Row: `
        &:hover {
          background-color: #FBF7EE80;
        }
      `,
      Cell: `
        &:nth-of-type(1) {
          font-weight: bold;
        }
        padding: 16px 26px;
        border-bottom: 1px solid var(--color-bg-filter);
        color: var(--color-text-primary);
        font-size: 14px;
        font-weight: 500;
      `,
    },
  ]);

  if (isPending) return <TableSkeleton />;
  if (isError) return <ErrorMessage content="Failed to load grades." />;

  if (grades.length === 0) {
    return (
      <p className="text-center text-text-subtle py-8">
        No grades available yet.
      </p>
    );
  }

  const tableData = {
    nodes: grades.map((g) => ({ ...g, id: g.course_id })),
  };
  return (
    <div role="region" aria-label="Course grades table">
      <CompactTable
        columns={COLUMNS}
        data={tableData}
        theme={theme}
        layout={{ custom: true, horizontalScroll: true }}
      />
    </div>
  );
}

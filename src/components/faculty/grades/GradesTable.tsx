import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { getGradesColumns, GradeRow } from "@/data/faculty/gradesColumns";
import { FacultyGradeStudent } from "@/types";
import { useMemo } from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { GradesFormValues } from "@/validation/gradesValidation";

interface GradesTableProps {
  students: FacultyGradeStudent[];
  canEnterMidterm: boolean;
  canEnterFinal: boolean;
  register: UseFormRegister<GradesFormValues>;
  errors: FieldErrors<GradesFormValues>;
}

export default function GradesTable({
  students,
  canEnterMidterm,
  canEnterFinal,
  register,
  errors,
}: GradesTableProps) {
  const tableData = useMemo(
    () => ({
      nodes: students.map((s) => ({ ...s, id: s.enrollment_id })) as GradeRow[],
    }),
    [students],
  );

  const columns = useMemo(
    () =>
      getGradesColumns({ canEnterMidterm, canEnterFinal, register, errors }),
    [canEnterMidterm, canEnterFinal, register, errors],
  );

  const gridTemplateColumns = columns.map(() => "minmax(140px, 20%)").join(" ");

  const theme = useTheme([
    getTheme(),
    {
      Table: `
      --data-table-library_grid-template-columns: ${gridTemplateColumns};

    `,
      HeaderRow: `
      background-color: var(--color-bg-bar);
      color: var(--color-text-secondary);
      text-transform: uppercase;
      font-size: 12px;
      font-weight: bold;

      @media (max-width: 768px) {
        font-size: 11px;
      }
    `,
      HeaderCell: `
      padding: clamp(10px, 1.5vw, 16px) clamp(12px, 2vw, 24px);
      border-bottom: 1px solid var(--color-border);
      
      @media (max-width: 480px) {
        padding: 8px 10px;
      }
    `,
      Cell: `
      &:nth-of-type(1) {
        font-weight: bold;
      }
      padding: clamp(10px, 1.5vw, 16px) clamp(12px, 2vw, 26px);
      border-bottom: 1px solid var(--color-bg-filter);

      @media (max-width: 480px) {
        padding: 8px 10px;
      }
    `,
    },
  ]);

  if (tableData.nodes.length === 0) {
    return (
      <p className="text-center text-xs md:text-sm text-text-subtle py-8">
        No students yet.
      </p>
    );
  }
  return (
    <CompactTable
      columns={columns}
      data={tableData}
      theme={theme}
      layout={{ custom: true, horizontalScroll: true }}
    />
  );
}

import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Column } from "@table-library/react-table-library/types/compact";
import { TableNode } from "@table-library/react-table-library/types/table";

interface TableProps<T extends TableNode> {
  tableData: { nodes: T[] };
  columns: Column<T>[];
}

const MAX_ROWS = 5;
const ROW_HEIGHT = 50;
const headerHeight = 50;

export default function Table<T extends TableNode>({
  tableData,
  columns,
}: TableProps<T>) {
  // generate equal-width columns dynamically based on actual column count
  const gridTemplateColumns = columns.map(() => "minmax(160px, 20%)").join(" ");

  const isScrollable = tableData.nodes.length > MAX_ROWS;
  const containerHeight = isScrollable
    ? MAX_ROWS * ROW_HEIGHT + headerHeight
    : undefined;

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
      Row: `
      &:hover {
        background-color: #FBF7EE80;
      }
    `,
      Cell: `
      &:nth-of-type(1) {
        font-weight: bold;
      }
      padding: clamp(10px, 1.5vw, 16px) clamp(12px, 2vw, 26px);
      border-bottom: 1px solid var(--color-bg-filter);
      color: var(--color-text-primary);
      font-size: 14px;

      @media (max-width: 768px) {
        font-size: 13px;
      }

      @media (max-width: 480px) {
        font-size: 12px;
        padding: 8px 10px;
      }
    `,
    },
  ]);

  return (
    <div style={{ height: containerHeight }}>
      <CompactTable
        columns={columns}
        data={tableData}
        theme={theme}
        layout={{
          custom: true,
          horizontalScroll: true,
          isDiv: true,
          fixedHeader: isScrollable,
        }}
      />
    </div>
  );
}

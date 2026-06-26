import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Column } from "@table-library/react-table-library/types/compact";
import { TableNode } from "@table-library/react-table-library/types/table";

interface TableProps<T extends TableNode> {
  tableData: { nodes: T[] };
  columns: Column<T>[];
}

const MAX_ROWS = 9;
const ROW_HEIGHT = 50;
const headerHeight = 50;

export default function Table<T extends TableNode>({
  tableData,
  columns,
}: TableProps<T>) {
  // generate equal-width columns dynamically based on actual column count
  const gridTemplateColumns = columns.map(() => "minmax(140px, 20%)").join(" ");

  const isScrollable = tableData.nodes.length > MAX_ROWS;
  const containerHeight = isScrollable
    ? MAX_ROWS * ROW_HEIGHT + headerHeight
    : undefined;

  const theme = useTheme([
    getTheme(),
    {
      Table: `
        --data-table-library_grid-template-columns: ${gridTemplateColumns};     
        border: 1px solid var(--color-bg-bar);
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
          isDiv: isScrollable,
          fixedHeader: isScrollable,
        }}
      />
    </div>
  );
}

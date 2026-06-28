import { StudentRow } from "@/data/faculty/studentsColumns";
import { FacultyStudent } from "@/types";
import { CompactTable } from "@table-library/react-table-library/compact";
import { usePagination } from "@table-library/react-table-library/pagination";
import { useTheme } from "@table-library/react-table-library/theme";
import { Column } from "@table-library/react-table-library/types/compact";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import { handleExport } from "@/lib/utils/handleExport";

interface TableProps {
  tableData: { nodes: (FacultyStudent & { id: string })[] };
  columns: Column<StudentRow>[];
}

export default function Table({ tableData, columns }: TableProps) {
  // minmax ensures columns share space evenly with horizontal scroll fallback
  const gridTemplateColumns = columns.map(() => "minmax(150px, 20%)").join(" ");

  const theme = useTheme({
    Table: `
        --data-table-library_grid-template-columns: ${gridTemplateColumns};     
      `,
    HeaderRow: `
        background-color: var(--color-accent);
        color: var(--color-text-white);
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
      `,
    HeaderCell: `
        padding: 16px 24px;
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
        background-color: var(--color-bg);
        padding: 20px 26px;
        border-bottom: 1px solid var(--color-bg-filter);
        color: var(--color-text-primary);
        font-size: 14px;
      `,
  });

  const pagination = usePagination(tableData, {
    state: { page: 0, size: 7 },
    onChange: () => {},
  });

  const totalPages = pagination.state.getTotalPages(tableData.nodes);

  return (
    <div>
      <CompactTable
        columns={columns}
        data={tableData}
        theme={theme}
        pagination={pagination}
        layout={{ custom: true, horizontalScroll: true }}
      />

      <div className="flex items-center justify-between mt-5 bg-bg-filter border-l-4 border-text-secondary py-4 px-6 md:px-8 rounded-lg ">
        <button
          type="button"
          title="Export"
          onClick={() => handleExport(tableData)}
          className="flex items-center gap-2 text-text-muted text-xs md:text-sm font-bold bg-bg border border-[#D8C1C3] rounded-lg py-2 px-3 cursor-pointer"
        >
          <BiExport />
          <span className="hidden sm:block">Export</span>
        </button>

        {totalPages > 1 && (
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page - 1)
              }
              disabled={pagination.state.page === 0}
              aria-label="Previous page"
              type="button"
              className="p-2 rounded hover:bg-bg-filter disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <FaChevronLeft className="text-text-muted text-xs md:text-sm" />
            </button>

            {Array.from({ length: totalPages }, (__, index) => (
              <button
                key={index}
                aria-label={`Page ${index + 1}`}
                aria-current={
                  pagination.state.page === index ? "page" : undefined
                }
                type="button"
                onClick={() => pagination.fns.onSetPage(index)}
                className={`w-6 md:w-8 h-6 md:h-8 rounded text-xs md:text-sm transition-colors cursor-pointer ${
                  pagination.state.page === index
                    ? "bg-accent text-text-white font-bold"
                    : "text-text-muted hover:bg-bg-filter"
                }`}
              >
                {index + 1}
              </button>
            ))}

            <button
              onClick={() =>
                pagination.fns.onSetPage(pagination.state.page + 1)
              }
              aria-label="Next page"
              type="button"
              disabled={pagination.state.page + 1 === totalPages}
              className="p-2 rounded hover:bg-bg-filter disabled:opacity-40 disabled:cursor-not-allowed transition-colors cursor-pointer"
            >
              <FaChevronRight className="text-text-muted text-xs md:text-sm" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

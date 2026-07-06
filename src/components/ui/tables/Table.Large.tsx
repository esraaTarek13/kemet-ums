import { CompactTable } from "@table-library/react-table-library/compact";
import { useTheme } from "@table-library/react-table-library/theme";
import { getTheme } from "@table-library/react-table-library/baseline";
import { Column } from "@table-library/react-table-library/types/compact";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { BiExport } from "react-icons/bi";
import { useRowSelect } from "@table-library/react-table-library/select";
import { useMemo } from "react";

interface TableProps<T extends { id: string } = { id: string }> {
  tableData: { nodes: T[] };
  columns: Column<T>[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onExport?: (selectedNodes: T[]) => void;
  // Persisted across pages by the parent, since this component unmounts on page change.
  selectedMap: Map<string, T>;
  onSelectedMapChange: (map: Map<string, T>) => void;
}

export default function Table<T extends { id: string }>({
  tableData,
  columns,
  page,
  totalPages,
  onPageChange,
  onExport,
  selectedMap,
  onSelectedMapChange,
}: TableProps<T>) {
  const currentPageIds = useMemo(
    () => tableData.nodes.map((n) => n.id),
    [tableData],
  );

  // Only the ids visible on this page are passed to useRowSelect,
  // since it has no knowledge of rows from other pages.
  const selectedIdsInThisPage = useMemo(
    () => currentPageIds.filter((id) => selectedMap.has(id)),
    [currentPageIds, selectedMap],
  );

  const allSelectedThisPage = useMemo(
    () =>
      currentPageIds.length > 0 &&
      currentPageIds.every((id) => selectedMap.has(id)),
    [currentPageIds, selectedMap],
  );

  const select = useRowSelect(tableData, {
    state: { ids: selectedIdsInThisPage },
    onChange: (_action, state) => {
      const nodesById = new Map(tableData.nodes.map((n) => [n.id, n]));

      // Merge strategy: drop this page's old selection, apply the new one,
      // and leave every other page's selection untouched.
      const next = new Map(selectedMap);
      currentPageIds.forEach((id) => next.delete(id));
      state.ids.forEach((id: string) => {
        const node = nodesById.get(id);
        if (node) next.set(id, node);
      });

      onSelectedMapChange(next);
    },
  });

  function handleExportClick() {
    if (!onExport) return;
    onExport(Array.from(selectedMap.values()));
  }

  const gridTemplateColumns = useMemo(
    () => `80px repeat(${columns.length}, minmax(150px, 1fr))`,
    [columns.length],
  );

  const theme = useTheme([
    getTheme(),
    {
      Table: `--data-table-library_grid-template-columns: ${gridTemplateColumns};`,
      HeaderRow: `
        background-color: var(--color-accent);
        color: var(--color-text-white);
        text-transform: uppercase;
        font-size: 12px;
        font-weight: bold;
        @media (max-width: 768px) {
        font-size: 10px;
      }
      `,
      Row: `&:hover { background-color: #FBF7EE80; }`,
      Cell: `
        &:nth-of-type(2) { font-weight: bold; }
        background-color: var(--color-bg);
        border-bottom: 1px solid var(--color-bg-filter);
        color: var(--color-text-primary);
        font-size: 14px;
        @media (max-width: 768px) {
        font-size: 12px;
      }
      `,
      BaseCell: `
      &:not(:first-of-type) {
        box-sizing: border-box;
        padding: clamp(8px, 2vw, 20px);
      }`,
    },
  ]);

  return (
    <div>
      <CompactTable
        columns={columns}
        data={tableData}
        theme={theme}
        select={select}
        layout={{ custom: true, horizontalScroll: true }}
      />

      <div className="flex items-center justify-between mt-5 bg-bg-filter border-l-4 border-text-secondary py-4 px-6 md:px-8 rounded-lg">
        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-2 md:gap-3">
            <input
              type="checkbox"
              id="select-all"
              checked={allSelectedThisPage}
              ref={(el) => {
                if (el) {
                  // Indeterminate: some rows are selected (this page or others) but not all on this page.
                  el.indeterminate =
                    !allSelectedThisPage && selectedMap.size > 0;
                }
              }}
              onChange={select.fns.onToggleAll}
              className="w-3 md:w-4 h-3 md:h-4 cursor-pointer"
            />
            <label
              htmlFor="select-all"
              className="text-text-muted text-xs md:text-sm font-bold cursor-pointer hidden sm:block"
            >
              Select All
            </label>
          </div>

          <div className="w-px h-6 bg-text-muted/50" />

          <button
            aria-label={
              selectedMap.size > 0
                ? `Export ${selectedMap.size} selected students`
                : "Export all students"
            }
            type="button"
            title="Export"
            onClick={handleExportClick}
            disabled={selectedMap.size === 0 || !onExport}
            className="flex items-center gap-2 text-text-muted text-xs md:text-sm font-bold bg-bg border border-[#D8C1C3] rounded-lg py-1.5 md:py-2 px-2 sm:px-3 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed hover:bg-bg-filter transition-colors duration-200"
          >
            <BiExport />
            <span className="hidden sm:block">Export</span>
          </button>
        </div>

        <nav
          aria-label="Pagination"
          className="flex items-center gap-1 sm:gap-2"
        >
          <span className="text-text-muted text-xs md:text-sm font-medium">
            Page {page + 1} of {totalPages}
          </span>
          <button
            type="button"
            aria-label="Previous page"
            onClick={() => onPageChange(page - 1)}
            disabled={page === 0}
            className="bg-bg-bar p-1 md:p-2 border border-border rounded-sm text-text-muted hover:bg-accent hover:text-text-peach transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaChevronLeft className="text-xs md:text-sm shrink-0" />
          </button>

          <button
            type="button"
            aria-label="Next page"
            onClick={() => onPageChange(page + 1)}
            disabled={page + 1 === totalPages}
            className="bg-bg-bar p-1 md:p-2 border border-border rounded-sm text-text-muted hover:bg-accent hover:text-text-peach transition-all duration-200 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
          >
            <FaChevronRight className="text-xs md:text-sm shrink-0" />
          </button>
        </nav>
      </div>
    </div>
  );
}

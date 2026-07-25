import StatusBadge from "@/components/ui/shared/StatusBadge";
import { PaymentHistoryRecord } from "@/types";
import { Column } from "@table-library/react-table-library/types/compact";

export type PaymentHistoryRow = PaymentHistoryRecord & { id: string };

export const PAYMENT_HISTORY_COLUMNS: Column<PaymentHistoryRow>[] = [
  {
    label: "Semester",
    renderCell: (item: PaymentHistoryRow) =>
      `${item.semester} ${item.academic_year}`,
  },
  {
    label: "Date",
    renderCell: (item: PaymentHistoryRow) =>
      item.payment_date
        ? new Date(item.payment_date).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })
        : "—",
  },
  {
    label: "Amount",
    renderCell: (item: PaymentHistoryRow) => `$${item.amount.toLocaleString()}`,
  },
  {
    label: "Notes",
    renderCell: (item: PaymentHistoryRow) => item.notes ?? "—",
  },
  {
    label: "Status",
    renderCell: (item: PaymentHistoryRow) => (
      <StatusBadge status={item.status} />
    ),
  },
];

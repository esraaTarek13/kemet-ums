import { PaymentStatusBreakdown } from "@/types";

const STATUS_COLORS = {
  paid: "#16a34a",
  pending: "#f59e0b",
  overdue: "#7f1d1d",
};

export function mapToPaymentStatusChart(data: PaymentStatusBreakdown) {
  return [
    { name: "Paid on time", value: data.paid_pct, color: STATUS_COLORS.paid },
    { name: "Pending", value: data.pending_pct, color: STATUS_COLORS.pending },
    { name: "Overdue", value: data.overdue_pct, color: STATUS_COLORS.overdue },
  ];
}

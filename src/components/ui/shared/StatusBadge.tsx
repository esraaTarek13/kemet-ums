export type BadgeStatus =
  | "pending"
  | "graded"
  | "late"
  | "completed"
  | "active"
  | "inactive"
  | "dropped"
  | "at_risk"
  | "suspended"
  | "graduated"
  | "on_leave"
  | "archived"
  | "stable"
  // Added for payment status use case
  | "paid"
  | "partial"
  | "unpaid";

const statusStyles: Record<BadgeStatus, string> = {
  pending: "text-[var(--color-pending)] bg-[var(--color-pending-bg)]/20",
  graded: "text-success bg-success-bg",
  active: "text-success bg-success-bg",
  graduated: "text-success bg-success-bg",
  stable: "text-success bg-success-bg",
  paid: "text-success bg-success-bg",
  late: "text-danger bg-danger-bg",
  at_risk: "text-danger bg-danger-bg",
  dropped: "text-danger bg-danger-bg",
  suspended: "text-danger bg-danger-bg",
  unpaid: "text-danger bg-danger-bg",
  completed: "text-text-secondary/80 bg-bg-filter",
  inactive: "text-text-secondary/80 bg-bg-filter",
  on_leave: "text-text-secondary/80 bg-bg-filter",
  archived: "text-text-secondary/80 bg-bg-filter",
  partial: "text-[var(--color-pending)] bg-[var(--color-pending-bg)]/20",
};

export default function StatusBadge({ status }: { status: BadgeStatus }) {
  const label = status.replace("_", " ");

  return (
    <span
      className={`w-fit flex items-center justify-center px-3 py-1 rounded-lg text-[10px] md:text-xs font-semibold uppercase ${statusStyles[status]}`}
    >
      {label}
    </span>
  );
}

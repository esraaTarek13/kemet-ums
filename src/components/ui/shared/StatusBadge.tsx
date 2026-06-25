export type BadgeStatus = "pending" | "graded" | "late" | "completed" | "active" | "inactive" | "dropped";

const statusStyles: Record<BadgeStatus, string> = {
  pending: "text-[var(--color-pending)] bg-[var(--color-pending-bg)]/20",
  graded: "text-success bg-success-bg",
  late: "text-danger bg-danger-bg",
  completed: "text-text-secondary/80 bg-bg-filter",
  active: "text-success bg-success-bg",
  inactive: "text-text-secondary/80 bg-bg-filter",
  dropped: "text-danger bg-danger-bg",
};

export default function StatusBadge({ status }: { status: BadgeStatus }) {
  return (
    <span
      className={`w-fit flex items-center justify-center px-3 py-1 rounded-lg text-xs font-semibold ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
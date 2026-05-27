export const statusStyles: Record<string, string> = {
  active:
    "text-[var(--color-success)] bg-[var(--color-success-bg)] border border-[var(--color-success-border)]",
  at_risk:
    "text-[var(--color-danger)] bg-[var(--color-danger-bg)] border border-[var(--color-danger-border)]",
  graduated:
    "text-[var(--color-graduated)] bg-[#eef2ff] border border-[#c7d2fe]",
  suspended:
    "text-[var(--color-suspended)] bg-[#f5f5f4] border border-[#d6d3d1]",
  pending:
    "text-[var(--color-pending)] bg-[var(--color-pending-bg)]/20 border border-[var(--color-pending-bg)]/40",
};

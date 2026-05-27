import { StatCardProps } from "@/types";

// Maps descriptionColor prop to its corresponding Tailwind class
const descriptionColors = {
  default: "text-text-subtle",
  success: "text-[var(--color-success)]",
  warning: "text-[var(--color-pending)]",
  danger: "text-[var(--color-danger)]",
};

export default function StatCard({
  label,
  value,
  icon: Icon,
  description,
  descriptionColor = "default",
  trend,
}: StatCardProps) {
  return (
    <div className="bg-bg-card border-t-4 border-accent rounded-xl space-y-2 p-3 md:p-4 lg:p-5">
      {/* Card label */}
      <p className="text-[10px] lg:text-xs text-text-subtle uppercase tracking-wide">
        {label}
      </p>

      {/* Value and icon row */}
      <div className="flex items-center justify-between">
        <p className="font-bold text-xl md:text-2xl text-accent">
          {value != null ? value.toLocaleString() : 0}
        </p>
        <Icon className="text-text-secondary/70 text-xl shrink-0" />
      </div>

      {/* Optional trend indicator */}
      {trend && <p className="text-xs text-success font-medium">{trend}</p>}

      {/* Optional description with dynamic color */}
      {description && (
        <p
          className={`font-medium text-xs ${descriptionColors[descriptionColor]}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

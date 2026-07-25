import { statCardDescriptionColors } from "@/data/shared/statusCardStyles";
import { StatCardProps } from "@/types";

export default function StatCard({
  label,
  value,
  icon: Icon,
  description,
  descriptionColor = "default",
  trend,
}: StatCardProps) {
  return (
    <div className="card-top-border space-y-2 p-3 md:p-4 lg:p-5">
      <p className="text-[10px] lg:text-xs text-text-subtle uppercase tracking-wide">
        {label}
      </p>

      <div className="flex items-center justify-between">
        <p className="font-bold text-xl md:text-2xl text-accent">
          {value != null ? value.toLocaleString() : 0}
        </p>
        <Icon className="text-text-secondary/70 text-xl shrink-0" />
      </div>

      {trend && <p className="text-xs text-success font-medium">{trend}</p>}

      {description && (
        <p
          className={`font-medium text-xs ${statCardDescriptionColors[descriptionColor]}`}
        >
          {description}
        </p>
      )}
    </div>
  );
}

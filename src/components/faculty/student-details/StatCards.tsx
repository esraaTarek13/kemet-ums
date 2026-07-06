import StatCard from "@/components/ui/dashboard/StatCard";
import { IconType } from "react-icons";

interface Stat {
  label: string;
  value: string | number;
  icon: IconType;
}

interface StatCardsProps {
  stats: Stat[];
}

export default function StatCards({ stats }: StatCardsProps) {
  return (
    <section
      aria-label="Student statistics"
      className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4"
    >
      {stats.map((stat) => (
        <StatCard key={stat.label} {...stat} />
      ))}
    </section>
  );
}

import { MdLockOutline } from "react-icons/md";

interface ProfileCardProps {
  header: string;
  items: { label: string; value: string }[];
}

export default function ProfileCard({ header, items }: ProfileCardProps) {
  return (
    <section className="card grow space-y-6" aria-label={header}>
      <h4 className="flex items-center gap-2 text-text-secondary">
        <MdLockOutline aria-hidden="true" />
        <span className="font-bold text-[10px] md:text-xs uppercase">{header}</span>
      </h4>

      <ul className="space-y-5 md:space-y-6">
        {items.map(({ label, value }) => (
          <li
            key={label}
            className="flex justify-between items-center gap-2 flex-wrap border-b border-border-card pb-2"
          >
            <span className="text-xs md:text-sm text-text-primary/70">
              {label}
            </span>
            <span className="text-xs md:text-sm text-accent font-medium">
              {value}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

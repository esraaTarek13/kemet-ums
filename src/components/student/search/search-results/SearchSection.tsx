interface SectionProps {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}

export default function SearchSection({ title, icon, children }: SectionProps) {
  return (
    <div role="group" aria-label={title}>
      <div
        aria-hidden="true"
        className="flex items-center gap-2 px-4 py-1.5 text-xs font-semibold text-text-subtle uppercase tracking-wider"
      >
        {icon}
        {title}
      </div>
      {children}
    </div>
  );
}
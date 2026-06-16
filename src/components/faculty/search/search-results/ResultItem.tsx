interface ResultItemProps {
  title: string;
  subtitle: string;
  onClick: () => void;
}

export default function ResultItem({ title, subtitle, onClick }: ResultItemProps) {
  return (
    <button
      type="button"
      aria-label={`${title} — ${subtitle}`}
      onClick={onClick}
      className="w-full flex flex-col px-4 py-2 hover:bg-accent/10 cursor-pointer transition-colors text-left"
    >
      <span className="text-xs md:text-sm text-text-primary font-medium">
        {title}
      </span>
      <span aria-hidden="true" className="text-xs text-text-subtle">
        {subtitle}
      </span>
    </button>
  );
}
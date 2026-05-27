export default function ProgressBar({
  value = 0,
  progressClass ,
  textClass,
}: {
  value?: number;
  progressClass?: string;
  textClass?: string;
}) {
  return (
    <div className="flex flex-col gap-1">
      <p className={`font-bold text-xs self-end ${textClass}`}>{value}%</p>
      <div className="h-2 w-full bg-bg-filter rounded-full">
        <div
          className={`h-2 rounded-full transition-all duration-300 ${progressClass}`}
          style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }}
        />
      </div>
    </div>
  );
}

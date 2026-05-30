import { Skeleton } from "./Skeleton";

export function TableSkeleton() {
  return (
    <div className="flex flex-col card divide-y divide-border">
      <Skeleton className="h-10" />
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4 px-2">
          {Array.from({ length: 4 }).map((_, j) => (
            <Skeleton key={j} className="h-6 w-full" />
          ))}
        </div>
      ))}
    </div>
  );
}
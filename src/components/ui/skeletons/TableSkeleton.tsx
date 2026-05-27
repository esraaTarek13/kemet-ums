import { Skeleton } from "./Skeleton";

interface TableSkeletonProps {
  rows?: number;
  cols?: number;
}

export function TableSkeleton({ rows = 5, cols = 4 }: TableSkeletonProps) {
  return (
    <div className="flex flex-col card divide-y divide-border">
        <Skeleton className="h-10" />
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-4 py-4 px-2">
          {Array.from({ length: cols }).map((_, j) => (
            <Skeleton
              key={j}
              className="h-6 w-full"
            />
          ))}
        </div>
      ))}
    </div>
  );
}
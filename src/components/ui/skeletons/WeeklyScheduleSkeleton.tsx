import { Skeleton } from "./Skeleton";

export default function WeeklyScheduleSkeleton() {
  return (
    <div className="card space-y-3 w-full lg:w-90">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="flex items-center gap-4">
          <Skeleton className="h-4 w-8 shrink-0" />
          <Skeleton className="h-14 w-full rounded-xl" />
        </div>
      ))}
    </div>
  );
}
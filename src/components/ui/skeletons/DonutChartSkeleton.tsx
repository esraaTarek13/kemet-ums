import { Skeleton } from "./Skeleton";

export default function DonutChartSkeleton() {
  return (
    <div className="w-full rounded-2xl border border-border bg-white p-6">
      {/* Title */}
      <Skeleton className="h-6 w-[70%] mb-8" />

      {/* Donut chart */}
      <div className="flex justify-center mb-8">
        <div className="relative h-40 md:h-52 w-40 md:w-52">
          <Skeleton className="h-full w-full rounded-full" />
          <div className="absolute inset-[18%] rounded-full bg-white" />
        </div>
      </div>

      {/* Legend */}
      <div className="flex justify-center items-center gap-4 flex-wrap">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
  );
}

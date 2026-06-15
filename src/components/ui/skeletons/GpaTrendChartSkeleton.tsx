import { Skeleton } from "./Skeleton";

export default function GpaTrendChartSkeleton() {
  const barHeights = ["h-16", "h-20", "h-24", "h-28"];

  return (
    <div className="card h-full w-full lg:w-65 p-4 md:p-6 rounded-xl space-y-4">
      <Skeleton className="h-4 w-24" />
      <div className="flex items-end justify-between gap-3 h-32">
        {barHeights.map((height, i) => (
          <Skeleton key={i} className={`w-full ${height} rounded-t-md`} />
        ))}
      </div>
      <div className="flex justify-between gap-3">
        {barHeights.map((_, i) => (
          <Skeleton key={i} className="h-3 w-8" />
        ))}
      </div>
    </div>
  );
}
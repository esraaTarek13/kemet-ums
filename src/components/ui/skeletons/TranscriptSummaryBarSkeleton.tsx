import { Skeleton } from "./Skeleton";

export default function TranscriptSummaryBarSkeleton() {
  return (
    <div className="card flex flex-col lg:flex-row justify-between items-center gap-4 p-4 md:p-6 lg:p-8 mt-auto">
      <div className="w-full lg:w-fit flex flex-wrap justify-between items-center gap-3 lg:gap-12">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-3 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        ))}
      </div>
      <Skeleton className="h-10 w-full lg:w-56" />
    </div>
  );
}
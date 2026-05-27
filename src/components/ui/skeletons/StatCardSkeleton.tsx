import { Skeleton } from "./Skeleton";

interface StatCardSkeletonProps {
  length?: number;
}

export default function StatCardSkeleton({
  length = 1,
}: StatCardSkeletonProps) {
  return (
    <>
      {Array.from({ length }).map((_, i) => (
        <section
          key={i}
          className="h-25 lg:h-30 w-full rounded-xl border-t-4 border-accent/20 bg-bg-card p-3 md:p-4 lg:p-5 flex flex-col justify-between"
        >
          <Skeleton className="h-4 w-20" />
          <div className="flex items-center justify-between w-full">
            <Skeleton className="h-6 w-10" />
            <Skeleton className="h-6 w-5" />
          </div>
        </section>
      ))}
    </>
  );
}

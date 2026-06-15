import { Skeleton } from "./Skeleton";

export default function GpaCardSkeleton() {
  return (
    <div className="card h-full lg:h-fit w-full lg:w-65 flex flex-col gap-3 md:gap-4 items-center justify-center">
      <Skeleton className="h-12 w-12 rounded-full" />
      <Skeleton className="h-3 w-24" />
      <Skeleton className="h-14 w-24" />
      <Skeleton className="h-7 w-32 rounded-full" />
    </div>
  );
}
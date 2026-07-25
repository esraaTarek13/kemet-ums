import { Skeleton } from "./Skeleton";

export default function MiniCardSkeleton() {
  return (
    <div className="flex items-center gap-3">
      <Skeleton className="w-7 md:w-9 h-7 md:h-9 rounded-full" />
      <div className="flex flex-col gap-1.5 w-full">
        <Skeleton className="h-3 w-full" />
        <Skeleton className="h-2 w-[30%]" />
      </div>
    </div>
  );
}

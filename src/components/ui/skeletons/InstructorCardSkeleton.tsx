import { Skeleton } from "./Skeleton";

export default function InstructorCardSkeleton() {
  return (
    <div className="card flex flex-col items-center text-center space-y-3">
      <Skeleton className="h-17 w-17 rounded-full" />
      <div className="space-y-2 w-full flex flex-col items-center">
        <Skeleton className="h-6 w-36" />
        <Skeleton className="h-3 w-48" />
      </div>
      <div className="w-full space-y-2 pt-1">
        <Skeleton className="h-4 w-52 mx-auto" />
        <Skeleton className="h-4 w-44 mx-auto" />
      </div>
    </div>
  );
}

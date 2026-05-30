import { Skeleton } from "./Skeleton";

export default function HeaderSkeleton() {
  return (
    <div className="card space-y-6">
      <Skeleton className="h-6 w-full" />
      <Skeleton className="h-6 w-20" />
    </div>
  );
}

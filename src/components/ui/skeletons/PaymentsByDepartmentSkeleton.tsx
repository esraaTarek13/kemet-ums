import { Skeleton } from "./Skeleton";

export default function PaymentsByDepartmentSkeleton() {
  return (
    <div className="card space-y-4">
      <Skeleton className="h-4 w-40 bg-bg-filter rounded" />

      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-1.5">
            <div className="flex justify-between">
              <Skeleton className="h-3 w-24 bg-bg-filter rounded" />
              <Skeleton className="h-3 w-16 bg-bg-filter rounded" />
            </div>
            <Skeleton className="h-2 w-full bg-bg-filter rounded-full" />
          </div>
        ))}
      </div>
    </div>
  );
}
